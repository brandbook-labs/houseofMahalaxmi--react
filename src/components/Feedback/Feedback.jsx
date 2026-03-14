import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Search, Code2, Rocket, ArrowRight, Layers, FileJson, CheckCircle2 } from 'lucide-react';

// --- DATA: THE PROCESS ---
const processSteps = [
  {
    id: "01",
    phase: "DISCOVERY",
    title: "Insight & Research",
    description: "We don't guess. We audit the landscape, interview stakeholders, and analyze market gaps to build a foundation based on hard data.",
    icon: Search,
    tags: ["Market Audit", "User Personas", "Comp Analysis"],
    visualType: "research"
  },
  {
    id: "02",
    phase: "ARCHITECTURE",
    title: "Strategic Ideation",
    description: "Translating requirements into visual blueprints. We wireframe user journeys and define the technical stack before writing a single line of code.",
    icon: Lightbulb,
    tags: ["UX Wireframing", "Tech Stack", "Prototyping"],
    visualType: "wireframe"
  },
  {
    id: "03",
    phase: "EXECUTION",
    title: "Agile Development",
    description: "Production begins. Our engineering teams build in two-week sprints, ensuring constant feedback loops and pixel-perfect implementation.",
    icon: Code2,
    tags: ["Frontend", "API Integ.", "QA Testing"],
    visualType: "code"
  },
  {
    id: "04",
    phase: "DEPLOYMENT",
    title: "Launch & Scale",
    description: "Go-live is just the beginning. We monitor performance real-time, optimize for conversion, and scale the infrastructure as you grow.",
    icon: Rocket,
    tags: ["CI/CD Pipeline", "Analytics", "Optimization"],
    visualType: "launch"
  },
];

const lerp = (start, end, factor) => start + (end - start) * factor;

// --- SUB-COMPONENT: DYNAMIC VISUALS (CSS ONLY) ---
// These replace images with clean, code-drawn schematics
const StepVisual = ({ type }) => {
    if (type === 'research') return (
        <div className="w-full h-full p-6 flex flex-col justify-center gap-3 opacity-60">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="h-1 w-24 bg-white/20 rounded-full" />
            </div>
            <div className="flex gap-2 items-end h-24">
                <div className="w-1/5 h-[40%] bg-white/10 rounded-sm" />
                <div className="w-1/5 h-[70%] bg-emerald-500/20 border border-emerald-500/50 rounded-sm" />
                <div className="w-1/5 h-[50%] bg-white/10 rounded-sm" />
                <div className="w-1/5 h-[90%] bg-white/10 rounded-sm" />
                <div className="w-1/5 h-[60%] bg-white/10 rounded-sm" />
            </div>
            <div className="flex justify-between mt-2">
                <div className="h-1 w-12 bg-white/10 rounded-full" />
                <div className="h-1 w-12 bg-white/10 rounded-full" />
            </div>
        </div>
    );

    if (type === 'wireframe') return (
        <div className="w-full h-full p-6 relative opacity-60">
             <div className="absolute inset-4 border-2 border-dashed border-white/10 rounded flex flex-col gap-2 p-2">
                 <div className="w-full h-4 bg-white/10 rounded-sm" />
                 <div className="flex gap-2 flex-1">
                     <div className="w-1/3 h-full bg-white/5 rounded-sm" />
                     <div className="w-2/3 h-full flex flex-col gap-2">
                        <div className="w-full h-1/2 bg-blue-500/10 border border-blue-500/30 rounded-sm" />
                        <div className="flex gap-2 h-1/2">
                             <div className="w-1/2 bg-white/5 rounded-sm" />
                             <div className="w-1/2 bg-white/5 rounded-sm" />
                        </div>
                     </div>
                 </div>
             </div>
        </div>
    );

    if (type === 'code') return (
        <div className="w-full h-full p-6 font-mono text-[10px] text-white/50 leading-relaxed opacity-70">
            <span className="text-pink-500">const</span> <span className="text-blue-400">initProtocol</span> = <span className="text-yellow-500">async</span> () ={">"} {"{"}<br/>
            &nbsp;&nbsp;<span className="text-pink-500">await</span> <span className="text-green-400">system</span>.connect();<br/>
            &nbsp;&nbsp;<span className="text-gray-500">// Optimizing core</span><br/>
            &nbsp;&nbsp;<span className="text-pink-500">return</span> <span className="text-green-400">true</span>;<br/>
            {"}"}<br/><br/>
            <div className="flex items-center gap-2 mt-2 p-2 bg-black/40 rounded border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>Build Succeeded (42ms)</span>
            </div>
        </div>
    );

    if (type === 'launch') return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-32 h-32 border border-white/5 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                             <CheckCircle2 className="text-emerald-500" size={24} />
                        </div>
                    </div>
                 </div>
            </div>
            <div className="absolute bottom-6 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400 uppercase tracking-widest">
                System Live
            </div>
        </div>
    );
    return null;
}

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(0);
  const targetRef = useRef(0);
  const animationRef = useRef(null);

  // --- PHYSICS ENGINE ---
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollDist = -top;
      const maxScroll = height - windowHeight;
      
      let progress = scrollDist / maxScroll;
      progress = Math.max(0, Math.min(1, progress));
      targetRef.current = progress;
    };

    const update = () => {
      scrollRef.current = lerp(scrollRef.current, targetRef.current, 0.08);
      if (Math.abs(scrollRef.current - targetRef.current) > 0.001) {
        setScrollProgress(scrollRef.current);
        animationRef.current = requestAnimationFrame(update);
      } else {
        setScrollProgress(targetRef.current);
        animationRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const xTransform = scrollProgress * -70; // Adjusted for flow

  return (
    <section 
        ref={containerRef} 
        className="relative h-[400vh] bg-[#050505] text-white" 
    >
      
      {/* STICKY WINDOW */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        {/* BACKGROUND & PROGRESS */}
        <div className="absolute inset-0 pointer-events-none">
             {/* Progress Line */}
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2" />
             
             {/* Dynamic Progress Bar */}
             <div 
                className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-emerald-600 to-emerald-400 -translate-y-1/2 transition-all duration-75 ease-out shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                style={{ width: `${scrollProgress * 100}%` }}
             />

            
        </div>

        {/* HORIZONTAL TRACK */}
        <div 
            ref={trackRef}
            className="flex gap-4 md:gap-12 pl-[10vw] pr-[20vw] w-max items-center will-change-transform"
            style={{ transform: `translateX(${xTransform}%)` }}
        >
            
            {/* INTRO TEXT */}
            <div className="w-[80vw] md:w-[25vw] flex-shrink-0 pr-8">
                <h3 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1.1] mb-6">
                    From Chaos <br/>
                    <span className="text-white/40">to Clarity.</span>
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xs">
                    Our process is linear, transparent, and results-driven. We move from raw data to deployed scale in four distinct phases.
                </p>
            </div>

            {/* PROCESS STEPS */}
            {processSteps.map((step, index) => (
                <div 
                    key={step.id}
                    className="w-[85vw] md:w-[35vw] flex-shrink-0 group relative"
                >
                    {/* Visual Card */}
                    <div className="aspect-[4/3] bg-[#0a0a0a] border border-white/10 rounded-lg mb-8 relative overflow-hidden group-hover:border-white/30 transition-colors duration-500">
                        {/* Schematic Visual */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                        <StepVisual type={step.visualType} />

                        {/* Connection Node */}
                        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center z-20">
                            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${scrollProgress > (index * 0.25) ? 'bg-emerald-500' : 'bg-white/20'}`} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pl-4 border-l border-white/10 group-hover:border-emerald-500/50 transition-colors duration-500">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="text-xs font-mono text-emerald-500 font-bold tracking-widest">
                                 {step.id} // {step.phase}
                             </span>
                        </div>
                        <h4 className="text-2xl font-semibold mb-3">{step.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-4">
                            {step.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {step.tags.map((tag, i) => (
                                <span key={i} className="text-[10px] px-2 py-1 bg-white/5 rounded text-white/70 border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            
            {/* CTA END CARD */}
            <div className="w-[30vw] md:w-[20vw] flex-shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                 <div className="flex flex-col items-center gap-4 group">
                     <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                         <ArrowRight size={24} />
                     </div>
                     <span className="text-xs uppercase tracking-widest font-bold">Start Project</span>
                 </div>
            </div>

        </div>

      

      </div>
    </section>
  );
}