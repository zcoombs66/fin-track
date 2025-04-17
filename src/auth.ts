import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/UserSchema";
import connectMongoDB from "../config/mongodb";

export const {
    handlers: { GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const {email,password} = credentials as {email:string; password: string};

                try {
                    await connectMongoDB();
                    const user = await User.findOne({email}).lean();

                    if(user) {
                        const isMatch = await bcrypt.compare(password, user.password);
                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                            };
                        } else {
                            console.log("Email or Password is not correct");
                            throw new Error("Email or Password is not correct")
                            
                        }
                    } else {
                        console.log("User not found");
                        throw new Error("User not found")
                        
                    }
                } catch (error: any ) {
                    console.log("An error occured: ", error);
                    return null;
                }
            },
        }),
    ],
});
