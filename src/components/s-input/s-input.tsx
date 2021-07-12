import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 's-input',
  styleUrl: 's-input.css',
  shadow: true,
})
export class SInput {

  render() {
    return (
      <Host>
        <input />
      </Host>
    );
  }

}
