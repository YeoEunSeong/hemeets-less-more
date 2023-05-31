const leftName = document.querySelector('.left .name');
const leftViews = document.querySelector('.left .views');
const rightName = document.querySelector('.right .name');
const rightViews = document.querySelector('.right .views');
const btnGroup = document.querySelector('.btn-group');
const moreBtn = document.querySelector('.more-btn');
const lessBtn = document.querySelector('.less-btn');
const modal = document.querySelector('.modal');
const modalResult = document.querySelector('.modal-result');
const score = document.querySelector('.score');

let songInfos = [];
let currentScore = 0;
let left = '';
let right = '';

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const fetch = () => {
  songInfos = [
    {
      name: '드라큘라',
      views: 293783
    },
    {
      name: '신장개업',
      views: 290198
    },
    {
      name: '화성침공',
      views: 217409
    },
    {
      name: '세실 호텔',
      views: 173520
    }
  ];
};

const displayModal = () => {
  score.textContent = currentScore;

  modalResult.textContent = songInfos.length === 0 ? '모든 문제를 맞추었습니다.' : '틀렸습니다.';
  modal.style.display = 'block';
};

const setData = () => {
  if (right == '') {
    left = songInfos.pop();
    right = songInfos.pop();
  } else {
    left = { ...right };
    right = songInfos.pop();
  }
  leftName.textContent = left.name;
  leftViews.textContent = left.views + '회';
  rightName.textContent = right.name;
};

const displayViews = () => {
  btnGroup.style.display = 'none';
  rightViews.textContent = right.views + '회';
};

const hideViews = () => {
  btnGroup.style.display = 'block';
  rightViews.textContent = '';
};

moreBtn.addEventListener('click', () => {
  displayViews();

  if (left.views <= right.views) {
    currentScore += 1;
    if (songInfos.length === 0) {
      displayModal();
      return;
    }
    setData();
    hideViews();
  } else {
    displayModal();
  }
});

lessBtn.addEventListener('click', () => {
  displayViews();

  if (left.views >= right.views) {
    currentScore += 1;
    if (songInfos.length === 0) {
      displayModal();
      return;
    }
    setData();
    hideViews();
  } else {
    displayModal();
  }
});

window.addEventListener('load', () => {
  fetch();
  shuffle(songInfos);
  setData();
});
