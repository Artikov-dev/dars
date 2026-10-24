import type { Copyable } from './Copyable.ts';
import { CharacterStats } from './CharacterStats.ts';

export class GameCharacter implements Copyable<GameCharacter> {
    private id: number; private name: string; private level: number; private weapon: string;
    private inventory: string[]; private stats: CharacterStats;

    constructor(id: number, name: string, level: number, weapon: string, inventory: string[], stats: CharacterStats) {
        this.id = id; this.name = name; this.level = level; this.weapon = weapon;
        this.inventory = inventory; this.stats = stats;
    }

    clone() {
        return new GameCharacter(this.id, this.name, this.level, this.weapon, [...this.inventory], this.stats.clone());
    }

    getId() { return this.id; }               setId(id: number) { this.id = id; }
    getName() { return this.name; }           setName(name: string) { this.name = name; }
    getLevel() { return this.level; }         setLevel(level: number) { this.level = level; }
    getWeapon() { return this.weapon; }       setWeapon(weapon: string) { this.weapon = weapon; }
    getInventory() { return this.inventory; }
    getStats() { return this.stats; }

    toString() {
        return `#${this.id} ${this.name} | ${this.level}-daraja | ${this.weapon} | [${this.inventory.join(", ")}] | ${this.stats}`;
    }
}
