# Custom Element Registry - Interactive Demo

This demo showcases how to use the `customElementRegistry` function to dynamically load and register custom web components.

## Running the Demo

### Development Server

Start the Vite dev server to run the demo:

```bash
npm run dev
```

This will automatically open your browser to `http://localhost:3000/` where you can interact with the demo.

## What This Demo Shows

The demo demonstrates:

1. **Dynamic Loading**: Loading custom element JavaScript files on demand
2. **Post-Load Execution**: Running code after all components are successfully loaded and registered
3. **Custom Element Usage**: Using the loaded components in your HTML
4. **Error Handling**: Proper error handling during the loading process

## Demo Components

### 1. Greeting Card (`<greeting-card>`)
A styled greeting card component with customizable message and recipient.

**Usage:**
```html
<greeting-card name="Developer" message="Welcome!"></greeting-card>
```

**Attributes:**
- `name`: The recipient's name (default: "World")
- `message`: The greeting message (default: "Hello")

### 2. Custom Button (`<custom-button>`)
An interactive button with a click counter that dispatches custom events.

**Usage:**
```html
<custom-button label="Click Me!"></custom-button>
```

**Attributes:**
- `label`: Button text (default: "Click Me")

**Events:**
- `button-clicked`: Fired when button is clicked, includes click count in event detail

### 3. Status Badge (`<status-badge>`)
A colored status indicator badge.

**Usage:**
```html
<status-badge status="success" text="Ready"></status-badge>
```

**Attributes:**
- `status`: Badge color theme - `success`, `error`, `warning`, `info` (default: "info")
- `text`: Badge text (default: "Status")

## How It Works

The demo uses the `customElementRegistry` function to load component files:

```javascript
import customElementRegistry from '../src/custom-element-registry.js';

// Array of component file paths to load
const componentFiles = [
  './components/greeting-card.js',
  './components/custom-button.js',
  './components/status-badge.js'
];

// Load all components
await customElementRegistry(componentFiles);

// This code runs AFTER all components are loaded
console.log('All components are ready!');
```

The function:
1. Accepts an array of file paths (strings)
2. Uses `asyncScriptLoader` to dynamically inject script tags
3. Returns a Promise that resolves when all components are loaded
4. Allows you to execute code after loading is complete

## File Structure

```
demo/
├── index.html              # Main demo page
├── README.md              # This file
└── components/
    ├── greeting-card.js   # Greeting card component
    ├── custom-button.js   # Interactive button component
    └── status-badge.js    # Status badge component
```

## Key Features Demonstrated

### 1. Dynamic Script Loading
Components are loaded dynamically using the `asyncScriptLoader` utility, which:
- Creates script elements on-the-fly
- Sets them as ES modules (`type="module"`)
- Handles load/error events
- Includes timeout handling (2000ms)

### 2. Promise-Based API
The `customElementRegistry` function returns a Promise, enabling:
- `async/await` syntax
- Sequential loading operations
- Error handling with try/catch
- Post-load code execution

### 3. Custom Element Registration
Each component file:
- Defines a custom element class
- Registers it with `customElements.define()`
- Uses Shadow DOM for encapsulation
- Implements standard web component lifecycle methods

### 4. Interactive Console
The demo includes a console log that shows:
- Loading progress
- Component registration status
- User interactions (button clicks)
- Error messages (if any)

## Extending the Demo

To add your own custom elements:

1. Create a new component file in `demo/components/`
2. Define and register your custom element
3. Add the file path to the `componentFiles` array in `index.html`
4. Use your component in the `renderComponents()` function

Example:

```javascript
// demo/components/my-component.js
class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<p>Hello from my component!</p>';
  }
}
customElements.define('my-component', MyComponent);
```

```javascript
// In demo/index.html
const componentFiles = [
  './components/greeting-card.js',
  './components/custom-button.js',
  './components/status-badge.js',
  './components/my-component.js'  // Add your component
];
```

## Browser Compatibility

This demo requires:
- Modern browser with ES6+ support
- Custom Elements v1 API support
- Shadow DOM v1 support

Supported browsers:
- Chrome/Edge 67+
- Firefox 63+
- Safari 10.1+

## Notes

- The demo folder is not included in the npm package (only `dist/` is published)
- Component files are loaded as ES modules
- Each component uses Shadow DOM for style encapsulation
- The demo works in development mode with Vite's dev server
