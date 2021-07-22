import { Component, Host, h, State, Watch, ComponentInterface, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { UIColor } from '../../global/ui-color';

@Component({
  tag: 's-select',
  styleUrl: 's-select.css',
  shadow: true,
})
export class SSelect implements ComponentInterface {

  private get selectOptionElements() {
    return Array.from(this.hostElement.querySelectorAll('s-select-option'));
  }

  private get selectedOptionElement() {
    return this.selectOptionElements.find(
      selectOption => selectOption.value === this.value || selectOption.innerText === this.value
    );
  }

  private get actualValue() {
    return this.selectedOptionElement ? this.value : undefined;
  }

  @Element() hostElement: HTMLSSelectElement;

  @State() isDropdownHidden = true;

  @Watch('isDropdownHidden')
  isDropdownHiddenChanged(isDropdownHidden: boolean) {
    if (isDropdownHidden) {
      this.removeDropdownDismissListenerToBodyElement();
    } else {
      const windowHeight = window.innerHeight;
      const hostElementClientRect = this.hostElement.getBoundingClientRect();
      const dropdownMaxHeight = windowHeight - hostElementClientRect.top - hostElementClientRect.height;
      this.updateCSSVariable('--dropdown-max-height', `${dropdownMaxHeight}px`);
      this.addDropdownDismissListenerToBodyElement();
    }
  }

  @Prop({ reflect: true }) placeholder: string;

  @Prop({ reflect: true, mutable: true }) value: string;

  @Watch('value')
  valueChanged(value: string) {
    this.selectOptionElements.forEach(selectOptionElement => {
      const isSelected =
        selectOptionElement.value === this.value ||
        selectOptionElement.innerText === this.value;
      selectOptionElement.isSelected = isSelected;
    });
    this.sChange.emit(value);
  }

  @Prop({ reflect: true }) color: UIColor = 'primary';

  @Watch('color')
  colorChanged(color: UIColor) {
    this.updateCSSVariable(
      '--highlight-color',
      `hsl(var(--${color}-color-hsl))`
    );
  }

  @Event() sChange: EventEmitter<string>;

  connectedCallback() {
    this.colorChanged(this.color);

    if (this.isDropdownHidden) {
      this.removeDropdownDismissListenerToBodyElement();
    } else {
      this.addDropdownDismissListenerToBodyElement();
    }
  }

  render() {
    return (
      <Host>
        <div
          id="select"
          class={this.isDropdownHidden ? 'dropdown-hidden' : ''}
          onClick={() => this.isDropdownHidden = !this.isDropdownHidden}
        >
          <span>{this.actualValue}</span>
          {
            !this.actualValue &&
            <span id="placeholder">{this.placeholder}</span>
          }
          <s-button
            id="dropdown-toggle-button"
            fill="clear"
          >
            <svg width="1rem" height="1rem" viewBox="0 0 100 100">
              <path
                stroke-width="10px"
                stroke="black"
                fill="transparent"
                d="M20,30 L50,70 L 80 30"
              />
            </svg>
          </s-button>
          <div id="dropdown">
            <div>
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }

  private addDropdownDismissListenerToBodyElement = () => {
    setTimeout(() => {
      document.querySelector('body').addEventListener('click', this.dismissDropdown);
    });
  };

  private removeDropdownDismissListenerToBodyElement = () => {
    document.querySelector('body').removeEventListener('click', this.dismissDropdown);
  };

  private dismissDropdown = () => {
    this.isDropdownHidden = true;
  };

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
