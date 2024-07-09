const isMac = /mac/i.test(navigator.platform)
const metaKey = isMac ? "metaKey" : "ctrlKey"
const originalMetaKeyGetter = Object.getOwnPropertyDescriptor(
  MouseEvent.prototype,
  metaKey
)!
const originalAltKeyGetter = Object.getOwnPropertyDescriptor(
  MouseEvent.prototype,
  "altKey"
)!

function overrideKeyProperty(
  property: string,
  value: boolean,
  originalDescriptor: PropertyDescriptor
) {
  Object.defineProperty(MouseEvent.prototype, property, {
    get() {
      return value
    },
    configurable: true
  })
}

export function toggleAltPress(press: boolean) {
  if (press) {
    overrideKeyProperty("altKey", true, originalAltKeyGetter)
  } else {
    Object.defineProperty(MouseEvent.prototype, "altKey", originalAltKeyGetter)
  }
}

export function toggleMetaPress(press: boolean) {
  if (press) {
    overrideKeyProperty(metaKey, true, originalMetaKeyGetter)
  } else {
    Object.defineProperty(MouseEvent.prototype, metaKey, originalMetaKeyGetter)
  }
}

// 获取画布元素
export function getCanvas(): HTMLElement | null {
  // 确保整个插件在画布准备好之后渲染，以便将结果转换为 HTMLElement。
  return document.querySelector(
    "#fullscreen-root .gpu-view-content canvas"
  ) as HTMLElement
}

// 获取对象面板元素
export function getObjectsPanel(): HTMLElement | null {
  // 类似于 `getCanvas()`。
  return document.querySelector('[data-testid="objects-panel"]') as HTMLElement
}
