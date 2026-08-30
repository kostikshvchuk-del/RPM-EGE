// register.js — логика register.html
function switchTab(t){
  document.querySelectorAll('.auth-tab').forEach(function(e){e.classList.remove('active')});
  document.querySelectorAll('.auth-panel').forEach(function(e){e.classList.remove('active')});
  document.getElementById('tab-'+t).classList.add('active');
  document.getElementById('panel-'+t).classList.add('active');
}
(async function(){
  var saved = localStorage.getItem('ege_current_user');
  if(saved){
    try{
      var u = JSON.parse(saved);
      var r = await supabaseFind('users','login',u.login);
      if(r && r.length > 0 && r[0].login === u.login) window.location.href = 'cabinet.html';
    }catch(e){}
  }
})();
document.getElementById('register-form').addEventListener('submit', async function(e){
  e.preventDefault();
  var btn = document.getElementById('reg-btn');
  btn.disabled = true; btn.textContent = 'Загрузка...';
  var login = document.getElementById('reg-login').value.trim();
  var name = document.getElementById('reg-name').value.trim();
  var age = parseInt(document.getElementById('reg-age').value);
  var pass = document.getElementById('reg-pass').value;
  var pass2 = document.getElementById('reg-pass2').value;
  if(!login || !name || !age || !pass){ showMsg('Заполните все поля','error'); btn.disabled=false; btn.textContent='ЗАРЕГИСТРИРОВАТЬСЯ →'; return; }
  if(login.length < 3){ showMsg('Логин минимум 3 символа','error'); btn.disabled=false; btn.textContent='ЗАРЕГИСТРИРОВАТЬСЯ →'; return; }
  if(age < 4){ showMsg('Минимальный возраст — 4 года','error'); btn.disabled=false; btn.textContent='ЗАРЕГИСТРИРОВАТЬСЯ →'; return; }
  if(pass.length < 4){ showMsg('Пароль минимум 4 символа','error'); btn.disabled=false; btn.textContent='ЗАРЕГИСТРИРОВАТЬСЯ →'; return; }
  if(pass !== pass2){ showMsg('Пароли не совпадают','error'); btn.disabled=false; btn.textContent='ЗАРЕГИСТРИРОВАТЬСЯ →'; return; }
  try{
    var exists = await supabaseFind('users','login',login);
    if(exists && exists.length > 0){ showMsg('Такой логин уже существует','error'); btn.disabled=false; btn.textContent='ЗАРЕГИСТРИРОВАТЬСЯ →'; return; }
    var now = new Date().toLocaleString('ru-RU');
    var result = await supabasePost('users',{login:login,name:name,age:age,pass:pass,created_at:now});
    var saved = Array.isArray(result) ? result[0] : result;
    if(saved && saved.id){
      localStorage.setItem('ege_current_user', JSON.stringify({id:saved.id,login:login,name:name,age:age}));
      showMsg('Регистрация успешна! Перенаправление...','ok');
      setTimeout(function(){ window.location.href = 'cabinet.html'; }, 1000);
    } else { showMsg('Ошибка регистрации','error'); btn.disabled=false; btn.textContent='ЗАРЕГИСТРИРОВАТЬСЯ →'; }
  }catch(e){ showMsg('Ошибка: '+e.message,'error'); btn.disabled=false; btn.textContent='ЗАРЕГИСТРИРОВАТЬСЯ →'; }
});
document.getElementById('login-form').addEventListener('submit', async function(e){
  e.preventDefault();
  var btn = document.getElementById('log-btn');
  btn.disabled = true; btn.textContent = 'Загрузка...';
  var login = document.getElementById('log-login').value.trim();
  var pass = document.getElementById('log-pass').value;
  try{
    var r = await supabaseFind('users','login',login);
    if(!r || r.length === 0){ showMsg('Неверный логин или пароль','error'); btn.disabled=false; btn.textContent='ВОЙТИ →'; return; }
    var user = r[0];
    if(user.pass !== pass){ showMsg('Неверный логин или пароль','error'); btn.disabled=false; btn.textContent='ВОЙТИ →'; return; }
    localStorage.setItem('ege_current_user', JSON.stringify({id:user.id,login:user.login,name:user.name,age:user.age}));
    showMsg('Вход выполнен! Перенаправление...','ok');
    setTimeout(function(){ window.location.href = 'cabinet.html'; }, 1000);
  }catch(e){ showMsg('Ошибка: '+e.message,'error'); btn.disabled=false; btn.textContent='ВОЙТИ →'; }
});
function showMsg(t,c){ var e=document.getElementById('auth-msg'); e.textContent=t; e.className='auth-msg '+c; }
