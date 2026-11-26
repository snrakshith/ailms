import type {ButtonHTMLAttributes} from 'react';
type Props=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'primary'|'secondary'|'danger'};
export function Button({variant='primary',className='',...props}:Props){return <button {...props} className={`button button-${variant} ${className}`.trim()}/>;}
