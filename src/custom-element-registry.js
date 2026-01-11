// import { asyncScriptLoader } from '@zoltanradics/async-script-loader';

const TAG = '[CustomElementRegistry]';

export default function customElementRegistry(filePaths) {
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
	
	return Promise.all(loadCustomElements(filePaths)).then(() => {
		console.log(TAG, 'Custom elements are loaded and registered.');
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

	return filePaths.map(filePath => import(filePath));
}