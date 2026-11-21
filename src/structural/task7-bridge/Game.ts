import type { Developer } from './Developer.ts';

export abstract class Game {
    protected developer: Developer;
    constructor(developer: Developer) { this.developer = developer; }
    setDeveloper(developer: Developer) { this.developer = developer; }
    abstract create(): void;
}
