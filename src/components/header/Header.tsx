import blueLogo from '../../assets/logos/arenalogo_blue.png';
import AvatarImage from '../../assets/homepage/AvatarImg.png';
import { Bell, CheveronDown } from '../svg/HomepageIcons';

export const Header = () => {
  return (
    <nav className='flex justify-between items-center bg-primary-white px-[60px] py-[21px] sticky top-0'>
      <img src={blueLogo} alt='arena logo' className='h-8' />
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
