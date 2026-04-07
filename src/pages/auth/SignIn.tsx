import AuthLayout from '@/layout/auth/AuthLayout';
import mainLogo from '../../assets/logos/arenalogo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import {
//   AppleIcon,
//   FacebookIcon,
//   GoogleIcon,
  UserIcon,
} from '@/components/svg/AuthIcons';
import { BasicInput } from '@/components/input/BasicInput';
import { PasswordInput } from '@/components/input/PasswordInput';
import { Button } from '@/components/button/Button';
import blueLogo from '../../assets/logos/arenalogo_blue.png';
import { loginUser } from '@/apis/api';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

const SignIn = () => {
	const navigate = useNavigate();
	const { email, setEmail, password, setPassword, setToken } = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLogin = async () => {
	 setIsLoading(true);
		try {
			const response = await loginUser({ email, password });
			// console.log(response.success);
			if (response.success) {
				setToken(response.data.token);
				navigate('/home');
			}
			setIsLoading(false);
		} catch (e : any) {
			// console.error('Login failed:', e);
			setIsLoading(false);
			toast.error(e.response?.data?.message || 'Login failed. Please try again.');
		}
	};
	
	return (
		<AuthLayout
		className='!pr-8'
		sideContent={
			<div className='grid gap-5'>
			<img src={mainLogo} alt='logo' className='object-cover' />
			<UserIcon />
			<h1 className='font-semibold text-xl leading-[100%] text-primary-white'>
				Welcome back to Arena XP 👋
			</h1>
			<p className='font-normal text-sm text-primary-white !leading-6'>
				Sign in to access your dashboard, manage campaigns, or track your
				earnings.
			</p>
			</div>
		}
		>
		<div className='px-7 640:px-[3.75rem]'>
			<div className='flex items-center justify-center 640:justify-end gap-2'>
			<p>New user?</p>
			<NavLink to={'/signup'} className='text-primary-main cursor-pointer'>
				Create an account
			</NavLink>
			</div>
			<div className='auth_layout'>
			<img
				src={blueLogo}
				alt=''
				className=' 1180:hidden max-w-[220px] grid place-self-center mt-5 mb-8'
			/>
			<h2 className='text-center 1180:mt-[101px]  text-primary-black text-[25px] 768:text-[30px]'>
				Sign In
			</h2>

			<div className='flex w-full flex-col justify-center items-center py-6'>
				<div className='w-full '>
				<BasicInput
					placeHolder='Email'
					className='mb-6'
					inputClassName='full_rounded_input'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PasswordInput
					placeHolder='Password'
					inputClassName='full_rounded_input'
					className='mb-5'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					onClick={handleLogin}
					buttonClass='default_button hover:bg-primary-blue70'
				>
					<span>{ !isLoading ? 'Sign in' : 'Loading...'}</span>
					
				</Button>
				</div>
				{/* <div className='flex items-center justify-center gap-4 mt-[30px] mb-6 w-full'>
				<span className='border border-secondary-transparentBlack30 w-full max-w-[140px]'></span>
				<span className='font-medium text-sm text-nowrap text-secondary-transparentBlack30'>
					Or sign in with
				</span>
				<span className='border border-secondary-transparentBlack30 w-full max-w-[140px]'></span>
				</div>

				<div className='max-w-[160px] w-full flex justify-center items-center gap-5'>
				<GoogleIcon />
				<FacebookIcon />
				<AppleIcon />
				</div> */}

				<NavLink
				to={'/forgot-password'}
				className='text-base font-medium text-secondary-transparentBlack50 mt-[30px] cursor-pointer'
				>
				Forgot Password?
				</NavLink>
			</div>
			</div>
		</div>
		</AuthLayout>
	);
};

export default SignIn;
