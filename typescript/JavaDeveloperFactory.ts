import type { Developer } from './Developer.ts';
import type { DeveloperFactory } from './DeveloperFactory.ts';
import { JavaDeveloper } from './JavaDeveloper.ts';

export class JavaDeveloperFactory implements DeveloperFactory {
    public createDeveloper(): Developer {
        return new JavaDeveloper();
    }
}
