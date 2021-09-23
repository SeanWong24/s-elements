import { Component, Host, h, ComponentInterface, Prop, Watch, Element } from '@stencil/core';

@Component({
  tag: 'vivid-grid-item',
  styleUrl: 'vivid-grid-item.css',
  shadow: true,
})
export class VividGridItem implements ComponentInterface {

  @Element() hostElement: HTMLVividGridItemElement;

  @Prop({ reflect: true }) column: number;

  @Watch('column')
  columnChanged(column: number) {
    this.updateCSSVariable('--grid-column', column?.toString());
  }

  @Prop({ reflect: true }) columnSpan: number;

  @Watch('columnSpan')
  columnSpanChanged(columnSpan: number) {
    this.updateCSSVariable('--grid-column-span', columnSpan?.toString());
  }

  @Prop({ reflect: true }) row: number;

  @Watch('row')
  rowChanged(row: number) {
    this.updateCSSVariable('--grid-row', row?.toString());
  }

  @Prop({ reflect: true }) rowSpan: number;

  @Watch('rowSpan')
  rowSpanChanged(rowSpan: number) {
    this.updateCSSVariable('--grid-row-span', rowSpan?.toString());
  }

  connectedCallback() {
    this.rowChanged(this.row);
    this.rowSpanChanged(this.rowSpan);
    this.columnChanged(this.column);
    this.columnSpanChanged(this.columnSpan);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private updateCSSVariable(variableName: string, value: string) {
    // TODO note this one is different
    if(value === undefined || value === null){
      this.hostElement.style.setProperty(variableName, '');
    } else {
      this.hostElement.style.setProperty(variableName, value);
    }
  }

}
