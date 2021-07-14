import { Component, Host, h, State, Watch, ComponentInterface } from '@stencil/core';

@Component({
  tag: 's-select',
  styleUrl: 's-select.css',
  shadow: true,
})
export class SSelect implements ComponentInterface {

  @State() isDropdownHidden = true;

  @Watch('isDropdownHidden')
  isDropdownHiddenChanged(isDropdownHidden: boolean) {
    if (isDropdownHidden) {
      this.removeDropdownDismissListenerToBodyElement();
    } else {
      this.addDropdownDismissListenerToBodyElement();
    }
  }

  connectedCallback() {
    if (this.isDropdownHidden) {
      this.removeDropdownDismissListenerToBodyElement();
    } else {
      this.addDropdownDismissListenerToBodyElement();
    }
  }

  render() {
    return (
      <Host>
        <div
          id="select"
          class={this.isDropdownHidden ? 'dropdown-hidden' : ''}
          onClick={() => this.isDropdownHidden = !this.isDropdownHidden}
        >
          <span>something</span>
          <s-button
            id="dropdown-toggle-button"
            fill="clear"
          >ᐯ</s-button>
          <div id="dropdown">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

  private addDropdownDismissListenerToBodyElement = () => {
    setTimeout(() => {
      document.querySelector('body').addEventListener('click', this.dismissDropdown);
    });
  };

  private removeDropdownDismissListenerToBodyElement = () => {
    document.querySelector('body').removeEventListener('click', this.dismissDropdown);
  };

  private dismissDropdown = () => {
    this.isDropdownHidden = true;
  };

}
