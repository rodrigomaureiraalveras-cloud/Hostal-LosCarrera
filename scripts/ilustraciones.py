"""Genera las ilustraciones provisorias del sitio (public/brand/photos/*.svg).

Son dibujos, no fotos: están para que el sitio se vea completo mientras no
haya fotos reales de la hostal. Reemplazalas desde `MEDIA.photos` en
`src/lib/content.ts` cuando tengas las fotos.

Uso:  python3 scripts/ilustraciones.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "brand" / "photos"

# Paleta de las ilustraciones (igual a la del sitio).
NIGHT = "#0b1420"
SKY_TOP = "#2f7fbf"
SKY_LOW = "#bfe6f7"
ACCENT = "#5cc8f0"
ACCENT_DEEP = "#2b8fbf"
WHITE = "#f7f6f2"
WHITE_SHADE = "#dedbd2"
SAND = "#d9b07c"
HILL_1 = "#b8865a"
HILL_2 = "#9a6a44"
WOOD = "#b98758"
WOOD_DARK = "#8a5f3a"
WALL = "#efe8dc"
WALL_SHADE = "#e2d8c8"
STEEL = "#1b2838"
WARM = "#ffd27a"
GREEN = "#6f9a5b"


def svg(w, h, body, defs=""):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
        f'preserveAspectRatio="xMidYMid slice" font-family="Arial, Helvetica, sans-serif">'
        f"<defs>{defs}</defs>{body}</svg>"
    )


def grad(gid, top, bottom, x2=0, y2=1):
    return (
        f'<linearGradient id="{gid}" x1="0" y1="0" x2="{x2}" y2="{y2}">'
        f'<stop offset="0" stop-color="{top}"/><stop offset="1" stop-color="{bottom}"/></linearGradient>'
    )


def rect(x, y, w, h, fill, rx=0, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" {extra}/>'


def text(x, y, s, size, fill, weight="bold", anchor="middle", spacing=0):
    return (
        f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{fill}" '
        f'text-anchor="{anchor}" letter-spacing="{spacing}">{s}</text>'
    )


def wifi_arcs(cx, cy, r, color, width):
    arcs = "".join(
        f'<path d="M{cx - k * r} {cy - k * r * 0.2}A{k * r * 1.2} {k * r * 1.2} 0 0 1 {cx + k * r} {cy - k * r * 0.2}" '
        f'fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>'
        for k in (1, 2, 3)
    )
    return arcs + f'<circle cx="{cx}" cy="{cy + r * 0.3}" r="{width * 0.9}" fill="{color}"/>'


def access_sign(x, y, s):
    """Cuadro azul con el símbolo internacional de accesibilidad."""
    return (
        f'<g transform="translate({x} {y}) scale({s / 100})">'
        f'{rect(0, 0, 100, 100, ACCENT_DEEP, 10)}'
        '<circle cx="50" cy="20" r="8" fill="#fff"/>'
        '<path d="M48 30v26h22l8 20" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'
        '<path d="M48 42h18" stroke="#fff" stroke-width="7" stroke-linecap="round"/>'
        '<path d="M36 48a20 20 0 1 0 30 28" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>'
        "</g>"
    )


def sky(w, h, night=False, sun=True):
    if night:
        defs = grad("sky", "#060b14", "#1d3150")
        stars = "".join(
            f'<circle cx="{(i * 137) % w}" cy="{(i * 71) % int(h * 0.45)}" r="{1.2 + (i % 3) * 0.7}" fill="#fff" opacity="{0.4 + (i % 4) * 0.15}"/>'
            for i in range(1, 70)
        )
        moon = f'<circle cx="{w * 0.82}" cy="{h * 0.16}" r="{h * 0.05}" fill="#f4ecd6"/>'
        return defs, rect(0, 0, w, h, "url(#sky)") + stars + moon
    defs = grad("sky", SKY_TOP, SKY_LOW)
    body = rect(0, 0, w, h, "url(#sky)")
    if sun:
        body += f'<circle cx="{w * 0.8}" cy="{h * 0.17}" r="{h * 0.07}" fill="#fff4d0" opacity=".9"/>'
    return defs, body


def hills(w, base, night=False):
    c1, c2 = ("#2a2f45", "#1d2236") if night else (HILL_1, HILL_2)
    return (
        f'<path d="M0 {base}L0 {base - 170}Q{w * 0.15} {base - 260} {w * 0.3} {base - 150}T{w * 0.62} {base - 190}T{w} {base - 140}L{w} {base}Z" fill="{c1}" opacity=".75"/>'
        f'<path d="M0 {base}L0 {base - 90}Q{w * 0.25} {base - 170} {w * 0.45} {base - 80}T{w} {base - 100}L{w} {base}Z" fill="{c2}"/>'
    )


def bus_stop(x, ground, scale=1.0):
    s = scale
    return (
        f'<g transform="translate({x} {ground}) scale({s})">'
        f'{rect(-4, -230, 8, 230, "#8b95a3")}'
        f'<circle cx="0" cy="-240" r="34" fill="{ACCENT_DEEP}" stroke="#fff" stroke-width="6"/>'
        f'<g transform="translate(-20 -258)">{rect(0, 0, 40, 26, "#fff", 5)}{rect(4, 4, 32, 10, ACCENT_DEEP, 2)}'
        f'<circle cx="9" cy="30" r="5" fill="#fff"/><circle cx="31" cy="30" r="5" fill="#fff"/></g>'
        f'{rect(30, -150, 130, 8, "#8b95a3")}{rect(36, -142, 120, 90, "#cfe9f5", 0, "opacity=\".55\"")}'
        f'{rect(150, -150, 6, 150, "#8b95a3")}{rect(40, -40, 110, 10, WOOD)}'
        "</g>"
    )


def tree(x, ground, s=1.0):
    return (
        f'<g transform="translate({x} {ground}) scale({s})">'
        f'{rect(-9, -170, 18, 170, WOOD_DARK, 4)}'
        f'<circle cx="0" cy="-200" r="70" fill="{GREEN}"/><circle cx="-55" cy="-160" r="50" fill="#5d8a4c"/>'
        f'<circle cx="55" cy="-165" r="52" fill="#7aa866"/></g>'
    )


def hostal(x, ground, w, h, night=False):
    """La hostal: casa blanca de dos pisos con ventanas de marco azul."""
    win_fill = WARM if night else "#9fd3ec"
    wall = "#d9dde6" if night else WHITE
    shade = "#aeb5c4" if night else WHITE_SHADE
    floor_h = h / 2
    parts = [
        rect(x - 14, ground - h - 26, w + 28, 30, shade, 4),  # cornisa
        rect(x, ground - h, w, h, wall),
        rect(x + w * 0.72, ground - h, w * 0.28, h, shade, 0, 'opacity=".55"'),
    ]
    cols = 5
    gap = w / cols
    for row in range(2):
        for c in range(cols):
            if row == 1 and c == cols // 2:
                continue
            wx = x + gap * c + gap * 0.2
            wy = ground - h + floor_h * row + floor_h * 0.22
            ww, wh = gap * 0.6, floor_h * 0.5
            parts.append(rect(wx - 6, wy - 6, ww + 12, wh + 12, ACCENT_DEEP, 3))
            parts.append(rect(wx, wy, ww, wh, win_fill))
            parts.append(rect(wx + ww / 2 - 2, wy, 4, wh, ACCENT_DEEP))
            parts.append(rect(wx - 10, wy + wh + 6, ww + 20, 8, shade, 2))
    # puerta y letrero
    dx = x + w / 2 - gap * 0.32
    dw_ = gap * 0.64
    parts.append(rect(dx - 8, ground - floor_h * 0.78 - 8, dw_ + 16, floor_h * 0.78 + 8, ACCENT_DEEP, 6))
    parts.append(rect(dx, ground - floor_h * 0.78, dw_, floor_h * 0.78, WOOD))
    parts.append(f'<circle cx="{dx + dw_ * 0.8}" cy="{ground - floor_h * 0.38}" r="4" fill="{WARM}"/>')
    sw = w * 0.56
    parts.append(rect(x + (w - sw) / 2, ground - floor_h - 30, sw, 50, NIGHT, 6))
    parts.append(text(x + w / 2, ground - floor_h + 4, "HOSTAL LOS CARRERA", 26 * w / 900, "#fff", spacing=3))
    # escalón y accesibilidad
    parts.append(rect(dx - 30, ground - 12, dw_ + 60, 12, shade))
    parts.append(access_sign(dx + dw_ + 26, ground - floor_h * 0.62, 46 * w / 900))
    return "".join(parts)


def street(w, ground, h, night=False):
    return (
        rect(0, ground, w, 40, "#c9c3b8" if not night else "#4a4f5c")
        + rect(0, ground + 40, w, h - ground - 40, "#3b4049" if not night else "#20242c")
        + "".join(rect(i, ground + 40 + (h - ground - 40) / 2 - 4, 70, 8, "#e9e3d6", 2) for i in range(20, w, 140))
    )


def micro(x, y, s=1.0):
    return (
        f'<g transform="translate({x} {y}) scale({s})">'
        f'{rect(0, 0, 420, 150, "#f2f2ee", 22)}{rect(0, 96, 420, 26, ACCENT_DEEP)}'
        + "".join(rect(20 + i * 78, 22, 64, 56, "#7fc4e3", 6) for i in range(5))
        + f'{rect(392, 22, 22, 56, "#7fc4e3", 6)}'
        f'<circle cx="80" cy="150" r="28" fill="{STEEL}"/><circle cx="80" cy="150" r="11" fill="#aab"/>'
        f'<circle cx="340" cy="150" r="28" fill="{STEEL}"/><circle cx="340" cy="150" r="11" fill="#aab"/>'
        "</g>"
    )


def colectivo(x, y, s=1.0):
    return (
        f'<g transform="translate({x} {y}) scale({s})">'
        f'<path d="M10 70L60 22h120l50 48h40q12 0 12 14v34H0V84q0-14 10-14Z" fill="#14161b"/>'
        f'{rect(80, 0, 80, 24, WARM, 4)}{text(120, 17, "COLECTIVO", 13, NIGHT)}'
        f'<path d="M70 32h46v38H38Z" fill="#8fb9cf"/><path d="M126 32h50l34 38h-84Z" fill="#8fb9cf"/>'
        f'<circle cx="60" cy="118" r="22" fill="#2a2d33"/><circle cx="60" cy="118" r="9" fill="#aab"/>'
        f'<circle cx="230" cy="118" r="22" fill="#2a2d33"/><circle cx="230" cy="118" r="9" fill="#aab"/>'
        "</g>"
    )


def scene_facade(w, h, night=False):
    defs, body = sky(w, h, night)
    ground = h * 0.78
    bw = w * 0.86 if h > w else min(w * 0.62, h * 1.1)
    bh = bw * 0.48
    bx = (w - bw) / 2
    body += hills(w, ground - bh * 0.35, night)
    body += street(w, ground, h, night)
    body += tree(bx - bw * 0.12, ground + 10, bw / 900)
    body += hostal(bx, ground, bw, bh, night)
    body += bus_stop(bx + bw + bw * 0.06, ground + 30, bw / 900)
    if night:
        body += f'<ellipse cx="{w / 2}" cy="{ground + 20}" rx="{bw * 0.6}" ry="30" fill="{WARM}" opacity=".12"/>'
    return svg(w, h, body, defs)


def interior(w, h, floor_y):
    defs = grad("wall", WALL, WALL_SHADE) + grad("floor", WOOD, WOOD_DARK)
    body = rect(0, 0, w, floor_y, "url(#wall)") + rect(0, floor_y, w, h - floor_y, "url(#floor)")
    body += "".join(
        f'<path d="M{i} {floor_y}L{i * 1.4 - w * 0.2} {h}" stroke="{WOOD_DARK}" stroke-width="2" opacity=".35"/>'
        for i in range(0, w + 200, 120)
    )
    body += rect(0, floor_y - 14, w, 14, WHITE_SHADE)
    return defs, body


def window(x, y, w, h):
    defs = grad("view", SKY_TOP, SKY_LOW)
    body = rect(x - 14, y - 14, w + 28, h + 28, WHITE, 6) + rect(x, y, w, h, "url(#view)")
    body += f'<path d="M{x} {y + h}L{x} {y + h * 0.7}Q{x + w * 0.3} {y + h * 0.5} {x + w * 0.55} {y + h * 0.72}T{x + w} {y + h * 0.66}L{x + w} {y + h}Z" fill="{HILL_1}"/>'
    body += rect(x + w / 2 - 4, y, 8, h, WHITE)
    body += rect(x - 30, y - 30, 26, h + 70, ACCENT_DEEP, 4, 'opacity=".75"')
    body += rect(x + w + 4, y - 30, 26, h + 70, ACCENT_DEEP, 4, 'opacity=".75"')
    return defs, body


def tv_unit(x, y, w, on=True):
    h = w * 0.58
    screen = (
        grad("scr", "#2c6ea3", "#9bd6ef")
        if on
        else grad("scr", STEEL, NIGHT)
    )
    body = rect(x - 8, y - 8, w + 16, h + 16, "#111318", 8) + rect(x, y, w, h, "url(#scr)")
    if on:
        body += f'<path d="M{x} {y + h}L{x} {y + h * 0.65}Q{x + w * 0.25} {y + h * 0.4} {x + w * 0.5} {y + h * 0.62}T{x + w} {y + h * 0.55}L{x + w} {y + h}Z" fill="{HILL_1}" opacity=".9"/>'
        body += f'<circle cx="{x + w * 0.78}" cy="{y + h * 0.28}" r="{h * 0.1}" fill="#fff4d0"/>'
    return screen, body


def bed(x, y, w):
    h = w * 0.42
    return (
        rect(x, y - h * 0.55, w * 0.06, h * 1.25, WOOD_DARK, 8)
        + rect(x + w * 0.04, y, w * 0.96, h * 0.5, WHITE, 10)
        + rect(x + w * 0.04, y + h * 0.5, w * 0.96, h * 0.22, WOOD, 6)
        + rect(x + w * 0.38, y - 6, w * 0.62, h * 0.56, ACCENT_DEEP, 12)
        + rect(x + w * 0.38, y - 6, w * 0.62, h * 0.12, ACCENT, 8)
        + rect(x + w * 0.08, y - h * 0.18, w * 0.24, h * 0.22, "#fff", 14)
    )


def nightstand(x, y, s):
    return (
        rect(x, y - 90 * s, 90 * s, 90 * s, WOOD, 6)
        + rect(x + 10 * s, y - 60 * s, 70 * s, 4 * s, WOOD_DARK)
        + rect(x + 40 * s, y - 150 * s, 8 * s, 60 * s, "#555")
        + f'<path d="M{x + 14 * s} {y - 150 * s}h60l-12-50h-36Z" fill="{WARM}"/>'
    )


def scene_room(w=1200, h=1500):
    floor_y = h * 0.66
    defs, body = interior(w, h, floor_y)
    d2, b2 = window(w * 0.12, h * 0.16, w * 0.3, h * 0.24)
    d3, b3 = tv_unit(w * 0.56, h * 0.2, w * 0.32)
    defs += d2 + d3
    body += b2 + b3
    body += rect(w * 0.06, floor_y - h * 0.02, w * 0.04, 4, WALL)
    body += bed(w * 0.1, floor_y + h * 0.04, w * 0.82)
    body += nightstand(w * 0.78, floor_y + h * 0.02, w / 1200)
    body += f'<g opacity=".9">{wifi_arcs(w * 0.88, h * 0.1, 18 * w / 1200, ACCENT_DEEP, 7 * w / 1200)}</g>'
    return svg(w, h, body, defs)


def scene_bathroom(w=1200, h=1500):
    defs = grad("tile", "#f4f6f7", "#dfe6ea")
    body = rect(0, 0, w, h, "url(#tile)")
    body += "".join(f'<path d="M0 {y}H{w}" stroke="#c8d3da" stroke-width="3"/>' for y in range(0, h, 100))
    body += "".join(f'<path d="M{x} 0V{h}" stroke="#c8d3da" stroke-width="3"/>' for x in range(0, w, 100))
    body += rect(0, h * 0.82, w, h * 0.18, "#b9c4cc")
    # ducha
    body += rect(w * 0.05, h * 0.1, w * 0.36, h * 0.72, "#bfe3f2", 4, 'opacity=".45"')
    body += rect(w * 0.4, h * 0.1, 10, h * 0.72, "#9aa7b1")
    body += rect(w * 0.12, h * 0.14, 10, h * 0.14, "#9aa7b1")
    body += f'<path d="M{w * 0.08} {h * 0.29}h{w * 0.12}l-{w * 0.02} -{h * 0.02}h-{w * 0.08}Z" fill="#9aa7b1"/>'
    body += "".join(
        f'<path d="M{w * 0.1 + i * 22} {h * 0.32 + (i % 3) * 30}v40" stroke="{ACCENT}" stroke-width="5" stroke-linecap="round" opacity=".7"/>'
        for i in range(5)
    )
    # lavamanos y espejo
    body += rect(w * 0.52, h * 0.16, w * 0.3, h * 0.24, "#e9f4f8", 20, f'stroke="{ACCENT_DEEP}" stroke-width="10"')
    body += f'<path d="M{w * 0.56} {h * 0.2}l{w * 0.08} {h * 0.08}" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".8"/>'
    body += rect(w * 0.5, h * 0.46, w * 0.34, h * 0.05, WHITE, 16)
    body += rect(w * 0.64, h * 0.42, 12, h * 0.04, "#9aa7b1", 4)
    body += rect(w * 0.6, h * 0.51, w * 0.14, h * 0.18, WHITE_SHADE, 8)
    # inodoro
    body += rect(w * 0.86, h * 0.58, w * 0.12, h * 0.12, WHITE, 12)
    body += f'<ellipse cx="{w * 0.88}" cy="{h * 0.7}" rx="{w * 0.1}" ry="{h * 0.035}" fill="{WHITE}"/>'
    body += rect(w * 0.84, h * 0.71, w * 0.08, h * 0.11, WHITE, 10)
    # toalla
    body += rect(w * 0.47, h * 0.58, w * 0.1, 8, "#9aa7b1", 4)
    body += rect(w * 0.48, h * 0.585, w * 0.08, h * 0.16, ACCENT, 8)
    return svg(w, h, body, defs)


def scene_wifi(w=1600, h=1200):
    defs, body = interior(w, h, h * 0.62)
    body += rect(w * 0.1, h * 0.55, w * 0.8, h * 0.05, WOOD_DARK, 8)
    body += rect(w * 0.14, h * 0.6, 22, h * 0.32, WOOD_DARK) + rect(w * 0.84, h * 0.6, 22, h * 0.32, WOOD_DARK)
    # laptop
    body += f'<path d="M{w * 0.3} {h * 0.55}l{w * 0.04} -{h * 0.03}h{w * 0.28}l{w * 0.04} {h * 0.03}Z" fill="#c9ccd2"/>'
    body += rect(w * 0.34, h * 0.24, w * 0.28, h * 0.28, "#111318", 12)
    body += rect(w * 0.355, h * 0.26, w * 0.25, h * 0.24, ACCENT_DEEP, 4)
    body += wifi_arcs(w * 0.48, h * 0.4, 34, "#fff", 12)
    # router
    body += rect(w * 0.7, h * 0.49, w * 0.14, h * 0.06, WHITE, 10)
    body += "".join(f'<circle cx="{w * 0.72 + i * 22}" cy="{h * 0.52}" r="5" fill="{ACCENT}"/>' for i in range(4))
    body += rect(w * 0.715, h * 0.36, 8, h * 0.13, WHITE_SHADE, 4) + rect(w * 0.82, h * 0.36, 8, h * 0.13, WHITE_SHADE, 4)
    body += f'<g opacity=".8">{wifi_arcs(w * 0.77, h * 0.26, 40, ACCENT_DEEP, 10)}</g>'
    # celular y taza
    body += rect(w * 0.16, h * 0.5, w * 0.06, h * 0.05, STEEL, 8)
    body += rect(w * 0.235, h * 0.47, w * 0.04, h * 0.08, WHITE, 6)
    body += text(w * 0.5, h * 0.14, "WIFI GRATIS", 64, ACCENT_DEEP, spacing=6)
    return svg(w, h, body, defs)


def scene_tv(w=1600, h=1200):
    defs, body = interior(w, h, h * 0.68)
    d, b = tv_unit(w * 0.26, h * 0.14, w * 0.48)
    defs += d
    body += b
    body += rect(w * 0.2, h * 0.58, w * 0.6, h * 0.08, WOOD, 8)
    body += f'<g opacity=".9">{wifi_arcs(w * 0.88, h * 0.16, 24, ACCENT_DEEP, 8)}</g>'
    # pie de cama
    body += rect(w * 0.05, h * 0.82, w * 0.9, h * 0.2, WHITE, 18) + rect(w * 0.05, h * 0.8, w * 0.9, h * 0.06, ACCENT_DEEP, 14)
    # control remoto
    body += rect(w * 0.62, h * 0.86, w * 0.1, h * 0.03, STEEL, 10)
    body += f'<circle cx="{w * 0.64}" cy="{h * 0.875}" r="7" fill="#e5484d"/>'
    return svg(w, h, body, defs)


def chair(x, y, s, flip=False):
    sx = -s if flip else s
    return (
        f'<g transform="translate({x} {y}) scale({sx} {s})">'
        f'{rect(0, -180, 16, 180, WOOD_DARK, 4)}{rect(0, -80, 90, 14, WOOD, 4)}{rect(76, -70, 12, 70, WOOD_DARK, 4)}'
        f'{rect(0, -180, 16, 70, ACCENT_DEEP, 4)}'
        "</g>"
    )


def scene_dining(w=1600, h=1200):
    floor_y = h * 0.64
    defs, body = interior(w, h, floor_y)
    d, b = window(w * 0.08, h * 0.14, w * 0.22, h * 0.26)
    defs += d
    body += b
    # cocina
    body += rect(w * 0.55, h * 0.4, w * 0.42, h * 0.24, WHITE, 6) + rect(w * 0.54, h * 0.38, w * 0.44, h * 0.03, WOOD_DARK, 4)
    body += "".join(rect(w * 0.57 + i * w * 0.14, h * 0.44, w * 0.12, h * 0.17, WHITE_SHADE, 4) for i in range(3))
    body += rect(w * 0.58, h * 0.29, w * 0.12, h * 0.09, STEEL, 6) + rect(w * 0.595, h * 0.305, w * 0.07, h * 0.06, "#2c3a4c", 3)
    body += f'<path d="M{w * 0.78} {h * 0.38}v-{h * 0.07}q0-{h * 0.02} {w * 0.03} -{h * 0.02}h{w * 0.02}q{w * 0.02} 0 {w * 0.02} {h * 0.02}v{h * 0.07}Z" fill="{ACCENT_DEEP}"/>'
    body += rect(w * 0.55, h * 0.1, w * 0.42, h * 0.14, WHITE, 6) + "".join(
        f'<path d="M{w * 0.55 + i * w * 0.105} {h * 0.1}v{h * 0.14}" stroke="{WHITE_SHADE}" stroke-width="4"/>' for i in range(1, 4)
    )
    # lámparas
    for cx in (w * 0.24, w * 0.4):
        body += f'<path d="M{cx} 0v{h * 0.26}" stroke="#555" stroke-width="4"/><path d="M{cx - 50} {h * 0.32}h100l-20-{h * 0.06}h-60Z" fill="{ACCENT_DEEP}"/>'
        body += f'<ellipse cx="{cx}" cy="{h * 0.33}" rx="40" ry="10" fill="{WARM}" opacity=".9"/>'
    # mesa y sillas
    body += chair(w * 0.08, floor_y + h * 0.22, w / 1600)
    body += chair(w * 0.56, floor_y + h * 0.22, w / 1600, flip=True)
    body += rect(w * 0.1, floor_y - h * 0.02, w * 0.44, h * 0.04, WOOD, 6)
    body += rect(w * 0.13, floor_y + h * 0.02, 20, h * 0.2, WOOD_DARK) + rect(w * 0.5, floor_y + h * 0.02, 20, h * 0.2, WOOD_DARK)
    body += f'<ellipse cx="{w * 0.32}" cy="{floor_y - h * 0.03}" rx="70" ry="22" fill="{WHITE}"/>'
    body += "".join(f'<circle cx="{w * 0.3 + i * 30}" cy="{floor_y - h * 0.05}" r="18" fill="{c}"/>' for i, c in enumerate(("#e5484d", WARM, GREEN)))
    body += rect(w * 0.18, floor_y - h * 0.065, 34, 40, WHITE, 6) + rect(w * 0.44, floor_y - h * 0.065, 34, 40, ACCENT, 6)
    return svg(w, h, body, defs)


def washer(x, y, s):
    return (
        f'<g transform="translate({x} {y}) scale({s})">'
        f'{rect(0, -300, 240, 300, WHITE, 16)}{rect(0, -300, 240, 56, WHITE_SHADE, 16)}'
        f'<circle cx="190" cy="-272" r="12" fill="{ACCENT_DEEP}"/>{rect(24, -282, 80, 18, "#b9c4cc", 4)}'
        f'<circle cx="120" cy="-122" r="86" fill="#c8d3da"/><circle cx="120" cy="-122" r="66" fill="#7fc4e3"/>'
        f'<path d="M66 -112q54 30 108 0v30q-54 50-108 0Z" fill="{ACCENT_DEEP}" opacity=".6"/>'
        "</g>"
    )


def scene_laundry(w=1600, h=1200):
    floor_y = h * 0.8
    defs = grad("tile", "#f4f6f7", "#e3e9ec")
    body = rect(0, 0, w, h, "url(#tile)") + rect(0, floor_y, w, h - floor_y, "#b9c4cc")
    body += "".join(f'<path d="M0 {y}H{w}" stroke="#d3dbe0" stroke-width="2"/>' for y in range(0, int(floor_y), 80))
    s = w / 1600
    body += washer(w * 0.08, floor_y, s * 1.2) + washer(w * 0.08 + 300 * s * 1.2, floor_y, s * 1.2)
    # repisa
    body += rect(w * 0.06, h * 0.3, w * 0.42, 16, WOOD, 4)
    body += rect(w * 0.1, h * 0.3 - 110 * s, 70 * s, 110 * s, ACCENT_DEEP, 10) + rect(w * 0.2, h * 0.3 - 80 * s, 60 * s, 80 * s, WARM, 10)
    body += rect(w * 0.3, h * 0.3 - 60 * s, 120 * s, 60 * s, WHITE_SHADE, 8)
    # cordel con ropa
    body += f'<path d="M{w * 0.58} {h * 0.18}Q{w * 0.77} {h * 0.26} {w * 0.97} {h * 0.18}" fill="none" stroke="#7a828c" stroke-width="4"/>'
    for i, c in enumerate((ACCENT, WHITE, WARM, ACCENT_DEEP)):
        cx = w * 0.63 + i * w * 0.085
        cy = h * 0.2 + (1.4 - abs(i - 1.5)) * 18
        body += f'<path d="M{cx - 50 * s} {cy}h{100 * s}l{20 * s} {40 * s}-{24 * s} {8 * s}v{110 * s}h-{92 * s}v-{110 * s}l-{24 * s} -{8 * s}Z" fill="{c}" stroke="#c8d3da" stroke-width="2"/>'
    # canasto
    body += f'<path d="M{w * 0.66} {floor_y}l-{w * 0.02} -{h * 0.16}h{w * 0.22}l-{w * 0.02} {h * 0.16}Z" fill="{WOOD}"/>'
    body += "".join(f'<path d="M{w * 0.645 + i * w * 0.03} {floor_y - h * 0.15}v{h * 0.14}" stroke="{WOOD_DARK}" stroke-width="3"/>' for i in range(7))
    body += f'<ellipse cx="{w * 0.75}" cy="{floor_y - h * 0.17}" rx="{w * 0.1}" ry="{h * 0.03}" fill="{WHITE}"/>'
    return svg(w, h, body, defs)


def wheelchair(x, y, s):
    return (
        f'<g transform="translate({x} {y}) scale({s})" fill="none" stroke="{STEEL}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">'
        '<circle cx="0" cy="0" r="110"/><circle cx="0" cy="0" r="80" stroke-width="5"/>'
        '<circle cx="170" cy="70" r="40"/>'
        '<path d="M-40 -230v150h170l40 150"/><path d="M-40 -100h120"/><path d="M-40 -230h-40"/>'
        "</g>"
    )


def scene_accessible(w=1200, h=1500):
    floor_y = h * 0.7
    defs, body = interior(w, h, floor_y)
    # puerta ancha
    body += rect(w * 0.06, h * 0.14, w * 0.42, floor_y - h * 0.14, ACCENT_DEEP, 6)
    body += rect(w * 0.08, h * 0.16, w * 0.38, floor_y - h * 0.16, "#dff1f8")
    body += rect(w * 0.08, floor_y - h * 0.02, w * 0.38, h * 0.02, WHITE_SHADE)
    body += access_sign(w * 0.18, h * 0.24, w * 0.16)
    body += text(w * 0.27, h * 0.48, "ACCESIBLE", 44 * w / 1200, ACCENT_DEEP, spacing=4)
    # barras de apoyo
    body += rect(w * 0.56, h * 0.44, w * 0.36, 14, "#9aa7b1", 7)
    body += rect(w * 0.56, h * 0.36, 14, h * 0.08, "#9aa7b1", 7)
    # cama baja
    body += rect(w * 0.55, floor_y - h * 0.06, w * 0.42, h * 0.08, WHITE, 10) + rect(w * 0.7, floor_y - h * 0.07, w * 0.27, h * 0.08, ACCENT, 10)
    body += rect(w * 0.55, floor_y + h * 0.02, w * 0.42, h * 0.03, WOOD, 4)
    body += wheelchair(w * 0.3, floor_y + h * 0.18, w / 1200 * 1.15)
    return svg(w, h, body, defs)


def storefront(x, ground, w, h, label, awning):
    stripes = "".join(
        f'<path d="M{x + i * w / 8} {ground - h}h{w / 16}v{h * 0.18}h-{w / 16}Z" fill="{awning}"/>' for i in range(8)
    )
    return (
        rect(x, ground - h * 1.35, w, h * 1.35, WHITE)
        + rect(x, ground - h * 1.35, w, h * 0.3, NIGHT)
        + text(x + w / 2, ground - h * 1.17, label, w * 0.07, "#fff", spacing=3)
        + rect(x, ground - h, w, h * 0.18, "#fff")
        + stripes
        + rect(x + w * 0.06, ground - h * 0.72, w * 0.52, h * 0.62, "#9fd3ec")
        + rect(x + w * 0.66, ground - h * 0.72, w * 0.28, h * 0.72, ACCENT_DEEP, 4)
        + rect(x + w * 0.68, ground - h * 0.7, w * 0.24, h * 0.7, "#cfe9f5")
    )


def cart(x, y, s):
    return (
        f'<g transform="translate({x} {y}) scale({s})" fill="none" stroke="{STEEL}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">'
        '<path d="M-60 -160h40l40 120h150l30-90H0"/><circle cx="40" cy="0" r="18" fill="#fff"/><circle cx="160" cy="0" r="18" fill="#fff"/>'
        f'<path d="M30 -130h150l-20 70H50Z" fill="{ACCENT}" stroke="none" opacity=".8"/>'
        "</g>"
    )


def scene_supermarket(w=1600, h=1200):
    defs, body = sky(w, h)
    ground = h * 0.8
    body += hills(w, ground - h * 0.25)
    body += street(w, ground, h)
    body += storefront(w * 0.1, ground, w * 0.62, h * 0.42, "SUPERMERCADO", "#e5484d")
    body += tree(w * 0.84, ground + 10, w / 1600)
    body += cart(w * 0.76, ground + 20, w / 1600)
    body += f'<path d="M{w * 0.06} {ground + 26}h80l-10 -90h-60Z" fill="{WARM}"/>'
    return svg(w, h, body, defs)


def scene_casino(w=1600, h=1200):
    defs, body = sky(w, h, night=True)
    ground = h * 0.8
    body += hills(w, ground - h * 0.2, night=True)
    body += street(w, ground, h, night=True)
    bx, bw, bh = w * 0.18, w * 0.64, h * 0.42
    body += rect(bx, ground - bh, bw, bh, "#28324a")
    body += "".join(
        rect(bx + 30 + c * (bw - 60) / 10, ground - bh + 40 + r * 70, (bw - 60) / 10 - 18, 40, WARM, 3, f'opacity="{0.55 + ((r + c) % 3) * 0.15}"')
        for r in range(3)
        for c in range(10)
    )
    body += rect(bx + bw * 0.25, ground - bh - 90, bw * 0.5, 110, NIGHT, 12, f'stroke="{WARM}" stroke-width="6"')
    body += "".join(
        f'<circle cx="{bx + bw * 0.25 + 14 + i * (bw * 0.5 - 28) / 19}" cy="{ground - bh - 90}" r="6" fill="{WARM}"/>' for i in range(20)
    )
    body += text(bx + bw / 2, ground - bh - 18, "CASINO", 64, WARM, spacing=12)
    body += rect(bx + bw * 0.4, ground - bh * 0.32, bw * 0.2, bh * 0.32, WARM, 6, 'opacity=".9"')
    body += f'<ellipse cx="{w / 2}" cy="{ground + 10}" rx="{bw * 0.55}" ry="40" fill="{WARM}" opacity=".15"/>'
    for px in (w * 0.08, w * 0.9):
        body += f'<path d="M{px} {ground}q-10 -150 6 -300" stroke="{WOOD_DARK}" stroke-width="16" fill="none"/>'
        body += "".join(
            f'<path d="M{px + 6} {ground - 300}q{dx} -30 {dx * 2} {dy}" stroke="#3f6b45" stroke-width="22" stroke-linecap="round" fill="none"/>'
            for dx, dy in ((-60, 40), (60, 40), (-40, 80), (50, 90), (0, -10))
        )
    return svg(w, h, body, defs)


def scene_transport(w=1600, h=1200):
    defs, body = sky(w, h)
    ground = h * 0.66
    body += hills(w, ground - h * 0.25)
    body += street(w, ground, h)
    bw = w * 0.5
    body += hostal(-bw * 0.35, ground, bw, bw * 0.48)
    body += bus_stop(w * 0.3, ground + 30, w / 1600 * 0.9)
    body += micro(w * 0.4, ground + h * 0.06, w / 1600 * 1.35)
    body += colectivo(w * 0.06, ground + h * 0.16, w / 1600 * 1.2)
    return svg(w, h, body, defs)


def logo():
    """Logo: casita blanca con puerta azul, sobre el nombre."""
    house = (
        '<path d="M200 40L330 140V300H70V140Z" fill="#fff"/>'
        f'<path d="M200 22L352 140l-16 20L200 54 64 160l-16-20Z" fill="{ACCENT}"/>'
        f'{rect(170, 200, 60, 100, ACCENT_DEEP, 6)}'
        f'{rect(100, 170, 46, 46, ACCENT_DEEP, 4)}{rect(254, 170, 46, 46, ACCENT_DEEP, 4)}'
    )
    body = (
        house
        + text(200, 372, "HOSTAL", 38, ACCENT, spacing=12)
        + text(200, 430, "LOS CARRERA", 44, "#fff", spacing=1)
    )
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 450" width="400" height="450" font-family="Arial, Helvetica, sans-serif">{body}</svg>'


def logomark():
    body = (
        f'<circle cx="100" cy="100" r="96" fill="{NIGHT}" stroke="{ACCENT}" stroke-width="6"/>'
        '<path d="M100 44L156 88V152H44V88Z" fill="#fff"/>'
        f'<path d="M100 34L166 86l-8 10-58-46-58 46-8-10Z" fill="{ACCENT}"/>'
        f'{rect(86, 112, 28, 40, ACCENT_DEEP, 3)}'
    )
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">{body}</svg>'


def emblem():
    """Llave de la habitación, para la chapita del hero."""
    body = (
        f'<circle cx="70" cy="70" r="46" fill="none" stroke="{ACCENT}" stroke-width="18"/>'
        f'<path d="M103 103L180 180M150 150l20-20M168 168l18-18" stroke="{ACCENT}" stroke-width="18" stroke-linecap="round"/>'
        f'<circle cx="70" cy="70" r="14" fill="{ACCENT}"/>'
    )
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">{body}</svg>'


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    files = {
        "facade-wide.svg": scene_facade(1920, 1080),
        "facade-tall.svg": scene_facade(1080, 1600),
        "facade-night.svg": scene_facade(1600, 1200, night=True),
        "room.svg": scene_room(),
        "bathroom.svg": scene_bathroom(),
        "wifi.svg": scene_wifi(),
        "tv.svg": scene_tv(),
        "dining.svg": scene_dining(),
        "laundry.svg": scene_laundry(),
        "accessible.svg": scene_accessible(),
        "supermarket.svg": scene_supermarket(),
        "casino.svg": scene_casino(),
        "transport.svg": scene_transport(),
    }
    for name, content in files.items():
        (OUT / name).write_text(content)
    brand = OUT.parent
    (brand / "logo.svg").write_text(logo())
    (brand / "logomark.svg").write_text(logomark())
    (brand / "emblem.svg").write_text(emblem())
    print(f"{len(files) + 3} ilustraciones en {brand}")
