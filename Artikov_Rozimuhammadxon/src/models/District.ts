import type { ILight } from '../core/interfaces/ILight.ts';
import type { IVehicle } from '../core/interfaces/IVehicle.ts';

export interface DistrictData {
    name: string;
    type: string;
    population: number;
    lights: ILight[];
    vehicles: IVehicle[];
    cameras: string[];
    energyLimit: number;
}

export class District {
    private data: DistrictData;

    constructor(data: DistrictData) {
        this.data = { ...data, lights: [...data.lights], vehicles: [...data.vehicles], cameras: [...data.cameras] };
    }

    getName() { return this.data.name; }
    getType() { return this.data.type; }
    getPopulation() { return this.data.population; }
    getLights() { return [...this.data.lights]; }
    getVehicles() { return [...this.data.vehicles]; }
    getCameras() { return [...this.data.cameras]; }
    getEnergyLimit() { return this.data.energyLimit; }

    replaceLight(id: string, upgraded: ILight): boolean {
        const index = this.data.lights.findIndex(l => l.getId().toLowerCase() === id.trim().toLowerCase());
        if (index === -1) return false;
        this.data.lights[index] = upgraded;
        return true;
    }

    removeVehicle(id: string): boolean {
        const index = this.data.vehicles.findIndex(v => v.getId().toLowerCase() === id.trim().toLowerCase());
        if (index === -1) return false;
        this.data.vehicles.splice(index, 1);
        return true;
    }

    describe() {
        const d = this.data;
        return `${d.name} (${d.type}) | aholi: ${d.population} | ${d.lights.length} chiroq | ` +
            `${d.vehicles.length} transport | ${d.cameras.length} kamera | limit ${d.energyLimit} kW`;
    }
}
