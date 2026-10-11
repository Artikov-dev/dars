import type { Developer } from './Developer.ts';

export class JavaDeveloper implements Developer {
    public writeCode(): void {
        console.log("Java Developer writes Java code");
    }
}
