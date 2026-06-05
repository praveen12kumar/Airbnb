import { Request, Response } from "express";
import {
  confirmBookingService,
  createBookingService,
} from "../services/booking.service";
import statusCode from "http-status-codes";

export const createBookingHandler = async (req: Request, res: Response) => {
  const { userId, hotelId, totalGuests, bookingAmount } = req.body;

  const booking = await createBookingService({
    userId,
    hotelId,
    totalGuests,
    bookingAmount,
  });

  res.status(statusCode.CREATED).json({
    success: true,
    data: booking,
    message: "Booking created successfully",
  });
};

export const confirmBookingHandler = async (req: Request<{idempotencyKey: string}>, res: Response) => {
  const { idempotencyKey } = req.params;
  const booking = await confirmBookingService(idempotencyKey);

  res.status(statusCode.CREATED).json({
    success: true,
    data: booking,
    message: "Booking created successfully",
  });
};
