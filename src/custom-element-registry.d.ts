export interface CustomElementRegistryOptions {
	verbose?: boolean;
	prefix?: string;
}

/**
 * Service for loading and registering custom elements.
 * Dynamically imports and registers custom element modules with the browser's CustomElementRegistry.
 *
 * @param filePaths - Array of file paths to custom element modules
 * @param options - Optional configuration object
 * @param options.verbose - When true, logs registration messages to the console
 * @param options.prefix - Optional prefix to prepend to all tag names
 * @returns Promise that resolves when all custom elements are loaded and registered
 *
 * @example
 * ```typescript
 * customElementRegistry([
 *   './components/my-button.js',
 *   './components/my-card.js'
 * ], { verbose: true, prefix: 'app' })
 *   .then(() => console.log('All elements loaded'))
 *   .catch(err => console.error('Failed to load elements', err));
 * ```
 *
 * @throws {Error} When custom elements are not supported in the browser
 * @throws {Error} When filePaths is not an array or is empty
 * @throws {Error} When any file path is not a non-empty string
 */
export default function customElementRegistry(
	filePaths: string[],
	options?: CustomElementRegistryOptions
): Promise<void>;
