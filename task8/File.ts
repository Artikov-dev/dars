import type { FileSystem } from './FileSystem.ts';

export class File implements FileSystem {
    private name: string;
    constructor(name: string) { this.name = name; }
    getName() { return this.name; }
    show(indent = "") { console.log(`${indent}File: ${this.name}`); }
}
