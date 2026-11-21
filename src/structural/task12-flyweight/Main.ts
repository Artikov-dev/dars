import { World } from './World.ts';
import { BlockFactory } from './BlockFactory.ts';

export class Main {
    static main() {
        const world = new World();

        world.addBlock(0, 0, 0, "Grass");
        world.addBlock(1, 0, 0, "Grass");
        world.addBlock(2, 0, 0, "Stone");
        world.addBlock(3, 0, 0, "Grass");
        world.addBlock(4, 0, 0, "Dirt");

        world.render();

        const blocks = world.getBlocks();

        console.log(`\nGrass === Grass: ${blocks[0].getType() === blocks[1].getType()}`);
        console.log(`Grass === Stone: ${blocks[0].getType() === blocks[2].getType()}`);
    }
}

Main.main();
