import type { BlockType } from './BlockType.ts';

export class Block {
    private x: number;
    private y: number;
    private z: number;
    private type: BlockType;

    constructor(x: number, y: number, z: number, type: BlockType) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getZ(): number {
        return this.z;
    }

    getType(): BlockType {
        return this.type;
    }

    render(): string {
        return `[${this.x},${this.y},${this.z}] ${this.type}`;
    }
}
