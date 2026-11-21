// 1. PRODUCT (Mahsulot)
export class HttpRequest {
    public url: string = '';
    public method: string = 'GET';
    public headers: Record<string, string> = {};
    public body?: any;

    public async send(): Promise<any> {
        const response = await fetch(this.url, {
            method: this.method,
            headers: this.headers,
            body: this.body ? JSON.stringify(this.body) : undefined
        });

        return await response.json();
    }
}

// 2. BUILDER INTERFACE (Quruvchi shartnomasi)
export interface IRequestBuilder {
    setUrl(url: string): this;
    setMethod(method: string): this;
    setHeader(key: string, value: string): this;
    setBody(data: any): this;
    build(): HttpRequest;
}

// 3. CONCRETE BUILDER (Aniq quruvchi)
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

// 4. DIRECTOR (Direktor - tayyor shablonlar)
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

// 5. MAIN (Mijoz / Sinov)
export async function main() {
    console.log("=== TASK 3: HTTP REQUEST BUILDER ===\n");

    const builder = new RequestBuilder();
    const director = new RequestDirector(builder);

    // 1. Builder orqali GET
    const getRequest = builder
        .setUrl("https://jsonplaceholder.typicode.com/posts/1")
        .setMethod("GET")
        .setHeader("Accept", "application/json")
        .build();

    console.log("1. GET so'rovi yuborilmoqda...");
    const getData = await getRequest.send();
    console.log("   Natija (title):", getData.title);

    // 2. Director orqali POST
    const postRequest = director.buildPost(
        "https://jsonplaceholder.typicode.com/posts",
        { title: "Salom Dunyo", userId: 1 }
    );

    console.log("\n2. POST so'rovi yuborilmoqda...");
    const postData = await postRequest.send();
    console.log("   Natija (yangi ID):", postData.id);

    console.log("\n✔ Muvaffaqiyatli yakunlandi!");
}

main().catch(console.error);
