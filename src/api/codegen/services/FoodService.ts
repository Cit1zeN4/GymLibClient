/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFoodRequest } from '../models/CreateFoodRequest';
import type { FoodEntityResponseData } from '../models/FoodEntityResponseData';
import type { FoodListRequest } from '../models/FoodListRequest';
import type { FoodResponse } from '../models/FoodResponse';
import type { ProductEntityResponseData } from '../models/ProductEntityResponseData';
import type { ProductListRequest } from '../models/ProductListRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FoodService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns FoodResponse Success
     * @throws ApiError
     */
    public getFood({
id,
}: {
id?: number,
}): CancelablePromise<FoodResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/food',
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
     * @returns FoodResponse Success
     * @throws ApiError
     */
    public postFood({
requestBody,
}: {
requestBody?: CreateFoodRequest,
}): CancelablePromise<FoodResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/food',
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
    public putFood({
id,
requestBody,
}: {
id?: number,
requestBody?: CreateFoodRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/food',
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
    public deleteFood({
id,
}: {
id?: number,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/food',
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
     * @returns ProductEntityResponseData Success
     * @throws ApiError
     */
    public postFoodProductList({
requestBody,
}: {
requestBody?: ProductListRequest,
}): CancelablePromise<ProductEntityResponseData> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/food/product-list',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @returns FoodEntityResponseData Success
     * @throws ApiError
     */
    public postFoodList({
requestBody,
}: {
requestBody?: FoodListRequest,
}): CancelablePromise<FoodEntityResponseData> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/food/list',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
