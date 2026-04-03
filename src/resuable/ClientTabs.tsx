

const ClientTabs = ({ clients } : { clients: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clients.map((client) => (
            <div key={client.id} className="shadow-lg p-4 rounded-2xl" 
            
            >

                <div className="max-w-[300px] rounded-2xl">
                    <img src={client.image_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(client.name || "Client") + "&background=random&size=300"} className="w-full rounded-md" alt={client.name} />

                </div>
                <p className="font-bold">{client.name}</p>
                <p className="text-sm mt-2">{client.description}</p>
            </div>
        ))}
    </div>
  )
}

export default ClientTabs