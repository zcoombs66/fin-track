'use client'

import './addtransaction.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import TransactionHeader from '../transactionheader/TransactionHeader';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {createClient} from 'pexels';

const logoPath = "/logo.png";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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

    const [imageLoading, setImageLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = e.target;

        if (name === 'location') {
            setForm((prev) => ({ ...prev, location: value }));
        } else {
            setForm({
                ...form,
                [name]: type === 'radio' && name === 'depositWithdrawl' ? value === 'true' : value
            });
        }
    }

    useEffect(() => {
        if (form.location) {
            const timeoutId = setTimeout(() => {
                fetchImage(form.location);
            }, 300); 

            return () => clearTimeout(timeoutId); 
        }
    }, [form.location]);

    async function fetchImage(query: string) {
        setImageLoading(true);
        
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/logo?name=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey as string,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) throw new Error(`Error: ${response.status}`);
    
            const result = await response.json();
            console.log(result); // result[0].image or similar depending on API response
    
            if (result && result.length > 0) {
                setForm(prev => ({
                    ...prev,
                    imageSrc: result[0].image
                }));
            } else {
                setForm((prev) => ({
                    ...prev,
                    imageSrc: logoPath
                }))
            }
        } catch (error) {
            console.error("Image fetch failed: ", error);
            setForm((prev) => ({
                ...prev,
                imageSrc: logoPath // Fallback in case of an error
            }));

        } finally {
            setImageLoading(false);
        }
         
    }




    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const searchParam = form.location;
        console.log(searchParam);
        const src = await fetchImage(searchParam);
        
       
        const preparedForm = {
            ...form,
            amount: form.depositWithdrawl ? Math.abs(Number(form.amount)) : -Math.abs(Number(form.amount)), 
            
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
                    {imageLoading && (
                        <p>Loading image...</p>
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