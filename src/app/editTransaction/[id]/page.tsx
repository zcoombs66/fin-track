'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TransactionHeader from '../../components/transactionheader/TransactionHeader';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { TTransaction } from '@/models/transactionSchema';
import {useParams} from "next/navigation"
import "../../components/addtransaction/addtransaction.css"

const logoPath = "/logo.png";

export default function EditTransactionPage() {
    const {id} = useParams<{ id: string}>();
    const router = useRouter();
    const {data: session, status} = useSession();
    const [transaction, setTransaction] = useState<TTransaction| null>(null);
    const [loading, setLoading] = useState(true);


    const [form, setForm] = useState<{
        amount: number | string; 
        depositWithdrawl: boolean; 
        date: string; 
        location: string;
        tagNotes: string;
    }>({
        amount: "",
        depositWithdrawl: true,
        date: "", // `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
        location: "",
        tagNotes: ""

    })

    useEffect(() => {
        if(status === "unauthenticated") {
            router.push("/signin");
        }

        async function fetchTransaction() {
            const response = await fetch(`/api/transactions/${id}`)
            console.log(response)
            if(response.ok) {
                const transaction = await response.json();
                console.log("Transaction data: ", transaction);
                setTransaction(transaction);
                setLoading(false);
                
            } else {
                console.error("Failed to fetch transaction");
                setLoading(false);
            }
            setLoading(false);
        }
        if(status === 'authenticated') {
            fetchTransaction();
        }

    }, [id,status]);

    useEffect(() => {
        if (transaction) {
           
            setForm({
                amount: Math.abs(transaction.amount),
                depositWithdrawl: transaction.amount > 0 ? true : false,
                date: transaction.date,
                location: transaction.location,
                tagNotes: transaction.tagNotes
            });

        }
    }, [transaction]);

   
    
   

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value, type} = e.target;
        setForm({
            ...form,
            [name]: type === 'radio' && name === 'depositWithdrawl' ? value === 'true' : value
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if(!transaction) return;

        const preparedForm = {
            ...form,
            amount: form.depositWithdrawl ? Math.abs(Number(form.amount)) : -Math.abs(Number(form.amount)), 
        }

        // Hanle form information here
        console.log("Form submitted: ", preparedForm)

        
        try {
            const response = await fetch(`/api/transactions/${transaction._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preparedForm),

            });

            console.log(response);

            if(!response.ok) {
                throw new Error (`Failed to submit: ${response.status}`);
            }

            const data = await response.json();
            console.log("Transaction saved: ", data);

            router.push('/transactionhistory');
        } catch (error) {
            console.error('Error submitting transaction', error);
        }
    }
    
    
    
    return (
        <div className='add-transaction-container'>
            <TransactionHeader />
            <div className='form-container'>
                <h1>Edit Transaction</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount">Amount ($)</label>
                    <input 
                        name='amount'
                        value={form.amount}
                        type='number'
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
                        className='radio-input'
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
                        className='radio-input'
                        />
                        Withdrawl
                    </label>
                    </div>
                    Date
                    <input
                        name='date'
                        type='date'
                        value={form.date}
                        onChange={handleChange}
                        required
                    />
                    Location
                    <input
                        name='location'
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Store"
                        required
                    />
                    <label htmlFor="tag / notes">Tag / Notes</label>
                    <input 
                        name='tagNotes'
                        value={form.tagNotes}
                        onChange={handleChange}
                        placeholder="tag / notes"
                        required
                    />
                   <div className='add-transaction-button-container'>
                        <button type='submit'>Submit</button>
                        <button onClick={() => router.push('/transactionhistory')} type='reset'>Cancel</button>
                    </div> 
                </form>
                
            </div>
        </div>
    )
}