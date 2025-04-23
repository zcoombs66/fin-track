'use client'
import './logoutbutton.css';

import { useRouter } from "next/navigation"
import { doLogout } from '@/app/actions';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await doLogout();
    }
    
    return (
        <div className="logoutbutton-container">
            <button onClick={() => signOut()} className="p-1.5 rounded-lg bg-red-500 hover:bg-red-400">Log Out</button>
        </div>
    )
}