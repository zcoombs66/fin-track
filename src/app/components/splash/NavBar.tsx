// NavBar
'use client'
import Image from "next/image"
import {useRouter} from "next/navigation"

import './NavBar.css';
import { useSession, signOut } from "next-auth/react";

const logoPath = "/logo.png";

export default function NavBar() {
    const handleLogout = () => {
        signOut();
    }
    
    const router = useRouter();

    const { data: session, status } = useSession(); 

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
      
          
          <div className="flex space-x-2">
            {status === "authenticated" ? (
              <button
                onClick={handleLogout}
                className="px-2 py-1 rounded-md border border-black bg-red-400 text-sm hover:bg-red-300 "
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push('/signin')}
                  className="px-2 py-1 rounded-md border border-black bg-gray-300 text-sm hover:bg-neutral-900 hover:text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-2 py-1 rounded-md border border-black bg-gray-300 text-sm hover:bg-neutral-900 hover:text-white"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
    )
}