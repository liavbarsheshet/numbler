import { default as AppProvider } from "./providers/index.tsx";
import { createRoot } from "react-dom/client";
import { Header } from "@/layouts/header";
import { Shuffler } from "@/layouts/shuffler";
import { Footer } from "@/layouts/footer";
import { StrictMode } from "react";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <Header />
      <Shuffler />
      <Footer />
    </AppProvider>
  </StrictMode>
);
