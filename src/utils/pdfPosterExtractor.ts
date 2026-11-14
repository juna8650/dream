import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { LESSON_ASSETS } from '../data/curriculum';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

let pdfDocPromise: Promise<PDFDocumentProxy> | null = null;
const pageImageCache = new Map<number, string>();

function getExamplesPdfDocument(): Promise<PDFDocumentProxy> {
  if (!pdfDocPromise) {
    const loadingTask = pdfjsLib.getDocument({
      url: LESSON_ASSETS.profileCardExamplesPdf,
    });
    pdfDocPromise = loadingTask.promise.catch((err) => {
      pdfDocPromise = null;
      throw err;
    });
  }
  return pdfDocPromise;
}

interface PdfImageObject {
  width: number;
  height: number;
  kind?: number;
  data?: Uint8Array | Uint8ClampedArray;
  bitmap?: ImageBitmap;
}

function drawPdfImageToCanvas(
  img: PdfImageObject,
  canvas: HTMLCanvasElement
): boolean {
  const { width, height } = img;
  if (!width || !height) return false;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  if (img.bitmap) {
    ctx.drawImage(img.bitmap, 0, 0);
    return true;
  }

  if (!img.data) return false;

  const pixelCount = width * height;
  const imageData = ctx.createImageData(width, height);
  const dst = imageData.data;
  const src = img.data;

  if (src.length === pixelCount * 4) {
    dst.set(src);
    ctx.putImageData(imageData, 0, 0);
    return true;
  }

  if (src.length === pixelCount * 3) {
    for (let i = 0, j = 0; i < src.length; i += 3, j += 4) {
      dst[j] = src[i];
      dst[j + 1] = src[i + 1];
      dst[j + 2] = src[i + 2];
      dst[j + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return true;
  }

  if (src.length === pixelCount) {
    for (let i = 0, j = 0; i < src.length; i += 1, j += 4) {
      const v = src[i];
      dst[j] = v;
      dst[j + 1] = v;
      dst[j + 2] = v;
      dst[j + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return true;
  }

  return false;
}

export async function renderPosterImageFromPdf(pageNumber: number): Promise<string> {
  const cached = pageImageCache.get(pageNumber);
  if (cached) return cached;

  const doc = await getExamplesPdfDocument();
  const page = await doc.getPage(pageNumber);
  const ops = await page.getOperatorList();

  const canvas = document.createElement('canvas');
  let extracted = false;

  const paintIdx = ops.fnArray.lastIndexOf(pdfjsLib.OPS.paintImageXObject);
  if (paintIdx !== -1) {
    const imgName = ops.argsArray[paintIdx]?.[0] as string | undefined;
    if (imgName) {
      const imgObj = await new Promise<PdfImageObject | null>((resolve) => {
        let settled = false;
        const timer = window.setTimeout(() => {
          if (!settled) {
            settled = true;
            resolve(null);
          }
        }, 2500);

        const done = (val: PdfImageObject | null) => {
          if (!settled) {
            settled = true;
            window.clearTimeout(timer);
            resolve(val);
          }
        };

        try {
          const store = imgName.startsWith('g_') ? page.commonObjs : page.objs;
          store.get(imgName, (obj: unknown) => {
            done((obj as PdfImageObject) ?? null);
          });
        } catch {
          done(null);
        }
      });

      if (imgObj) {
        extracted = drawPdfImageToCanvas(imgObj, canvas);
      }
    }
  }

  if (!extracted) {
    const viewport = page.getViewport({ scale: 2 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      await page.render({ canvas, canvasContext: ctx, viewport }).promise;
    }
  }

  const dataUrl = canvas.toDataURL('image/png');
  pageImageCache.set(pageNumber, dataUrl);
  return dataUrl;
}
