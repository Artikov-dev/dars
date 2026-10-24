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
        const c1 = factory.cloneCharacter();
        const c2 = factory.cloneCharacter();

        const edit = (c: GameCharacter, id: number, name: string, level: number, weapon: string, item: string) => {
            c.setId(id); c.setName(name); c.setLevel(level); c.setWeapon(weapon); c.getInventory().push(item);
        };
        edit(c1, 2, "Barchinoy", 15, "Kamon", "O'qlar");
        edit(c2, 3, "Go'ro'g'li", 20, "Nayza", "Qalqon");
        c1.getStats().hp = 80;
        c2.getStats().mana = 200;

        console.log(`Original: ${original}\nNusxa 1 : ${c1}\nNusxa 2 : ${c2}\n`);

        const ha = (v: boolean) => (v ? "ha" : "yo'q");
        console.log("Original va nusxa bitta obyektmi? :", ha(original === c1));
        console.log("Ikki nusxa bitta obyektmi?        :", ha(c1 === c2));
        console.log("Inventar umumiymi?                :", ha(original.getInventory() === c1.getInventory()));
        console.log("Ko'rsatkichlar umumiymi?          :", ha(original.getStats() === c1.getStats()));
        console.log("Original o'zgarmay qoldimi?       :", ha(original.toString() === before));
    }
}

GameRunner.main();
