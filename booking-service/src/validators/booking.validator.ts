import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.number({ message: "User id is required" }),
  hotelId: z.number({ message: "Hotel id is required" }),
  totalGuests: z
    .number({ message: "Total guests must be greater than 0" })
    .int()
    .min(1),
  bookingAmount: z.number().min(1),
});
