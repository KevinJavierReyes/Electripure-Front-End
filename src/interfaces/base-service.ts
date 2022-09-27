

export interface ResponseGeneric {
    data: any | null;
    statusCode: number | null;
    success: boolean;
    error: string | null;
}