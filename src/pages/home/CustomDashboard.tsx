import { getCampaignCardData, getUserBrand } from "@/apis/api";
import { useTheme } from "@/context/ThemeContext";
import { AnimatedNumberProps, CampaignDropDownProps } from "@/utils/types";
import { useEffect, useState } from "react";
import ParticipantList from "./ParticipantList";




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

interface CardDataInterface {
    abandon_and_returned : number,
    avg_completion_time : number,
    total_abandoned : number,
    total_abandoned_percentage : number,
    total_completed : number,
    total_completed_percentage : number,
    total_in_progress : number,
    total_in_progress_percentage : number,
    total_participants : number
}


const CustomDashboard = () => {
    const [campaigns, setCampaigns] = useState<CampaignDropDownProps[]>([]);
    const [openCampaignDropDown, setOpenCampaignDropDown] = useState(false);
    const [campaign, setCampaign] = useState<any | null>(null);
    const [campaignId, setCampaignId] = useState("");

	const [visible, setVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState(true);
	const [cardData, setCardData] = useState<CardDataInterface> ({
		abandon_and_returned : 0,
		avg_completion_time : 0,
		total_abandoned : 0,
		total_abandoned_percentage : 0,
		total_completed : 0,
		total_completed_percentage : 0,
		total_in_progress : 0,
		total_in_progress_percentage : 0,
		total_participants : 0
	})


	const { isDark }   = useTheme();
	const textSec     = isDark ? "text-[#8B91A8]"  : "text-[#1E2235]";
	const bgPrimary       = isDark ? "bg-[#0A0C0F]"  : "bg-white";
	const bgSecondary     = isDark ? "bg-[#161A24]" : "bg-[#f4f4f0]";
    


    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(t);
    }, []);

   
let manuallySetCampaignId = '';
    useEffect(() => {

        const fetchBrands = async () => {
            try {
                setLoading(true);
                const response = await getUserBrand();
                console.log(response);
               
                setCampaigns(response.data.campaigns);
                setCampaignId(response.data.campaigns[0]?.id || "");
                setCampaign(response.data.campaigns[0] || {});
				manuallySetCampaignId = response.data.campaigns[0]?.id || "";
               
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }


        const fetchCardData = async () => {
            try {
                setLoading(true);
                if (campaignId === "") return;
                const card = await getCampaignCardData(campaignId);
                setCardData(card.data);
                setLoading(false);
                
            } catch (e) {
				console.log(e);
                setLoading(false);
            }
        };

        fetchBrands();
        fetchCardData();

    }, [campaignId]);

    const handleCampaignChange = async (id: string) => {
        try {
            setLoading(true);

            setCampaignId(id);
            
            const card = await getCampaignCardData(campaignId);

            setCardData(card.data);

                
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${bgPrimary} min-h-screen  font-sans md:p-10}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard!</h2>

            <div className="relative inline-block w-72">
                <button
                    className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    onClick={() => setOpenCampaignDropDown((prev) => !prev)}
                >
                    <span>Campaigns</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`ml-2 transition-transform duration-200 ${openCampaignDropDown ? 'rotate-180' : ''}`}
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>

                {openCampaignDropDown && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                        {campaigns.length > 0 ? (
                            campaigns.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className="px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleCampaignChange(campaign.id)}
                                >
                                    {campaign.title}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-400">No campaigns available</div>
                        )}
                    </div>
                )}
            </div>

            <div
				className={`mb-8 mt-9 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
			>
				<p className="text-xs font-medium tracking-widest text-slate-400 uppercase mb-1">
				Arena XP Admin
				</p>
				
				<div className={` ${textSec} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}>
					
					<h1 className="text-3xl font-bold  tracking-tight">
						{campaign?.title} 
					</h1>
					<div className="">
						
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
			{loading ? (
				<div className="flex justify-center items-center py-20">
					<svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				</div>
			) : (
			<>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">



				<div
					className={` ${bgSecondary} ${isDark ? " border-[#161A24]/10" : " border-slate-100" } rounded-2xl p-5 shadow-sm   transition-all duration-500`}
					style={{
					transitionDelay: `${80}ms`,
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(12px)",
					}}
				>
					<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
					 TOTAL PARTICIPANTS
					</p>
					{/* <p className={`text-3xl font-bold leading-none text-violet-500`}> */}
					
					<p className={`text-3xl font-bold leading-none text-primary-blue50`}>
						<AnimatedNumber target={cardData.total_participants} />
					{/* {s.unit && <span className="text-lg font-medium ml-1">{s.unit}</span>} */}
					</p>
					<p className="text-xs text-slate-400 mt-2">All time</p>
				</div>
				<div
					className={` ${bgSecondary} ${isDark ? " border-[#161A24]/10" : " border-slate-100" } rounded-2xl p-5 shadow-sm   transition-all duration-500`}
					style={{
					transitionDelay: `${80}ms`,
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(12px)",
					}}
				>
					<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
					 COMPLETED
					</p>
					<p className={`text-3xl font-bold leading-none text-emerald-500`}>
					<AnimatedNumber target={cardData.total_completed} />
					{/* {s.unit && <span className="text-lg font-medium ml-1">{s.unit}</span>} */}
					</p>
					<p className="text-xs text-slate-400 mt-2">{cardData.total_completed_percentage} %</p>
				</div>
				<div
					className={` ${bgSecondary} ${isDark ? " border-[#161A24]/10" : " border-slate-100" } rounded-2xl p-5 shadow-sm   transition-all duration-500`}
					style={{
					transitionDelay: `${80}ms`,
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(12px)",
					}}
				>
					<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
						IN PROGRESS
					</p>
					<p className={`text-3xl font-bold leading-none text-amber-500`}>
					<AnimatedNumber target={cardData.total_in_progress} />
					{/* {s.unit && <span className="text-lg font-medium ml-1">{s.unit}</span>} */}
					</p>
					<p className="text-xs text-slate-400 mt-2">{cardData.total_in_progress_percentage} %</p>
				</div>
				<div
					className={` ${bgSecondary} ${isDark ? " border-[#161A24]/10" : " border-slate-100" } rounded-2xl p-5 shadow-sm   transition-all duration-500`}
					style={{
					transitionDelay: `${80}ms`,
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(12px)",
					}}
				>
					<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
						ABANDONED
					</p>
					<p className={`text-3xl font-bold leading-none text-slate-700`}>
					<AnimatedNumber target={cardData.total_abandoned} />
					{/* {s.unit && <span className="text-lg font-medium ml-1">{s.unit}</span>} */}
					</p>
					<p className="text-xs text-slate-400 mt-2">{cardData.total_abandoned_percentage} %</p>
				</div>
				<div
					className={` ${bgSecondary} ${isDark ? " border-[#161A24]/10" : " border-slate-100" } rounded-2xl p-5 shadow-sm   transition-all duration-500`}
					style={{
					transitionDelay: `${80}ms`,
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(12px)",
					}}
				>
					<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
						AVG. COMPLETION TIME
					</p>
					<p className={`text-3xl font-bold leading-none text-slate-500`}>
						<AnimatedNumber target={cardData.avg_completion_time} />
						<span className="text-lg font-medium ml-1">mins</span>
					</p>
					<p className="text-xs text-slate-400 mt-2">Across completions</p>
				</div>

			</div>

			{/* Bottom panels */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


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

				<div className={`${isDark ? "divide-slate-700" : "divide-slate-100"}  w-full`}>

					<div  className="flex items-center justify-between py-4 min-w-full">
						<span className="text-sm text-slate-600">Abandoned then returned</span>
						<span className="text-sm font-bold mono  text-violet-500">
						{cardData.abandon_and_returned}
						</span>
					</div>
				</div>
				</div>
			</div>
			</>
			)}

			<ParticipantList
				id={campaignId || manuallySetCampaignId}
			/>
        </div>
    )
}

export default CustomDashboard