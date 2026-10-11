export interface Developer {
    writeCode(): void;
}

export class CppDeveloper implements Developer {
    public writeCode(): void {
        console.log("C++ Developer writes C++ code");
    }
}

export class JavaDeveloper implements Developer {
    public writeCode(): void {
        console.log("Java Developer writes Java code");
    }
}

export interface DeveloperFactory {
    createDeveloper(): Developer;
}

export class CppDeveloperFactory implements DeveloperFactory {
    public createDeveloper(): Developer {
        return new CppDeveloper();
    }
}

export class JavaDeveloperFactory implements DeveloperFactory {
    public createDeveloper(): Developer {
        return new JavaDeveloper();
    }
}

export interface Tester {
    testCode(): void;
}

export class QATester implements Tester {
    public testCode(): void {
        console.log("QA Tester tests Java Enterprise system");
    }
}

export class NativeTester implements Tester {
    public testCode(): void {
        console.log("Native Tester tests C++ high-performance system");
    }
}

export interface ProjectManager {
    manageProject(): void;
}

export class BankingPM implements ProjectManager {
    public manageProject(): void {
        console.log("Banking PM manages Enterprise Banking project");
    }
}

export class SystemPM implements ProjectManager {
    public manageProject(): void {
        console.log("System PM manages C++ Operating System project");
    }
}

export interface ProjectTeamFactory {
    createDeveloper(): Developer;
    createTester(): Tester;
    createProjectManager(): ProjectManager;
}

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

type FactoryConstructor = new () => DeveloperFactory;

const factoryRegistry = new Map<string, FactoryConstructor>([
    ['java', JavaDeveloperFactory],
    ['c++', CppDeveloperFactory]
]);

export function createDeveloperFactoryBySpeciality(speciality: string): DeveloperFactory {
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

export function main(): void {
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
