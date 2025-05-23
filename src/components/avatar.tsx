import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Avatar = ({ name, src, size = 'md', className }: AvatarProps) => {
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const randomColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  const getRandomColor = (name: string) => {
    // Use the name to generate a consistent color
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return randomColors[charCodeSum % randomColors.length];
  };

  if (src) {
    return (
      <div className={cn(
        "rounded-full overflow-hidden flex-shrink-0",
        sizeClasses[size],
        className
      )}>
        <img src={src} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  // Generate initial-based avatar if no image is provided
  return (
    <div className={cn(
      "rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-medium",
      getRandomColor(name),
      sizeClasses[size],
      className
    )}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;