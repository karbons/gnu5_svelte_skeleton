import { dev, browser } from '$app/environment';
import { goto } from '$app/navigation';
import { mb } from '$lib/stores/mbstore';
import { NetworkConnecting, Refreshing } from '$lib/stores/apistore';
import axios from 'axios';

//토큰 승인 재요청시 통신 누락 저장 및 재실행
/*
 * 아래 누락 요청 재실행이 되지 않아서 잠시 보류중
 */

/*
1. 배열에 객체를 넣고 이를 실행할때 실행이 되지 않는 문제가 있다.
2. 배열의 객체 실행이 안되는 것인지 확인 필요
   - 별도의 객체 만들어 실행해 본다.
3. 

*/

// 인증실패 이동 주소
let start_url = '/';
// refresh token 재발행 주소
let refresh_url = import.meta.env.VITE_API_ENDPOINT + 'member/refresh_token';

//토큰 재발행 요청
export const setInterceptors = (instance: any) => {
	let isTokenRefreshing: boolean = false;
	let isRefreshing: boolean = false;

	//로그아웃하기
	const logout = (code: string) => {
		mb.set('');
		browser && localStorage.clear();

		if (browser) goto(start_url);
		return;
	};

	//1. 요청 전 선요청을 보냄
	// 기존 토큰을 보내서 인증 작업 진행
	instance.interceptors.request.use(
		(config: any) => {
			if (dev) {
				//개발시 요청 로그 남기기 위함 프로적트 빌드후에는 자동 제거됨
				console.log('D통신시작', config.baseURL + config.url);
				if(config.method ==="post")
				console.log("Post DParams" , config.data)
				else
				console.log("Get DParams",config.params)
			}

			// request 보내기전 작업 헤더에 인증 토큰 추가
			let accessToken: string | null | boolean = browser && localStorage.getItem('accessToken');
			if (accessToken && accessToken != 'undefined') {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			//통신중
			NetworkConnecting.set(1);

			return config;
		},
		function (error: any) {
			// Do something with request error
			return Promise.reject(error);
		}
	);

	//2. 선 요청에 대한  응답
	// 토큰이 만료되었을 경우 토큰 재발급

	instance.interceptors.response.use(
		async (response: any) => {
			const originalRequest = response?.config;
			if (response?.status === 203) {
				if (dev) console.log('토큰 재발행 시작');

				let isRefreshing = 0;
				Refreshing.subscribe((value) => {
					isRefreshing = value;
				});

				if (isRefreshing == 0) {
				}

				//토큰 갱신중
				Refreshing.set(1);

				//리프레시 토큰을 보내서 토큰 재발급
				const retk = browser && localStorage.getItem('refreshToken');

				const { data } = await axios.post(refresh_url, {
					refreshToken: retk
				});

				
				const { newAccessToken, newRefreshToken } = data.data;

				if (data.code == '00601') {
					//회원 권한이 없습니다.
					logout(data.code);
					return;
				} else if (data.code == '00502') {
					//다른곳에서 접속함
					logout(data.code);
					return;
				} else if (data.code == '00402') {
					//회원이 없음
					logout(data.code);
					return;
				} else if (data.code == '00302') {
					//토큰 시간 오버
					logout(data.code);
					return;
				} else if (data.code == '00202') {
					//토큰이 유효하지 않습니다.(암호 통과 못함)
					logout(data.code);
					return;
				} else if (data.code == '00102') {
					//토큰이 없습니다.
					logout(data.code);
					return;
				}

				if(dev) console.log("토큰 재발행 성공",data)


				if (newAccessToken && newAccessToken != 'undefined')
					browser && localStorage.setItem('accessToken', newAccessToken);
				if (newRefreshToken && newRefreshToken != 'undefined')
					browser && localStorage.setItem('refreshToken', newRefreshToken);

				//originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
				if (newAccessToken && newAccessToken !== "undefined") {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				  }

				//토큰 갱신 완료
				Refreshing.set(0);

				//통신 완료
				NetworkConnecting.set(0);

				//해더 정보가 누락되는 오류가 있어서 다시 헤터를 설정해줌
				 return instance({
				 ...originalRequest,
				 ...{
				   headers: originalRequest.headers.toJSON(),
				 },
			   });
			}
			//통신완료
			NetworkConnecting.set(0);
			return response;
		},
		(error: any) => {
			//401 의 경우 서버가 리턴 값을 삭제하는 오류가 있어서 이부분에서 리턴 값을 확인 못하는경우가 있어
      //임의의 state 203 을 부여하여 토큰 재발행에 대처함 이와 유사한 이슈가 있어서
      //graphql 에서도 401 에러에 직접 대응하지 않는다고함
	  dev&& console.log(error)
			return Promise.reject(error);
		}
	);
	//
	return instance;
};
