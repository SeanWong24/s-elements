import { Component, Host, h, ComponentInterface, EventEmitter, Prop, Event, Watch, Element } from '@stencil/core';

@Component({
  tag: 's-range',
  styleUrl: 's-range.css',
  shadow: true,
})
export class SRange implements ComponentInterface {

  @Element() hostElement: HTMLSRangeElement;

  @Prop({ reflect: true }) min: number = 0;
  @Prop({ reflect: true }) max: number = 100;
  @Prop({ reflect: true }) step: number | '' | 'any' = '';

  @Prop({ reflect: true, mutable: true }) value: number = 0;

  @Watch('value')
  valueChanged(value: number) {
    const positionPercentage = (value - this.min) / (this.max - this.min) * 100;
    this.updateCSSVariable('--handle-position', `${positionPercentage}%`);
  }

  @Event() sChange: EventEmitter<string>;
  @Event() sInput: EventEmitter<InputEvent>;

  connectedCallback() {
    this.valueChanged(this.value);
  }

  render() {
    return (
      <Host>
        <input
          id="native-element"
          type="range"
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          onChange={event => this.sChange.emit((event.currentTarget as HTMLInputElement).value)}
          onInput={(event: InputEvent) => {
            this.value = +(event.currentTarget as HTMLInputElement).value;
            this.sInput.emit(event);
          }}
        />
      </Host>
    );
  }

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
