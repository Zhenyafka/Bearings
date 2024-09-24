import { Request, Response } from 'express';
import { getAllBearings, getAllBrands, getAllBearingsByPrice, getAllBearingsByBrand } from '../components/db';

export const getBearings = async (req: Request, res: Response) => {
    try {
        res.send(await getAllBearings());
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error fetching bearings');
    }
};

export const getBrands = async (req: Request, res: Response) => {
    try {
        res.send(await getAllBrands());
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error fetching bearings');
    }
};

export const getBearingsByPrice = async (req: Request, res: Response) => {
    try {
        res.send(await getAllBearingsByPrice());
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error fetching bearings');
    }
};

export const getBearingsByBrand = async (req: Request, res: Response) => {
    try {
        res.send(await getAllBearingsByBrand());
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error fetching bearings');
    }
};