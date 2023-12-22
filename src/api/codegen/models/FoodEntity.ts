/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductWeightEntity } from './ProductWeightEntity';
import type { UserEntity } from './UserEntity';

export type FoodEntity = {
    id?: number;
    name?: string | null;
    date?: string;
    products?: Array<ProductWeightEntity> | null;
    userId?: number;
    user?: UserEntity;
};
