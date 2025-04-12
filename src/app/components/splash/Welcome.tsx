import './Welcome.css';
import Image from 'next/image';
import Link from 'next/link';


const addTransactionImgPath = "/addtransaction.png";

export default function Welcome() {
    return (
        <div className='welcome-container'>
            <h1>Fin-Track</h1>
            <h2>Track your expenses effortlessly</h2>
            <div className='login-container'>
                
                <Link href={'/signin'}>
                    <button>Sign In</button>
                </Link>
                <button>Register</button>
            </div>
            <div className='image-container'>
                <Image 
                    src={addTransactionImgPath} 
                    alt='image of add transaction page'
                    width={200}
                    height={400}
                    className='w-fill h-fill'
                />
            </div>
        </div>
    );
}