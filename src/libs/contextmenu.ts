import type { App } from 'vue'
import ContextMenu from '@imengyu/vue3-context-menu'

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

export default function use(app: App) {
  app.use(ContextMenu)
}
