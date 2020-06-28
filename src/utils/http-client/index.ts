import { configs } from "configs";
import { err, ok, Result } from "utils/functionals";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const PATCH = "PATCH";
const DELETE = "DELETE";

type Method = GET | POST | PUT | PATCH | DELETE;

type GET = typeof GET;
type POST = typeof POST;
type PUT = typeof PUT;
type PATCH = typeof PATCH;
type DELETE = typeof DELETE;

type QueryParameter = Record<string, null | boolean | number | string>;

type BodyParameter = JsonBodyParameter | FormData | URLSearchParams | Blob;

type JsonBodyParameter = Record<string, null | boolean | number | string>;

type HeaderParameter = Record<string, null | boolean | number | string>;

type Option = {
  baseUrl: string;
  getHeader: () => HeaderParameter;
  failover: () => Promise<void>;
};

class HttpClient {
  static of(option: Option) {
    return new HttpClient(option);
  }

  constructor(private readonly option: Option) {}

  private getHeader(header: HeaderParameter): HeaderParameter {
    return Object.assign({}, this.option.getHeader(), header);
  }

  private async request<T>(
    method: Method,
    path: string,
    query: QueryParameter,
    body: BodyParameter,
    header: HeaderParameter,
    signal: null | AbortSignal
  ): Promise<Result<T, any>> {
    const url = [new URL(path, this.option.baseUrl), new URLSearchParams(query as Record<string, string>)].filter(Boolean).join("?");
    const currentBody = body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob ? body : JSON.stringify(body);
    try {
      const response = await window.fetch(url, {
        method,
        body: currentBody,
        headers: this.getHeader(header) as Record<string, string>,
        signal
      });
      const data = await response.json();
      return ok(data);
    } catch (error) {
      if (signal?.aborted) {
        return err(error);
      }
      try {
        await this.option.failover();
        const response = await window.fetch(url, {
          method,
          body: currentBody,
          headers: this.getHeader(header) as Record<string, string>,
          signal
        });
        const data = await response.json();
        return ok(data);
      } catch (error) {
        return err(error);
      }
    }
  }

  get<T = any>(
    path: string,
    query: QueryParameter = {},
    header: HeaderParameter = {},
    signal: null | AbortSignal = null
  ): Promise<Result<T, any>> {
    return this.request<T>(GET, path, query, {}, header, signal);
  }

  post<T = any>(
    path: string,
    body: BodyParameter = {},
    header: HeaderParameter = {},
    signal: null | AbortSignal = null
  ): Promise<Result<T, any>> {
    return this.request<T>(POST, path, {}, body, header, signal);
  }

  put<T = any>(
    path: string,
    body: BodyParameter = {},
    header: HeaderParameter = {},
    signal: null | AbortSignal = null
  ): Promise<Result<T, any>> {
    return this.request<T>(PUT, path, {}, body, header, signal);
  }

  patch<T = any>(
    path: string,
    body: BodyParameter = {},
    header: HeaderParameter = {},
    signal: null | AbortSignal = null
  ): Promise<Result<T, any>> {
    return this.request<T>(PATCH, path, {}, body, header, signal);
  }

  delete<T = any>(
    path: string,
    body: BodyParameter = {},
    header: HeaderParameter = {},
    signal: null | AbortSignal = null
  ): Promise<Result<T, any>> {
    return this.request<T>(DELETE, path, {}, body, header, signal);
  }
}

const getHeader = (): HeaderParameter => ({
  //
});

const failover = async (): Promise<void> => {
  //
};

export const service = HttpClient.of({
  baseUrl: configs.serverHost,
  getHeader,
  failover
});
