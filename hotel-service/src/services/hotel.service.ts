import { createHotelDTO, updateHotelDTO } from '../dto/hotel.dto';
import {
    createHotel,
    getAllHotels,
    getHotelById,
    softDeleteHotelById,
    updateHotelById,
} from '../repositories/hotel.repository';
import { NotFoundError } from '../utils/errors/app.error';

// create hotel service
export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

// get hotel by id service
export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    return hotel;
}

// get all hotel service
export async function getAllHotelsService() {
    const hotels = await getAllHotels();
    return hotels;
}

// delete hotel by id service
export async function deleteHotelByIdService(id: number) {
    await softDeleteHotelById(id);
    return true;
}

// update hotel service
export async function updateHotelByIdService(id: number, hotelData: updateHotelDTO) {
    const isHotel = await getHotelById(id);
    if (!isHotel) {
        throw new NotFoundError('Hotel not found');
    }
    const hotel = await updateHotelById(id, hotelData);
    return hotel;
}
