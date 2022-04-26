/**
 *  xmllint error type definitions
 */
export declare class ValidationError extends Error {
    constructor(message: string);
}
export declare class DTDError extends Error {
    constructor(message: string);
}
export declare class SchemaCompilationError extends Error {
    constructor(message: string);
}
export declare class WriteOutputError extends Error {
    constructor(message: string);
}
export declare class PatternError extends Error {
    constructor(message: string);
}
export declare class ReaderRegistrationError extends Error {
    constructor(message: string);
}
export declare class OutOfMemoryError extends Error {
    constructor(message: string);
}
