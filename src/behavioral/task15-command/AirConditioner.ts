export class AirConditioner {
    private location: string;
    private on = false;

    constructor(location: string) {
        this.location = location;
    }

    turnOn(): void {
        this.on = true;
        console.log(`${this.location} konditsioneri yoqildi`);
    }

    turnOff(): void {
        this.on = false;
        console.log(`${this.location} konditsioneri o'chirildi`);
    }

    isOn(): boolean {
        return this.on;
    }
}
