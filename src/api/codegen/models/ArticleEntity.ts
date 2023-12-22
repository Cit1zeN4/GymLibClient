/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';

export type ArticleEntity = {
    id?: number;
    title?: string | null;
    text?: string | null;
    createdAt?: string;
    userId?: number;
    user?: UserEntity;
    views?: number;
};
