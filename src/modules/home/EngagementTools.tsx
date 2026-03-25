import adverImage from '../../assets/homepage/AdverGamesImage.png';
import surveryGamesImage from '../../assets/homepage/SurveyGamesImage.png';
import triviaGamesImage from '../../assets/homepage/TriviaGamesImage.png';
import { RightChevron } from '@/components/svg/ButtonSvg';
import { Wrench } from '@/components/svg/HomepageIcons';
import { FeatureCard } from '@/components/card/FeatureCard';

export const EngagementTools = () => {
  return (
    <div>
      <div className='flex gap-5 items-center mb-[30px]'>
        <div className='h-10 w-10 grid place-content-center bg-primary-blue20 rounded-full '>
          <Wrench />
        </div>
        <span className='font-semibold text-primary-black text-xl'>
          Engagement Tools
        </span>
      </div>
      <div className='flex flex-col 880:flex-row items-center gap-6 justify-between'>
        <FeatureCard
          topImage={
            <div className='overflow-hidden rounded-t-[20px]'>
              <img
                src={adverImage}
                alt=''
                className='w-full h-[200px] object-cover'
              />
            </div>
          }
          title='AdverGames'
          description='Launch interactive branded games your audience will love to play.'
          button={
            <div className='bg-primary-main w-fit rounded-xl py-[10px] px-[15px] flex justify-center items-center cursor-pointer'>
              <RightChevron />
            </div>
          }
        />
        <FeatureCard
          topImage={
            <div className='overflow-hidden rounded-t-[20px]'>
              <img
                src={surveryGamesImage}
                alt=''
                className='w-full h-[200px] object-cover'
              />
            </div>
          }
          title='Survey'
          description='Gather feedback and opinions with easy-to-launch surveys.'
          button={
            <div className='bg-primary-main w-fit rounded-xl py-[10px] px-[15px] flex justify-center items-center cursor-pointer'>
              <RightChevron />
            </div>
          }
        />
        <FeatureCard
          topImage={
            <div className='overflow-hidden rounded-t-[20px]'>
              <img
                src={triviaGamesImage}
                alt=''
                className='w-full h-[200px] object-cover '
              />
            </div>
          }
          title='Trivia'
          description='GBoost interaction with fun, brand-themed trivia questions.'
          button={
            <div className='bg-primary-main w-fit rounded-xl py-[10px] px-[15px] flex justify-center items-center cursor-pointer'>
              <RightChevron />
            </div>
          }
        />
      </div>
    </div>
  );
};
