import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyMessage } from "ethers"; // Directly import verifyMessage

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Web3",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" },
        message: { label: "Message", type: "text" },
      },
      async authorize(credentials) {
        const { address, signature, message } = credentials as {
          address: string;
          signature: string;
          message: string;
        };

        try {
          // Verify the wallet signature
          const recoveredAddress = verifyMessage(message, signature);

          if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error("Signature verification failed");
          }

          // Return the user object (you can expand this to include additional data)
          return { id: address, name: "Web3 User", address };
        } catch (error) {
          console.error("Error verifying signature:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.address = (user as any).address; // Attach wallet address if it's Web3 login
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session.user) {
        session.user.address = token.address; // Add wallet address to the session
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
