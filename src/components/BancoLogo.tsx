interface Props {
  banco: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-16 h-16 text-base' };

export default function BancoLogo({ banco, color, size = 'md', className = '' }: Props) {
  const initials = banco.slice(0, 2).toUpperCase();
  return (
    <div
      className={`${sizeMap[size]} rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 ${className}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
