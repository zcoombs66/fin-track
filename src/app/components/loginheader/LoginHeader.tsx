'use client'

import './loginheader.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const logoPath = "/logo.png";

export default function LoginHeader() {

    const router = useRouter();

    return (
        <div className="navbar-container relative flex items-center justify-between px-4 py-2" style={{ backgroundColor: 'var(--header)', color: 'black', fontSize: 'small' }}>
        
        <div className="flex-shrink-0">
          <Image src={logoPath} alt="img-placeholder" width={50} height={50} />
        </div>
      
        
      
        
        <div className="flex items-center space-x-2">
          
          <div className="flex space-x-2">
            <button onClick={() => router.push('/')} className="px-2 py-1 rounded-md text-center hover:bg-gray-100">Home</button>
            <button onClick={() => router.push('/about')} className="px-2 py-1 rounded-md text-center hover:bg-gray-100">About</button>
            <button onClick={() => router.push('/contact')} className="px-2 py-1 rounded-md text-center hover:bg-gray-100">Contact</button>
          </div>
      
          
        </div>
      </div>
    )
}