'use client'

import './addtransaction.css';
// import logo from "../../assets/logo.png"
import Image from "next/image"
import Header from '../transactionheader/TransactionHeader';
import { useState } from 'react';
import Link from 'next/link';

const logoPath = "/logo.png";

export default function AddTransaction() {
    const current = new Date();
    
    const [form, setForm] = useState<{
        amount: number; 
        debitCredit: boolean; 
        date: string; 
        location: string;
        tagNotes: string;
    }>({
        amount: 0.00,
        debitCredit: true,
        date: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
        location: "Store",
        tagNotes: "add tags and notes here"

    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value, type} = e.target;
        setForm({
            ...form,
            [name]: type === 'radio' && name === 'debitCredit' ? value === 'true' : value
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Hanle form information here
            console.log("Form submitted: ", form)
    }
    
    return (
        <div className='add-transaction-container'>
            <Header />
            <div className='form-container'>
                <h1>Add Transaction</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount">Amount ($)</label>
                    <input 
                        name='amount'
                        value={form.amount}
                        onChange={handleChange}
                    />
                    <div className="radio-container">
                    <label>
                        <input 
                        type="radio" 
                        name="debitCredit"
                        value="true"
                        checked={form.debitCredit === true}
                        onChange={handleChange}
                        />
                        Debit
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name="debitCredit"
                        value="false"
                        checked={form.debitCredit === false}
                        onChange={handleChange}
                        />
                        Credit
                    </label>
                    </div>
                    Date
                    <input
                        name='date'
                        type='date'
                        value={form.date}
                        onChange={handleChange}
                    />
                    Location
                    <input
                        name='location'
                        value={form.location}
                        onChange={handleChange}
                    />
                    <label htmlFor="tag / notes">Tag / Notes</label>
                    <input 
                        name='tagNotes'
                        value={form.tagNotes}
                        onChange={handleChange}
                    />
                   <div className='add-transaction-button-container'>
                        <button type='submit'>Submit</button>
                        <Link href={'/transactionhistory'}>
                            <button type='reset'>Cancel</button>
                        </Link>
                    </div> 
                </form>
                
            </div>
        </div>
    )
}