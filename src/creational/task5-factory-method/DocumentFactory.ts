import { Document } from './Document.ts';

export class DocumentFactory {
    private prototype: Document;
    constructor(prototype: Document) { this.prototype = prototype.clone(); }
    setPrototype(prototype: Document) { this.prototype = prototype.clone(); }
    cloneDocument() { return this.prototype.clone(); }
}
