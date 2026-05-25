import { Request, Response } from 'express';

import { createHotelService, getHotelByIdService } from '../services/hotel.service';

export async function createHotelHandler(req: Request, res: Response) {
    // 1. Call the service layer
    const hotelResponse = await createHotelService(req.body);
    // 2. send the response

    res.status(201).json({
        message: 'Hotel created successfully',
        data: hotelResponse,
        success: true,
    });
}

export async function getHotelByIdHandler(req: Request, res: Response) {
    // 1. Call the service layer
    const hotelResponse = await getHotelByIdService(Number(req.params.id));
    // 2. send the response

    res.status(201).json({
        message: 'Hotel fetched successfully',
        data: hotelResponse,
        success: true,
    });
}


export async function getAllHotelHandler(req: Request, res: Response) {
    res.status(501)
};


export async function deleteHotelHandler(req: Request, res: Response) {
    res.status(501)
};


export async function updateHotelHandler(req: Request, res: Response) {
    res.status(501)
};

