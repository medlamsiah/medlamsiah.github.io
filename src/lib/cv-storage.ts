import "server-only";

import { list } from "@vercel/blob";

export const CV_BLOB_PREFIX = "portfolio/cv/mohamed-lamsiah-cv";

export function createCvBlobPath() {
  return `${CV_BLOB_PREFIX}-${Date.now()}.pdf`;
}

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
    const { blobs } = await list({ prefix: CV_BLOB_PREFIX, limit: 100 });
    const currentBlob = blobs
      .filter((blob) => blob.pathname.toLowerCase().endsWith(".pdf"))
      .sort(
        (left, right) =>
          right.uploadedAt.getTime() - left.uploadedAt.getTime(),
      )[0];

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
  } catch (error) {
    console.error("[cv-storage] unable to resolve the current CV", {
      error: error instanceof Error ? error.message : String(error),
    });
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
