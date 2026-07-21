import type { Metadata } from "next";
import Link from "next/link";
import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { getCurrentCv, isBlobConfigured } from "@/lib/cv-storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getAdminSession();
  const configured = isAdminConfigured();

  return (
    <main className="admin-page">
      <div className="admin-backdrop" aria-hidden="true" />
      <header className="admin-header shell">
        <Link className="brand" href="/">
          <span className="brand-mark">ML</span>
          <span className="brand-name">Portfolio</span>
        </Link>
        <Link className="admin-back-link" href="/">
          Voir le site
        </Link>
      </header>

      <div className="admin-shell shell">
        {session ? (
          <AdminDashboard
            initialCv={await getCurrentCv()}
            blobConfigured={isBlobConfigured()}
            adminEmail={session.email}
          />
        ) : (
          <AdminLoginForm configured={configured} />
        )}
      </div>
    </main>
  );
}
