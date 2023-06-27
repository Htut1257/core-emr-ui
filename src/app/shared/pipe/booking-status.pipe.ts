

import { Pipe, PipeTransform } from '@angular/core';
import { Booking } from 'src/app/core/model/booking.model';
@Pipe({
    name: 'bookingStatus'
})
export class BookingStatus implements PipeTransform {

    transform(value: Booking): unknown {
        return this.getStatus(value);
    }

    getStatus(book: Booking): String {
        let status = ""
        switch (book.statusLevel) {
            case 1: {
                status = "Confirm"
                break
            }
            case 2: {
                status = "Arrival"
                break
            }
            case 3: {
                status = "Vital Sign"
                break
            }
            case 4: {
                status = "Vital Sign"
                break
            }
            case 5: {
                status = "booking Status 5"
                break
            }
            case 6: {
                status = "booking Status 6"
                break
            }
            case 7: {
                status = "booking Status 7"
                break
            }
            case 8: {
                status = "booking Status 8"
                break
            }
        }
        return status
    }

}