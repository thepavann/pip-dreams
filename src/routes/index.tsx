import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/pip/About";
import { Footer } from "@/components/pip/Footer";
import { Header } from "@/components/pip/Header";
import { Hero } from "@/components/pip/Hero";
import { Inventions } from "@/components/pip/Inventions";
import { SparkleTrail } from "@/components/pip/SparkleTrail";
import { Story } from "@/components/pip/Story";
import { SiteStateProvider } from "@/lib/site-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pip’s Midnight Observatory — I build the dreams you fall asleep inside" },
      { name: "description", content: "Meet Pip, the Skull Baby and Junior Dream Engineer: a lullaby lab, glowing nightlights, dream delivery routes and a secret constellation." },
      { property: "og:title", content: "Pip’s Midnight Observatory" },
      { property: "og:description", content: "A tiny, magical portfolio for Pip, Junior Dream Engineer at the Midnight Nursery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteStateProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Inventions />
        <Story />
      </main>
      <Footer />
      <SparkleTrail />
    </SiteStateProvider>
  );
}
