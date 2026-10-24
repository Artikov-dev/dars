import { GameCharacter } from './GameCharacter.ts';
import { CharacterStats } from './CharacterStats.ts';
import { CharacterFactory } from './CharacterFactory.ts';

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
