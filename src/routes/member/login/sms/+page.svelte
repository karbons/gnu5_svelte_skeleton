<script lang="ts">
 

    import { dev,browser } from '$app/environment'; //개발자 모드 여부 확인
    import {goto} from '$app/navigation';
      import { instanceWithAuth } from '$lib/common/api';
    import { mb } from '$lib/stores/mbstore';
  
  
   //유효성 검사 라이브러리 svelte-forms-lib, yup
  
  
  let mem_phone = '';
  let mem_password = '';
  let mem_phone_msg = '';
  let mem_password_msg = '';
  
  
         const onSubmit= async () => {
              
              //console.log(JSON.stringify(values));
      
      const params ={
        mem_phone:mem_phone,
        mem_password:mem_password
      }
            var {data}= await instanceWithAuth.post(import.meta.env.VITE_API_ENDPOINT+'/auth/login', params);
            console.log(data);
            }
  
  let send_is_phone = false;
  </script>
  
    <div class="container mx-auto px-4 h-full ">
      <div class="flex content-center items-center justify-center h-full">
        <div class="w-full lg:w-4/12 px-4 pt-10">
          <p class="text-blueGray-500 uppercase text-center mb-10 text-2xl font-bold">firsthous 로그인</p>
          
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
          >
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div class="text-blueGray-400 text-center mb-3 font-bold">
                <!-- <small>관리자 로그인 입니다.</small> -->
              </div>
              <form  on:submit|preventDefault={onSubmit}>
                <div class="relative w-full mb-3 mt-8">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-email"
                  >
                    휴대폰번호
                  </label>
                  <input
                    id="grid-email"
                    type="tel"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="휴대폰 번호를 입력해주세요"
                    bind:value="{mem_phone}"
                  />   
                  {#if mem_phone_msg}
                  <small>{mem_phone_msg}</small>
              {/if}
                </div>
    
                {#if send_is_phone}
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password" 
                  >
                    보안번호 
                  </label>
                  <input
                    id="grid-password"
                    type="password"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"  bind:value="{mem_password}"
                  />
                  {#if mem_password_msg}
                  <small>{mem_password_msg}</small>
                  {/if}
                </div>
                {/if}
                <div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span class="ml-2 text-sm font-semibold text-blueGray-600">
                     로그인 유지
                    </span>
                  </label>
                </div>
    
                <div class="text-center mt-6">
                    {#if send_is_phone}
                  <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    보안 문자 요청
                  </button>
                  {:else}
                  <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    보안 문자 요청
                  </button>
                  {/if}
                </div>
              </form>
            </div>
          </div>
          <div class="flex flex-wrap mt-6 relative">
            <div class="w-1/2">
              <a href="/auth/login_email" class="text-blueGray-500">
                <small>이메일 로그인</small>
              </a>
            </div>
            <div class="w-1/2 text-right">
              <a  href="/auth/register" class="text-blueGray-500">
                <small>회원가입</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  
