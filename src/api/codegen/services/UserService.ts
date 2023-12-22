/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserListRequest } from '../models/UserListRequest';
import type { UserShortDto } from '../models/UserShortDto';
import type { UserShortDtoResponseData } from '../models/UserShortDtoResponseData';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns UserShortDtoResponseData Success
     * @throws ApiError
     */
    public postUserList({
requestBody,
}: {
requestBody?: UserListRequest,
}): CancelablePromise<UserShortDtoResponseData> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/list',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @returns string Success
     * @throws ApiError
     */
    public postUserFollow({
userId,
}: {
userId?: number,
}): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/follow',
            query: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns string Success
     * @throws ApiError
     */
    public postUserUnfollow({
userId,
}: {
userId?: number,
}): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/unfollow',
            query: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserShortDto Success
     * @throws ApiError
     */
    public getUserMe(): CancelablePromise<UserShortDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/me',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserShortDto Success
     * @throws ApiError
     */
    public putUserMe({
newName,
}: {
newName?: string,
}): CancelablePromise<UserShortDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/user/me',
            query: {
                'newName': newName,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
