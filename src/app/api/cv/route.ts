import { NextResponse } from "next/server";
import { getCurrentCv } from "@/lib/cv-storage";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cv = await getCurrentCv();
  const target = cv.downloadUrl.startsWith("http")
    ? cv.downloadUrl
    : new URL(cv.downloadUrl, request.url).toString();

  return NextResponse.redirect(target, {
    status: 307,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
