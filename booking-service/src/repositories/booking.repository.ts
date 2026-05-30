import {prisma} from "../config/prisma"
import { Prisma } from "../generated/prisma/client"

export async function createBooking(bookingData: Prisma.BookingCreateInput) {
    const booking = await prisma.booking.create({
        data: bookingData
    })
    return booking
}