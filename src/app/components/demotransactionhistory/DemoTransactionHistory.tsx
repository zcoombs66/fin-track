'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TransactionHeader from '../transactionheader/TransactionHeader';
import Transaction from '../transactionhistory/Transaction';
import '../transactionhistory/transactionhistory.css';

export default function DemoTransactionHistory() {
    const router = useRouter();

    // Define initial transactions
    const initialTransactions = [
        {
            _id: "1",
            amount: -100,
            depositWithdrawl: false,
            date: "2025-04-01",
            location: "Grocery Store",
            tagNotes: "Groceries",
        },
        {
            _id: "2",
            amount: 50,
            depositWithdrawl: true,
            date: "2025-04-02",
            location: "ATM",
            tagNotes: "Cash Withdrawal",
        },
    ];

    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        setTransactions(initialTransactions);
       
    }, []);

    const balance = transactions.reduce((acc, t) => (t.depositWithdrawl ? acc - t.amount : acc + t.amount), 0);

    return (
        <div className="transaction-history-container p-3">
            <TransactionHeader />
            <div className="transaction-info items-end text-xl p-3">
                <h1 className="balance-item">Balance: ${balance}</h1>
                <div>
                    <h1 className="pt-8 pb-2">Transaction History</h1>
                    <button
                        
                        className="bg-blue-700 rounded-lg p-1 hover:bg-blue-500"
                    >
                        Add Transaction
                    </button>
                </div>
            </div>
            <fieldset disabled>
            <div className="transactions-container" >
                {transactions.map((transaction) => (
                    <Transaction key={transaction._id} transaction={transaction} />
                ))}
            </div>
            </fieldset>
        </div>
    );
}