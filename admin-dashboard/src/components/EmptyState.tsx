import { Badge } from '@/components/ui/badge';
import { Minus } from 'lucide-react';

type EmptyStateProps = {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    text?: string;
};

const EmptyState = ({
    size = 'sm',
    text = 'Chưa cập nhật'
}: EmptyStateProps) => {
    const sizeClasses: Record<'xs' | 'sm' | 'md' | 'lg', string> = {
        xs: 'text-xs px-1.5 py-0.5',
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2'
    };

    const iconSizeClasses: Record<'xs' | 'sm' | 'md' | 'lg', string> = {
        xs: 'h-3 w-3',
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };

    return (
        <div className="flex items-center gap-1.5">
            <Minus className={`text-muted-foreground/60 ${iconSizeClasses[size]}`} />
            <Badge
                variant="outline"
                className={`
                    ${sizeClasses[size]}
                    bg-muted/30 
                    border-muted-foreground/20 
                    text-muted-foreground/70 
                    hover:bg-muted/50 
                    font-normal
                    select-none
                    transition-colors
                `}
            >
                {text}
            </Badge>
        </div>
    );
};

export default EmptyState;