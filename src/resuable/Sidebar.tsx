import { useTheme } from "@/context/ThemeContext";
import { SvgIcon } from "@/utils/SvgIcons";
import { useState } from "react";
import blueLogo from '../assets/logos/arenalogo_blue.png';


interface SideBarProps {
	mobileOpen?: boolean;
	onMobileClose?: () => void;
}

const Sidebar = ({ mobileOpen = false, onMobileClose}: SideBarProps)  => {

    const [collapsed, setCollapsed] = useState(false);
    const { isDark, toggleTheme }   = useTheme();
    const textSec     = isDark ? "text-[#8B91A8]"  : "text-[#1E2235]";
    // const btnBg    = isDark ? "bg-bgColor3 border-white/[0.08]" : "bg-[#E8EAF0] border-[#C5C9D6]/60";
  
    
    const handleMobileSideBarClose = () => {
        if (onMobileClose) onMobileClose();
        setCollapsed(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = '/login';
    }
    // const toggleBg    = isDark ? "bg-[#1C2130] border-white/[0.1]"                    : "bg-[#E8EAF0] border-[#C5C9D6]/70";
	// const textMut     = isDark ? "text-[#4A5070]"                                      : "text-[#8890A8]";
	
    return (
        <div className={`${mobileOpen ? 'flex' : 'hidden'} md:flex fixed  z-50 max-w-[240px]  min-h-screen bg-primary-main  text-primary-white flex-col  justify-between`}>
            <div className="text-primary-white flex flex-col  justify-between gap-6 px-6 py-8">
                <div className="flex justify-between items-center w-full">
                    <button
                        onClick={handleMobileSideBarClose}
                        title={collapsed ? "Expand" : "Collapse"}
                        className="ml-[-50px]"
                        
                    >
                        <span className={["transition-transform duration-300", collapsed ? "rotate-180" : ""].join(" ")}>
                            <img src={blueLogo} alt='arena logo' className='h-8 cursor-pointer' />
                        </span>
                    </button>

                    <div onClick={handleMobileSideBarClose} className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu-icon lucide-menu">
                            <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
                        </svg>
                    </div>
                </div>
                
                
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => (window.location.href = `/home`)}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>   
                    </span>
                    <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-2  cursor-pointer" onClick={() => (window.location.href = `/home/brands`)}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-album-icon lucide-album"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><polyline points="11 3 11 11 14 8 17 11 17 3"/></svg>  
                    </span>
                    <span>Worlds</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => (window.location.href = `/home/settings`)}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
                    </span>
                    <span>Settings</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLogout()}>
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                    </span>
                    <span>Logout</span>
                </div>
            </div>

            <div className="flex  ml-2 md:justify-start w-full">
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
            
        </div>
    );
}

export default Sidebar