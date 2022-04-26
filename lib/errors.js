"use strict";
/**
 *  xmllint error type definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfMemoryError = exports.ReaderRegistrationError = exports.PatternError = exports.WriteOutputError = exports.SchemaCompilationError = exports.DTDError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class DTDError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'DTDError';
    }
}
exports.DTDError = DTDError;
class SchemaCompilationError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'SchemaCompilationError';
    }
}
exports.SchemaCompilationError = SchemaCompilationError;
class WriteOutputError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'WriteOutputError';
    }
}
exports.WriteOutputError = WriteOutputError;
class PatternError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'PatternError';
    }
}
exports.PatternError = PatternError;
class ReaderRegistrationError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'ReaderRegistrationError';
    }
}
exports.ReaderRegistrationError = ReaderRegistrationError;
class OutOfMemoryError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'OutOfMemoryError';
    }
}
exports.OutOfMemoryError = OutOfMemoryError;
