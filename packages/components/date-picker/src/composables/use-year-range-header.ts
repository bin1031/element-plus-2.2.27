import { computed } from 'vue'
import dayjs from 'dayjs'
import type { Ref, ToRef } from 'vue'
import type { Dayjs } from 'dayjs'

export const useYearRangeHeader = ({
  unlinkPanels,
  leftDate,
  rightDate,
}: {
  unlinkPanels: ToRef<boolean>
  leftDate: Ref<Dayjs>
  rightDate: Ref<Dayjs>
}) => {
  const leftPrevYear = () => {
    leftDate.value = leftDate.value.subtract(10, 'year')
    if (!unlinkPanels.value) {
      rightDate.value = rightDate.value.subtract(10, 'year')
    }
  }

  const rightNextYear = () => {
    if (!unlinkPanels.value) {
      leftDate.value = leftDate.value.add(10, 'year')
    }
    rightDate.value = rightDate.value.add(10, 'year')
  }

  const leftNextYear = () => {
    leftDate.value = leftDate.value.add(10, 'year')
  }

  const rightPrevYear = () => {
    rightDate.value = rightDate.value.subtract(10, 'year')
  }

  const leftLabel = computed(() => {
    const leftStartDate = dayjs()
      .year(Math.floor(leftDate.value.year() / 10) * 10)
      .year()
    return `${leftStartDate}-${leftStartDate + 9}`
  })

  const rightLabel = computed(() => {
    const rightStartDate = dayjs()
      .year(Math.floor(rightDate.value.year() / 10) * 10)
      .year()
    return `${rightStartDate}-${rightStartDate + 9}`
  })

  const leftYear = computed(() => {
    const leftEndDate =
      dayjs()
        .year(Math.floor(leftDate.value.year() / 10) * 10)
        .year() + 9
    return leftEndDate
  })

  const rightYear = computed(() => {
    const rightStartDate = dayjs()
      .year(Math.floor(rightDate.value.year() / 10) * 10)
      .year()
    return rightStartDate
  })

  return {
    leftPrevYear,
    rightNextYear,
    leftNextYear,
    rightPrevYear,
    leftLabel,
    rightLabel,
    leftYear,
    rightYear,
  }
}
