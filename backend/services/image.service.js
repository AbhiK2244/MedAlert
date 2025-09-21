import sharp from "sharp";

export const compressImageBuffer = async (
  inputBuffer,
  maxBytes = 900 * 1024
) => {
  if (!inputBuffer)
    throw new Error("No image buffer provided to compressImageBuffer");

  if (Buffer.byteLength(inputBuffer) <= maxBytes) return inputBuffer;

  let smallestBuffer = inputBuffer;
  let smallestSize = Buffer.byteLength(inputBuffer);

  const widthCandidates = [undefined, 1600, 1200, 1000, 800, 600];

  const qualityCandidates = [85, 75, 65, 55, 45, 35, 30];

  for (const width of widthCandidates) {
    for (const quality of qualityCandidates) {
      try {
        let pipeline = sharp(inputBuffer).rotate();

        if (width) {
          pipeline = pipeline.resize({ width, withoutEnlargement: true });
        }

        const outBuffer = await pipeline
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();
        const outSize = Buffer.byteLength(outBuffer);

        if (outSize < smallestSize) {
          smallestSize = outSize;
          smallestBuffer = outBuffer;
        }

        if (outSize <= maxBytes) {
          return outBuffer;
        }
      } catch (err) {
        // console.warn(
        //   `compressImageBuffer attempt failed (width=${width}, q=${quality}):`,
        //   err?.message ?? err
        // );
        continue;
      }
    }
  }

//   console.warn(
//     `Could not compress below ${maxBytes} bytes. Smallest achieved: ${Math.round(
//       smallestSize / 1024
//     )} KB`
//   );
  return smallestBuffer;
};
