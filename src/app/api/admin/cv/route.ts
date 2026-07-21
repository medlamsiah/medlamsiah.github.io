import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession, isSameOrigin } from "@/lib/admin-auth";
import {
  CV_BLOB_PATH,
  getCurrentCv,
  isBlobConfigured,
} from "@/lib/cv-storage";

export const runtime = "nodejs";

const MAX_CV_SIZE = 8 * 1024 * 1024;

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  return NextResponse.json(await getCurrentCv(), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  }

  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "Le stockage Vercel Blob n'est pas encore connecté." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Sélectionnez un PDF." }, { status: 400 });
  }

  if (
    file.type !== "application/pdf" ||
    !file.name.toLowerCase().endsWith(".pdf") ||
    file.size === 0 ||
    file.size > MAX_CV_SIZE
  ) {
    return NextResponse.json(
      { error: "Le fichier doit être un PDF de moins de 8 Mo." },
      { status: 400 },
    );
  }

  const signature = Buffer.from(await file.slice(0, 5).arrayBuffer()).toString(
    "ascii",
  );
  if (signature !== "%PDF-") {
    return NextResponse.json(
      { error: "Ce fichier ne semble pas être un PDF valide." },
      { status: 400 },
    );
  }

  const blob = await put(CV_BLOB_PATH, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/pdf",
    cacheControlMaxAge: 60,
  });

  return NextResponse.json({
    success: true,
    cv: {
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      source: "blob",
    },
  });
}
