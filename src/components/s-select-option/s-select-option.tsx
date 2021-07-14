import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 's-select-option',
  styleUrl: 's-select-option.css',
  shadow: true,
})
export class SSelectOption implements ComponentInterface {

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
