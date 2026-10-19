// Draws Pip's "Junior Dream Engineer" keepsake card on a canvas (browser only).
import { moonTimestamp } from "./pip-logic";

export type Keepsake = { name: string; recipient?: string | undefined; ingredients?: string[] | undefined; stamps: number };

function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
}

export async function drawKeepsake(k: Keepsake): Promise<Blob> {
  await document.fonts?.ready;
  const W = 1200, H = 800;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#211B35"); g.addColorStop(1, "#302742");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // stars
  let s = 7;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 90; i++) { ctx.fillStyle = `rgba(242,206,131,${0.3 + rnd() * 0.6})`; star(ctx, rnd() * W, rnd() * H, 1 + rnd() * 3); }
  // paper
  ctx.fillStyle = "#FFF8F1";
  ctx.beginPath(); ctx.roundRect(70, 70, W - 140, H - 140, 28); ctx.fill();
  ctx.strokeStyle = "#F2CE83"; ctx.lineWidth = 3; ctx.setLineDash([2, 10]); ctx.lineCap = "round";
  ctx.beginPath(); ctx.roundRect(95, 95, W - 190, H - 190, 20); ctx.stroke(); ctx.setLineDash([]);
  ctx.textAlign = "center";
  ctx.fillStyle = "#A34063"; ctx.font = "16px 'Space Mono', monospace";
  ctx.fillText("MIDNIGHT NURSERY · DREAM OBSERVATORY", W / 2, 165);
  ctx.fillStyle = "#5C4033"; ctx.font = "500 58px Fraunces, serif";
  ctx.fillText("Certificate of Dream Engineering", W / 2, 245);
  ctx.font = "22px 'DM Sans', sans-serif";
  ctx.fillText("This little card proudly declares that", W / 2, 305);
  ctx.fillStyle = "#A34063"; ctx.font = "italic 64px Fraunces, serif";
  ctx.fillText(k.name || "A Sleepy Visitor", W / 2, 385);
  ctx.fillStyle = "#5C4033"; ctx.font = "22px 'DM Sans', sans-serif";
  ctx.fillText("is an honorary Junior Dream Engineer of the Midnight Nursery.", W / 2, 435);
  ctx.font = "20px Fredoka, sans-serif";
  const dream = k.recipient
    ? `First dream packed for ${k.recipient}: ${(k.ingredients ?? []).join(" + ")}`
    : "First dream: still waiting on the windowsill";
  ctx.fillText(dream, W / 2, 490);
  ctx.fillText(`Passport stamps collected: ${k.stamps}/4`, W / 2, 525);
  // seal
  ctx.fillStyle = "#A34063"; ctx.beginPath(); ctx.arc(W - 230, H - 210, 62, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#F2CE83"; star(ctx, W - 230, H - 210, 36);
  ctx.textAlign = "left"; ctx.fillStyle = "#5C4033";
  ctx.font = "italic 34px Fraunces, serif"; ctx.fillText("~ Pip", 170, H - 205);
  ctx.font = "13px 'Space Mono', monospace"; ctx.fillStyle = "#7a5c4e";
  ctx.fillText("CHIEF SLEEPY OFFICER", 170, H - 178);
  ctx.fillText(moonTimestamp(new Date()) + " (in-world time)", 170, H - 150);
  return new Promise((r) => c.toBlob((b) => r(b!), "image/png"));
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
