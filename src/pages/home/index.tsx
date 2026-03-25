import { useState, useEffect, ReactElement } from "react";
import ParticipantList from "./ParticipantList";
import { useTheme } from "@/context/ThemeContext";

interface Stat {
  label: string;
  value: string;
  sub: string;
  color: string;
  unit?: string;
}

interface FunnelItem {
  label: string;
  value: number;
  pct: number;
  color: string;
}

interface ReengagementItem {
  label: string;
  value: string;
  valueColor: string;
}


const SvgIcon = ({
	name,
	className = "w-4 h-4",
}: {
	name: string;
	className?: string;
}) => {
	const base = `${className} flex-shrink-0`;
	const p = {
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.8,
		strokeLinecap: "round" as const,
		strokeLinejoin: "round" as const,
	};

	const icons: Record<string, ReactElement> = {	
		settings: (
			<svg className={base} viewBox="0 0 24 24" {...p}>
				<circle cx="12" cy="12" r="3"/>
				<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
			</svg>
		),

		// ── Utility ───────────────────────────────────────────────────────────
		logout: (
			<svg className={base} viewBox="0 0 24 24" {...p}>
				<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
				<polyline points="16,17 21,12 16,7"/>
				<line x1="21" y1="12" x2="9" y2="12"/>
			</svg>
		),
		sun: (
			<svg className={base} viewBox="0 0 24 24" {...p}>
				<circle cx="12" cy="12" r="5"/>
				<line x1="12" y1="1" x2="12" y2="3"/>
				<line x1="12" y1="21" x2="12" y2="23"/>
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
				<line x1="1" y1="12" x2="3" y2="12"/>
				<line x1="21" y1="12" x2="23" y2="12"/>
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
			</svg>
		),
		moon: (
			<svg className={base} viewBox="0 0 24 24" {...p}>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
			</svg>
		)
	};

	return icons[name] ?? icons.dashboard;
};

const stats: Stat[] = [
  { label: "TOTAL PARTICIPANTS", value: "2,841", sub: "All time", color: "text-violet-500" },
  { label: "COMPLETED", value: "1,704", sub: "60% of participants", color: "text-emerald-500" },
  { label: "IN PROGRESS", value: "739", sub: "26% of participants", color: "text-amber-500" },
  { label: "ABANDONED", value: "398", sub: "14% of participants", color: "text-slate-700" },
  { label: "AVG. COMPLETION TIME", value: "6.4", unit: "min", sub: "Across completions", color: "text-slate-800" },
];

const funnelData: FunnelItem[] = [
  { label: "Campaign viewed", value: 2841, pct: 100, color: "bg-violet-500" },
  { label: "Started", value: 2443, pct: 86, color: "bg-violet-400" },
  { label: "50% through", value: 2046, pct: 72, color: "bg-violet-300" },
  { label: "Completed", value: 1704, pct: 60, color: "bg-emerald-500" },
];

const reengagementData: ReengagementItem[] = [
  { label: "Abandoned then returned", value: "187", valueColor: "text-violet-500" },
  { label: "Completed after returning", value: "134 (72%)", valueColor: "text-emerald-600" },
  { label: "Still in progress after return", value: "53", valueColor: "text-amber-500" },
  { label: "Avg. days before returning", value: "4.2 days", valueColor: "text-slate-700" },
  { label: "Re-engagement rate (of all abandoned)", value: "47%", valueColor: "text-slate-800" },
];

interface AnimatedNumberProps {
  target: string | number;
  duration?: number;
}

function AnimatedNumber({ target, duration = 1000 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    const raw = parseFloat(target.toString().replace(/,/g, ""));
    if (isNaN(raw)) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * raw);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  const raw = parseFloat(target.toString().replace(/,/g, ""));
  if (isNaN(raw)) return <span>{target}</span>;
  const isDecimal = target.toString().includes(".");
  const formatted = isDecimal
    ? display.toFixed(1)
    : Math.round(display).toLocaleString();
  return <span>{formatted}</span>;
}

interface FunnelBarProps {
  item: FunnelItem;
  index: number;
}

function FunnelBar({ item, index }: FunnelBarProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100 + index * 120);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div className="flex items-center gap-4 group">
      <span className="w-32 text-sm text-slate-600 shrink-0">{item.label}</span>
      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${item.color}`}
          style={{ width: loaded ? `${item.pct}%` : "0%" }}
        />
      </div>
      <span className="w-14 text-sm font-semibold text-slate-800 text-right">
        {item.value.toLocaleString()}
      </span>
      <span className="w-10 text-sm text-slate-400 text-right">{item.pct}%</span>
    </div>
  );
}

export function Home() {
	const [visible, setVisible] = useState<boolean>(false);
	const { isDark, toggleTheme }   = useTheme();
	const textSec     = isDark ? "text-[#8B91A8]"  : "text-[#1E2235]";
	const bgPrimary       = isDark ? "bg-[#0A0C0F]"  : "bg-white";
	const bgSecondary     = isDark ? "bg-[#161A24]" : "bg-[#f4f4f0]";
	// const hoverItem   = isDark ? "hover:bg-[#00C9A7]/[0.07] hover:text-[#F0F2F7]"     : "hover:bg-[#00C9A7]/[0.08] hover:text-[#1E2235]";

	useEffect(() => {
		const t = setTimeout(() => setVisible(true), 50);
		return () => clearTimeout(t);
	}, []);

		return (
			<div className={`${bgPrimary} min-h-screen  font-sans p-6 md:p-10}`}>

			{/* Header */}
			<div
				className={`mb-8 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
			>
				<p className="text-xs font-medium tracking-widest text-slate-400 uppercase mb-1">
				Arena XP Admin
				</p>
				
				<div className={` ${textSec} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}>
					
					<h1 className="text-3xl font-bold  tracking-tight">
						The Oddittor Campaign
					</h1>
					<div className="">
						<div className="flex justify-end w-full">
							{/* Theme toggle */}
							<button
								onClick={toggleTheme}
								title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
								className={[
									"flex cursor-pointer items-center gap-2.5 px-2.5 py-[9px]",
									"rounded-[9px]  text-[13px] transition-all duration-150",
									textSec,
									
								].join(" ")}
							>
								<SvgIcon
									name={isDark ? "moon" : "sun"}
									className="w-[20px] h-[20px] flex-shrink-0"
								/>

								
							</button>
						</div>
						<div className="flex items-center gap-3">
							<span className="px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-violet-100 text-violet-700 border border-violet-200">
							Active
							</span>
							<span className="text-sm text-slate-500">Jan 10 – Apr 10, 2025</span>
							<button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg bg-[#EEEDFE] hover:bg-slate-50 transition-colors text-slate-700 shadow-sm">
							Export all data ↓
							</button>
						</div>
					</div>
					
				</div>
			</div>

			{/* Stat Cards */}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
				{stats.map((s, i) => (
				<div
					key={s.label}
					className={` ${bgSecondary} ${isDark ? " border-[#161A24]/10" : " border-slate-100" } rounded-2xl p-5 shadow-sm   transition-all duration-500`}
					style={{
					transitionDelay: `${i * 80}ms`,
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(12px)",
					}}
				>
					<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
					{s.label}
					</p>
					<p className={`text-3xl font-bold leading-none ${s.color}`}>
					<AnimatedNumber target={s.value} />
					{s.unit && <span className="text-lg font-medium ml-1">{s.unit}</span>}
					</p>
					<p className="text-xs text-slate-400 mt-2">{s.sub}</p>
				</div>
				))}
			</div>

			{/* Bottom panels */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* Participation Funnel */}
				<div
				className={` ${bgSecondary} ${isDark ? " border-[#161A24]/10" : " border-slate-100" } rounded-2xl p-6 shadow-sm transition-all duration-500`}
				style={{
					transitionDelay: "450ms",
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(12px)",
				}}
				>
				<h2 className={`${textSec} "text-base font-semibold mb-6"`}>
					Participation funnel
				</h2>
				<div className="flex flex-col gap-5 mt-2">
					{funnelData.map((item, i) => (
					<FunnelBar key={item.label} item={item} index={i} />
					))}
				</div>
				</div>

				{/* Re-engagement Stats */}
				<div
					className= {`${bgSecondary} ${isDark ? " border-[#161A24]/10" : " border-slate-100" }  rounded-2xl p-6 shadow-sm border transition-all duration-500"`}
					style={{
						transitionDelay: "550ms",
						opacity: visible ? 1 : 0,
						transform: visible ? "translateY(0)" : "translateY(12px)",
					}}
				>

				<h2 className={`${textSec} "text-base font-semibold mb-6"`}>
					Re-engagement stats
				</h2>
				
				<div className={`${isDark ? "divide-slate-700" : "divide-slate-100"} flex flex-col divide-y `}>
					{reengagementData.map((item) => (
					<div key={item.label} className="flex items-center justify-between py-4">
						<span className="text-sm text-slate-600">{item.label}</span>
						<span className={`text-sm font-bold mono ${item.valueColor}`}>
						{item.value}
						</span>
					</div>
					))}
				</div>
				</div>
			</div>

			<ParticipantList />
		</div>
	);
}