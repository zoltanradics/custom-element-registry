# custom-element-registry

ℹ️ **_[ATTENTION]_** You don't need this tool if your project has a modern build process (with tools like Vite, Webpack, Parcel) This package was made for a legacy use-case, where it was undesired to implement complex build process, but there was a need to create a modern web app experience.

A lightweight service for dynamically loading and registering custom web components. Perfect for lazy-loading components or building modular applications.

## Features

- Dynamic loading of custom element modules
- Automatic registration with the browser's CustomElementRegistry
- Optional prefix support for namespacing components
- Auto-generated tag names from class names (CamelCase to kebab-case)
- Promise-based API for reliable post-load code execution
- Browser compatibility check for custom elements support
- Input validation with descriptive error messages
- Works with vanilla JS, Lit, or any web component library

## Installation

```bash
npm install @zoltanradics/custom-element-registry
```

## Usage

### Component File Structure

Your component files should export the class as default and optionally export a `tagName`:

```javascript
// components/my-button.js

// Optional: explicitly define the tag name
export const tagName = 'my-button';

// Required: export the class as default
export default class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<button>Click me</button>`;
  }
}

// Note: Do NOT call customElements.define() - the registry handles this
```

If `tagName` is not exported, the registry will automatically generate it from the class name (e.g., `MyButton` → `my-button`).

### Basic Usage

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

### With Options

```javascript
// Use a prefix to namespace your components
await customElementRegistry(componentPaths, {
  prefix: 'app',    // Components will be registered as app-my-button, app-my-card, etc.
  verbose: true     // Log registration messages to console
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
    ], { prefix: 'app' }); // Always optional

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

### `customElementRegistry(filePaths, options?)`

Loads and registers custom element modules.

**Parameters:**
- `filePaths` - `string[]` - Array of file paths to custom element modules
- `options` - `object` (optional) - Configuration options
  - `prefix` - `string` - Prefix to prepend to all tag names (e.g., `'app'` makes `my-button` become `app-my-button`)
  - `verbose` - `boolean` - When `true`, logs registration messages to the console

**Returns:**
- `Promise<void>` - Resolves when all elements are loaded and registered

**Throws:**
- Error if custom elements are not supported in the browser
- Error if `filePaths` is not an array
- Error if `filePaths` is empty
- Error if any file path is not a non-empty string
- Error if module doesn't have a default export that is a class
- Error if `prefix` is provided but is not a string

### Component Module Requirements

Each component module should:
- **Export the class as default** - The custom element class extending `HTMLElement`
- **Optionally export `tagName`** - A string defining the tag name (e.g., `'my-button'`)

If `tagName` is not exported, the registry automatically converts the class name from CamelCase to kebab-case (e.g., `MyCustomButton` → `my-custom-button`).

## Demo

Run the interactive demo locally:

```bash
npm install
npm run dev
```

Then open your browser to view the demo showcasing the component loading workflow.

## License

MIT © [Zoltan Radics](https://github.com/zoltanradics)