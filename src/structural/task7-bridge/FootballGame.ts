import { Game } from './Game.ts';

export class FootballGame extends Game {
    create() {
        console.log(`[Futbol o'yini] ${this.developer.writeCode()} -> FootballGame tayyor`);
    }
}
