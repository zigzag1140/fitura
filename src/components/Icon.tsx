import type { ReactNode } from 'react'

export type IconName =
  | 'search'
  | 'sparkles'
  | 'shirt'
  | 'layers'
  | 'arrow'
  | 'heart'
  | 'home'
  | 'bag'
  | 'bookmark'
  | 'profile'
  | 'check'
  | 'shuffle'
  | 'filter'
  | 'back'
  | 'cart'
  | 'close'

type IconProps = {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20 }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    sparkles: <><path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3Z" /><path d="m19 15-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15Z" /></>,
    shirt: <><path d="m8 4 4 2 4-2 4 4-3 2v10H7V10L4 8l4-4Z" /><path d="M9 5.5c.3 2 1.3 3 3 3s2.7-1 3-3" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    arrow: <><path d="M5 12h13" /><path d="m13 7 5 5-5 5" /></>,
    heart: <path d="M20.8 8.7c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />,
    home: <><path d="m3 10 9-7 9 7v10H3V10Z" /><path d="M9 20v-6h6v6" /></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    bookmark: <path d="M6 4h12v17l-6-3-6 3V4Z" />,
    profile: <><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    shuffle: <><path d="M3 7h3c4 0 5 10 9 10h6" /><path d="m18 14 3 3-3 3" /><path d="M3 17h3c1.2 0 2.1-.6 2.9-1.5" /><path d="M15.1 8.5C16 7.6 17 7 18 7h3" /><path d="m18 4 3 3-3 3" /></>,
    filter: <><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></>,
    back: <><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></>,
    cart: <><path d="M4 5h2l2 11h9l2-8H7" /><circle cx="10" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}
