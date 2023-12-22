/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExerciseEntity } from '../models/ExerciseEntity';
import type { ExerciseEntityResponseData } from '../models/ExerciseEntityResponseData';
import type { ExerciseListRequest } from '../models/ExerciseListRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ExerciseService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns ExerciseEntityResponseData Success
     * @throws ApiError
     */
    public postList({
requestBody,
}: {
requestBody?: ExerciseListRequest,
}): CancelablePromise<ExerciseEntityResponseData> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/list',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @returns ExerciseEntity Success
     * @throws ApiError
     */
    public get({
id,
}: {
id: number,
}): CancelablePromise<ExerciseEntity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns ExerciseEntity Success
     * @throws ApiError
     */
    public get1({
slug,
}: {
slug: string,
}): CancelablePromise<ExerciseEntity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

    /**
     * @returns string Success
     * @throws ApiError
     */
    public getTags(): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tags',
        });
    }

}
