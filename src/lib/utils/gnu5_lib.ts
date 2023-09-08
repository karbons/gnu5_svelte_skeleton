//그누보드5의 스킨쪽 그러니가 view단에서 사용하는 php 라이브러리를 
//js로 변환해서 사용 사용에 익숙하게 기존 함수명을 그대로 사용함


//글자 자르기
export function cut_str(str, len, suffix = "…") {
    let arr_str = Array.from(str);
    let str_len = arr_str.length;

    if (str_len >= len) {
        let slice_str = arr_str.slice(0, len);
        str = slice_str.join("");

        return str + (str_len > len ? suffix : '');
    } else {
        str = arr_str.join("");
        return str;
    }
}


//텍스트 변환하기
export function get_text(str:string, html=0, restore=false) {
    let source = ["<", ">", "\"", "\'"];
    let target = ["&lt;", "&gt;", "&#034;", "&#039;"];

    if(restore)
        str = str.replace(new RegExp(target.join("|"), "g"), (matched) => {
            return source[target.indexOf(matched)];
        });

    if (html === 0) {
        str = html_symbol(str);
    }

    if (html) {
        source.push("\n");
        target.push("<br/>");
    }

    return str.replace(new RegExp(source.join("|"), "g"), (matched) => {
        return target[source.indexOf(matched)];
    });
}

export function html_symbol(str:string) {
    return str ? str.replace(/&([a-z0-9]{1,20}|#[0-9]{0,3});/gi, "&#038;$1;") : "";
}
