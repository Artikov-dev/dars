import { Developer } from './Developer.js';

export interface DeveloperFactory {
    createDeveloper(): Developer;
}
