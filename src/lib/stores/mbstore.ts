// import { writable } from 'svelte/store';
// import { browser } from '$app/environment';
import type { Member } from '$lib/interface/Member';
import { persisted } from 'svelte-local-storage-store'; //스토어와 로컬스토리지를 연결해주는 라이브러리

//비교적 덜 민감한 회원의 상태 값만 저장할 것
const initialMember: Member = {
    mb_id: '',
    mb_name: '',
    mb_nick: '',
    mb_level: 0,
    mb_point: 0,
    mb_scrap_cnt: 0
    
  };

export const mb = persisted('mb', initialMember);

export function resetMember() {
    mb.set(initialMember);
  }
