import { Link } from 'react-router-dom'

/**
 * Shared button/link control. Renders a <Link> when `to` is provided,
 * otherwise a native <button>.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ...rest
}) {
  const styles = variant === 'primary' ? 'btn-primary' : 'btn-ghost'
  const classes = `${styles} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}
