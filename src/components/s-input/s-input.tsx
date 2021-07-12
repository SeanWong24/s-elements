import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 's-input',
  styleUrl: 's-input.css',
  shadow: true,
})
export class SInput implements ComponentInterface {

  render() {
    return (
      <Host>
        <input />
      </Host>
    );
  }

}
