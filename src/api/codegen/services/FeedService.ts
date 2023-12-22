/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleEntityResponseData } from '../models/ArticleEntityResponseData';
import type { FeedListRequest } from '../models/FeedListRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FeedService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns ArticleEntityResponseData Success
     * @throws ApiError
     */
    public postFeed({
requestBody,
}: {
requestBody?: FeedListRequest,
}): CancelablePromise<ArticleEntityResponseData> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/feed',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
