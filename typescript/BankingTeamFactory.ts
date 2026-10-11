import type { Developer } from './Developer.ts';
import type { Tester } from './Tester.ts';
import type { ProjectManager } from './ProjectManager.ts';
import type { ProjectTeamFactory } from './ProjectTeamFactory.ts';
import { JavaDeveloper } from './JavaDeveloper.ts';
import { QATester } from './QATester.ts';
import { BankingPM } from './BankingPM.ts';

export class BankingTeamFactory implements ProjectTeamFactory {
    public createDeveloper(): Developer {
        return new JavaDeveloper();
    }

    public createTester(): Tester {
        return new QATester();
    }

    public createProjectManager(): ProjectManager {
        return new BankingPM();
    }
}
