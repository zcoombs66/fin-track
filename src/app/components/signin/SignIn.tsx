'use client'

import './Sign.css';
import LoginHeader from '../loginheader/LoginHeader';
import { useRouter } from 'next/navigation';
import Form from '../signIn/Form';

const logoPath = '/logo.png';
export default function SignIn() {
    const router = useRouter();
    return (
        <div className='sign-container'>
            <LoginHeader />
            <div className='form-wrapper'>
                <div className='form-container'>
                    <h1 className='p-2 text-left text-7xl font-bold'>Sign In</h1>
                    <h2 className='text-gray-400 text-left m-4'>Please login to continue to your account</h2>
                   <div className='sign-button-container flex-col '>
                        <Form />
                    </div>
                </div>
            </div>     
            <div>
                <p className='m-4 text-center'>or</p>
                <div className='text-center'>
                    <p>Need an account?</p>
                    <button onClick={() => router.push('/signup')} className='text-blue-600 hover:text-blue-800 hover:border-b-3'>Create one</button>
                </div>
            </div>
        </div>
    )
}