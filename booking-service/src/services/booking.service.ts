import {
  confirmBookingStatus,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { CreateBookingDto } from "../dto/booking.dto";
import { prisma } from "../config/prisma";

export async function createBookingService(bookingData: CreateBookingDto) {
  const booking = await createBooking({
    userId: bookingData.userId,
    hotelId: bookingData.hotelId,
    totalGuests: bookingData.totalGuests,
    bookingAmount: bookingData.bookingAmount,
  });

  const idempotencyKey = generateIdempotencyKey();
  await createIdempotencyKey(idempotencyKey, booking.id);

  return {
    bookingId: booking.id,
    idempotencyKey: idempotencyKey,
  };
}

export async function confirmBookingService(idempotencyKey: string) {
  return await prisma.$transaction(async (txn) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(
      idempotencyKey,
      txn,
    );

    if (!idempotencyKeyData || !idempotencyKeyData.bookingId) {
      throw new NotFoundError("Idempotency key not found");
    }

    if (idempotencyKeyData.finalized) {
      throw new BadRequestError("Booking already finalized");
    }

    const booking = await confirmBookingStatus(
      txn,
      idempotencyKeyData.bookingId,
    );
    await finalizeIdempotencyKey(txn, idempotencyKey);

    return booking;
  });
}
