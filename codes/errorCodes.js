// 자주 사용되는 Error Codes의 관리를 위한 파일
// 인자 받아서 출력할 수 있도록 처리
module.exports = {
  pageNotFound: "페이지를 찾을 수 없습니다.",
  REQUIRED: "필수 값입니다.",
  WRONGPWD: "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
  wrongFormat: "잘못된 형식입니다.",
  EXCEEDLENGTH: (len) => `최대 ${len}자까지 입력해주세요.`,
  ONLYINT: "숫자만 입력해주세요",
  RETRY: "다시 시도해주세요",
  NOTEXISTCATEGORY: "존재하지 않는 쿠폰 타입입니다.",
};
