import { Component, Host, h, ComponentInterface, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 's-input',
  styleUrl: 's-input.css',
  shadow: true,
})
export class SInput implements ComponentInterface {

  @Prop({ reflect: true, mutable: true }) value: string;
  @Prop({ reflect: true }) placeholder: string;

  @Event() sChange: EventEmitter<string>;
  @Event() sInput: EventEmitter<InputEvent>;

  render() {
    return (
      <Host>
        <div id="main-container">
          <span id="label-container">
            <slot></slot>
          </span>
          <input
            id="native-element"
            value={this.value}
            placeholder={this.placeholder}
            onChange={event => this.sChange.emit((event.currentTarget as HTMLInputElement).value)}
            onInput={(event: InputEvent) => {
              this.value = (event.currentTarget as HTMLInputElement).value;
              this.sInput.emit(event);
            }}
          />
        </div>
      </Host>
    );
  }

}
