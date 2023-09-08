

 // 변환 함수
 export function convertLinksToEmbed(comment:string) {
    return comment.replace(
        /\[<a\s.*href="(http|https|ftp|mms):\/\/([^[:space:]]+).(mp3|wma|wmv|asf|asx|mpg|mpeg)".*<\/a>\]/gi,
        (_, protocol, url, extension) => {
            return obj_movie(`${protocol}://${url}.${extension}`, "id", "width", "height", false);
        }
    );
}

// 영상 삽입 함수
export function obj_movie(src:string, ids:string, width:string, height:string, autostart:boolean) {
    var wh = "";
    if (parseInt(width) && parseInt(height))
        wh = `width='${width}' height='${height}' `;
    if (!autostart) autostart = false;
    return `<embed src='${src}' ${wh} autostart='${autostart}'></embed>`;
}
