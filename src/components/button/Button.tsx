import { ButtonHTMLAttributes, CSSProperties } from 'react';
import './button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  srcIcon?: string;
  altTextIcon?: string;
  text?: string;
  styleButton?: CSSProperties
};

export function Button(
  {
    isOutlined = false,
    color,
    srcIcon,
    text,
    styleButton,
    altTextIcon,
    ...props
  }: ButtonProps
) {
  return (
    <button style={styleButton} className={`button ${isOutlined ? 'outlined' : ''}`} {...props}>
      {srcIcon && (<img src={srcIcon} alt={altTextIcon} />)}
      {text && (<span>{text}</span>)}
    </button >
  )
}