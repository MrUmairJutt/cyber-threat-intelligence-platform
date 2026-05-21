import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  Check,
  ChevronRight,
  CircleDot,
  CloudLightning,
  Crosshair,
  DatabaseZap,
  Eye,
  FileText,
  Fingerprint,
  Flame,
  Globe2,
  Hexagon,
  Lock,
  Mail,
  Menu,
  Network,
  Radar,
  RadioTower,
  ScanLine,
  Search,
  Send,
  ServerCog,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Skull,
  Sparkles,
  TerminalSquare,
  TrendingUp,
  UserCheck,
  X,
  Zap
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import "./styles.css";

const navItems = ["Home", "Threat Feed", "Dashboard", "Reports", "Analytics", "Contact"];

const metrics = [
  { label: "Threat Level", value: "Elevated", sub: "TLP: Amber", icon: ShieldAlert, tone: "danger" },
  { label: "Malware Detections", value: "12,847", sub: "+18.4% today", icon: Skull, tone: "danger" },
  { label: "DDoS Attacks", value: "384", sub: "47 blocked / hr", icon: CloudLightning, tone: "cyan" },
  { label: "Phishing Attempts", value: "7,206", sub: "91% auto-contained", icon: Mail, tone: "amber" },
  { label: "Firewall Status", value: "Hardened", sub: "All zones active", icon: Lock, tone: "green" },
  { label: "AI Risk Score", value: "82/100", sub: "Critical paths watched", icon: BrainCircuit, tone: "danger" },
  { label: "System Health", value: "99.98%", sub: "SOC mesh online", icon: Activity, tone: "green" },
  { label: "IOC Matches", value: "1,492", sub: "36 new indicators", icon: Fingerprint, tone: "cyan" }
];

const threatSeries = [
  { time: "00:00", malware: 32, phishing: 56, ddos: 18 },
  { time: "03:00", malware: 45, phishing: 72, ddos: 26 },
  { time: "06:00", malware: 38, phishing: 64, ddos: 41 },
  { time: "09:00", malware: 78, phishing: 92, ddos: 66 },
  { time: "12:00", malware: 64, phishing: 88, ddos: 54 },
  { time: "15:00", malware: 92, phishing: 116, ddos: 82 },
  { time: "18:00", malware: 84, phishing: 126, ddos: 74 },
  { time: "21:00", malware: 104, phishing: 132, ddos: 97 }
];

const barData = [
  { name: "APT", value: 42 },
  { name: "C2", value: 68 },
  { name: "Botnet", value: 54 },
  { name: "Malware", value: 86 },
  { name: "Phish", value: 92 },
  { name: "Zero-Day", value: 31 }
];

const pieData = [
  { name: "Malware", value: 34, color: "#18ff9a" },
  { name: "Phishing", value: 28, color: "#22d3ee" },
  { name: "DDoS", value: 18, color: "#ff3158" },
  { name: "Insider", value: 11, color: "#fbbf24" },
  { name: "Other", value: 9, color: "#8b5cf6" }
];

const feed = [
  {
    title: "Ransomware",
    severity: "Critical",
    time: "43 sec ago",
    desc: "LockBit-style lateral movement behavior detected across finance VLAN.",
    icon: Skull
  },
  {
    title: "Phishing",
    severity: "High",
    time: "2 min ago",
    desc: "Credential harvesting domain mirrors Microsoft 365 tenant login.",
    icon: Mail
  },
  {
    title: "Zero-Day Exploits",
    severity: "Critical",
    time: "7 min ago",
    desc: "Exploit chain targeting edge gateway memory corruption signature.",
    icon: Zap
  },
  {
    title: "Botnet Activity",
    severity: "High",
    time: "12 min ago",
    desc: "Mirai-derived command bursts found on exposed IoT estate.",
    icon: Network
  },
  {
    title: "Dark Web Alerts",
    severity: "Medium",
    time: "18 min ago",
    desc: "New paste references internal project codename and contractor email.",
    icon: Eye
  },
  {
    title: "Insider Threats",
    severity: "Medium",
    time: "26 min ago",
    desc: "Privileged user exported anomalous volume outside maintenance window.",
    icon: UserCheck
  }
];

const attackFeeds = [
  "CN -> US | SYN flood | 12.4k pps",
  "RU -> DE | C2 beacon | Emotet pattern",
  "BR -> UK | Phishing kit | Credential lure",
  "IR -> FR | Exploit probe | CVE correlation",
  "KP -> JP | Supply-chain scan | High confidence",
  "US -> SG | Botnet relay | Sinkholed"
];

const countries = [
  { name: "United States", hits: "42.8k", risk: 92 },
  { name: "Germany", hits: "31.4k", risk: 81 },
  { name: "United Kingdom", hits: "28.9k", risk: 74 },
  { name: "Japan", hits: "24.1k", risk: 69 },
  { name: "Singapore", hits: "18.6k", risk: 64 }
];

const terminalLines = [
  "booting cyber sentinel neural engine...",
  "loading yara rules: 18,442 signatures",
  "syncing STIX/TAXII intelligence channels",
  "scanning subnet 10.40.18.0/24",
  "tracking suspicious IP 185.220.101.42",
  "correlating packet entropy with known C2 traffic",
  "isolation policy staged for 7 endpoints",
  "system secured. analyst confirmation requested."
];

const features = [
  ["AI Threat Detection", BrainCircuit],
  ["Real-Time Monitoring", Radar],
  ["Deep Packet Inspection", ScanLine],
  ["Dark Web Intelligence", Eye],
  ["Behavioral Analytics", BarChart3],
  ["SOC Automation", Bot],
  ["Incident Response", ShieldCheck]
];

const plans = [
  { name: "Starter", price: "$149", desc: "For lean security teams", items: ["Live threat feed", "Basic IOC matching", "Weekly reports"] },
  { name: "Professional", price: "$499", desc: "For growing SOC teams", items: ["AI risk scoring", "Attack map", "Automation playbooks"], hot: true },
  { name: "Enterprise", price: "Custom", desc: "For mission-critical defense", items: ["Dedicated tenant", "Custom detections", "Executive briefings"] }
];

const testimonials = [
  ["Aegis Financial", "CyberSentinel gives our SOC the live context and executive-grade reporting we needed without operational clutter."],
  ["Northstar Cloud", "The dashboard feels like a real command center. Our analysts can triage phishing, C2, and endpoint signals in minutes."],
  ["Helix Defense Group", "The visual intelligence layer is outstanding for tabletop exercises and board-level threat briefings."]
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Section({ id, eyebrow, title, children, className }) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8", className)}>
      {(eyebrow || title) && (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          {eyebrow && <p className="font-rajdhani text-sm font-bold uppercase tracking-[0.35em] text-neon">{eyebrow}</p>}
          {title && <h2 className="mt-3 max-w-4xl font-orbitron text-3xl font-black text-white sm:text-4xl lg:text-5xl">{title}</h2>}
        </motion.div>
      )}
      {children}
    </section>
  );
}

function GlassCard({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
      className={cn("glass-card group relative overflow-hidden rounded-lg border border-white/10 bg-panel p-5 shadow-2xl backdrop-blur-xl", className)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-70" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan/10 blur-3xl transition group-hover:bg-neon/10" />
      {children}
    </motion.div>
  );
}

function BackgroundFX() {
  const drops = useMemo(
    () =>
      Array.from({ length: 38 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i * 0.31) % 6}s`,
        text: ["0101", "TRACE", "ROOT", "CVE", "SOC", "XDR", "AUTH", "HASH"][i % 8]
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-abyss bg-cyber-radial">
      <div className="absolute inset-0 cyber-grid opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(2,5,11,.55)_62%,rgba(2,5,11,.96))]" />
      {drops.map((drop, index) => (
        <span
          key={index}
          className="absolute top-0 animate-matrix font-rajdhani text-xs font-bold text-neon/20"
          style={{ left: drop.left, animationDelay: drop.delay }}
        >
          {drop.text}
          <br />
          10110
          <br />
          0xAF
        </span>
      ))}
      <div className="absolute left-1/2 top-0 h-full w-px animate-pulse bg-cyan/20 shadow-cyan" />
      <div className="absolute inset-x-0 top-0 h-36 animate-scan bg-gradient-to-b from-transparent via-neon/5 to-transparent" />
    </div>
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-2xl md:block"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-abyss"
        >
          <div className="text-center">
            <Shield className="mx-auto h-16 w-16 animate-pulseGlow text-neon" />
            <div className="mt-6 font-orbitron text-xl font-black uppercase tracking-[0.35em] text-white">CyberSentinel XDR</div>
            <div className="mx-auto mt-5 h-1 w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-neon via-cyan to-danger" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.1 }} />
            </div>
            <p className="mt-4 font-rajdhani text-sm font-semibold uppercase tracking-[0.25em] text-cyan/80">initializing command center</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-abyss/70 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg border border-neon/40 bg-neon/10 shadow-neon">
            <Shield className="h-6 w-6 text-neon" />
          </div>
          <div>
            <div className="font-orbitron text-lg font-black tracking-[0.18em] text-white">CYBERSENTINEL</div>
            <div className="font-rajdhani text-xs font-bold uppercase tracking-[0.35em] text-cyan">XDR Intelligence</div>
          </div>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="font-rajdhani text-sm font-bold uppercase tracking-[0.18em] text-slate-300 transition hover:text-neon">
              {item}
            </a>
          ))}
        </div>
        <button className="hidden rounded-lg border border-neon/40 bg-neon/10 px-4 py-2 font-rajdhani text-sm font-bold uppercase tracking-[0.2em] text-neon shadow-neon transition hover:bg-neon hover:text-abyss lg:block">
          Secure Login
        </button>
        <button onClick={() => setOpen((value) => !value)} className="rounded-lg border border-white/10 p-2 text-white lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 bg-abyss/95 px-4 py-4 lg:hidden">
            {navItems.map((item) => (
              <a onClick={() => setOpen(false)} key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="block rounded-lg px-3 py-3 font-rajdhani font-bold uppercase tracking-[0.2em] text-slate-200 hover:bg-white/5 hover:text-neon">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 world-grid opacity-30" />
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 font-rajdhani text-sm font-bold uppercase tracking-[0.25em] text-neon">
            <CircleDot className="h-4 w-4 animate-pulse" />
            Live AI threat mesh online
          </div>
          <h1 className="glitch-text font-orbitron text-4xl font-black uppercase leading-tight text-white sm:text-6xl lg:text-7xl" data-text="AI-Powered Cyber Threat Intelligence Platform">
            AI-Powered Cyber Threat Intelligence Platform
          </h1>
          <p className="mt-7 max-w-2xl font-inter text-lg leading-8 text-slate-300">
            A frontend-only enterprise cyber defense command center for monitoring attack telemetry, AI risk scoring, malware activity, phishing campaigns, global threat movement, and analyst-ready incident intelligence.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#dashboard" className="neon-button group inline-flex items-center justify-center gap-2 rounded-lg bg-neon px-6 py-4 font-rajdhani text-base font-black uppercase tracking-[0.18em] text-abyss">
              Launch Dashboard <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a href="#threat-map" className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-6 py-4 font-rajdhani text-base font-black uppercase tracking-[0.18em] text-cyan shadow-cyan transition hover:bg-cyan hover:text-abyss">
              View Threat Map <Globe2 className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
          <div className="absolute -inset-8 rounded-full bg-cyan/10 blur-3xl" />
          <HeroConsole />
          {[Shield, Radar, Crosshair, DatabaseZap].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -16, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4 + index, repeat: Infinity, delay: index * 0.4 }}
              className={cn("absolute hidden rounded-lg border border-white/10 bg-white/5 p-3 text-neon shadow-neon backdrop-blur-xl sm:block", index === 0 && "-left-4 top-10", index === 1 && "right-0 top-4 text-cyan", index === 2 && "-right-4 bottom-24 text-danger", index === 3 && "bottom-6 left-8 text-amber")}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HeroConsole() {
  return (
    <div className="relative rounded-lg border border-neon/25 bg-[#020813]/80 p-4 shadow-2xl backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-danger" />
          <span className="h-3 w-3 rounded-full bg-amber" />
          <span className="h-3 w-3 rounded-full bg-neon" />
        </div>
        <span className="font-rajdhani text-xs font-bold uppercase tracking-[0.25em] text-cyan">terminal://sentinel-ai</span>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_.8fr]">
        <div className="space-y-3 font-rajdhani text-sm font-semibold text-slate-300">
          {["$ run --scan global_edge", "[OK] 4,812 endpoints fingerprinted", "[WARN] ransomware entropy spike", "[AI] containment probability 96.7%", "[OK] active response policy armed"].map((line, index) => (
            <motion.div key={line} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + index * 0.18 }} className={cn(index === 2 && "text-amber", index === 3 && "text-cyan", index === 4 && "text-neon")}>
              {line}
            </motion.div>
          ))}
        </div>
        <div className="relative grid aspect-square place-items-center rounded-lg border border-cyan/20 bg-cyan/5">
          <div className="absolute h-4/5 w-4/5 rounded-full border border-neon/30" />
          <div className="absolute h-3/5 w-3/5 rounded-full border border-cyan/30" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute h-[88%] w-[88%] rounded-full border-t-2 border-neon" />
          <ShieldCheck className="h-16 w-16 text-neon drop-shadow-[0_0_18px_rgba(24,255,154,.75)]" />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const logs = [
    "[23:41:02] BLOCK 198.51.100.77 exploit probe",
    "[23:41:08] DETECT domain dga-node-771.net",
    "[23:41:16] TRACE credential spray source ASN-4134",
    "[23:41:22] QUAR endpoint FIN-WS-104",
    "[23:41:31] SCORE campaign risk elevated to 82"
  ];

  return (
    <Section id="dashboard" eyebrow="Live Threat Dashboard" title="Operational telemetry for analysts, hunters, and response teams.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <GlassCard key={metric.label} delay={index * 0.04}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-rajdhani text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{metric.label}</p>
                <div className={cn("mt-3 font-orbitron text-2xl font-black", metric.tone === "danger" && "text-danger", metric.tone === "cyan" && "text-cyan", metric.tone === "amber" && "text-amber", metric.tone === "green" && "text-neon")}>{metric.value}</div>
                <p className="mt-2 font-inter text-sm text-slate-400">{metric.sub}</p>
              </div>
              <metric.icon className={cn("h-7 w-7", metric.tone === "danger" && "text-danger", metric.tone === "cyan" && "text-cyan", metric.tone === "amber" && "text-amber", metric.tone === "green" && "text-neon")} />
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${55 + index * 5}%` }} viewport={{ once: true }} transition={{ duration: 1.1 }} className={cn("h-full rounded-full", metric.tone === "danger" && "bg-danger", metric.tone === "cyan" && "bg-cyan", metric.tone === "amber" && "bg-amber", metric.tone === "green" && "bg-neon")} />
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <GlassCard className="min-h-[360px]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-orbitron text-xl font-bold text-white">Threat Activity Stream</h3>
              <p className="font-inter text-sm text-slate-400">Animated dummy telemetry across malware, phishing, and volumetric attacks.</p>
            </div>
            <span className="rounded-full border border-neon/30 bg-neon/10 px-3 py-1 font-rajdhani text-xs font-bold uppercase tracking-[0.2em] text-neon">Live</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatSeries}>
                <defs>
                  <linearGradient id="malware" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#18ff9a" stopOpacity={0.45} /><stop offset="100%" stopColor="#18ff9a" stopOpacity={0} /></linearGradient>
                  <linearGradient id="phishing" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} /><stop offset="100%" stopColor="#22d3ee" stopOpacity={0} /></linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#06111f", border: "1px solid rgba(34,211,238,.25)", borderRadius: 8, color: "#fff" }} />
                <Area type="monotone" dataKey="malware" stroke="#18ff9a" fill="url(#malware)" strokeWidth={3} />
                <Area type="monotone" dataKey="phishing" stroke="#22d3ee" fill="url(#phishing)" strokeWidth={3} />
                <Line type="monotone" dataKey="ddos" stroke="#ff3158" strokeWidth={3} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="font-orbitron text-xl font-bold text-white">AI Risk Score</h3>
          <div className="mt-6 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "Risk", value: 82, fill: "#ff3158" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={12} background={{ fill: "rgba(255,255,255,.08)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="-mt-32 grid place-items-center pb-16">
            <div className="font-orbitron text-5xl font-black text-danger">82</div>
            <div className="font-rajdhani text-sm font-bold uppercase tracking-[0.25em] text-slate-400">Critical</div>
          </div>
          <div className="space-y-2 font-rajdhani text-sm font-semibold text-slate-300">
            {logs.map((log) => (
              <div key={log} className="rounded border border-white/10 bg-black/25 px-3 py-2 text-neon/90">{log}</div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

function AttackMap() {
  const points = [
    ["12%", "34%"], ["23%", "48%"], ["44%", "30%"], ["53%", "42%"], ["70%", "38%"], ["82%", "55%"], ["61%", "62%"], ["34%", "68%"]
  ];

  return (
    <Section id="threat-map" eyebrow="Global Cyber Attack Map" title="Live visual intelligence across hostile infrastructure and targeted regions.">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <GlassCard className="relative min-h-[520px] p-0">
          <div className="absolute inset-0 world-map opacity-70" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 520" preserveAspectRatio="none">
            {[
              ["160", "170", "520", "220"], ["720", "190", "450", "260"], ["260", "350", "780", "280"], ["580", "315", "820", "180"], ["360", "245", "650", "370"]
            ].map((line, index) => (
              <motion.path
                key={index}
                d={`M ${line[0]} ${line[1]} Q 500 ${90 + index * 50} ${line[2]} ${line[3]}`}
                fill="none"
                stroke={index % 2 ? "#22d3ee" : "#ff3158"}
                strokeWidth="2"
                strokeDasharray="8 10"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: false }}
                transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop", repeatDelay: 0.7, delay: index * 0.2 }}
              />
            ))}
          </svg>
          {points.map(([left, top], index) => (
            <span key={index} className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-danger shadow-danger" style={{ left, top }}>
              <span className="absolute inset-0 animate-ping rounded-full bg-danger" />
            </span>
          ))}
          <div className="absolute left-5 top-5 rounded-lg border border-neon/20 bg-abyss/70 px-4 py-3 backdrop-blur">
            <div className="font-orbitron text-lg font-black text-white">42,809</div>
            <div className="font-rajdhani text-xs font-bold uppercase tracking-[0.22em] text-neon">attacks blocked today</div>
          </div>
        </GlassCard>
        <div className="space-y-6">
          <GlassCard>
            <h3 className="font-orbitron text-xl font-bold text-white">Fake Live Attack Feed</h3>
            <div className="mt-5 space-y-3">
              {attackFeeds.map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3 font-rajdhani text-sm font-semibold text-slate-300">
                  <RadioTower className={cn("h-4 w-4", index % 2 ? "text-cyan" : "text-danger")} />
                  {item}
                </motion.div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="font-orbitron text-xl font-bold text-white">Top Targeted Countries</h3>
            <div className="mt-5 space-y-4">
              {countries.map((country) => (
                <div key={country.name}>
                  <div className="flex justify-between font-rajdhani text-sm font-bold text-slate-300"><span>{country.name}</span><span>{country.hits}</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-neon via-cyan to-danger" style={{ width: `${country.risk}%` }} /></div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}

function ThreatFeed() {
  return (
    <Section id="threat-feed" eyebrow="Threat Feed" title="High-signal intelligence cards with analyst-ready context.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {feed.map((item, index) => (
          <GlassCard key={item.title} delay={index * 0.05}>
            <div className="mb-5 flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan">
                <item.icon className="h-6 w-6" />
              </div>
              <span className={cn("rounded-full px-3 py-1 font-rajdhani text-xs font-black uppercase tracking-[0.18em]", item.severity === "Critical" && "border border-danger/40 bg-danger/10 text-danger", item.severity === "High" && "border border-amber/40 bg-amber/10 text-amber", item.severity === "Medium" && "border border-cyan/40 bg-cyan/10 text-cyan")}>{item.severity}</span>
            </div>
            <h3 className="font-orbitron text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-3 font-inter text-sm leading-6 text-slate-400">{item.desc}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-rajdhani text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{item.time}</span>
              <span className="flex items-center gap-2 font-rajdhani text-sm font-bold uppercase tracking-[0.2em] text-neon"><span className="h-2 w-2 animate-pulse rounded-full bg-neon" />Active</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

function Analytics() {
  return (
    <Section id="analytics" eyebrow="AI Analytics" title="Predictive defense scoring with executive clarity and SOC detail.">
      <div className="grid gap-6 xl:grid-cols-3">
        <GlassCard className="xl:col-span-2">
          <h3 className="font-orbitron text-xl font-bold text-white">Threat Prediction Graph</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={threatSeries}>
                <XAxis dataKey="time" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#06111f", border: "1px solid rgba(34,211,238,.25)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="phishing" stroke="#22d3ee" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="malware" stroke="#18ff9a" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="ddos" stroke="#ff3158" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="font-orbitron text-xl font-bold text-white">Threat Mix</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={62} outerRadius={98} paddingAngle={4}>
                  {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#06111f", border: "1px solid rgba(34,211,238,.25)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 font-rajdhani text-sm font-bold text-slate-300"><span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />{item.name}</div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="xl:col-span-2">
          <h3 className="font-orbitron text-xl font-bold text-white">Attack Vector Confidence</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#06111f", border: "1px solid rgba(34,211,238,.25)", borderRadius: 8 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#18ff9a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="font-orbitron text-xl font-bold text-white">AI Analysis</h3>
          <div className="mt-6 space-y-4">
            {[
              ["Containment readiness", "96%"],
              ["False-positive reduction", "41%"],
              ["Prediction confidence", "88%"],
              ["Security score", "A-"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex justify-between font-rajdhani text-sm font-bold uppercase tracking-[0.16em] text-slate-400"><span>{label}</span><span className="text-neon">{value}</span></div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

function TerminalSection() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setVisible((value) => (value >= terminalLines.length ? 1 : value + 1)), 1100);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section id="reports" eyebrow="Terminal Simulation" title="A hacker-inspired console for scan, trace, and response workflows.">
      <GlassCard className="p-0">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3"><TerminalSquare className="h-5 w-5 text-neon" /><span className="font-orbitron text-sm font-bold uppercase tracking-[0.25em] text-white">sentinel root console</span></div>
          <span className="font-rajdhani text-xs font-bold uppercase tracking-[0.2em] text-neon">encrypted session</span>
        </div>
        <div className="min-h-[320px] bg-black/40 p-5 font-rajdhani text-lg font-semibold leading-8 text-slate-300">
          {terminalLines.slice(0, visible).map((line, index) => (
            <motion.div key={`${line}-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={index === visible - 1 ? "text-neon" : "text-slate-400"}>
              <span className="text-cyan">root@sentinel:~$</span> {line}
            </motion.div>
          ))}
          <span className="mt-2 inline-block h-5 w-2 animate-pulse bg-neon" />
        </div>
      </GlassCard>
    </Section>
  );
}

function FeaturesPricing() {
  return (
    <>
      <Section eyebrow="Capabilities" title="Everything a modern cyber defense SaaS surface needs.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([name, Icon], index) => (
            <GlassCard key={name} delay={index * 0.04}>
              <Icon className="h-8 w-8 text-neon" />
              <h3 className="mt-5 font-orbitron text-lg font-bold text-white">{name}</h3>
              <p className="mt-3 font-inter text-sm leading-6 text-slate-400">Operationally focused, animated, and ready for realistic frontend demos.</p>
            </GlassCard>
          ))}
        </div>
      </Section>
      <Section eyebrow="Pricing" title="Cybersecurity SaaS plans for every threat model.">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <GlassCard key={plan.name} className={cn("transition hover:-translate-y-1 hover:shadow-neon", plan.hot && "border-neon/40 bg-neon/10")}>
              {plan.hot && <div className="mb-4 inline-flex rounded-full border border-neon/40 bg-neon/10 px-3 py-1 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-neon">Most deployed</div>}
              <h3 className="font-orbitron text-2xl font-black text-white">{plan.name}</h3>
              <p className="mt-2 font-inter text-slate-400">{plan.desc}</p>
              <div className="mt-7 font-orbitron text-4xl font-black text-neon">{plan.price}<span className="font-rajdhani text-base text-slate-500">{plan.price !== "Custom" && "/mo"}</span></div>
              <div className="mt-7 space-y-3">
                {plan.items.map((item) => <div key={item} className="flex items-center gap-3 font-inter text-sm text-slate-300"><Check className="h-4 w-4 text-neon" />{item}</div>)}
              </div>
              <button className="mt-8 w-full rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-3 font-rajdhani font-black uppercase tracking-[0.2em] text-cyan transition hover:bg-cyan hover:text-abyss">Choose Plan</button>
            </GlassCard>
          ))}
        </div>
      </Section>
    </>
  );
}

function TestimonialsContact() {
  return (
    <>
      <Section eyebrow="Testimonials" title="Built for believable enterprise cybersecurity narratives.">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map(([company, quote]) => (
            <GlassCard key={company}>
              <Building2 className="h-7 w-7 text-cyan" />
              <p className="mt-6 font-inter text-base leading-7 text-slate-300">"{quote}"</p>
              <div className="mt-6 font-orbitron text-sm font-bold uppercase tracking-[0.2em] text-neon">{company}</div>
            </GlassCard>
          ))}
        </div>
      </Section>
      <Section id="contact" eyebrow="Contact" title="Request a cyber intelligence briefing.">
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <GlassCard>
            <h3 className="font-orbitron text-2xl font-bold text-white">Cyber Operations Office</h3>
            <p className="mt-4 font-inter leading-7 text-slate-400">Frontend-only form experience for demos, landing pages, and portfolio presentations. No backend calls are made.</p>
            <div className="mt-8 space-y-4">
              {["soc@cybersentinel.demo", "+1 555 0188 744", "Global response desk: 24/7"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-4 font-rajdhani text-lg font-semibold text-slate-300">
                  {[Mail, Send, ServerCog][index] && React.createElement([Mail, Send, ServerCog][index], { className: "h-5 w-5 text-neon" })}
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <form className="grid gap-4">
              {["Name", "Work Email", "Company"].map((label) => (
                <label key={label} className="font-rajdhani text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                  {label}
                  <input className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-inter text-white outline-none transition focus:border-neon" placeholder={label} />
                </label>
              ))}
              <label className="font-rajdhani text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                Mission Brief
                <textarea className="mt-2 min-h-32 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-inter text-white outline-none transition focus:border-neon" placeholder="Tell us about your threat intelligence goals." />
              </label>
              <button type="button" className="neon-button mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-neon px-6 py-4 font-rajdhani font-black uppercase tracking-[0.2em] text-abyss">
                Send Request <Send className="h-5 w-5" />
              </button>
            </form>
          </GlassCard>
        </div>
      </Section>
      <footer className="border-t border-white/10 px-4 py-10 text-center font-rajdhani text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
        <div className="mx-auto mb-4 h-px max-w-3xl bg-gradient-to-r from-transparent via-neon to-transparent" />
        CyberSentinel XDR frontend demo. Static data only. Built with React, Tailwind CSS, Framer Motion, Recharts, and Lucide.
      </footer>
    </>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <LoadingScreen />
      <BackgroundFX />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
        <AttackMap />
        <ThreatFeed />
        <Analytics />
        <TerminalSection />
        <FeaturesPricing />
        <TestimonialsContact />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
