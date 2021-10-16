import { Component, Host, h, ComponentInterface, Element, Method, Prop } from '@stencil/core';
import { updateCSSVariable } from '../../utils/access-css-variable';

@Component({
  tag: 'vivid-flex-item',
  styleUrl: 'vivid-flex-item.css',
  shadow: true,
})
export class VividFlexItem implements ComponentInterface {

  private set fraction(value: number | 'auto') {
    updateCSSVariable('--fraction', value?.toString(), this.hostElement);
    this.updateFlexCSSVariable(value);
  }

  private get actualXs() {
    return this.xs;
  }

  private get actualSm() {
    return this.sm || this.actualXs;
  }

  private get actualMd() {
    return this.md || this.actualSm;
  }

  private get actualLg() {
    return this.lg || this.actualMd;
  }

  private get actualXl() {
    return this.xl || this.actualLg;
  }

  private get actualXxl() {
    return this.xxl || this.actualXl;
  }

  @Element() hostElement: HTMLVividFlexItemElement;

  @Prop({ reflect: true }) xs: number | 'auto';
  @Prop({ reflect: true }) sm: number | 'auto';
  @Prop({ reflect: true }) md: number | 'auto';
  @Prop({ reflect: true }) lg: number | 'auto';
  @Prop({ reflect: true }) xl: number | 'auto';
  @Prop({ reflect: true }) xxl: number | 'auto';

  @Method()
  async rowWidthChanged(width: number) {
    switch (true) {
      case (width >= this.getWrappedViewBreakpoint('xxl')):
        this.fraction = this.actualXxl;
        break;
      case (width >= this.getWrappedViewBreakpoint('xl')):
        this.fraction = this.actualXl;
        break;
      case (width >= this.getWrappedViewBreakpoint('lg')):
        this.fraction = this.actualLg;
        break;
      case (width >= this.getWrappedViewBreakpoint('md')):
        this.fraction = this.actualMd;
        break;
      case (width >= this.getWrappedViewBreakpoint('sm')):
        this.fraction = this.actualSm;
        break;
      default:
        this.fraction = this.actualXs;
    }
  }

  connectedCallback() {
    this.fraction = this.actualXs;
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private getWrappedViewBreakpoint(name: string) {
    return +getComputedStyle(this.hostElement).getPropertyValue(`--wrapped-${name}`);
  }

  private updateFlexCSSVariable(value: string | number) {
    switch (true) {
      case !Number.isNaN(+value):
        updateCSSVariable('--flex', '0 0 calc(var(--fraction) / var(--base-fraction) * 100%)', this.hostElement);
        break;
      case value === 'auto':
        updateCSSVariable('--flex', '0 0 auto', this.hostElement);
        break;
      default:
        updateCSSVariable('--flex', '1 1 auto', this.hostElement);
        break;
    }
  }

}
