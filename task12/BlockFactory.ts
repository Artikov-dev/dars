import { BlockType } from './BlockType.ts';

const BLOCK_DATA: Record<string, { texture: string; color: string }> = {
    "Grass": { texture: "grass_block.png", color: "Yashil" },
    "Stone": { texture: "stone_block.png", color: "Kulrang" },
    "Dirt":  { texture: "dirt_block.png",  color: "Jigarrang" },
    "Water": { texture: "water_block.png", color: "Ko'k" },
};

export class BlockFactory {
    private static blockTypes: Map<string, BlockType> = new Map();

    static getBlockType(name: string): BlockType {
        let blockType = BlockFactory.blockTypes.get(name);

        if (!blockType) {
            const data = BLOCK_DATA[name];
            if (!data) throw new Error(`Noma'lum blok turi: ${name}`);
            blockType = new BlockType(name, data.texture, data.color);
            BlockFactory.blockTypes.set(name, blockType);
        }

        return blockType;
    }

    static getUniqueCount(): number {
        return BlockFactory.blockTypes.size;
    }

    static getAll(): BlockType[] {
        return [...BlockFactory.blockTypes.values()];
    }
}
