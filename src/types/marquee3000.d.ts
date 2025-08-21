declare module 'marquee3000' {
  export interface MarqueeOptions {
    speed?: number;
    direction?: 'left' | 'right';
    pauseOnHover?: boolean;
    pauseOnClick?: boolean;
    loop?: boolean;
    delay?: number;
    gap?: number;
    duplicated?: boolean;
    startVisible?: boolean;
    startHidden?: boolean;
    startPaused?: boolean;
    startVisibleClass?: string;
    startHiddenClass?: string;
    startPausedClass?: string;
    startVisibleCallback?: () => void;
    startHiddenCallback?: () => void;
    startPausedCallback?: () => void;
    pauseCallback?: () => void;
    resumeCallback?: () => void;
    finishCallback?: () => void;
    destroyCallback?: () => void;
  }

  export class Marquee {
    constructor(element: HTMLElement, options?: MarqueeOptions);
    pause(): void;
    resume(): void;
    destroy(): void;
    toggle(): void;
    isPaused(): boolean;
    isDestroyed(): boolean;
  }

  export function init(options?: MarqueeOptions): void;
  export function refresh(): void;
  export function destroy(): void;
}
