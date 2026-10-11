import type { Developer } from './Developer.ts';
import type { DeveloperFactory } from './DeveloperFactory.ts';
import { CppDeveloper } from './CppDeveloper.ts';

export class CppDeveloperFactory implements DeveloperFactory {
    public createDeveloper(): Developer {
        return new CppDeveloper();
    }
}
