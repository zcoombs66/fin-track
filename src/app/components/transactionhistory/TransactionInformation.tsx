import EditDeleteButton from "./EditDeleteButton";
import Image from "next/image";
import './transactioninformation.css'

export default function TransactionInformation() {
    const transactionAmount = 0;
    const business = "placeholder business"
    const imgPath = '/logo.png'

    return (
        <div className="transaction-information-container">
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
            <div className="date-contaienr">
                <h1>Placeholder Date</h1>
            </div>
        </div>
         
    )
}