import { HttpRequest } from './HttpRequest.ts';
import { RequestBuilder } from './RequestBuilder.ts';

export class RequestDirector {
    private builder: RequestBuilder;

    constructor(builder: RequestBuilder) {
        this.builder = builder;
    }

    public buildGet(url: string): HttpRequest {
        return this.builder
            .reset()
            .setUrl(url)
            .setMethod('GET')
            .build();
    }

    public buildPost(url: string, data: any): HttpRequest {
        return this.builder
            .reset()
            .setUrl(url)
            .setMethod('POST')
            .setBody(data)
            .build();
    }
}
