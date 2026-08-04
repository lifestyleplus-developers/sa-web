import Image from "next/image";

export interface ProjectCardProps {
  title: string;
  area: string;
  type: string;
  desc: string;
  image: string;
  mobile?: boolean;
  className?: string;
}

export function ProjectCard({ title, area, type, desc, image, mobile = false, className }: ProjectCardProps) {
  const sizingClass = className ? className : (mobile ? "mx-auto h-[400px] w-full max-w-[340px]" : "h-[550px] w-[400px] shrink-0");
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] ${sizingClass} group`} style={className ? {} : undefined}>
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-700 ease-out group-hover:scale-110">
        <Image src={image} alt={title} fill sizes="400px" className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Gradient Overlay for Text Readability - Lighter by default for mobile visibility! */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100 transition-all duration-500 group-hover:via-black/70" />

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
          
          <div className="inline-block px-3 py-1 bg-[#FACC15] text-black text-[10px] font-black uppercase tracking-widest mb-4">
            {type}
          </div>
          
          <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-[1.1] mb-3">
            {title}
          </h3>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
            {desc}
          </p>
          
          <div className="flex items-center gap-4 border-t border-white/20 pt-5">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Scale</span>
              <span className="block text-xl font-black text-white">{area}</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 z-30 pointer-events-none group-hover:border-white/20" />
    </div>
  );
}
