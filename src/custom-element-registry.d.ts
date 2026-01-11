/**
 * Service for loading and registering custom elements.
 * Handles Lit framework initialization and custom element registration.
 *
 * @param files - Array of Promises that resolve when custom element modules are loaded
 * @returns Promise that resolves when all custom elements are loaded and registered
 *
 * @example
 * ```typescript
 * const elements = [
 *   import('./components/my-button.js'),
 *   import('./components/my-card.js')
 * ];
 *
 * customElementRegistry(elements)
 *   .then(() => console.log('All elements loaded'))
 *   .catch(err => console.error('Failed to load elements', err));
 * ```
 *
 * @throws {Error} When custom elements are not supported in the browser
 */
export default function customElementRegistry(files: Promise<any>[]): Promise<void>;
