import './AddTransaction.css';
import logo from "../../assets/logo.png"
import Image from "next/image"


export default function AddTransaction() {
    return (
        <div className='add-transaction-container'>
            <div className="header-container">
                <Image src={logo} alt="image-placeholder" className='h-8 w-auto' />
                <button>Log Out</button>
            </div>
            <div className='form-container'>
                <h1>Add Transaction</h1>
                <form>
                    <label htmlFor="ammount">Ammount</label>
                    <input 
                        name="ammount"
                        type="text" 
                        placeholder="$ 0.00"
                    />
                    <div className="radio-container">
                        <label htmlFor="debit">Debit</label>
                        <input type="radio" value="Debit"/>
                        <label htmlFor="credit">Credit</label>
                        <input type="radio" value="Credit"/>
                    </div>
                    <input 
                        name="date"
                        type="date" 
                        placeholder={new Date().toISOString().split('T')[0]}
                    />
                    <label htmlFor="tag / notes">Tag / Notes</label>
                    <input 
                        name="tag / notes"
                        type="text" 
                        placeholder="tag / notes here"
                    />
                   <div className='add-transaction-button-container'>
                        <button type='submit'>Submit</button>
                        <button type='reset'>Cancel</button>
                    </div> 
                </form>
                
            </div>
        </div>
    )
}