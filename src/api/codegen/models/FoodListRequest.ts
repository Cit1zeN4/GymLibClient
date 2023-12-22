/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FoodOrderType } from './FoodOrderType';
import type { OrderDirectionType } from './OrderDirectionType';

export type FoodListRequest = {
    skip?: number;
    take?: number;
    search?: string | null;
    dateStart?: string | null;
    dateEnd?: string | null;
    orderBy?: FoodOrderType;
    orderDirection?: OrderDirectionType;
};
