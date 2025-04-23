import mongoose, {Schema, Document, Model, Types} from "mongoose";
import { transactionSchema, TTransaction  } from "./transactionSchema";





export interface IUser {
    firstName: string;
    lastName:string;
    email: string;
    password: string;
    transactions: Types.DocumentArray<TTransaction>;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    transactions: {
        type: [transactionSchema], 
        required: true, 
        default: []
    }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;