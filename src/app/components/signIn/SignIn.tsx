import './Sign.css';
import logo from "../../assets/logo.png"
import Image from "next/image"


export default function SignIn() {
    return (
        <div className='sign-container'>
            <div className="header-container">
                <Image src={logo} alt="image-placeholder" className='h-8 w-auto' />
                
            </div>
            <div className='form-container'>
                <h1>Sign Up</h1>
                <form>
                    
                   <div className='sign-button-container'>
                        <button type='submit'>Submit</button>
                        <button type='reset'>Cancel</button>
                    </div> 
                </form>
                
            </div>
        </div>
    )
}