import Image from "next/image"
import './transactionheader.css';
import Link from "next/link";
import LogoutButton from "../logoutbutton/LogoutButton";

const logoPath = "/logo.png";

export default function TransactionHeader() {
    return (
        <div className="header-container">
            <Image 
                src={logoPath} 
                alt="image-placeholder" 
                width={40}
                height={10}
                className="w-fill h-fill" />
            <LogoutButton />
        </div>
    )
}