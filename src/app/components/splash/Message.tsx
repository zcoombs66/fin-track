import Link from 'next/link';
import './Message.css';

export default function Message () {
    return (
        <div className='message-container'>
            <h1>What we do</h1>
            <p>Track your financial history and suggest where to invest your money based on those insights</p>
            <Link href={'/addtransaction'}><button>Add Transaction</button></Link>
            <Link href={'/signin'}><button>Sign in</button></Link>
            <Link href={'/createaccount'}><button>Create Account</button></Link>
            <Link href={'/transactionhistory'}><button>Transaction History</button></Link>
        </div>
    );
}