# Gera as TTF estáticas usadas só pelo PDF (pdf-lib + fontkit), a partir das
# variáveis do repositório google/fonts. Rodado uma vez na construção; o
# resultado fica em assets/fonts/pdf/. Origem e licença: assets/fonts/pdf/FONTES.md
#
# Uso: python tools/fontes-pdf.py <Archivo[wdth,wght].ttf> <SofiaSansExtraCondensed[wght].ttf> <pasta de saída>
# Requer fontTools (pip install fonttools).
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

# mesma faixa do unicode-range do site (latino) + Latin Extended-A, para nomes
# com letras fora do Latin-1 não virarem caixa vazia no PDF
UNICODES = "U+0000-00FF,U+0100-017F,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"

def parse_unicodes(spec):
    out = []
    for part in spec.split(","):
        part = part.replace("U+", "")
        if "-" in part:
            a, b = part.split("-")
            out.extend(range(int(a, 16), int(b, 16) + 1))
        else:
            out.append(int(part, 16))
    return out

def build(src, axes, family, style, ps_name, dest):
    font = TTFont(src)
    static = instancer.instantiateVariableFont(font, axes)
    # nomes do estático (o PDF usa o nome PostScript como BaseFont)
    name = static["name"]
    for rec in list(name.names):
        if rec.nameID in (16, 17, 25):
            name.removeNames(nameID=rec.nameID)
    name.setName(family, 1, 3, 1, 0x409)
    name.setName(style, 2, 3, 1, 0x409)
    name.setName(f"{family} {style}", 4, 3, 1, 0x409)
    name.setName(ps_name, 6, 3, 1, 0x409)
    opts = subset.Options()
    # sem ligaduras: o texto copiado do PDF tem de sair igual ao digitado.
    # tnum fica para o número das perguntas (algarismo tabular)
    opts.layout_features = ["tnum"]
    opts.hinting = False
    opts.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=parse_unicodes(UNICODES))
    sub.subset(static)
    static.save(dest)
    print(dest)

if __name__ == "__main__":
    archivo, sofia, out = sys.argv[1], sys.argv[2], sys.argv[3].rstrip("/\\")
    build(archivo, {"wght": 400, "wdth": 100}, "Archivo", "Regular", "Archivo-Regular", f"{out}/Archivo-Regular.ttf")
    build(archivo, {"wght": 500, "wdth": 100}, "Archivo Medium", "Regular", "Archivo-Medium", f"{out}/Archivo-Medium.ttf")
    build(archivo, {"wght": 600, "wdth": 100}, "Archivo SemiBold", "Regular", "Archivo-SemiBold", f"{out}/Archivo-SemiBold.ttf")
    build(sofia, {"wght": 800}, "Sofia Sans Extra Condensed ExtraBold", "Regular", "SofiaSansExtraCondensed-ExtraBold", f"{out}/SofiaSansExtraCondensed-ExtraBold.ttf")
