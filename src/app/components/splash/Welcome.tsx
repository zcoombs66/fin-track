import './Welcome.css';

export default function Welcome() {
    return (
        <div className='welcome-container'>
            <h1>Fin-Track</h1>
            <h2>Track your expenses effortlessly</h2>
            <div className='login-container'>
                    <button>Sign In</button>
                    <button>Register</button>
                </div>
        </div>
    );
}