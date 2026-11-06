import type { FileSystem } from './FileSystem.ts';

export class Folder implements FileSystem {
    private name: string;
    private children: FileSystem[] = [];
    constructor(name: string) { this.name = name; }
    getName() { return this.name; }

    add(item: FileSystem) { this.children.push(item); return this; }

    remove(item: FileSystem) {
        const index = this.children.indexOf(item);
        if (index !== -1) this.children.splice(index, 1);
        return this;
    }

    show(indent = "") {
        console.log(`${indent}Folder: ${this.name}`);
        this.children.forEach(child => child.show(indent + "    "));
    }
}
