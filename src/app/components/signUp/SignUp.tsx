'use client'

import '../signin/Sign.css';

import LoginHeader from '../loginheader/LoginHeader';
import { useRouter } from 'next/navigation';
import Form from './Form';

const logoPath = '/logo.png';
export default function SignIn() {
    const router = useRouter();
    return (
        <div className='sign-container'>
            <LoginHeader />
            <div className='form-wrapper'>
                <div className='form-container'>
                    <h1 className='p-2 text-left text-5xl font-bold'>Create an account</h1>
                    <h2 className='text-gray-400 text-left m-4'>Please login to continue to your account</h2>
                   <div className='sign-button-container flex-col '>
                        <Form />
                    </div>
                </div>
            </div>     
        </div>
    )
}