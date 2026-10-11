public class Main {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("           1. FACTORY METHOD PATTERN");
        System.out.println("==================================================");

        // Factory Method orqali C++ dasturchisi
        DeveloperFactory cppFactory = createDeveloperFactoryBySpeciality("C++");
        Developer cppDev = cppFactory.createDeveloper();
        cppDev.writeCode();

        // Factory Method orqali Java dasturchisi
        DeveloperFactory javaFactory = createDeveloperFactoryBySpeciality("Java");
        Developer javaDev = javaFactory.createDeveloper();
        javaDev.writeCode();

        System.out.println("\n==================================================");
        System.out.println("           2. ABSTRACT FACTORY PATTERN");
        System.out.println("==================================================");

        // Abstract Factory - Banking Team (Java oilasi)
        System.out.println("-> Banking Team loyihasi:");
        ProjectTeamFactory bankingFactory = new BankingTeamFactory();
        Developer bankDev = bankingFactory.createDeveloper();
        Tester bankTester = bankingFactory.createTester();
        ProjectManager bankPM = bankingFactory.createProjectManager();

        bankDev.writeCode();
        bankTester.testCode();
        bankPM.manageProject();

        System.out.println("\n-> System OS Team loyihasi (C++ oilasi):");
        ProjectTeamFactory systemFactory = new SystemTeamFactory();
        Developer sysDev = systemFactory.createDeveloper();
        Tester sysTester = systemFactory.createTester();
        ProjectManager sysPM = systemFactory.createProjectManager();

        sysDev.writeCode();
        sysTester.testCode();
        sysPM.manageProject();

        System.out.println("==================================================");
    }

    static DeveloperFactory createDeveloperFactoryBySpeciality(String speciality) {
        if ("Java".equalsIgnoreCase(speciality)) {
            return new JavaDeveloperFactory();
        } else if ("C++".equalsIgnoreCase(speciality)) {
            return new CppDeveloperFactory();
        } else {
            throw new RuntimeException(speciality + " is an empty or unknown speciality");
        }
    }
}
