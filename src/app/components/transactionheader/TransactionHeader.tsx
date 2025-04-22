'use client'

import Image from "next/image"
import './transactionheader.css';
import Link from "next/link";
import LogoutButton from "../logoutbutton/LogoutButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const logoPath = "/logo.png";

export default function TransactionHeader() {
    const { data: session, status } = useSession();
    const router = useRouter();
    return (
        <div className="header-container">
            <Image 
                src={logoPath} 
                alt="image-placeholder" 
                width={40}
                height={40}
                className="w-fill h-fill" />
            <div className="flex flex-row">
                {status === "authenticated" ? (
                    <div className="flex flex-row">
                        <button onClick={() => router.push('/')} className="bg-white rounded-lg p-1 hover:bg-gray-300">Home</button>
                        <LogoutButton />
                    </div>
                ) : (
                    <div>
                        <button onClick={() => router.push('/')} className="bg-gray-300 rounded-lg p-1 m-1 hover:bg-gray-400">Home</button>
                    </div>
                )}
            </div>
        </div>
    )
}