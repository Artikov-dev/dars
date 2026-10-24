export interface Copyable<T> {
    clone(): T;
}

export class CharacterStats implements Copyable<CharacterStats> {
    hp: number;
    mana: number;

    constructor(hp: number, mana: number) { this.hp = hp; this.mana = mana; }

    clone() { return new CharacterStats(this.hp, this.mana); }
    toString() { return `jon ${this.hp}, sehr ${this.mana}`; }
}

export class GameCharacter implements Copyable<GameCharacter> {
    private id: number;
    private name: string;
    private level: number;
    private weapon: string;
    private inventory: string[];    
    private stats: CharacterStats;  
    constructor(id: number, name: string, level: number, weapon: string,
                inventory: string[] = [], stats = new CharacterStats(100, 50)) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.weapon = weapon;
        this.inventory = inventory;
        this.stats = stats;
    }

    clone() {
        return new GameCharacter(this.id, this.name, this.level, this.weapon,
            [...this.inventory], this.stats.clone());
    }

    getId() { return this.id; }
    setId(id: number) { this.id = id; }
    getName() { return this.name; }
    setName(name: string) { this.name = name; }
    getLevel() { return this.level; }
    setLevel(level: number) { this.level = level; }
    getWeapon() { return this.weapon; }
    setWeapon(weapon: string) { this.weapon = weapon; }
    getInventory() { return this.inventory; }
    getStats() { return this.stats; }

    toString() {
        return `#${this.id} ${this.name} | ${this.level}-daraja | ${this.weapon} | [${this.inventory.join(', ')}] | ${this.stats}`;
    }
}

export class CharacterFactory {
    private character: GameCharacter;

    constructor(character: GameCharacter) { this.character = character.clone(); }

    setCharacter(character: GameCharacter) { this.character = character.clone(); }

    cloneCharacter() { return this.character.clone(); }
}

export class GameRunner {
    static main() {
        const original = new GameCharacter(1, "Alpomish", 10, "Qilich", ["Dori"], new CharacterStats(100, 50));
        const before = original.toString();
        const factory = new CharacterFactory(original);
        const clone1 = factory.cloneCharacter();
        const clone2 = factory.cloneCharacter();

        clone1.setId(2); clone1.setName("Barchinoy"); clone1.setLevel(15); clone1.setWeapon("Kamon");
        clone1.getInventory().push("O'qlar");
        clone1.getStats().hp = 80;

        clone2.setId(3); clone2.setName("Go'ro'g'li"); clone2.setLevel(20); clone2.setWeapon("Nayza");
        clone2.getInventory().push("Qalqon");
        clone2.getStats().mana = 200;

        console.log("Original:", original.toString());
        console.log("Nusxa 1 :", clone1.toString());
        console.log("Nusxa 2 :", clone2.toString());
        const ha = (v: boolean) => (v ? "ha" : "yo'q");
        console.log("\nOriginal va nusxa bitta obyektmi? :", ha(original === clone1));
        console.log("Ikki nusxa bitta obyektmi?        :", ha(clone1 === clone2));
        console.log("Inventar umumiymi?                :", ha(original.getInventory() === clone1.getInventory()));
        console.log("Ko'rsatkichlar umumiymi?          :", ha(original.getStats() === clone1.getStats()));
        console.log("Original o'zgarmay qoldimi?       :", ha(original.toString() === before));
    }
}

GameRunner.main();
