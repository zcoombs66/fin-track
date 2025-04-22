'use client';

import { auth } from '@/auth';
import { useEffect, useState } from 'react';
import Transaction from './Transaction';
import { on } from 'events';

type Transaction = {
    _id: string;
    amount: number; 
    depositWithdrawl: boolean; 
    date: string; 
    location: string;
    tagNotes: string;
    imageSrc: string;
};

type transactionListProps = {
    onBalanceChange: (balance: number) => void;
}

export default function TransactionList({ userEmail, onBalanceChange }: { userEmail?: string; onBalanceChange?: (balance: number) => void }) {   

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
                
                const balance = parsedTransactions.reduce((acc, transaction) => {
                    const amount = Number(transaction.amount);
                    return transaction.depositWithdrawl ? acc - amount : acc + amount;
                }, 0)

                if(onBalanceChange) onBalanceChange(balance);
                
                console.log("Balance: ", balance);

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
        <div className='px-1 py-6 w-auto'>
            {transactions.map((trans) => (
                <Transaction key={trans._id} transaction={trans}/>
            ))}
        </div>
    )
}