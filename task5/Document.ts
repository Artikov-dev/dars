import type { Copyable } from './Copyable.ts';

export class Document implements Copyable<Document> {
    private id: number; private title: string; private content: string; private author: string;
    private tags: string[];

    constructor(id: number, title: string, content: string, author: string, tags: string[]) {
        this.id = id; this.title = title; this.content = content; this.author = author;
        this.tags = tags;
    }

    clone() {
        return new Document(this.id, this.title, this.content, this.author, [...this.tags]);
    }

    getId() { return this.id; }               setId(id: number) { this.id = id; }
    getTitle() { return this.title; }         setTitle(title: string) { this.title = title; }
    getContent() { return this.content; }     setContent(content: string) { this.content = content; }
    getAuthor() { return this.author; }       setAuthor(author: string) { this.author = author; }
    getTags() { return this.tags; }

    toString() {
        return `#${this.id} "${this.title}" | ${this.content} | ${this.author} | [${this.tags.join(", ")}]`;
    }
}
