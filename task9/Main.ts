import { TravelFacade } from './TravelFacade.ts';
import type { TripDetails } from './TripDetails.ts';

export class Main {
    static main() {
        const travel = new TravelFacade();

        const trip: TripDetails = {
            travelerName: "Anvar Karimov",
            fromCity: "Toshkent",
            toCity: "Dubay",
            flightNumber: "HY-333",
            hotelName: "Burj Al Arab",
            roomType: "Deluxe Suite",
            amount: 1500,
            currency: "USD"
        };

        travel.bookTrip(trip);
        travel.cancelTrip(trip.travelerName);
    }
}

Main.main();
