import { Component, Host, h, ComponentInterface, Prop, Element, Watch } from '@stencil/core';

@Component({
  tag: 's-popover',
  styleUrl: 's-popover.css',
  shadow: true,
})
export class SPopover implements ComponentInterface {

  private mainContainer: HTMLDivElement;

  @Element() hostElement: HTMLSPopoverElement;

  @Prop({ reflect: true }) isHidden = true;

  @Watch('isHidden')
  isHiddenChanged(isHidden: boolean) {
    if (isHidden) {
      this.mainContainer?.classList.add('minimized');
      setTimeout(() => {
        this.mainContainer?.classList.add('hidden');
      }, 300); // TODO use const for the transition duration
    } else {
      this.mainContainer?.classList.remove('hidden');
      setTimeout(() => {
        this.mainContainer?.classList.remove('minimized');
      });
    }
  }

  render() {
    return (
      <Host>
        <div
          id="main-container"
          class="hidden minimized"
          ref={el => this.mainContainer = el}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }

}
