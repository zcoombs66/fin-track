import TransactionInformation from "./TransactionInformation"
import Image from "next/image"
import EditDeleteButton from "./EditDeleteButton"
import './transaction.css'
import './transactioninformation.css'

const logoPath = '/logo.png'
export default function Transaction() {
     const transactionAmount = "-$143.99";
        const business = "placeholder business"
        const imgPath = '/logo.png'
    
        return (
            <div className="transaction-container">
                <div className="image-and-info-container">
                    <Image 
                        src={imgPath} 
                        alt="company-image-placeholder" 
                        width={130}
                        height={130}
                        className="company-image"
                    />        
                    <div className="information-container">
                        <h1>{transactionAmount}</h1>
                        <h2>{business}</h2>
                        <EditDeleteButton />
                    </div>
                </div>
                <div className="date-contaienr">
                    <h1 className="font-semibold text-4xl">04/17/2025</h1>
                </div>
            </div>
             
        )
}