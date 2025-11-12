/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { ErrorType } from './ErrorType';
import type { Exception } from './Exception';
import type { HttpStatusCode } from './HttpStatusCode';
export type ErrorResponse = {
    type?: ErrorType;
    code?: string | null;
    message?: string | null;
    requestId?: string | null;
    innerException?: Exception;
    statusCode?: HttpStatusCode;
};

