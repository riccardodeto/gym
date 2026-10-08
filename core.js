(function(root){
const sum=a=>a.reduce((x,y)=>x+y,0);
const setsDone=e=>(e.sets||[]).filter(s=>s.done);
const volume=e=>sum(setsDone(e).map(s=>Number(s.kg||0)*Number(s.reps||0)*(e.loadLabel==='kg/manubrio'?2:1)));
const exerciseKey=e=>e.key||e.exerciseId||e.id;
const dayOf=h=>{if(/^\d{4}-\d{2}-\d{2}$/.test(h.sessionDate||''))return h.sessionDate;const d=new Date(h.startedAt||h.endedAt||Date.now());return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const localDay=ymd=>{const [y,m,d]=(ymd||'').split('-').map(Number);return new Date(y,m-1,d,12);};
function lastExercise(history,key){
 for(const h of history.filter(h=>h.endedAt).slice().sort((a,b)=>dayOf(b).localeCompare(dayOf(a))||(b.endedAt||'').localeCompare(a.endedAt||''))){const e=(h.entries||[]).find(x=>exerciseKey(x)===key && (x.kind==='strength'?setsDone(x).length>0:x.done));if(e)return e;}
 return null;
}
function recommendation(ex,history){
 if(ex.kind!=='strength')return {type:'none',text:''};
 const prev=lastExercise(history,exerciseKey(ex));
 if(!prev)return {type:'first',text:'Prima volta: scegli un carico che permetta di eseguire le ripetizioni previste con tecnica pulita.'};
 const all=prev.sets||[];
 const valid=all.length===ex.sets.length&&all.every((s,i)=>s.done&&Number(s.kg)>0&&Number(s.reps)>=Number(ex.sets[i].min));
 if(!valid){return {type:'hold',text:'Ultima seduta parziale o sotto il minimo: consolida tecnica e ripetizioni prima di aumentare il carico.'};}
 const reached=all.every((s,i)=>Number(s.reps)>=Number(ex.sets[i].max));
 const step=Math.max(.5,Number(ex.step)||2.5);
 if(reached)return {type:'increase',step,text:`Hai raggiunto il limite alto in tutte le serie. Nella prossima seduta puoi provare +${fmt(step)} ${ex.loadLabel||'kg'} rispetto ai carichi precedenti, se la tecnica resta corretta.`};
 return {type:'hold',text:'Mantieni indicativamente il carico precedente e prova ad avvicinarti al limite alto delle ripetizioni in ogni serie.'};
}
function fmt(n){return Number(n||0).toLocaleString('it-IT',{maximumFractionDigits:2});}
function stats(history){
 const done=history.filter(h=>h.endedAt);
 const strength=done.flatMap(h=>h.entries||[]).filter(e=>e.kind==='strength');
 return {sessions:done.length,sets:sum(strength.map(e=>setsDone(e).length)),volume:sum(strength.map(volume)),exerciseCount:done.reduce((n,h)=>n+(h.entries||[]).filter(e=>e.kind!=='strength'?e.done:setsDone(e).length>0).length,0)};
}
function series(history,key){
 return history.filter(h=>h.endedAt).slice().sort((a,b)=>dayOf(a).localeCompare(dayOf(b))||(a.endedAt||'').localeCompare(b.endedAt||'')).map(h=>({date:dayOf(h)+'T12:00:00',entry:(h.entries||[]).find(e=>exerciseKey(e)===key)})).filter(x=>x.entry&& (x.entry.kind!=='strength'?x.entry.done:setsDone(x.entry).length>0)).map(({date,entry})=>({date,weight:Math.max(0,...setsDone(entry).map(s=>Number(s.kg)||0)),volume:volume(entry),reps:sum(setsDone(entry).map(s=>Number(s.reps)||0)),sets:setsDone(entry).length,entry}));
}
function weekData(history,count=6){
 const now=new Date();const monday=new Date(now.getFullYear(),now.getMonth(),now.getDate());monday.setDate(monday.getDate() - (monday.getDay()+6)%7);
 const weeks=Array.from({length:count},(_,i)=>{const d=new Date(monday);d.setDate(monday.getDate()-7*(count-1-i));return {start:d,label:d.toLocaleDateString('it-IT',{day:'numeric',month:'short'}),sessions:0,volume:0};});
 history.filter(h=>h.endedAt).forEach(h=>{const day=localDay(dayOf(h));const idx=Math.floor((new Date(day.getFullYear(),day.getMonth(),day.getDate())-weeks[0].start)/86400000/7);if(idx>=0&&idx<weeks.length){weeks[idx].sessions++;weeks[idx].volume+=sum((h.entries||[]).map(volume));}});
 return weeks;
}
const api={setsDone,volume,exerciseKey,lastExercise,recommendation,fmt,stats,series,weekData};
root.ForgeCore=api;
if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
