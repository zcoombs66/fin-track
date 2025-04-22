import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
          // Add custom fields from the user to the token
          if (user) {
            token.firstName = user.firstName;
            token.lastName = user.lastName;
          }
          return token;
        },
        async session({ session, token }) {
          // Pass custom fields from the token to the session
          if (session.user) {
            session.user.firstName = token.firstName as string;
            session.user.lastName = token.lastName as string;
          }
          return session;
        },
      },
    providers: [],
};