(() => {
  const setText = (selector, value) => {
    if (!value) return
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value
    })
  }

  const setHref = (kind, value) => {
    if (!value) return
    document.querySelectorAll(`[data-download="${kind}"]`).forEach((element) => {
      element.setAttribute('href', value)
    })
  }

  fetch('./release.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`release manifest: ${response.status}`)
      return response.json()
    })
    .then((release) => {
      setText('[data-release-version]', release.version)
      setText('[data-portable-name]', release.portable?.name)
      setText('[data-portable-size]', release.portable?.sizeText)
      setText('[data-portable-sha256]', release.portable?.sha256)
      setHref('portable', release.portable?.url)
    })
    .catch(() => {
      // 页面保留 HTML 中的上一个已发布版本，清单短暂不可用时仍可下载。
    })
})()
