import { browser } from "$app/environment";

// 숫자 천단위 콤마
export const number_format = (inputNumber: number) => {
	if (!inputNumber) return 0;
	let formetedNumber = Number(inputNumber)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, '$&,');
	let splitArray = formetedNumber.split('.');
	if (splitArray.length > 1) {
		formetedNumber = splitArray[0];
	}
	return formetedNumber;
};

export function date_format(format:string, date:string) {
    let d = new Date(date);

    let map = {
        'y': d.getFullYear(),
        'm': ('0' + (d.getMonth() + 1)).slice(-2),
        'd': ('0' + d.getDate()).slice(-2),
        'H': ('0' + d.getHours()).slice(-2),
        'i': ('0' + d.getMinutes()).slice(-2),
    };

    return format.replace(/y|m|d|H|i/gi, (matched) => map[matched]);
}


const createDoubble = (num: number) => (num < 9 ? '0' + num : num);

export const dateFormatTime = (date: string) =>
	`${createDoubble(new Date(date).getHours())}:${createDoubble(new Date(date).getMinutes())}`;

//d-day 계산
export const dDay = (date: string) => {
	let today = new Date();
	let dDay = new Date(date);
	let gap = dDay.getTime() - today.getTime();
	let result = Math.ceil(gap / (1000 * 60 * 60 * 24));
	return result;
};

export const phoneNumber = (value: string) => {
	if (!value) {
		return '';
	}

	value = value.replace(/[^0-9]/g, '');

	let result = [];
	let restNumber = '';

	// 지역번호와 나머지 번호로 나누기
	if (value.startsWith('02')) {
		// 서울 02 지역번호
		result.push(value.substring(0, 2));
		restNumber = value.substring(2);
	} else if (value.startsWith('1')) {
		// 지역 번호가 없는 경우
		// 1xxx-yyyy
		restNumber = value;
	} else {
		// 나머지 3자리 지역번호
		// 0xx-yyyy-zzzz
		result.push(value.substring(0, 3));
		restNumber = value.substring(3);
	}

	if (restNumber.length === 7) {
		// 7자리만 남았을 때는 xxx-yyyy
		result.push(restNumber.substring(0, 3));
		result.push(restNumber.substring(3));
	} else {
		result.push(restNumber.substring(0, 4));
		result.push(restNumber.substring(4));
	}

	return result.filter((val) => val).join('-');
};

// 날짜, 조회수의 경우 높은 순서대로 보여져야 하므로 $flag 를 추가
// $flag : asc 낮은 순서 , desc 높은 순서
// 제목별로 컬럼 정렬하는 QUERY STRING
export const subject_sort_link = (col: string, query_string: string = '', flag: string = 'asc') => {
	let url = '';

	return url;
};



//특정 인자만 변경해서 URL을 만들기

export const updateQueryParameter = (key:string, value:string)=> {
  // 현재 URL의 쿼리 문자열을 가져옵니다.
  const searchParams =browser&& new URLSearchParams(window.location.search);

  // 특정 파라미터를 변경하거나 추가합니다.
  browser&&searchParams.set(key, value);

  // 변경된 쿼리 문자열을 새로운 URL로 설정합니다.
  const newUrl =browser&& `${window.location.pathname}?${searchParams.toString()}`;

  // 변경된 URL로 이동합니다.
  return newUrl;
}

// 'param1' 파라미터를 'newValue'로 변경합니다.
updateQueryParameter('param1', 'newValue');
