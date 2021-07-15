import { Component, Host, h, ComponentInterface, Prop, Element } from '@stencil/core';

@Component({
  tag: 's-select-option',
  styleUrl: 's-select-option.css',
  shadow: true,
})
export class SSelectOption implements ComponentInterface {

  private get actualValue() {
    return this.value || this.hostElement.innerText;
  }

  private get parentSelectElement() {
    const parent = this.hostElement.parentElement;
    return parent.tagName.toLowerCase() === 's-select' ? (parent as HTMLSSelectElement) : undefined;
  }

  @Element() hostElement: HTMLSSelectOptionElement;

  @Prop() value: string;
  @Prop() isSelected = false;

  render() {
    return (
      <Host>
        <div
          id="main-container"
          class={this.isSelected ? 'selected' : ''}
          onClick={() => this.parentSelectElement.value = this.actualValue}>
          <slot></slot>
        </div>
      </Host>
    );
  }

}
