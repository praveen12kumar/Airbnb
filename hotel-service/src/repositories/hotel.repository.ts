import logger from '../config/logger';
import Hotel from '../db/models/hotel';
import { createHotelDTO } from '../dto/hotel.dto';
import { NotFoundError } from '../utils/errors/app.error';

export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create(hotelData);

    logger.info(`Hotel created successfully: ${hotel.id}`);

    return hotel;
}

export async function getHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel not found: ${id}`);
    }
    logger.info('Hotel found successfully: ', hotel);
    return hotel;
}
