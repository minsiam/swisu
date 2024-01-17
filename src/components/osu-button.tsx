export interface OsuButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function OsuButton({ className, ...props }: OsuButtonProps) {
    return (
        <div
            className={[
                'flex h-full min-h-28 w-full cursor-pointer items-center justify-center  rounded-xl text-2xl font-semibold text-white drop-shadow-2xl transition-all duration-500',
                className,
                'bg-[length:150%] bg-[position:50%_60%] hover:bg-[calc(50%_+_20px)_50%]',
            ].join(' ')}
            style={{ backgroundImage: 'url("/assets/button-bg.svg")' }}
            {...props}
        />
    );
}
