import { computed, inject, ref, toRaw } from 'vue'
import { isEqual, isNil } from 'lodash-unified'
import { useFormSize } from '@element-plus/components/form'
import { isArray, isBoolean, isObject } from '@element-plus/utils'
import { checkboxGroupContextKey } from '../constants'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../checkbox'
import type { CheckboxModel } from '../composables'

function supportIsCheck(
  value: any[],
  props: CheckboxProps,
  key: keyof typeof props
) {
  if (isObject(props[key])) {
    return value.map(toRaw).some((o) => isEqual(o, props[key]))
  } else {
    return value.map(toRaw).includes(props[key])
  }
}

export const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Pick<CheckboxModel, 'model'>
) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isFocused = ref(false)
  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    } else if (isArray(value)) {
      if (props.trueLabel) {
        return supportIsCheck(value, props, 'trueLabel')
      } else {
        return supportIsCheck(value, props, 'label')
      }
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    } else {
      return !!value
    }
  })

  const checkboxButtonSize = useFormSize(
    computed(() => checkboxGroup?.size?.value),
    {
      prop: true,
    }
  )
  const checkboxSize = useFormSize(computed(() => checkboxGroup?.size?.value))

  const hasOwnLabel = computed<boolean>(() => {
    return !!slots.default || !isNil(props.label)
  })

  return {
    checkboxButtonSize,
    isChecked,
    isFocused,
    checkboxSize,
    hasOwnLabel,
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
