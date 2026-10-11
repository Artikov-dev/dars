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

export function createDeveloperFactoryBySpeciality(speciality: string): DeveloperFactory {
    const normalized = speciality.trim().toLowerCase();

    if (normalized === "java") {
        return new JavaDeveloperFactory();
    } else if (normalized === "c++") {
        return new CppDeveloperFactory();
    } else {
        throw new Error(`${speciality} is an empty or unknown speciality`);
    }
}

export function main(): void {
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
