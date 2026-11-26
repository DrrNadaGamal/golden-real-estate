(function(){var d=document,t=d.getElementById('menu-toggle'),m=d.getElementById('nav-menu');
if(t&&m&&!d.querySelector('script[src="main.js"]'))t.addEventListener('click',function(){m.classList.toggle('active');t.classList.toggle('active')});
var f=d.getElementById('cf');if(f){var q=new URLSearchParams(location.search).get('property');
function se(k,s){var e=f.querySelector('.err[data-for='+k+']'),i=f.elements[k];if(e)e.textContent=s||'';if(i)i.setAttribute('aria-invalid',s?'true':'false')}
f.addEventListener('submit',function(e){e.preventDefault();var v=f.elements,ok=true;['name','phone','svc'].forEach(function(k){se(k,'')});
if(!v.name.value.trim()){se('name','هذا الحقل مطلوب');ok=false}
var ph=v.phone.value.replace(/[\s\-+()]/g,'').replace(/[٠-٩]/g,function(c){return c.charCodeAt(0)-1632});
if(!ph){se('phone','هذا الحقل مطلوب');ok=false}else if(!/^\d{8,15}$/.test(ph)){se('phone','أدخل رقم جوال صحيحاً');ok=false}
if(!v.svc.value){se('svc','هذا الحقل مطلوب');ok=false}
if(!ok){var x=f.querySelector('[aria-invalid=true]');if(x)x.focus();return}
var ref='GD-'+Math.random().toString(36).slice(2,7).toUpperCase();try{var a=JSON.parse(localStorage.getItem('golden-requests')||'[]');a.push({ref:ref,p:q,at:Date.now()});localStorage.setItem('golden-requests',JSON.stringify(a))}catch(_){}
d.getElementById('cref').textContent=ref;f.style.display='none';var o=d.getElementById('cok');o.classList.add('show');o.setAttribute('tabindex','-1');o.focus()})}})();
