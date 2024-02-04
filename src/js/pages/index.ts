import '../common.ts'

import { Banner } from '../modules/Banner'
import { CustomIntersectionObserver } from '../modules/CustomIntersectionObserver'

window.addEventListener('load', () => {
  try {
    const banner = new Banner({
      bannerTopSelector: '.banner-top',
      bannerBottomSelector: '.banner-wrapper',
    })
    new CustomIntersectionObserver({
      element: banner.bannerTopElem,
      callback: banner.observerCallback.bind(banner),
      options: {},
    })
  } catch (error) {
    console.warn(error)
  }
})
