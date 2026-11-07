document.addEventListener('DOMContentLoaded',()=>{const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav');if(!b||!n)return;b.addEventListener('click',()=>{const open=n.classList.toggle('open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'✕ Close':'☰ Menu'});});

/* Formspree AJAX form: stays on the current page and reports success/error */
document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('academic-contact-form');
  if(!form)return;
  const status=document.getElementById('contact-form-status');
  const submit=document.getElementById('contact-send');
  form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    status.hidden=true;
    status.textContent='';
    status.className='form-status';
    if(form.elements['_gotcha']?.value){return;}
    submit.disabled=true;
    submit.textContent='Sending…';
    try{
      const response=await fetch(form.action,{
        method:'POST',
        body:new FormData(form),
        headers:{'Accept':'application/json'}
      });
      let payload={};
      try{payload=await response.json();}catch(_error){}
      if(response.ok){
        form.reset();
        status.className='form-status success';
        status.textContent='Your message has been sent. Thank you for getting in touch.';
      }else{
        let message='Your message could not be sent. Please try again or email me directly.';
        if(Array.isArray(payload.errors) && payload.errors.length){
          message=payload.errors.map(e=>e.message).filter(Boolean).join(' ') || message;
        }
        status.className='form-status error';
        status.textContent=message;
      }
    }catch(_error){
      status.className='form-status error';
      status.textContent='The form could not connect to the email service. Check your connection or email me directly.';
    }finally{
      status.hidden=false;
      submit.disabled=false;
      submit.textContent='Send Message';
    }
  });
});


/* Lightweight reading progress, no external library */
document.addEventListener('DOMContentLoaded',()=>{
  const bar=document.querySelector('.reading-progress');if(!bar)return;
  const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%'};
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
});


/* Accessible pill tabs for Beyond Research gallery */
document.addEventListener('DOMContentLoaded',()=>{
 const group=document.querySelector('.gallery-tabs[role="tablist"]');if(!group)return;
 const tabs=[...group.querySelectorAll('[role="tab"]')];
 function select(tab,focus=false){
   for(const t of tabs){const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.classList.toggle('selected',selected);t.tabIndex=selected?0:-1;
     const panel=document.getElementById(t.getAttribute('aria-controls'));if(panel)panel.hidden=!selected;
   }
   if(focus)tab.focus();
 }
 tabs.forEach((t,i)=>{t.addEventListener('click',()=>select(t));t.addEventListener('keydown',event=>{
   if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
   event.preventDefault();let target=i;
   if(event.key==='ArrowRight')target=(i+1)%tabs.length;
   if(event.key==='ArrowLeft')target=(i+tabs.length-1)%tabs.length;
   if(event.key==='Home')target=0;
   if(event.key==='End')target=tabs.length-1;
   select(tabs[target],true);
 });});
 select(tabs[0]);
});

/* Accessible More menu for compact navigation */
document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.querySelector('.more-trigger'), menu=document.querySelector('.more-dropdown');
 if(!btn||!menu)return;
 function close(){menu.classList.remove('open');btn.setAttribute('aria-expanded','false')}
 btn.addEventListener('click',()=>{let open=!menu.classList.contains('open');menu.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open))});
 document.addEventListener('click',e=>{if(!btn.parentElement.contains(e.target))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
});
