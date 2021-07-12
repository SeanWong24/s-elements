import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 's-button',
  styleUrl: 's-button.css',
  shadow: true,
})
export class SButton {

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
