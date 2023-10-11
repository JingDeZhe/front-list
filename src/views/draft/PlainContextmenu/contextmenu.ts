import './contextmenu.scss'

type ContextMenuConfig = {
  theme?: string
}

type MenuItem = {
  label?: string
  type?: string
  children?: MenuItem[]
  onClick?: () => void
}

type MenuConfig = {
  x: number
  y: number
  menu?: MenuItem[]
}

const defaultCmuConfig = {
  theme: '',
}

const defaultShowConfig = {
  zIndex: 3000,
}

const MENU_ITEM_CLASS = 'plain-cmu_menu-item'
class ContextMenu {
  theme: string
  append = document.body
  mainEl: HTMLElement | undefined

  constructor(cfg?: ContextMenuConfig) {
    const fullConfig = Object.assign({}, defaultCmuConfig, cfg)
    this.theme = fullConfig.theme

    window.addEventListener('click', this.handleClick.bind(this))
  }

  show(menuConfig: MenuConfig) {
    if (this.mainEl) {
      this.mainEl.remove()
      this.mainEl = undefined
    }
    const fCfg = Object.assign({}, defaultShowConfig, menuConfig)
    const el = this.createMenu(fCfg)
    const { x, y, zIndex } = fCfg
    el.setAttribute('style', `z-index:${zIndex}`)

    this.append.appendChild(el)
    this.refreshPos(x, y, el)
    this.mainEl = el
  }

  private refreshPos(x: number, y: number, el: HTMLElement) {
    const { left, top } = calcPos(x, y, el)
    el.style.left = left + 'px'
    el.style.top = top + 'px'
  }

  private createMenu(cfg: MenuConfig) {
    const { menu } = cfg
    const el = document.createElement('div')
    el.className = `plain-cmu ${this.theme}`.trim()

    if (menu && menu.length > 0) {
      for (let item of menu) {
        const menuItem = this.createMenuItem(item)
        el.appendChild(menuItem)
      }
    }
    return el
  }

  private createMenuItem(item: MenuItem) {
    const el = document.createElement('div')
    el.className = MENU_ITEM_CLASS
    if (item.type === 'divide') {
      el.classList.add('cmu-divide')
    } else {
      el.innerText = item.label
    }
    if (item.children && item.children.length > 0) {
    }
    if (item.onClick) {
      el.addEventListener('click', item.onClick)
    }
    return el
  }

  private handleClick(e: MouseEvent) {
    if (!this.mainEl) return
    let t = e.target as HTMLElement
    while (t && t !== this.mainEl) {
      if (t.classList.contains(MENU_ITEM_CLASS)) {
        this.hideMenu()
        return
      }
      t = t.parentElement
    }
    if (!t) this.hideMenu()
  }

  private hideMenu() {
    this.mainEl.remove()
  }
}

function calcPos(x: number, y: number, el: HTMLElement) {
  const { clientWidth, clientHeight } = document.documentElement
  const { width, height } = el.getBoundingClientRect()

  const validRight = x + width < clientWidth
  const validBottom = y + height < clientHeight

  const fLeft = validRight ? x : x - width
  const fTop = validBottom ? y : y - height

  return { left: fLeft, top: fTop }
}

export default ContextMenu
