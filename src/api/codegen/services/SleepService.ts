/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SleepRequest } from '../models/SleepRequest';
import type { SleepResponse } from '../models/SleepResponse';
import type { SleepResponseResponseData } from '../models/SleepResponseResponseData';
import type { SleepUpdateRequest } from '../models/SleepUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SleepService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns SleepResponseResponseData Success
     * @throws ApiError
     */
    public getSleep({
dateStart,
dateEnd,
skip,
take,
}: {
dateStart?: string,
dateEnd?: string,
skip?: number,
take?: number,
}): CancelablePromise<SleepResponseResponseData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sleep',
            query: {
                'dateStart': dateStart,
                'dateEnd': dateEnd,
                'skip': skip,
                'take': take,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns SleepResponse Success
     * @throws ApiError
     */
    public postSleep({
requestBody,
}: {
requestBody?: SleepRequest,
}): CancelablePromise<SleepResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sleep',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public putSleep({
id,
requestBody,
}: {
id?: number,
requestBody?: SleepUpdateRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/sleep',
            query: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public deleteSleep({
id,
}: {
id?: number,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/sleep',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
