'use client'

import Header from "../transactionheader/TransactionHeader"
import './transactionhistory.css'
import { useRouter } from "next/navigation"
import TransactionList from "./TransactionList"
import { auth } from "@/auth"
import { useSession } from "next-auth/react";
import { useEffect } from "react"


export default  function TransactionHistory() {
    const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {
        if(status === "unauthenticated") {
            localStorage.setItem("redirectMessage", "Please sign in to access your transactions. ");
            router.push("/signin");
        }
    }, [status,router]);

    if(status === "loading" || !session) {
        return <div>Loading...</div>
    }

    
    

    return (
        <div className="transaction-history-container p-3">
            <Header />
            <div className="items-end  text-xl">
                <h1 className="pt-8 pb-2">Transaction History</h1>
                <button onClick={() => router.push('/addtransaction')} className="bg-blue-700 rounded-lg p-1 hover:bg-blue-500">Add Transaction</button>
            </div>
            <TransactionList userEmail={session?.user?.email ?? undefined} />
        </div>
    )
}