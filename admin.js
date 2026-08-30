// admin.js — логика admin.html
var PART1=[{"c": 0}, {"c": 2}, {"c": 2}, {"c": 1}, {"c": 0}, {"c": 2}, {"c": 1}, {"c": 0}, {"c": 0}, {"c": 1}, {"c": 1}, {"c": 3}, {"c": 1}, {"c": 3}, {"c": 0}, {"c": 0}, {"c": 0}, {"c": 1}, {"c": 0}, {"c": 0}, {"c": 0}, {"c": 2}, {"c": 0}, {"c": 1}, {"c": 1}];
var PART2_Q=["Что такое команда /me? Для чего она используется? Приведи 2 примера правильной отыгровки.", "Что такое команда /do? Чем отличается от /me? Приведи пример использования.", "Что такое /try и как работает система удачи? Когда нужно использовать /try?", "Что такое /todo? Как совместить речь и действие? Приведи пример.", "Приведи пример отыгровки мытья пола через команды /me и /do.", "Приведи пример отыгровки передачи/продажи предмета через /me. Как показать действие?", "Что такое NonRP поведение? Приведи 2 примера нарушений.", "Что такое PowerGaming (PG) и FearRP? Объясни на примерах, как их нарушают.", "Что такое MG (Metagaming) и DM? Почему они запрещены на RP сервере?", "Приведи пример отыгровки передачи документов через /me и /do."];
var O=[["Армия", "ЦПД", "Мэрия", "Больница"], ["Больница", "ЦПД", "Армия", "ФБИ"], ["ЦПД", "ФБИ", "Больница", "СМИ"], ["Армия", "ФБИ", "СМИ", "Мэрия"], ["ЦПД", "СМИ", "Армия", "Мэрия"], ["СМИ", "Больница", "ЦПД", "Мэрия"], ["СМИ", "Мэрия", "Больница", "ФБИ"], ["Мэрия — подать иск в суд", "ФБИ — написать жалобу", "Больница — снять побои", "Армия — обратиться к генералу"], ["ФБИ", "ЦПД", "Мэрия", "Суд"], ["Армия", "ФБИ", "Мэрия", "СМИ"], ["Больница", "ФБИ", "Университет", "СМИ"], ["Мэрия", "СМИ", "Университет", "Армия"], ["Армия", "СМИ", "Мэрия", "ФБИ"], ["Бар 'Укус Змеи'", "Мэрия", "Клуб 'TheCrips'", "Армия"], ["Мэрия", "ФБИ", "Армия", "Университет"], ["Про музей, флаг, историю штата и фракции", "Про капт терри", "Про поезд армейцев", "Про бар"], ["СМИ", "Университет", "Мэрия", "Больница"], ["Армия, СМИ, ЦПД", "Армия, ФБИ, ЦПД", "Мэрия, СМИ, ЦПД", "ЦПД, СМИ, Мэрия"], ["ФБИ", "Армия", "Больница", "СМИ"], ["Единый Процессуальный Кодекс — ЦПД, ФБИ", "Единый Правовой Кодекс — Мэрия", "Единый Полицейский Кодекс — Армия", "Ежедневный Приказ Командования — СМИ"], ["Да", "Нет", "Только если есть свидетели", "Только через ФБИ"], ["Да, суббота и воскресенье", "Да, только воскресенье", "Нет", "По графику"], ["Больница, Университет", "ЦПД, ФБИ", "Мэрия, Армия", "СМИ, ФБИ"], ["6", "7", "8", "12"], ["Федеральные Законы", "Конституция", "Паспорт", "Медкарта"]];
var currentAdmin=null;
(async function(){
  var s=localStorage.getItem('ege_admin_current');
  if(s){
    try{
      var a=JSON.parse(s);
      var r=await supabaseFind('admins','login',a.login);
      if(r&&r.length>0&&r[0].approved) showAdminPanel(r[0]);
    }catch(e){}
  }
})();
document.getElementById('admin-login-form').addEventListener('submit',async function(e){
  e.preventDefault();
  var btn=document.getElementById('admin-log-btn');
  btn.disabled=true;btn.textContent='Загрузка...';
  var l=document.getElementById('admin-log-login').value.trim();
  var p=document.getElementById('admin-log-pass').value;
  try{
    var r=await supabaseFind('admins','login',l);
  if(!r||r.length===0){ var r2=await supabaseFind('admins','login',l.toLowerCase()); if(r2&&r2.length>0) r=r2; }
  if(!r||r.length===0){ var r3=await supabaseFind('admins','login',l.charAt(0).toUpperCase()+l.slice(1).toLowerCase()); if(r3&&r3.length>0) r=r3; }
    if(!r||r.length===0){showMsg('Неверный логин','error');btn.disabled=false;btn.textContent='ВОЙТИ →';return}
    var a=r[0];
    if(a.pass!==p){showMsg('Неверный пароль','error');btn.disabled=false;btn.textContent='ВОЙТИ →';return}
    if(!a.approved){showMsg('Заявка ещё не одобрена','error');btn.disabled=false;btn.textContent='ВОЙТИ →';return}
    localStorage.setItem('ege_admin_current',JSON.stringify({login:a.login,name:a.name,role:a.role}));
    showAdminPanel(a);
  }catch(e){showMsg('Ошибка: '+e.message,'error');btn.disabled=false;btn.textContent='ВОЙТИ →'}
});
function showMsg(t,c){var e=document.getElementById('auth-msg');e.textContent=t;e.className='auth-msg '+c}
function showAdminPanel(admin){
  currentAdmin=admin;
  document.getElementById('admin-login-wrap').style.display='none';
  document.getElementById('admin-panel').style.display='';
  document.getElementById('admin-footer').style.display='';
  document.getElementById('adm-avatar').textContent=admin.name.charAt(0).toUpperCase();
  document.getElementById('adm-name').textContent=admin.name;
  document.getElementById('adm-login-sub').textContent=admin.login;
  var rn={root:'Глав. Администратор',decan:'Декан',teacher:'Преподаватель',admin:'Администратор',moderator:'Модератор'};
  document.getElementById('adm-role').textContent=rn[admin.role]||admin.role;
  document.getElementById('admin-bar-role').textContent='● '+ (rn[admin.role]||admin.role) + ' · ' + admin.login;
  if(admin.role!=='root') document.getElementById('nav-admins').style.display='none';
  loadResults();
}
function adminLogout(){localStorage.removeItem('ege_admin_current');location.reload()}
function showTab(t,el){
  document.querySelectorAll('.admin-tab').forEach(function(x){x.style.display='none'});
  document.getElementById('tab-'+t).style.display='';
  document.querySelectorAll('.admin-nav__link').forEach(function(x){x.classList.remove('active')});
  el.classList.add('active');
  if(t==='results') loadResults();
  if(t==='users') loadUsers();
  if(t==='admins') loadAdmins();
}
var allResults=[];
async function loadResults(){
  try{
    allResults=await supabaseGet('results','&order=timestamp.desc');
    updateStats();
    filterResults();
  }catch(e){console.error(e)}
}
function updateStats(){
  var total=allResults.length;
  var claimed=allResults.filter(function(r){return r.status==='claimed'}).length;
  var pending=allResults.filter(function(r){return r.status==='pending'||(!r.status&&r.admin_score==null)}).length;
  var done=allResults.filter(function(r){return r.status==='done'}).length;
  var annulled=allResults.filter(function(r){return r.status==='annulled'}).length;
  document.getElementById('stat-total').textContent=total;
  document.getElementById('stat-pending').textContent=pending;
  var claimedEl=document.getElementById('stat-claimed'); if(claimedEl) claimedEl.textContent=claimed;
  document.getElementById('stat-done').textContent=done;
  document.getElementById('stat-annulled').textContent=annulled;
}
function filterResults(){
  var q=document.getElementById('search-results').value.toLowerCase();
  var sort=document.getElementById('sort-results').value;
  var f=allResults.filter(function(r){return!q||r.name.toLowerCase().indexOf(q)>=0||r.game_nick.toLowerCase().indexOf(q)>=0});
  if(sort==='oldest') f.reverse();
  else if(sort==='pending') f=f.sort(function(a,b){ var ap=a.status==='pending'?0:1, bp=b.status==='pending'?0:1; return ap-bp; });
  else if(sort==='score-desc') f.sort(function(a,b){return(b.admin_score||0)-(a.admin_score||0)});
  else if(sort==='score-asc') f.sort(function(a,b){return(a.admin_score===null?999:a.admin_score)-(b.admin_score===null?999:b.admin_score)});
  renderResults(f);
}
function renderResults(list){
  var el=document.getElementById('results-list');
  if(!list.length){el.innerHTML='<div class="admin-empty">Нет результатов — пока никто не сдал работу</div>';return}
  el.innerHTML=list.map(function(r){
    var sc=r.admin_score;
    if(r.claimed_by && r.status==='pending') r.status='claimed';
    if(r.status==='claimed') return'<div class="admin-result-card status-pending" onclick="openDetail(\''+r.id+'\')"><div class="admin-result-card__left"><div class="admin-result-card__avatar">'+r.name.charAt(0)+'</div><div><b>'+r.name+'</b><p>'+r.game_nick+' · '+r.age+' лет</p><div class="admin-result-card__meta">'+(r.date||'—')+' · 🔒 '+r.claimed_by+'</div></div></div><div class="admin-result-card__right"><span class="admin-badge pending">🔒 '+r.claimed_by+'</span><span style="font-size:10px;color:var(--muted)">Открыть →</span></div></div>';
    if(r.status==='annulled') return'<div class="admin-result-card status-annulled" onclick="openDetail(\''+r.id+'\')"><div class="admin-result-card__left"><div class="admin-result-card__avatar">'+r.name.charAt(0)+'</div><div><b>'+r.name+'</b><p>'+r.game_nick+' · '+r.age+' лет</p><div class="admin-result-card__meta">'+(r.date||'—')+'</div></div></div><div class="admin-result-card__right"><span class="admin-badge annulled">🚫 Аннулировано</span><span style="font-size:10px;color:var(--muted)">Открыть →</span></div></div>';
    if(r.status==='done') return'<div class="admin-result-card status-done" onclick="openDetail(\''+r.id+'\')"><div class="admin-result-card__left"><div class="admin-result-card__avatar">'+r.name.charAt(0)+'</div><div><b>'+r.name+'</b><p>'+r.game_nick+' · '+r.age+' лет</p><div class="admin-result-card__meta">'+(r.date||'—')+'</div></div></div><div class="admin-result-card__right"><span class="admin-badge '+(sc>=14?'done':'fail')+'">'+(sc>=14?'✅ ':'❌ ')+sc+' / 35</span><span style="font-size:10px;color:var(--muted)">Открыть →</span></div></div>';
    return'<div class="admin-result-card status-pending" onclick="openDetail(\''+r.id+'\')"><div class="admin-result-card__left"><div class="admin-result-card__avatar">'+r.name.charAt(0)+'</div><div><b>'+r.name+'</b><p>'+r.game_nick+' · '+r.age+' лет</p><div class="admin-result-card__meta">'+(r.date||'—')+'</div></div></div><div class="admin-result-card__right"><span class="admin-badge pending">⏳ На проверке</span><span style="font-size:10px;color:var(--muted)">Открыть →</span></div></div>';
  }).join('');
}
var currentDetailId=null;
function openDetail(id){
  currentDetailId=id;
  var r=allResults.find(function(x){return x.id==id});
  if(!r) return;
  document.getElementById('detail-avatar').textContent=r.name.charAt(0);
  document.getElementById('detail-name').textContent=r.name;
  document.getElementById('detail-nick').textContent=r.game_nick+' · '+r.age+' лет';
  document.getElementById('detail-meta').textContent=(r.date||'—')+' · ID '+r.id;
  var ans; try{ans=JSON.parse(r.answers||'[]')}catch(e){ans=[]}
  var p1=ans.slice(0,PART1.length);
  var ok=0, h='';
  p1.forEach(function(a,i){ var good=a===PART1[i].c; if(good) ok++; var choice = a!=null ? String.fromCharCode(65+a) : '—'; var correct = String.fromCharCode(65+PART1[i].c); h+='<div class="detail-dot '+(good?'correct':'wrong')+'" title="В'+(i+1)+': выбрано '+choice+', верно '+correct+'">'+(i+1)+'</div>'; });
  document.getElementById('detail-part1').innerHTML=h;
  document.getElementById('detail-auto-score').textContent=ok;
  document.getElementById('detail-auto-hint').textContent = ok>=14 ? 'порог пройден' : 'ниже порога';
  var p2=ans.slice(PART1.length);
  document.getElementById('detail-part2').innerHTML=p2.map(function(a,i){
    var has = a && String(a).trim();
    return'<div style="margin-bottom:10px;padding:12px;background:#f8fafc;border:1px solid var(--border);border-radius:8px"><b style="font-size:12px;color:var(--navy)">Вопрос '+(PART1.length+i+1)+': '+PART2_Q[i]+'</b><div style="margin-top:6px;padding:8px;background:#fff;border:1px solid var(--border);border-radius:6px;font-size:13px;color:#1a2340;white-space:pre-wrap">'+(has?a:'<i style="color:var(--muted)">Нет ответа</i>')+'</div></div>';
  }).join('');
  document.getElementById('detail-score-input').value = r.admin_score!=null?r.admin_score:'';
  // Блокировка — кто принял
  var isRoot = currentAdmin && currentAdmin.role==='root';
  var isClaimed = !!r.claimed_by;
  var isMine = isClaimed && r.claimed_by===currentAdmin.login;
  var claimInfo = document.getElementById('claim-info');
  var claimBtn = document.getElementById('claim-btn');
  var saveBtn = document.getElementById('save-btn');
  if(claimInfo){
    if(!isClaimed){
      claimInfo.innerHTML='<span style="color:var(--muted)">Никто не принял — нажмите «Принять» чтобы закрепить за собой</span>';
      if(claimBtn) claimBtn.style.display='';
      if(saveBtn) saveBtn.disabled=true;
    } else if(isMine || isRoot){
      claimInfo.innerHTML='🔒 Принято: <b>'+r.claimed_by+'</b> '+(r.claimed_at||'')+(isRoot && !isMine ? ' <span style="color:var(--usared)">(root — доступ есть)</span>' : '');
      if(claimBtn) claimBtn.style.display='none';
      if(saveBtn) saveBtn.disabled=false;
    } else {
      claimInfo.innerHTML='🔒 Занято: <b>'+r.claimed_by+'</b> '+(r.claimed_at||'')+' — другой проверяющий уже работает';
      if(claimBtn) claimBtn.style.display='none';
      if(saveBtn) saveBtn.disabled=true;
    }
  }
  document.getElementById('result-detail-overlay').style.display='flex';
}
function closeDetail(e){ if(!e || e.target===document.getElementById('result-detail-overlay')){ document.getElementById('result-detail-overlay').style.display='none'; var ac=document.getElementById('annul-confirm'); if(ac) ac.style.display='none'; var dc=document.getElementById('delete-confirm'); if(dc) dc.style.display='none'; } }
async function claimResult(){
  if(!currentDetailId) return;
  try{
    await supabasePatch('results',currentDetailId,{claimed_by:currentAdmin.login,claimed_at:new Date().toLocaleString('ru-RU'),status:'claimed'});
    var r=allResults.find(function(x){return x.id==currentDetailId});
    if(r){ r.claimed_by=currentAdmin.login; r.claimed_at=new Date().toLocaleString('ru-RU'); r.status='claimed'; }
    filterResults(); updateStats(); openDetail(currentDetailId); showToast('Принято в проверку');
  }catch(e){ showToast('Ошибка: '+e.message, true); }
}
async function saveScore(){
  if(!currentDetailId) return;
  var sc=parseInt(document.getElementById('detail-score-input').value);
  if(isNaN(sc)||sc<0||sc>35){ showToast('Балл от 0 до 35', true); return; }
  try{
    await supabasePatch('results',currentDetailId,{admin_score:sc,status:'done'});
    var r=allResults.find(function(x){return x.id==currentDetailId});
    if(r){ r.admin_score=sc; r.status='done'; }
    closeDetail(); filterResults(); updateStats(); showToast('Сохранено: '+sc+' / 35');
  }catch(e){ showToast('Ошибка: '+e.message, true); }
}
function showAnnulConfirm(){ document.getElementById('annul-confirm').style.display=''; document.getElementById('delete-confirm').style.display='none'; }
function cancelAnnul(){ document.getElementById('annul-confirm').style.display='none'; }
async function confirmAnnul(){
  if(!currentDetailId) return;
  try{
    await supabasePatch('results',currentDetailId,{admin_score:null,status:'annulled',claimed_by:null,claimed_at:null});
    var r=allResults.find(function(x){return x.id==currentDetailId});
    if(r){ r.admin_score=null; r.status='annulled'; r.claimed_by=null; }
    closeDetail(); filterResults(); updateStats(); showToast('Аннулировано');
  }catch(e){ showToast('Ошибка: '+e.message, true); }
}
function showDeleteConfirm(){ document.getElementById('delete-confirm').style.display=''; document.getElementById('annul-confirm').style.display='none'; }
function cancelDelete(){ document.getElementById('delete-confirm').style.display='none'; }
async function confirmDelete(){
  if(!currentDetailId) return;
  try{
    await supabaseDelete('results',currentDetailId);
    allResults=allResults.filter(function(x){return x.id!=currentDetailId});
    closeDetail(); filterResults(); updateStats(); showToast('Удалено');
  }catch(e){ showToast('Ошибка: '+e.message, true); }
}
function showToast(msg, isError){
  var t=document.getElementById('admin-toast');
  t.textContent=msg; t.style.background=isError?'var(--red)':'var(--navy)'; t.style.display='block';
  setTimeout(function(){ t.style.display='none'; }, 2000);
}
async function loadUsers(){
  var el=document.getElementById('users-list');
  try{
    var users=await supabaseGet('users','&order=created_at.desc');
    document.getElementById('users-count').textContent = users ? users.length + ' чел.' : '';
    if(!users||!users.length){el.innerHTML='<div class="admin-empty">Нет участников</div>';return}
    el.innerHTML=users.map(function(u){ return'<div class="admin-user-card"><div class="admin-user-card__avatar">'+u.name.charAt(0)+'</div><div><b>'+u.name+'</b><p>'+u.login+' · '+u.age+' лет · '+(u.created_at||'—')+'</p></div></div>'; }).join('');
  }catch(e){el.innerHTML='<div class="admin-empty">Ошибка загрузки</div>'}
}
async function loadAdmins(){
  var el=document.getElementById('admin-list');
  var req=document.getElementById('admin-requests');
  try{
    var admins=await supabaseGet('admins','&order=created_at.desc');
    if(!admins || !Array.isArray(admins)) admins=[];
    var pending=admins.filter(function(a){return!a.approved});
    var approved=admins.filter(function(a){return a.approved});
    var rn={root:'Глав. Админ',decan:'Декан',teacher:'Преподаватель',admin:'Администратор',moderator:'Модератор'};
    if(pending.length){
      req.innerHTML='<h4 style="font-size:13px;color:var(--navy);margin-bottom:8px">⏳ Заявки на одобрение — '+pending.length+'</h4>'+
        pending.map(function(a){ return'<div class="admin-request-card"><div><b>'+a.name+'</b><p>'+a.login+' · '+(rn[a.role]||a.role)+' · '+a.created_at+'</p></div><div style="display:flex;gap:6px;flex-shrink:0"><button class="btn-approve" onclick="approveAdmin(\''+a.id+'\')">✅ Одобрить</button><button class="btn-reject" onclick="rejectAdmin(\''+a.id+'\')">❌ Отклонить</button></div></div>'; }).join('');
    } else { req.innerHTML='<div class="admin-empty" style="padding:14px">Нет заявок на одобрение</div>'; }
    el.innerHTML='<h4 style="font-size:13px;color:var(--navy);margin-bottom:8px">👥 Одобренные — '+approved.length+'</h4>'+
      approved.map(function(a){
        var isRoot = a.role==='root'; var isSelf = currentAdmin && a.login===currentAdmin.login;
        return'<div class="admin-admin-card'+(isRoot?' root':'')+'"><div><b>'+a.name+(isSelf?' <span style="color:var(--green)">(вы)</span>':'')+'</b><p>'+a.login+' · '+(rn[a.role]||a.role)+' · '+a.created_at+'</p></div><div style="display:flex;align-items:center;gap:8px"><span class="admin-role-badge '+(a.role==='root'?'role-root':a.role==='decan'?'role-decan':a.role==='teacher'?'role-teacher':'')+'">'+(rn[a.role]||a.role)+'</span>'+(!isSelf && currentAdmin && currentAdmin.role==='root' ? '<button class="btn-delete" style="padding:6px 10px;font-size:11px" onclick="removeAdmin(\''+a.id+'\')">Удалить</button>' : '')+'</div></div>';
      }).join('');
  }catch(e){el.innerHTML='<div class="admin-empty">Ошибка загрузки</div>'}
}
async function approveAdmin(id){ try{await supabasePatch('admins',id,{approved:true}); loadAdmins();}catch(e){alert(e.message)} }
async function rejectAdmin(id){ try{await supabaseDelete('admins',id); loadAdmins();}catch(e){alert(e.message)} }
async function removeAdmin(id){ if(!confirm('Удалить администратора?')) return; try{await supabaseDelete('admins',id); loadAdmins();}catch(e){alert(e.message)} }
