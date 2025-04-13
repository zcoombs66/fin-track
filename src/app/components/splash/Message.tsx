'use client'

import Link from 'next/link';
import './Message.css';
import {useRouter} from 'next/navigation';

export default function Message () {

    const router = useRouter();

    return (
        <div className='message-container'>
            <h1>What we do</h1>
            <p>Track your financial history and get insights on your spending</p>
        </div>
    );
}