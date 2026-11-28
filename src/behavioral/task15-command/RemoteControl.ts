import type { Command } from './Command.ts';

export class RemoteControl {
    private buttons: Map<string, Command> = new Map();

    setCommand(button: string, command: Command): void {
        this.buttons.set(button, command);
    }

    pressButton(button: string): void {
        const command = this.buttons.get(button);
        if (!command) {
            console.log(`"${button}" tugmasiga komanda biriktirilmagan`);
            return;
        }
        console.log(`> "${button}" tugmasi bosildi`);
        command.execute();
    }
}
