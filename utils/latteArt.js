function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export function applyLatteArt(sourceCanvas) {
  const w = sourceCanvas.width,
    h = sourceCanvas.height;
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const ctx = out.getContext("2d");
  const src = sourceCanvas.getContext("2d").getImageData(0, 0, w, h);
  const d = src.data;
  const gray = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++)
    gray[i] = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
  const blur = new Float32Array(w * h);
  const k = [1, 2, 1, 2, 4, 2, 1, 2, 1];
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      let s = 0,
        ki = 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++)
          s += gray[(y + dy) * w + (x + dx)] * k[ki++];
      blur[y * w + x] = s / 16;
    }
  const edges = new Float32Array(w * h);
  let maxE = 1;
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const gx =
        -blur[(y - 1) * w + (x - 1)] +
        blur[(y - 1) * w + (x + 1)] -
        2 * blur[y * w + (x - 1)] +
        2 * blur[y * w + (x + 1)] -
        blur[(y + 1) * w + (x - 1)] +
        blur[(y + 1) * w + (x + 1)];
      const gy =
        -blur[(y - 1) * w + (x - 1)] -
        2 * blur[(y - 1) * w + x] -
        blur[(y - 1) * w + (x + 1)] +
        blur[(y + 1) * w + (x - 1)] +
        2 * blur[(y + 1) * w + x] +
        blur[(y + 1) * w + (x + 1)];
      const m = Math.sqrt(gx * gx + gy * gy);
      edges[y * w + x] = m;
      if (m > maxE) maxE = m;
    }
  for (let i = 0; i < w * h; i++) edges[i] /= maxE;
  const od = ctx.createImageData(w, h).data;
  const imgData = ctx.createImageData(w, h);
  for (let i = 0; i < w * h; i++) {
    const g = gray[i] / 255,
      e = Math.pow(Math.min(edges[i] * 1.4, 1), 0.6);
    let r, gr, b;
    if (e > 0.45) {
      const t = (e - 0.45) / 0.55;
      r = lerp(80, 25, t);
      gr = lerp(35, 8, t);
      b = lerp(8, 2, t);
    } else if (g > 0.72) {
      const t = (g - 0.72) / 0.28;
      r = lerp(185, 251, t);
      gr = lerp(130, 244, t);
      b = lerp(70, 228, t);
    } else if (g > 0.38) {
      const t = (g - 0.38) / 0.34;
      r = lerp(110, 185, t);
      gr = lerp(55, 130, t);
      b = lerp(15, 70, t);
    } else {
      const t = g / 0.38;
      r = lerp(20, 110, t);
      gr = lerp(6, 55, t);
      b = lerp(2, 15, t);
    }
    const ed = e * 55;
    imgData.data[i * 4] = Math.max(0, Math.min(255, r - ed));
    imgData.data[i * 4 + 1] = Math.max(0, Math.min(255, gr - ed * 0.5));
    imgData.data[i * 4 + 2] = Math.max(0, Math.min(255, b - ed * 0.2));
    imgData.data[i * 4 + 3] = 255;
  }
  const cx = w / 2,
    cy = h / 2,
    radius = (Math.min(w, h) / 2) * 0.94;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2),
        idx = y * w + x;
      if (dist > radius) imgData.data[idx * 4 + 3] = 0;
      else if (dist > radius * 0.91)
        imgData.data[idx * 4 + 3] = Math.floor(
          255 * (1 - (dist - radius * 0.91) / (radius * 0.09)),
        );
    }
  ctx.putImageData(imgData, 0, 0);
  const vg = ctx.createRadialGradient(cx, cy, radius * 0.25, cx, cy, radius);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(0.7, "rgba(15,5,0,0.1)");
  vg.addColorStop(1, "rgba(15,5,0,0.55)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
  const nc = document.createElement("canvas");
  nc.width = w;
  nc.height = h;
  const nctx = nc.getContext("2d"),
    nd = nctx.createImageData(w, h);
  for (let i = 0; i < w * h; i++) {
    const n = (Math.random() - 0.5) * 22;
    nd.data[i * 4] = 128 + n;
    nd.data[i * 4 + 1] = 108 + n;
    nd.data[i * 4 + 2] = 80 + n;
    nd.data[i * 4 + 3] = 22;
  }
  nctx.putImageData(nd, 0, 0);
  ctx.globalCompositeOperation = "overlay";
  ctx.drawImage(nc, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  return out;
}
