// 입력값 받기
function updateInput(inputName) {
  const inputElement = document.querySelector(`.input_${inputName}`);
  const contentElement = document.querySelector(`.content_${inputName}`);
  contentElement.textContent = inputElement.value;
}

document.addEventListener('DOMContentLoaded', function() { //DOM 모두 로딩된 뒤 실행

  const $btn_layout_all = document.querySelector('.btn_layout_all');
  const $btn_layout_title = document.querySelector('.btn_layout_title');
  const $btn_layout_ts = document.querySelector('.btn_layout_ts');
  const $btn_layout_detail = document.querySelector('.btn_layout_detail');

  const $btn_editor_m = document.querySelector('.btn_editor_m');

  const $btn_txt_shadow = document.querySelector('.btn_txt_shadow');

  const $content = document.querySelector('.content');
  const $content_title = document.querySelector('.content_title');
  const $content_subtitle = document.querySelector('.content_subtitle');
  const $content_detail = document.querySelector('.content_detail');
  const $content_editor = document.querySelector('.content_editor');

  const $btn_bg_layer = document.querySelector('.btn_bg_layer');

  const layoutBtn = [$btn_layout_all, $btn_layout_title, $btn_layout_ts, $btn_layout_detail];
  
  // 레이아웃 버튼 active 초기화
  function resetLayoutBtnAct() {
    layoutBtn.forEach(button => {
      button.classList.remove('active');
    });
  }

  // 레이아웃 선택
  // 제목 + 부제목 + 내용
  $btn_layout_all.addEventListener('click', function() {
    $content_title.classList.remove('hidden');
    $content_subtitle.classList.remove('hidden');
    $content_detail.classList.remove('hidden');
    resetLayoutBtnAct();
    this.classList.add('active');
  });

  // 제목만
  $btn_layout_title.addEventListener('click', function() {
    $content_title.classList.remove('hidden');
    $content_subtitle.classList.add('hidden');
    $content_detail.classList.add('hidden');
    resetLayoutBtnAct();
    this.classList.add('active');
  });

  // 내용만
  $btn_layout_detail.addEventListener('click', function() {
    $content_title.classList.add('hidden');
    $content_subtitle.classList.add('hidden');
    $content_detail.classList.remove('hidden');
    resetLayoutBtnAct();
    this.classList.add('active');
  });

  // 제목 + 부제목
  $btn_layout_ts.addEventListener('click', function() {
    $content_title.classList.remove('hidden');
    $content_subtitle.classList.remove('hidden');
    $content_detail.classList.add('hidden');
    resetLayoutBtnAct();
    this.classList.add('active');
  });

  // 제작자 표기
  $btn_editor_m.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      $content_editor.classList.add('hidden');
    } else {
      const editorPrompt = prompt('제작자를 입력하세요');
      if (editorPrompt) {
        this.classList.add('active');
        $content_editor.classList.remove('hidden');
        $content_editor.innerText = editorPrompt;
      }
    }
  })
  
  //배경 레이어
  $btn_bg_layer.addEventListener('click', function() {
    if(!$content.classList.contains('content_before_dark')) {
      $content.classList.add('content_before_dark')
      this.classList.add('active');
    } else {
      $content.classList.remove('content_before_dark')
      this.classList.remove('active');
    }
  })
})