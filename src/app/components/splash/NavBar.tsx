// NavBar
'use client'
import logo from "../../assets/logo.png"
import Image from "next/image"
import {useRouter} from "next/navigation"
import Link from "next/link"

import './NavBar.css';
import { useSession, signOut } from "next-auth/react";
import { doLogout } from "@/app/actions"

const logoPath = "/logo.png";

export default function NavBar() {
    const handleLogout = () => {
        signOut();
    }
    
    const router = useRouter();

    const { data: session, status } = useSession(); 

    return (
        <div className='navbar-container'>
            <Image src={logoPath} alt="img-placeholder" width={40} height={10}/>
            <div className='button-container'>
                <div className='links-container'>
                    <button onClick={() => router.push('/')}>Home</button>
                    <button onClick={() => router.push('/about')}>About</button>
                    <button onClick={() => router.push('/contact')}>Contact</button>
                </div>
                <div className='login-container'>
                    {status === "authenticated" ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <div>
                            <button onClick={() => router.push('/signin')}>Sign In</button>
                            <button onClick={() => router.push('/signup')}>Register</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}