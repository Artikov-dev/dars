import { Developer } from './Developer.js';

export class CppDeveloper implements Developer {
    public writeCode(): void {
        console.log("C++ Developer writes C++ code");
    }
}
