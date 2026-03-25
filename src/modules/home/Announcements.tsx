import { RightChevron } from '@/components/svg/ButtonSvg';
import adverImage from '../../assets/homepage/AdverGamesImage.png';
import { Clipboard } from '@/components/svg/HomepageIcons';
import { Card } from '@/components/card/Card';

export const Announcements = () => {
  return (
    <div>
      <div className='flex gap-5 items-center mb-[30px]'>
        <div className='h-10 w-10 grid place-content-center bg-primary-blue20 rounded-full '>
          <Clipboard />
        </div>
        <span className='font-semibold text-primary-black text-xl'>
          Announcements
        </span>
      </div>
      <div className='flex flex-col 880:flex-row items-center gap-6 justify-between'>
        <Card className='!bg-primary-main flex justify-between p-5 items-stretch gap-5 880:gap-10'>
          <div className='flex flex-col gap-4 justify-between'>
            <h3 className='text-base text-primary-white font-semibold mb-[10px]'>
              New AdverGames template now available
            </h3>

            <div className='bg-primary-white w-fit rounded-xl py-[10px] px-[15px] flex justify-center items-center cursor-pointer'>
              <RightChevron stroke='#2741d6' />
            </div>
          </div>
          <div className='overflow-hidden rounded-[10px]'>
            <img
              src={adverImage}
              alt=''
              className='w-full max-w-[351px] h-[150px] object-cover'
            />
          </div>
        </Card>

        <Card className='!bg-primary-main flex justify-between p-5 items-stretch gap-5 880:gap-10'>
          <div className='flex flex-col gap-4 justify-between'>
            <h3 className='text-base text-primary-white font-semibold mb-[10px]'>
              New AdverGames template now available
            </h3>

            <div className='bg-primary-white w-fit rounded-xl py-[10px] px-[15px] flex justify-center items-center cursor-pointer'>
              <RightChevron stroke='#2741d6' />
            </div>
          </div>
          <div className='overflow-hidden rounded-[10px]'>
            <img
              src={adverImage}
              alt=''
              className='w-full max-w-[351px] h-[150px] object-cover'
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
