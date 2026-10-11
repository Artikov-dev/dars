import type { ProjectManager } from './ProjectManager.ts';

export class SystemPM implements ProjectManager {
    public manageProject(): void {
        console.log("System PM manages C++ Operating System project");
    }
}
