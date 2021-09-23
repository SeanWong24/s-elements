import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'vivid-ui',
  styleUrl: 'vivid-ui.css',
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
