import NextAuth from "next-auth";
import AzureAdProvider from "next-auth/providers/azure-ad";

import type { NextAuthConfig, User } from "next-auth";
import { refreshAccessToken } from "./refreshAccessToken";

export const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SCRET,
  providers: [
    AzureAdProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: { scope: "offline_access openid profile email" },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // First-time login, save the `access_token`, `refresh_token` and `expires_at`
        const firstToken = {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at:
            account.expires_at ??
            Math.floor(Date.now() / 1000 + (account.expires_in ?? 0)),
        };
        return firstToken;
      } else if (Date.now() / 1000 < (token.expires_at as number)) {
        // Token is still valid, return it as is
        return token;
      } else {
        return refreshAccessToken(token);
      }
    },

    async session({ session, token }) {
      session.access_token = token.access_token as string;
      session.refresh_token = token.refresh_token as string;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

declare module "next-auth" {
  interface Session {
    user: User;
    error?: string;
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}
