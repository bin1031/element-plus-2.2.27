/* eslint-disable @typescript-eslint/no-var-requires */
const helper = require('components-helper')
const { name, version } = require('../package.json')
const tagVer = process.env.TAG_VERSION
const _version = tagVer ? tagVer.startsWith('v') ? tagVer.slice(1) : tagVer : version

helper({
  name,
  version: _version,
  entry: 'website/docs/en-US/!(custom-theme|datetime-picker|i18n|installation|message-box|message|migration-from-2.x|notification|quickstart|transition|typography).md',
  outDir: 'lib',
  reComponentName,
  reDocUrl,
  reAttribute,
  props: 'Attributes',
  propsName: 'Attribute',
  propsOptions: 'Accepted Values',
  eventsName: 'Event Name',
  tableRegExp: '#+\\s+(.*\\s*Attributes|.*\\s*Events|.*\\s*Slots|.*\\s*Directives)\\s*\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+((\\n\\|?.+\\|.+)+)',
})

function reComponentName(title) {
  return 'el-' + title.replace(/\B([A-Z])/g, '-$1').replace(/[ ]+/g, '-').toLowerCase()
}

function reDocUrl(fileName, header) {
  const docs = 'https://element-plus.org/#/en-US/component/'
  const _header = header ? header.replace(/[ ]+/g, '-').toLowerCase() : undefined
  return docs + fileName + (_header ? '#' + _header : '')
}

function reAttribute(value, key) {
  const _value = value.match(/^\*\*(.*)\*\*$/)
  const str = _value ? _value[1]: value

  if (str === '') {
    return undefined
  } else if (/^(-|—)$/.test(str)) {
    return key === 'Name' ? 'default' : undefined
  } else if (/v-model:(.+)/.test(str)){
    const _str = str.match(/v-model:(.+)/)
    return _str ? _str[1] : undefined
  } else if (/v-model/.test(str)) {
    return 'model-value'
  } else if (key === 'Attribute') {
    return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
  } else if (key === 'Type') {
    return str.replace(/\s*\/\s*/g, '|').replace(/\(.*\)/g, '').toLowerCase()
  } else if (key === 'Accepted Values') {
    return /\[.+\]\(.+\)/.test(str) || /^\*$/.test(str) ? undefined : str
  } else {
    return str
  }
}
