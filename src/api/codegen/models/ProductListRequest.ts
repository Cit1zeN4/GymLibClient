/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderDirectionType } from './OrderDirectionType';
import type { ProductOrderType } from './ProductOrderType';

export type ProductListRequest = {
    skip?: number;
    take?: number;
    search?: string | null;
    orderBy?: ProductOrderType;
    orderDirection?: OrderDirectionType;
};
