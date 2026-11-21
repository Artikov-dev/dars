import { Block } from './Block.ts';
import { BlockFactory } from './BlockFactory.ts';

export class World {
    private blocks: Block[] = [];

    addBlock(x: number, y: number, z: number, typeName: string): void {
        const type = BlockFactory.getBlockType(typeName);
        this.blocks.push(new Block(x, y, z, type));
    }

    render(): void {
        for (const block of this.blocks) {
            console.log(block.render());
        }
        console.log(`\nBloklar: ${this.blocks.length} | Noyob turlar: ${BlockFactory.getUniqueCount()}`);
    }

    getBlocks(): Block[] {
        return [...this.blocks];
    }
}
