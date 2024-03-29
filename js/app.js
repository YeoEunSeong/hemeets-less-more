const root = document.getElementById('root');
const url = 'https://hemeets-more-less-3ba28-default-rtdb.firebaseio.com/ranking.json';
let username = '';
let songs = [];
let left = {};
let right = {};
let score = 0;
let rank = [];

const fetchSongs = () => {
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
    },
    {
      name: '우린 비행기를 탄다',
      views: 164491,
      src: 'https://www.youtube.com/embed/W6F2WydM98w'
    },
    {
      name: '신기루',
      views: 141470,
      src: 'https://www.youtube.com/embed/kANXBQw9w0U'
    },
    {
      name: '곡부득이소정가',
      views: 126325,
      src: 'https://www.youtube.com/embed/EOzxX1A5_IQ'
    },
    {
      name: '작업의 정석',
      views: 117913,
      src: 'https://www.youtube.com/embed/hnsHyxiH36o'
    },
    {
      name: '복수초',
      views: 117913,
      src: 'https://www.youtube.com/embed/sD_7g87aFZo'
    },
    {
      name: '믹스커피',
      views: 95040,
      src: 'https://www.youtube.com/embed/yRm03t2_Ly4'
    },
    {
      name: '러브 리볼버',
      views: 89276,
      src: 'https://www.youtube.com/embed/MHB8KFkj4es'
    },
    {
      name: '왜 눈물',
      views: 85177,
      src: 'https://www.youtube.com/embed/bIfns4abe7U'
    },
    {
      name: '술래잡기',
      views: 58653,
      src: 'https://www.youtube.com/embed/WWywnSUSgBA'
    },
    {
      name: '세실호텔 Band Ver',
      views: 56617,
      src: 'https://www.youtube.com/embed/8xZdbCEjLJM'
    },
    {
      name: '키리모찌의 비밀',
      views: 49469,
      src: 'https://www.youtube.com/embed/QUCG1oHyI1Q'
    },
    {
      name: '오분전',
      views: 46715,
      src: 'https://www.youtube.com/embed/uJ2S823JnCg'
    },
    {
      name: '런드리',
      views: 45678,
      src: 'https://www.youtube.com/embed/seIXOWsS3-U'
    },
    {
      name: '미셸',
      views: 43666,
      src: 'https://www.youtube.com/embed/RWwAM9tirgw'
    },
    {
      name: '반쪽짜리',
      views: 42960,
      src: 'https://www.youtube.com/embed/8b51yh4rkwc'
    },
    {
      name: '달나라 전주곡',
      views: 42228,
      src: 'https://www.youtube.com/embed/R2jeZN9Rp98'
    },
    {
      name: '서초동 왈츠',
      views: 31362,
      src: 'https://www.youtube.com/embed/FevLMTSOo_8'
    },
    {
      name: '카사노바',
      views: 28918,
      src: 'https://www.youtube.com/embed/njaiIuczeFY'
    },
    {
      name: '일기예보',
      views: 25766,
      src: 'https://www.youtube.com/embed/zWLVysDxe0w'
    },
    {
      name: 'Lullaby',
      views: 25361,
      src: 'https://www.youtube.com/embed/LcjsHSOvBbA'
    },
    {
      name: '홍은동 334-10',
      views: 23585,
      src: 'https://www.youtube.com/embed/eWPEd1VUW5U'
    },
    {
      name: '말하자면',
      views: 23424,
      src: 'https://www.youtube.com/embed/dj7_EiQKB-0'
    },
    {
      name: '여자친구 - 해야 Cover by Hemeets',
      views: 10948,
      src: 'https://www.youtube.com/embed/XYDyB2Iaq2s'
    },
    {
      name: '장난감이 추천하는 히미츠 플레이리스트',
      views: 5001,
      src: 'https://www.youtube.com/embed/d1ZDzz4HB0A'
    },
    {
      name: '드러머 김성하 TOTO - Rosanna Drum Cover',
      views: 8975,
      src: 'https://www.youtube.com/embed/Fc-4_Bg3UzQ'
    },
    {
      name: '르세라핌 - Blue Flame [Bass cover]',
      views: 14765,
      src: 'https://www.youtube.com/embed/phiywo9T20k'
    },
    {
      name: '[M/V] 화성침공',
      views: 1341123,
      src: 'https://www.youtube.com/embed/gVWvxddRz3U'
    }
  ];
};

const setRank = _rank => {
  const temp = [];
  for (const [_, value] of Object.entries(_rank)) {
    temp.push(value);
  }
  temp.sort((a, b) => b.score - a.score);
  rank = temp.filter((x, i) => i < 30);
  renderRankingModal();
};

const fetchRank = async () => {
  try {
    const { data: rank } = await axios.get(url);
    setRank(rank);
  } catch (error) {
    console.error(error);
  }
};

const sendResult = async () => {
  try {
    axios.post(url, { username, score });
  } catch (error) {
    console.error(error);
  }
};

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const render = () => {
  root.innerHTML = `
  <span class="score-board">점수 ${score}</span>
  <h1 class="title">히미츠 더 많이 더 적게</h1>
  <div class="container">
    <div class="left ${username ? '' : 'hide'}">
      <h2 class="left-title">${left.name}</h2>
      <iframe class="left-video" width="100%" src="${left.src}"></iframe>
      <p class="views">${left.views}회</p>
    </div>
    <div class="right ${username ? '' : 'hide'}">
      <h2 class="right-title">${right.name}</h2>
      <iframe class="right-video" width="100%" src="${right.src}"></iframe>
      <p class="views hide">${right.views}회</p>
      <div class="btn-group">
        <button class="more-btn" type="button">더 많이</button>
        <button class="less-btn" type="button">더 적게</button>
      </div>
    </div>
    <div class="modal modal-result hide"></div>
    <div class="modal modal-ranking hide"></div>
    <div class="modal modal-username ${username ? 'hide' : ''}">
      <h3 class="username-title">이름을 입력하세요</h3>
      <form class="username-form">
        <input class="username-input" type="text" />
        <button class="username-btn" type="submit">입력</button>
      </form>
    </div>
    <div class='overlay ${username ? 'hide' : ''}'></div>
  </div>
  `;
};

const renderViews = () => {
  document.querySelector('.btn-group').classList.add('hide');
  document.querySelector('.right .views').classList.remove('hide');
};

const renderResultModal = () => {
  const modal = document.querySelector('.modal');
  modal.classList.remove('hide');
  modal.innerHTML = `
  <div class="modal-desc">
    ${songs.length === 0 ? '모든 문제를 맞추셨습니다.' : '게임이 끝났습니다.'}<br/>
    ${username}님의 점수는 <span class="score">${score}</span>점 입니다.
    <div class="button-group">
      <a class="ranking">랭킹보기</a>
      <button class="replay">다시하기</button>
    </div>
  </div>
  `;
};

const renderRankingModal = () => {
  const modalRnk = document.querySelector('.modal-ranking');
  const modalResult = document.querySelector('.modal-result');
  modalResult.classList.add('hide');

  modalRnk.innerHTML =
    `<div class="ranking-item ranking-item-title">
      <span class="ranking-item-rank">랭킹</span>
      <span class="ranking-item-username">이름</span>
      <span class="ranking-item-score">점수</span>
    </div>` +
    rank
      .map(
        ({ username, score }, rank) => `
    <div class="ranking-item">
      <span class="ranking-item-rank">${rank + 1}</span>
      <span class="ranking-item-username">${username}</span>
      <span class="ranking-item-score">${score}</span>
    </div>
  `
      )
      .join('') +
    '<button class="replay">다시하기</button>';
  modalRnk.classList.remove('hide');
};

const setSelected = () => {
  if (songs.length === 0) {
    sendResult();
    renderResultModal();
    return;
  }

  left = Object.keys(right).length ? { ...right } : songs.pop();
  right = songs.pop();

  hideBtn = false;
  hideViews = true;
  render();
};

const reset = () => {
  score = 0;
  fetchSongs();
  shuffle(songs);
  setSelected();
  render();
};

root.addEventListener('click', ({ target }) => {
  if (target.classList.contains('more-btn')) {
    renderViews();

    if (left.views <= right.views) {
      score += 6 - Math.abs(right.views.toString().length - left.views.toString().length);
      setTimeout(() => {
        setSelected();
      }, 1500);
    } else {
      sendResult();
      renderResultModal();
    }
  }

  if (target.classList.contains('less-btn')) {
    renderViews();

    if (left.views >= right.views) {
      score += 6 - Math.abs(right.views.toString().length - left.views.toString().length);
      setTimeout(() => {
        setSelected();
      }, 1000);
    } else {
      sendResult();
      renderResultModal();
    }
  }

  if (target.classList.contains('replay')) {
    reset();
  }

  if (target.classList.contains('ranking')) {
    fetchRank();
  }
});

root.addEventListener('submit', e => {
  e.preventDefault();
  username = e.target.querySelector('.username-input').value.trim();
  reset();
});

window.addEventListener('DOMContentLoaded', () => {
  reset();
});
