import { fetch } from '@tauri-apps/api/http';
import { useEffect, useRef } from 'react';

import { MAPPERS } from '../constants';
import { BeatmapJson } from '../osutypes';

const DEFAULT_BG = 'url("/assets/defaultbg.jpg")';

export default function BackgroundImage() {
    const bgImageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!bgImageRef.current) return;
        if (bgImageRef.current.style.backgroundImage !== DEFAULT_BG) return;

        (async function () {
            const randomMapper =
                MAPPERS[Math.floor(Math.random() * MAPPERS.length)];
            const randomOffset = Math.floor(Math.random() * randomMapper.max);
            const response = await fetch(
                `https://osu.ppy.sh/users/${randomMapper.id}/beatmapsets/ranked?limit=1&offset=${randomOffset}`,
            );
            const beatmaps = response.data as BeatmapJson[];
            const bgImage = new Image();
            bgImage.src = `https://assets.ppy.sh/beatmaps/${beatmaps[0].id}/covers/raw.jpg`;
            bgImage.onload = () => {
                if (!bgImageRef.current) return;
                if (bgImageRef.current.style.backgroundImage !== DEFAULT_BG)
                    return;

                bgImageRef.current!!.style.backgroundImage = `url("${bgImage.src}")`;
            };
        })();
    }, [bgImageRef.current]);

    return (
        <div
            ref={bgImageRef}
            className="absolute top-0 -z-10 h-full w-full bg-cover bg-no-repeat blur-[6px] brightness-75 transition-all duration-500 md:blur-[1px]"
            style={{ backgroundImage: DEFAULT_BG }}
        />
    );
}
