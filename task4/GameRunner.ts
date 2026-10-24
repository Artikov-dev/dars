import { GameCharacter } from './GameCharacter.ts';
import { CharacterStats } from './CharacterStats.ts';
import { CharacterFactory } from './CharacterFactory.ts';

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
