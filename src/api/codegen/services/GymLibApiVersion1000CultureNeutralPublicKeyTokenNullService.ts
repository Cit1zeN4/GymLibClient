/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessTokenResponse } from '../models/AccessTokenResponse';
import type { ForgotPasswordRequest } from '../models/ForgotPasswordRequest';
import type { InfoRequest } from '../models/InfoRequest';
import type { InfoResponse } from '../models/InfoResponse';
import type { LoginRequest } from '../models/LoginRequest';
import type { RefreshRequest } from '../models/RefreshRequest';
import type { RegisterRequest } from '../models/RegisterRequest';
import type { ResendConfirmationEmailRequest } from '../models/ResendConfirmationEmailRequest';
import type { ResetPasswordRequest } from '../models/ResetPasswordRequest';
import type { TwoFactorRequest } from '../models/TwoFactorRequest';
import type { TwoFactorResponse } from '../models/TwoFactorResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class GymLibApiVersion1000CultureNeutralPublicKeyTokenNullService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns any Success
     * @throws ApiError
     */
    public postRegister({
requestBody,
}: {
requestBody?: RegisterRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * @returns AccessTokenResponse Success
     * @throws ApiError
     */
    public postLogin({
useCookies,
useSessionCookies,
requestBody,
}: {
useCookies?: boolean,
useSessionCookies?: boolean,
requestBody?: LoginRequest,
}): CancelablePromise<AccessTokenResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/login',
            query: {
                'useCookies': useCookies,
                'useSessionCookies': useSessionCookies,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns AccessTokenResponse Success
     * @throws ApiError
     */
    public postRefresh({
requestBody,
}: {
requestBody?: RefreshRequest,
}): CancelablePromise<AccessTokenResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/refresh',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public mapIdentityApiConfirmEmail({
userId,
code,
changedEmail,
}: {
userId?: string,
code?: string,
changedEmail?: string,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/confirmEmail',
            query: {
                'userId': userId,
                'code': code,
                'changedEmail': changedEmail,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public postResendConfirmationEmail({
requestBody,
}: {
requestBody?: ResendConfirmationEmailRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/resendConfirmationEmail',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public postForgotPassword({
requestBody,
}: {
requestBody?: ForgotPasswordRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/forgotPassword',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public postResetPassword({
requestBody,
}: {
requestBody?: ResetPasswordRequest,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/resetPassword',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * @returns TwoFactorResponse Success
     * @throws ApiError
     */
    public postManage2Fa({
requestBody,
}: {
requestBody?: TwoFactorRequest,
}): CancelablePromise<TwoFactorResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/manage/2fa',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns InfoResponse Success
     * @throws ApiError
     */
    public getManageInfo(): CancelablePromise<InfoResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/manage/info',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns InfoResponse Success
     * @throws ApiError
     */
    public postManageInfo({
requestBody,
}: {
requestBody?: InfoRequest,
}): CancelablePromise<InfoResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/manage/info',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
