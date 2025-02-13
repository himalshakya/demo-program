export function AutoBind(_1: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this)
    },
  }
  return adjustedDescriptor
}
