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

export async function GET(request: NextRequest, { params }: RouteParams) {
    const session = await auth();
    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectMongoDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const transaction = user.transactions.id(id); // Mongoose subdocument lookup
    if (!transaction) {
        return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }
    

    return new Response(JSON.stringify(transaction), {
        status: 200,
        headers: { "Content-Type": "application/json"},
    })}


export async function PUT(request: NextRequest, { params }: RouteParams) {
    const session = await auth();
    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { amount, debitCredit, date, location, tagNotes } = await request.json();
    await connectMongoDB();

    console.log("HERRRRRRRRRRRRE");
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const transaction = user.transactions.id(id); // Mongoose subdoc helper
    if (!transaction) {
        return NextResponse.json({ message: "Transaction not found" }, { status: 404});
    }

    // Update the fields
    transaction.amount = amount;
    transaction.debitCredit = debitCredit;
    transaction.date = date;
    transaction.location = location;
    transaction.tagNotes = tagNotes;

    await user.save();

    return NextResponse.json({ message: "Transaction updated" }, { status: 200 });
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

    const transactionToDelete = user.transactions.id(id);

    if(!transactionToDelete) {
        return NextResponse.json({ message: "Transaction not found"}, {status: 404});
    }


    transactionToDelete.deleteOne();




    await user.save();

    return NextResponse.json({ message: "Transaction deleted"}, { status: 200})

    // const deletedItem = await Transaction.findByIdAndDelete(id);

    // if (!deletedItem) {
    //     return NextResponse.json({ message: "Item not found"}, { status: 404 });
    // }

    // return NextResponse.json({ message: "Item deleted"}, { status: 200 });
}