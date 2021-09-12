import { Component, Host, h, ComponentInterface, Prop, Element, Watch } from '@stencil/core';

@Component({
  tag: 's-popover',
  styleUrl: 's-popover.css',
  shadow: true,
})
export class SPopover implements ComponentInterface {

  private readonly animationDuration = 300;

  private mainContainer: HTMLDivElement;

  @Element() hostElement: HTMLSPopoverElement;

  @Prop({ reflect: true }) isHidden = true;

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

  @Prop() position: { x?: string, y?: string, offsetX?: string, offsetY?: string } | string;

  @Watch('position')
  positionChanged(position: { x?: string, y?: string, offsetX?: string, offsetY?: string } | string) {
    let x: string;
    let y: string;
    let offsetX: string;
    let offsetY: string;
    if (typeof position === 'string') {
      [x, y, offsetX, offsetY] = position?.trim().split(/\s+/);
    } else {
      x = position?.x;
      y = position?.y;
      offsetX = position?.offsetX;
      offsetY = position?.offsetY;
    }
    this.updateCSSVariable('--position-x', `${x || '50%'}`);
    this.updateCSSVariable('--position-y', `${y || '50%'}`);
    this.updateCSSVariable('--position-offset-x', `${offsetX || '-50%'}`);
    this.updateCSSVariable('--position-offset-y', `${offsetY || '-50%'}`);
  }

  @Prop() transformOrigin = 'center center';

  @Watch('transformOrigin')
  transformOriginChanged(transformOrigin: string) {
    this.updateCSSVariable('--transform-origin', transformOrigin);
  }  

  @Prop() zIndex = 9999;

  @Watch('zIndex')
  zIndexChanged(zIndex: number) {
    this.updateCSSVariable('--z-index', `${zIndex}`);
  }

  connectedCallback() {
    this.updateCSSVariable('--animation-duration', `${this.animationDuration}ms`);
    this.positionChanged(this.position);
    this.transformOriginChanged(this.transformOrigin);
    this.zIndexChanged(this.zIndex);
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
