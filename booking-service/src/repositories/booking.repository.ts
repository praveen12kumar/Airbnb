import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import { validate as isValidUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { IdempotencyKey } from "../generated/prisma/client";

export async function createBooking(bookingData: Prisma.BookingCreateInput) {
  const booking = await prisma.booking.create({
    data: bookingData,
  });
  return booking;
}

export async function createIdempotencyKey(key: string, bookingId: number) {
  const idempotencyKey = await prisma.idempotencyKey.create({
    data: {
      idemkey: key,
      booking: {
        connect: { id: bookingId },
      },
    },
  });
  return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(
  key: string,
  txn: Prisma.TransactionClient,
) {
  if (!isValidUUID(key)) {
    throw new BadRequestError("Invalid idempotency key format");
  }

  const idempotencyKey: Array<IdempotencyKey> = await txn.$queryRaw`
    SELECT * FROM IdempotencyKey
    WHERE idemkey = ${key}
    FOR UPDATE
  ;`;

  if (!idempotencyKey || idempotencyKey.length === 0) {
    throw new NotFoundError("Idempotency key not found");
  }
  return idempotencyKey[0];
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

export async function confirmBookingStatus(
  txn: Prisma.TransactionClient,
  bookingId: number,
) {
  const booking = await txn.booking.update({
    where: { id: bookingId },
    data: {
      status: "CONFIRMED",
    },
  });
  return booking;
}

export async function cancelBookingStatus(bookingId: number) {
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CANCELLED",
    },
  });
  return booking;
}

export async function finalizeIdempotencyKey(
  txn: Prisma.TransactionClient,
  key: string,
) {
  const idempotencyKey = await txn.idempotencyKey.update({
    where: { idemkey: key },
    data: { finalized: true },
  });
  return idempotencyKey;
}
