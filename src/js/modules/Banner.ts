import { LocalStorageManager } from './LocalStorageManager'

/**
 * Баннер, управление показом баннера
 */
export class Banner {
  // селекторы
  private bannerTopSelector: string
  private bannerBottomSelector: string
  private closeSelector: string

  private keyLs: string
  private isCloseBanner: boolean

  // dom элементы
  public bannerTopElem: HTMLElement
  private bannerBottomElem: HTMLElement
  private closeElem: HTMLElement

  constructor({ bannerTopSelector, bannerBottomSelector }: { bannerTopSelector: string, bannerBottomSelector: string }) {
    this.bannerTopSelector = bannerTopSelector
    this.bannerBottomSelector = bannerBottomSelector
    this.closeSelector = '.banner__cross'

    this.keyLs = 'isCloseBanner'

    const bannerTopElem = document.querySelector(this.bannerTopSelector)
    if (bannerTopElem) this.bannerTopElem = bannerTopElem as HTMLElement
    const bannerBottomElem = document.querySelector(this.bannerBottomSelector)
    if (bannerBottomElem) this.bannerBottomElem = bannerBottomElem as HTMLElement
    const closeElem = bannerBottomElem?.querySelector(this.closeSelector)
    if (closeElem) this.closeElem = closeElem as HTMLElement

    if (!this.bannerTopElem || !this.bannerBottomElem) {
      throw new Error('the selector element was not found or not passed for the \'Banner\' class')
    }

    this.isCloseBanner = Boolean(LocalStorageManager.getData(this.keyLs))
    if (this.isCloseBanner) {
      throw new Error('banner is already hidden')
    }

    this.init()
  }

  private init() {
    this.handlers()
  }

  private closeBanner() {
    LocalStorageManager.saveData(this.keyLs, true)
    this.toggleActiveBanner(true)
    this.isCloseBanner = true
  }

  private toggleActiveBanner(isActive: boolean) {
    const activeClass = `${this.bannerBottomSelector.substring(1)}--active`
    const deactiveClass = `${this.bannerBottomSelector.substring(1)}--deactive`

    if (isActive) {
      if (this.bannerBottomElem.classList.contains(activeClass)) {
        this.bannerBottomElem.classList.add(deactiveClass)
      }
      this.bannerBottomElem.classList.remove(activeClass)
    } else {
      this.bannerBottomElem.classList.remove(deactiveClass)
      this.bannerBottomElem.classList.add(activeClass)
    }
  }

  public observerCallback(entries: IntersectionObserverEntry[]) {
    if (!this.isCloseBanner) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.toggleActiveBanner(true)
        } else if (entry.boundingClientRect.top < 0 && entry.rootBounds) {
          this.toggleActiveBanner(false)
        }
      })
    }
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (this.closeElem.contains(targetElement)) {
      this.closeBanner()
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
