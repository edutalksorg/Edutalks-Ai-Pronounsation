/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { WordFeedback } from './WordFeedback';
export type AttemptDto = {
    id?: string | null;
    paragraphId?: string | null;
    paragraphTitle?: string | null;
    audioFileUrl?: string | null;
    audioDurationSeconds?: number;
    overallScore?: number | null;
    pronunciationAccuracy?: number | null;
    fluencyScore?: number | null;
    completenessScore?: number | null;
    wordLevelFeedback?: Array<WordFeedback> | null;
    processingStatus?: string | null;
    errorMessage?: string | null;
    submittedAt?: string;
    assessedAt?: string | null;
};

