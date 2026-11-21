export interface FileSystem {
    getName(): string;
    show(indent?: string): void;
}
