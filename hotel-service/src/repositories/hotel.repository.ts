import logger from '../config/logger';
import Hotel from '../db/models/hotel';
import { createHotelDTO, updateHotelDTO } from '../dto/hotel.dto';
import { NotFoundError } from '../utils/errors/app.error';

// create Hotel
export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create(hotelData);

    logger.info(`Hotel created successfully: ${hotel.id}`);

    return hotel;
}

// get Hotel By Id
export async function getHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel not found: ${id}`);
    }
    logger.info('Hotel found successfully: ', hotel);
    return hotel;
}

// get All Hotels
export async function getAllHotels() {
    const hotels = await Hotel.findAll({
        where: { deleted_at: null },
    });

    if (!hotels) {
        logger.error('Hotel not found');
        throw new NotFoundError('Hotel not found');
    }

    logger.info('Hotel found successfully: ', hotels);

    return hotels;
}

// delete Hotel By Id
export async function softDeleteHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel not found: ${id}`);
    }

    hotel.deleted_at = new Date();
    await hotel.save();

    logger.info(`Hotel deleted successfully: ${id}`);

    return hotel;
}

// update Hotel By Id
export async function updateHotelById(id: number, hotelData: updateHotelDTO) {
    const hotel = await Hotel.update(hotelData, { where: { id: id } });

    logger.info(`Hotel updated successfully: ${id}`);

    return hotel;
}
