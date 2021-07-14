import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 's-ui',
  styleUrl: 's-ui.css',
  shadow: true,
})
export class SUi implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
