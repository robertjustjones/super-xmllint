import * as child_process from 'child_process'
import {
	ValidationError,
	DTDError,
	SchemaCompilationError,
	WriteOutputError,
	PatternError,
	ReaderRegistrationError,
	OutOfMemoryError	
} from './errors'

export interface xmllint_output {
  code: number,
  command: string,
  output: string
}

const exec_xmllint = async (input: string | Buffer, args: Array<string>): Promise<xmllint_output> =>
	await new Promise((resolve, reject) => {
		const xmllint = child_process.spawn('xmllint', ['--nonet'].concat(args))

		// pipe input to process
		xmllint.stdin.write(input)
		xmllint.stdin.end()

		xmllint.stdin.on('error', (error) => {
			console.error(
				'An error occurred in super-xmllint stdin, this was ' +
				'probably caused by writing to a closed stream (EPIPE):\n' +
				`Error message: ${error.message}\n`
			)
		})

		// stdout and stderr are both captured to be made available if the promise rejects
		let output = ''
		xmllint.stdout.on('data', chunk => (output += chunk.toString()))
		xmllint.stderr.on('data', chunk => (output += chunk.toString()))

		// Any errors cause a rejection
		xmllint.on('error', error => {
			reject(new Error(error.message))
		})

		xmllint.on('error', () => {
			console.error('Failed to start subprocess.')
		})

		xmllint.on('close', code => {
			/** See xmllint man page for more information about these codes */
			const errorMessage = `xmllint exited with code ${code} when executed with ${args.toString()}:\n${output}`
			
			switch (code) {
			case 0:
				return resolve({ code, command: args.toString(), output })
			case 2:
				return reject(new DTDError(errorMessage))
			case 3:
			case 4:
				return reject(new ValidationError(errorMessage))
			case 5:
				return reject(new SchemaCompilationError(errorMessage))
			case 6:
				return reject(new WriteOutputError(errorMessage))
			case 7:
				return reject(new PatternError(errorMessage))
			case 8:
				return reject(new ReaderRegistrationError(errorMessage))
			case 9:
				return reject(new OutOfMemoryError(errorMessage))
			case 1:
			default:
				return reject(new Error(errorMessage))
			}
		})
	})

/**
 * Validate XML without any DTD or schema.
 *
 * @param input XML
 */
export const validateXML = (input: string | Buffer) =>
	exec_xmllint(input, ['-'])

/**
 * Validate XML with DTD.
 *
 * @param input XML
 */
export const validateXMLWithDTD = (input: string | Buffer) =>
	exec_xmllint(input, ['--valid', '-'])

/**
 * Save in W3C exclusive canonical format (with comments)
 *
 * @param input XML
 * @param method Used canonicalization method, defaults to Exclusive C14N
 */
export const canonicalizeXML = (
	input: string | Buffer, 
	method: 'c14n' | 'c14n11' | 'exc-c14n' = 'exc-c14n'
) => exec_xmllint(input, [`--${method}`, '-'])

/**
 * Validate XML with the provided XML schema file.
 * @param input XML
 * @param xsdfile Path to XSD
 */
export const validateXMLWithXSD = (
	input: string | Buffer,
	xsdfile: string | Buffer
) => exec_xmllint(input, ['--schema', `${xsdfile}`, '-'])