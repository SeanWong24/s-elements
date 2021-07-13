import { Component, Host, h, Event, EventEmitter, Prop, ComponentInterface, Watch, Element } from '@stencil/core';

@Component({
  tag: 's-toggle',
  styleUrl: 's-toggle.css',
  shadow: true,
})
export class SToggle implements ComponentInterface {

  @Element() hostElement: HTMLSToggleElement;

  @Prop({ mutable: true }) checked: boolean;

  @Prop({ reflect: true }) scale = 1;

  @Watch('scale')
  scaleChanged(scale: number) {
    this.updateCSSVariable('--scale', scale.toString());
  }

  @Event() sChange: EventEmitter<boolean>;

  connectedCallback() {
    this.updateCSSVariable('--scale', this.scale.toString());
  }

  render() {
    return (
      <Host>
        <input
          id="native-element"
          type="checkbox"
          onChange={event => {
            this.checked = (event.currentTarget as HTMLInputElement).checked;
            this.sChange.emit(this.checked);
          }}
        />
      </Host>
    );
  }

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
