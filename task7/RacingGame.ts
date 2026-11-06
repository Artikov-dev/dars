import { Game } from './Game.ts';

export class RacingGame extends Game {
    create() {
        console.log(`[Poyga o'yini] ${this.developer.writeCode()} -> RacingGame tayyor`);
    }
}
