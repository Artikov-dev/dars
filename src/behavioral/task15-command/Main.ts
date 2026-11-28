import { Light } from './Light.ts';
import { AirConditioner } from './AirConditioner.ts';
import { LightOnCommand } from './LightOnCommand.ts';
import { LightOffCommand } from './LightOffCommand.ts';
import { AirConditionerOnCommand } from './AirConditionerOnCommand.ts';
import { AirConditionerOffCommand } from './AirConditionerOffCommand.ts';
import { RemoteControl } from './RemoteControl.ts';

export class Main {
    static main() {
        const light = new Light("Mehmonxona");
        const airConditioner = new AirConditioner("Yotoqxona");

        const remote = new RemoteControl();
        remote.setCommand("1", new LightOnCommand(light));
        remote.setCommand("2", new LightOffCommand(light));
        remote.setCommand("3", new AirConditionerOnCommand(airConditioner));
        remote.setCommand("4", new AirConditionerOffCommand(airConditioner));

        remote.pressButton("1");
        remote.pressButton("3");
        console.log(`\nChiroq: ${light.isOn() ? "yoniq" : "o'chiq"} | Konditsioner: ${airConditioner.isOn() ? "yoniq" : "o'chiq"}\n`);

        remote.pressButton("2");
        remote.pressButton("4");
        console.log(`\nChiroq: ${light.isOn() ? "yoniq" : "o'chiq"} | Konditsioner: ${airConditioner.isOn() ? "yoniq" : "o'chiq"}\n`);

        remote.pressButton("5");
    }
}

Main.main();
