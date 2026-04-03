import { Button } from '@/components/button/Button';
import { PasswordInput } from '@/components/input/PasswordInput'
import React from 'react'
import { SmallGrayDot } from '@/components/svg/AuthIcons';
import { passwordValidations } from '@/utils';

const Settings = () => {

    const [oldPassword, setOldPassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleChangePassword = () => {
        if (password !== confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }
    }

    return (
        <div>
            <h2 >Settings</h2>

            <div className='mt-10'>
                <p className=' mb-5 font-semibold text-black/80'>Change Password</p>
                <PasswordInput
                    placeHolder='Old Password'
                    inputClassName='full_rounded_input'
                    className='mb-5'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <PasswordInput
                        placeHolder='New Password'
                        inputClassName='full_rounded_input'
                        className='mb-5'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                
                <PasswordInput
                    placeHolder='Confirm password'
                    inputClassName='full_rounded_input'
                    className='mb-5'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                
                    helper={
                        <div className='max-w-[410px] w-full flex flex-wrap items-center gap-x-12'>
                            {passwordValidations.map((validation, i) => {
                                return (
                                    <div
                                    key={i}
                                    className='flex items-center max-w-[180px] w-full '
                                    >
                                    <SmallGrayDot /> <p>{validation}</p>
                                    </div>
                                );
                                })
                            }
                        </div>
                    }
                />
                <Button
                    onClick={handleChangePassword}
                    buttonClass='default_button hover:bg-primary-blue70'
                >
                    <span>Change Password</span>
                </Button>
                
            </div>

        </div>
    )

}
export default Settings