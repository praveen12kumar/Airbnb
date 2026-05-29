import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
    createHotelService,
    deleteHotelByIdService,
    getAllHotelsService,
    getHotelByIdService,
    updateHotelByIdService,
} from '../services/hotel.service';

// create hotel handler
export async function createHotelHandler(req: Request, res: Response) {
    const hotelResponse = await createHotelService(req.body);
    res.status(StatusCodes.CREATED).json({
        message: 'Hotel created successfully',
        data: hotelResponse,
        success: true,
    });
}

// get hotel by id handler
export async function getHotelByIdHandler(req: Request, res: Response) {
    const hotelResponse = await getHotelByIdService(Number(req.params.id));
    res.status(StatusCodes.OK).json({
        message: 'Hotel fetched successfully',
        data: hotelResponse,
        success: true,
    });
}

// get all hotel handler
export async function getAllHotelHandler(req: Request, res: Response) {
    const hotelsResponse = await getAllHotelsService();
    res.status(StatusCodes.OK).json({
        message: 'Hotels fetched successfully',
        data: hotelsResponse,
        success: true,
    });
}

// delete hotel handler
export async function deleteHotelHandler(req: Request, res: Response) {
    await deleteHotelByIdService(Number(req.params.id));
    res.status(StatusCodes.OK).json({
        message: 'Hotel delete successfully',
        success: true,
    });
}

// update hotel handler
export async function updateHotelHandler(req: Request, res: Response) {
    const hotelResponse = await updateHotelByIdService(Number(req.params.id), req.body);
    res.status(StatusCodes.OK).json({
        message: 'Hotel updated successfully',
        success: true,
        data: hotelResponse,
    });
}
