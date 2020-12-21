import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Avatar from './src/index.vue'

Avatar.install = (app: App): void => {
  app.component(Avatar.name, Avatar)
}

const _Avatar: SFCWithInstall<typeof Avatar> = Avatar

export default _Avatar
