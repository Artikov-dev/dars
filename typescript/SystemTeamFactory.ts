import { Developer } from './Developer.js';
import { Tester } from './Tester.js';
import { ProjectManager } from './ProjectManager.js';
import { ProjectTeamFactory } from './ProjectTeamFactory.js';
import { CppDeveloper } from './CppDeveloper.js';
import { NativeTester } from './NativeTester.js';
import { SystemPM } from './SystemPM.js';

export class SystemTeamFactory implements ProjectTeamFactory {
    public createDeveloper(): Developer {
        return new CppDeveloper();
    }

    public createTester(): Tester {
        return new NativeTester();
    }

    public createProjectManager(): ProjectManager {
        return new SystemPM();
    }
}
