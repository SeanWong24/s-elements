import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 's-badge',
  styleUrl: 's-badge.css',
  shadow: true,
})
export class SBadge implements ComponentInterface {

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
