import exress from 'express';

import { createHotelHandler, getHotelByIdHandler } from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { hotelSchema } from '../../validators/hotel.validator';

const hotelRouter = exress.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema), createHotelHandler);
hotelRouter.get('/:id', getHotelByIdHandler);

export default hotelRouter;
