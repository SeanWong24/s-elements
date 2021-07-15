import { Component, Host, h, ComponentInterface, Prop,Element, Watch } from '@stencil/core';

@Component({
  tag: 's-collapse',
  styleUrl: 's-collapse.css',
  shadow: true,
})
export class SCollapse implements ComponentInterface {

  private readonly animationDuration = 500;

  private mainContainer: HTMLDivElement;

  @Element() hostElement: HTMLSPopoverElement;

  @Prop() isHidden = true;

  @Watch('isHidden')
  isHiddenChanged(isHidden: boolean) {
    if (isHidden) {
      this.mainContainer?.classList.add('minimized');
      setTimeout(() => {
        this.mainContainer?.classList.add('hidden');
      }, this.animationDuration); // TODO use const for the transition duration
    } else {
      this.mainContainer?.classList.remove('hidden');
      setTimeout(() => {
        this.mainContainer?.classList.remove('minimized');
      });
    }
  }

  connectedCallback() {
    this.updateCSSVariable('--animation-duration', `${this.animationDuration}ms`);
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

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
