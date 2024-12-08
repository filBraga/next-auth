"use server";

import "next-auth";
import axios from "axios";
import { JWT } from "next-auth/jwt";

export async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const response = await axios.post(
      url,
      new URLSearchParams({
        client_id: process.env.AZURE_AD_CLIENT_ID as string,
        client_secret: process.env.AZURE_AD_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token as string,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const refreshedToken = response.data;

    const newToken = {
      ...token,
      access_token: refreshedToken.access_token,
      refresh_token: refreshedToken.refresh_token,
      expires_at: Date.now() / 1000 + refreshedToken.expires_in,
    };

    return newToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "Error refreshing access token",
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    // Add other properties if needed
  }
}
