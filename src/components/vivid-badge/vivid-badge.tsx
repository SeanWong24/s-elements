import { Component, Host, h, ComponentInterface, Prop, Watch, Element } from '@stencil/core';
import { UIColor } from '../../global/ui-color';

@Component({
  tag: 'vivid-badge',
  styleUrl: 'vivid-badge.css',
  shadow: true,
})
export class VividBadge implements ComponentInterface {

  @Element() hostElement: HTMLVividBadgeElement;

  @Prop({ reflect: true }) color: UIColor = 'primary';

  @Watch('color')
  colorChanged(color: UIColor) {
    this.updateCSSVariable(
      '--background-color',
      `hsla(var(--${color}-color-hsl), var(--primary-material-transparency))`
    );
  }

  connectedCallback() {
    this.colorChanged(this.color);
  }

  render() {
    return (
      <Host>
        <div id="main-container">
          <slot></slot>
        </div>
      </Host>
    );
  }

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
