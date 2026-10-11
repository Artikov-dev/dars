import type { DeveloperFactory } from './DeveloperFactory.ts';
import type { ProjectTeamFactory } from './ProjectTeamFactory.ts';
import { JavaDeveloperFactory } from './JavaDeveloperFactory.ts';
import { CppDeveloperFactory } from './CppDeveloperFactory.ts';
import { BankingTeamFactory } from './BankingTeamFactory.ts';
import { SystemTeamFactory } from './SystemTeamFactory.ts';

type FactoryConstructor = new () => DeveloperFactory;

const factoryRegistry = new Map<string, FactoryConstructor>([
    ['java', JavaDeveloperFactory],
    ['c++', CppDeveloperFactory]
]);

function createDeveloperFactoryBySpeciality(speciality: string): DeveloperFactory {
    const key = speciality.trim().toLowerCase();
    const FactoryClass = factoryRegistry.get(key);

    if (!FactoryClass) {
        const available = Array.from(factoryRegistry.keys()).join(', ');
        throw new Error(`"${speciality}" is unknown. Available specialities: [${available}]`);
    }

    return new FactoryClass();
}

function runProjectTeam(factory: ProjectTeamFactory, teamName: string): void {
    console.log(`\n-> ${teamName}:`);
    const developer = factory.createDeveloper();
    const tester = factory.createTester();
    const projectManager = factory.createProjectManager();

    developer.writeCode();
    tester.testCode();
    projectManager.manageProject();
}

function main(): void {
    console.log("==================================================");
    console.log("           1. FACTORY METHOD PATTERN (TS)");
    console.log("==================================================");

    const specialities = ["C++", "Java"];
    for (const speciality of specialities) {
        const factory = createDeveloperFactoryBySpeciality(speciality);
        const developer = factory.createDeveloper();
        developer.writeCode();
    }

    console.log("\n==================================================");
    console.log("           2. ABSTRACT FACTORY PATTERN (TS)");
    console.log("==================================================");

    runProjectTeam(new BankingTeamFactory(), "Banking Team loyihasi (Java oilasi)");
    runProjectTeam(new SystemTeamFactory(), "System OS Team loyihasi (C++ oilasi)");

    console.log("==================================================");
}

main();
