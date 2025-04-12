// NavBar
'use client'
import logo from "../../assets/logo.png"
import Image from "next/image"
import {useRouter} from "next/navigation"
import Link from "next/link"

import './NavBar.css';

const logoPath = "/logo.png";

export default function NavBar() {
    const router = useRouter();
    return (
        <div className='navbar-container'>
            <Image src={logoPath} alt="img-placeholder" width={40} height={10}/>
            <div className='button-container'>
                <div className='links-container'>
                    <button>Home</button>
                    <button>About</button>
                    <button>Contact</button>
                </div>
                <div className='login-container'>
                    <button onClick={() => router.push('/components/signIn')}>Sign In</button>
                    <button onClick={() => router.push('/components/signUp')}>Register</button>
                </div>
            </div>
        </div>
    )
}