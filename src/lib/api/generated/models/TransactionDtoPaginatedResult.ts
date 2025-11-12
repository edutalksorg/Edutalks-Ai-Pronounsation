/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { TransactionDto } from './TransactionDto';
export type TransactionDtoPaginatedResult = {
    messages?: Array<string> | null;
    errors?: Array<string> | null;
    succeeded?: boolean;
    statusCode?: number;
    readonly data?: Array<TransactionDto> | null;
    readonly currentPage?: number;
    readonly totalPages?: number;
    readonly totalCount?: number;
    readonly pageSize?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
};

