import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 's-card',
  styleUrl: 's-card.css',
  shadow: true,
})
export class SCard implements ComponentInterface {

  render() {
    return (
      <Host>
        <div id="main-container">
          <slot></slot>
        </div>
      </Host>
    );
  }

}
