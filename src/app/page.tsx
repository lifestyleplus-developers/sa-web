import {
  DeferredFooter,
  DeferredHighlightedProjects,
  DeferredServices,
} from "@/components/home/DeferredHomeSections";
import HomeHero from "@/components/home/HomeHero";

export default function Home() {
  return (
    <main style={{ backgroundColor: "black" }}>

      <HomeHero>
        <DeferredServices />
        <div className="h-svh bg-black md:hidden" aria-hidden="true" />
      </HomeHero>

      <DeferredHighlightedProjects />

      <DeferredFooter />
    </main>
  );
}
