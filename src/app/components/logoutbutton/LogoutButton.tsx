'use client'

import { useRouter } from "next/navigation"

export default function LogoutButton() {
    
    const router = useRouter();

    return (
        <div className="logoutbutton-container">
            <button onClick={() => router.push('/')} className="p-1.5 rounded-lg">Log Out</button>
        </div>
    )
}