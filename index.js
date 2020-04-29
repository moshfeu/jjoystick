// @ts-check
class JJoystick extends HTMLElement {
  /** @type {HTMLInputElement} */
  element;
  /** @type {ShadowRoot} */
  shadowRoot;

  states = {
    0: 'left',
    1: 'none',
    2: 'right'
  }

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({mode: 'open'});
    this.init();
  }

  init() {
    this.element = this.makeMe();
    this.listenToMe();
    this.styleMe();
  }

  makeMe() {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '2';
    input.value = '1';
    wrapper.appendChild(input)
    this.shadowRoot.appendChild(wrapper);
    return input;
  }

  styleMe() {
    // 🤦‍♂
    /**
     * @param {string} selector
     * @param {string} styles
     */
    function repeatStyleForVendors(selector, styles) {
      return selector.split(',').map(selector => {
        return `${selector} {
          ${styles}
        }`
      }).join('\n\n');
    }

    const style = document.createElement('style');
    style.textContent = `
      /*css*/
      .wrapper {
        display: inline-block;
        width: 100px;
        height: 100px;
        background: rgba(255, 0, 0, 0.3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      input[type="range"] {
        margin: auto;
        -webkit-appearance: none;
        position: relative;
        overflow: hidden;
        height: 100%;
        width: 100%;
        cursor: pointer;
        border-radius: 0; /* iOS */
        background: none;
        opacity: 0.5;
        transition: opacity .15s ease;
        -webkit-tap-highlight-color: transparent;
        cursor: default;
      }

      input[type="range"]:active {
        opacity: 1;
        outline: none;
      }

      input[type="range"]:focus {
        outline: none;
      }

      ${repeatStyleForVendors('::-webkit-slider-runnable-track, ::-ms-fill-lower, ::-moz-range-track, ::-ms-track', 'background: none')}
      ${repeatStyleForVendors('::-webkit-slider-thumb, ::-moz-range-thumb, ::-ms-thumb', '-webkit-appearance: none;width: 50px;height: 50px;background: rgba(255, 0, 0, 0.5);border-radius: 50%;')}
      ${repeatStyleForVendors('::-ms-ticks-after, ::-ms-ticks-before, ::-ms-tooltip', 'display: none;')}
      /*!css*/
    `;
    this.shadowRoot.appendChild(style);
  }

  listenToMe() {
    this.element.addEventListener('input', e => {
      const {value} = e.target;
      const side = this.states[value];
      if (side === 'none') {
        this.dispatchEvent(new CustomEvent('zero'));
        return;
      }
      this.dispatchEvent(new CustomEvent('dir', {
        detail: side
      }));
    });
    ['mouseup', 'touchend'].forEach(event => {
      this.element.addEventListener(event, () => {
        this.element.value = '1';
        this.dispatchEvent(new CustomEvent('end'));
      });
    });
  }

}

customElements.define('j-joystick', JJoystick);