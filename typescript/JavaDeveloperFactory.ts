import { Developer } from './Developer.js';
import { DeveloperFactory } from './DeveloperFactory.js';
import { JavaDeveloper } from './JavaDeveloper.js';

export class JavaDeveloperFactory implements DeveloperFactory {
    public createDeveloper(): Developer {
        return new JavaDeveloper();
    }
}
