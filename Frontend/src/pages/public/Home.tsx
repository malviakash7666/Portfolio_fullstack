import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegisterModal from "../../components/LoginRegisterModal";
import { getMe } from "../../service/authService";

const words = ["Resume", "Portfolio", "Career", "Story", "Identity"];

function Home() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Auth guard: logged-in users skip the home page ──
  useEffect(() => {
    const check = async () => {
      try {
        const data = await getMe();
        const username = data?.username || data?.user?.username;
        if (username) {
          navigate(`/user/${username}`, { replace: true });
          return;
        }
      } catch {
        // Not logged in — stay on home
      }
      setTimeout(() => setMounted(true), 100);
    };
    check();
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = words[wordIndex];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        90
      );
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        50
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, wordIndex]);

  return (
    <div className="relative min-h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden px-6">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-400/[0.06] blur-3xl pointer-events-none animate-pulse" />

      {/* Corner accents */}
      <span className="absolute top-8 left-8 w-10 h-10 border-t border-l border-amber-400/30" />
      <span className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-amber-400/30" />

      {/* Nav */}
      <nav
        className={`absolute top-0 left-0 right-0 flex items-center justify-between px-10 py-6 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <span className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase">
          Folio<span className="text-neutral-500">.</span>
        </span>
        <button
          onClick={() => setOpen(true)}
          className="text-neutral-400 font-mono text-xs tracking-widest uppercase hover:text-amber-400 transition-colors duration-300"
        >
          Sign In
        </button>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">

        {/* Badge */}
        <div
          className={`flex items-center gap-2 border border-amber-400/25 rounded-full px-4 py-1.5 mb-12 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400/80 font-mono text-[10px] tracking-[0.2em] uppercase">
            Your professional presence, live
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-neutral-100 leading-[1.05] tracking-tight mb-4 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Build Your
        </h1>

        {/* Typewriter */}
        <h1
          className={`font-serif text-5xl sm:text-7xl lg:text-8xl font-light italic text-amber-400 leading-[1.05] tracking-tight mb-10 transition-all duration-700 delay-[400ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ minHeight: "1.1em" }}
        >
          {displayed}
          <span className="border-r-2 border-amber-400 ml-0.5 animate-pulse">&nbsp;</span>
        </h1>

        {/* Subtext */}
        <p
          className={`text-neutral-500 font-mono text-xs tracking-widest leading-loose max-w-sm mb-14 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Upload your resume. Let the world find you.
          <br />
          One link. Every opportunity.
        </p>

        {/* CTAs */}
        <div
          className={`flex items-center gap-4 transition-all duration-700 delay-[600ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={() => setOpen(true)}
            className="group relative bg-amber-400 text-neutral-950 font-mono text-xs tracking-widest uppercase px-8 py-3.5 overflow-hidden transition-all duration-300 hover:bg-amber-300 active:scale-95"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          </button>

          <button className="text-neutral-500 font-mono text-xs tracking-widest uppercase px-6 py-3.5 border border-neutral-800 hover:border-neutral-600 hover:text-neutral-300 transition-all duration-300 active:scale-95">
            See Demo
          </button>
        </div>

        {/* Feature pills */}
        <div
          className={`flex items-center gap-6 mt-16 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {["Resume Upload", "Live Portfolio", "One-Click Share"].map((feat, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-amber-400/50" />
              <span className="text-neutral-600 font-mono text-[10px] tracking-widest uppercase">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[800ms] ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-neutral-700 font-mono text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-neutral-700 to-transparent animate-pulse" />
      </div>

      {open && <LoginRegisterModal onClose={() => setOpen(false)} />}
    </div>
  );
}

export default Home;