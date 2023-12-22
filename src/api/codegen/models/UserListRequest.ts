/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderDirectionType } from './OrderDirectionType';
import type { UserOrderByType } from './UserOrderByType';

export type UserListRequest = {
    skip?: number;
    take?: number;
    search?: string | null;
    orderBy?: UserOrderByType;
    orderDirection?: OrderDirectionType;
};
