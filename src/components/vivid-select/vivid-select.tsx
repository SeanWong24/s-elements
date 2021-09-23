import { Component, Host, h, State, Watch, ComponentInterface, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { UIColor } from '../../global/ui-color';

@Component({
  tag: 'vivid-select',
  styleUrl: 'vivid-select.css',
  shadow: true,
})
export class VividSelect implements ComponentInterface {

  private readonly CHILD_SELECT_OPTION_TAG_NAME = 'vivid-select-option';

  private get selectOptionElements() {
    let elements = Array.from(this.hostElement.querySelectorAll(this.CHILD_SELECT_OPTION_TAG_NAME));
    if (elements.length < 1) {
      elements = this.selectOptionElementsBackup;
    }
    return elements;

  }

  private get selectedOptionElement() {
    return this.selectOptionElements.find(
      selectOption => selectOption.value === this.value || selectOption.innerText === this.value
    );
  }

  private get displayedValue() {
    return this.selectedOptionElement?.innerText || this.selectedOptionElement?.value;
  }

  private dropdownContainer: HTMLDivElement;
  private selectOptionElementsBackup: HTMLVividSelectOptionElement[];

  @Element() hostElement: HTMLVividSelectElement;

  @State() isDropdownHidden = true;

  @Watch('isDropdownHidden')
  isDropdownHiddenChanged(isDropdownHidden: boolean) {
    if (isDropdownHidden) {
      this.removeDropdownDismissListenerToBodyElement();
      this.selectOptionElementsBackup?.forEach(element => this.hostElement.appendChild(element));
    } else {
      const windowHeight = window.innerHeight;
      const hostElementClientRect = this.hostElement.getBoundingClientRect();
      const dropdownMaxHeight = windowHeight - hostElementClientRect.top - hostElementClientRect.height;
      this.updateCSSVariable('--dropdown-max-height', `${dropdownMaxHeight}px`);
      this.updateCSSVariable('--dropdown-width', `${hostElementClientRect.width}px`)
      this.addDropdownDismissListenerToBodyElement();
      this.selectOptionElementsBackup = this.selectOptionElements;
      this.selectOptionElements.forEach(element => {
        element.parentSelectElement = this.hostElement;
        element.highlightColor = this.hostElement.style.getPropertyValue('--highlight-color');
        this.dropdownContainer?.appendChild(element);
      })
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
          <span>{this.displayedValue}</span>
          {
            !this.displayedValue &&
            <span id="placeholder">{this.placeholder}</span>
          }
          <vivid-button
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
          </vivid-button>
          <vivid-overlay
            id="dropdown"
            style={{
              '--backdrop-filter': 'blur(10px)'
            }}
            showed={!this.isDropdownHidden}
            position={{
              x: this.hostElement.offsetLeft + 'px',
              y: this.hostElement.offsetTop + this.hostElement.offsetHeight + 'px',
              offsetX: '0',
              offsetY: '.25rem',
              type: 'absolute'
            }}
            transformOrigin="calc(100% - 1rem) -1rem"
          >
            <div
              ref={el => this.dropdownContainer = el}
              style={{
                width: this.hostElement.style.getPropertyValue('--dropdown-width'),
                maxHeight: `calc(${this.hostElement.style.getPropertyValue('--dropdown-max-height')} - .5rem * 2)`,
                overflowY: 'auto'
              }}
            ></div>
          </vivid-overlay>
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
