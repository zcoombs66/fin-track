import Link from 'next/link';
import './loginheader.css';
import Image from 'next/image';

const logoPath = "/logo.png";

export default function LoginHeader() {
    return (
        <div className="header-container">
                    <Image 
                        src={logoPath} 
                        alt="image-placeholder" 
                        width={40}
                        height={10}
                        className="w-fill h-fill" />
                    <Link href={'/'}>
                        <button>Home</button>
                    </Link>
                    <Link href={''}>
                        <button>About</button>
                    </Link>
                    <Link href={''}>
                        <button>Contact</button>
                    </Link>
                </div>
    )
}