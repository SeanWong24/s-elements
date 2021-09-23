import { Component, Host, h, Event, EventEmitter, Prop, ComponentInterface, Watch, Element } from '@stencil/core';
import { UIColor } from '../../global/ui-color';

@Component({
  tag: 'vivid-toggle',
  styleUrl: 'vivid-toggle.css',
  shadow: true,
})
export class VividToggle implements ComponentInterface {

  @Element() hostElement: HTMLVividToggleElement;

  @Prop({ mutable: true }) checked: boolean;

  @Prop({ reflect: true }) scale = 1;

  @Watch('scale')
  scaleChanged(scale: number) {
    this.updateCSSVariable('--scale', scale.toString());
  }

  @Prop({ reflect: true }) color: UIColor = 'primary';

  @Watch('color')
  colorChanged(color: UIColor) {
    this.updateCSSVariable(
      '--highlight-color',
      `hsl(var(--${color}-color-hsl))`
    );
  }

  @Event() sChange: EventEmitter<boolean>;

  connectedCallback() {
    this.scaleChanged(this.scale);
    this.colorChanged(this.color);
  }

  render() {
    return (
      <Host>
        <input
          id="native-element"
          type="checkbox"
          checked={this.checked}
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
