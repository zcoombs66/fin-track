import connectMongoDB from "../../../../config/mongodb";
import Transaction from "../../../models/transactionSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
    await connectMongoDB();
    const transactions = await Transaction.find();
    return NextResponse.json({ transactions });
}

export async function POST(request: NextRequest) {
    const { amount, debitCredit, date, location, tagNotes } = await request.json();
    await connectMongoDB();
    await Transaction.create({amount, debitCredit, date, location, tagNotes});
    return NextResponse.json({message: "Item added successfully"}, {status: 201});
}

