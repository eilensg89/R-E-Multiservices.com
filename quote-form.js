
function qLang(lang){
 document.documentElement.lang=lang;
 document.querySelector('#q-en').classList.toggle('active',lang==='en');
 document.querySelector('#q-es').classList.toggle('active',lang==='es');
 localStorage.setItem('rande-language',lang);
}
window.addEventListener('message',e=>{if(e.data?.type==='set-language')qLang(e.data.lang)});
function sendHeight(){parent.postMessage({type:'form-height',height:document.documentElement.scrollHeight+10},'*')}
document.addEventListener('DOMContentLoaded',()=>{
 qLang(localStorage.getItem('rande-language')||new URLSearchParams(location.search).get('lang')||'en');
 const next=document.querySelector('input[name="_next"]');
 if(next && location.protocol.startsWith('http')) next.value=new URL('thank-you.html',location.href).href;
 const files=document.getElementById('photos'),status=document.getElementById('file-status');
 files.addEventListener('change',()=>{
  const max=5,maxBytes=10*1024*1024;
  let list=[...files.files];
  if(list.length>max){alert(document.documentElement.lang==='es'?'Puede subir un máximo de 5 fotos.':'You may upload up to 5 photos.');files.value='';list=[]}
  if(list.some(f=>f.size>maxBytes)){alert(document.documentElement.lang==='es'?'Cada foto debe pesar menos de 10 MB.':'Each photo must be under 10 MB.');files.value='';list=[]}
  status.textContent=list.length?(document.documentElement.lang==='es'?`${list.length} foto(s) seleccionada(s).`:`${list.length} photo(s) selected.`):'';
  sendHeight();
 });
 new ResizeObserver(sendHeight).observe(document.body);
 sendHeight();
});
