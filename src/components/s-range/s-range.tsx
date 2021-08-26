import { Component, Host, h, ComponentInterface, EventEmitter, Prop, Event } from '@stencil/core';

@Component({
  tag: 's-range',
  styleUrl: 's-range.css',
  shadow: true,
})
export class SRange implements ComponentInterface {

  @Prop({ reflect: true, mutable: true }) value: number = 0;

  @Event() sChange: EventEmitter<string>;
  @Event() sInput: EventEmitter<InputEvent>;

  render() {
    return (
      <Host>
        <input
          id="native-element"
          type="range"
          onChange={event => this.sChange.emit((event.currentTarget as HTMLInputElement).value)}
          onInput={(event: InputEvent) => {
            this.value = +(event.currentTarget as HTMLInputElement).value;
            this.sInput.emit(event);
          }}
        />
      </Host>
    );
  }

}
