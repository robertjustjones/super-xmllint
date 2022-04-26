"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateXMLWithXSD = exports.canonicalizeXML = exports.validateXMLWithDTD = exports.validateXML = exports.validateHTML = void 0;
const child_process = require("child_process");
const errors_1 = require("./errors");
const exec_xmllint = async (input, args) => await new Promise((resolve, reject) => {
    const xmllint = child_process.spawn('xmllint', ['--nonet'].concat(args));
    // pipe input to process
    xmllint.stdin.write(input);
    xmllint.stdin.end();
    xmllint.stdin.on('error', (error) => {
        console.error('An error occurred in super-xmllint stdin, this was ' +
            'probably caused by writing to a closed stream (EPIPE):\n' +
            `Error message: ${error.message}\n`);
    });
    // stdout and stderr are both captured to be made available if the promise rejects
    let output = '';
    xmllint.stdout.on('data', chunk => (output += chunk.toString()));
    xmllint.stderr.on('data', chunk => (output += chunk.toString()));
    // Any errors cause a rejection
    xmllint.on('error', error => {
        reject(new Error(error.message));
    });
    xmllint.on('error', () => {
        console.error('Failed to start subprocess.');
    });
    xmllint.on('close', code => {
        /** See xmllint man page for more information about these codes */
        const errorMessage = `xmllint exited with code ${code} when executed with ${args.toString()}:\n${output}`;
        switch (code) {
            case 0:
                return resolve({ code, command: args.toString(), output });
            case 2:
                return reject(new errors_1.DTDError(errorMessage));
            case 3:
            case 4:
                return reject(new errors_1.ValidationError(errorMessage));
            case 5:
                return reject(new errors_1.SchemaCompilationError(errorMessage));
            case 6:
                return reject(new errors_1.WriteOutputError(errorMessage));
            case 7:
                return reject(new errors_1.PatternError(errorMessage));
            case 8:
                return reject(new errors_1.ReaderRegistrationError(errorMessage));
            case 9:
                return reject(new errors_1.OutOfMemoryError(errorMessage));
            case 1:
            default:
                return reject(new Error(errorMessage));
        }
    });
});
/**
 * Validate HTML without any DTD or schema.
 *
 * @param input HTML
 */
exports.validateHTML = (input) => exec_xmllint(input, ['--html', '-']);
/**
 * Validate XML without any DTD or schema.
 *
 * @param input XML
 */
exports.validateXML = (input) => exec_xmllint(input, ['-']);
/**
 * Validate XML with DTD.
 *
 * @param input XML
 */
exports.validateXMLWithDTD = (input) => exec_xmllint(input, ['--valid', '-']);
/**
 * Save in W3C exclusive canonical format (with comments)
 *
 * @param input XML
 * @param method Used canonicalization method, defaults to Exclusive C14N
 */
exports.canonicalizeXML = (input, method = 'exc-c14n') => exec_xmllint(input, [`--${method}`, '-']);
/**
 * Validate XML with the provided XML schema file.
 * @param input XML
 * @param xsdfile Path to XSD
 */
exports.validateXMLWithXSD = (input, xsdfile) => exec_xmllint(input, ['--schema', `${xsdfile}`, '-']);
