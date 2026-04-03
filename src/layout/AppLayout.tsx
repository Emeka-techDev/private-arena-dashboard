import { Header } from '@/components/header/Header';
import Sidebar from '@/resuable/Sidebar';
import clsx from 'clsx';
import { useState } from 'react';
import { Outlet } from 'react-router';

export const AppLayout = ({
  className,
}: {
  className?: string;
}) => {
	
  	const [mobileOpen, setMobileOpen] = useState(false);

	const year = new Date().getFullYear();
	return (
		<div className='flex'>
			
			<Sidebar 
			 	mobileOpen={mobileOpen}
        		onMobileClose={() => setMobileOpen(false)}
			/>

			
			<div className='w-full md:ml-[150px]'>
				<Header 
					onMobileMenuOpen={() => setMobileOpen(true)}
				/>
				<main className={clsx('px-[60px] py-[21px] bg-primary-white min-h-screen', className)}>
					<Outlet />
				</main>
				<footer className='px-[60px] py-[18px] bg-primary-black flex justify-between items-center text-sm text-primary-white'>
					<p> &copy;{` ${year} Arena XP`}</p>
					<p>Privacy | Terms</p>
				</footer>
			</div>
		
		
		</div>
	);
};
