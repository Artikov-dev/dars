import { Developer } from './Developer.js';
import { Tester } from './Tester.js';
import { ProjectManager } from './ProjectManager.js';
import { ProjectTeamFactory } from './ProjectTeamFactory.js';
import { JavaDeveloper } from './JavaDeveloper.js';
import { QATester } from './QATester.js';
import { BankingPM } from './BankingPM.js';

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
