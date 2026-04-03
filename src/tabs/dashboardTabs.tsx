
import BrandTabs from "@/resuable/BrandTabs";
import ClientTabs from "@/resuable/ClientTabs";

export const dashboardTabs = (clients: any[], brands: any[]) => [
     {
        name: "brands",
        title: "brands",
        tabContent : <BrandTabs brands={brands} />
    },
    {
        name: "clients",
        title: "clients",
        tabContent :  <ClientTabs clients={clients} />
    }
   
   
]
