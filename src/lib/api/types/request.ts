import axiosClient from "./axiosClient";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestArgs<TBody = any, TParams = any> {
  method: HttpMethod;
  url: string;             // path starting with / (e.g. "/admin/users")
  data?: TBody;            // body for POST/PUT/PATCH
  params?: TParams;        // query params for GET
  headers?: Record<string, string>;
}

export async function request<TResp = any, TBody = any, TParams = any>(
  args: RequestArgs<TBody, TParams>
): Promise<TResp> {
  const { method, url, data, params, headers } = args;
  const { data: resp } = await axiosClient.request<TResp>({
    method,
    url,
    data,
    params,
    headers,
  });
  return resp;
}
