import type { InjectionKey, Ref } from 'vue'

export type TooltipV2Context = {
  onClose: () => void
  onDelayOpen: () => void
  onOpen: () => void
  contentId: Ref<string>
  triggerRef: Ref<HTMLElement | null>
}

export const tooltipV2RootKey: InjectionKey<TooltipV2Context> =
  Symbol('tooltipV2')

export const TOOLTIP_V2_OPEN = 'tooltip_v2.open'
