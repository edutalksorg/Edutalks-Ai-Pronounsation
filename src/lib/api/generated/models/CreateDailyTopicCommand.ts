/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { QuizDifficulty } from './QuizDifficulty';
export type CreateDailyTopicCommand = {
    title?: string | null;
    description?: string | null;
    categoryId?: string | null;
    difficulty?: QuizDifficulty;
    discussionPoints?: Array<string> | null;
    vocabularyList?: Array<string> | null;
    estimatedDurationMinutes?: number;
    author?: string | null;
};

