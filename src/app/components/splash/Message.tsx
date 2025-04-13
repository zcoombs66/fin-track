'use client'

import Link from 'next/link';
import './Message.css';
import {useRouter} from 'next/navigation';

export default function Message () {

    const router = useRouter();

    return (
        <div className='message-container'>
            <h1>What we do</h1>
            <p>Track your financial history and suggest where to invest your money based on those insights</p>
            <button type="button" onClick={() => router.push('/addtransaction')}>Add Transaction</button>
            <button type="button" onClick={() => router.push('/signin')}>Sign in</button>
            <button type="button" onClick={() => router.push('/createaccount')}>Create Account</button>
            <button type="button" onClick={() => router.push('/transactionhistory')}>Transaction History</button>
        </div>
    );
}