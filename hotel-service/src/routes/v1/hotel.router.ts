import exress from 'express';

import {
    createHotelHandler,
    deleteHotelHandler,
    getAllHotelHandler,
    getHotelByIdHandler,
    updateHotelHandler,
} from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { hotelSchema, updateHotelSchema } from '../../validators/hotel.validator';

const hotelRouter = exress.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema), createHotelHandler);
hotelRouter.get('/', getAllHotelHandler);
hotelRouter.get('/:id', getHotelByIdHandler);
hotelRouter.put('/:id', validateRequestBody(updateHotelSchema), updateHotelHandler);
hotelRouter.delete('/:id', deleteHotelHandler);

export default hotelRouter;
