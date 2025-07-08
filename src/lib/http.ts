import { envConfig } from "@/config";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR: number = 442;
const AUTHENTICATION_ERROR_STATUS: number = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

class HttpError extends Error {
  private readonly status: number;
  private readonly payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions
) => {
  console.log(envConfig.NEXT_PUBLIC_API_END_POINT);
  const fullURL = `${envConfig.NEXT_PUBLIC_API_END_POINT}/v1/api${url}`;
  const res = await fetch(fullURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify(options?.body),
  });
  if (!res.ok) {
    throw Error("Http Error");
  }
  return await res.json();
};

export const http = {
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, {
      ...options,
      body,
    });
  },
};
