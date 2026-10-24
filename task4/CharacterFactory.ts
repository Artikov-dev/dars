// saqlovchi

import { GameCharacter } from './GameCharacter.ts';

export class CharacterFactory {
    private character: GameCharacter;
    constructor(character: GameCharacter) { this.character = character.clone(); }
    setCharacter(character: GameCharacter) { this.character = character.clone(); }
    cloneCharacter() { return this.character.clone(); }
}
