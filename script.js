
const translations = {
 en:{title:"R&E Multiservices | TV Mounting, Assembly & Cleaning"},
 es:{title:"R&E Multiservices | Montaje, ensamblaje y limpieza"}
};
function setLang(lang){
 document.documentElement.lang=lang;
 document.getElementById('btn-en')?.classList.toggle('active',lang==='en');
 document.getElementById('btn-es')?.classList.toggle('active',lang==='es');
 localStorage.setItem('rande-language',lang);
 document.title=translations[lang].title;
 const frame=document.getElementById('quote-frame');
 if(frame && frame.contentWindow) frame.contentWindow.postMessage({type:'set-language',lang},'*');
}
window.addEventListener('message',e=>{if(e.data?.type==='form-height'&&document.getElementById('quote-frame'))document.getElementById('quote-frame').style.height=e.data.height+'px'});
document.addEventListener('DOMContentLoaded',()=>{
 setLang(localStorage.getItem('rande-language')||'en');
 document.getElementById('year').textContent=new Date().getFullYear();
 const slides=[...document.querySelectorAll('.slide')],dots=[...document.querySelectorAll('.dot')];
 let current=0,timer;
 function show(n){slides[current]?.classList.remove('active');dots[current]?.classList.remove('active');current=(n+slides.length)%slides.length;slides[current]?.classList.add('active');dots[current]?.classList.add('active')}
 function play(){timer=setInterval(()=>show(current+1),3800)}
 dots.forEach((d,i)=>d.addEventListener('click',()=>{clearInterval(timer);show(i);play()}));
 let x=0;const slider=document.querySelector('.slider');
 slider?.addEventListener('touchstart',e=>x=e.changedTouches[0].screenX,{passive:true});
 slider?.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-x;if(Math.abs(dx)>45){clearInterval(timer);show(current+(dx<0?1:-1));play()}},{passive:true});
 play();
});
