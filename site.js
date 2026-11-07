document.addEventListener('DOMContentLoaded',()=>{const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav');if(!b||!n)return;b.addEventListener('click',()=>{const open=n.classList.toggle('open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'✕ Close':'☰ Menu'});});

/* Formspree AJAX form: stays on the current page and reports success/error */
document.addEventListener('DOMContentLoaded',()=>{
  const form=document.querySelector('[data-formspree=academic-contact-form]');
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

/* Beyond Research: fixed user-supplied ratings, genre filter, featured selection */
document.addEventListener('DOMContentLoaded',()=>{
 const root=document.querySelector('main #gallery-movies')?.closest('main');if(!root)return;
 for(const panel of root.querySelectorAll('#gallery-movies,#gallery-series')){
   const controls=panel.querySelector('.genre-filter');if(!controls)continue;
   const cards=[...panel.querySelectorAll('.media-card')];
   const genres=['All',...new Set(cards.flatMap(card=>(card.dataset.genres||'').split(',').filter(Boolean)))];
   const select=(name)=>{
     for(const card of cards)card.classList.toggle('genre-hidden',name!=='All'&&!card.dataset.genres.split(',').includes(name));
     for(const b of controls.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.genre===name));
   };
   for(const name of genres){const b=document.createElement('button');b.type='button';b.textContent=name;b.dataset.genre=name;b.addEventListener('click',()=>select(name));controls.appendChild(b)}
   select('All');
 }

});


/* Interactive research and publication tabs (one controller each). */
document.addEventListener('DOMContentLoaded',()=>{
 const descriptions={fusion:{eeg:'EEG records cortical activity related to movement; a CNN encoder extracts neural features.',semg:'Six-channel sEMG captures muscle activation and is processed by a modality-specific convolutional encoder.',self:'Self-attention highlights informative representations within each modality.',cross:'Cross-attention explicitly learns relationships between EEG and sEMG feature representations.',classify:'The fused representation is classified into four target hand and wrist gestures.'},fatigue:{input:'Six forearm sEMG channels are processed into 250 ms windows.',cnn:'CNN architectures learn local patterns in short sEMG segments.',gru:'GRU architectures model temporal dependencies and showed greater robustness in severe simulated degradation.',attention:'Self-attention was evaluated as an extension of CNN and GRU backbones, rather than a single sequential architecture.',test:'Models trained on clean signals were tested under simulated amplitude reduction and spectral tilt without retraining.'}};
 document.querySelectorAll('[data-architecture]').forEach(w=>{w.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>{w.querySelectorAll('[data-stage]').forEach(s=>s.setAttribute('aria-pressed',String(s===b)));w.querySelector('.architecture-description').textContent=descriptions[w.dataset.architecture][b.dataset.stage]}))});
 const pub={icee:{overview:'Investigates robustness of low-channel sEMG gesture recognition under simulated fatigue-related signal distortions.',methods:'Six forearm sEMG channels, eight healthy participants, four gestures and 250 ms windows. Compared classical classifiers, CNN, GRU, MHA+CNN and MHA+GRU, using synthetic amplitude attenuation and frequency-domain spectral tilt.',findings:'MHA+CNN achieved 98.23% accuracy on clean signals. MHA+GRU retained 65.19% at 80% simulated amplitude reduction (CNN: 29.21%) and 84.58% under strongest spectral tilt (CNN: 53.81%).',limitations:'Fatigue was simulated on non-fatigued recordings. The paper does not validate natural muscle fatigue, clinical deployment or cross-subject transfer.'},icbme:{overview:'Proposes EEG–sEMG multimodal fusion using cross-attention to preserve gesture recognition performance when muscle signals are degraded.',methods:'Synchronized 32-channel EEG and six-channel sEMG from eight healthy participants, with signal filtering, EEG ICA, parallel CNN encoders, self-attention and cross-attention.',findings:'Cross-attention achieved 92.45% accuracy on clean recordings; 78.05% at 80% simulated amplitude attenuation; and 75.46% at the strongest simulated frequency shift, outperforming evaluated baselines.',limitations:'The controlled sEMG perturbations do not reproduce all aspects of physiological muscle fatigue; clinical and naturally fatigued use were not established.'}};
 document.querySelectorAll('.publication-tabs').forEach(t=>{const card=t.closest('.pub'),key=card.id==='paper-icee'?'icee':'icbme',out=card.querySelector('.publication-tab-panel');function select(b){t.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',String(x===b)));out.textContent=pub[key][b.dataset.detail]}t.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>select(b)));select(t.querySelector('button'))});
});

/* Dual reading modes, cross-page searching and research interactions. */
(()=>{
const apply=mode=>{document.documentElement.dataset.theme=mode;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',mode==='light'?'#F2F3F4':'#111111');document.querySelectorAll('.theme-trigger').forEach(b=>{b.textContent=mode==='light'?'☾':'☼';b.title=mode==='light'?'Switch to Pure Monochrome':'Switch to Soft Silver';b.setAttribute('aria-label',b.title)})};
let saved='dark';try{saved=localStorage.getItem('aliasghar-reading-mode')||'dark'}catch(_){}apply(saved==='light'?'light':'dark');
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.theme-trigger').forEach(b=>b.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';apply(next);try{localStorage.setItem('aliasghar-reading-mode',next)}catch(_){}}));
 const search=document.querySelector('.site-search'),field=document.querySelector('#site-search-input'),results=document.querySelector('#site-search-results');
 const trigger=document.querySelector('.search-trigger');const close=()=>{if(search)search.hidden=true;trigger?.setAttribute('aria-expanded','false')};
 document.querySelector('.search-trigger')?.addEventListener('click',()=>{if(!search)return;search.hidden=!search.hidden;trigger?.setAttribute('aria-expanded',String(!search.hidden));if(!search.hidden)field?.focus()});
 document.querySelector('.search-dismiss')?.addEventListener('click',close);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(search){search.hidden=false;trigger?.setAttribute('aria-expanded','true');field?.focus()}}});
 let index=[];fetch('search-index.json').then(r=>r.ok?r.json():[]).then(data=>{index=data;renderSearch()}).catch(()=>{if(results)results.innerHTML='<p>Search index could not load. Open the website using a web server.</p>'});
 const renderSearch=()=>{if(!results||!field)return;const tokens=field.value.trim().toLowerCase().split(/\s+/).filter(Boolean);if(!tokens.length){results.innerHTML='<p>Search across research, publications, skills and other pages.</p>';return}const matches=index.map(v=>({...v,score:tokens.reduce((n,t)=>n+(v.title.toLowerCase().includes(t)?5:0)+(v.keywords.toLowerCase().includes(t)?1:0),0)})).filter(v=>tokens.every(t=>(v.title+' '+v.keywords).toLowerCase().includes(t))).sort((a,b)=>b.score-a.score).slice(0,8);results.replaceChildren();if(!matches.length){const p=document.createElement('p');p.textContent='No results. Try EEG, GRU, Python, or Publications.';results.append(p);return}for(const item of matches){const a=document.createElement('a');a.href=item.url;a.textContent=item.title+' →';results.append(a)}};
 field?.addEventListener('input',renderSearch);
 document.querySelector('.back-to-top')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
 document.querySelectorAll('.arch-steps').forEach(group=>group.querySelectorAll('.arch-step').forEach(button=>button.addEventListener('click',()=>{group.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===button));group.parentElement.querySelector('.arch-info').textContent=button.dataset.explanation})));
 document.querySelectorAll('.paper-tabs').forEach(tabs=>{let text=[];try{text=JSON.parse(tabs.dataset.descriptions)}catch(_){}const output=tabs.nextElementSibling;tabs.querySelectorAll('.paper-tab').forEach(btn=>btn.addEventListener('click',()=>{tabs.querySelectorAll('.paper-tab').forEach(b=>{const active=b===btn;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active))});if(output)output.textContent=text[Number(btn.dataset.part)]||''}))});
});
})();
