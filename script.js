// ===== ЕГЭ ШТАТА SOUTH — ПОЛНАЯ ВЕРСИЯ =====

// === ВОПРОСЫ I ЧАСТИ (выбор А Б В Г) ===
const PART1 = [
  {q:"Какая фракция распространяет информацию о событиях штата?",a:["CPD (Полиция)","NEWS / СМИ","EMS (Медицина)","ФБР"],c:1,d:"Легкий"},
  {q:"Какая фракция является управляющей во всём штате и выпускает ФЗ?",a:["ФБР","CPD","Мэрия / Правительство","Суд"],c:2,d:"Легкий"},
  {q:"Какая фракция отвечает за порядок во время митинга?",a:["ФБР","CPD","Национальная Гвардия","EMS"],c:1,d:"Легкий"},
  {q:"Есть ли выходные у Мэрии?",a:["Да, сб и вс","Только вс","Нет — 7 дней без выходных","По графику"],c:2,d:"Легкий"},
  {q:"Что является высшим документом в штате?",a:["Приказ Губернатора","Конституция South","ЕПК","УК"],c:1,d:"Легкий"},
  {q:"Какая фракция за мостом в округе (нежелательная)?",a:["ФБР","Национальная Гвардия / Федеральная Тюрьма","Мэрия","EMS"],c:1,d:"Легкий"},
  {q:"Три основные силовые структуры?",a:["EMS, NEWS, Суд","CPD, ФБР, Национальная Гвардия","Мэрия, CPD, EMS","ФБР, Суд, NEWS"],c:1,d:"Легкий"},
  {q:"Какая фракция приезжает, цель — пострадавший?",a:["ФБР","EMS","CPD","NEWS"],c:1,d:"Легкий"},
  {q:"Какая фракция первой на месте, но не задерживает и не лечит?",a:["CPD","EMS","NEWS / СМИ","НГ"],c:2,d:"Средний"},
  {q:"Какая фракция первой берётся за нарушителя в общественном месте?",a:["NEWS","EMS","CPD","ФБР"],c:2,d:"Средний"},
  {q:"Какая фракция за гос. безопасность до угрозы штату?",a:["CPD","ФБР","НГ","Мэрия"],c:1,d:"Средний"},
  {q:"Какая фракция выше CPD с более сложными задачами?",a:["НГ","ФБР","EMS","Мэрия"],c:1,d:"Средний"},
  {q:"Какая фракция эффективна для заработка?",a:["НГ","EMS","NEWS/Мэрия/ФБР (премии)","Суд"],c:2,d:"Средний"},
  {q:"Социальные фракции — какие?",a:["CPD/ФБР","EMS/NEWS — услуги населению","Мэрия/Суд","НГ/EMS"],c:1,d:"Средний"},
  {q:"Сколько гос. фракций в штате?",a:["3","Все 7","5","2"],c:1,d:"Средний"},
  {q:"Куда трудоустроиться перед CPD/ФБР?",a:["NEWS","Национальная Гвардия / Армия","EMS","Мэрия"],c:1,d:"Средний"},
  {q:"Безопасность стратегического объекта — какая фракция?",a:["Национальная Гвардия","ФБР","CPD","Мэрия"],c:0,d:"Сложный"},
  {q:"Решения, затрагивающие несколько гос. организаций?",a:["NEWS","EMS","Мэрия / Губернатор","CPD"],c:2,d:"Сложный"},
  {q:"Кто следит за другими на проверке?",a:["NEWS","EMS","Мэрия + ФБР","НГ"],c:2,d:"Сложный"},
  {q:"Какая фракция независима от Мэрии?",a:["CPD","EMS","Суд + ФБР","NEWS"],c:2,d:"Сложный"},
  {q:"Неправильный розыск — куда идти?",a:["ФБР","Суд — иск по ЕПК","Мэрия","NEWS"],c:1,d:"Сложный"},
  {q:"CPD и ФБР на месте — кто главный?",a:["CPD","ФБР — федеральная подследственность","Поровну","Мэрия"],c:1,d:"Сложный"},
  {q:"ЕПК — что это?",a:["Экстренный Протокол","Единый Процессуальный Кодекс — CPD, ФБР, Суд","Единый План","Электронный Протокол"],c:1,d:"Сложный"},
  {q:"Расистское оскорбление — иск в суд?",a:["Нет","Да — дискриминация наказуема","Только при свидетелях","Только ФБР"],c:1,d:"Сложный"},
  {q:"Экскурсия в музей — что рассказать?",a:["Закрыт","Основан 2019. Штат, флаг, силовые, культура","Архив ФБР","Военная база"],c:1,d:"Сложный"}
];

// === ВОПРОСЫ II ЧАСТИ (письменно) ===
const PART2 = [
  {q:"Какая фракция отвечает за безопасность государства, даже если опасность ещё не дошла до штата? Объясните почему.",hint:"ФБР — контрразведка, федеральный уровень"},
  {q:"Полицейский выдал вам розыск неправильно. Куда вы пойдёте и что сделаете? Опишите поэтапно.",hint:"Суд — исковое заявление по ЕПК, требование боди-камеры"},
  {q:"Чем отличается CPD от ФБР? Назовите минимум 3 отличия.",hint:"Местный vs федеральный, подследственность, ранги"},
  {q:"Представьте что вы даёте экскурсию в музей штата. О чём вы расскажете?",hint:"Основание штата, флаг, история силовых структур, культура"},
  {q:"Какая фракция является наиболее эффективной для заработка в штате? Обоснуйте.",hint:"NEWS (реклама), Мэрия/ФБР (премии), EMS (оклад + вызовы)"},
  {q:"Какие фракции относятся к социальной сфере? Почему они так называются?",hint:"EMS и NEWS — услуги населению, не силовые функции"},
  {q:"Опишите порядок действий если вы стали свидетелем преступления в общественном месте.",hint:"CPD → оцепление, EMS → помощь пострадавшим, ФБР → если госбезопасность"},
  {q:"Что такое ЕПК и какие фракции по нему работают? Приведите примеры статей.",hint:"Единый Процессуальный Кодекс — задержание, обыск, розыск"},
  {q:"Почему Суд является независимой фракцией и не подчиняется Мэрии?",hint:"Конституция — разделение властей, судебная власть"},
  {q:"Если бы вы были Губернатором, какую первую реформу провели бы в штате и почему?",hint:"Любой осмысленный ответ, показывающий знание структуры штата"}
];

const ALL_QUESTIONS = [...PART1.map((q,i)=>({...q,type:'choice',idx:i})), ...PART2.map((q,i)=>({...q,type:'text',idx:PART1.length+i}))];

let currentUser = null;
let currentQ = 0;
let answers = new Array(ALL_QUESTIONS.length).fill(null);
let timerInterval = null;
let timeLeft = 25 * 60;
let examActive = false;

// === НАВИГАЦИЯ ЭКРАНОВ ===
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

// === РЕГИСТРАЦИЯ ===
document.getElementById('register-form').addEventListener('submit', e=>{
  e.preventDefault();
  const login = document.getElementById('reg-login').value.trim();
  const name = document.getElementById('reg-name').value.trim();
  const age = parseInt(document.getElementById('reg-age').value);
  const pass = document.getElementById('reg-pass').value;
  const pass2 = document.getElementById('reg-pass2').value;

  if(!login || !name || !age || !pass){ alert('Заполните все поля'); return; }
  if(login.length < 3){ alert('Логин минимум 3 символа'); return; }
  if(age < 4){ alert('Минимальный возраст — 4 года'); return; }
  if(pass.length < 4){ alert('Пароль минимум 4 символа'); return; }
  if(pass !== pass2){ alert('Пароли не совпадают'); return; }

  const users = JSON.parse(localStorage.getItem('ege_users') || '[]');
  if(users.find(u=>u.login===login)){ alert('Такой логин уже существует'); return; }

  const user = { login, name, age, pass, created: new Date().toLocaleString('ru-RU') };
  users.push(user);
  localStorage.setItem('ege_users', JSON.stringify(users));
  localStorage.setItem('ege_current', JSON.stringify(user));

  currentUser = user;
  loadCabinet();
  showScreen('screen-cabinet');
});

// === ВХОД ===
document.getElementById('login-form').addEventListener('submit', e=>{
  e.preventDefault();
  const login = document.getElementById('log-login').value.trim();
  const pass = document.getElementById('log-pass').value;

  const users = JSON.parse(localStorage.getItem('ege_users') || '[]');
  const user = users.find(u=>u.login===login && u.pass===pass);
  if(!user){ alert('Неверный логин или пароль'); return; }

  localStorage.setItem('ege_current', JSON.stringify(user));
  currentUser = user;
  loadCabinet();
  showScreen('screen-cabinet');
});

// === КАБИНЕТ ===
async function loadCabinet(){
  if(!currentUser) return;

  document.getElementById('cab-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
  document.getElementById('cab-name').textContent = currentUser.name;
  document.getElementById('cab-login-display').textContent = currentUser.login;
  document.getElementById('cab-topbar-info').textContent = 'Аккаунт создан: ' + (currentUser.created || '—');

  try {
    const results = await supabaseGet('results', `&name=eq.${encodeURIComponent(currentUser.name)}&order=timestamp.desc`);
    if(results && results.length > 0){
      const latest = results[0];
      document.getElementById('cab-empty').style.display = 'none';
      document.getElementById('cab-result').style.display = '';

      const score = latest.admin_score;
      if(score !== null && score !== undefined){
        document.getElementById('cab-score').textContent = score;
        document.getElementById('cab-score').style.color = score >= 14 ? '#0a7a42' : '#c0392b';
        document.getElementById('cab-result-title').textContent = score >= 14 ? '✅ ТЕСТ СДАН' : '❌ НЕ СДАНО';
        document.getElementById('cab-result-icon').textContent = score >= 14 ? '🎓' : '📚';
      } else {
        document.getElementById('cab-score').textContent = '—';
        document.getElementById('cab-score').style.color = '#f59e0b';
        document.getElementById('cab-result-title').textContent = '⏳ Ожидает проверки';
        document.getElementById('cab-result-icon').textContent = '⏳';
      }
      document.getElementById('cab-result-date').textContent = 'Дата сдачи: ' + (latest.date || '—');

      // Детали I части
      if(latest.answers){
        try {
          const ans = JSON.parse(latest.answers);
          const part1 = ans.slice(0, PART1.length);
          let correct = 0;
          let html = '';
          part1.forEach((a,i)=>{
            const isCorrect = a === PART1[i].c;
            if(isCorrect) correct++;
            html += `<div class="detail-dot ${isCorrect?'correct':'wrong'}" title="В${i+1}: ${isCorrect?'Верно':'Неверно'}">${i+1}</div>`;
          });
          document.getElementById('cab-part1-details').style.display = '';
          document.getElementById('cab-part1-grid').innerHTML = `<span style="font-size:12px;color:var(--muted);margin-bottom:6px;display:block">I Часть: ${correct} из ${PART1.length}</span>` + html;
        } catch(e){}
      }

      if(results.length > 1){
        document.getElementById('cab-history').style.display = '';
        document.getElementById('cab-history-list').innerHTML = results.map(r=>{
          const sc = r.admin_score;
          const txt = sc !== null && sc !== undefined ? sc + ' / 35' : 'На проверке';
          const clr = sc !== null && sc !== undefined ? (sc>=14?'var(--green)':'var(--red)') : '#f59e0b';
          return `<div style="display:flex;justify-content:space-between;padding:10px 12px;background:#fff;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;font-size:13px"><span style="color:var(--muted)">${r.date||''}</span><span style="color:${clr};font-weight:800">${txt}</span></div>`;
        }).join('');
      }
    } else {
      document.getElementById('cab-empty').style.display = '';
      document.getElementById('cab-result').style.display = 'none';
      document.getElementById('cab-history').style.display = 'none';
    }
  } catch(e){
    console.error(e);
    document.getElementById('cab-empty').style.display = '';
    document.getElementById('cab-result').style.display = 'none';
  }
}

function cabLogout(){
  localStorage.removeItem('ege_current');
  currentUser = null;
  showScreen('screen-home');
}

// === ЭКЗАМЕН ===
function startExam(){
  showScreen('screen-exam');
  currentQ = 0;
  answers = new Array(ALL_QUESTIONS.length).fill(null);
  examActive = true;
  timeLeft = 25 * 60;
  document.getElementById('exam-nick').textContent = currentUser.name;

  buildGrid();
  renderQuestion();
  startTimer();
  enableAntiCheat();
  setTimeout(()=>{ document.documentElement.requestFullscreen?.().catch(()=>{}); },300);
}

function buildGrid(){
  const grid = document.getElementById('question-grid');
  grid.innerHTML = '';
  ALL_QUESTIONS.forEach((_,i)=>{
    const dot = document.createElement('div');
    dot.className = 'q-dot';
    dot.textContent = i+1;
    dot.onclick = ()=>{ currentQ=i; renderQuestion(); };
    dot.id = 'dot-'+i;
    grid.appendChild(dot);
  });
}

function renderQuestion(){
  const q = ALL_QUESTIONS[currentQ];
  const isChoice = q.type === 'choice';
  const total = ALL_QUESTIONS.length;

  document.getElementById('q-current').textContent = currentQ+1;
  document.getElementById('q-total').textContent = total;
  document.getElementById('progress').style.width = ((currentQ+1)/total*100)+'%';

  document.getElementById('part1-question').style.display = isChoice ? '' : 'none';
  document.getElementById('part2-question').style.display = isChoice ? 'none' : '';

  const badge = document.getElementById('exam-part-badge');
  badge.textContent = currentQ < PART1.length ? 'I Часть (Выбор)' : 'II Часть (Письменно)';
  badge.className = 'exam-part-badge ' + (currentQ < PART1.length ? 'badge-choice' : 'badge-text');

  if(isChoice){
    document.getElementById('question-text').textContent = (currentQ+1)+'. '+q.q;
    const diffEl = document.getElementById('exam-diff');
    diffEl.textContent = q.d;
    diffEl.className = 'exam-diff-tag '+(q.d==='Легкий'?'diff-easy':q.d==='Средний'?'diff-medium':'diff-hard');

    const opts = document.getElementById('options');
    opts.innerHTML = '';
    q.a.forEach((text,idx)=>{
      const div = document.createElement('label');
      div.className = 'option'+(answers[currentQ]===idx?' selected':'');
      div.innerHTML = `<input type="radio" name="q" ${answers[currentQ]===idx?'checked':''}><span>${String.fromCharCode(65+idx)}) ${text}</span>`;
      div.onclick = ()=>{ answers[currentQ]=idx; renderQuestion(); updateGrid(); };
      opts.appendChild(div);
    });
  } else {
    document.getElementById('question-text-2').textContent = (currentQ+1)+'. '+q.q;
    const ta = document.getElementById('text-answer');
    ta.value = answers[currentQ] || '';
    ta.oninput = ()=>{ answers[currentQ] = ta.value; updateGrid(); };
  }

  document.getElementById('prev-btn').disabled = currentQ===0;
  const nextBtn = document.getElementById('next-btn');
  const finishBtn = document.getElementById('finish-btn');
  if(currentQ===total-1){ nextBtn.classList.add('hidden'); finishBtn.classList.remove('hidden'); }
  else { nextBtn.classList.remove('hidden'); finishBtn.classList.add('hidden'); }
  updateGrid();
}

function updateGrid(){
  ALL_QUESTIONS.forEach((_,i)=>{
    const dot = document.getElementById('dot-'+i);
    dot.classList.remove('answered','current');
    if(answers[i]!==null && answers[i]!=='') dot.classList.add('answered');
    if(i===currentQ) dot.classList.add('current');
  });
}

document.getElementById('prev-btn').onclick = ()=>{ if(currentQ>0){ currentQ--; renderQuestion(); }};
document.getElementById('next-btn').onclick = ()=>{ if(currentQ<ALL_QUESTIONS.length-1){ currentQ++; renderQuestion(); }};
document.getElementById('finish-btn').onclick = finishExam;

// ТАЙМЕР
function startTimer(){
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(()=>{
    timeLeft--;
    updateTimerDisplay();
    if(timeLeft<=0){ clearInterval(timerInterval); finishExam(); }
  },1000);
}
function updateTimerDisplay(){
  const m = String(Math.floor(timeLeft/60)).padStart(2,'0');
  const s = String(timeLeft%60).padStart(2,'0');
  const el = document.getElementById('timer');
  el.textContent = m+':'+s;
  if(timeLeft<300) el.classList.add('warn'); else el.classList.remove('warn');
}

// СДАЧА
function finishExam(){
  if(!examActive) return;
  clearInterval(timerInterval);
  examActive = false;
  disableAntiCheat();
  if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});

  let autoScore = 0;
  PART1.forEach((q,i)=>{ if(answers[i]===q.c) autoScore++; });

  const result = {
    name: currentUser.name,
    game_nick: currentUser.login,
    age: currentUser.age,
    answers: JSON.stringify(answers),
    date: new Date().toLocaleString('ru-RU'),
    timestamp: Date.now(),
    admin_score: null,
    status: 'pending'
  };

  supabasePost('results', result).then(d=>{
    console.log('Сохранено:', d);
  }).catch(e=>{
    console.error('Ошибка:', e);
  });

  showScreen('screen-result');
}

// АНТИЧИТ
function enableAntiCheat(){ document.addEventListener('visibilitychange',onVis); window.addEventListener('blur',onBlur); document.addEventListener('fullscreenchange',onFS); }
function disableAntiCheat(){ document.removeEventListener('visibilitychange',onVis); window.removeEventListener('blur',onBlur); document.removeEventListener('fullscreenchange',onFS); }
function onVis(){ if(!examActive) return; if(document.hidden) warn('Вы свернули вкладку!'); }
function onBlur(){ if(!examActive) return; setTimeout(()=>{ if(!document.hasFocus()) warn('Потеря фокуса!'); },500); }
function onFS(){ if(!examActive) return; if(!document.fullscreenElement) warn('Вышли из полноэкранного!'); }
function warn(msg){
  const el = document.getElementById('exam-warning');
  el.classList.remove('hidden');
  el.textContent = '⚠️ '+msg+' Покинув аудиторию работа аннулируется!';
  el.style.background='#fee2e2'; el.style.color='#991b1b';
}

// АВТО-ВХОД
(function(){
  const saved = localStorage.getItem('ege_current');
  if(saved){
    try{ currentUser = JSON.parse(saved); loadCabinet(); showScreen('screen-cabinet'); }catch(e){}
  }
})();
