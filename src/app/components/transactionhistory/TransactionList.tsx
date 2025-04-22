'use client';

import { auth } from '@/auth';
import { useEffect, useState } from 'react';
import Transaction from './Transaction';

type Transaction = {
    _id: string;
    amount: number; 
    depositWithdrawl: boolean; 
    date: string; 
    location: string;
    tagNotes: string;
    imageSrc: string;
};



export default  function TransactionList({userEmail}: {userEmail?: string}) {
    

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await fetch('/api/transactions');
                const rawData = await response.json();

                console.log(rawData);

                const parsedTransactions: Transaction[] = rawData.map((item: any) => ({
                    _id: item._id,
                    amount: item.amount,
                    depositWithdrawl: item.depositWithdrawl,
                    date: item.date,
                    location: item.location,
                    tagNotes: item.tagNotes,
                    imageSrc: item.imageSrc,
                }));

                setTransactions(parsedTransactions);
            } catch (error) {
                console.error("Failed to load transaction:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTransactions();
    }, []);

    if (loading) return <p>Loading...</p>;
    
    return (
        <div className='px-20 py-6 w-auto'>
            {transactions.map((trans) => (
                <Transaction key={trans._id} transaction={trans}/>
            ))}
        </div>
    )
}