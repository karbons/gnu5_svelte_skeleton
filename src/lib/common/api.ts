import axios from 'axios';
import { setInterceptors } from './interceptors.js';
import { ProgressStatus, ProgressRate } from '$lib/stores/updownprogress.js';
import { mb } from '$lib/stores/mbstore';

let config_width_file = {
	baseURL: import.meta.env.VITE_API_ENDPOINT,
	timeout: 30000,
	withCredentials: true,
	//파일 업로드 진행율 표시
	onUploadProgress: function (progressEvent: any) {
		// Do whatever you want with the native progress event

		var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
		//업로드 진행사항 보여주기
		ProgressStatus.set('upload');
		ProgressRate.update((n) => (n = percentCompleted));
	},

	// `onDownloadProgress` allows handling of progress events for downloads
	// browser only
	onDownloadProgress: function (progressEvent: any) {
		// Do whatever you want with the native progress event
		var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
		//다운로드 진행사항 보여주기
		ProgressStatus.set('download');

		ProgressRate.update((n) => (n = percentCompleted));
	}
};

let config = {
	baseURL: import.meta.env.VITE_API_ENDPOINT,
	timeout: 30000,
	withCredentials: true
};

//일반 통신
function createInstance() {
	const instance = axios.create(config);
	//test token
	//let at = localStorage.getItem("accessToken");
	//instance.defaults.headers.common.Authorization = `Bearer ${at}`;

	return instance;
}

//회원인증 통신
function createInstanceWithAuth() {
	const instance = axios.create(config);
	let result = instance;

	mb.subscribe((value) => {
		if (value?.mb_id) result = setInterceptors(instance);
	});
	return result;
}

//회원인증 및 파일 업로드 통신
function createInstanceWithAuthFile() {
	const instance = axios.create(config_width_file);

	return setInterceptors(instance);
}

export const instance = createInstance();
export const instanceWithAuth = createInstanceWithAuth();
export const instanceWithAuthFile = createInstanceWithAuthFile();
