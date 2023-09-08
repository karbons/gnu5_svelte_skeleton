<script lang="ts">
	import { instance } from '$lib/common/api';
	import { dev, browser } from '$app/environment';
	import { mb, resetMember } from '$lib/stores/mbstore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
        //현재 페이지로 접근하면 로그인 정보 초기화
		resetMember();
	
		// 로컬스토리지 모두 비우기
		localStorage.clear();
	});

	let mb_id: string = '';
	let mb_password: string = '';
	const login = async () => {
		const params = {
			mb_id,
			mb_password
		};
		const { data } = await instance.post('member/login', params);
		if (dev) console.log(data);

		if (data?.data?.accessToken) {
			localStorage.setItem('accessToken', data?.data?.accessToken);
			localStorage.setItem('refreshToken', data?.data?.refreshToken);
			mb.set(data?.data?.mb);
	

			goto('/', { replaceState: true });
		} else {

            resetMember();
			localStorage.clear();
			
		}

		//jwt 토큰 받아와 저장
	};
</script>

<div class="hero min-h-screen ">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left  lg:ml-8">
			<h1 class="text-5xl font-bold">Login</h1>
			<p class="py-6">
				로그인을 하시면 다양한 서비스를 이용하실 수 있습니다.
			</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form on:submit|preventDefault={login}>
				<div class="card-body">
					<div class="form-control">
						<label class="label">
							<span class="label-text">아이디</span>
						</label>
						<input
							type="text"
							placeholder="아이디"
							bind:value={mb_id}
							class="input input-bordered"
						/>
					</div>
					<div class="form-control">
						<label class="label">
							<span class="label-text">비밀번호</span>
						</label>
						<input
							type="password"
							placeholder="비밀번호"
							bind:value={mb_password}
							class="input input-bordered"
						/>
						<div class="flex">
							<label for="remember" class="label label-text-alt ">
								<input type="checkbox" id="remember" class="mr-2" />
								아이디 저장</label
							>

							<label class="label ml-auto">
								<a href="/member/losspassword" class="label-text-alt link link-hover"
									>비밀번호를 잊으셨습니까?</a
								>
							</label>
						</div>
					</div>
					<div class="form-control mt-6">
						<button class="btn btn-primary" type="submit">로그인</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
