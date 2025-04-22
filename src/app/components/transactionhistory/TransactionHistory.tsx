'use client'

import Header from "../transactionheader/TransactionHeader"
import './transactionhistory.css'
import { useRouter } from "next/navigation"
import TransactionList from "./TransactionList"
import { auth } from "@/auth"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import TransactionHeader from "../transactionheader/TransactionHeader"

export default  function TransactionHistory() {
    const router = useRouter();
    const {data: session, status} = useSession();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if(status === "unauthenticated") {
            localStorage.setItem("redirectMessage", "Please sign in to access your transactions. ");
            router.push("/signin");
        }
    }, [status,router]);

    if(status === "loading" || !session) {
        return <div>Loading...</div>
    }

    console.log("Status: ", status);

    return (
        <div className="transaction-history-container">
            <TransactionHeader />
            <div className="transaction-info items-end  text-xl p-3">
                <h1 className="balance-item">Balance : ${balance}</h1>
                <div>
                    <h1 className="pt-8 pb-2">Transaction History</h1>
                    <button onClick={() => router.push('/addtransaction')} className="bg-blue-700 rounded-lg p-1 hover:bg-blue-500">Add Transaction</button>
                </div>    
            </div>   
            <TransactionList userEmail={session?.user?.email ?? undefined} onBalanceChange={setBalance} />
        </div>
    )
}