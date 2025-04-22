import connectMongoDB from "../../../../config/mongodb";
import User from "../../../models/UserSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Transaction from "../../../models/transactionSchema"

 
import bcrypt from 'bcryptjs';


// export async function GET(request: NextRequest) {

//     await connectMongoDB();
//     const items = await User.find();
//     return NextResponse.json({items});

// }

export async function POST(request: NextRequest) {

    const {firstName, lastName, email, password, transactions} = await request.json();
    await connectMongoDB();
    const existing = await User.findOne({email});
    if(existing) return new Response("User already exists", {status:400});

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        transactions: [],
    }
    console.log(newUser);
    try {
        await User.create(newUser);
    } catch (error) {
        console.error("Failed to add user");
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
    return NextResponse.json({message:"Item add successfully"}, {status: 201});

}
