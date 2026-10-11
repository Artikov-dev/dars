import type { Developer } from './Developer.ts';
import type { Tester } from './Tester.ts';
import type { ProjectManager } from './ProjectManager.ts';

export interface ProjectTeamFactory {
    createDeveloper(): Developer;
    createTester(): Tester;
    createProjectManager(): ProjectManager;
}
