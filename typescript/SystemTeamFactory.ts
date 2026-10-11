import type { Developer } from './Developer.ts';
import type { Tester } from './Tester.ts';
import type { ProjectManager } from './ProjectManager.ts';
import type { ProjectTeamFactory } from './ProjectTeamFactory.ts';
import { CppDeveloper } from './CppDeveloper.ts';
import { NativeTester } from './NativeTester.ts';
import { SystemPM } from './SystemPM.ts';

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
