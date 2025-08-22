import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileX, UserPlus } from 'lucide-react';

type EmptyDataProps = {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
};

const EmptyData = ({
    title = 'Không có dữ liệu',
    description = 'Chưa có dữ liệu để hiển thị.',
    actionLabel,
    onAction,
    className = '',
    size = 'md'
}: EmptyDataProps) => {
    const iconSizes = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    };

    const containerSizes = {
        sm: 'py-8',
        md: 'py-12',
        lg: 'py-16'
    };

    const textSizes = {
        sm: {
            title: 'text-lg',
            description: 'text-sm'
        },
        md: {
            title: 'text-xl',
            description: 'text-base'
        },
        lg: {
            title: 'text-2xl',
            description: 'text-lg'
        }
    };

    return (
        <Card className={`border-dashed border-2 ${className}`}>
            <CardContent className={`text-center ${containerSizes[size]}`}>
                <FileX className={`${iconSizes[size]} mx-auto mb-4 text-muted-foreground/60`} />

                <h3 className={`${textSizes[size].title} font-semibold text-foreground mb-2`}>
                    {title}
                </h3>

                <p className={`${textSizes[size].description} text-muted-foreground mb-6 max-w-md mx-auto`}>
                    {description}
                </p>

                {actionLabel && onAction && (
                    <Button onClick={onAction} className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        {actionLabel}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default EmptyData;