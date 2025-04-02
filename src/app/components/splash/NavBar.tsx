// NavBar
import logo from "../../assets/logo.png"
import Image from "next/image"

import './NavBar.css';

export default function NavBar() {
    return (
        <div className='navbar-container'>
            <Image src={logo} alt="img-placeholder" className="h-8 w-auto"/>
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