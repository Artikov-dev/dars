export interface HttpResponse<T = unknown> {
    status: number;
    statusText: string;
    ok: boolean;
    data: T;
    headers: Record<string, string>;
    durationMs: number;
    requestUrl: string;
}
