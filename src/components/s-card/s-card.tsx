import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 's-card',
  styleUrl: 's-card.css',
  shadow: true,
})
export class SCard {

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
