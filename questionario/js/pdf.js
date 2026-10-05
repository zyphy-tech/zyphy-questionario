/* ==========================================================================
   Questionário do site (Zyphy) — montagem do PDF. Carregado só no clique em
   "Gerar o PDF", depois de vendor/pdf-lib e vendor/fontkit (globais PDFLib e
   fontkit). Texto de verdade, selecionável, com as fontes embutidas e com
   subset; papel branco (direcao.md › PDF; brief §3, linhas 22 e 24).
   Cores: lidas de css/tokens.css. Medidas: pontos do A4, objeto PDF abaixo.
   ========================================================================== */
(function () {
  'use strict';

  var FONT_FILES = {
    regular: 'assets/fonts/pdf/Archivo-Regular.ttf',
    medium: 'assets/fonts/pdf/Archivo-Medium.ttf',
    semibold: 'assets/fonts/pdf/Archivo-SemiBold.ttf',
    display: 'assets/fonts/pdf/SofiaSansExtraCondensed-ExtraBold.ttf'
  };

  /* medidas em pontos, da direcao.md › PDF (A4 retrato) */
  var PDF = {
    marginX: 56, marginTop: 56, marginBottom: 64,
    mark: 28, markGap: 10, headerSize: 11,
    labelSize: 9, labelLead: 12,
    companySize: 30, companyMin: 20, companyLines: 3,
    specLabelW: 90, specSize: 10.5, specLead: 15, specGap: 4,
    rule: 0.75,
    sectionAbove: 24, sectionSize: 15, sectionLead: 15, sectionBelow: 10,
    qAbove: 12, qSize: 10.5, qLead: 14, qaGap: 4, aSize: 10.5, aLead: 15, numW: 20,
    confirmSize: 10, confirmLead: 14,
    runMark: 12, runSize: 8.5, runTop: 34, runBelow: 22,
    footSize: 8.5, footBaseline: 32
  };

  /* caminho do favicon.svg (assets/favicon.svg), caixa de 64 */
  var MARK_BOX = 'M10 0 H54 A10 10 0 0 1 64 10 V54 A10 10 0 0 1 54 64 H10 A10 10 0 0 1 0 54 V10 A10 10 0 0 1 10 0 Z';
  var MARK_Z = 'M16 13 L48 13 L48 22 L26 42 L48 42 L48 51 L16 51 L16 42 L38 22 L16 22 Z';

  var fontBytes = null;
  function loadFonts() {
    if (!fontBytes) {
      var keys = Object.keys(FONT_FILES);
      fontBytes = Promise.all(keys.map(function (k) {
        return fetch(FONT_FILES[k]).then(function (r) {
          if (!r.ok) throw new Error('fonte: ' + FONT_FILES[k]);
          return r.arrayBuffer();
        });
      })).then(function (list) {
        var out = {};
        keys.forEach(function (k, i) { out[k] = list[i]; });
        return out;
      }).catch(function (e) { fontBytes = null; throw e; });
    }
    return fontBytes;
  }

  function token(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function hexColor(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return PDFLib.rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
  }

  function build(data) {
    var L = window.PDFLib;
    return loadFonts().then(function (bytes) {
      return L.PDFDocument.create().then(function (doc) {
        doc.registerFontkit(window.fontkit);
        return Promise.all([
          doc.embedFont(bytes.regular, { subset: true }),
          doc.embedFont(bytes.medium, { subset: true }),
          doc.embedFont(bytes.semibold, { subset: true, features: { tnum: true } }),
          doc.embedFont(bytes.display, { subset: true })
        ]).then(function (fonts) {
          return compose(doc, data, { regular: fonts[0], medium: fonts[1], semibold: fonts[2], display: fonts[3] });
        });
      });
    });
  }

  function compose(doc, data, F) {
    var L = window.PDFLib;
    var C = {
      ink: hexColor(token('--ink-950')),
      answer: hexColor(token('--ink-900')),
      petrol: hexColor(token('--petrol-700')),
      muted: hexColor(token('--sage-600')),
      rule: hexColor(token('--mist-400')),
      accent: hexColor(token('--cyan-500'))
    };
    var size = L.PageSizes.A4;
    var W = size[0], H = size[1];
    var measure = W - 2 * PDF.marginX;
    var bottom = PDF.marginBottom;
    var pages = [];
    var page = null;
    var y = 0;   // topo do espaço livre, em coordenadas do PDF

    // só os caracteres que a fonte tem; o resto vira "?" (emoji, outras escritas)
    var charsets = {};
    function safe(text, font) {
      var key = font.name;
      if (!charsets[key]) {
        charsets[key] = {};
        font.getCharacterSet().forEach(function (cp) { charsets[key][cp] = true; });
      }
      var set = charsets[key];
      return Array.from(text.replace(/\t/g, '    ')).map(function (ch) {
        if (ch === '\n') return ch;
        var cp = ch.codePointAt(0);
        if (cp < 32) return ' ';
        return set[cp] ? ch : '?';
      }).join('');
    }
    function width(text, font, s) { return font.widthOfTextAtSize(text, s); }

    // quebra de linha medindo com a fonte embutida; palavra maior que a
    // linha (URL, endereço) quebra em qualquer ponto
    function wrap(text, font, s, maxW) {
      var lines = [];
      safe(text, font).split('\n').forEach(function (par) {
        if (!par.trim()) { lines.push(''); return; }
        var line = '';
        par.split(/ +/).forEach(function (w) {
          if (!w) return;
          var cand = line ? line + ' ' + w : w;
          if (width(cand, font, s) <= maxW) { line = cand; return; }
          if (line) { lines.push(line); line = ''; }
          while (width(w, font, s) > maxW) {
            var chars = Array.from(w);
            var lo = 1, hi = chars.length;
            while (lo < hi) {
              var mid = Math.ceil((lo + hi) / 2);
              if (width(chars.slice(0, mid).join(''), font, s) <= maxW) lo = mid; else hi = mid - 1;
            }
            lines.push(chars.slice(0, lo).join(''));
            w = chars.slice(lo).join('');
          }
          line = w;
        });
        lines.push(line);
      });
      // linhas em branco no fim não ocupam espaço
      while (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
      return lines;
    }

    // linha de texto ocupando "lead" de altura a partir do topo y
    function baseline(top, s, lead) { return top - (lead / 2 + s * 0.35); }
    function text(str, x, top, font, s, lead, color) {
      if (str) page.drawText(str, { x: x, y: baseline(top, s, lead), size: s, font: font, color: color });
    }
    function rule(top) {
      page.drawLine({ start: { x: PDF.marginX, y: top }, end: { x: W - PDF.marginX, y: top }, thickness: PDF.rule, color: C.rule });
    }
    function mark(x, top, s) {
      var k = s / 64;
      page.drawSvgPath(MARK_BOX, { x: x, y: top, scale: k, color: C.ink });
      page.drawSvgPath(MARK_Z, { x: x, y: top, scale: k, color: C.accent });
    }

    function newPage() {
      page = doc.addPage(size);
      pages.push(page);
      if (pages.length === 1) {
        y = H - PDF.marginTop;
      } else {
        // cabeçalho corrido: o quadrado da marca + o nome do documento
        var top = H - PDF.runTop;
        mark(PDF.marginX, top, PDF.runMark);
        text(safe(data.labels.header, F.semibold), PDF.marginX + PDF.runMark + PDF.markGap / 2, top, F.semibold, PDF.runSize, PDF.runMark, C.petrol);
        y = top - PDF.runMark - PDF.runBelow;
      }
    }
    function fits(h) { return y - h >= bottom; }
    function atTop() { return pages.length > 1 && y === H - PDF.runTop - PDF.runMark - PDF.runBelow; }

    /* ---------- Página 1: identificação ---------- */
    newPage();
    mark(PDF.marginX, y, PDF.mark);
    text(safe(data.labels.header, F.semibold), PDF.marginX + PDF.mark + PDF.markGap, y, F.semibold, PDF.headerSize, PDF.mark, C.petrol);
    y -= PDF.mark + PDF.mark;

    text(safe(data.labels.company, F.medium), PDF.marginX, y, F.medium, PDF.labelSize, PDF.labelLead, C.muted);
    y -= PDF.labelLead + PDF.qaGap;

    // nome da empresa: título do documento, até 3 linhas; se passar, diminui
    var companyText = data.company.toLocaleUpperCase('pt-BR');
    var cs = PDF.companySize, companyLines = wrap(companyText, F.display, cs, measure);
    while (companyLines.length > PDF.companyLines && cs > PDF.companyMin) {
      cs -= 2;
      companyLines = wrap(companyText, F.display, cs, measure);
    }
    companyLines.forEach(function (ln) {
      text(ln, PDF.marginX, y, F.display, cs, cs, C.ink);
      y -= cs;
    });
    y -= PDF.sectionAbove - PDF.qaGap;

    // ficha: rótulo | valor
    [[data.labels.person, data.person], [data.labels.date, data.date]].forEach(function (row) {
      var vals = wrap(row[1], F.regular, PDF.specSize, measure - PDF.specLabelW);
      text(safe(row[0], F.medium), PDF.marginX, y, F.medium, PDF.labelSize, PDF.specLead, C.muted);
      vals.forEach(function (v) {
        text(v, PDF.marginX + PDF.specLabelW, y, F.regular, PDF.specSize, PDF.specLead, C.ink);
        y -= PDF.specLead;
      });
      y -= PDF.specGap;
    });
    y -= PDF.sectionAbove - PDF.specGap;
    rule(y);

    /* ---------- Seções e perguntas ---------- */
    var qX = PDF.marginX + PDF.numW;
    var qW = measure - PDF.numW;

    function questionBlock(item) {
      var q = wrap(item.text, F.semibold, PDF.qSize, qW);
      var empty = !item.answer;
      var a = empty ? [data.labels.empty] : wrap(item.answer, F.regular, PDF.aSize, qW);
      return { q: q, a: a, empty: empty };
    }
    function questionNeed(b) {
      // a pergunta nunca fica separada da resposta: vai com até 2 linhas dela
      return PDF.qAbove + b.q.length * PDF.qLead + PDF.qaGap + Math.min(b.a.length, 2) * PDF.aLead;
    }
    function drawQuestion(item, b, first) {
      // a 1ª pergunta da seção já entrou na conta do título (e o espaço
      // acima dela é o de baixo do título)
      if (!first) {
        if (!fits(questionNeed(b))) newPage();
        if (!atTop()) y -= PDF.qAbove;
      }
      text(safe(item.num + '.', F.semibold), PDF.marginX, y, F.semibold, PDF.qSize, PDF.qLead, C.ink);
      b.q.forEach(function (ln) {
        text(ln, qX, y, F.semibold, PDF.qSize, PDF.qLead, C.ink);
        y -= PDF.qLead;
      });
      y -= PDF.qaGap;
      b.a.forEach(function (ln) {
        if (!fits(PDF.aLead)) newPage();   // resposta longa continua na página seguinte
        text(ln, qX, y, F.regular, PDF.aSize, PDF.aLead, b.empty ? C.muted : C.answer);
        y -= PDF.aLead;
      });
    }

    data.sections.forEach(function (sec, si) {
      var blocks = sec.items.map(questionBlock);
      // título de seção nunca sozinho no pé da página: vai com a 1ª pergunta
      var need = PDF.qAbove + PDF.sectionAbove + PDF.sectionLead + PDF.sectionBelow + (blocks.length ? questionNeed(blocks[0]) - PDF.qAbove : 0);
      if (!fits(need)) newPage();
      if (!atTop()) {
        // a divisória fica no meio do respiro entre a última resposta e a seção
        if (si > 0) { y -= PDF.qAbove; rule(y); }
        y -= PDF.sectionAbove;
      }
      text(safe(sec.title.toLocaleUpperCase('pt-BR'), F.display), PDF.marginX, y, F.display, PDF.sectionSize, PDF.sectionLead, C.petrol);
      y -= PDF.sectionLead + PDF.sectionBelow;
      sec.items.forEach(function (item, qi) { drawQuestion(item, blocks[qi], qi === 0); });
    });

    /* ---------- Confirmação ---------- */
    var conf = wrap(data.confirmLine, F.medium, PDF.confirmSize, measure);
    if (!fits(PDF.sectionAbove * 2 + conf.length * PDF.confirmLead)) newPage();
    if (!atTop()) {
      y -= PDF.sectionAbove;
      rule(y);
      y -= PDF.sectionAbove;
    }
    conf.forEach(function (ln) {
      text(ln, PDF.marginX, y, F.medium, PDF.confirmSize, PDF.confirmLead, C.ink);
      y -= PDF.confirmLead;
    });

    /* ---------- Rodapé: Página x de y ---------- */
    pages.forEach(function (p, i) {
      var label = safe(data.labels.page(i + 1, pages.length), F.regular);
      p.drawText(label, {
        x: W - PDF.marginX - width(label, F.regular, PDF.footSize),
        y: PDF.footBaseline, size: PDF.footSize, font: F.regular, color: C.muted
      });
    });

    /* ---------- Metadados ---------- */
    doc.setTitle(data.labels.title, { showInWindowTitleBar: true });
    doc.setLanguage('pt-BR');
    doc.setAuthor(data.person);
    doc.setCreator(data.labels.header);
    doc.setCreationDate(data.now);
    doc.setModificationDate(data.now);
    return doc.save();
  }

  window.ZyphyPDF = { build: build };
})();
