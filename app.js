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
  const $btn_txt_color = document.querySelector('.btn_txt_color');

  const $btn_bg_random = document.querySelector('.btn_bg_random');
  const $btn_bg_file = document.querySelector('.btn_bg_file');
  const $btn_bg_url = document.querySelector('.btn_bg_url');

  const $btn_reset = document.querySelector('.btn_reset');
  
  const allBtn = [$btn_layout_all, $btn_layout_title, $btn_layout_ts, $btn_layout_detail, $btn_editor_m, $btn_txt_shadow, $btn_bg_layer, $btn_txt_color,$btn_bg_random, $btn_bg_file, $btn_bg_url]
  
  const layoutBtn = [$btn_layout_all, $btn_layout_title, $btn_layout_ts, $btn_layout_detail];

  // 입력값 받기
  window.updateInput = function(inputName){
    const inputElement = document.querySelector(`.input_${inputName}`);
    const contentElement = document.querySelector(`.content_${inputName}`);
    contentElement.textContent = inputElement.value;
  }
  // 입력값 초기화
  /* window.resetInputs = function() {
    
  } */

  // 모든 버튼 초기화
  function resetAllBtnAct() {
    allBtn.forEach(button => {
      button.classList.remove('active');
    });
  }
  
  // 레이아웃 버튼 active 초기화
  function resetLayoutBtnAct() {
    layoutBtn.forEach(button => {
      button.classList.remove('active');
    });
  }

  // 레이아웃 요소
  const elements = [$content_title, $content_subtitle, $content_detail];

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
        $content_editor.textContent = editorPrompt;
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

  // 텍스트 그림자
  $btn_txt_shadow.addEventListener('click', function() {
    if(this.classList.contains('active')){
      this.classList.remove('active');
      $content_title.classList.remove('txt_shadow');
      $content_subtitle.classList.remove('txt_shadow');
      $content_detail.classList.remove('txt_shadow');
    } else {
      $content_title.classList.add('txt_shadow');
      $content_subtitle.classList.add('txt_shadow');
      $content_detail.classList.add('txt_shadow');
      this.classList.add('active');
    }
  })

  // 텍스트 색 반전
  $btn_txt_color.addEventListener('click', function() {
    $content_title.classList.toggle('txt_reverse');
    $content_subtitle.classList.toggle('txt_reverse');
    $content_detail.classList.toggle('txt_reverse');
    this.classList.toggle('active');
  })

  const bgBtn = [$btn_bg_random, $btn_bg_file, $btn_bg_url]


  // 배경 버튼 active 초기화
  function resetBgBtnAct() {
    bgBtn.forEach(button => {
      button.classList.remove('active');
    });
  }

  // 랜덤 단색
  // 150 ~ 240 사이의 rgb를 hex 코드로 변환
  const randomRGB = () => {
    let rgb = '';
    rgb += (Math.floor(Math.random() * 90 + 1)+150).toString(16).padStart(2, '0');
    rgb += (Math.floor(Math.random() * 90 + 1)+150).toString(16).padStart(2, '0');
    rgb += (Math.floor(Math.random() * 90 + 1)+150).toString(16).padStart(2, '0');
    return rgb; 
  }
  $btn_bg_random.addEventListener('click', function() {
    const hex = randomRGB();
    $content.style.backgroundImage = 'none';
    $content.style.backgroundColor = `#${hex}`;
    resetBgBtnAct();
    this.classList.add('active');
  })

  //파일 업로드
  const $file = document.querySelector('#file')
  $file.addEventListener('change', function(e) {
    console.log(e.target.files);
    let get_file = e.target.files[0];
    let reader = new FileReader();
    if (get_file) {
      reader.readAsDataURL(get_file);
      reader.onload = function(){ //  파일 로드 됐을 때
        $content.style.backgroundImage = `url('${reader.result}')`;
        resetBgBtnAct();
        $btn_bg_file.classList.add('active');
      }
    } else {
      return;
    }
  })
  $btn_bg_file.addEventListener('click', function(e) {
    e.preventDefault;
    $file.click()
  })

  //이미지 URL
  $btn_bg_url.addEventListener('click', function() {
    const urlPrompt = prompt('넣고싶은 이미지 URL을 입력하세요');
    //prompt취소버튼
    if (urlPrompt !== null && urlPrompt.trim() !== "") {
      $content.style.backgroundImage = `url('${urlPrompt}')`
      resetBgBtnAct();
      this.classList.add('active');
    }
  })
  
  // 초기화
  $btn_reset.addEventListener('click', function() {
    // 버튼 비활성화
    resetAllBtnAct();
    $btn_layout_all.classList.add('active');
    $content_editor.classList.add('hidden');
    elements.forEach((el) => {
      el.classList.remove('hidden');
    })
    // input 초기화
    const inputNames = ['title', 'subtitle', 'detail'];
    inputNames.forEach(inputName => {
      const inputElement = document.querySelector(`.input_${inputName}`);
      const contentElement = document.querySelector(`.content_${inputName}`);
      inputElement.value = '';
      contentElement.classList.remove('txt_shadow', 'txt_reverse')
    })
    $content_title.textContent = '제목을 입력하세요';
    $content_subtitle.textContent = '부제목을 입력하세요';
    $content_detail.textContent = '본문을 입력하세요';
    // 배경 색상 및 이미지 초기화
    $content.style.backgroundImage = `url('https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
    $content.classList.remove('content_before_dark')
  }) 
})