import { Component, Host, h, ComponentInterface, Prop, Watch, Element, State } from '@stencil/core';

export type OverlayPosition = { x?: string, y?: string, offsetX?: string, offsetY?: string, type?: 'fixed' | 'absolute' };

@Component({
  tag: 'vivid-overlay',
  styleUrl: 'vivid-overlay.css',
  shadow: true,
})
export class VividOverlay implements ComponentInterface {

  // TODO use CSS variable value
  private readonly animationDuration = 300;

  private originalParent: HTMLElement;

  @Element() hostElement: HTMLVividOverlayElement;

  @State() status: 'displayed' | 'minimized' | 'hidden';

  @Prop({ reflect: true }) useBackdrop = false;

  @Prop({ reflect: true }) showed = false;

  @Watch('showed')
  showedChanged(showed: boolean, previousValue?: boolean) {
    if (showed) {
      this.originalParent = this.hostElement.parentElement;
      const attachingContainer = document.querySelector('vivid-ui') || document.querySelector('body');
      attachingContainer.appendChild(this.hostElement);
      this.status = 'minimized';
      setTimeout(() => {
        this.status = 'displayed';
      });
    } else {
      this.status = 'minimized';
      setTimeout(() => {
        this.status = 'hidden';
        if (previousValue) {
          this.originalParent?.appendChild(this.hostElement) || this.hostElement.remove();
        }
      }, this.animationDuration);
    }
  }

  @Prop() position: OverlayPosition | string;

  @Watch('position')
  positionChanged(position: OverlayPosition | string) {
    let x: string;
    let y: string;
    let offsetX: string;
    let offsetY: string;
    let type: string;
    if (typeof position === 'string') {
      [x, y, offsetX, offsetY, type] = position?.trim().split(/\s+/);
    } else {
      x = position?.x;
      y = position?.y;
      offsetX = position?.offsetX;
      offsetY = position?.offsetY;
      type = position?.type;
    }
    this.updateCSSVariable('--position-x', `${x || '50%'}`);
    this.updateCSSVariable('--position-y', `${y || '50%'}`);
    this.updateCSSVariable('--position-offset-x', `${offsetX || '-50%'}`);
    this.updateCSSVariable('--position-offset-y', `${offsetY || '-50%'}`);
    this.updateCSSVariable('--position-type', `${type || 'fixed'}`);
  }

  @Prop({ reflect: true }) transformOrigin = 'center center';

  @Watch('transformOrigin')
  transformOriginChanged(transformOrigin: string) {
    this.updateCSSVariable('--transform-origin', transformOrigin);
  }

  @Prop({reflect:true}) minimizedScale = '.001 .001';

  @Watch('minimizedScale')
  minimizedScaleChanged(minimizedScale: string) {
    this.updateCSSVariable('--minimized-scale', minimizedScale?.split(' ').join(', '));
  }

  @Prop({ reflect: true }) zIndex = 100;

  @Watch('zIndex')
  zIndexChanged(zIndex: number) {
    this.updateCSSVariable('--z-index', `${zIndex}`);
  }

  componentWillLoad() {
    this.showedChanged(this.showed);
    this.positionChanged(this.position);
    this.transformOriginChanged(this.transformOrigin);
    this.minimizedScaleChanged(this.minimizedScale);
    this.zIndexChanged(this.zIndex);
  }

  render() {
    return (
      <Host>
        {
          this.status !== 'hidden' && this.useBackdrop &&
          <div id="backdrop"></div>
        }
        {
          this.status !== 'hidden' &&
          <div id="main-container" class={this.status === 'minimized' && 'minimized'}>
            <slot></slot>
          </div>
        }
      </Host>
    );
  }

  private updateCSSVariable(variableName: string, value: string) {
    this.hostElement.style.setProperty(variableName, value);
  }

}
