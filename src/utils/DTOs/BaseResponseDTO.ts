export interface BaseResponseDTO<T> {
    code: number;
    message: string;
    data?: T
}