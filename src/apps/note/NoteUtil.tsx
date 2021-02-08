const NoteUtil = {
  // 인코딩 대상 : 알파벳, 0~9의 숫자, -_.!~*' 제외하고 이스케이프 처리(아스키 문자셋으로 변경)
  // encodeURI : 매개변수로 전달된 문자열을 완전한 URI 전체라고 간주한다.
  // 따라서 쿼리스트링 구분자로 사용되는 =,?,&은 인코딩하지 않는다
  // encodeURIComponent는 위 세 개까지 인코딩한다(쿼리스트링의 일부로 간주하여)
  encodeStr(str: string) {
    return escape(encodeURIComponent(this.decodeStr(str)));
  },
  decodeStr(str: string) {
    let pre = str, cur;
    try {
      while (true) {
        cur = decodeURIComponent(pre);
        if (cur === pre) return cur;
        pre = cur;
      }
    } 
    // 노트 내용 중에 url이나 mail이 있으면 URI malformed error가 발생한다. 
    // 이때 decode가 완료된것으로 보이므로 그대로 return한다
    catch(e) {
      return pre;
    }    
  },
  // encoding해서 일치 비교
  isSameStr(str1: string, str2: string): boolean {
    return this.encodeStr(str1) === this.encodeStr(str2);
  }
}

export default NoteUtil;