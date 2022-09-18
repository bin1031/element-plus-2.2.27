import { buildProps } from '@element-plus/utils'
import { createModelToggleComposable } from '@element-plus/hooks'
import {
  usePopperArrowProps,
  usePopperProps,
} from '@element-plus/components/popper'
import { useTooltipContentProps } from './content'
import { useTooltipTriggerProps } from './trigger'
import type { ElTooltipTriggerProps } from './trigger'
import type { ElTooltipContentProps } from './content'
import type Tooltip from './tooltip.vue'

import type { ExtractPropTypes } from 'vue'

export const useTooltipProps = buildProps({
  openDelay: {
    type: Number,
  },
  visibleArrow: {
    type: Boolean,
    default: undefined,
  },
  hideAfter: {
    type: Number,
    default: 200,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
})

export const createModelToggleComposableResult = createModelToggleComposable(
  'visible' as const
)

export const TooltipProps = {
  ...usePopperProps,
  ...createModelToggleComposableResult.useModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...usePopperArrowProps,
  ...useTooltipProps,
}

export const TooltipEmits = [
  ...createModelToggleComposableResult.useModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close',
]

export type ElTooltipProps = ExtractPropTypes<typeof useTooltipProps> &
  ElTooltipContentProps &
  ElTooltipTriggerProps

export type TooltipInstance = InstanceType<typeof Tooltip>
