
const BrandTabs = ({ brands } : { brands: any[] }) => {
    return (
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
                    <p className="font-bold mt-2">{brand.name}</p>
                    <p className="text-sm mt-2 font-semibold text-secondary-transparentBlack90">{brand.description}</p>
                </div>
            ))}
        </div>
    )
}

export default BrandTabs