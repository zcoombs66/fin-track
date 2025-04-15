import mongoose, {Schema, Document, Model} from "mongoose";

export interface TTransaction {
    amount: number; 
    debitCredit: boolean; 
    date: string; 
    location: string;
    tagNotes: string;
}

const transactionSchema = new Schema<TTransaction>({
    amount: {type: Number,},
    debitCredit: {type: Boolean,},
    date: {type: String,},
    location: {type: String, required: false},
    tagNotes: {type: String, required: false},
});

const Transaction: Model<TTransaction> = mongoose.models.Transaction || mongoose.model<TTransaction>("Transaction", transactionSchema);
export default Transaction;
export {transactionSchema};