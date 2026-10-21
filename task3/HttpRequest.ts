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
