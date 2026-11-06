import type { Game } from './Game.ts';
import { JavaDeveloper } from './JavaDeveloper.ts';
import { CppDeveloper } from './CppDeveloper.ts';
import { RacingGame } from './RacingGame.ts';
import { FootballGame } from './FootballGame.ts';

export class Main {
    static main() {
        const java = new JavaDeveloper();
        const cpp = new CppDeveloper();

        const games: Game[] = [
            new RacingGame(java),
            new RacingGame(cpp),
            new FootballGame(java),
            new FootballGame(cpp),
        ];

        games.forEach(game => game.create());
    }
}

Main.main();
