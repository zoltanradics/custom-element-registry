/**
 * A simple greeting card custom element
 */
export default  class GreetingCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const name = this.getAttribute('name') || 'World';
		const message = this.getAttribute('message') || 'Hello';

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					margin: 10px 0;
				}
				.card {
					border: 2px solid #4CAF50;
					border-radius: 8px;
					padding: 20px;
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: white;
					font-family: Arial, sans-serif;
					box-shadow: 0 4px 6px rgba(0,0,0,0.1);
				}
				.message {
					font-size: 24px;
					font-weight: bold;
					margin-bottom: 10px;
				}
				.name {
					font-size: 18px;
					opacity: 0.9;
				}
			</style>
			<div class="card">
				<div class="message">${message}</div>
				<div class="name">To: ${name}</div>
			</div>
		`;

		console.log('[GreetingCard] Component loaded and rendered');
	}
}

customElements.define('greeting-card', GreetingCard);
