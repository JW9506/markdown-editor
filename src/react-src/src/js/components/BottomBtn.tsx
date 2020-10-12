import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { AnyFunction } from '../typings'

interface BottomBtnProps {
  colorClass: string
  icon: IconProp
  text?: string
  onBtnClick?: AnyFunction
}
const BottomBtn: React.FC<BottomBtnProps> = ({
  text,
  colorClass,
  icon,
  onBtnClick,
}) => {
  text ??= 'New'
  return (
    <button
      className={`btn btn-block no-border ${colorClass}`}
      type="button"
      onClick={onBtnClick}
    >
      <FontAwesomeIcon icon={icon} size="lg" className="mr-2" />
      {text}
    </button>
  )
}

export default BottomBtn
