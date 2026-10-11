import type { Developer } from './Developer.ts';

export interface DeveloperFactory {
    createDeveloper(): Developer;
}
