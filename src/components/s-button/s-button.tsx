import { Component, Host, h, ComponentInterface, Prop, Element, Watch } from '@stencil/core';
import { UIColor } from '../../global/ui-color';

@Component({
  tag: 's-button',
  styleUrl: 's-button.css',
  shadow: true,
})
export class SButton implements ComponentInterface {

  @Element() hostElement: HTMLSButtonElement;

  @Prop() fill: 'default' | 'outline' | 'clear' = 'default';
  
  @Prop({ reflect: true }) color: UIColor = 'primary';

  @Watch('color')
  colorChanged(color: UIColor) {
    this.updateCSSVariable(
      '--color',
      `hsl(var(--${color}-color-hsl))`
    );
  }

  connectedCallback() {
    this.colorChanged(this.color);
  }

  render() {
    return (
      <Host>
        <button id="native-element" class={`fill-${this.fill}`}>
          <slot></slot>
        </button>
      </Host>
    );
  }

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
