/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FoodStat } from '../models/FoodStat';
import type { SleepStat } from '../models/SleepStat';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class StatService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns FoodStat Success
     * @throws ApiError
     */
    public getStatFood(): CancelablePromise<FoodStat> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stat/food',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns SleepStat Success
     * @throws ApiError
     */
    public getStatSleep(): CancelablePromise<SleepStat> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stat/sleep',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
