import Link from "next/link"
import Header from "../transactionheader/TransactionHeader"
import Transaction from "./Transaction"
import './transactionhistory.css'

export default function TransactionHistory() {
    return (
        <div className="transaction-history-container">
            <Header />
            <div className="items-end  text-xl">
                <h1 className="pt-8 pb-2">Transaction History</h1>
                <Link href={'/addtransaction'}>
                    <button className="bg-blue-700 rounded-lg p-1 hover:bg-blue-500">Add Transaction</button>
                </Link>
            </div>
            
            <div className="transactions-container">
                <Transaction />
                <Transaction />
                <Transaction />
            </div>
        </div>
    )
}