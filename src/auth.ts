import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/UserSchema";

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
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const user = await User.findOne({email: credentials.email }).lean();

                    if(user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                            };
                        } else {
                            console.log("Email or Password is not correct");
                            return null;
                        }
                    } else {
                        console.log("User not foun");
                        return null;
                    }
                } catch (error: any ) {
                    console.log("An error occured: ", error);
                    return null;
                }
            },
        }),
    ],
});
