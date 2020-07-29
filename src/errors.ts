/**
 *  xmllint error type definitions
 */

export class ValidationError extends Error {
	constructor(message: string) {
		super(message)
		this.message = message
		this.name = 'ValidationError'
	}
}

export class DTDError extends Error {
	constructor(message: string) {
		super(message)
		this.message = message
		this.name = 'DTDError'
	}
}

export class SchemaCompilationError extends Error {
	constructor(message: string) {
		super(message)
		this.message = message
		this.name = 'SchemaCompilationError'
	}
}

export class WriteOutputError extends Error {
	constructor(message: string) {
		super(message)
		this.message = message
		this.name = 'WriteOutputError'
	}
}

export class PatternError extends Error {
	constructor(message: string) {
		super(message)
		this.message = message
		this.name = 'PatternError'
	}
}

export class ReaderRegistrationError extends Error {
	constructor(message: string) {
		super(message)
		this.message = message
		this.name = 'ReaderRegistrationError'
	}
}

export class OutOfMemoryError extends Error {
	constructor(message: string) {
		super(message)
		this.message = message
		this.name = 'OutOfMemoryError'
	}
}
