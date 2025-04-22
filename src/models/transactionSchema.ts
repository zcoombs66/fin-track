import mongoose, {Schema, Document, Model} from "mongoose";

export interface TTransaction {
    _id?: string;
    amount: number; 
    debitCredit: boolean; 
    date: string; 
    location: string;
    tagNotes: string;
    imageSrc: string;
}

const transactionSchema = new Schema<TTransaction>({
    amount: {type: Number,},
    debitCredit: {type: Boolean,},
    date: {type: String,},
    location: {type: String, required: false},
    tagNotes: {type: String, required: false},
    imageSrc: {type: String, requierd: false},
},
    {_id: true}
);

const Transaction: Model<TTransaction> = mongoose.models.Transaction || mongoose.model<TTransaction>("Transaction", transactionSchema);
export default Transaction;
export {transactionSchema};