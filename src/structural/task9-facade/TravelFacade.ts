import { FlightBooking } from './FlightBooking.ts';
import { HotelBooking } from './HotelBooking.ts';
import { Payment } from './Payment.ts';
import type { TripDetails } from './TripDetails.ts';

export class TravelFacade {
    private flightBooking: FlightBooking;
    private hotelBooking: HotelBooking;
    private payment: Payment;
    private activeBookings: Map<string, TripDetails> = new Map();

    constructor(
        flightBooking: FlightBooking = new FlightBooking(),
        hotelBooking: HotelBooking = new HotelBooking(),
        payment: Payment = new Payment()
    ) {
        this.flightBooking = flightBooking;
        this.hotelBooking = hotelBooking;
        this.payment = payment;
    }

    bookTrip(trip: TripDetails): boolean {
        console.log(`Sayohat bron qilish (${trip.travelerName}):`);

        const currency = trip.currency ?? "USD";

        this.flightBooking.bookFlight(
            trip.travelerName,
            trip.flightNumber,
            trip.fromCity,
            trip.toCity
        );

        this.hotelBooking.bookRoom(
            trip.travelerName,
            trip.hotelName,
            trip.roomType
        );

        const paymentSuccess = this.payment.makePayment(
            trip.travelerName,
            trip.amount,
            currency
        );

        if (!paymentSuccess) {
            this.flightBooking.cancelFlight(trip.travelerName, trip.flightNumber);
            this.hotelBooking.cancelRoom(trip.travelerName, trip.hotelName);
            console.log("Xatolik: Sayohat bron qilinmadi.\n");
            return false;
        }

        this.activeBookings.set(trip.travelerName, trip);
        console.log("Sayohat muvaffaqiyatli bron qilindi.\n");
        return true;
    }

    cancelTrip(travelerNameOrTrip: string | TripDetails): boolean {
        let trip: TripDetails | undefined;

        if (typeof travelerNameOrTrip === 'string') {
            trip = this.activeBookings.get(travelerNameOrTrip);
            if (!trip) {
                console.log(`Sayohat topilmadi: ${travelerNameOrTrip}\n`);
                return false;
            }
        } else {
            trip = travelerNameOrTrip;
        }

        console.log(`Sayohatni bekor qilish (${trip.travelerName}):`);

        const currency = trip.currency ?? "USD";

        this.flightBooking.cancelFlight(trip.travelerName, trip.flightNumber);
        this.hotelBooking.cancelRoom(trip.travelerName, trip.hotelName);
        this.payment.refundPayment(trip.travelerName, trip.amount, currency);

        this.activeBookings.delete(trip.travelerName);
        console.log("Sayohat bekor qilindi.\n");
        return true;
    }
}
