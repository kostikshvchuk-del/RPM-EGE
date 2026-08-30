// ===== ЕГЭ ШТАТА SOUTH — 25 ВОПРОСОВ (Supabase версия) =====

const QUESTIONS = [
  { q: "Какая фракция распространяет информацию о событиях штата?", a: ["CPD (Полиция)", "NEWS / СМИ", "EMS (Медицина)", "ФБР"], correct: 1, diff: "Легкий" },
  { q: "Какая фракция является управляющей во всём штате и выпускает новые ФЗ?", a: ["ФБР", "CPD (Полиция)", "Мэрия / Правительство штата", "Суд"], correct: 2, diff: "Легкий" },
  { q: "Какая фракция отвечает за порядок среди граждан во время митинга?", a: ["ФБР", "CPD (Полиция)", "Национальная Гвардия", "EMS"], correct: 1, diff: "Легкий" },
  { q: "Есть ли выходные у Мэрии?", a: ["Да, суббота и воскресенье", "Только воскресенье", "Нет — работает 7 дней в неделю без выходных", "По графику"], correct: 2, diff: "Легкий" },
  { q: "Что является высшим документом (законом) в штате?", a: ["Приказ Губернатора", "Конституция Штата South", "ЕПК", "Уголовный Кодекс"], correct: 1, diff: "Легкий" },
  { q: "Какая фракция является нежелательной к посещению и находится за мостом в округе?", a: ["ФБР", "Национальная Гвардия / Федеральная Тюрьма", "Мэрия", "EMS"], correct: 1, diff: "Легкий" },
  { q: "Назовите три основные силовые структуры штата.", a: ["EMS, NEWS, Суд", "CPD, ФБР, Национальная Гвардия", "Мэрия, CPD, EMS", "ФБР, Суд, NEWS"], correct: 1, diff: "Легкий" },
  { q: "Какая фракция прибывает на место преступления, но её цель — не преступник, а пострадавший?", a: ["ФБР", "EMS / Медицинская служба", "CPD", "NEWS"], correct: 1, diff: "Легкий" },
  { q: "Какая фракция может оказаться первой на месте происшествия, но не задерживает и не лечит?", a: ["CPD", "EMS", "NEWS / СМИ", "Национальная Гвардия"], correct: 2, diff: "Средний" },
  { q: "Какая фракция должна первой заняться нарушителем, если он в общественном месте?", a: ["NEWS", "EMS", "CPD (Полиция)", "ФБР"], correct: 2, diff: "Средний" },
  { q: "Какая фракция отвечает за безопасность государства, даже если опасность не дошла до штата?", a: ["CPD", "ФБР", "Национальная Гвардия", "Мэрия"], correct: 1, diff: "Средний" },
  { q: "Какая фракция находится выше CPD, но выполняет те же функции с более сложными задачами?", a: ["Национальная Гвардия", "ФБР (Federal Bureau of Investigation)", "EMS", "Мэрия"], correct: 1, diff: "Средний" },
  { q: "Какая фракция является наиболее эффективной для заработка в штате?", a: ["Национальная Гвардия", "EMS", "NEWS (реклама), Мэрия/ФБР (премии на высоких рангах)", "Суд"], correct: 2, diff: "Средний" },
  { q: "Какие фракции относятся к социальной сфере и почему?", a: ["CPD и ФБР — они защищают", "EMS и NEWS — оказывают услуги населению, не силовые функции", "Мэрия и Суд — управляют", "Национальная Гвардия и EMS"], correct: 1, diff: "Средний" },
  { q: "Какие фракции являются государственными и сколько их в штате?", a: ["Только 3", "Все 7 — Мэрия, CPD, ФБР, НГ, EMS, NEWS, Суд", "5", "Только Мэрия и CPD"], correct: 1, diff: "Средний" },
  { q: "В какую фракцию вы должны трудоустроиться, чтобы потом устроиться в CPD/ФБР?", a: ["NEWS", "Национальная Гвардия / Армия", "EMS", "Мэрия"], correct: 1, diff: "Средний" },
  { q: "Какая фракция должна быть задействована для обеспечения безопасности стратегического объекта?", a: ["Национальная Гвардия", "ФБР", "CPD", "Мэрия"], correct: 0, diff: "Сложный" },
  { q: "Какая фракция отвечает за принятие решений, затрагивающих несколько гос. организаций?", a: ["NEWS", "EMS", "Мэрия / Правительство (Губернатор)", "CPD"], correct: 2, diff: "Сложный" },
  { q: "Какая фракция следит за остальными, оценивая их на проверке?", a: ["NEWS", "EMS", "Мэрия + ФБР как наблюдатель", "Национальная Гвардия"], correct: 2, diff: "Сложный" },
  { q: "Какая фракция является независимой и не подчиняется Мэрии?", a: ["CPD", "EMS", "Суд + ФБР (федеральное подчинение)", "NEWS"], correct: 2, diff: "Сложный" },
  { q: "Полицейский выдал розыск неправильно. Куда идти?", a: ["В ФБР", "В Суд — подать исковое заявление (по ЕПК)", "В Мэрию", "В NEWS"], correct: 1, diff: "Сложный" },
  { q: "CPD и ФБР приехали на серьезное преступление. Кто главный?", a: ["CPD", "ФБР — федеральные преступления — их подследственность", "Делят поровну", "Мэрия решает"], correct: 1, diff: "Сложный" },
  { q: "Что такое ЕПК и какие фракции по нему работают?", a: ["Экстренный Протокол Контроля", "Единый Процессуальный Кодекс — CPD, ФБР, Суд", "Единый План Контроля", "Электронный Протокол Кадров"], correct: 1, diff: "Сложный" },
  { q: "Гражданина оскорбили расистским оскорблением. Может ли подать иск?", a: ["Нет — просто слова", "Да — расовая дискриминация наказуема", "Только при свидетелях", "Только ФБР"], correct: 1, diff: "Сложный" },
  { q: "Представь экскурсию в музей округа. Что расскажешь?", a: ["Музей закрыт", "Основан в 2019. Основание штата, флаг, история силовых, культура", "Это архив ФБР", "Военная база"], correct: 1, diff: "Сложный" }
];

let current = 0;
let answers = Array(QUESTIONS.length).fill(null);
let warnings = 0;
let annulled = false;
let timerInterval = null;
let timeLeft = 25 * 60;
let examStarted = false;
let studentInfo = {};

const examScreen = document.getElementById('exam-screen');
const resultScreen = document.getElementById('result-screen');
const annulledScreen = document.getElementById('annulled-screen');

function scrollToLogin(){
  document.getElementById('login').scrollIntoView({behavior:'smooth', block:'start'});
  setTimeout(()=> document.getElementById('nickname')?.focus(), 600);
}

document.querySelectorAll('.nav__link').forEach(a=>{
  a.addEventListener('click', e=>{
    document.querySelectorAll('.nav__link').forEach(x=>x.classList.remove('active'));
    e.target.classList.add('active');
  });
});

function tryLogin(e) {
  if (e) e.preventDefault();
  const nickEl = document.getElementById('nickname');
  const gameNickEl = document.getElementById('game-nick');
  const ageEl = document.getElementById('age');
  const agreeEl = document.getElementById('agree');
  const nick = nickEl.value.trim();
  const gameNick = gameNickEl.value.trim();
  const age = parseInt(ageEl.value);

  if (!nick) { alert('Введите имя и фамилию!'); nickEl.focus(); return; }
  if (nick.length < 3) { alert('Имя слишком короткое'); return; }
  if (!gameNick) { alert('Введите ник в игре!'); gameNickEl.focus(); return; }
  if (!age || age < 14) { alert('Минимальный возраст — 14 лет'); ageEl.focus(); return; }

  studentInfo = { name: nick, gameNick: gameNick, age: age };
  document.getElementById('exam-nick').textContent = nick + ' (' + gameNick + ')';
  startExam();
}

document.getElementById('login-form').addEventListener('submit', tryLogin);
document.getElementById('login-btn').addEventListener('click', tryLogin);

function startExam() {
  window.scrollTo({top:0, behavior:'smooth'});
  document.querySelector('.gov-bar').style.display='none';
  document.querySelector('.header').style.display='none';
  document.querySelector('.hero').style.display='none';
  document.querySelector('.alert-bar').style.display='none';
  document.querySelector('.main-grid').style.display='none';
  document.querySelector('.footer').style.display='none';

  examScreen.classList.add('active');
  current = 0;
  answers = Array(QUESTIONS.length).fill(null);
  warnings = 0;
  annulled = false;
  timeLeft = 25 * 60;
  examStarted = true;
  document.getElementById('total-q').textContent = QUESTIONS.length;
  buildGrid();
  renderQuestion();
  startTimer();
  enableAntiCheat();
  setTimeout(()=>{ document.documentElement.requestFullscreen?.().catch(()=>{}); },300);
}

function buildGrid() {
  const grid = document.getElementById('question-grid');
  grid.innerHTML = '';
  QUESTIONS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'q-dot';
    dot.textContent = i + 1;
    dot.onclick = () => { current = i; renderQuestion(); };
    dot.id = 'dot-' + i;
    grid.appendChild(dot);
  });
}

function renderQuestion() {
  const q = QUESTIONS[current];
  document.getElementById('current-q').textContent = current + 1;
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('progress').style.width = ((current+1)/QUESTIONS.length*100) + '%';

  const diffEl = document.getElementById('exam-diff');
  diffEl.textContent = 'Сложность: ' + q.diff;
  diffEl.className = 'exam-diff diff-' + (q.diff === 'Легкий' ? 'easy' : q.diff === 'Средний' ? 'medium' : 'hard');

  const opts = document.getElementById('options');
  opts.innerHTML = '';
  q.a.forEach((text, idx) => {
    const div = document.createElement('label');
    div.className = 'option' + (answers[current] === idx ? ' selected' : '');
    div.innerHTML = `<input type="radio" name="q" ${answers[current]===idx?'checked':''}><span>${String.fromCharCode(65+idx)}) ${text}</span>`;
    div.onclick = () => { answers[current] = idx; renderQuestion(); updateGrid(); };
    opts.appendChild(div);
  });
  document.getElementById('prev-btn').disabled = current === 0;
  const nextBtn = document.getElementById('next-btn');
  const finishBtn = document.getElementById('finish-btn');
  if (current === QUESTIONS.length - 1) { nextBtn.classList.add('hidden'); finishBtn.classList.remove('hidden'); }
  else { nextBtn.classList.remove('hidden'); finishBtn.classList.add('hidden'); }
  updateGrid();
}

function updateGrid() {
  QUESTIONS.forEach((_, i) => {
    const dot = document.getElementById('dot-' + i);
    dot.classList.remove('answered', 'current');
    if (answers[i] !== null) dot.classList.add('answered');
    if (i === current) dot.classList.add('current');
  });
}

document.getElementById('prev-btn').onclick = () => { if (current>0) { current--; renderQuestion(); } };
document.getElementById('next-btn').onclick = () => { if (current<QUESTIONS.length-1) { current++; renderQuestion(); } };
document.getElementById('finish-btn').onclick = finishExam;
document.getElementById('fullscreen-btn').onclick = () => document.documentElement.requestFullscreen?.();

function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) { clearInterval(timerInterval); finishExam(); }
  }, 1000);
}
function updateTimerDisplay() {
  const m = String(Math.floor(timeLeft/60)).padStart(2,'0');
  const s = String(timeLeft%60).padStart(2,'0');
  const el = document.getElementById('timer');
  el.textContent = `${m}:${s}`;
  if (timeLeft < 300) el.classList.add('warn'); else el.classList.remove('warn');
}

function finishExam() {
  if (annulled) return;
  clearInterval(timerInterval);
  examStarted = false;
  disableAntiCheat();
  if (document.fullscreenElement) document.exitFullscreen().catch(()=>{});

  const result = {
    name: studentInfo.name || 'Без имени',
    game_nick: studentInfo.gameNick || '',
    age: studentInfo.age || 0,
    answers: JSON.stringify(answers),
    date: new Date().toLocaleString('ru-RU'),
    timestamp: Date.now(),
    admin_score: null,
    status: 'pending'
  };

  // Отправляем в Supabase
  supabasePost('results', result).then(data => {
    console.log('Результат сохранен в Supabase:', data);
  }).catch(err => {
    console.error('Ошибка записи:', err);
  });

  // Показываем ответы ученику
  examScreen.classList.remove('active');
  resultScreen.classList.add('active');

  let answered = answers.filter(a => a !== null).length;
  document.getElementById('result-title').textContent = 'Ответы сданы';
  document.getElementById('result-text').textContent = `Вы ответили на ${answered} из ${QUESTIONS.length} вопросов. Покажите этот экран преподавателю.`;

  let details = '<b>Ваши ответы:</b><br>';
  QUESTIONS.forEach((q,i)=>{
    const userAns = answers[i]===null ? '<i>(нет ответа)</i>' : String.fromCharCode(65+answers[i]) + ') ' + q.a[answers[i]];
    details += `<div style="padding:4px 0;border-bottom:1px solid #eee;font-size:12px"><b>${i+1}.</b> ${userAns}</div>`;
  });
  document.getElementById('result-details').innerHTML = details;
}

function restorePortal(){
  document.querySelector('.gov-bar').style.display='';
  document.querySelector('.header').style.display='';
  document.querySelector('.hero').style.display='';
  document.querySelector('.alert-bar').style.display='';
  document.querySelector('.main-grid').style.display='';
  document.querySelector('.footer').style.display='';
  window.scrollTo({top:0, behavior:'smooth'});
}

document.getElementById('restart-btn').onclick = () => { resultScreen.classList.remove('active'); restorePortal(); document.getElementById('login').scrollIntoView({behavior:'smooth'}); };

// Авто-старт если пришли из кабинета
(function(){
  const params = new URLSearchParams(window.location.search);
  if(params.get('exam') === '1'){
    const name = localStorage.getItem('ege_nick');
    const nick = localStorage.getItem('ege_gamenick');
    if(name && nick){
      studentInfo = { name, gameNick: nick, age: 18 };
      document.getElementById('exam-nick').textContent = name + ' (' + nick + ')';
      setTimeout(startExam, 300);
    }
  }
})();
document.getElementById('annulled-restart').onclick = () => { annulledScreen.classList.remove('active'); restorePortal(); };

function enableAntiCheat(){ document.addEventListener('visibilitychange', onVisibility); window.addEventListener('blur', onBlur); document.addEventListener('fullscreenchange', onFullscreen); window.addEventListener('beforeunload', onBeforeUnload); }
function disableAntiCheat(){ document.removeEventListener('visibilitychange', onVisibility); window.removeEventListener('blur', onBlur); window.removeEventListener('fullscreenchange', onFullscreen); window.removeEventListener('beforeunload', onBeforeUnload); }
function onVisibility(){ if(!examStarted||annulled) return; if(document.hidden) triggerWarning('Вы свернули вкладку!'); }
function onBlur(){ if(!examStarted||annulled) return; setTimeout(()=>{ if(document.hidden) return; if(!document.hasFocus()) triggerWarning('Потеря фокуса!'); },500); }
function onFullscreen(){ if(!examStarted||annulled) return; if(!document.fullscreenElement) triggerWarning('Вышли из полноэкранного режима!'); }
function onBeforeUnload(e){ if(examStarted&&!annulled){ e.preventDefault(); e.returnValue=''; } }
function triggerWarning(msg){
  warnings++;
  const box=document.getElementById('warnings');
  box.classList.remove('hidden');
  document.getElementById('warning-text').textContent=`⚠️ Предупреждение ${warnings}/2: ${msg}`;
  if(warnings===1){ box.style.background='#fef3c7'; box.style.borderColor='#f59e0b'; box.style.color='#92400e'; setTimeout(()=>{ if(!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(()=>{}); },800); }
  if(warnings>=2) annulExam(msg);
}
function annulExam(reason){
  annulled=true; examStarted=false; clearInterval(timerInterval); disableAntiCheat();
  examScreen.classList.remove('active'); annulledScreen.classList.add('active');
  document.getElementById('annulled-reason').textContent = reason + ' — попытка #' + warnings;
}
