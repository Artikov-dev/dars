import { Block } from './Block.ts';
import { BlockFactory } from './BlockFactory.ts';

export class World {
    private blocks: Block[] = [];

    addBlock(x: number, y: number, z: number, typeName: string): void {
        const type = BlockFactory.getBlockType(typeName);
        this.blocks.push(new Block(x, y, z, type));
    }

    render(): void {
        console.log(`\nO'yin dunyosi (${this.blocks.length} ta blok):\n`);
        for (const block of this.blocks) {
            console.log(`  ${block.render()}`);
        }
        console.log(`\nJami bloklar soni: ${this.blocks.length}`);
        console.log(`Noyob BlockType obyektlari: ${BlockFactory.getUniqueCount()}`);
    }

    getBlocks(): Block[] {
        return [...this.blocks];
    }
}
