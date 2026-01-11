# custom-element-registry

ℹ️ **_[ATTENTION]_** You don't need this tool if your project has a modern build process (with tools like Vite, Webpack, Parcel) This package was made for a legacy use-case, where it was undesired to implement complex build process, but there was a need to create a modern web app experience.

A lightweight service for dynamically loading and registering custom web components. Perfect for lazy-loading components or building modular applications.

## Features

- Dynamic loading of custom element modules
- Promise-based API for reliable post-load code execution
- Browser compatibility check for custom elements support
- Input validation with descriptive error messages
- Works with vanilla JS, Lit, or any web component library

## Installation

```bash
npm install @zoltanradics/custom-element-registry
```

## Usage

```javascript
import customElementRegistry from '@zoltanradics/custom-element-registry';

// Define the component file paths to load
const componentPaths = [
  '/components/my-button.js',
  '/components/my-card.js',
  '/components/my-modal.js'
];

// Load and register all components
customElementRegistry(componentPaths)
  .then(() => {
    console.log('All components loaded and ready to use!');
    // Your post-load code here
  })
  .catch(error => {
    console.error('Failed to load components:', error);
  });
```

### With async/await

```javascript
async function initializeApp() {
  try {
    await customElementRegistry([
      '/components/header.js',
      '/components/footer.js',
      '/components/sidebar.js'
    ]);

    // Components are now ready - render your app
    document.getElementById('app').innerHTML = `
      <app-header></app-header>
      <app-sidebar></app-sidebar>
      <app-footer></app-footer>
    `;
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

initializeApp();
```

## API

### `customElementRegistry(filePaths)`

Loads and registers custom element modules.

**Parameters:**
- `filePaths` - `string[]` - Array of file paths to custom element modules

**Returns:**
- `Promise<void>` - Resolves when all elements are loaded and registered

**Throws:**
- Error if custom elements are not supported in the browser
- Error if `filePaths` is not an array
- Error if `filePaths` is empty
- Error if any file path is not a non-empty string

## Demo

Run the interactive demo locally:

```bash
npm install
npm run dev
```

Then open your browser to view the demo showcasing the component loading workflow.

## License

MIT © [Zoltan Radics](https://github.com/zoltanradics)