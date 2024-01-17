import { cn } from '../utils/tailwind';

export interface OsuButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function OsuButton({ className, ...props }: OsuButtonProps) {
    return (
        <div
            className={cn(
                'flex min-h-28 cursor-pointer items-center justify-center rounded-xl bg-[length:150%] bg-[position:50%_60%] text-2xl font-semibold text-white drop-shadow-2xl transition-all duration-500 hover:bg-[calc(50%_+_20px)_50%]',
                className,
            )}
            style={{ backgroundImage: 'url("/assets/button-bg.svg")' }}
            {...props}
        />
    );
}
