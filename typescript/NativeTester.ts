import type { Tester } from './Tester.ts';

export class NativeTester implements Tester {
    public testCode(): void {
        console.log("Native Tester tests C++ high-performance system");
    }
}
