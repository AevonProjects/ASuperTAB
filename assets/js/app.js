const sidebar=document.querySelector('.sidebar');
const menu=document.querySelector('#menuBtn');
if(menu)menu.addEventListener('click',()=>sidebar.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>sidebar.classList.remove('open')));

document.querySelectorAll('pre').forEach(pre=>{
  const b=document.createElement('button'); b.className='copy-btn'; b.textContent='Copy';
  b.addEventListener('click',async()=>{await navigator.clipboard.writeText(pre.innerText.replace(/^Copy\n?/,'')); b.textContent='Copied'; setTimeout(()=>b.textContent='Copy',1200)});
  pre.appendChild(b);
});

const input=document.querySelector('#docSearch');
const sections=[...document.querySelectorAll('.section')];
const noResults=document.querySelector('.no-results');
input?.addEventListener('input',()=>{
  const q=input.value.trim().toLowerCase(); let hits=0;
  sections.forEach(s=>{const ok=!q||s.innerText.toLowerCase().includes(q); s.style.display=ok?'':'none'; if(ok)hits++});
  noResults.style.display=hits?'none':'block';
});

const links=[...document.querySelectorAll('.nav a')];
const observer=new IntersectionObserver(entries=>{
  entries.filter(e=>e.isIntersecting).forEach(e=>{links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))});
},{rootMargin:'-20% 0px -70% 0px'});
sections.forEach(s=>observer.observe(s));
