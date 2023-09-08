import { writable } from 'svelte/store';

export const ProgressStatus = writable('');
export const ProgressRate = writable(0);

//1 통신중, 0 통신완료
export const NetworkConnecting = writable(0);

export const NetworkState = writable(0);

export const Refreshing = writable(0);
