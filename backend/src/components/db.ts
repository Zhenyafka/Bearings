import { Bearings, Brands } from '../models/table';
import {Pool} from 'pg';

const dbConfig = {
    user: 'root',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
};

export const pool = new Pool(dbConfig);

export async function getAllBrands(): Promise<Brands[]> {
    const query = 'SELECT * FROM brand';
    const result = await pool.query(query);
    return result.rows as Brands[];
}

export async function getAllBearings(): Promise<Bearings[]> {
    const query = 'SELECT * FROM bearings';
    const result = await pool.query(query);
    return result.rows as Bearings[];
}

export async function getAllBearingsByPrice(): Promise<Bearings[]> {
    const query = 'SELECT * FROM bearings ORDER BY price DESC';
    const result = await pool.query(query);
    return result.rows as Bearings[];
}

export async function getAllBearingsByBrand(): Promise<Bearings[]> {
    const query = 'SELECT * FROM bearings WHERE brand_id = $1';
    const result = await pool.query(query, ['SKF']);
    return result.rows as Bearings[];
}