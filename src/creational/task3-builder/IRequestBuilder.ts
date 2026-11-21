import type { HttpRequest } from './HttpRequest.ts';

export interface IRequestBuilder {
    setUrl(url: string): this;
    setMethod(method: string): this;
    setHeader(key: string, value: string): this;
    setBody(data: any): this;
    build(): HttpRequest;
}
