export class HotelBooking {
    private bookings: Set<string> = new Set();

    bookRoom(guestName: string, hotelName: string, roomType: string): boolean {
        const key = `${guestName}:${hotelName}`;
        this.bookings.add(key);
        console.log(`  Mehmonxona bron qilindi: ${hotelName} (${roomType})`);
        return true;
    }

    cancelRoom(guestName: string, hotelName: string): boolean {
        const key = `${guestName}:${hotelName}`;
        if (this.bookings.has(key)) {
            this.bookings.delete(key);
            console.log(`  Mehmonxona bekor qilindi: ${hotelName}`);
            return true;
        }
        console.log(`  Mehmonxona topilmadi: ${hotelName}`);
        return false;
    }
}
