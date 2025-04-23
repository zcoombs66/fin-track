import connectMongoDB from "../../../../config/mongodb";
import Transaction from "../../../models/transactionSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import User from "@/models/UserSchema";

export async function GET(req: Request) {

    const session = await auth();
    if (!session?.user?.email) {
        return new Response("Unauthorized", {status: 401});
    }

    await connectMongoDB();
    const user = await User.findOne({email: session.user.email }).lean();
    if (!user) return new Response("User not found", {status:404});

    const transactions = user.transactions || [];
    return new Response(JSON.stringify(transactions), {
        status: 200,
        headers: { "Content-Type": "application/json"},
    });
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if(!session?.user?.email) {
        return new Response ("Unauthorized", {status:401});
    }


    const { amount, debitCredit, date, location, tagNotes, imageSrc } = await request.json();
    await connectMongoDB();

    const user = await User.findOne({email: session.user.email});
    if(!user) return new Response("User not found", {status: 404});
 

    user.transactions.push({amount, debitCredit, date, location, tagNotes, imageSrc });
    await user.save();

    return new Response(JSON.stringify(user.transactions), {status:201});

    // await Transaction.create({amount, debitCredit, date, location, tagNotes});
    // return NextResponse.json({message: "Item added successfully"}, {status: 201});

}

