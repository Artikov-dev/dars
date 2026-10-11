import { Developer } from './Developer.js';

export class JavaDeveloper implements Developer {
    public writeCode(): void {
        console.log("Java Developer writes Java code");
    }
}
