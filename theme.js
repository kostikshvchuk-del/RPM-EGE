// theme.js — тёмная/светлая тема
(function(){
  var saved = localStorage.getItem('theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);
  window.toggleTheme = function(){
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    if(next==='light') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon();
  };
  function updateIcon(){
    var btn = document.getElementById('theme-btn');
    if(btn) btn.textContent = document.documentElement.getAttribute('data-theme')==='dark' ? '☀️' : '🌙';
  }
  document.addEventListener('DOMContentLoaded', updateIcon);
})();
