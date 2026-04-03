import blueLogo from '../../assets/logos/arenalogo_blue.png';

import AvatarImage from '../../assets/homepage/AvatarImg.png';
import { Bell, CheveronDown } from '../svg/HomepageIcons';
import { useTheme } from '@/context/ThemeContext';


interface NavBarProps {
  onMobileMenuOpen: () => void;
}

export const Header = ({ onMobileMenuOpen }: NavBarProps) => {
    // const { isDark }   = useTheme();

    // const textSec     = isDark ? "text-[#8B91A8]"  : "text-[#1E2235]";
	// const btnBg    = isDark ? "bg-bgColor3 border-white/[0.08]" : "bg-[#E8EAF0] border-[#C5C9D6]/60";
  
	return (
		<nav className='flex justify-between items-center z-40 min-w-full  bg-primary-white px-[60px] py-[21px] sticky top-0'>
			<img src={blueLogo} alt='arena logo' className='hidden md:block h-8' />

			<button
				className={`lg:hidden flex items-center justify-center w-20 h-10 rounded-lg `}
				onClick={onMobileMenuOpen}
				>

				<img src={blueLogo} alt='arena logo' className='h-10 cursor-pointer' />
			</button>
			
			<div className='gap-4 flex items-center '>
				<div className='h-10 w-10 grid place-content-center bg-primary-blue20  rounded-full cursor-pointer'>
				<Bell />
				</div>
				<div className='flex items-center gap-[10px]'>
				<img
					src={AvatarImage}
					alt='user avatar'
					className='h-10 w-10  object-cover rounded-full'
				/>

				<CheveronDown className='cursor-pointer' />
				</div>
			</div>
		</nav>
	);
};
