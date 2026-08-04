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
      </HomeHero>

      <DeferredHighlightedProjects />

      <DeferredFooter />
    </main>
  );
}
