import React from 'react'

interface Props {
  text: string
  onClick?: () => void
  className?: string
}

const Button = ({ text, onClick, className }: Props): JSX.Element => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  )
}

export default Button
