import { ProjectCard } from "@/components/ui/ProjectCard";
import Footer from "@/components/home/Footer";
import { PageTransition } from "@/components/ui/PageTransition";

const allProjects = [
  {
    title: "Manyata Tech Park",
    area: "1,20,000 Sq. Ft.",
    type: "Complete Office Dismantling",
    desc: "Full strip-out and clearance of corporate IT workspace infrastructure, including workstations and partitions.",
    image: "/images/highlighted-project.png",
  },
  {
    title: "Brigade Gateway",
    area: "85,000 Sq. Ft.",
    type: "IT Infrastructure Clearance",
    desc: "Safe removal and buyback of massive server rooms, UPS systems, and heavy AC equipment.",
    image: "/images/highlighted-project.png",
  },
  {
    title: "Electronic City Park",
    area: "50,000 Sq. Ft.",
    type: "Commercial Site Cleanup",
    desc: "Complete clearance of industrial heavy machinery, electrical panels, and metal scrap.",
    image: "/images/highlighted-project.png",
  },
  {
    title: "ITPL Whitefield",
    area: "65,000 Sq. Ft.",
    type: "AC Scrap & HVAC Dismantling",
    desc: "Complete removal of heavy centralized AC chillers and ducting from a multi-story tech park.",
    image: "/images/highlighted-project.png",
  },
  {
    title: "Prestige Shantiniketan",
    area: "40,000 Sq. Ft.",
    type: "UPS & Server Buyback",
    desc: "Total clearance of server racks, UPS batteries, and networking cables from a data center floor.",
    image: "/images/highlighted-project.png",
  },
  {
    title: "RMZ Ecospace",
    area: "75,000 Sq. Ft.",
    type: "Heavy Equipment Scrap",
    desc: "Safe dismantling and scrap removal of 4 commercial elevators and heavy electrical panel boards.",
    image: "/images/highlighted-project.png",
  },
];

export const metadata = {
  title: "Completed Projects",
  description: "View our extensive portfolio of large-scale commercial dismantling, office clearance, and scrap buyback projects across Bengaluru.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="bg-black min-h-screen w-full flex flex-col items-center text-white overflow-hidden">
        {/* Hero Section */}
        <section className="w-full px-6 md:px-12 max-w-[1400px] flex flex-col items-center text-center" style={{ marginTop: '15vh', marginBottom: '10vh' }}>
          <div className="flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]" style={{ marginBottom: '2rem' }}>
              Completed <span className="text-[#FACC15]">Projects</span>
            </h1>
            <p className="text-white/60 max-w-2xl text-lg md:text-xl font-medium">
              A showcase of our large-scale commercial dismantling, office clearance, and bulk scrap removal sites across Bengaluru.
            </p>
          </div>
        </section>

      {/* Projects Grid */}
      <section className="w-full px-6 md:px-12 max-w-[1400px] mb-32 md:mb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {allProjects.map((project, idx) => (
            <div key={idx} className="flex justify-center w-full">
              <ProjectCard {...project} className="w-full h-[450px] md:h-[550px]" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
}
