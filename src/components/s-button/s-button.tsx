import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 's-button',
  styleUrl: 's-button.css',
  shadow: true,
})
export class SButton implements ComponentInterface {

  render() {
    return (
      <Host>
        <button>
          <slot></slot>
        </button>
      </Host>
    );
  }

}
