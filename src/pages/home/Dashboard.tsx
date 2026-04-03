import { getUserBrand } from "@/apis/api";
import { dashboardTabs } from "@/tabs/dashboardTabs";
import { BrandProps } from "@/utils/types";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [brands, setBrands] = useState<BrandProps[]>([]);
    const [clients, setClients] = useState<[]>([]);
    const [selectedTab, setSelectedTab] = useState("brands");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const response = await getUserBrand();
                console.log(response);
                setBrands(response.data.brands);
                setClients(response.data.clients);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        fetchBrands();
    }, [])
    return (
        <div>
            <h2>Welcome to the Your Dashboard!</h2>

            <div className="mt-6">
                <div className="flex justify-center min-w-full gap-4 border-b border-gray-200 mb-6">
                    {dashboardTabs(clients, brands).map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setSelectedTab(tab.name)}
                            className={`px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                                selectedTab === tab.name
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : (
                        dashboardTabs(clients, brands).find((tab) => tab.name === selectedTab)?.tabContent
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard