function loadFromBase64 (ctx, b64, color) {
    let bin = atob(b64);
    console.log('bin.length:', bin.length);
    let bytes = new Uint8Array(bin.length);
    console.log('bytes.length:', bytes.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    const w = bytes[0];
    const h = bytes[1];
    console.log(`w:${w}, h: ${h}`);
    const img = ctx.createImageData(w, h);
    [...Array(h)].map((_, y) => ([...Array(w)].map((_, x) =>
      {
        const nbit = y*w + x;
        const m = nbit % 8;
        const byte = (nbit - m) / 8;
        const idx = nbit * 4;
        if ((bytes[byte + 2] & (2 ** (7 - m))) > 0) {
          img.data[idx + 0] = (color >> (8 * 3)) & 0xFF;
          img.data[idx + 1] = (color >> (8 * 2)) & 0xFF;
          img.data[idx + 2] = (color >> (8 * 1)) & 0xFF;
          img.data[idx + 3] = color & 0xFF;
        } else {
          img.data[idx + 0] = 0;
          img.data[idx + 1] = 0;
          img.data[idx + 2] = 0;
          img.data[idx + 3] = 0;
        }
      }
    )));
    return img;
}

export default {
    loadFromBase64,
}