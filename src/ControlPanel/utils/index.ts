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
