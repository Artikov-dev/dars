import { HttpRequest } from './HttpRequest.ts';
import type { IRequestBuilder } from './IRequestBuilder.ts';

export class RequestBuilder implements IRequestBuilder {
    private request: HttpRequest;

    constructor() {
        this.request = new HttpRequest();
    }

    public reset(): this {
        this.request = new HttpRequest();
        return this;
    }

    public setUrl(url: string): this {
        this.request.url = url;
        return this;
    }

    public setMethod(method: string): this {
        this.request.method = method;
        return this;
    }

    public setHeader(key: string, value: string): this {
        this.request.headers[key] = value;
        return this;
    }

    public setBody(data: any): this {
        this.request.headers['Content-Type'] = 'application/json';
        this.request.body = data;
        return this;
    }

    public build(): HttpRequest {
        if (!this.request.url) {
            throw new Error("URL bo'sh bo'lishi mumkin emas!");
        }
        const result = this.request;
        this.reset();
        return result;
    }
}
