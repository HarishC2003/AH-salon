import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Sparkles,
  Star,
  MapPin,
  Clock,
  Wifi,
  CreditCard,
  Phone,
  ChevronRight,
  ChevronLeft,
  Quote,
  Menu,
  X,
  Scissors,
  Droplets,
  CalendarCheck,
  Users,
  Award,
  ArrowUpRight,
  Wand2,
  Flower2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Custom Icons                                                       */
/* ------------------------------------------------------------------ */

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SKIN_SERVICES = [
  { name: "HydraFacial", tag: "Signature" },
  { name: "BB Glow Treatment", tag: null },
  { name: "Microblading", tag: null },
  { name: "Lip Blushing", tag: null },
  { name: "Permanent Makeup", tag: null },
  { name: "De-Tan Sessions", tag: null },
];

const HAIR_SERVICES = [
  { name: "Keratin Treatment", tag: "Signature" },
  { name: "Hair Smoothening", tag: null },
  { name: "Advanced Layer Cuts", tag: null },
  { name: "Trendy Cuts & Styling", tag: null },
  { name: "Vibrant Colour Jobs", tag: null },
  { name: "Bridal Hair Styling", tag: null },
];

const STATS = [
  { value: 1100, suffix: "+", label: "Google Reviews" },
  { value: 4.4, suffix: "★", label: "Average Rating", decimal: true },
  { value: 11, suffix: "hrs", label: "Open Daily" },
  { value: 2, suffix: "", label: "Master Stylists" },
];

const TESTIMONIALS = [
  {
    name: "Priya R.",
    service: "HydraFacial",
    quote:
      "The HydraFacial left my skin glowing for days. It isn't cheap, but the international-standard products they use make every rupee feel justified. The team made the whole visit feel genuinely premium.",
    rating: 5,
  },
  {
    name: "Karthik S.",
    service: "Keratin Treatment",
    quote:
      "Eshwari, Affun and Suban took care of my keratin session and the finish was better than I expected. Kind, patient staff who clearly know their craft — I've already recommended AH to three friends.",
    rating: 5,
  },
  {
    name: "Meera V.",
    service: "Hair Smoothening",
    quote:
      "Chithra handled my smoothening appointment and the result was flawless. The studio itself has a calm, modern ambience that makes a two-hour appointment feel relaxing instead of tedious.",
    rating: 5,
  },
  {
    name: "Divya N.",
    service: "Layer Cut & Colour",
    quote:
      "Walked in for a trim and walked out with a full layer cut and colour I hadn't planned on — that's how good the consultation was. Totally satisfied with how it all turned out.",
    rating: 5,
  },
  {
    name: "Arjun K.",
    service: "General Visit",
    quote:
      "Every single visit has been consistent — friendly staff, an inviting space, and service that never feels rushed. It's rare to find that kind of consistency across 1,100+ reviews.",
    rating: 5,
  },
];

const GALLERY = [
  { label: "Skin Studio", image: "url('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800')" },
  { label: "Styling Chairs", image: "url('https://images.unsplash.com/photo-1521590832167-7bfc17484d20?auto=format&fit=crop&q=80&w=800')" },
  { label: "Bridal Suite", image: "url('https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?auto=format&fit=crop&q=80&w=800')" },
  { label: "Colour Bar", image: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800')" },
  { label: "Reception Lounge", image: "url('https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800')" },
  { label: "Wash & Relax", image: "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800')" },
];

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll hook                                              */
/* ------------------------------------------------------------------ */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, transform 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Count-up number                                                    */
/* ------------------------------------------------------------------ */

function CountUp({ value, decimal = false, duration = 1800 }) {
  const [display, setDisplay] = useState(0);
  const [ref, visible] = useReveal(0.4);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease out
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, value, duration]);

  return (
    <span ref={ref}>
      {decimal ? display.toFixed(1) : Math.round(display).toLocaleString()}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function AHSalonLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    testimonialTimer.current = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(testimonialTimer.current);
  }, []);

  const goTestimonial = useCallback((i) => {
    clearInterval(testimonialTimer.current);
    setActiveTestimonial(i);
    testimonialTimer.current = setInterval(() => {
      setActiveTestimonial((k) => (k + 1) % TESTIMONIALS.length);
    }, 6000);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "The Space", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Visit", href: "#visit" },
  ];

  return (
    <div className="ah-root min-h-screen w-full bg-[#FDFBF7] text-[#2B2927] antialiased overflow-x-hidden selection:bg-[#E5DFD3] selection:text-[#2B2927]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Playfair+Display:ital,wght@0,400..600;1,400..600&display=swap');

        .ah-root { font-family: 'Jost', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }

        .ah-root .marquee-track {
          animation: marquee 45s linear infinite;
        }
        .ah-root:hover .marquee-track { animation-play-state: running; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .float-slow { animation: floaty 8s ease-in-out infinite; }
        .float-slower { animation: floaty 12s ease-in-out infinite; }

        .underline-grow {
          position: relative;
        }
        .underline-grow::after {
          content: '';
          position: absolute;
          left: 0; bottom: -4px;
          width: 100%; height: 1px;
          background: #8C6D53;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .underline-grow:hover::after { transform: scaleX(1); transform-origin: left; }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .btn-primary:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 10px 20px -10px rgba(140, 109, 83, 0.4); 
        }

        .card-lift { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .card-lift:hover { 
          transform: translateY(-6px); 
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.06); 
        }

        .gallery-tile { transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .gallery-tile:hover { transform: scale(1.03); }
      `}</style>

      {/* ---------------------------------------------------------- */}
      {/* NAV                                                        */}
      {/* ---------------------------------------------------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "py-4 bg-[#FDFBF7]/90 backdrop-blur-xl shadow-sm border-b border-[#E5DFD3]/50"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-4 group">
            <span className="w-12 h-12 rounded-full bg-[#E5DFD3] text-[#2B2927] font-display italic text-xl flex items-center justify-center transition-colors duration-500">
              AH
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-[18px] tracking-wide text-[#2B2927]">AH Salon</span>
              <span className="text-[9px] tracking-[0.25em] text-[#8C6D53] uppercase mt-1.5 font-medium">
                Aesthetics &amp; Hair Lounge
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.18em] uppercase font-medium text-[#68635B]">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="underline-grow hover:text-[#2B2927] transition-colors duration-300">
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="tel:+910000000000"
            className="btn-primary hidden md:inline-flex items-center gap-2 border border-[#E5DFD3] hover:bg-[#F4F1EB] text-[#2B2927] text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3.5 rounded-full bg-white/50 backdrop-blur-md"
          >
            <Phone size={14} className="text-[#8C6D53]" /> Book Appointment
          </a>

          <button
            className="md:hidden text-[#2B2927]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FDFBF7]/95 backdrop-blur-xl border-b border-[#E5DFD3] px-6 py-8 flex flex-col gap-6 shadow-xl">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs uppercase tracking-[0.2em] text-[#68635B] hover:text-[#8C6D53] font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+910000000000"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#2B2927] text-[#FDFBF7] text-xs uppercase tracking-[0.15em] px-6 py-4 rounded-full font-medium"
            >
              <Phone size={14} /> Book Appointment
            </a>
          </div>
        )}
      </header>

      {/* ---------------------------------------------------------- */}
      {/* HERO                                                       */}
      {/* ---------------------------------------------------------- */}
      <section id="top" className="relative pt-48 pb-32 px-6 md:px-12 overflow-hidden min-h-[95vh] flex items-center">
        {/* Soft abstract background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F4EEEA] rounded-bl-[10rem] -z-10 opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-20 items-center relative z-20">
          <div>
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8C6D53] font-medium mb-10">
                <Sparkles size={12} strokeWidth={1.5} /> Premium Unisex Studio &middot; Vellore
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="font-display text-[15vw] sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] leading-[1.05] tracking-tight mb-8 text-[#2B2927]">
                Elevate your
                <br />
                <span className="italic text-[#8C6D53]">aesthetic.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-[#68635B] text-lg md:text-xl leading-relaxed max-w-md mb-12 font-light">
                A serene destination for advanced skin aesthetics and bespoke hair transformations. We bring unhurried care and international standards to you.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-8">
                <a
                  href="#visit"
                  className="btn-primary inline-flex items-center gap-3 bg-[#2B2927] text-[#FDFBF7] px-8 py-4.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium shadow-lg shadow-[#2B2927]/10"
                >
                  Book Your Session <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 underline-grow text-[11px] uppercase tracking-[0.15em] text-[#2B2927] font-medium"
                >
                  View Services <ChevronRight size={14} className="text-[#8C6D53]" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex items-center gap-5 mt-16 pt-8 border-t border-[#E5DFD3] max-w-md">
                <div className="flex -space-x-3">
                  {["EW", "CH", "SB", "AF"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#FDFBF7] bg-[#E5DFD3] text-[#8C6D53] text-[11px] flex items-center justify-center font-medium shadow-sm"
                      style={{ zIndex: 10 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#8C6D53] mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i === 4 ? "transparent" : "currentColor"} className={i === 4 ? "opacity-60 text-[#8C6D53]" : ""} strokeWidth={1} />
                    ))}
                  </div>
                  <span className="text-[#68635B] text-sm font-light">4.4 &middot; 1,100+ Google Reviews</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="relative h-[650px] hidden md:block">
            {/* The beautiful generated images instead of the dark blobs! */}
            <img 
              src="/hero_model.png" 
              alt="Premium aesthetic model" 
              className="absolute top-0 right-0 w-[68%] h-[75%] object-cover rounded-t-full rounded-b-[4rem] shadow-2xl float-slow border-[8px] border-[#FDFBF7]"
            />
            <img 
              src="/hero_salon.png" 
              alt="Luxurious Salon Interior" 
              className="absolute bottom-4 left-0 w-[55%] h-[50%] object-cover rounded-[2rem] shadow-xl float-slower border-[8px] border-[#FDFBF7]"
            />

            {/* Floating Glass Badge */}
            <div className="absolute bottom-24 right-[-20px] bg-white/80 backdrop-blur-xl border border-[#E5DFD3] rounded-2xl px-6 py-5 shadow-xl flex items-center gap-4 float-slow">
              <div className="w-10 h-10 rounded-full bg-[#F4EEEA] flex items-center justify-center">
                <Clock size={18} className="text-[#8C6D53]" />
              </div>
              <div className="text-sm leading-tight">
                <div className="font-medium text-[#2B2927]">Open Today</div>
                <div className="text-[#68635B] mt-0.5 font-light">10 AM – 9 PM</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* MARQUEE                                                    */}
      {/* ---------------------------------------------------------- */}
      <div className="border-y border-[#E5DFD3]/60 bg-[#F4EEEA] py-6 overflow-hidden relative">
        <div className="marquee-track flex whitespace-nowrap w-max">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center">
              {[
                "HydraFacial", "BB Glow", "Microblading", "Lip Blushing",
                "Keratin Treatment", "Hair Smoothening", "Bridal Styling",
                "Permanent Makeup", "De-Tan"
              ].map((s) => (
                <span key={s} className="flex items-center gap-8 px-8 text-[12px] uppercase tracking-[0.2em] font-medium text-[#8C6D53]">
                  {s} <Sparkles size={14} className="text-[#2B2927]/20" strokeWidth={1} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* ABOUT                                                      */}
      {/* ---------------------------------------------------------- */}
      <section id="about" className="py-32 px-6 md:px-12 relative bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Reveal className="relative h-[600px] order-2 md:order-1 hidden md:block">
            <div className="absolute top-0 left-0 w-full h-[85%] rounded-[3rem] bg-[#F4EEEA] overflow-hidden">
               <img src="https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?auto=format&fit=crop&q=80&w=800" alt="About Aesthetic" className="w-full h-full object-cover opacity-90 mix-blend-multiply grayscale-[20%]" />
            </div>
            <div className="absolute bottom-0 right-10 w-[55%] p-8 rounded-[2rem] bg-white shadow-xl border border-[#E5DFD3]/50 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F4EEEA] flex items-center justify-center mb-5">
                  <Flower2 size={24} className="text-[#8C6D53]" strokeWidth={1.5} />
                </div>
                <div className="font-display text-2xl text-[#2B2927] mb-2 italic">Women-Owned</div>
                <div className="text-[#68635B] text-sm font-light">Premium Studio in Vellore</div>
            </div>
          </Reveal>

          <div className="order-1 md:order-2">
            <Reveal>
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#8C6D53] font-medium">
                <span className="w-8 h-[1px] bg-[#8C6D53]"></span> The Studio
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mt-6 mb-8 text-[#2B2927]">
                Redefining the <br/><span className="italic text-[#8C6D53]">standard of beauty.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#68635B] text-lg leading-relaxed mb-12 font-light">
                AH Salon combines masterful hair styling with advanced skin
                aesthetics under one luxurious roof. Our women-owned, unisex studio in
                Katpadi is designed for clients who expect unhurried perfection, expert care, and genuinely relaxing atmospheres.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-8 mb-12 pb-12 border-b border-[#E5DFD3]">
                {[
                  { icon: Users, label: "1,100+ Reviews" },
                  { icon: Award, label: "4.4 Star Rating" },
                  { icon: Wand2, label: "Unisex Studio" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label}>
                    <div className="w-12 h-12 rounded-full bg-[#F4EEEA] flex items-center justify-center mb-4">
                      <Icon size={20} className="text-[#8C6D53]" strokeWidth={1.5} />
                    </div>
                    <div className="text-sm font-medium text-[#2B2927] leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-[13px] text-[#68635B] font-medium tracking-wide">
                <span className="flex items-center gap-3">
                  <Wifi size={16} className="text-[#8C6D53]" strokeWidth={1.5} /> Free Wi-Fi
                </span>
                <span className="flex items-center gap-3">
                  <CreditCard size={16} className="text-[#8C6D53]" strokeWidth={1.5} /> GPay &amp; Cards
                </span>
                <span className="flex items-center gap-3">
                  <CalendarCheck size={16} className="text-[#8C6D53]" strokeWidth={1.5} /> Appointments Preferred
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SERVICES                                                   */}
      {/* ---------------------------------------------------------- */}
      <section id="services" className="py-32 px-6 md:px-12 bg-[#F4EEEA]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#8C6D53] font-medium mb-6">
                ~ The Menu ~
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#2B2927]">
                Two crafts, <span className="italic text-[#8C6D53]">one studio.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: "Aesthetic & Skin", icon: Droplets, items: SKIN_SERVICES },
              { title: "Hair Care & Styling", icon: Scissors, items: HAIR_SERVICES },
            ].map(({ title, icon: Icon, items }, idx) => (
              <Reveal key={title} delay={idx * 0.15}>
                <div className="card-lift bg-white rounded-[2.5rem] p-10 md:p-14 h-full border border-white relative overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-[#FDFBF7] border border-[#E5DFD3]/50 text-[#8C6D53] flex items-center justify-center mb-10 relative z-10">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-3xl mb-10 text-[#2B2927] relative z-10">{title}</h3>
                  <ul className="space-y-5 relative z-10">
                    {items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between border-b border-[#F4EEEA] pb-5 last:border-0"
                      >
                        <span className="text-[#2B2927] text-[17px] font-light tracking-wide">{item.name}</span>
                        {item.tag && (
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#8C6D53] bg-[#F4EEEA] px-3 py-1.5 rounded-full font-medium">
                            {item.tag}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* STATS BAND                                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 bg-[#2B2927] text-[#FDFBF7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#FDFBF7 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="font-display text-5xl md:text-6xl mb-4 font-medium tracking-tight text-[#E5DFD3]">
                <CountUp value={s.value} decimal={s.decimal} />
                <span className="text-4xl">{s.suffix}</span>
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FDFBF7]/60">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* TESTIMONIALS                                               */}
      {/* ---------------------------------------------------------- */}
      <section id="reviews" className="py-32 px-6 md:px-12 bg-white relative">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#8C6D53] font-medium mb-6">
              ~ In Their Words ~
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#2B2927]">
              1,100+ reviews, <span className="italic text-[#8C6D53]">one standard.</span>
            </h2>
          </Reveal>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Quote size={54} className="text-[#E5DFD3] mx-auto mb-10" strokeWidth={1.5} />
          <div className="relative min-h-[280px] md:min-h-[220px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="absolute inset-0 transition-all duration-1000 ease-in-out"
                style={{ 
                  opacity: i === activeTestimonial ? 1 : 0, 
                  transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(20px)',
                  pointerEvents: i === activeTestimonial ? "auto" : "none" 
                }}
              >
                <p className="font-display italic text-2xl md:text-3xl lg:text-4xl text-center leading-[1.4] mb-10 text-[#2B2927]">
                  "{t.quote}"
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 text-[#8C6D53] mb-2">
                    {[...Array(t.rating)].map((_, k) => (
                      <Star key={k} size={15} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-[15px] font-medium tracking-wide text-[#2B2927]">{t.name}</span>
                  <span className="text-[13px] text-[#68635B] font-light">{t.service}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 mt-16">
            <button
              onClick={() => goTestimonial((activeTestimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-12 h-12 rounded-full border border-[#E5DFD3] flex items-center justify-center hover:bg-[#F4EEEA] text-[#2B2927] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTestimonial(i)}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeTestimonial ? 32 : 12,
                    background: i === activeTestimonial ? "#8C6D53" : "#E5DFD3",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => goTestimonial((activeTestimonial + 1) % TESTIMONIALS.length)}
              className="w-12 h-12 rounded-full border border-[#E5DFD3] flex items-center justify-center hover:bg-[#F4EEEA] text-[#2B2927] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* GALLERY                                                    */}
      {/* ---------------------------------------------------------- */}
      <section id="gallery" className="py-32 px-6 md:px-12 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
            <div>
              <Reveal>
                <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#8C6D53] font-medium mb-6">
                   <span className="w-8 h-[1px] bg-[#8C6D53]"></span> The Space
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#2B2927]">
                  A glimpse into the <br/><span className="italic text-[#8C6D53]">AH experience.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="text-[#68635B] max-w-sm text-lg font-light leading-relaxed mb-2">
                Every corner is designed around modern
                comfort — for a quick trim or a full bridal transformation.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.1}>
                <div
                  className="gallery-tile relative rounded-3xl overflow-hidden h-80 flex items-end p-8 group cursor-pointer shadow-sm"
                  style={{ backgroundImage: g.image, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="relative text-[#FDFBF7] text-[12px] uppercase tracking-[0.2em] font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {g.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* VISIT / LOCATION                                           */}
      {/* ---------------------------------------------------------- */}
      <section id="visit" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <Reveal>
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#8C6D53] font-medium mb-6">
                <span className="w-8 h-[1px] bg-[#8C6D53]"></span> Visit Us
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-12 text-[#2B2927]">
                Katpadi is <span className="italic text-[#8C6D53]">waiting.</span>
              </h2>
            </Reveal>

            <div className="space-y-6 mb-14">
              <Reveal delay={0.2}>
                <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-[#FDFBF7] border border-[#E5DFD3]/50 hover:bg-[#F4EEEA] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={20} className="text-[#8C6D53]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-medium text-lg text-[#2B2927] mb-1">Katpadi, Vellore</div>
                    <div className="text-[#68635B] text-sm font-light">Tamil Nadu, India</div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-[#FDFBF7] border border-[#E5DFD3]/50 hover:bg-[#F4EEEA] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock size={20} className="text-[#8C6D53]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-medium text-lg text-[#2B2927] mb-1">10 AM – 9 PM, Daily</div>
                    <div className="text-[#68635B] text-sm font-light">Appointments highly recommended</div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-[#FDFBF7] border border-[#E5DFD3]/50 hover:bg-[#F4EEEA] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                     <Phone size={20} className="text-[#8C6D53]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-medium text-lg text-[#2B2927] mb-1">Call to Book</div>
                    <div className="text-[#68635B] text-sm font-light">Walk-ins welcome, subject to availability</div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.5}>
              <a
                href="tel:+910000000000"
                className="btn-primary inline-flex items-center gap-3 bg-white border border-[#2B2927] text-[#2B2927] hover:bg-[#2B2927] hover:text-[#FDFBF7] px-8 py-4.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium"
              >
                Get Directions <ArrowUpRight size={16} strokeWidth={1.5} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-xl bg-[#F4EEEA]">
            <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800" alt="Map Location Background" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl float-slow relative">
                <div className="absolute inset-0 rounded-full border border-[#8C6D53] animate-ping opacity-30" />
                <MapPin size={28} className="text-[#8C6D53]" strokeWidth={1.5} />
              </div>
              <div className="mt-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium text-[#2B2927] shadow-lg">
                AH Salon &middot; Katpadi
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FINAL CTA                                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="relative py-40 px-6 md:px-12 overflow-hidden bg-[#2B2927] text-[#FDFBF7]">
        <div className="absolute inset-0 bg-[#E5DFD3] mix-blend-overlay opacity-5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8C6D53]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="font-display text-5xl md:text-7xl leading-[1.05] mb-8">
              Ready to <span className="italic text-[#8C6D53]">transform?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[#FDFBF7]/70 text-xl font-light max-w-2xl mx-auto mb-14">
              Reserve your slot at Vellore's trusted studio for
              advanced skin aesthetics and premium hair care.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="tel:+910000000000"
              className="btn-primary inline-flex items-center gap-3 bg-[#E5DFD3] text-[#2B2927] px-10 py-5 rounded-full text-[12px] uppercase tracking-[0.15em] font-medium"
            >
              <Phone size={16} strokeWidth={1.5} /> Book Your Appointment
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FOOTER                                                     */}
      {/* ---------------------------------------------------------- */}
      <footer className="bg-[#1C1A19] text-[#FDFBF7] pt-24 pb-10 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-12 rounded-full bg-[#E5DFD3] text-[#1C1A19] font-display italic text-xl flex items-center justify-center">
                AH
              </span>
              <span className="font-display text-2xl">AH Salon</span>
            </div>
            <p className="text-[#FDFBF7]/60 text-sm leading-relaxed font-light mb-8 max-w-sm">
              Aesthetics &amp; Hair Lounge, Katpadi — a women-owned unisex
              studio for advanced skin care and luxury hair styling.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E5DFD3] hover:text-[#1C1A19] transition-all duration-300">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E5DFD3] hover:text-[#1C1A19] transition-all duration-300">
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8C6D53] mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-light">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#FDFBF7]/70 hover:text-[#FDFBF7] transition-colors flex items-center gap-2 group">
                     <span className="w-0 h-px bg-[#E5DFD3] transition-all duration-300 group-hover:w-4"></span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8C6D53] mb-6">Hours</h4>
            <ul className="space-y-4 text-sm font-light text-[#FDFBF7]/70">
              <li>Monday – Sunday</li>
              <li className="text-[#FDFBF7] font-medium">10:00 AM – 9:00 PM</li>
              <li className="pt-2 text-xs text-[#FDFBF7]/40">Appointments highly recommended</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8C6D53] mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-light text-[#FDFBF7]/70">
              <li className="flex items-start gap-3">
                 <MapPin size={16} className="text-[#8C6D53] mt-0.5 shrink-0" strokeWidth={1.5} />
                 <span>Katpadi, Vellore, TN</span>
              </li>
              <li className="flex items-center gap-3">
                 <Phone size={16} className="text-[#8C6D53] shrink-0" strokeWidth={1.5} />
                 <span>+91 00000 00000</span>
              </li>
              <li className="flex items-center gap-3">
                 <Wifi size={16} className="text-[#8C6D53] shrink-0" strokeWidth={1.5} />
                 <span>Free Wi-Fi Onsite</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-[#FDFBF7]/40 relative z-10">
          <span>&copy; {new Date().getFullYear()} AH Salon — Aesthetics &amp; Hair Lounge, Katpadi.</span>
          <span>Website crafted with precision.</span>
        </div>
      </footer>
    </div>
  );
}
