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
<<<<<<< HEAD
  console.log(envConfig.NEXT_PUBLIC_API_END_POINT);
  const fullURL = `${envConfig.NEXT_PUBLIC_API_END_POINT}/v1/api${url}`;
  const res = await fetch(fullURL, {
=======
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const baseUrl = options?.baseUrl ? options.baseUrl : "http://localhost:4000";

  const res = await fetch(url, {
    ...options,
>>>>>>> 276a6ae18ebb88490169a9dd0533c52a67c791b3
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
<<<<<<< HEAD
      body,
    });
  },
=======
      ...body,
    });
  },

  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    console.log(url);
    return request<Response>("GET", url, options);
  },
  put<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
>>>>>>> 276a6ae18ebb88490169a9dd0533c52a67c791b3
};
