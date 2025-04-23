'use server'

import { connect } from "http2";
import {signIn, signOut } from "../../auth";
import connectMongoDB from "../../../config/mongodb";
import User from "@/models/UserSchema";
import bcrypt from "bcryptjs";

export async function doLogout() {
    console.log("Logging out...");
    await signOut({redirectTo: "/"});
}

export async function doCredentialLogin(formData: FormData): Promise<{ success: boolean; error?: string }> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        
        await connectMongoDB();
        const user = await User.findOne({ email });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { success: false, error: "Invalid password" };
        }

        return { success: true };

        /*
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (!response) {
            throw new Error(response?.error || "Login failed. Please try again. ")
        }
        return response;
        */
    } catch (err: any) {
        console.error(err);
        throw new Error("An error occured during login. Please check your credentials.");

    }
}