// Auto-generated shims to silence missing third-party type declarations during development
declare module '@radix-ui/react-accordion'
declare module '@radix-ui/react-alert'
declare module '@radix-ui/react-alert-dialog'
declare module '@radix-ui/react-aspect-ratio'
declare module '@radix-ui/react-avatar'
declare module '@radix-ui/react-breadcrumb'
declare module '@radix-ui/react-button'
declare module '@radix-ui/react-calendar'
declare module '@radix-ui/react-card'
declare module '@radix-ui/react-checkbox'
declare module '@radix-ui/react-collapsible'
declare module '@radix-ui/react-context-menu'
declare module '@radix-ui/react-dialog'
declare module '@radix-ui/react-dropdown-menu'
declare module '@radix-ui/react-form'
declare module '@radix-ui/react-hover-card'
declare module '@radix-ui/react-label'
declare module '@radix-ui/react-menubar'
declare module '@radix-ui/react-navigation-menu'
declare module '@radix-ui/react-popover'
declare module '@radix-ui/react-progress'
declare module '@radix-ui/react-radio-group'
declare module '@radix-ui/react-scroll-area'
declare module '@radix-ui/react-select'
declare module '@radix-ui/react-separator'
declare module '@radix-ui/react-slot'
declare module '@radix-ui/react-toast'
declare module '@radix-ui/react-tooltip'
declare module '@radix-ui/react-slider'
declare module '@radix-ui/react-switch'
declare module '@radix-ui/react-tabs'
declare module '@radix-ui/react-toggle'
declare module '@radix-ui/react-toggle-group'
declare module '@radix-ui/react-toast'

declare module 'vaul'
declare module 'cmdk'
declare module 'class-variance-authority' {
  export function cva(...args: any[]): any
  export type VariantProps<T = any> = any
}
declare module 'input-otp' {
  import * as React from 'react'
  export const OTPInput: any
  export const OTPInputContext: React.Context<any>
}
declare module 'react-hook-form' {
  export type FieldValues = any
  export type FieldPath<T> = any
  export type ControllerProps<TFieldValues = any, TName = any> = any
  export function useForm(): any
  export const Controller: any
  export const FormProvider: any
  export function useFormContext(): any
  export function useFormState(arg?: any): any
}

declare module 'embla-carousel-react' {
  const useEmblaCarousel: any
  export type UseEmblaCarouselType = any
  export default useEmblaCarousel
}

declare module 'react-day-picker' {
  export const DayPicker: any
  export const DayButton: any
  export function getDefaultClassNames(...args: any[]): any
}
declare module 'react-resizable-panels'
declare module 'next-themes'
declare module 'sonner' {
  export type ToasterProps = any
  export const Toaster: any
}
declare module 'sonner/dist/types' {
  export const Toaster: any
}

// Generic shims
declare module '*/styles.css'

// Allow importing modules without types
declare module '*' {
  const content: any
  export default content
}
