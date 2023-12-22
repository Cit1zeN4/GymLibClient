/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FoodDayStatDto } from './FoodDayStatDto';
import type { NutritionalValue } from './NutritionalValue';

export type FoodStat = {
    toDay?: NutritionalValue;
    toDayLits?: FoodDayStatDto;
    lastWeek?: NutritionalValue;
    lastWeekList?: Array<FoodDayStatDto> | null;
};
