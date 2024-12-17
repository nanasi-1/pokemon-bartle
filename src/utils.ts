// @see https://stackoverflow.com/questions/71728204/vue-3-vite-image-url-becomes-undefined-after-build
export function getImageUrl(path: string) {
  const url = new URL('/src/assets', location.origin)
  return `${url}${path}`
}

/** 
 * fromからtoまでの乱数を作成する  
 * 技での攻撃に関するfrom / toとは関係ない
 */
export function random(from: number, to: number) {
  const num = Math.random()
  return Math.floor(num * (from - to) + to)
}