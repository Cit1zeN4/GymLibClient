/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleEntity } from '../models/ArticleEntity';
import type { ArticleEntityResponseData } from '../models/ArticleEntityResponseData';
import type { ArticleListRequest } from '../models/ArticleListRequest';
import type { ArticleRequest } from '../models/ArticleRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ArticleService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns ArticleEntityResponseData Success
     * @throws ApiError
     */
    public postArticleList({
requestBody,
}: {
requestBody?: ArticleListRequest,
}): CancelablePromise<ArticleEntityResponseData> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/article/list',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @returns ArticleEntity Success
     * @throws ApiError
     */
    public getArticle({
id,
}: {
id?: number,
}): CancelablePromise<ArticleEntity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/article',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @returns ArticleEntity Success
     * @throws ApiError
     */
    public postArticle({
requestBody,
}: {
requestBody?: ArticleRequest,
}): CancelablePromise<ArticleEntity> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/article',
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
    public putArticle({
id,
requestBody,
}: {
id?: number,
requestBody?: ArticleRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/article',
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
    public deleteArticle({
id,
}: {
id?: number,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/article',
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
