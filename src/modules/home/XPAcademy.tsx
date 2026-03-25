import { FeatureCard } from '@/components/card/FeatureCard';
import { RightChevron } from '@/components/svg/ButtonSvg';
import { AcademyHat } from '@/components/svg/HomepageIcons';

export const XPAcademy = () => {
  return (
    <div>
      <div className='flex gap-5 items-center mb-[30px]'>
        <div className='h-10 w-10 grid place-content-center bg-primary-blue20 rounded-full '>
          <AcademyHat />
        </div>
        <span className='font-semibold text-primary-black text-xl'>
          XP Academy
        </span>
      </div>
      <div className='grid 880:grid-cols-12 gap-6'>
        <div className='col-span-4'>
          <FeatureCard
            className='h-full'
            title='How to launch a game'
            description='Step-by-step guide to quickly set up and publish your interactive games'
            button={
              <div className='bg-primary-main w-fit rounded-xl py-[10px] px-[15px] flex justify-center items-center cursor-pointer'>
                <RightChevron />
              </div>
            }
          />
        </div>
        <div className='col-span-4'>
          <FeatureCard
            className='h-full'
            title='Boost Engagement with Trivia'
            description='Learn how to captivate your audience with fun activities that drives clicks and conversion with trivia'
            button={
              <div className='bg-primary-main w-fit rounded-xl py-[10px] px-[15px] flex justify-center items-center cursor-pointer'>
                <RightChevron />
              </div>
            }
          />
        </div>
        <div className='col-span-4'>
          <FeatureCard
            className='h-full'
            title='Boost Engagement with Trivia'
            description='Learn how to captivate your audience with fun activities that drives clicks and conversion with trivia'
            button={
              <div className='bg-primary-main w-fit rounded-xl py-[10px] px-[15px] flex justify-center items-center cursor-pointer'>
                <RightChevron />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
