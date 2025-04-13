import connectMongoDB from "../../../../../config/mongodb";
import Transaction from "@/models/transactionSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

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
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format"}, { status: 400 });
    }

    await connectMongoDB();
    const deletedItem = await Transaction.findByIdAndDelete(id);

    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found"}, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted"}, { status: 200 });
}