import { Component, Host, h, ComponentInterface, Element, Prop, Watch } from '@stencil/core';
import { updateCSSVariable } from '../../utils/access-css-variable';
import { observeResize } from '../../utils/observe-resize';

@Component({
  tag: 'vivid-flex',
  styleUrl: 'vivid-flex.css',
  shadow: true,
})
export class VividFlex implements ComponentInterface {

  private readonly FLEX_ITEM_TAG_NAME = 'vivid-flex-item';

  @Element() hostElement: HTMLVividFlexElement;

  @Prop({ reflect: true }) baseFraction = 12;

  @Watch('baseFraction')
  baseFractionChanged(value: number) {
    updateCSSVariable('--base-fraction', value.toString(), this.hostElement);
  }

  componentWillLoad() {
    this.baseFractionChanged(this.baseFraction);
    observeResize.call(
      this,
      this.hostElement,
      [
        this.notifySizeChangeToItemElements
      ]
    );
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private notifySizeChangeToItemElements(entry: ResizeObserverEntry) {
    const width = entry.contentRect.width;
    this.hostElement.querySelectorAll(this.FLEX_ITEM_TAG_NAME).forEach(colElement => colElement.rowWidthChanged(width));
  }

}
