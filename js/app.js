const root = document.getElementById('root');

let songs = [];
let left = {};
let right = {};
let score = 0;

const fetch = () => {
  songs = [
    {
      name: '드라큘라',
      views: 293783,
      src: 'https://www.youtube.com/embed/OPo5-e_XacE'
    },
    {
      name: '신장개업',
      views: 290198,
      src: 'https://www.youtube.com/embed/Vd3cnq3Gdbs'
    },
    {
      name: '화성침공',
      views: 217409,
      src: 'https://www.youtube.com/embed/HqVg8c4kRXY'
    },
    {
      name: '세실 호텔',
      views: 173520,
      src: 'https://www.youtube.com/embed/4CHXJTDkk08'
    }
  ];
};

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const render = () => {
  root.innerHTML = `
  <div class="container">
    <div class="left">
      <h2 class="left-title">${left.name}</h2>
      <iframe class="left-video" width="100%" src="${left.src}"></iframe>
      <p class="views">${left.views}회</p>
    </div>
    <div class="right">
      <h2 class="right-title">${right.name}</h2>
      <iframe class="right-video" width="100%" src="${right.src}"></iframe>
      <p class="views hide">${right.views}회</p>
      <div class="btn-group">
        <button class="more-btn" type="button">더 많이</button>
        <button class="less-btn" type="button">더 적게</button>
      </div>
    </div>
    <div class="modal hide"></div>
  </div>
  `;
};

const render_views = () => {
  document.querySelector('.btn-group').classList.add('hide');
  document.querySelector('.right .views').classList.remove('hide');
};

const render_modal = () => {
  const modal = document.querySelector('.modal');
  modal.classList.remove('hide');
  modal.innerHTML = `
  <div class="modal-desc">
    ${songs.length === 0 ? '모든 문제를 맞추셨습니다.' : '게임이 끝났습니다.'}<br/>
    당신의 점수는 <span class="score">${score}</span>점 입니다.
    <button class="replay">다시하기</button>
  </div>
  `;
};

const setSelected = () => {
  if (songs.length === 0) {
    render_modal();
    return;
  }

  left = Object.keys(right).length ? { ...right } : songs.pop();
  right = songs.pop();
  hideBtn = false;
  hideViews = true;
  render();
};

const reset = () => {
  fetch();
  shuffle(songs);
  setSelected();
  render();
};

root.addEventListener('click', ({ target }) => {
  if (target.classList.contains('more-btn')) {
    render_views();

    if (left.views <= right.views) {
      score += 1;
      setTimeout(() => {
        setSelected();
      }, 1500);
    } else {
      render_modal();
    }
  }

  if (target.classList.contains('less-btn')) {
    render_views();

    if (left.views > right.views) {
      score += 1;
      setTimeout(() => {
        setSelected();
      }, 1000);
    } else {
      render_modal();
    }
  }

  if (target.classList.contains('replay')) {
    reset();
  }
});

window.addEventListener('load', () => {
  reset();
});
