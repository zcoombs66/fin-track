'use client'
import './logoutbutton.css';

import { useRouter } from "next/navigation"
import { doLogout } from '@/app/actions';

export default function LogoutButton() {
      const router = useRouter();

    return (
        <div className="logoutbutton-container">
            <button onClick={doLogout} className="p-1.5 rounded-lg">Log Out</button>
        </div>
    )
}