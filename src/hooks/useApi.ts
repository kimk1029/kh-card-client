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

  const post = async (url: string, data: any) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const put = <T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> => {
    return request<T>(url, { method: "PUT", body, headers });
  };

  const del = async (url: string) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    return response.json();
  };

  return { get, post, put, del };
};
