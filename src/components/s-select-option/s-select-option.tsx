import { Component, Host, h, ComponentInterface, Prop, Element, Watch } from '@stencil/core';

@Component({
  tag: 's-select-option',
  styleUrl: 's-select-option.css',
  shadow: true,
})
export class SSelectOption implements ComponentInterface {

  private get actualValue() {
    return this.value || this.hostElement.innerText;
  }

  @Element() hostElement: HTMLSSelectOptionElement;

  @Prop() value: string;
  @Prop() isSelected = false;
  @Prop() parentSelectElement: HTMLSSelectElement;

  @Prop() highlightColor: string;
  @Watch('highlightColor')
  highlightColorChanged(value: string) {
    this.updateCSSVariable('--highlight-color', value);
  }

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

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
