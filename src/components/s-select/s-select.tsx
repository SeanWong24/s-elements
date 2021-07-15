import { Component, Host, h, State, Watch, ComponentInterface, Prop, Element, Event, EventEmitter } from '@stencil/core';

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

  @Event() sChange: EventEmitter<string>;

  connectedCallback() {
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
          >ᐯ</s-button>
          <div id="dropdown">
            <slot></slot>
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

}
