import { useSession } from "next-auth/react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

export const useApi = () => {
  const { data: session } = useSession();

  const request = async <T>(
    url: string,
    { method, body, headers = {} }: FetchOptions
  ): Promise<T> => {
    const options: RequestInit = {
      method,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session?.accessToken || ""}`,
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorMessage}`);
    }

    return response.json();
  };

  const get = <T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<T> => {
    return request<T>(url, { method: "GET", headers });
  };

  const post = <T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> => {
    return request<T>(url, { method: "POST", body, headers });
  };

  const put = <T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> => {
    return request<T>(url, { method: "PUT", body, headers });
  };

  const del = <T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<T> => {
    return request<T>(url, { method: "DELETE", headers });
  };

  return { get, post, put, del };
};
