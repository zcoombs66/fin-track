// NavBar
// import logo from "../../assets/logo.png"
 
import Image from "next/image"

import './NavBar.css';

const logoPath = "/logo.png";

export default function NavBar() {
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
                    <button>Sign In</button>
                    <button>Register</button>
                </div>
            </div>
        </div>
    )
}