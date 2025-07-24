"use strict";

import { envConfig } from "@/config";

type ParamHttpError = {
  status: number;
  payload: any;
  message?: string;
};

interface CustomOptions extends RequestInit {
  baseUrl?: string;
}

export class HttpError extends Error {
  private readonly status: number;

  private readonly payload: {
    message: string;
    [key: string]: any;
  };

  constructor({ message = "Lỗi HTTP", status, payload }: ParamHttpError) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

enum METHOD {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
}

export const isClient = typeof window !== undefined;

const request = async (method: METHOD, url: string, options: CustomOptions) => {
  let body: FormData | string | undefined = undefined;

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeades: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  if (isClient) {
    const accessToken = localStorage.getItem("accessToken");
    // TODO: sử dụng accessToken cho request nếu cần
    if (accessToken) {
      baseHeades.Authorization = `Bearer ${accessToken}`;
    }
  }

  const baseUrl: string =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_URL
      : options.baseUrl;

  const fullUrl: string = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    method: method,
    body: body,
    ...options,
    headers: {
      ...baseHeades,
      ...options?.headers,
    } as any,
  });

  const payload: Response = await res.json();

  const data: { status: number; payload: Response } = {
    status: payload.status,
    payload,
  };
};
