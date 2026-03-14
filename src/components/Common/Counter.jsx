import React, { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Activity, BarChart3, PieChart, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  {
    id: "roas",
    label: "AVG. ROAS",
    subLabel: "RETURN ON SPEND",
    value: 8.4,
    prefix: "",
    suffix: "x",
    desc: "Algorithmic bidding maximizes every dollar. AI models predict user intent before the click.",
    trend: "+24%",
    icon: TrendingUp,
    chart: "line"
  },
  {
    id: "revenue",
    label: "REVENUE",
    subLabel: "GROSS GENERATED",
    value: 450,
    prefix: "$",
    suffix: "M+",
    desc: "Ecosystems that turn traffic into cash flow. Full-funnel architectures for recurring growth.",
    trend: "Q3-Q4",
    icon: BarChart3,
    chart: "bar"
  },
  {
    id: "ctr",
    label: "CTR AVG",
    subLabel: "ENGAGEMENT RATE",
    value: 3.2,
    prefix: "",
    suffix: "%",
    desc: "Thumb-stopping creative. Our design studio tests 50+ variations per campaign.",
    trend: "High",
    icon: PieChart,
    chart: "circle"
  },
  {
    id: "leads",
    label: "LEADS",
    subLabel: "QUALIFIED / MO",
    value: 12500,
    prefix: "",
    suffix: "+",
    desc: "Filling pipelines with ready-to-buy prospects. We filter noise so sales only talks to closers.",
    trend: "Scale",
    icon: Activity,
    chart: "wave"
  }
];

const SystemMetrics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const numberRefs = useRef([]);

  // 1. INITIAL ENTRANCE & NUMBER COUNTING (Runs ONCE)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Reveal Container
      gsap.fromTo(".accordion-item", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Count Numbers
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const item = METRICS[i];
        const isFloat = item.value % 1 !== 0;
        
        // Reset purely for animation start
        let startVal = { val: 0 };

        gsap.to(startVal, {
          val: item.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true, // IMPORTANT: Prevents reset on hover/scroll back
          },
          onUpdate: function () {
            el.innerText = isFloat 
              ? startVal.val.toFixed(1) 
              : Math.floor(startVal.val).toLocaleString();
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. HOVER CHART ANIMATION (Runs on activeIndex change)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the specific path of the active chart
      gsap.fromTo(`.chart-${activeIndex} path, .chart-${activeIndex} circle`,
        { strokeDasharray: 300, strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", overwrite: true }
      );
      
      // Bar chart staggering
      if (METRICS[activeIndex].chart === 'bar') {
        gsap.fromTo(`.chart-${activeIndex} .bar`, 
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[#050505] text-white py-24 px-6 relative overflow-hidden font-sans selection:bg-emerald-500/30"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-mono font-bold text-emerald-500 tracking-widest uppercase">Live Intelligence</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
            Performance <span className="text-white/30">Matrix</span>
          </h2>
        </div>
        <p className="text-white/50 max-w-sm text-sm leading-relaxed text-right md:text-left">
          Real-time data aggregated from our managed portfolios. High-frequency trading strategies applied to ad auctions.
        </p>
      </div>

      {/* Main Accordion */}
      <div className="max-w-7xl mx-auto h-auto lg:h-[500px] flex flex-col lg:flex-row gap-2 relative z-10">
        {METRICS.map((item, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveIndex(i)}
              className={`accordion-item relative flex flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-default
                ${isActive ? 'lg:flex-[2.5] bg-white/[0.03] border-white/20 shadow-2xl' : 'lg:flex-1 opacity-60 hover:opacity-100'}
                min-h-[220px] p-6 lg:p-8 group
              `}
            >
              {/* Active Glow */}
              <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

              {/* Top: Label */}
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-3">
                    <div className={`p-2 rounded bg-white/5 transition-colors ${isActive ? 'text-emerald-400' : 'text-white/40'}`}>
                        <item.icon size={18} />
                    </div>
                    <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{item.subLabel}</div>
                        <div className={`text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>{item.label}</div>
                    </div>
                 </div>
                 
                 {/* Corner Action */}
                 <ArrowUpRight 
                    size={18} 
                    className={`transition-all duration-300 ${isActive ? 'text-emerald-400 rotate-45' : 'text-white/20'}`} 
                 />
              </div>

              {/* Middle: Visualization (Absolute centered) */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 pointer-events-none transition-all duration-500 hidden lg:block ${isActive ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-90'}`}>
                 
                 {/* Line Chart */}
                 {item.chart === 'line' && (
                    <svg viewBox="0 0 200 60" className={`w-full h-24 stroke-emerald-500 fill-none stroke-[2] chart-${i}`}>
                        <path d="M0,50 Q40,60 70,30 T140,20 T200,5" />
                    </svg>
                 )}

                 {/* Bar Chart */}
                 {item.chart === 'bar' && (
                     <div className={`flex items-end justify-between h-24 gap-1 chart-${i}`}>
                        {[30, 50, 40, 70, 50, 80, 60, 90, 100].map((h, idx) => (
                            <div key={idx} className="bar w-full bg-emerald-500/20 border-t-2 border-emerald-500 origin-bottom" style={{ height: `${h}%` }}></div>
                        ))}
                     </div>
                 )}
                 
                 {/* Circle Chart */}
                 {item.chart === 'circle' && (
                     <svg viewBox="0 0 100 100" className={`w-24 h-24 mx-auto -rotate-90 chart-${i}`}>
                         <circle cx="50" cy="50" r="40" className="stroke-white/10 stroke-[6] fill-none" />
                         <circle cx="50" cy="50" r="40" className="stroke-emerald-500 stroke-[6] fill-none" strokeLinecap="round" strokeDasharray="251" />
                     </svg>
                 )}

                 {/* Wave Chart */}
                 {item.chart === 'wave' && (
                    <svg viewBox="0 0 200 60" className={`w-full h-24 stroke-emerald-500 fill-none stroke-[2] chart-${i}`}>
                        <path d="M0,30 Q25,0 50,30 T100,30 T150,30 T200,0" />
                    </svg>
                 )}
              </div>

              {/* Bottom: Stats */}
              <div className="relative z-10 mt-auto">
                 <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl text-emerald-500 font-light">{item.prefix}</span>
                    <span 
                        ref={el => numberRefs.current[i] = el}
                        className={`text-5xl md:text-6xl font-medium tracking-tighter transition-all ${isActive ? 'text-white' : 'text-white/60'}`}
                    >
                        0
                    </span>
                    <span className="text-2xl text-emerald-500 font-light">{item.suffix}</span>
                 </div>

                 {/* Collapsible Content */}
                 <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="h-[1px] w-full bg-white/10 mb-3" />
                    <div className="flex justify-between items-end">
                        <p className="text-xs text-white/60 max-w-[200px] leading-relaxed">
                            {item.desc}
                        </p>
                        <div className="text-right">
                            <div className="text-xs font-mono text-emerald-500">{item.trend}</div>
                            <div className="text-[9px] text-white/30 uppercase">Uplift</div>
                        </div>
                    </div>
                 </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SystemMetrics;