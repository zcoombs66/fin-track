// NavBar

import './NavBar.css';

export default function NavBar() {
    return (
        <div className='navbar-container'>
            <img src="" alt="img-placeholder" />
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