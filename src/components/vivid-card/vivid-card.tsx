import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'vivid-card',
  styleUrl: 'vivid-card.css',
  shadow: true,
})
export class VividCard implements ComponentInterface {

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
