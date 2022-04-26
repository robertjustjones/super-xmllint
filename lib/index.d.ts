/// <reference types="node" />
export interface xmllint_output {
    code: number;
    command: string;
    output: string;
}
/**
 * Validate HTML without any DTD or schema.
 *
 * @param input HTML
 */
export declare const validateHTML: (input: string | Buffer) => Promise<xmllint_output>;
/**
 * Validate XML without any DTD or schema.
 *
 * @param input XML
 */
export declare const validateXML: (input: string | Buffer) => Promise<xmllint_output>;
/**
 * Validate XML with DTD.
 *
 * @param input XML
 */
export declare const validateXMLWithDTD: (input: string | Buffer) => Promise<xmllint_output>;
/**
 * Save in W3C exclusive canonical format (with comments)
 *
 * @param input XML
 * @param method Used canonicalization method, defaults to Exclusive C14N
 */
export declare const canonicalizeXML: (input: string | Buffer, method?: 'c14n' | 'c14n11' | 'exc-c14n') => Promise<xmllint_output>;
/**
 * Validate XML with the provided XML schema file.
 * @param input XML
 * @param xsdfile Path to XSD
 */
export declare const validateXMLWithXSD: (input: string | Buffer, xsdfile: string | Buffer) => Promise<xmllint_output>;
