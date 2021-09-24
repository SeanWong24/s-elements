import { Component, Host, h, ComponentInterface, Element, Prop, Watch } from '@stencil/core';
import { updateCSSVariable } from '../../utils/access-css-variable';

@Component({
  tag: 'vivid-flex-grid',
  styleUrl: 'vivid-flex-grid.css',
  shadow: true,
})
export class VividFlexGrid implements ComponentInterface {

  @Element() hostElement: HTMLVividFlexGridElement;

  @Prop({ reflect: true }) baseColumnCount = 12;

  @Watch('baseColumnCount')
  baseColumnCountChanged(value: number) {
    updateCSSVariable('--base-column-count', value.toString(), this.hostElement);
  }

  connectedCallback() {
    this.baseColumnCountChanged(this.baseColumnCount);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
