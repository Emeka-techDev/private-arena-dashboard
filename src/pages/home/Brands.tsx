import { getUserBrand } from "@/apis/api";
import { BrandProps } from "@/utils/types";
import { useEffect, useState } from "react";


const Brands = () => {
    const [brands, setBrands] = useState<BrandProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const response = await getUserBrand();
                console.log(response);
                setBrands(response.data.brands);
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
            <h2>Brands</h2>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {brands.map((brand) => (
                        <div key={brand.id} className="shadow-lg p-4 rounded-2xl cursor-pointer"

                            onClick={() => {
                                window.location.href = `/home/brand/${brand.id}`;
                            }}
                        >

                            <div className="max-w-[300px] rounded-2xl">
                                <img src={brand.image_url} className="w-full rounded-md" alt={brand.name} />

                            </div>
                            <p className="font-bold">{brand.name}</p>
                            <p className="text-sm mt-2">{brand.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
    )
}

export default Brands