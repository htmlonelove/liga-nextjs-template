import { ElementType } from 'react'
import { ButtonProps } from './button.types'
import styles from './button.module.scss'
import classNames from 'classnames'
import Link from 'next/link'

const defaultElement = 'button'

export default function Button<E extends ElementType = typeof defaultElement>({
  isRouteLink,
  colorScheme = 'black',
  size = 'md',
  children,
  as,
  className,
  ...props
}: ButtonProps<E>) {
  const elClassName = classNames(
    styles.root,
    styles[`root_${size}`],
    styles[`root_${colorScheme}`],
    className
  )

  const TagName = as || defaultElement
  const isLink = !!(isRouteLink && TagName === 'a')

  return isLink ? (
    <Link {...props} href={props.href} className={elClassName}>
      {children}
    </Link>
  ) : (
    <TagName {...props} className={elClassName}>
      {children}
    </TagName>
  )
}
