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
        <div className="header-container relative flex items-center justify-between px-4 py-2 bg-gray-100">
       
        <div className="flex-shrink-0">
          <Image 
            src={logoPath} 
            alt="image-placeholder" 
            width={50}
            height={50}
          />
        </div>
      
        
        {status === "authenticated" && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <p className="text-lg font-semibold text-black text-center name">
              Welcome, {status=== "authenticated" ? session.user?.firstName : "Guest"}
            </p>
          </div>
        )}
      
        
        <div className="flex space-x-2">
          <button onClick={() => router.push('/')} className="bg-white rounded-lg p-1 hover:bg-gray-300">Home</button>
          {status === "authenticated" && <LogoutButton />}
        </div>
      </div>
      
    )
}
