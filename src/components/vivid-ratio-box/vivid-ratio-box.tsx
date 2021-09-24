import { Component, Host, h, ComponentInterface, Element, Prop, Watch } from '@stencil/core';
import { updateCSSVariable } from '../../utils/access-css-variable';

@Component({
  tag: 'vivid-ratio-box',
  styleUrl: 'vivid-ratio-box.css',
  shadow: true,
})
export class VividRatioBox implements ComponentInterface {

  @Element() hostElement: HTMLVividRatioBoxElement;

  @Prop({ reflect: true }) heightRatio = 1;

  @Watch('heightRatio')
  heightRatioChanged(heightRatio: number) {
    updateCSSVariable('--height-ratio', heightRatio.toString(), this.hostElement);
  }

  @Prop({ reflect: true }) widthRatio = 1;

  @Watch('heightRatio')
  widthRatioChanged(widthRatio: number) {
    updateCSSVariable('--width-ratio', widthRatio.toString(), this.hostElement);
  }

  connectedCallback() {
    this.heightRatioChanged(this.heightRatio);
    this.widthRatioChanged(this.widthRatio);
  }

  render() {
    return (
      <Host>
        <div id="outer-container">
          <div id="inner-container">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

}
