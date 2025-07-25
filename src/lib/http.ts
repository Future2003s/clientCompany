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

enum HTTP_METHOD {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
}

/**
 * Create request handler
 * Request handler là một hàm để gửi request đến server
 * T là kiểu dữ liệu trả về từ server
 * method là phương thức gửi request
 * url là đường dẫn gửi request
 * options là các options của request
 */
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options: CustomOptions
) => {
  const body = options.body ? JSON.stringify(options.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  /**
   * nếu không truyền baseUrl
   */

  const baseUrl =
    options.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_END_POINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    method,
    body,
    headers: {
      ...baseHeaders,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error("Lỗi khi gửi request");
  }

  const payload = await res.json();

  const data = {
    status: payload.status,
    payload,
  };

  return data;
};

const http = {
  get: <T>(url: string, options: Omit<CustomOptions, "body">) => {
    return request<T>("GET", url, options);
  },
  post: <Response>(url: string, body: any, options?: CustomOptions) => {
    return request<Response>("POST", url, { ...options, body });
  },
  put: (url: string, options: CustomOptions) => request("PUT", url, options),
  patch: (url: string, options: CustomOptions) =>
    request("PATCH", url, options),
  delete: (url: string, options: CustomOptions) =>
    request("DELETE", url, options),
};

export default http;
