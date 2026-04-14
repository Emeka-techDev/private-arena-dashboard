import { getCampaignParticipantsData } from "@/apis/api";
import { useTheme } from "@/context/ThemeContext";
import { ParticipantsProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

// ── Types ────────────────────────────────────────────────────────────────────
type Status = "all" | "completed" | "in_progress" | "abandoned";

type FilterTab = "All" | "Completed" | "In progress" | "Abandoned";

const PAGE_SIZE = 8;

// ── Helpers ──────────────────────────────────────────────────────────────────
const TABS: { label: FilterTab; filter_status: Status }[] = [
  { label: "All",         filter_status: "all" },
  { label: "Completed",   filter_status: "completed" },
  { label: "In progress", filter_status: "in_progress" },
  { label: "Abandoned",   filter_status: "abandoned" },
];

const STATUS_STYLES: Record<string, { pill: string; dot: string }> = {
  "completed":   { pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",  dot: "bg-emerald-500"  },
  "in_progress": { pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",        dot: "bg-amber-500"    },
  "abandoned":   { pill: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",           dot: "bg-rose-500"     },
};

function initials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-teal-100 text-teal-700",
  "bg-fuchsia-100 text-fuchsia-700",
  "bg-orange-100 text-orange-700",
  "bg-indigo-100 text-indigo-700",
  "bg-rose-100 text-rose-700",
  "bg-lime-100 text-lime-700",
];


  
// ── Sub-components ────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s?.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s?.dot}`} />
      {status}
    </span>
  );
}

function Avatar({ name, index }: { name: string; index: number }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${color}`}>
      {initials(name)}
    </div>
  );
}

function ParticipantCard({ participant, index }: { participant: ParticipantsProps; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const {isDark} = useTheme();
  const bgSecondary     = isDark ? "bg-[#161A24]" : "bg-[#f4f4f0]";

  return (
    <div
      onClick={() => setExpanded((v) => !v)}
      className={`${bgSecondary} rounded-2xl border  shadow-sm active:scale-[0.985] transition-all duration-150 overflow-hidden cursor-pointer select-none`}
    >
      {/* Top row */}
      <div className="flex items-start gap-3 p-4">
        <Avatar name={participant.name} index={index} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-semibold leading-tight truncate ${isDark ? "text-slate-100" : "text-slate-800"}`}>{participant.name}</p>
            <StatusPill status={participant.status} />
          </div>
          <p className="text-xs text-slate-400 mt-0.5 truncate">{participant.email}</p>
        </div>
      </div>

      {/* Collapsed info row */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          {/* Location icon */}
          <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {participant.location}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          {/* Calendar icon */}
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          {participant.date_joined}
        </div>
        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-slate-300 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className={`border-t px-4 py-3 flex flex-col gap-2.5 ${isDark ? "border-white/10 bg-[#0D0F14]" : "border-slate-50 bg-slate-50/60"}`}>
          <DetailRow icon={
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          } label="Phone" value={participant.phone} />
          <DetailRow icon={
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          } label="Email" value={participant.email} />
        </div>
      )}
    </div>
  );
}


function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const { isDark } = useTheme();
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-slate-400 flex-shrink-0">{icon}</span>
      <span className="text-xs text-slate-400 w-10 flex-shrink-0">{label}</span>
      <span className={`text-xs font-medium truncate ${isDark ? "text-slate-300" : "text-slate-600"}`}>{value}</span>
    </div>
  );
}



interface ParticipantsInputProps {
  id: string
  title?: string
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ParticipantList( { id, title }: ParticipantsInputProps ) {
  const [activeTab, setActiveTab] = useState<Status>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isExportingParticipant, setIsExportingParticipant] = useState(false);

  
	const [participantsData, setParticipantsData] = useState<ParticipantsProps[]>();
	const [tabCounts, setTabCounts] = useState<Record<Status, number>>({
		all: 0,
		completed: 0,
		in_progress: 0,
		abandoned: 0,
	});

  
	const {isDark} = useTheme();

  
  const card    = isDark ? "bg-bgColor3 border-white/[0.06]" : "bg-[#F0F2F7] border-[#C5C9D6]/60";
  const ts      = isDark ? "text-[#8B91A8]"              : "text-[#5A607A]";
  const tm      = isDark ? "text-[#4A5070]"                   : "text-[#8890A8]";
  const divBor  = isDark ? "border-white/[0.06]"              : "border-[#C5C9D6]/50";


  
	const bgPrimary       = isDark ? "bg-[#0A0C0F]"  : "bg-white";
	const bgSecondary     = isDark ? "bg-[#161A24]" : "bg-[#f4f4f0]";

  const filtered = participantsData?.filter((p) => {
    const matchesTab = activeTab === "all" || p.status === activeTab;
    const q = search.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const totalPages = filtered ? Math.ceil(filtered.length / PAGE_SIZE) : 0;
  const paged = filtered ? filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : [];

  const updateFromResponse = (responseData: any) => {
    setParticipantsData(responseData.participants);
    setTabCounts({
      all: (responseData.total_completed ?? 0) + (responseData.total_in_progress ?? 0) + (responseData.total_abandoned ?? 0),
      completed: responseData.total_completed ?? 0,
      in_progress: responseData.total_in_progress ?? 0,
      abandoned: responseData.total_abandoned ?? 0,
    });
  };

  const handleTabChange = async (tab: Status) => {
    setActiveTab(tab);
    try {
      
      const response = tab == "all" ? await getCampaignParticipantsData(id) : await getCampaignParticipantsData(id, tab);
      console.log(response.data)
      updateFromResponse(response.data);
    } catch (e) {
      console.log(e);
    }
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };


   const handlePartcipantsExport = async () => {
      try {
  
  
        toast.info("exporting Participant data");
        setIsExportingParticipant(true);
        const wb = XLSX.utils.book_new();
        const participants = participantsData || [];

        const participantRows = participants.map((p: any) => ({
            Name: p.name,
            Email: p.email,
            Phone: p.phone,
            Status: p.status,
            Location: p.location,
            "Date Joined": p.date_joined,
        }));

        const participantsSheet = XLSX.utils.json_to_sheet(participantRows);
        participantsSheet["!cols"] = [
            { wch: 25 }, { wch: 30 }, { wch: 18 },
            { wch: 14 }, { wch: 20 }, { wch: 16 },
        ];
        XLSX.utils.book_append_sheet(wb, participantsSheet, "Participants");
    
  
        const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([buf], { type: "application/octet-stream" });
        const fileName = `${(title || "dashboard").replace(/\s+/g, "_")}_export.xlsx`;
        saveAs(blob, fileName);
        toast.success("data exported successfully");
          } catch (e) {
        console.error("Export failed:", e);
        toast.error("failed to export data");
          }
      finally {
        setIsExportingParticipant(false);
      }
  };
  
  
  useEffect(() => {
    id && console.log(`Campaign ID for participants list is: ${id}`);
		const fetchParticpantsData = async () => {
			try {
        if (!id) {
          console.log("No campaign ID provided, skipping fetch.");
          return;
        }
				const response = await getCampaignParticipantsData(id);
				updateFromResponse(response.data);
			} catch (e) {
				console.log(e);
			}
			// console.log(`participants data is ${participantsData}`);
		};

		fetchParticpantsData();
		// const fetchParticpantsData = async () => {
		// 	try {
		// 		const response = await getParticipantsData();
		// 		updateFromResponse(response.data);
		// 	} catch (e) {
		// 		console.log(e);
		// 	}
		// 	// console.log(`participants data is ${participantsData}`);
		// };

		// fetchParticpantsData();
	}, [id])

  return (
    <div className={`${bgPrimary} mt-10  flex flex-col`}>

      {/* ── Sticky Header ── */}
      <div className={`${isDark ? 'border-slate-700' : 'border-slate-100 '} ${bgSecondary} sticky top-0 z-20  border-shadow-sm  rounded-lg`}>
        <div className="px-4 pt-5 pb-3">

          {/* Title row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-lg font-bold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>Participant list</h1>
              <p className="text-xs text-slate-400 mt-0.5">Showing {filtered?.length ?? 0} of {tabCounts.all.toLocaleString()}</p>
            </div>
            <button
              onClick={handlePartcipantsExport}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-colors ${isDark ? "text-slate-300 bg-white/10 hover:bg-white/15" : "text-slate-600 bg-slate-100 hover:bg-slate-200"}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {isExportingParticipant ? "Exporting..." : "Export" }
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search name or email…"
              className={`${bgSecondary}
              w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none focus:ring-2
               focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400 ${isDark ? "text-slate-200" : "text-slate-700"} transition`}
            />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-0.5">
            {TABS.map((t) => (
              <button
                key={t.label}
                onClick={() => handleTabChange(t.filter_status)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150
                  ${activeTab === t.filter_status
                    ? ( isDark ? "bg-slate-100 text-slate-500 hover:bg-slate-200" : "bg-slate-900 text-white shadow-sm" )
                    : ( isDark ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200 " )
                  }`}
              >
                {t.label}
                <span className={`text-[10px] ${activeTab === t.filter_status ?  ( isDark ? "text-slate-400" : "text-slate-300") : ( isDark ? "text-slate-300" : "text-slate-400")}`}>
                  {tabCounts[t.filter_status].toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Card List ── */}
      <div className=" md:hidden flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto">
        {paged.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <svg className="w-10 h-10 mb-3 opacity-30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
            <p className="text-sm font-medium">No participants found</p>
            <p className="text-xs mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          paged.map((p, i) => (
            <ParticipantCard key={i} participant={p} index={(page - 1) * PAGE_SIZE + i} />
          ))
        )}
      </div>

     

       {/* Desktop table */}
      <div className={`hidden md:block border rounded-[14px] overflow-hidden ${card}`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                {["Name","Email","Phone","Status","Location","Date Joined"].map((h) => (
                  <th key={h} className={`text-left text-[10px] font-bold uppercase tracking-[.06em] px-3.5 py-3 border-b whitespace-nowrap ${tm} ${divBor}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((p, i) => (
                <tr
                  key={i}
                  className={`cursor-pointer transition-all ${isDark?"hover:bg-customTealLight/[0.04]":"hover:bg-customTealLight/[0.03]"}`}
                >
                  <td className={`px-3.5 py-3 text-[12px] border-b ${divBor} ${ts}`}>{p.name}</td>
                  <td className={`px-3.5 py-3 text-[12px] border-b ${divBor} ${ts}`}>{p.email}</td>

                  <td className={`px-3.5 py-3 text-[12px] border-b ${divBor} ${ts}`}>{p.phone}</td>
                  <td className={`px-3.5 py-3 text-[13px] border-b ${divBor} ${ts} `}> <span className={`${p.status && STATUS_STYLES[p.status].pill}  px-3 py-1 text-xs font-semibold tracking-wide rounded-full  `}>{p.status}</span></td>
                  
                  <td className={`px-3.5 py-3 text-[11px] border-b ${divBor} ${tm}`}>{p.location}</td>
                  <td className={`px-3.5 py-3 text-[11px] border-b ${divBor} ${tm}`}>{p.date_joined}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className={`${bgPrimary}  sticky bottom-0 px-4 py-3 flex items-center justify-between`}>
          <span className="text-xs text-slate-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered?.length ?? 0)} of {filtered?.length ?? 0}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 rounded-xl active:bg-slate-200 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 rounded-xl active:bg-slate-200 transition-colors"
            >
              Next
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}