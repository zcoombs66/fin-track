'use client'

import { useRouter } from "next/navigation"

export default function Contact() {
    const router = useRouter();
    return (
        <div>
            //TODO: Implement Contact.tsx
            <button onClick={() => router.push('/')} className="rounded p-1.5 m-2 bg-blue-500 hover:bg-blue-300">Home</button>
        </div>
    )
}