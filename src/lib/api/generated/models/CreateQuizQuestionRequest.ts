/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { QuestionType } from './QuestionType';
export type CreateQuizQuestionRequest = {
    type?: QuestionType;
    questionText?: string | null;
    options?: Array<string> | null;
    correctAnswer?: string | null;
    explanation?: string | null;
    displayOrder?: number;
    points?: number;
};

