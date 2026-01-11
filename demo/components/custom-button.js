/**
 * A custom button element with click counter
 */
export default class CustomButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.clickCount = 0;
	}

	connectedCallback() {
		const label = this.getAttribute('label') || 'Click Me';

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: inline-block;
					margin: 10px 0;
				}
				button {
					background: #2196F3;
					color: white;
					border: none;
					padding: 12px 24px;
					font-size: 16px;
					border-radius: 4px;
					cursor: pointer;
					transition: all 0.3s ease;
					box-shadow: 0 2px 4px rgba(0,0,0,0.2);
				}
				button:hover {
					background: #1976D2;
					transform: translateY(-2px);
					box-shadow: 0 4px 8px rgba(0,0,0,0.3);
				}
				button:active {
					transform: translateY(0);
				}
				.counter {
					margin-top: 8px;
					font-size: 14px;
					color: #666;
				}
			</style>
			<div>
				<button>${label}</button>
				<div class="counter">Clicks: <span id="count">0</span></div>
			</div>
		`;

		const button = this.shadowRoot.querySelector('button');
		const countSpan = this.shadowRoot.querySelector('#count');

		button.addEventListener('click', () => {
			this.clickCount++;
			countSpan.textContent = this.clickCount;
			this.dispatchEvent(new CustomEvent('button-clicked', {
				detail: { count: this.clickCount },
				bubbles: true,
				composed: true
			}));
		});

		console.log('[CustomButton] Component loaded and rendered');
	}
}

customElements.define('custom-button', CustomButton);
