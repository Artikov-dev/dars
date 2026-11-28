import type { Command } from './Command.ts';
import type { AirConditioner } from './AirConditioner.ts';

export class AirConditionerOnCommand implements Command {
    private airConditioner: AirConditioner;

    constructor(airConditioner: AirConditioner) {
        this.airConditioner = airConditioner;
    }

    execute(): void {
        this.airConditioner.turnOn();
    }
}
