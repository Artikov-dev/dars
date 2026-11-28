export class Ticket {
    private id: number;
    private message: string;
    private level: number;

    constructor(id: number, message: string, level: number) {
        this.id = id;
        this.message = message;
        this.level = level;
    }

    getId(): number {
        return this.id;
    }

    getMessage(): string {
        return this.message;
    }

    getLevel(): number {
        return this.level;
    }
}
