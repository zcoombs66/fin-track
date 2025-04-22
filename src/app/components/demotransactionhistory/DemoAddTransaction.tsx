'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../addtransaction/addtransaction.css';
import TransactionHeader from '../transactionheader/TransactionHeader';

export default function DemoAddTransaction() {
    const router = useRouter();

    const [form, setForm] = useState<{
        amount: number | string;
        depositWithdrawl: boolean;
        date: string;
        location: string;
        tagNotes: string;
    }>({
        amount: "",
        depositWithdrawl: true,
        date: "",
        location: "",
        tagNotes: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = e.target;
        setForm({
            ...form,
            [name]: type === 'radio' && name === 'depositWithdrawl' ? value === 'true' : value,
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const preparedForm = {
            ...form,
            amount: form.depositWithdrawl ? Math.abs(Number(form.amount)) : -Math.abs(Number(form.amount)),
            _id: Date.now().toString(),
        };

        // Save the transaction to localStorage
        const storedTransactions = localStorage.getItem('demoTransactions');
        const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
        transactions.push(preparedForm);
        localStorage.setItem('demoTransactions', JSON.stringify(transactions));

        // Redirect back to DemoTransactionHistory
        router.push('/demo/demotransactionhistory');
    }

    return (
        <div className="add-transaction-container">
            <TransactionHeader />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount">Amount ($)</label>
                    <input
                        name="amount"
                        value={form.amount}
                        type="number"
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                    />
                    <div className="radio-container">
                        <label>
                            <input
                                type="radio"
                                name="depositWithdrawl"
                                value="true"
                                checked={form.depositWithdrawl === true}
                                onChange={handleChange}
                                className="radio-input"
                            />
                            Deposit
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="depositWithdrawl"
                                value="false"
                                checked={form.depositWithdrawl === false}
                                onChange={handleChange}
                                className="radio-input"
                            />
                            Withdrawal
                        </label>
                    </div>
                    <label htmlFor="date">Date</label>
                    <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="location">Location</label>
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Store"
                        required
                    />
                    <label htmlFor="tagNotes">Tag / Notes</label>
                    <input
                        name="tagNotes"
                        value={form.tagNotes}
                        onChange={handleChange}
                        placeholder="tag / notes"
                        required
                    />
                    <button type="submit" className="submit-button bg-white rounded-lg p-1 m-1 hover:bg-gray-400">Submit</button>
                    <button onClick={() => router.push('/demo/demotransactionhistory')} className="bg-white rounded-lg p-1 m-1 hover:bg-gray-400">Cancel</button>
                </form>
            </div>
        </div>
    );
}