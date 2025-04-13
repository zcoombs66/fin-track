import Image from "next/image"
import EditDeleteButton from "./EditDeleteButton"
import './transaction.css'
import './transactioninformation.css'


type TransactionProps = {
    transaction: {
        _id: string;
        amount: number;
        depositWithdrawl: boolean;
        date: string;
        location: string;
        tagNotes: string;
    };
};

export default function Transaction({ transaction }: TransactionProps) {
    const { amount, depositWithdrawl, date, location, tagNotes } = transaction;
    
    const formattedAmount = `${depositWithdrawl ? '-' : '+'}$${amount}`;
    const logoPath = '/logo.png'
    
    return (
        <div className="transaction-container">
            <div className="image-and-info-container">
                <Image 
                    src={logoPath} 
                    alt="company-image-placeholder" 
                    width={130}
                    height={130}
                    className="company-image"
                />        
                <div className="information-container">
                    <h1>{formattedAmount}</h1>
                    <h2>{location}</h2>
                    <EditDeleteButton transactionId={transaction._id}/>
                </div>
            </div>
            <div className="date-contaienr">
                <h1 className="font-semibold text-4xl">04/17/2025</h1>
            </div>
        </div>
          
    )
}