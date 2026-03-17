interface IconProps {
  name: 'house' | 'fish' | 'deer' | 'pin'
  className?: string
}

const icons: Record<IconProps['name'], React.ReactNode> = {
  house: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  ),
  fish: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3.5 0-6.5 2-8 6 1.5 4 4.5 6 8 6s6.5-2 8-6c-1.5-4-4.5-6-8-6z" />
      <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12l3-3m-3 3l3 3" />
    </>
  ),
  deer: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-2.5 0-4.5 1.5-4.5 3.5S9.5 21 12 21s4.5-1.5 4.5-3.5S14.5 14 12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14V9m0 0c0-2 1-3 2-4m-2 4c0-2-1-3-2-4m4 4l2-3m-2 3l3-2M8 5L6 2m2 3L5 6" />
    </>
  ),
  pin: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </>
  ),
}

export default function Icon({ name, className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      {icons[name]}
    </svg>
  )
}
