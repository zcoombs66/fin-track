'use client'

import { useRouter } from "next/navigation"

export default function LogoutButton() {
    
    const router = useRouter();

    return (
        <div>
            <button onClick={() => router.push('/')} className="p-1.5 rounded-lg bg-red-500 hover:bg-red-700">Log Out</button>
        </div>
    )
}