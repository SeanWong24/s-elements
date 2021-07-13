import { Component, Host, h, ComponentInterface, Prop } from '@stencil/core';

@Component({
  tag: 's-button',
  styleUrl: 's-button.css',
  shadow: true,
})
export class SButton implements ComponentInterface {
  @Prop() fill: 'default' | 'outline' | 'clear' = 'default';

  render() {
    return (
      <Host>
        <button id="native-element" class={`fill-${this.fill}`}>
          <slot></slot>
        </button>
      </Host>
    );
  }

}
