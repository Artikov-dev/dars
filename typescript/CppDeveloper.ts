import type { Developer } from './Developer.ts';

export class CppDeveloper implements Developer {
    public writeCode(): void {
        console.log("C++ Developer writes C++ code");
    }
}
