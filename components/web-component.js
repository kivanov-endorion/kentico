// web-component.js
class MyCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const title = this.getAttribute('title');
        const text = this.getAttribute('text');
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                    font-family: 'Inter', sans-serif;
                }
                .card {
                    background-color: #fff;
                    border: 1px solid #d1d5db;
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    text-align: center;
                }
                h3 {
                    color: #5b21b6;
                    margin-top: 0;
                }
                p {
                    color: #4b5563;
                }
            </style>
            <div class="card">
                <h3>${title}</h3>
                <p>${text}</p>
            </div>
        `;
    }
}
customElements.define('my-card', MyCard);