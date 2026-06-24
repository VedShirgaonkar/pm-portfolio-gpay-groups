import { useState } from "react";
import {
  Receipt, Users, ArrowRight, CheckCircle,
  ChevronRight, Clock, TrendingUp, AlertCircle, Zap,
  MapPin, Fuel, Coffee, Home, Navigation, Utensils,
  BarChart2, Layers, Target, Check,
  ArrowLeft, Send, Shield, Star, MoreVertical, CreditCard, Smartphone
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const BLUE = "#1A73E8";
const BLUE_LIGHT = "#E8F0FE";
const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

const transactions = [
  { id: 1, label: "Fuel – HP Petrol Pump",  icon: Fuel,       amount: 3200, date: "Dec 14", category: "Transport" },
  { id: 2, label: "Lunch – Dhaba Express",   icon: Utensils,   amount: 1850, date: "Dec 14", category: "Food"      },
  { id: 3, label: "Resort Advance",          icon: Home,       amount: 5000, date: "Dec 14", category: "Stay"       },
  { id: 4, label: "Toll – NH48",             icon: Navigation, amount: 450,  date: "Dec 14", category: "Transport" },
  { id: 5, label: "Dinner – Spice Garden",   icon: Coffee,     amount: 2400, date: "Dec 14", category: "Food"      },
];

const journeySteps = [
  { icon: MapPin,      label: "Trip Ends",       desc: "Memories made, bills unsettled",       pain: false },
  { icon: Smartphone,  label: "Open Google Pay", desc: "Navigate to Groups → Expense",         pain: false },
  { icon: Receipt,     label: "Open Calculator", desc: "Switch apps, lose context",             pain: true  },
  { icon: Clock,       label: "Search History",  desc: "Scroll through 50+ transactions",      pain: true  },
  { icon: AlertCircle, label: "Add Manually",    desc: "Type amounts, risk errors",             pain: true  },
  { icon: Send,        label: "Send Split",       desc: "Finally done — but was it right?",     pain: true  },
];

const metrics = [
  { icon: TrendingUp, color: "#34A853", label: "Adoption",   value: "Feature Uptake", desc: "% of expense splits created via transaction history vs manual entry" },
  { icon: Clock,      color: BLUE,      label: "Efficiency", value: "Time to Split",  desc: "Average seconds from tapping 'Split Expense' to sending the request" },
  { icon: Shield,     color: "#FBBC04", label: "Error Rate", value: "Edit / Cancel",  desc: "Ratio of requests edited or cancelled after sending — proxy for calculation errors" },
  { icon: Star,       color: "#EA4335", label: "Engagement", value: "Group Activity", desc: "DAU/MAU within GPay Groups feature post-launch" },
];

const roadmap = [
  { phase: "Phase 1", title: "Select From History",   tag: "Now",     color: BLUE,      items: ["Multi-select transactions", "Auto-sum & smart split", "Seamless group request"] },
  { phase: "Phase 2", title: "Shared Expense Prompt", tag: "Q3 2027", color: "#34A853", items: ["Post-payment nudge: 'Was this shared?'", "One-tap split from payment confirm", "Contextual suggestion engine"] },
  { phase: "Phase 3", title: "Trip Mode Ledger",       tag: "2028",    color: "#9C27B0", items: ["Auto-tag & accumulate trip spend", "Live group balance dashboard", "AI-suggested split at trip end"] },
];

function Tag({ children, color = BLUE }) {
  return (
    <span style={{ background: color + "18", color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, display: "inline-block" }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return <p style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>{children}</p>;
}

function Av({ letter, bg, size = 28 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
      {letter}
    </div>
  );
}

function DarkBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 16px 3px", fontSize: 10, fontWeight: 600, color: "#9AA0A6", background: "#1C1B1F", flexShrink: 0 }}>
      <span>9:41</span>
      <span>●●●● WiFi 🔋</span>
    </div>
  );
}

function LightBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 16px 3px", fontSize: 10, fontWeight: 600, color: "#fff", background: BLUE, flexShrink: 0 }}>
      <span>9:41</span>
      <span>●●●● WiFi 🔋</span>
    </div>
  );
}

function MobilePrototype() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState(new Set([3, 4, 5]));

  const toggle = (id) => setSel(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const total = transactions.filter(t => sel.has(t.id)).reduce((s, t) => s + t.amount, 0);

  const members = [
    { name: "Abel Tutor",      av: "S", bg: "#E91E63" },
    { name: "Adam Jamison",         av: "A", bg: "#5C6BC0" },
    { name: "Krancors Davidgham",  av: "K", bg: "#37474F" },
    { name: "kylaq Kishore",   av: "N", bg: "#E91E63" },
    { name: "Fab Dj",       av: "O", bg: "#78909C" },
    { name: "Kieron Edbigton",     av: "O", bg: "#607D8B" },
 
  ];

  const each = members.length ? Math.round(total / members.length) : 0;

  const Phone = ({ children }) => (
    <div style={{ width: 300, height: 620, borderRadius: 36, border: "7px solid #111", background: "#1C1B1F", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,.45)" }}>
      {children}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["Group Screen", "Select Transactions", "Review & Send"].map((t, i) => (
          <button key={i} onClick={() => setStep(i)} style={{ padding: "8px 14px", borderRadius: 999, fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", background: step === i ? BLUE : "#F1F3F4", color: step === i ? "#fff" : "#5F6368", transition: "all .15s" }}>
            {i + 1}. {t}
          </button>
        ))}
      </div>

      {/* SCREEN 1 */}
      {step === 0 && (
        <Phone>
          <DarkBar />
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#1C1B1F", flexShrink: 0 }}>
            <ArrowLeft size={18} color="#E3E3E3" />
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#3C4043", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#E3E3E3" }}>G</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#E3E3E3", fontWeight: 700, fontSize: 14, margin: 0 }}>Goa Trip 🏖️</p>
              <p style={{ color: "#9AA0A6", fontSize: 11, margin: 0 }}>13 members</p>
            </div>
            <MoreVertical size={18} color="#9AA0A6" />
          </div>
          {/* Chat/Expenses tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #2D2D2D", flexShrink: 0 }}>
            {["Chat", "Expenses"].map((tab, i) => (
              <div key={tab} style={{ flex: 1, textAlign: "center", padding: "9px 0", fontSize: 13, fontWeight: 600, color: i === 0 ? "#E3E3E3" : "#9AA0A6", borderBottom: i === 0 ? `2px solid ${BLUE}` : "2px solid transparent" }}>{tab}</div>
            ))}
          </div>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px 4px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ alignSelf: "flex-end", maxWidth: "85%" }}>
              <div style={{ background: "#2D2D2D", borderRadius: "16px 4px 16px 16px", padding: "12px 14px" }}>
                <p style={{ color: "#9AA0A6", fontSize: 11, margin: "0 0 4px" }}>Split request</p>
                <p style={{ color: "#E3E3E3", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>₹150</p>
                <Av letter="V" bg="#E91E63" size={20} />
                <div style={{ height: 3, background: "#3C4043", borderRadius: 2, margin: "8px 0 4px", position: "relative" }}>
                  <div style={{ height: "100%", width: "50%", background: BLUE, borderRadius: 2 }} />
                </div>
                <p style={{ color: "#9AA0A6", fontSize: 10, margin: 0 }}>₹150 left · 1 of 2 paid · 16 Jun</p>
              </div>
            </div>
            <p style={{ textAlign: "center", color: "#5F6368", fontSize: 10, margin: "2px 0" }}>Yesterday, 12:20 am</p>
            <div style={{ alignSelf: "flex-start", maxWidth: "90%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Av letter="P" bg="#E91E63" size={18} />
                <p style={{ color: "#9AA0A6", fontSize: 11, margin: 0 }}>Peter Kevinson</p>
              </div>
              <div style={{ background: "#2D2D2D", borderRadius: "4px 16px 16px 16px", padding: "12px 14px" }}>
                <p style={{ color: "#9AA0A6", fontSize: 11, margin: "0 0 2px" }}>Requested for 'tiffin plus jiixe'</p>
                <p style={{ color: "#E3E3E3", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>₹140</p>
                <Av letter="P" bg="#E91E63" size={20} />
                <div style={{ height: 3, background: "#3C4043", borderRadius: 2, margin: "8px 0 4px" }}>
                  <div style={{ height: "100%", width: "50%", background: BLUE, borderRadius: 2 }} />
                </div>
                <p style={{ color: "#9AA0A6", fontSize: 10, margin: "0 0 8px" }}>1/2 paid · Unpaid · 17 Jun</p>
                <button style={{ width: "100%", padding: "8px 0", borderRadius: 8, background: BLUE, border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Pay</button>
              </div>
            </div>
            <p style={{ textAlign: "center", color: "#5F6368", fontSize: 10, margin: "2px 0" }}>Yesterday, 11:00 am</p>
            <div style={{ alignSelf: "flex-end", maxWidth: "85%" }}>
              <div style={{ background: "#2D2D2D", borderRadius: "16px 4px 16px 16px", padding: "12px 14px" }}>
                <p style={{ color: "#9AA0A6", fontSize: 11, margin: "0 0 4px" }}>Split request</p>
                <p style={{ color: "#E3E3E3", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>₹70</p>
                <Av letter="S" bg="#E91E63" size={20} />
                <div style={{ height: 3, background: "#3C4043", borderRadius: 2, margin: "8px 0 4px" }}>
                  <div style={{ height: "100%", width: "50%", background: BLUE, borderRadius: 2 }} />
                </div>
                <p style={{ color: "#9AA0A6", fontSize: 10, margin: 0 }}>₹35 left · 1 of 2 paid · 17 Jun</p>
              </div>
            </div>
          </div>
          {/* Bottom bar */}
          <div style={{ background: "#1C1B1F", flexShrink: 0, borderTop: "1px solid #2D2D2D" }}>
            {/* Message row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px 6px" }}>
              <button onClick={() => setStep(1)} style={{ padding: "9px 14px", borderRadius: 999, background: BLUE, border: "none", color: "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                Split expense
              </button>
              <div style={{ flex: 1, background: "#2D2D2D", borderRadius: 999, padding: "9px 14px" }}>
                <span style={{ color: "#5F6368", fontSize: 12 }}>Message...</span>
              </div>
              <Send size={16} color="#9AA0A6" />
            </div>
            {/* Add expense manually */}
            <div style={{ padding: "0 10px 10px" }}>
              <button style={{ width: "100%", padding: "9px 0", borderRadius: 999, background: "transparent", border: "1px solid #3C4043", color: "#9AA0A6", fontWeight: 500, fontSize: 12, cursor: "pointer" }}>
                Add expense manually
              </button>
            </div>
          </div>
        </Phone>
      )}

      {/* SCREEN 2 */}
      {step === 1 && (
        <Phone>
          <DarkBar />
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#1C1B1F", flexShrink: 0 }}>
            <button onClick={() => setStep(0)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><ArrowLeft size={18} color="#E3E3E3" /></button>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#E3E3E3", fontWeight: 700, fontSize: 14, margin: 0 }}>Select Transactions</p>
              <p style={{ color: "#9AA0A6", fontSize: 11, margin: 0 }}>Dec 14 · Goa Trip</p>
            </div>
            <span style={{ background: BLUE + "30", color: BLUE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>{sel.size} selected</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 10px" }}>
            {transactions.map(t => {
              const Icon = t.icon;
              const on = sel.has(t.id);
              return (
                <button key={t.id} onClick={() => toggle(t.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 10px", borderRadius: 14, marginBottom: 6, background: on ? "#1A3A5C" : "#2D2D2D", border: "none", cursor: "pointer", textAlign: "left", transition: "background .15s" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: on ? BLUE + "33" : "#3C4043", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color={on ? BLUE : "#9AA0A6"} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#E3E3E3", fontSize: 13, fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.label}</p>
                    <p style={{ color: "#9AA0A6", fontSize: 11, margin: 0 }}>{t.date} · {t.category}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                    <span style={{ color: "#E3E3E3", fontSize: 13, fontWeight: 700 }}>{fmt(t.amount)}</span>
                    <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${on ? BLUE : "#5F6368"}`, background: on ? BLUE : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {on && <Check size={11} color="#fff" strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {sel.size > 0 && (
            <div style={{ padding: "8px 12px 14px", background: "#1C1B1F", flexShrink: 0, borderTop: "1px solid #2D2D2D" }}>
              <button onClick={() => setStep(2)} style={{ width: "100%", padding: "12px 0", borderRadius: 28, background: BLUE, border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Review Split →
              </button>
            </div>
          )}
        </Phone>
      )}

      {/* SCREEN 3 — mirrors Image 2 exactly */}
      {step === 2 && (
        <Phone>
          <DarkBar />
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#1C1B1F", flexShrink: 0 }}>
            <button onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><ArrowLeft size={18} color="#E3E3E3" /></button>
            <p style={{ color: "#E3E3E3", fontWeight: 700, fontSize: 17, margin: 0, flex: 1 }}>{fmt(total)}</p>
            <MoreVertical size={18} color="#9AA0A6" />
          </div>
          {/* Split type tabs */}
          <div style={{ display: "flex", padding: "0 14px 0", borderBottom: "1px solid #2D2D2D", flexShrink: 0 }}>
            {[
              { el: <Users size={16} color={BLUE} /> },
              { el: <span style={{ color: "#9AA0A6", fontSize: 13, fontWeight: 600 }}>123</span> },
              { el: <CreditCard size={16} color="#9AA0A6" /> },
              { el: <span style={{ color: "#9AA0A6", fontSize: 13, fontWeight: 600 }}>%</span> },
            ].map((tab, i) => (
              <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center", padding: "8px 0", borderBottom: i === 0 ? `2px solid ${BLUE}` : "2px solid transparent" }}>
                {tab.el}
              </div>
            ))}
          </div>
          <p style={{ color: "#E3E3E3", fontSize: 13, fontWeight: 400, padding: "10px 14px 4px", flexShrink: 0 }}>Split evenly</p>
          <div style={{ flex: 1, overflowY: "auto", padding: "0 14px" }}>
            {members.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < members.length - 1 ? "1px solid #2D2D2D" : "none" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={12} color="#fff" strokeWidth={3} />
                </div>
                <Av letter={m.av} bg={m.bg} size={32} />
                <p style={{ flex: 1, color: "#E3E3E3", fontSize: 13, fontWeight: 500, margin: 0 }}>{m.name}</p>
                <p style={{ color: "#E3E3E3", fontSize: 13, fontWeight: 600, margin: 0 }}>{fmt(each)}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "8px 14px 14px", background: "#1C1B1F", flexShrink: 0 }}>
            <button onClick={() => setStep(0)} style={{ width: "100%", padding: "13px 0", borderRadius: 28, background: "#3C4043", border: "none", color: "#C4C7C5", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Send request
            </button>
          </div>
        </Phone>
      )}

      <p style={{ color: "#9AA0A6", fontSize: 12, marginTop: 16 }}>Tap the step tabs above to explore the prototype</p>
    </div>
  );
}

export default function CaseStudy() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Google Sans', 'Inter', sans-serif" }}>

      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white" >
              <FcGoogle  size={28} color="white"  />
            </div>
            <span className="text-sm font-semibold text-gray-700">GPay Groups · Case Study</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            {["Problem", "Solution", "Metrics", "Roadmap"].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{s}</a>
            ))}
          </div>
          <Tag>PM Portfolio · 2026</Tag>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="flex flex-wrap gap-2 mb-6">
          <Tag>UX Research</Tag><Tag color="#34A853">Product Design</Tag><Tag color="#9C27B0">Google Pay</Tag>
          <Tag color="#673AB7"> <a href="https://slash-capricorn-913.notion.site/389797e14445801babace13a5ced39dc">Product Strategy</a></Tag>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-5" style={{ letterSpacing: "-0.5px" }}>
          Reimagining Group Expense<br />
          <span style={{ color: BLUE }}>Settlements in Google Pay</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mb-10 leading-relaxed">
          Eliminating manual calculations and context-switching for seamless shared expenses — one feature that saves the trip organiser from a mental spreadsheet.
        </p>
        {/* <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: AlertCircle, color: "#EA4335", label: "The Problem",  text: "Users manually aggregate shared expenses after trips — switching between calculator, history, and split screens." },
            { icon: Zap,         color: BLUE,      label: "The Solution", text: "\"Select From History\" lets users pick transactions directly and create a split request in seconds." },
            { icon: Target,      color: "#34A853", label: "The Impact",   text: "Reduces time-to-split from ~4 minutes to under 30 seconds, eliminating calculation errors entirely." },
          ].map(({ icon: Icon, color, label, text }) => (
            <div key={label} className="rounded-2xl border p-5" style={{ borderColor: "#E8EAED" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: color + "18" }}><Icon size={18} color={color} /></div>
              <p className="font-bold text-sm text-gray-900 mb-1">{label}</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div> */}
        <div className="grid md:grid-cols-3 gap-4">
  {[
    {
      icon: AlertCircle,
      color: "#EA4335",
      label: "The Problem",
      text: "Users manually aggregate shared expenses after trips — switching between calculator, history, and split screens.",
      section: "problem",
    },
    {
      icon: Zap,
      color: BLUE,
      label: "The Solution",
      text: "\"Select From History\" lets users pick transactions directly and create a split request in seconds.",
      section: "solution",
    },
    {
      icon: Target,
      color: "#34A853",
      label: "The Impact",
      text: "Reduces time-to-split from ~4 minutes to under 30 seconds, eliminating calculation errors entirely.",
      section: "metrics",
    },
  ].map(({ icon: Icon, color, label, text, section }) => (
    <div
      key={label}
      onClick={() =>
        document.getElementById(section)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      className="rounded-2xl border p-5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
      style={{ borderColor: "#E8EAED" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ background: color + "18" }}
      >
        <Icon size={18} color={color} />
      </div>

      <p className="font-bold text-sm text-gray-900 mb-1">{label}</p>

      <p className="text-[13px] text-gray-500 leading-relaxed">{text}</p>
    </div>
  ))}
</div>
      </section>

      <div className="border-t border-gray-100" />

      <section id="problem" className="max-w-5xl mx-auto px-6 py-16">
        <SectionLabel>The Problem Space</SectionLabel>
        <h2 className="text-3xl font-bold mb-2">The Trip Organiser's Burden</h2>
        <p className="text-gray-500 mb-12 max-w-xl">Meet <strong>Rahul</strong> — 28, travels frequently with friends, always ends up paying for the group.</p>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl border p-6" style={{ borderColor: "#E8EAED" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: BLUE }}>R</div>
              <div>
                <p className="font-bold text-gray-900">Rahul Sharma</p>
                <p className="text-sm text-gray-500">Trip Organiser · Age 28</p>
                <div className="flex gap-1 mt-1 flex-wrap"><Tag>Frequent traveller</Tag><Tag>Group payer</Tag></div>
              </div>
            </div>
            <blockquote className="border-l-4 pl-4 italic text-gray-600 text-sm mb-4" style={{ borderColor: BLUE }}>
              "After every trip I spend 15 minutes pulling up each transaction, typing amounts into the calculator, and then entering the total manually. It's exhausting and I always second-guess the number."
            </blockquote>
            <div className="space-y-2">
              {[
                { label: "Context switches", value: "3–5 per settlement" },
                { label: "Avg. time to split", value: "~4 minutes" },
                { label: "Error rate", value: "High (manual entry)" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm py-1.5 border-b" style={{ borderColor: "#F1F3F4" }}>
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-700 mb-4">Current painful journey</p>
            <div className="space-y-2">
              {journeySteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: s.pain ? "#FDECEA" : BLUE_LIGHT }}>
                        <Icon size={16} color={s.pain ? "#EA4335" : BLUE} />
                      </div>
                      {i < journeySteps.length - 1 && <div className="w-px h-5 mt-1" style={{ background: s.pain ? "#EA433544" : "#DADCE0" }} />}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-[13px] font-semibold text-gray-900">{s.label}</p>
                      <p className="text-[12px] text-gray-400">{s.desc}</p>
                    </div>
                    {s.pain && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#FDECEA", color: "#EA4335" }}>FRICTION</span>}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl p-4" style={{ background: "#FFF8E1" }}>
              <p className="text-[12px] font-semibold text-amber-800">4 out of 6 steps are friction points</p>
              <p className="text-[11px] text-amber-700 mt-0.5">App switching breaks flow and increases error likelihood</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section id="solution" className="py-16" style={{ background: "#F8F9FA" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel>The Solution</SectionLabel>
          <h2 className="text-3xl font-bold mb-2">Select From History</h2>
          <p className="text-gray-500 mb-2 max-w-xl">A single entry point inside GPay Groups that pulls in transaction history, lets the organiser multi-select, and auto-calculates the split — without leaving the app. </p>
          
          <p className="text-gray-500 mb-12 max-w-xl font-bold">Only Interactive steps on the screen shown in solution section <br/>
1. Click on the split expense <br/>
2. Click select on the transactions<br/> 
3. Review split </p>
          <MobilePrototype />
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionLabel>Design Decisions</SectionLabel>
        <h2 className="text-3xl font-bold mb-10">Why These Choices</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: "Split expense as entry point", icon: CheckCircle, color: BLUE,      text: "Placing the trigger in the existing bottom bar keeps the action contextual — the user is already in the group chat where splitting happens." },
            { title: "Checkbox Multi-Select",        icon: BarChart2,   color: "#34A853", text: "Familiar pattern from file managers & shopping carts. Lets users include only relevant transactions, not the full history." },
            { title: "Faithful Review Screen",       icon: Layers,      color: "#9C27B0", text: "Mirrors the existing split-evenly UI exactly. Zero new learning required — the only change is how the amount was arrived at." },
          ].map(({ title, icon: Icon, color, text }) => (
            <div key={title} className="rounded-2xl border p-5" style={{ borderColor: "#E8EAED" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: color + "15" }}><Icon size={17} color={color} /></div>
              <p className="font-bold text-sm text-gray-900 mb-2">{title}</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section id="metrics" className="max-w-5xl mx-auto px-6 py-16">
        <SectionLabel>Success Metrics</SectionLabel>
        <h2 className="text-3xl font-bold mb-3">How We'll Know It's Working</h2>
        <p className="text-gray-500 mb-10 max-w-xl">Four metrics across the HEART framework to track adoption, efficiency, error reduction, and engagement.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map(({ icon: Icon, color, label, value, desc }) => (
            <div key={label} className="rounded-2xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: "#E8EAED" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: color + "18" }}><Icon size={18} color={color} /></div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color }}>{label}</p>
              <p className="font-bold text-gray-900 mb-2">{value}</p>
              <p className="text-[12px] text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section id="roadmap" className="py-16" style={{ background: "#F8F9FA" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel>Future Vision</SectionLabel>
          <h2 className="text-3xl font-bold mb-3">The Roadmap Ahead</h2>
          <p className="text-gray-500 mb-10 max-w-xl">Phase 1 is the wedge. Phases 2 and 3 build toward a fully intelligent group finance layer inside Google Pay.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {roadmap.map(({ phase, title, tag, color, items }) => (
              <div key={phase} className="rounded-2xl border bg-white p-5" style={{ borderColor: "#E8EAED" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{phase}</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: color + "18", color }}>{tag}</span>
                </div>
                <div className="w-10 h-1 rounded mb-3" style={{ background: color }} />
                <p className="font-bold text-gray-900 mb-4">{title}</p>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-gray-500">
                      <ChevronRight size={14} color={color} className="mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white" ><FcGoogle  size={28} color="white" /></div>
            <span>Google Pay Groups · Select From History · PM Case Study by Ved Shirgaonkar</span>
          </div>
          <p>A speculative product design exercise. Not affiliated with Google.</p>
        </div>
      </footer> */}
      <footer className="border-t border-gray-100 py-8">
  <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white">
        <FcGoogle size={18} />
      </div>

      <div>
        <p className="font-medium text-gray-700">
          Google Pay Groups · Product Case Study
        </p>
        <p className="text-gray-400">
          Designed & documented by Ved Shirgaonkar
        </p>
      </div>
    </div>

    <div className="text-center md:text-right">
      <p className="text-gray-500">
        © 2026 Ved Shirgaonkar. All rights reserved.
      </p>
      <p className="text-gray-400">
        Independent product design exercise. Not affiliated with Google.
      </p>
    </div>

  </div>
</footer>
    </div>
  );
}
//https://slash-capricorn-913.notion.site/Google-Pay-Groups-Product-Strategy-389797e14445801babace13a5ced39dc?source=copy_link