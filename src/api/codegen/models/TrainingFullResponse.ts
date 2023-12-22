/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TrainingSetFullDto } from './TrainingSetFullDto';

export type TrainingFullResponse = {
    id?: number;
    name?: string | null;
    isPublic?: boolean;
    authorId?: number;
    sets?: Array<TrainingSetFullDto> | null;
};
