'use client'

import './loginheader.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const logoPath = "/logo.png";

export default function LoginHeader() {

    const router = useRouter();

    return (
        <div className="login-header-container">
            <Image 
                src={logoPath} 
                alt="image-placeholder" 
                width={50}
                height={50}
                onClick={() => router.push('/')}
            />
            
            <div>
                <button onClick={() => router.push('/')}>Home</button>
                <button onClick={() => router.push('/about')}>About</button>
                <button onClick={() => router.push('/contact')}>Contact</button>
            </div>
        </div>
    )
}