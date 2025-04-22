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
        imageSrc: string;
    };
};

export default function Transaction({ transaction }: TransactionProps) {
    const { amount, depositWithdrawl, date, location, tagNotes, imageSrc } = transaction;
    
    const formattedAmount = `${amount < 0 ? '-' : '+'} $${Math.abs(amount)}`;
    const rawDate = date;
    const [year, month, day] = rawDate.split("-");
    const formattedDate = `${month}/${day}/${year}`;
    const logoPath = imageSrc;
    console.log("IMAGE SRC IN TRANSAXTION", imageSrc)
    
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
                <h1 className="font-semibold text-2xl">{formattedDate}</h1>
            </div>
        </div>
          
    )
}