import { ProjectManager } from './ProjectManager.js';

export class BankingPM implements ProjectManager {
    public manageProject(): void {
        console.log("Banking PM manages Enterprise Banking project");
    }
}
