import createHttpError from "http-errors";
import { createResponse } from "../services/createResponse.service.js";
import { extractStructuredData, getOcrText } from "../services/ocr.service.js";
import { compressImageBuffer } from "../services/image.service.js";

export const handleOcr = async (req, res, next) => {
  try {
    const files = req.files ?? [];
    if (!files.length || !files[0].originalname) {
      throw createHttpError(400, "No selected files");
    }

    let aggregatedText = "";

    for (const file of files) {
      try {
        const buffer = file.buffer;
        if (!buffer) {
          // console.warn("File has no buffer, skipping:", file.originalname);
          continue;
        }

        // If buffer larger than 1MB, attempt to compress to < 900KB
        const ONE_MB = 1 * 1024 * 1024;
        let bufferToSend = buffer;

        if (Buffer.byteLength(buffer) > ONE_MB) {
          try {
            bufferToSend = await compressImageBuffer(buffer, 900 * 1024);
            // console.log(
            //   `Compressed ${file.originalname}: ${Math.round(Buffer.byteLength(buffer) / 1024)}KB -> ${Math.round(Buffer.byteLength(bufferToSend) / 1024)}KB`
            // );
          } catch (compressErr) {
            // console.warn(`Failed to compress ${file.originalname}, sending original:`, compressErr?.message ?? compressErr);
            bufferToSend = buffer; // fallback to original
          }
        }

        const parsedText = await getOcrText(bufferToSend);
        if (parsedText) aggregatedText += parsedText + "\n\n";
      } catch (err) {
        // console.error(`Error processing file ${file.originalname}:`, err?.message ?? err);
        throw createHttpError(422 ,"Error in image processing")
      }
    }

    if (!aggregatedText.trim()) {
      throw createHttpError(404, "Could not extract any text from the image(s).");
    }

    const structured = await extractStructuredData(aggregatedText);

    if (!structured) {
      throw createHttpError(404, "Could not extract any data from the image(s).");
    }
    if (structured.error) {
      return res.status(422).send(createResponse(structured, "Could not generate report. Please try later."));
    }

    return res.status(200).send(createResponse(structured, "Structured data extracted successfully."));
  } catch (error) {
    next(error);
  }
};





















// import createHttpError from "http-errors";
// import { createResponse } from "../services/createResponse.service.js";
// import { extractStructuredData, getOcrText } from "../services/ocr.service.js";


// export const handleOcr = async (req, res, next) => { 
//   try {
//     const files = req.files ?? [];
//     if (!files.length || !files[0].originalname) {
//       throw createHttpError(400, "No selected files");
//     }

//     let aggregatedText = "";

//     for (const file of files) {
//       try {
//         // support multer memoryStorage (file.buffer). If using diskStorage, adapt accordingly.
//         const buffer = file.buffer;
//         if (!buffer) {
//           console.warn("File has no buffer, skipping:", file.originalname);
//           continue;
//         }
//         const parsedText = await getOcrText(buffer);
//         if (parsedText) aggregatedText += parsedText + "\n\n";
//         // console.log("text from ocr", parsedText);
//       } catch (err) {
//         console.error(`Error processing file ${file.originalname}:`, err?.message ?? err);
//         // don't fail whole request for a single file; continue
//       }
//     }

//     if (!aggregatedText.trim()) {
//       throw createHttpError(404, "Could not extract any text from the image(s).");
//     }

//     const structured = await extractStructuredData(aggregatedText);

//     if (!structured) {
//       throw createHttpError(404, "Could not extract any data from the image(s).");
//     }
//     if (structured.error) {
//       // If AI returned parsing error, still surface helpful 422 with debug info
//       return res.status(422).send(createResponse(structured, "AI returned non-JSON output"));
//     }

//     return res.status(200).send(createResponse(structured, "Structured data extracted successfully."));
//   } catch (error) {
//     next(error);
//   }
// };
