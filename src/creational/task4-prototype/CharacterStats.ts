// ichki obyekt

import type { Copyable } from './Copyable.ts';

export class CharacterStats implements Copyable<CharacterStats> {
    hp: number;
    mana: number;
    constructor(hp: number, mana: number) { this.hp = hp; this.mana = mana; }
    clone() { return new CharacterStats(this.hp, this.mana); }
    toString() { return `jon ${this.hp}, sehr ${this.mana}`; }
}
