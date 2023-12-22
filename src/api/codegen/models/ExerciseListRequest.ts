/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExerciseOrderByType } from './ExerciseOrderByType';
import type { ExerciseSearchByType } from './ExerciseSearchByType';
import type { OrderDirectionType } from './OrderDirectionType';

export type ExerciseListRequest = {
    skip?: number;
    take?: number;
    search?: string | null;
    searchBy?: ExerciseSearchByType;
    orderBy?: ExerciseOrderByType;
    orderDirection?: OrderDirectionType;
};
