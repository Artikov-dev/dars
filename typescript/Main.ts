import { Developer } from './Developer.js';
import { DeveloperFactory } from './DeveloperFactory.js';
import { JavaDeveloperFactory } from './JavaDeveloperFactory.js';
import { CppDeveloperFactory } from './CppDeveloperFactory.js';
import { ProjectTeamFactory } from './ProjectTeamFactory.js';
import { BankingTeamFactory } from './BankingTeamFactory.js';
import { SystemTeamFactory } from './SystemTeamFactory.js';
import { Tester } from './Tester.js';
import { ProjectManager } from './ProjectManager.js';

function createDeveloperFactoryBySpeciality(speciality: string): DeveloperFactory {
    const normalized = speciality.trim().toLowerCase();

    if (normalized === 'java') {
        return new JavaDeveloperFactory();
    } else if (normalized === 'c++') {
        return new CppDeveloperFactory();
    } else {
        throw new Error(`${speciality} is an empty or unknown speciality`);
    }
}

function main(): void {
    console.log("==================================================");
    console.log("           1. FACTORY METHOD PATTERN (TS)");
    console.log("==================================================");

    const cppFactory: DeveloperFactory = createDeveloperFactoryBySpeciality("C++");
    const cppDev: Developer = cppFactory.createDeveloper();
    cppDev.writeCode();

    const javaFactory: DeveloperFactory = createDeveloperFactoryBySpeciality("Java");
    const javaDev: Developer = javaFactory.createDeveloper();
    javaDev.writeCode();

    console.log("\n==================================================");
    console.log("           2. ABSTRACT FACTORY PATTERN (TS)");
    console.log("==================================================");

    console.log("-> Banking Team loyihasi (Java oilasi):");
    const bankingFactory: ProjectTeamFactory = new BankingTeamFactory();
    const bankDev: Developer = bankingFactory.createDeveloper();
    const bankTester: Tester = bankingFactory.createTester();
    const bankPM: ProjectManager = bankingFactory.createProjectManager();

    bankDev.writeCode();
    bankTester.testCode();
    bankPM.manageProject();

    console.log("\n-> System OS Team loyihasi (C++ oilasi):");
    const systemFactory: ProjectTeamFactory = new SystemTeamFactory();
    const sysDev: Developer = systemFactory.createDeveloper();
    const sysTester: Tester = systemFactory.createTester();
    const sysPM: ProjectManager = systemFactory.createProjectManager();

    sysDev.writeCode();
    sysTester.testCode();
    sysPM.manageProject();

    console.log("==================================================");
}

main();
