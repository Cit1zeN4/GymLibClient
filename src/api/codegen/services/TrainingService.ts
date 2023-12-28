/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TrainingFullResponse } from '../models/TrainingFullResponse';
import type { TrainingRequest } from '../models/TrainingRequest';
import type { TrainingSetShortDtoResponseData } from '../models/TrainingSetShortDtoResponseData';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TrainingService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns TrainingFullResponse Success
     * @throws ApiError
     */
    public getTraining({
id,
}: {
id?: number,
}): CancelablePromise<TrainingFullResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/training',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public postTraining({
requestBody,
}: {
requestBody?: TrainingRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/training',
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
    public putTraining({
id,
requestBody,
}: {
id?: number,
requestBody?: TrainingRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/training',
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
    public deleteTraining({
id,
}: {
id?: number,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/training',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns TrainingSetShortDtoResponseData Success
     * @throws ApiError
     */
    public getTrainingUserTrainings({
userId,
skip,
take,
search,
}: {
userId?: number,
skip?: number,
take?: number,
search?: string,
}): CancelablePromise<TrainingSetShortDtoResponseData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/training/user-trainings',
            query: {
                'userId': userId,
                'skip': skip,
                'take': take,
                'search': search,
            },
        });
    }

}
