type CustomOptions = RequestInit & {
  baseUrl?: string;
};
class HttpError extends Error {
  private status: number;
  private payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }

  public getPayload(): any {
    return this.payload;
  }

  public setPayload(payload: any) {
    this.payload = payload;
  }

  public getStatus(): number {
    return this.status;
  }

  public getMessage(): string {
    return this.message;
  }

  public setStatus(status: number) {
    this.status = status;
  }

  public setMessage(messgae: string) {
    this.message = messgae;
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const baseUrl = options?.baseUrl ? options.baseUrl : "http://localhost:4000";

  const res = await fetch(url, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    throw new HttpError(data);
  }

  return data;
};

export const http = {
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, {
      ...options,
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
};
