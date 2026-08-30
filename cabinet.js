// cabinet.js — логика cabinet.html
var PART1=[];
var PART2=[];
var ALL=PART1.map(function(q,i){return{q:q.q,c:q.c,d:q.d,type:'choice',idx:i}}).concat(PART2.map(function(q,i){return{q:q.q,type:'text',idx:PART1.length+i}}));
var currentUser=null,currentQ=0,answers=[],timerInterval=null,timeLeft=25*60,examActive=false;
(async function(){
  var s=localStorage.getItem('ege_current_user');
  if(!s){window.location.href='register.html';return}
  try{
    currentUser=JSON.parse(s);
    var r=await supabaseFind('users','login',currentUser.login);
    if(!r||r.length===0){window.location.href='register.html';return}
    currentUser=r[0];
    loadCabinet();
  }catch(e){window.location.href='register.html'}
})();
async function loadCabinet(){
  if(!currentUser)return;
  document.getElementById('cab-avatar').textContent=currentUser.name.charAt(0).toUpperCase();
  document.getElementById('cab-name').textContent=currentUser.name;
  document.getElementById('cab-login').textContent=currentUser.login;
  document.getElementById('cab-age').textContent=currentUser.age+' лет';
  document.getElementById('cab-created').textContent=currentUser.created_at||'—';
  document.getElementById('cabinet-empty').style.display='none';
  document.getElementById('cabinet-pending').style.display='none';
  document.getElementById('cabinet-annulled').style.display='none';
  document.getElementById('cabinet-result').style.display='none';
  document.getElementById('cabinet-history').style.display='none';
  try{
    var r=await supabaseGet('results','&name=eq.'+encodeURIComponent(currentUser.name)+'&order=timestamp.desc');
    if(r&&r.length>0){
      var latest=r[0];
      if(latest.status==='annulled'){
        document.getElementById('cabinet-annulled').style.display='';
      } else {
      var sc=latest.admin_score;
      if(sc!==null&&sc!==undefined){
        document.getElementById('cabinet-result').style.display='';
        document.getElementById('cabinet-score').textContent=sc;
        document.getElementById('cabinet-score').style.color=sc>=14?'#0a7a42':'#c0392b';
        document.getElementById('cabinet-result-title').textContent=sc>=14?'ТЕСТ СДАН':'НЕ СДАНО';
        document.getElementById('cabinet-result-icon').textContent=sc>=14?'🎓':'📚';
        document.getElementById('cabinet-result-date').textContent='Дата сдачи: '+(latest.date||'—');
        if(latest.answers){
          try{
            var ans=JSON.parse(latest.answers);
            var p1=ans.slice(0,PART1.length);
            var ok=0,h='';
            p1.forEach(function(a,i){ var good=a===PART1[i].c; if(good)ok++; h+='<div class="detail-dot '+(good?'correct':'wrong')+'" title="В'+(i+1)+': '+(good?'Верно':'Неверно')+'">'+(i+1)+'</div>'; });
            document.getElementById('cabinet-details').style.display='';
            document.getElementById('cabinet-detail-grid').innerHTML='<span style="font-size:12px;color:var(--muted);margin-bottom:6px;display:block">I Часть: '+ok+' из '+PART1.length+'</span>'+h;
          }catch(e){}
        }
      }else{ document.getElementById('cabinet-pending').style.display=''; }
      }
      if(r.length>1){
        document.getElementById('cabinet-history').style.display='block';
        document.getElementById('cabinet-history-list').innerHTML=r.map(function(x){
          var s2=x.admin_score; var t=s2!==null&&s2!==undefined?s2+' / 35':'На проверке'; var c=s2!==null&&s2!==undefined?(s2>=14?'var(--green)':'var(--red)'):'#f59e0b';
          return'<div style="display:flex;justify-content:space-between;padding:10px 12px;background:#fff;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;font-size:13px"><span style="color:var(--muted)">'+(x.date||'')+'</span><span style="color:'+c+';font-weight:800">'+t+'</span></div>';
        }).join('');
      }
    }else{ document.getElementById('cabinet-empty').style.display=''; }
  }catch(e){ document.getElementById('cabinet-empty').style.display=''; }
}
function cabLogout(){localStorage.removeItem('ege_current_user');window.location.href='register.html'}
function backToCabinet(){
  document.getElementById('screen-exam').classList.remove('active');
  document.getElementById('screen-result').classList.remove('active');
  document.getElementById('cabinet-view').style.display='';
  document.querySelector('.footer').style.display='';
  document.querySelector('.gov-bar').style.display='';
  document.querySelector('.header').style.display='';
  loadCabinet();window.scrollTo(0,0);
}
function startExam(){
  // Проверка — одна попытка
  var pending = document.getElementById('cabinet-pending');
  if(pending && pending.style.display !== 'none'){ alert('У вас уже есть работа на проверке. Дождитесь результата.'); return; }
  var annulled = document.getElementById('cabinet-annulled');
  if(annulled && annulled.style.display !== 'none'){ alert('Ваш тест был аннулирован. Свяжитесь с администрацией.'); return; }
  document.getElementById('rules-overlay').style.display='flex';
  document.getElementById('rules-check').checked=false;
}
function closeRules(){ document.getElementById('rules-overlay').style.display='none'; }
function confirmRules(){
  if(!document.getElementById('rules-check').checked){ alert('Подтвердите ознакомление с правилами'); return; }
  document.getElementById('rules-overlay').style.display='none';
  document.getElementById('cabinet-view').style.display='none';
  document.querySelector('.footer').style.display='none';
  document.querySelector('.gov-bar').style.display='none';
  document.querySelector('.header').style.display='none';
  document.getElementById('screen-exam').classList.add('active');
  currentQ=0;answers=new Array(ALL.length).fill(null);examActive=true;timeLeft=25*60;
  document.getElementById('exam-nick').textContent=currentUser.name;
  buildGrid();renderQuestion();startTimer();enableAntiCheat();
  setTimeout(function(){document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen().catch(function(){})},300);
}
function buildGrid(){
  var g=document.getElementById('question-grid');g.innerHTML='';
  ALL.forEach(function(_,i){ var d=document.createElement('div');d.className='q-dot';d.textContent=i+1; d.onclick=function(){currentQ=i;renderQuestion()};d.id='dot-'+i;g.appendChild(d); });
}
function renderQuestion(){
  var q=ALL[currentQ],isC=q.type==='choice',total=ALL.length;
  document.getElementById('q-current').textContent=currentQ+1;
  document.getElementById('q-total').textContent=total;
  document.getElementById('progress').style.width=((currentQ+1)/total*100)+'%';
  document.getElementById('part1-question').style.display=isC?'':'none';
  document.getElementById('part2-question').style.display=isC?'none':'';
  var b=document.getElementById('exam-part-badge');
  b.textContent=currentQ<PART1.length?'I Часть (Выбор)':'II Часть (Письменно)';
  b.className='exam-part-badge '+(currentQ<PART1.length?'badge-choice':'badge-text');
  if(isC){
    document.getElementById('question-text').textContent=(currentQ+1)+'. '+q.q;
    var de=document.getElementById('exam-diff');de.textContent=q.d||''; if(!q.d) de.style.display='none'; else de.style.display='';
    de.className='exam-diff-tag '+(q.d==='Легкий'?'diff-easy':q.d==='Средний'?'diff-medium':'diff-hard');
    var o=document.getElementById('options');o.innerHTML='';
    (q.a||getQOpts(currentQ)).forEach(function(txt,idx){
      var dv=document.createElement('label');
      dv.className='option'+(answers[currentQ]===idx?' selected':'');
      dv.innerHTML='<input type="radio" name="q" '+(answers[currentQ]===idx?'checked':'')+'><span>'+String.fromCharCode(65+idx)+') '+txt+'</span>';
      dv.onclick=function(){answers[currentQ]=idx;renderQuestion();updateGrid()};
      o.appendChild(dv);
    });
  }else{
    document.getElementById('question-text-2').textContent=(currentQ+1)+'. '+q.q;
    var ta=document.getElementById('text-answer');ta.value=answers[currentQ]||'';
    ta.oninput=function(){answers[currentQ]=ta.value;updateGrid()};
  }
  document.getElementById('prev-btn').disabled=currentQ===0;
  var nb=document.getElementById('next-btn'),fb=document.getElementById('finish-btn');
  if(currentQ===total-1){nb.style.display='none';fb.style.display=''}else{nb.style.display='';fb.style.display='none'}
  updateGrid();
}
function getQOpts(i){
  var O=[
    ['CPD (Полиция)','NEWS / СМИ','Hospital (Медицина)','ФБР'],
    ['ФБР','CPD','Мэрия / Правительство','Суд'],
    ['ФБР','CPD','Национальная Гвардия','Hospital'],
    ['Да, сб и вс','Только вс','Нет — 7 дней без выходных','По графику'],
    ['Приказ Губернатора','Конституция South','ЕПК','УК'],
    ['ФБР','Национальная Гвардия / Федеральная Тюрьма','Мэрия','Hospital'],
    ['Hospital, NEWS, Суд','CPD, ФБР, Национальная Гвардия','Мэрия, CPD, Hospital','ФБР, Суд, NEWS'],
    ['ФБР','Hospital','CPD','NEWS'],
    ['CPD','Hospital','NEWS / СМИ','НГ'],
    ['NEWS','Hospital','CPD','ФБР'],
    ['CPD','ФБР','НГ','Мэрия'],
    ['НГ','ФБР','Hospital','Мэрия'],
    ['НГ','Hospital','NEWS/Мэрия/ФБР (премии)','Суд'],
    ['CPD/ФБР','Hospital/NEWS — услуги населению','Мэрия/Суд','НГ/Hospital'],
    ['3','Все 7','5','2'],
    ['NEWS','Национальная Гвардия','Hospital','Мэрия'],
    ['Национальная Гвардия','ФБР','CPD','Мэрия'],
    ['NEWS','Hospital','Мэрия / Губернатор','CPD'],
    ['NEWS','Hospital','Мэрия + ФБР','НГ'],
    ['CPD','Hospital','Суд + ФБР','NEWS'],
    ['ФБР','Суд — иск по ЕПК','Мэрия','NEWS'],
    ['CPD','ФБР — федеральная подследственность','Поровну','Мэрия'],
    ['Экстренный Протокол','Единый Процессуальный Кодекс','Единый План','Электронный Протокол'],
    ['Нет','Да — дискриминация наказуема','Только при свидетелях','Только ФБР'],
    ['Закрыт','Основан 2019. Штат, флаг, силовые, культура','Архив ФБР','Военная база']
  ];
  return O[i]||[];
}
function updateGrid(){ALL.forEach(function(_,i){var d=document.getElementById('dot-'+i);d.classList.remove('answered','current');if(answers[i]!==null&&answers[i]!=='')d.classList.add('answered');if(i===currentQ)d.classList.add('current')})}
document.getElementById('prev-btn').onclick=function(){if(currentQ>0){currentQ--;renderQuestion()}};
document.getElementById('next-btn').onclick=function(){if(currentQ<ALL.length-1){currentQ++;renderQuestion()}};
document.getElementById('finish-btn').onclick=finishExam;
function startTimer(){clearInterval(timerInterval);updateTimerDisplay();timerInterval=setInterval(function(){timeLeft--;updateTimerDisplay();if(timeLeft<=0){clearInterval(timerInterval);finishExam()}},1000)}
function updateTimerDisplay(){var m=String(Math.floor(timeLeft/60)).padStart(2,'0'),s=String(timeLeft%60).padStart(2,'0'),e=document.getElementById('timer');e.textContent=m+':'+s;if(timeLeft<300)e.classList.add('warn');else e.classList.remove('warn')}
async function finishExam(){
  if(!examActive)return;clearInterval(timerInterval);examActive=false;disableAntiCheat();
  if(document.fullscreenElement)document.exitFullscreen&&document.exitFullscreen().catch(function(){});
  var now=new Date().toLocaleString('ru-RU');
  try{ await supabasePost('results',{name:currentUser.name,game_nick:currentUser.login,age:currentUser.age,answers:JSON.stringify(answers),date:now,timestamp:Date.now(),admin_score:null,status:'pending'}); }catch(e){console.error(e)}
  document.getElementById('screen-exam').classList.remove('active');
  document.getElementById('screen-result').classList.add('active');window.scrollTo(0,0);
}
function enableAntiCheat(){document.addEventListener('visibilitychange',onVis);window.addEventListener('blur',onBlur);document.addEventListener('fullscreenchange',onFS)}
function disableAntiCheat(){document.removeEventListener('visibilitychange',onVis);window.removeEventListener('blur',onBlur);document.removeEventListener('fullscreenchange',onFS)}
function onVis(){if(!examActive)return;if(document.hidden)warn('Вы свернули вкладку!')}
function onBlur(){if(!examActive)return;setTimeout(function(){if(!document.hasFocus())warn('Потеря фокуса!')},500)}
function onFS(){if(!examActive)return;if(!document.fullscreenElement)warn('Вышли из полноэкранного!')}
function warn(msg){var e=document.getElementById('exam-warning');e.classList.remove('hidden');e.textContent=msg+' Покинув аудиторию работа аннулируется!';e.style.background='#fee2e2';e.style.color='#991b1b'}
