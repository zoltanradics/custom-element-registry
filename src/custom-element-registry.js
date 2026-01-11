const TAG = '[CustomElementRegistry]';

export default function customElementRegistry(filePaths, options = {}) {
	const { verbose, prefix } = options;

	if (!('customElements' in window)) {
		return Promise.reject(new Error(`${TAG} Custom elements are not supported in this browser.`));
	}

	if (!Array.isArray(filePaths)) {
		return Promise.reject(new Error(`${TAG} filePaths must be an array.`));
	}

	if (filePaths.length === 0) {
		return Promise.reject(new Error(`${TAG} You need to add at least one custom-element to load.`));
	}

	const invalidPaths = filePaths.filter(path => typeof path !== 'string' || path.trim() === '');
	if (invalidPaths.length > 0) {
		return Promise.reject(new Error(`${TAG} All file paths must be non-empty strings.`));
	}

	// Load all the custom-element files
	return loadCustomElements(filePaths).then((loadedCustomElementArray) => {
		console.log(TAG, 'Custom elements are loaded.');

		// Register all the successfully loaded custom-elements
		loadedCustomElementArray.forEach((module) => registerCustomElement(module, prefix, verbose))

	}).catch((error) => {
		console.error(TAG, 'Failed to load custom elements.', error);
	});
}

/**
 * 
 * Perform the async load of the custom-element files
 * 
 * @param {Array<string>} filePaths 
 * @returns {Array<Promise>}
 */
function loadCustomElements(filePaths) {
	if (!Array.isArray(filePaths) || filePaths.length === 0) {
		throw new Error(`${TAG} loadCustomElements requires a non-empty array of file paths.`);
	}

	// Load all the custom-element modules
	const customElementsLoadingPromisesArray = filePaths.map(filePath => import(filePath));

	// Return a promise when all loaded or any of them failed
	return Promise.all(customElementsLoadingPromisesArray);
}

/**
 * Registers a custom element with the browser's CustomElementRegistry
 *
 * @param {Object} module - The imported module containing the custom element class
 * @param {string} [prefix] - Optional prefix to prepend to the tag name
 * @param {boolean} verbose - Whether to log registration messages to the console
 */
function registerCustomElement(module, prefix, verbose) {
	if (!module || typeof module !== 'object') {
		throw new Error(`${TAG} Invalid module: expected an object.`);
	}

	if (!module.default || typeof module.default !== 'function') {
		throw new Error(`${TAG} Module must have a default export that is a class.`);
	}

	if (prefix !== undefined && typeof prefix !== 'string') {
		throw new Error(`${TAG} Prefix must be a string.`);
	}

	const tagName = module.tagName ? module.tagName : generateTagName(module.default.name);
	const finalTagName = typeof prefix !== 'undefined' ? `${prefix.toLowerCase()}-${tagName}` : tagName
	const customElementClass = module.default;

	customElements.define(finalTagName, customElementClass);
	if (verbose) {
		console.log(TAG, 'Custom-element is registered: ', finalTagName);
	}
}

/**
 * Converts a CamelCase class name to a kebab-case tag name
 *
 * @param {string} className - The class name in CamelCase (e.g., "MyCustomButton")
 * @returns {string} The kebab-case tag name (e.g., "my-custom-button")
 */
function generateTagName(className) {
	if (typeof className !== 'string' || className.trim() === '') {
		throw new Error(`${TAG} className must be a non-empty string.`);
	}

	return className
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
		.toLowerCase();
}

