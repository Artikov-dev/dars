public class SystemTeamFactory implements ProjectTeamFactory {
    @Override
    public Developer createDeveloper() {
        return new CppDeveloper();
    }

    @Override
    public Tester createTester() {
        return new NativeTester();
    }

    @Override
    public ProjectManager createProjectManager() {
        return new SystemPM();
    }
}
