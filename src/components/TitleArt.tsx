import { useId } from "react";
import type { Motif, PaletteName, Title } from "../data/titles";

type Palette = { deep: string; mid: string; light: string };

const palettes: Record<PaletteName, Palette> = {
  amber: { deep: "#0d0702", mid: "#8a4a10", light: "#f3b851" },
  teal: { deep: "#020a0c", mid: "#125257", light: "#e3d3a6" },
  oxblood: { deep: "#0c0304", mid: "#7a2018", light: "#eeb27a" },
  midnight: { deep: "#03050c", mid: "#1d2f5c", light: "#ecca80" },
  moss: { deep: "#050804", mid: "#3d5230", light: "#ddd39a" },
  slate: { deep: "#06080a", mid: "#414d5c", light: "#ecdfc6" },
};

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Small seeded generator so the same title always draws the same picture.
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v: number) => Math.round(v * 10) / 10;

function drawMotif(
  motif: Motif,
  p: Palette,
  w: number,
  h: number,
  fx: number,
  rnd: () => number,
  glow: string,
) {
  const unit = Math.min(w, h);
  switch (motif) {
    case "sun": {
      const horizon = h * 0.64;
      const cx = w * fx;
      const r = unit * 0.3;
      const bands = Array.from({ length: 6 }, (_, i) => {
        const bw = r * 2 * (1 - i * 0.14);
        return (
          <rect
            key={i}
            x={n(cx - bw / 2)}
            y={n(horizon + unit * 0.035 + i * unit * 0.05)}
            width={n(bw)}
            height={n(unit * 0.012)}
            fill={p.light}
            opacity={n(0.5 - i * 0.07)}
          />
        );
      });
      return (
        <>
          <circle cx={n(cx)} cy={n(horizon)} r={n(r * 2.1)} fill={`url(#${glow})`} />
          <circle cx={n(cx)} cy={n(horizon)} r={n(r)} fill={p.light} />
          <rect x="0" y={n(horizon)} width={w} height={n(h - horizon)} fill={p.deep} />
          {bands}
        </>
      );
    }
    case "ridges": {
      const layers = 4;
      const shapes = Array.from({ length: layers }, (_, layer) => {
        const base = h * (0.46 + layer * 0.13);
        const amp = unit * (0.2 - layer * 0.03);
        const steps = 9;
        const pts = Array.from({ length: steps + 1 }, (_, i) => {
          const x = (w / steps) * i;
          const y = base - rnd() * amp;
          return `${n(x)},${n(y)}`;
        });
        return (
          <polygon
            key={layer}
            points={`0,${h} ${pts.join(" ")} ${w},${h}`}
            fill={layer === layers - 1 ? p.deep : p.mid}
            opacity={layer === layers - 1 ? 1 : n(0.3 + layer * 0.2)}
          />
        );
      });
      return (
        <>
          <circle cx={n(w * fx)} cy={n(h * 0.26)} r={n(unit * 0.5)} fill={`url(#${glow})`} />
          <circle cx={n(w * fx)} cy={n(h * 0.26)} r={n(unit * 0.07)} fill={p.light} />
          {shapes}
        </>
      );
    }
    case "beams": {
      const ox = w * (fx > 0.5 ? 0.98 : 0.92);
      const oy = -h * 0.08;
      const beams = Array.from({ length: 5 }, (_, i) => {
        const start = w * (-0.25 + i * 0.2 + rnd() * 0.05);
        const width = w * (0.07 + rnd() * 0.08);
        return (
          <polygon
            key={i}
            points={`${n(ox)},${n(oy)} ${n(start)},${h} ${n(start + width)},${h}`}
            fill={p.light}
            opacity={n(0.07 + rnd() * 0.16)}
          />
        );
      });
      return (
        <>
          <circle cx={n(ox)} cy={n(oy)} r={n(unit * 0.9)} fill={`url(#${glow})`} />
          {beams}
          <circle cx={n(ox - unit * 0.04)} cy={n(h * 0.03)} r={n(unit * 0.035)} fill={p.light} />
          <rect x="0" y={n(h * 0.86)} width={w} height={n(h * 0.14)} fill={p.deep} opacity="0.8" />
        </>
      );
    }
    case "rings": {
      const cx = w * fx;
      const cy = h * 0.4;
      const rings = Array.from({ length: 7 }, (_, i) => (
        <circle
          key={i}
          cx={n(cx)}
          cy={n(cy)}
          r={n(unit * (0.2 + i * 0.085))}
          fill="none"
          stroke={p.light}
          strokeWidth={n(unit * 0.004)}
          opacity={n(0.55 - i * 0.07)}
        />
      ));
      return (
        <>
          <circle cx={n(cx)} cy={n(cy)} r={n(unit * 0.5)} fill={`url(#${glow})`} />
          {rings}
          <circle cx={n(cx)} cy={n(cy)} r={n(unit * 0.165)} fill={p.light} />
          <circle
            cx={n(cx + unit * 0.035)}
            cy={n(cy - unit * 0.02)}
            r={n(unit * 0.155)}
            fill={p.deep}
          />
        </>
      );
    }
    case "pillars": {
      const count = Math.round(w / (unit * 0.11));
      const bw = w / count;
      const lights: JSX.Element[] = [];
      const bars = Array.from({ length: count }, (_, i) => {
        const bh = h * (0.16 + rnd() * 0.36);
        const x = i * bw;
        const rows = Math.floor(bh / (unit * 0.07));
        for (let r = 1; r < rows; r++) {
          if (rnd() > 0.72) {
            lights.push(
              <rect
                key={`${i}-${r}`}
                x={n(x + bw * 0.3)}
                y={n(h - bh + r * unit * 0.07)}
                width={n(bw * 0.22)}
                height={n(unit * 0.02)}
                fill={p.light}
                opacity="0.85"
              />,
            );
          }
        }
        return (
          <rect
            key={i}
            x={n(x)}
            y={n(h - bh)}
            width={n(bw * 0.9)}
            height={n(bh)}
            fill={p.deep}
          />
        );
      });
      return (
        <>
          <ellipse
            cx={n(w * fx)}
            cy={n(h * 0.72)}
            rx={n(w * 0.6)}
            ry={n(h * 0.42)}
            fill={`url(#${glow})`}
          />
          {bars}
          {lights}
        </>
      );
    }
    case "door": {
      const dw = unit * 0.24;
      const dh = unit * 0.58;
      const cx = w * fx;
      const floor = h * 0.68;
      return (
        <>
          <rect x="0" y="0" width={w} height={h} fill={p.deep} opacity="0.55" />
          <circle cx={n(cx)} cy={n(floor - dh / 2)} r={n(unit * 0.62)} fill={`url(#${glow})`} />
          <polygon
            points={`${n(cx - dw / 2)},${n(floor)} ${n(cx + dw / 2)},${n(floor)} ${n(cx + dw * 1.6)},${h} ${n(cx - dw * 1.6)},${h}`}
            fill={p.light}
            opacity="0.22"
          />
          <rect
            x={n(cx - dw / 2)}
            y={n(floor - dh)}
            width={n(dw)}
            height={n(dh)}
            fill={p.light}
          />
          <rect
            x={n(cx - dw * 0.09)}
            y={n(floor - dh * 0.36)}
            width={n(dw * 0.18)}
            height={n(dh * 0.36)}
            fill={p.deep}
          />
          <circle cx={n(cx)} cy={n(floor - dh * 0.4)} r={n(dw * 0.11)} fill={p.deep} />
        </>
      );
    }
  }
}

type Props = {
  item: Pick<Title, "title" | "motif" | "palette">;
  /** "poster" is a 2:3 one-sheet, "wide" is a scope-ratio backdrop. */
  shape?: "poster" | "wide";
  className?: string;
};

export default function TitleArt({ item, shape = "poster", className }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const wide = shape === "wide";
  const w = wide ? 1200 : 200;
  const h = wide ? 500 : 300;
  const p = palettes[item.palette];
  const rnd = seeded(hash(item.title));
  // Posters centre the subject; backdrops push it right, clear of the text.
  const fx = wide ? 0.7 + rnd() * 0.06 : 0.38 + rnd() * 0.24;
  const sky = `sky${uid}`;
  const glow = `glow${uid}`;
  const shade = `shade${uid}`;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.deep} />
          <stop offset="0.7" stopColor={p.mid} />
          <stop offset="1" stopColor={p.deep} />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor={p.light} stopOpacity="0.5" />
          <stop offset="1" stopColor={p.light} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={shade} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${sky})`} />
      {drawMotif(item.motif, p, w, h, fx, rnd, glow)}
      <rect width={w} height={h} fill={`url(#${shade})`} />
    </svg>
  );
}
