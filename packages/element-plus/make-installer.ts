import { provideGlobalConfig } from '@element-plus/hooks'
import { version } from './version'
import type { App, Plugin } from 'vue'
import type { ConfigProviderContext } from '@element-plus/tokens'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options: ConfigProviderContext = {}) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
    provideGlobalConfig(options, app)
  }

  return {
    version,
    install,
  }
}
