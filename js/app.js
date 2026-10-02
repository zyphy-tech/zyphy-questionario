/* ==========================================================================
   Questionário do site (Zyphy) — etapas, validação, rascunho, tela final.
   Nada sai do navegador: sem fetch de respostas, sem analytics. O rascunho
   fica no localStorage; o PDF é montado aqui (js/pdf.js, carregado só no
   clique em "Gerar o PDF", com pdf-lib + fontkit do próprio site).
   Textos: copy.md (aprovado). O microcopy criado pelo design está marcado.
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'zyphy-questionario-v1';
  var WA_URL = 'https://wa.me/5511924507188';            // F35, copy.md §10
  var SAVE_DELAY = 400;                                    // ms entre a digitação e o salvamento
  var PDF_SCRIPTS = ['vendor/pdf-lib/pdf-lib.min.js', 'vendor/fontkit/fontkit.umd.min.js', 'js/pdf.js'];

  var MSG = {
    required: 'Responda esta pra seguir.',
    choice: 'Escolha uma opção pra seguir.',
    whatsapp: 'Confira o número: DDD + celular.',
    email: 'Esse e-mail parece incompleto. Pode conferir?',
    confirm: 'Marque a confirmação pra gerar o PDF.',
    otherP9: 'Escreva qual ação pra seguir.',
    missing: function (n) {
      // singular: microcopy criado pelo design (o copy.md só traz o plural)
      return n === 1 ? 'Falta 1 resposta obrigatória nesta etapa.' : 'Faltam ' + n + ' respostas obrigatórias nesta etapa.';
    },
    state: { current: 'agora', done: 'feita', missing: 'falta responder' },
    pdfError: 'Não deu pra gerar o PDF. Tente de novo: suas respostas continuam neste navegador.',
    fallback: function (file) { return 'O PDF foi baixado. Na conversa com a Zyphy que abriu no WhatsApp, toque no clipe e anexe o arquivo ' + file + '.'; },
    saved: function (file) { return 'PDF salvo em Downloads como ' + file + '.'; },
    shareTitle: function (c) { return 'Questionário — ' + c; },
    shareText: function (c) { return 'Oi, Zyphy. Aqui está o questionário da ' + c + ' em PDF.'; },
    waText: function (c) { return 'Oi, Zyphy. Respondi o questionário da ' + c + '. O PDF baixou aqui e vou anexar nesta conversa.'; },
    confirmLine: function (n) { return 'Confirmado por ' + n + ': as informações acima são verdadeiras e podem ser usadas no site.'; },
    header: 'Zyphy · Questionário do site',
    company: 'Empresa',
    person: 'Respondido por',
    date: 'Data',
    empty: 'Sem resposta.',
    other: 'Outro',
    page: function (x, y) { return 'Página ' + x + ' de ' + y; },
    // título do PDF nos metadados: microcopy criado pelo design
    pdfTitle: function (c) { return 'Zyphy · Questionário do site · ' + c; }
  };

  /* ---------- Modelo: lido do HTML, que é onde o copy está ---------- */
  var form = document.getElementById('form');
  var nav = document.querySelector('.steps');
  var navButtons = Array.prototype.slice.call(document.querySelectorAll('.step'));
  var indicator = document.querySelector('.steps-indicator');
  var card = document.querySelector('.card');
  var sheet = document.querySelector('.sheet');
  var finalEl = document.getElementById('final');
  var progressStep = document.getElementById('progress-step');
  var progressDraft = document.getElementById('progress-draft');
  var noticeRecovered = document.getElementById('notice-recovered');
  var noticeNoDraft = document.getElementById('notice-nodraft');
  var confirmInput = document.getElementById('confirm');
  var confirmErr = document.getElementById('confirm-err');
  var generateBtn = form.querySelector('[data-action="generate"]');
  var statusEl = document.getElementById('final-status');

  function clean(text) { return text.replace(/\s+/g, ' ').trim(); }

  var steps = Array.prototype.slice.call(document.querySelectorAll('.step-panel')).map(function (panel, i) {
    return {
      n: i + 1,
      panel: panel,
      title: clean(panel.querySelector('.step-title').textContent),
      navLabel: clean(navButtons[i].querySelector('.step-label').textContent),
      summary: panel.querySelector('.step-summary'),
      questions: Array.prototype.slice.call(panel.querySelectorAll('.q')).map(function (el) {
        var num = Number(el.getAttribute('data-q'));
        return {
          el: el,
          num: num,
          name: 'p' + num,
          type: el.getAttribute('data-type'),
          required: el.hasAttribute('data-required'),
          format: el.getAttribute('data-format'),
          otherId: el.getAttribute('data-other'),
          text: clean(el.querySelector('.q-text').textContent)
        };
      })
    };
  });
  var TOTAL = steps.length;
  var allQuestions = steps.reduce(function (acc, s) { return acc.concat(s.questions); }, []);
  var requiredCount = allQuestions.filter(function (q) { return q.required; }).length;

  /* ---------- Estado ---------- */
  var current = 1;
  var finalShown = false;
  var checked = {};            // etapas já conferidas ou deixadas para trás
  var pdf = null;              // { blob, fileName, company }
  var storageOK = false;
  var saveTimer = 0;

  /* ---------- Leitura das respostas ---------- */
  function field(q) { return document.getElementById(q.name); }
  function otherField(q) { return q.otherId ? document.getElementById(q.otherId) : null; }
  function choiceValue(q) {
    var on = q.el.querySelector('input[type="radio"]:checked');
    return on ? on.value : '';
  }
  function rawValue(q) {
    if (q.type === 'choice') return choiceValue(q);
    return field(q).value;
  }
  function isBlank(q) {
    if (q.type === 'choice') {
      var v = choiceValue(q);
      if (!v) return true;
      // "Outro" em pergunta obrigatória (P9) pede o campo preenchido
      return q.required && v === MSG.other && !otherField(q).value.trim();
    }
    return !field(q).value.trim();
  }
  function digits(v) { return v.replace(/\D/g, ''); }
  function formatError(q) {
    if (q.type === 'choice' || !q.format) return '';
    var v = field(q).value.trim();
    if (!v) return '';
    if (q.format === 'whatsapp') {
      var d = digits(v);
      var ok = d.length === 10 || d.length === 11 || ((d.length === 12 || d.length === 13) && d.indexOf('55') === 0);
      return ok ? '' : MSG.whatsapp;
    }
    if (q.format === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : MSG.email;
    return '';
  }
  // texto da resposta para a prévia e o PDF (uma fonte só)
  function displayValue(q) {
    var v = rawValue(q).replace(/\r\n?/g, '\n').trim();
    if (q.type === 'choice' && v === MSG.other && q.otherId) {
      var t = otherField(q).value.trim();
      return t ? MSG.other + ': ' + t : MSG.other;
    }
    return v;
  }

  /* ---------- Erros ---------- */
  function errEl(id) { return document.getElementById(id + '-err'); }
  function showError(id, target, msg) {
    var p = errEl(id);
    if (p) { p.textContent = msg; p.hidden = false; }
    if (target) target.setAttribute('aria-invalid', 'true');
  }
  function clearError(id, target) {
    var p = errEl(id);
    if (p) { p.textContent = ''; p.hidden = true; }
    if (target) target.removeAttribute('aria-invalid');
  }
  function clearQuestion(q) {
    if (q.type === 'choice') {
      q.el.removeAttribute('data-invalid');
      clearError(q.name, null);
      Array.prototype.forEach.call(q.el.querySelectorAll('input[type="radio"]'), function (r) { r.removeAttribute('aria-invalid'); });
      if (q.otherId) clearError(q.otherId, otherField(q));
    } else {
      clearError(q.name, field(q));
    }
  }

  /* confere uma pergunta. Devolve { blank, target } quando há problema */
  function checkQuestion(q, show) {
    if (q.type === 'choice') {
      var v = choiceValue(q);
      if (q.required && !v) {
        var first = q.el.querySelector('input[type="radio"]');
        if (show) {
          q.el.setAttribute('data-invalid', '');
          Array.prototype.forEach.call(q.el.querySelectorAll('input[type="radio"]'), function (r) { r.setAttribute('aria-invalid', 'true'); });
          showError(q.name, null, MSG.choice);
        }
        return { blank: true, target: first };
      }
      if (q.required && v === MSG.other && !otherField(q).value.trim()) {
        if (show) showError(q.otherId, otherField(q), MSG.otherP9);
        return { blank: true, target: otherField(q) };
      }
      return null;
    }
    var f = field(q);
    if (q.required && !f.value.trim()) {
      if (show) showError(q.name, f, MSG.required);
      return { blank: true, target: f };
    }
    var fe = formatError(q);
    if (fe) {
      if (show) showError(q.name, f, fe);
      return { blank: false, target: f };
    }
    return null;
  }

  /* confere a etapa inteira */
  function checkStep(step, show) {
    var blanks = 0, first = null, problems = 0;
    step.questions.forEach(function (q) {
      if (show) clearQuestion(q);
      var r = checkQuestion(q, show);
      if (r) {
        problems++;
        if (r.blank) blanks++;
        if (!first) first = r.target;
      }
    });
    return { ok: problems === 0, blanks: blanks, first: first };
  }
  function stepComplete(step) { return checkStep(step, false).ok; }

  function setSummary(step, text) { step.summary.textContent = text || ''; }

  /* ---------- Etapas no topo e progresso ---------- */
  function stepState(i) {
    if (!finalShown && i === current) return 'current';
    if (finalShown || checked[i]) return stepComplete(steps[i - 1]) ? 'done' : 'missing';
    return 'idle';
  }
  function renderNav() {
    navButtons.forEach(function (b, idx) {
      var i = idx + 1;
      var st = stepState(i);
      if (st === 'current') b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      if (st === 'done' || st === 'missing') b.setAttribute('data-state', st); else b.removeAttribute('data-state');
      var label = st === 'idle' ? '' : ', ' + MSG.state[st];
      b.querySelector('.step-state').textContent = label;
    });
    indicator.hidden = finalShown;
    indicator.style.setProperty('--step-index', String(current - 1));
  }
  function fill(name, text) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-fill="' + name + '"]'), function (el) { el.textContent = text; });
  }
  function renderProgress() {
    progressStep.hidden = finalShown;
    fill('step-n', String(current));
    fill('step-name', steps[current - 1].navLabel);
    var done = allQuestions.filter(function (q) { return q.required && !isBlank(q); }).length;
    fill('req-done', String(done));
    fill('req-total', String(requiredCount));
  }
  function render() { renderNav(); renderProgress(); }

  /* ---------- Troca de etapa: instantânea, sem rolagem suave ---------- */
  function scrollToTop() {
    var desktop = window.matchMedia('(min-width: 1100px)').matches;
    var target = desktop ? card : sheet;
    var top = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'instant' });
  }
  function leave(from, to) {
    // deixar uma etapa para trás (indo adiante) ou completa conta como conferida
    if (to > from || stepComplete(steps[from - 1])) checked[from] = true;
  }
  function go(n, opts) {
    opts = opts || {};
    if (!finalShown && n !== current) leave(current, n);
    if (finalShown) { finalShown = false; finalEl.hidden = true; form.hidden = false; }
    // pular adiante pelo topo marca as etapas puladas
    for (var i = current + 1; i < n; i++) checked[i] = true;
    current = n;
    steps.forEach(function (s) { s.panel.hidden = s.n !== n; });
    noticeRecovered.hidden = !opts.keepNotice || noticeRecovered.hidden;
    render();
    if (opts.scroll !== false) {
      var title = steps[n - 1].panel.querySelector('.step-title');
      if (opts.focus !== false) title.focus({ preventScroll: true });
      scrollToTop();
    }
    scheduleSave(0);
  }

  function showStepErrors(step) {
    var r = checkStep(step, true);
    setSummary(step, r.blanks > 0 ? MSG.missing(r.blanks) : '');
    return r;
  }

  function next() {
    var step = steps[current - 1];
    var r = showStepErrors(step);
    if (!r.ok) {
      checked[current] = true;
      render();
      if (r.first) r.first.focus();
      return;
    }
    setSummary(step, '');
    checked[current] = true;
    go(current + 1);
  }
  function back() { if (current > 1) go(current - 1); }

  /* ---------- Rascunho (localStorage) ---------- */
  function testStorage() {
    try {
      var k = STORAGE_KEY + '-teste';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  }
  function snapshot() {
    var answers = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      if (el.type === 'radio') { if (el.checked) answers[el.name] = el.value; }
      else if (el.type === 'checkbox') answers[el.name] = el.checked;
      else answers[el.name] = el.value;
    });
    var list = [];
    Object.keys(checked).forEach(function (k) { if (checked[k]) list.push(Number(k)); });
    return { v: 1, savedAt: Date.now(), step: current, checked: list, answers: answers };
  }
  function hasContent(answers) {
    return Object.keys(answers).some(function (k) {
      var v = answers[k];
      return typeof v === 'string' ? v.trim() !== '' : v === true;
    });
  }
  function timeText(ms) {
    return new Date(ms).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
  function save() {
    if (!storageOK) return;
    var snap = snapshot();
    if (!hasContent(snap.answers)) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
      fill('draft-time', timeText(snap.savedAt));
      progressDraft.hidden = false;
    } catch (e) {
      storageOK = false;
      noticeNoDraft.hidden = false;
      progressDraft.hidden = true;
    }
  }
  function scheduleSave(delay) {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(save, delay === undefined ? SAVE_DELAY : delay);
  }
  function restore() {
    var raw;
    try { raw = window.localStorage.getItem(STORAGE_KEY); } catch (e) { return false; }
    if (!raw) return false;
    var data;
    try { data = JSON.parse(raw); } catch (e) { return false; }
    if (!data || data.v !== 1 || !data.answers || !hasContent(data.answers)) return false;
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || !(el.name in data.answers)) return;
      var v = data.answers[el.name];
      if (el.type === 'radio') el.checked = el.value === v;
      else if (el.type === 'checkbox') el.checked = v === true;
      else if (typeof v === 'string') el.value = v;
    });
    (data.checked || []).forEach(function (n) { checked[n] = true; });
    var step = Math.min(Math.max(Number(data.step) || 1, 1), TOTAL);
    // rascunho recuperado: as etapas antes da salva contam como conferidas
    for (var i = 1; i < step; i++) checked[i] = true;
    current = step;
    fill('draft-time', timeText(data.savedAt || Date.now()));
    progressDraft.hidden = false;
    return true;
  }

  /* ---------- Campo do "Outro" (P9, P19) ---------- */
  function syncOther(q) {
    if (!q.otherId) return;
    var wrap = document.getElementById(q.name + '-other');
    var open = choiceValue(q) === MSG.other;
    wrap.hidden = !open;
    if (!open) clearError(q.otherId, otherField(q));
  }

  /* ---------- Coleta: a mesma lista para a prévia e o PDF ---------- */
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function slug(text) {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function collect() {
    var now = new Date();
    var company = displayValue(allQuestions[0]);
    var person = displayValue(allQuestions[1]);
    var iso = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    var s = slug(company);
    return {
      company: company,
      person: person,
      date: pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear(),
      now: now,
      fileName: 'zyphy-questionario-' + (s ? s + '-' : '') + iso + '.pdf',
      sections: steps.map(function (st) {
        return {
          title: st.title,
          items: st.questions.map(function (q) { return { num: q.num, text: q.text, answer: displayValue(q) }; })
        };
      }),
      confirmLine: MSG.confirmLine(person),
      labels: {
        header: MSG.header, company: MSG.company, person: MSG.person, date: MSG.date,
        empty: MSG.empty, page: MSG.page, title: MSG.pdfTitle(company)
      }
    };
  }

  /* ---------- Prévia em HTML (textContent: o texto digitado nunca vira HTML) ---------- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function renderPreview(data) {
    fill('company', data.company);
    fill('pv-company', data.company);
    fill('pv-person', data.person);
    fill('pv-date', data.date);
    var box = document.getElementById('preview-sections');
    box.textContent = '';
    data.sections.forEach(function (sec) {
      box.appendChild(el('h4', 'preview-section-title', sec.title));
      var ol = el('ol', 'preview-list');
      ol.setAttribute('role', 'list');
      sec.items.forEach(function (it) {
        var li = el('li', 'preview-item');
        var q = el('p', 'pv-q');
        q.appendChild(el('span', 'pv-num', it.num + '.'));
        q.appendChild(el('span', 'pv-text', it.text));
        li.appendChild(q);
        li.appendChild(el('p', it.answer ? 'pv-a' : 'pv-a pv-a--empty', it.answer || MSG.empty));
        ol.appendChild(li);
      });
      box.appendChild(ol);
    });
    document.getElementById('preview-confirm').textContent = data.confirmLine;
  }

  /* ---------- Carregamento do PDF, só no clique ---------- */
  var libsPromise = null;
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;          // ordem garantida: pdf-lib, fontkit, pdf.js
      s.onload = resolve;
      s.onerror = function () { s.remove(); reject(new Error('script: ' + src)); };
      document.head.appendChild(s);
    });
  }
  function loadPdfLibs() {
    if (!libsPromise) {
      libsPromise = Promise.all(PDF_SCRIPTS.map(loadScript)).catch(function (e) { libsPromise = null; throw e; });
    }
    return libsPromise;
  }

  function setBusy(on) {
    generateBtn.setAttribute('aria-disabled', on ? 'true' : 'false');
    generateBtn.setAttribute('aria-busy', on ? 'true' : 'false');
    var labels = generateBtn.querySelectorAll('.btn-label');
    labels[0].setAttribute('aria-hidden', on ? 'true' : 'false');
    labels[1].setAttribute('aria-hidden', on ? 'false' : 'true');
  }
  var generating = false;

  function generate() {
    if (generating) return;
    var six = steps[TOTAL - 1];
    setSummary(six, '');
    var r = showStepErrors(six);
    var confirmed = confirmInput.checked;
    if (!confirmed) showError('confirm', confirmInput, MSG.confirm); else clearError('confirm', confirmInput);
    if (!r.ok || !confirmed) {
      checked[TOTAL] = true;
      render();
      (r.first || confirmInput).focus();
      return;
    }
    // as outras etapas: todas conferidas; a primeira incompleta abre com os erros
    var firstMissing = null;
    for (var i = 1; i < TOTAL; i++) {
      checked[i] = true;
      if (!firstMissing && !stepComplete(steps[i - 1])) firstMissing = steps[i - 1];
    }
    if (firstMissing) {
      go(firstMissing.n, { focus: false });
      var fr = showStepErrors(firstMissing);
      render();
      if (fr.first) fr.first.focus({ preventScroll: true });
      return;
    }

    generating = true;
    setBusy(true);
    var data = collect();
    loadPdfLibs()
      .then(function () { return window.ZyphyPDF.build(data); })
      .then(function (bytes) {
        pdf = { blob: new Blob([bytes], { type: 'application/pdf' }), fileName: data.fileName, company: data.company };
        showFinal(data);
      })
      .catch(function (err) {
        if (window.console) console.error(err);
        setSummary(six, MSG.pdfError);
      })
      .then(function () { generating = false; setBusy(false); });
  }

  function showFinal(data) {
    renderPreview(data);
    statusEl.textContent = '';
    checked[TOTAL] = true;
    finalShown = true;
    form.hidden = true;
    finalEl.hidden = false;
    render();
    document.getElementById('final-title').focus({ preventScroll: true });
    scrollToTop();
  }

  /* ---------- Baixar e Enviar ---------- */
  function download() {
    var url = URL.createObjectURL(pdf.blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = pdf.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
  }
  function openWhatsApp() {
    // texto digitado (nome da empresa) entra no link: encodeURIComponent
    var url = WA_URL + '?text=' + encodeURIComponent(MSG.waText(pdf.company));
    window.open(url, '_blank', 'noopener');
  }
  function fallbackSend() {
    download();
    openWhatsApp();
    statusEl.textContent = MSG.fallback(pdf.fileName);
  }
  function send() {
    if (!pdf) return;
    var file = null;
    try { file = new File([pdf.blob], pdf.fileName, { type: 'application/pdf' }); } catch (e) { file = null; }
    var touch = window.matchMedia('(pointer: coarse)').matches;
    if (file && touch && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: MSG.shareTitle(pdf.company), text: MSG.shareText(pdf.company) })
        .catch(function (err) { if (!err || err.name !== 'AbortError') fallbackSend(); });
      return;
    }
    fallbackSend();
  }

  /* ---------- Eventos ---------- */
  function questionOf(target) {
    var host = target.closest('.q');
    if (!host) return null;
    var num = Number(host.getAttribute('data-q'));
    return allQuestions.filter(function (q) { return q.num === num; })[0] || null;
  }
  function stepOf(q) { return steps.filter(function (s) { return s.questions.indexOf(q) !== -1; })[0]; }

  function onEdit(e) {
    var t = e.target;
    pdf = null;
    var q = questionOf(t);
    if (q) {
      if (q.type === 'choice') syncOther(q);
      // corrigiu: o erro sai na hora; erro novo só aparece ao conferir
      if (!checkQuestion(q, false)) clearQuestion(q);
      else if (q.type === 'choice' && choiceValue(q)) {
        q.el.removeAttribute('data-invalid');
        clearError(q.name, null);
        Array.prototype.forEach.call(q.el.querySelectorAll('input[type="radio"]'), function (r) { r.removeAttribute('aria-invalid'); });
      }
      var st = stepOf(q);
      if (st.summary.textContent) {
        var n = checkStep(st, false).blanks;
        setSummary(st, n > 0 ? MSG.missing(n) : '');
      }
    }
    if (t === confirmInput && confirmInput.checked) clearError('confirm', confirmInput);
    render();
    scheduleSave();
  }
  form.addEventListener('input', onEdit);
  form.addEventListener('change', function (e) {
    onEdit(e);
    // formato (WhatsApp, e-mail) conferido ao sair do campo
    var q = questionOf(e.target);
    if (q && q.format && e.target === field(q)) {
      var fe = formatError(q);
      if (fe) showError(q.name, field(q), fe);
    }
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.classList.contains('step')) { go(Number(b.getAttribute('data-step'))); return; }
    var action = b.getAttribute('data-action');
    if (action === 'next') next();
    else if (action === 'back') back();
    else if (action === 'generate') generate();
    else if (action === 'edit') go(TOTAL);
    else if (action === 'download' && pdf) { download(); statusEl.textContent = MSG.saved(pdf.fileName); }
    else if (action === 'send') send();
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  /* ---------- Início ---------- */
  storageOK = testStorage();
  noticeNoDraft.hidden = storageOK;
  var recovered = storageOK && restore();
  steps.forEach(function (s) { s.panel.hidden = s.n !== current; });
  allQuestions.forEach(syncOther);
  noticeRecovered.hidden = !recovered;
  render();
  // o indicador só ganha transição depois do primeiro quadro: ao carregar ele
  // já nasce na etapa certa, sem deslizar da 1
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () { nav.classList.add('is-ready'); });
  });
})();
