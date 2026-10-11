import { Developer } from './Developer.js';
import { DeveloperFactory } from './DeveloperFactory.js';
import { CppDeveloper } from './CppDeveloper.js';

export class CppDeveloperFactory implements DeveloperFactory {
    public createDeveloper(): Developer {
        return new CppDeveloper();
    }
}
