export interface CustomElementRegistryOptions {
	verbose?: boolean;
	prefix?: string;
	/**
	 * Whitelist of allowed origins for external URLs.
	 * - undefined: external URLs are blocked, only relative paths allowed (default)
	 * - []: all origins allowed (disables security check)
	 * - ['https://cdn.example.com']: only listed origins allowed
	 */
	allowedOrigins?: string[];
}

/**
 * Service for loading and registering custom elements.
 * Dynamically imports and registers custom element modules with the browser's CustomElementRegistry.
 *
 * @param filePaths - Array of file paths to custom element modules
 * @param options - Optional configuration object
 * @param options.verbose - When true, logs registration messages to the console
 * @param options.prefix - Optional prefix to prepend to all tag names
 * @param options.allowedOrigins - Whitelist of allowed origins for external URLs
 * @returns Promise that resolves when all custom elements are loaded and registered
 *
 * @example
 * ```typescript
 * // Basic usage with relative paths
 * customElementRegistry([
 *   './components/my-button.js',
 *   './components/my-card.js'
 * ], { verbose: true, prefix: 'app' });
 *
 * // With external CDN (must whitelist origin)
 * customElementRegistry([
 *   'https://cdn.example.com/components/my-component.js'
 * ], { allowedOrigins: ['https://cdn.example.com'] });
 * ```
 *
 * @throws {Error} When custom elements are not supported in the browser
 * @throws {Error} When filePaths is not an array or is empty
 * @throws {Error} When any file path is not a non-empty string
 * @throws {Error} When external URLs are used without allowedOrigins
 * @throws {Error} When URL origin is not in the allowedOrigins whitelist
 */
export default function customElementRegistry(
	filePaths: string[],
	options?: CustomElementRegistryOptions
): Promise<void>;
