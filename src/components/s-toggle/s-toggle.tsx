import { Component, Host, h, Event, EventEmitter, Prop, ComponentInterface } from '@stencil/core';

@Component({
  tag: 's-toggle',
  styleUrl: 's-toggle.css',
  shadow: true,
})
export class SToggle implements ComponentInterface {

  @Prop({ mutable: true }) checked: boolean;

  @Event() sChange: EventEmitter<boolean>;

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

}
