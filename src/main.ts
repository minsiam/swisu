import { fetch } from '@tauri-apps/api/http';
import { BeatmapJson } from './osutypes.ts';
import { tauri } from '@tauri-apps/api';
let serverContainer: HTMLDivElement | null;
let bgElement: HTMLDivElement | null;

const MAPPERS = [
    {
        // Sotarks
        id: '4452992',
        max: 300,
    },
    {
        // Log Off Now
        id: '4378277',
        max: 70,
    },
    {
        // Yuuma
        id: '6644401',
        max: 44,
    },
];

const SERVER_LIST = [
    {
        name: 'Bancho',
        address: 'ppy.sh',
    },
    {
        name: 'Akatsuki',
        address: 'akatsuki.gg',
    },
    {
        name: 'Nekos',
        address: 'nksu.gg',
    },
    {
        name: 'Ripple',
        address: 'ripple.moe',
    },
];

if (window.location.href === 'https://tauri.localhost') {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
}

window.addEventListener('DOMContentLoaded', async () => {
    serverContainer = document.querySelector('#server-container');
    bgElement = document.querySelector('#bg-image');
    bgElement!!.style.backgroundImage = 'url("/src/assets/defaultbg.jpg")';

    for (const server of SERVER_LIST) {
        const button = createButton();
        button.textContent = server.name;
        button.classList.add(
            'bg-pink-400',
            'hover:brightness-110',
            'hover:shadow-2xl',
            'hover:shadow-pink-400/50',
            'hover:bg',
            'active:brightness-90',
            'bg-button',
            'hover:bg-button-hover',
            'bg-1.5',
        );

        button.style.backgroundImage = 'url("/src/assets/button-bg.svg")';
        button.onclick = () => {
            tauri.invoke('open_server', {
                address: server.address,
            });
        };
        serverContainer?.appendChild(button);
    }

    try {
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
            bgElement!!.style.backgroundImage = `url("${bgImage.src}")`;
        };
    } catch (error) {
        console.log(
            'Request to osu.ppy.sh failed. Changing to default background\n',
            error,
        );
    }
});

function createButton() {
    const button = document.createElement('div');
    button.classList.add(
        'rounded-xl',
        'text-2xl',
        'font-semibold',
        'text-white',
        'drop-shadow-2xl',
        'min-h-28',
        'flex',
        'justify-center',
        'items-center',
        'cursor-pointer',
        'transition-all',
        'duration-500',
    );
    return button;
}
