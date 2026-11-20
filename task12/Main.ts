import { World } from './World.ts';
import { BlockFactory } from './BlockFactory.ts';

export class Main {
    static main() {
        console.log("==================================================");
        console.log("   MINECRAFT DUNYO TIZIMI (FLYWEIGHT PATTERN)");
        console.log("==================================================");

        const world = new World();

        world.addBlock(0, 0, 0, "Grass");
        world.addBlock(1, 0, 0, "Grass");
        world.addBlock(2, 0, 0, "Stone");
        world.addBlock(3, 0, 0, "Grass");
        world.addBlock(4, 0, 0, "Dirt");

        world.render();

        console.log("\n--- Flyweight tekshiruvi (== orqali) ---\n");

        const blocks = world.getBlocks();
        const grass1 = blocks[0].getType();
        const grass2 = blocks[1].getType();
        const grass3 = blocks[3].getType();
        const stone = blocks[2].getType();

        console.log(`  Grass blok #1 === Grass blok #2: ${grass1 === grass2}`);
        console.log(`  Grass blok #1 === Grass blok #4: ${grass1 === grass3}`);
        console.log(`  Grass blok #1 === Stone blok #3: ${grass1 === stone}`);

        console.log(`\n  Noyob BlockType obyektlari soni: ${BlockFactory.getUniqueCount()}`);
        console.log(`  BlockType ro'yxati: ${BlockFactory.getAll().map(b => b.getName()).join(", ")}`);

        console.log("\n==================================================");
    }
}

Main.main();
