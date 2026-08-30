// admin-register.js — логика admin-register.html
document.getElementById('admin-reg-form').addEventListener('submit',async function(e){
  e.preventDefault();
  var btn=document.getElementById('reg-btn');
  btn.disabled=true;btn.textContent='Загрузка...';
  var l=document.getElementById('reg-login').value.trim();
  var n=document.getElementById('reg-name').value.trim();
  var r=document.getElementById('reg-role').value;
  var p=document.getElementById('reg-pass').value;
  var p2=document.getElementById('reg-pass2').value;
  if(!l||!n||!p){showMsg('Заполните все поля','error');btn.disabled=false;btn.textContent='ПОДАТЬ ЗАЯВКУ →';return}
  if(l.length<3){showMsg('Логин минимум 3 символа','error');btn.disabled=false;btn.textContent='ПОДАТЬ ЗАЯВКУ →';return}
  if(p.length<4){showMsg('Пароль минимум 4 символа','error');btn.disabled=false;btn.textContent='ПОДАТЬ ЗАЯВКУ →';return}
  if(p!==p2){showMsg('Пароли не совпадают','error');btn.disabled=false;btn.textContent='ПОДАТЬ ЗАЯВКУ →';return}
  try{
    var exists=await supabaseFind('admins','login',l);
    if(exists&&exists.length>0){showMsg('Такой логин уже существует','error');btn.disabled=false;btn.textContent='ПОДАТЬ ЗАЯВКУ →';return}
    var now=new Date().toLocaleString('ru-RU');
    var result=await supabasePost('admins',{login:l,name:n,role:r,pass:p,approved:false,created_at:now});
    var saved=Array.isArray(result)?result[0]:result;
    if(saved&&saved.id){ showMsg('✅ Заявка подана! Ожидайте одобрения главного администратора.','ok'); document.getElementById('admin-reg-form').reset(); }
    else showMsg('Ошибка подачи заявки','error');
  }catch(e){ showMsg('Ошибка: '+e.message,'error'); }
  btn.disabled=false;btn.textContent='ПОДАТЬ ЗАЯВКУ →';
});
function showMsg(t,c){var e=document.getElementById('reg-msg');e.textContent=t;e.className='auth-msg '+c}
