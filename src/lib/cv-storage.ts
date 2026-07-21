import "server-only";

import { list } from "@vercel/blob";

export const CV_BLOB_PATH = "portfolio/cv/mohamed-lamsiah-cv.pdf";

export type CvInfo = {
  url: string;
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string | null;
  source: "blob" | "static";
};

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function getCurrentCv(): Promise<CvInfo> {
  if (!isBlobConfigured()) {
    return {
      url: "/cv.pdf",
      downloadUrl: "/cv.pdf",
      pathname: "cv.pdf",
      size: 139_698,
      uploadedAt: null,
      source: "static",
    };
  }

  try {
    const { blobs } = await list({ prefix: CV_BLOB_PATH, limit: 10 });
    const currentBlob = blobs.find((blob) => blob.pathname === CV_BLOB_PATH);

    if (currentBlob) {
      return {
        url: currentBlob.url,
        downloadUrl: currentBlob.downloadUrl,
        pathname: currentBlob.pathname,
        size: currentBlob.size,
        uploadedAt: currentBlob.uploadedAt.toISOString(),
        source: "blob",
      };
    }
  } catch {
    // The public portfolio must keep serving its bundled CV if Blob is unavailable.
  }

  return {
    url: "/cv.pdf",
    downloadUrl: "/cv.pdf",
    pathname: "cv.pdf",
    size: 139_698,
    uploadedAt: null,
    source: "static",
  };
}
