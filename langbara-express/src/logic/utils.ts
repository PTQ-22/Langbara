export function copyof(obj: Object) {
  return JSON.parse(JSON.stringify(obj))
}