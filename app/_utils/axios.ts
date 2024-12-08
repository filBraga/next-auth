import axios from "axios";
import { useSession } from "next-auth/react";
import { refreshAccessToken } from "../_auth/refreshAccessToken";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const ApiClient = () => {
  const { data: session } = useSession();

  const defaultOptions = {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: session ? `Bearer ${session.access_token}` : "",
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      try {
        if (error.response?.status === 401 && session && !error.config._retry) {
          error.config._retry = true;

          const refreshedToken = await refreshAccessToken({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          });

          session.access_token = refreshedToken.access_token;

          error.config.headers.Authorization = `Bearer ${session.access_token}`;

          return instance.request(error.config);
        }
        return Promise.reject(error);
      } catch (error) {
        console.log("error in the intercept", error);
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

export default ApiClient;
