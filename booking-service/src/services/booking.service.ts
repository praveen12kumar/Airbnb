import {
  confirmBookingStatus,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repository";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { CreateBookingDto } from "../dto/booking.dto";
import { prisma } from "../config/prisma";
import { redlock } from "../config/redis.config";
import { serverConfig } from "../config";

export async function createBookingService(bookingData: CreateBookingDto) {
  const ttl = serverConfig.LOCK_TTL;
  const bookingResource = `hotel:${bookingData.hotelId}`;

  try {
     await redlock.acquire([bookingResource], ttl);

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
      idempotencyKey,
    };
  } catch (err) {
    throw new InternalServerError("Could not create booking, please try again");
  }
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
