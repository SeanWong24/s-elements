import { Component, Host, h, ComponentInterface, Prop, Element, Watch } from '@stencil/core';

@Component({
  tag: 'vivid-select-option',
  styleUrl: 'vivid-select-option.css',
  shadow: true,
})
export class VividSelectOption implements ComponentInterface {

  private get actualValue() {
    return this.value || this.hostElement.innerText;
  }

  @Element() hostElement: HTMLVividSelectOptionElement;

  @Prop() value: string;
  @Prop() isSelected = false;
  @Prop() parentSelectElement: HTMLVividSelectElement;

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
