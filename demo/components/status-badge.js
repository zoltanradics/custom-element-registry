/**
 * A status badge custom element
 */
export default class StatusBadge extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const status = this.getAttribute('status') || 'info';
		const text = this.getAttribute('text') || 'Status';

		const colors = {
			success: { bg: '#4CAF50', text: '#fff' },
			error: { bg: '#f44336', text: '#fff' },
			warning: { bg: '#ff9800', text: '#fff' },
			info: { bg: '#2196F3', text: '#fff' }
		};

		const color = colors[status] || colors.info;

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: inline-block;
					margin: 5px;
				}
				.badge {
					display: inline-block;
					padding: 6px 12px;
					border-radius: 12px;
					background: ${color.bg};
					color: ${color.text};
					font-size: 14px;
					font-weight: bold;
					font-family: Arial, sans-serif;
					text-transform: uppercase;
					letter-spacing: 0.5px;
					box-shadow: 0 2px 4px rgba(0,0,0,0.2);
				}
			</style>
			<span class="badge">${text}</span>
		`;

		console.log('[StatusBadge] Component loaded and rendered');
	}
}

customElements.define('status-badge', StatusBadge);
