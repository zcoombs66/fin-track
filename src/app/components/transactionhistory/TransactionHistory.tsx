'use client'

import Header from "../transactionheader/TransactionHeader"
import Transaction from "./Transaction"
import './transactionhistory.css'
import { useRouter } from "next/navigation"

export default function TransactionHistory() {
    const router = useRouter();

    return (
        <div className="transaction-history-container">
            <Header />
            <div className="items-end  text-xl">
                <h1 className="pt-8 pb-2">Transaction History</h1>
                <button onClick={() => router.push('/addtransaction')} className="bg-blue-700 rounded-lg p-1 hover:bg-blue-500">Add Transaction</button>
            </div>
            
            <div className="transactions-container">
                <Transaction />
                <Transaction />
                <Transaction />
            </div>
        </div>
    )
}