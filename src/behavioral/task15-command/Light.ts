export class Light {
    private location: string;
    private on = false;

    constructor(location: string) {
        this.location = location;
    }

    turnOn(): void {
        this.on = true;
        console.log(`${this.location} chirog'i yoqildi`);
    }

    turnOff(): void {
        this.on = false;
        console.log(`${this.location} chirog'i o'chirildi`);
    }

    isOn(): boolean {
        return this.on;
    }
}
