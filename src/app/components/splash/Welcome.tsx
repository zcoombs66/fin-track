'use client'

import './Welcome.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const addTransactionImgPath = "/addtransaction.png";

export default function Welcome() {
    const router = useRouter();
    return (
        <div className='welcome-container'>
            <h1 className='title-container'>Fin-Track</h1>
            <h2 className='h-2-container'>Track your expenses effortlessly</h2>
            <div className='login-button-container'>
                <button onClick={() => router.push('/signin')} className='login-button'>Sign In</button>
                <button onClick={() => router.push('/signup')} className='login-button'>Register</button>
            </div>
            <div className='image-container'>
                <Image 
                    src={addTransactionImgPath} 
                    alt='image of add transaction page'
                    width={200}
                    height={400}
                    className='w-fill h-fill'
                />
            </div>
        </div>
    );
}