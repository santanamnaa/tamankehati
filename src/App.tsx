import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { TamanListPage } from "./pages/TamanListPage";
import { TamanDetailPage } from "./pages/TamanDetailPage";
import { TamanKoleksiPage } from "./pages/TamanKoleksiPage";
import { TamanGaleriPage } from "./pages/TamanGaleriPage";
import { TamanPublikasiPage } from "./pages/TamanPublikasiPage";
import { KoleksiListPage } from "./pages/KoleksiListPage";
import { KoleksiDetailPage } from "./pages/KoleksiDetailPage";
import { PetaPage } from "./pages/PetaPage";
import { PublikasiListPage } from "./pages/PublikasiListPage";
import { PublikasiDetailPage } from "./pages/PublikasiDetailPage";
import { TentangPage } from "./pages/TentangPage";
import { RegulasiPage } from "./pages/RegulasiPage";
import { TimPage } from "./pages/TimPage";
import { KontakPage } from "./pages/KontakPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AiAssistantPage } from "./pages/AiAssistantPage";
import { LoginPage } from "./pages/LoginPage";
import { ApiTestPage } from "./pages/ApiTestPage";
import { tokenStore } from "./lib/api.config";

type Page =
  | "home"
  | "taman"
  | "taman-detail"
  | "taman-koleksi"
  | "taman-galeri"
  | "taman-publikasi"
  | "koleksi"
  | "koleksi-detail"
  | "peta"
  | "publikasi"
  | "publikasi-detail"
  | "tentang"
  | "regulasi"
  | "tim"
  | "kontak"
  | "dashboard"
  | "ai-assistant"
  | "login"
  | "api-test";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [slug, setSlug] = useState<string | undefined>();

  useEffect(() => {
    // Initialize token store from localStorage
    tokenStore.init();
  }, []);

  const navigate = (page: string, newSlug?: string) => {
    setCurrentPage(page as Page);
    setSlug(newSlug);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "taman":
        return <TamanListPage onNavigate={navigate} />;
      case "taman-detail":
        return slug ? (
          <TamanDetailPage parkId={slug} onNavigate={navigate} />
        ) : (
          <TamanListPage onNavigate={navigate} />
        );
      case "taman-koleksi":
        return slug ? (
          <TamanKoleksiPage parkId={slug} onNavigate={navigate} />
        ) : (
          <TamanListPage onNavigate={navigate} />
        );
      case "taman-galeri":
        return slug ? (
          <TamanGaleriPage parkId={slug} onNavigate={navigate} />
        ) : (
          <TamanListPage onNavigate={navigate} />
        );
      case "taman-publikasi":
        return slug ? (
          <TamanPublikasiPage parkId={slug} onNavigate={navigate} />
        ) : (
          <TamanListPage onNavigate={navigate} />
        );
      case "koleksi":
        return <KoleksiListPage onNavigate={navigate} />;
      case "koleksi-detail":
        return slug ? (
          <KoleksiDetailPage plantId={slug} onNavigate={navigate} />
        ) : (
          <KoleksiListPage onNavigate={navigate} />
        );
      case "peta":
        return <PetaPage onNavigate={navigate} />;
      case "publikasi":
        return <PublikasiListPage onNavigate={navigate} />;
      case "publikasi-detail":
        return slug ? (
          <PublikasiDetailPage publicationId={slug} onNavigate={navigate} />
        ) : (
          <PublikasiListPage onNavigate={navigate} />
        );
      case "tentang":
        return <TentangPage onNavigate={navigate} />;
      case "regulasi":
        return <RegulasiPage onNavigate={navigate} />;
      case "tim":
        return <TimPage onNavigate={navigate} />;
      case "kontak":
        return <KontakPage onNavigate={navigate} />;
      case "dashboard":
        return <DashboardPage onNavigate={navigate} />;
      case "ai-assistant":
        return <AiAssistantPage onNavigate={navigate} />;
      case "login":
        return <LoginPage onNavigate={navigate} />;
      case "api-test":
        return <ApiTestPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
}
