export const isStandalone = () => {
  if (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone
  ) {
    return true
  }

  return false
}

export default isStandalone
