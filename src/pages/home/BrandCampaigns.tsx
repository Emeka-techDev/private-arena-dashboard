import { useState, useEffect } from "react";
import { getBrandCampaigns} from "@/apis/api";
import { useParams } from "react-router";


export default function BrandCampaigns() {
	const params = useParams();
	const [campaigns, setCampaigns] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		params.id && console.log("Brand ID from URL:", params.id);
		const fetchCardData = async () => {
			try {
				setLoading(true);
				const response = await getBrandCampaigns(params.id || "");
				setCampaigns(response.data);
			} catch (e) {
				console.log(e);
			} finally {
				setLoading(false);
			}
		};

		fetchCardData();
	}, [])

	

	
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Brand Campaigns</h2>
			{loading ? (
				<div className="flex justify-center items-center py-20">
					<svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				</div>
			) : campaigns.length === 0 ? (
				<p>No campaigns found for this brand.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

					{campaigns.map((campaign: any) => (
						<div key={campaign.id} className="border p-4 rounded-md  shadow-lg mb-4 cursor-pointer"  onClick={() => {
                                window.location.href = `/home/campaign/${campaign.id}/title/${encodeURIComponent(campaign.title)}`;
                            }}>
							 <div className="max-w-[300px] rounded-2xl">
                                <img src={campaign.image_url} className="w-full rounded-md" alt={campaign.title} />

                            </div>
							<h2 className="text-xl font-bold mt-2">{campaign.title}</h2>
							<div className="flex flex-col	 gap-2 mt-2">
								<span className="font-bold text-secondary-transparentBlack90">starts at :  <span className="font-bold text-secondary-transparentBlack60 ">{campaign.start_date}</span></span>
								<span className="font-bold text-secondary-transparentBlack90">ends at :  <span className="font-bold text-secondary-transparentBlack60 ">{campaign.end_date}</span></span>
							</div>
						</div>
					))}

				</div>
			)}
		</div>
	);
}