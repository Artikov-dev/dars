import type { Command } from './Command.ts';
import type { Light } from './Light.ts';

export class LightOffCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.turnOff();
    }
}
