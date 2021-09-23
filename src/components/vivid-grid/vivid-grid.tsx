import { Component, Host, h, Prop, ComponentInterface, Element, Watch } from '@stencil/core';

@Component({
  tag: 'vivid-grid',
  styleUrl: 'vivid-grid.css',
  shadow: true,
})
export class VividGrid implements ComponentInterface {

  @Element() hostElement: HTMLVividGridElement;

  @Prop({ reflect: true }) rows: string;

  @Watch('rows')
  rowsChanged(rows: string) {
    this.updateCSSVariable('--grid-template-rows', rows);
  }

  @Prop({ reflect: true }) columns: string;

  @Watch('columns')
  columnsChanged(columns: string) {
    this.updateCSSVariable('--grid-template-columns', columns);
  }

  @Prop({ reflect: true }) rowGap: string;

  @Watch('rowGap')
  rowGapChanged(rowGap: string) {
    this.updateCSSVariable('--grid-row-gap', rowGap);
  }

  @Prop({reflect:true}) columnGap:string;

  @Watch('columnGap')
  columnGapChanged(columnGap: string) {
    this.updateCSSVariable('--grid-column-gap', columnGap);
  }

  connectedCallback() {
    this.rowsChanged(this.rows);
    this.columnsChanged(this.columns);
    this.rowGapChanged(this.rowGap);
    this.columnGapChanged(this.columnGap);
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
