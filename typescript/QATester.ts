import type { Tester } from './Tester.ts';

export class QATester implements Tester {
    public testCode(): void {
        console.log("QA Tester tests Java Enterprise system");
    }
}
