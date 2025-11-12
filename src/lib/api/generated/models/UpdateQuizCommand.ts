/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { QuizDifficulty } from './QuizDifficulty';
import type { UpdateQuizQuestionRequest } from './UpdateQuizQuestionRequest';
export type UpdateQuizCommand = {
    quizId?: string | null;
    title?: string | null;
    description?: string | null;
    difficulty?: QuizDifficulty;
    passingScore?: number;
    displayOrder?: number;
    timeLimitMinutes?: number | null;
    randomizeQuestions?: boolean;
    maxAttempts?: number | null;
    showCorrectAnswers?: boolean;
    prerequisiteQuizId?: string | null;
    questions?: Array<UpdateQuizQuestionRequest> | null;
};

