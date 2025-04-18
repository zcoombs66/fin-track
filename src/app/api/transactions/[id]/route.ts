import connectMongoDB from "../../../../../config/mongodb";
import Transaction from "@/models/transactionSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import User from "@/models/UserSchema";

interface RouteParams {
    params: {id: string};
}

export async function GET(request:NextRequest, { params }:RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const item = await Transaction.findOne({_id: id });
    return NextResponse.json({ item }, { status: 200 });
}

export async function PUT(request:NextRequest, { params }:RouteParams) {
    const { id } = await params;
    const { amount: amount, debitCredit: debitCredit, date: date, location: location, tagNotes: tagNotes} = await request.json();
    await connectMongoDB();
    await Transaction.findByIdAndUpdate(id, {amount, debitCredit, date, location, tagNotes});
    return NextResponse.json({ message: "Item updated"}, {status: 200});
}

export async function DELETE(request: NextRequest,{ params }:RouteParams) {
    const session = await auth();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized"}, {status: 401});
    }


    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format"}, { status: 400 });
    }

    await connectMongoDB();

    const user = await User.findOne({ email: session.user.email});
    if (!user) {
        return NextResponse.json({ message: "User not found"}, {status: 404});
    }

    const initialLength = user.transactions.length;
    user.transactions = user.transactions.filter(
        (eg) => eg._id!.toString() != id
    );  

    if (user.transactions.length === initialLength) {
        return NextResponse.json({message: "Transaction not found" }, {status: 404});
    }




    await user.save();

    return NextResponse.json({ message: "Transaction deleted"}, { status: 200})

    // const deletedItem = await Transaction.findByIdAndDelete(id);

    // if (!deletedItem) {
    //     return NextResponse.json({ message: "Item not found"}, { status: 404 });
    // }

    // return NextResponse.json({ message: "Item deleted"}, { status: 200 });
}