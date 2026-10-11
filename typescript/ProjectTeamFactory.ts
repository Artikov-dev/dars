import { Developer } from './Developer.js';
import { Tester } from './Tester.js';
import { ProjectManager } from './ProjectManager.js';

export interface ProjectTeamFactory {
    createDeveloper(): Developer;
    createTester(): Tester;
    createProjectManager(): ProjectManager;
}
