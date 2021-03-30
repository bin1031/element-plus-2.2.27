import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TimeSelect from '../src/time-select.vue'

const _mount = (template: string, data, otherObj?) =>
  mount(
    {
      components: {
        'el-time-select': TimeSelect,
      },
      template,
      data,
      ...otherObj,
    },
    {
      attachTo: 'body',
    },
  )

afterEach(() => {
  document.documentElement.innerHTML = ''
})

describe('TimeSelect', () => {
  it('create', async () => {
    const wrapper = _mount(
      `<el-time-select :style="{color:'red'}" class="customClass" />`,
      () => ({
        readonly: true,
      }),
    )
    const outerInput = wrapper.find('.el-select')
    expect(outerInput.classes()).toContain('customClass')
    expect(outerInput.attributes().style).toBeDefined()
  })

  it('set default value', async () => {
    const wrapper = _mount(`<el-time-select v-model="value" />`, () => ({
      value: '14:30',
    }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    expect(document.querySelector('.selected')).toBeDefined()
    expect(document.querySelector('.selected').textContent).toBe('14:30')
  })

  it('set minTime', async () => {
    const wrapper = _mount(`<el-time-select minTime='14:30' />`, () => ({}))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const elms = document.querySelectorAll('.is-disabled')
    const elm = elms[elms.length - 1]
    expect(elm.textContent).toBe('14:30')
  })

  it('set maxTime', async () => {
    const wrapper = _mount(`<el-time-select maxTime='14:30' />`, () => ({}))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const elm = document.querySelector('.is-disabled')
    expect(elm.textContent).toBe('14:30')
  })

  it('set value update', async () => {
    const wrapper = _mount(`<el-time-select v-model="value" />`, () => ({
      value: '10:00',
    }))
    await nextTick()

    const input = document.querySelector(
      'input.el-input__inner',
    ) as HTMLInputElement

    expect(input).toBeDefined()
    expect((input as HTMLInputElement).value).toBe('10:00')
    // wrapper.setData is not supported until version 2.0.0-beta.8
    // change value directly on `wrapper.vm`
    const vm = wrapper.vm as any
    vm.value = '10:30'
    await nextTick()
    expect(vm.value).toBe('10:30')
    expect(input.value).toBe('10:30')
  })
})
