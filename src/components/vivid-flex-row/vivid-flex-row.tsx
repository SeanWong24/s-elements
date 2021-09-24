import { Component, Host, h, ComponentInterface, Element } from '@stencil/core';
import { observeResize } from '../../utils/observe-resize';

@Component({
  tag: 'vivid-flex-row',
  styleUrl: 'vivid-flex-row.css',
  shadow: true,
})
export class VividFlexRow implements ComponentInterface {

  private readonly FLEX_COLUMN_TAG_NAME = 'vivid-flex-col';
  
  @Element() hostElement: HTMLVividFlexRowElement;

  connectedCallback() {
    observeResize.call(
      this,
      this.hostElement,
      [
        this.notifyWidthChangeToColElements
      ]
    )
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private notifyWidthChangeToColElements(entry: ResizeObserverEntry) {
    const width = entry.contentRect.width;
    this.hostElement.querySelectorAll(this.FLEX_COLUMN_TAG_NAME).forEach(colElement => colElement.rowWidthChanged(width));
  }

}
