/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FoodEntity } from './FoodEntity';

export type ProductEntity = {
    id?: number;
    name?: string | null;
    proteins?: number;
    fats?: number;
    carbohydrates?: number;
    kcal?: number;
    foods?: Array<FoodEntity> | null;
};
