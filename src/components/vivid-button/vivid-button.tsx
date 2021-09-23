import { Component, Host, h, ComponentInterface, Prop, Element, Watch } from '@stencil/core';
import { UIColor } from '../../global/ui-color';

export type ButtonVariant = 'solid' | 'outline' | 'clear';

@Component({
  tag: 'vivid-button',
  styleUrl: 'vivid-button.css',
  shadow: true,
})
export class VividButton implements ComponentInterface {

  @Element() hostElement: HTMLVividButtonElement;

  @Prop() variant: ButtonVariant = 'solid';
  
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
        <button id="native-element" class={this.variant}>
          <slot></slot>
        </button>
      </Host>
    );
  }

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
