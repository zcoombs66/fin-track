'use client'

import './addtransaction.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import TransactionHeader from '../transactionheader/TransactionHeader';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {createClient} from 'pexels';

const logoPath = "/logo.png";
const client = createClient('5IrRwYdWiltrRomSXmsEbgSKM3Jz9fUReoVYIMXkXPKjMbDvmAeaAJMr')

export default function AddTransaction() {
    const current = new Date();
    const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {
        if(status === "unauthenticated") {
            router.push("/signin");
        }
    }, [status,router]);

   
    
    const [form, setForm] = useState<{
        amount: number | string; 
        depositWithdrawl: boolean; 
        date: string; 
        location: string;
        tagNotes: string;
        imageSrc: string;
    }>({
        amount: "",
        depositWithdrawl: true,
        date: "", // `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
        location: "",
        tagNotes: "",
        imageSrc: ""

    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value, type} = e.target;
        if (name === 'location') {
            // Update form first
            setForm(prev => ({ ...prev, location: value }));
    
            // Then fetch image after a small delay to debounce typing
            const delayFetch = setTimeout(() => {
                fetchImage(value + ' logo').then(img => {
                    if (img) {
                        setForm(prev => ({ ...prev, imageSrc: img }));
                    }
                });
            }, 300);
    
            return () => clearTimeout(delayFetch); // Cleanup if user keeps typing
        }



        setForm({
            ...form,
            [name]: type === 'radio' && name === 'depositWithdrawl' ? value === 'true' : value
        })

        
    }

    async function fetchImage(query: string) {
        try {
            const result = await client.photos.search({query, per_page: 1});
            if ('photos' in result && result.photos.length > 0) {
                const firstImage = result.photos[0].src.medium;
                console.log(firstImage);
                return firstImage;
            } else {
                console.error("No images found or error response recieved");
                return null
            }
        } catch (error) {
            console.error("Image fetch failed: ", error);
            return null;
        }
    }




    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const searchParam = form.location + " logo";
        console.log(searchParam);
        const src = await fetchImage(searchParam);
        
       
        const preparedForm = {
            ...form,
            amount: form.depositWithdrawl ? Math.abs(Number(form.amount)) : -Math.abs(Number(form.amount)), 
            imageSrc: src || ""
        };


        // Hanle form information here
        console.log("Form submitted: ", preparedForm)

        try {
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preparedForm),

            });

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
                <h1>Add Transaction</h1>
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
                    {form.imageSrc && (
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ fontWeight: 'bold' }}>Preview:</p>
                        <img 
                            src={form.imageSrc} 
                            alt="Location preview" 
                            style={{ maxWidth: '100%', borderRadius: '10px', maxHeight: '200px', objectFit: 'contain' }} 
                        />
                    </div>
                )}

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