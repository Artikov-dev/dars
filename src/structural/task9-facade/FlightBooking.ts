export class FlightBooking {
    private bookings: Set<string> = new Set();

    bookFlight(passengerName: string, flightNumber: string, fromCity: string, toCity: string): boolean {
        const key = `${passengerName}:${flightNumber}`;
        this.bookings.add(key);
        console.log(`  Aviachipta bron qilindi: ${flightNumber} (${fromCity} -> ${toCity})`);
        return true;
    }

    cancelFlight(passengerName: string, flightNumber: string): boolean {
        const key = `${passengerName}:${flightNumber}`;
        if (this.bookings.has(key)) {
            this.bookings.delete(key);
            console.log(`  Aviachipta bekor qilindi: ${flightNumber}`);
            return true;
        }
        console.log(`  Aviachipta topilmadi: ${flightNumber}`);
        return false;
    }
}
