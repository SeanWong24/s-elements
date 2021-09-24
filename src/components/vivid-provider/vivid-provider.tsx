import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'vivid-provider',
  styleUrl: 'vivid-provider.css',
  shadow: true,
})
export class VividUi implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
