import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

export async function createBooking(bookingData: Prisma.BookingCreateInput) {
  const booking = await prisma.booking.create({
    data: bookingData,
  });
  return booking;
}

export async function createIdempotencyKey(key: string, bookingId: number) {
  const idempotencyKey = await prisma.idempotencyKey.create({
    data: {
      key,
      booking: {
        connect: { id: bookingId },
      },
    },
  });
  return idempotencyKey;
}

export async function getIdempotencyKey(key: string) {
  const idempotencyKey = await prisma.idempotencyKey.findUnique({
    where: { key },
  });
  return idempotencyKey;
}

export async function getBookingById(bookingId: number) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });
  return booking;
}


// export async function changeBookingStatus(bookingId: number, 
//         status: Prisma.EnumBookingStatusFieldUpdateOperationsInput
//       ) {
//   const booking = await prisma.booking.update({
//     where: { id: bookingId },
//     data: { status },
//   });
//   return booking;
// }

/**
 *  Problems  
 * ticket: pending --> confirmed  --> cancelled
 * ticket: pending --> cancelled
 * This function can change the status of a booking to either confirmed or cancelled, 
 * but it does not enforce the valid state transitions.
 * 
 * Solution
 * To enforce valid state transitions, we can implement a check before updating the booking status.
 */



export async function confirmBookingStatus(bookingId: number) {
  const booking = await prisma.booking.update({
    where: {id: bookingId},
    data:{
      status: "CONFIRMED"
    }
  })
  return booking;
}

export async function cancelBookingStatus(bookingId: number) {
  const booking = await prisma.booking.update({
    where: {id: bookingId},
    data:{
      status: "CANCELLED"
    }
  })
  return booking;
}

export async function finalizeIdempotencyKey(key: string) {
  const idempotencyKey = await prisma.idempotencyKey.update({
    where: { key },
    data: { finalized: true },
  });
  return idempotencyKey;
}
