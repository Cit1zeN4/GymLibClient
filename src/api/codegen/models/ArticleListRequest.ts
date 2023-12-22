/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleOrderByType } from './ArticleOrderByType';
import type { OrderDirectionType } from './OrderDirectionType';

export type ArticleListRequest = {
    skip?: number;
    take?: number;
    search?: string | null;
    orderBy?: ArticleOrderByType;
    orderDirection?: OrderDirectionType;
};
