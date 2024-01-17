import { tauri } from '@tauri-apps/api';

import { SERVER_LIST } from '../constants';
import OsuButton from './osu-button';

export default function ServerList() {
    return (
        <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {SERVER_LIST.map((server) => {
                return (
                    <OsuButton
                        key={server.address}
                        className="bg-pink-400 hover:shadow-2xl hover:shadow-pink-400/50 hover:brightness-110 active:brightness-90"
                        onClick={() => {
                            tauri.invoke('open_server', {
                                address: server.address,
                            });
                        }}
                    >
                        {server.name}
                    </OsuButton>
                );
            })}
            <OsuButton
                className="bg-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/50 hover:brightness-110 active:brightness-90"
                onClick={() => {}}
            >
                + Add Server
            </OsuButton>
        </div>
    );
}
