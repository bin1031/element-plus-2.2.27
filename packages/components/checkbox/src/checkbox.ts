import { buildProps, componentSize } from '@element-plus/utils/props'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/utils/constants'
import type { ComputedRef, ExtractPropTypes } from 'vue'
import type { AnyFunction } from '@element-plus/utils/types'

export const checkboxProps = buildProps({
  modelValue: {
    type: [Boolean, Number, String],
    default: undefined,
  },
  label: {
    type: [String, Boolean, Number, Object],
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: undefined,
  },
  trueLabel: {
    type: [String, Number],
    default: undefined,
  },
  falseLabel: {
    type: [String, Number],
    default: undefined,
  },
  id: {
    type: String,
    default: undefined,
  },
  controls: {
    type: String,
    default: undefined,
  },
  border: Boolean,
  size: {
    type: String,
    values: componentSize,
  },
  tabindex: {
    type: [String, Number],
  },
} as const)
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean) => typeof val === 'boolean',
  [CHANGE_EVENT]: (val: number | string | boolean, evt: InputEvent) =>
    evt instanceof InputEvent,
}
export type CheckboxEmits = typeof checkboxEmits

export interface CheckboxGroupInstance {
  name?: string
  modelValue?: ComputedRef
  disabled?: ComputedRef<boolean>
  min?: ComputedRef<string | number>
  max?: ComputedRef<string | number>
  size?: ComputedRef<string>
  fill?: ComputedRef<string>
  textColor?: ComputedRef<string>
  checkboxGroupSize?: ComputedRef<string>
  changeEvent?: AnyFunction<any>
}
