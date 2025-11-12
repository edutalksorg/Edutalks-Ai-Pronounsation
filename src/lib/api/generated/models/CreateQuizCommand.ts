/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { CreateQuizQuestionRequest } from './CreateQuizQuestionRequest';
import type { QuizDifficulty } from './QuizDifficulty';
export type CreateQuizCommand = {
    title?: string | null;
    description?: string | null;
    difficulty?: QuizDifficulty;
    passingScore?: number;
    timeLimitMinutes?: number | null;
    randomizeQuestions?: boolean;
    maxAttempts?: number | null;
    showCorrectAnswers?: boolean;
    prerequisiteQuizId?: string | null;
    publishImmediately?: boolean;
    questions?: Array<CreateQuizQuestionRequest> | null;
};

