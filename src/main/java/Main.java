public class Main {
    public static void main(String[] args) {
        DeveloperFactory developerFactory = createDeveloperFactoryBySpeciality("C++");
        Developer developer = developerFactory.createDeveloper();
        developer.writeCode();
    }

    static DeveloperFactory createDeveloperFactoryBySpeciality(String speciality) {
        if (speciality.equals("Java")) {
            return new JavaDeveloperFactory();
        } else if (speciality.equals("C++")) {
            return new CppDeveloperFactory();
        } else {
            throw new RuntimeException(speciality + "empty speciality");
        }
    }

}
