// 유효성 검사중 중복검사 등을 위한 api 호출 함수
// 본 파일은 크로스브라우징 문제로 사용할 수 없습니다.
// 프론트와 api 서버의 도메인이 같으면 세션을 공유할 수 있습니다.
// 그러나 앱과 같이 도메인이 다른 경우에는 쿠키를 공유할 수 없어 세션도 공유가 안됩니다.

import axios from 'axios';

export const reg_mb_id_check = async (reg_mb_id: string) => {
	try {
		console.log(reg_mb_id);
		const response = await axios.post(
			`${import.meta.env.VITE_API_ENDPOINT}/member/reg_check/mb_id`,
			{
				reg_mb_id: encodeURIComponent(reg_mb_id)
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		return '';
	}
};

export const reg_mb_recommend_check = async (reg_mb_recommend: string) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_ENDPOINT}/api/member/reg_check/mb_recommend`,
			{
				reg_mb_recommend: encodeURIComponent(reg_mb_recommend)
			}
		);

		return response.data;
	} catch (error) {
		console.error(error);
		return '';
	}
};

export const reg_mb_nick_check = async (reg_mb_nick: string, reg_mb_id: string) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_ENDPOINT}/api/member/reg_check/mb_nick`,
			{
				reg_mb_nick: encodeURIComponent(reg_mb_nick),
				reg_mb_id: encodeURIComponent(reg_mb_id)
			}
		);

		return response.data;
	} catch (error) {
		console.error(error);
		return '';
	}
};

export const reg_mb_email_check = async (reg_mb_email: string, reg_mb_id: string) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_ENDPOINT}/api/member/reg_check/mb_email`,
			{
				reg_mb_email: encodeURIComponent(reg_mb_email),
				reg_mb_id: encodeURIComponent(reg_mb_id)
			}
		);

		return response.data;
	} catch (error) {
		console.error(error);
		return '';
	}
};

export const reg_mb_hp_check = async (reg_mb_hp: string, reg_mb_id: string) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_ENDPOINT}/api/member/reg_check/mb_hp`,
			{
				reg_mb_hp: encodeURIComponent(reg_mb_hp),
				reg_mb_id: encodeURIComponent(reg_mb_id)
			}
		);

		return response.data;
	} catch (error) {
		console.error(error);
		return '';
	}
};
