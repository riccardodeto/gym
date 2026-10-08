/* Catalogo trascritto dalle due fotografie della scheda; descrizioni operative integrative. */
(function(root){
const ex=(key,name,group,image,sets,rest,description,step=2.5,kind='strength',minutes=0,loadLabel='kg')=>({key,name,group,image:image?'./assets/exercises/'+image+'.webp':'',sets,rest,description,step,kind,minutes,loadLabel});
const range=(n,min,max)=>Array.from({length:n},()=>({min,max}));
const catalog={
 treadmill:ex('treadmill','Corsa su tappeto','Cardio','treadmill',[],0,'Riscaldamento sul tapis roulant. Parti gradualmente e mantieni un passo controllato.',0,'time',8),
 sphinx:ex('sphinx','Stretching — Sfinge','Mobilità','sphinx',[],0,'Distenditi prono e solleva dolcemente il busto con gli avambracci, senza forzare la zona lombare.',0,'activity'),
 'chest-machine':ex('chest-machine','Distensioni High Chest','Pettorali','chest-machine',[{min:6,max:8},{min:8,max:10}],120,'Distensioni sulla macchina High Chest a carico libero. Regola la seduta e mantieni il movimento controllato.',2.5),
 pulldown:ex('pulldown','Pull Down Machine','Dorsali','pulldown',range(3,8,10),120,'Tira le impugnature verso il busto mantenendo il tronco stabile, poi ritorna lentamente.',2.5),
 'leg-press':ex('leg-press','Pressa a 45°','Quadricipiti','leg-press',range(2,6,8),120,'Spingi la pedana con controllo, mantenendo la schiena appoggiata e un’escursione confortevole.',5),
 'shoulder-press':ex('shoulder-press','Lento seduto con 2 manubri','Spalle','shoulder-press',range(3,6,8),120,'Spinte sopra la testa da seduto. Panca inclinata a circa 70°, come nella scheda.',2.5,'strength',0,'kg/manubrio'),
 'triceps-cable':ex('triceps-cable','Estensioni al cavo alto','Tricipiti','triceps-cable',range(3,8,10),120,'Estendi i gomiti mantenendo le braccia vicine al corpo e senza slanci.',2.5),
 'biceps-cable':ex('biceps-cable','Curl al cavo basso in piedi','Bicipiti','biceps-cable',range(3,8,10),120,'Fletti i gomiti senza oscillare con la schiena, controllando il ritorno.',2.5),
 'standing-curl':ex('standing-curl','Standing Leg Curl','Femorali','standing-curl',range(2,8,10),0,'Fletti il ginocchio alla macchina, isolando i femorali e controllando il movimento.',2.5),
 'leg-extension':ex('leg-extension','Leg Extension','Quadricipiti','leg-extension',range(2,8,10),120,'Estendi le ginocchia con controllo e ritorna senza lasciar cadere il peso.',2.5),
 crunch:ex('crunch','Crunch Machine','Addominali','crunch',range(2,8,10),120,'Fletti il tronco con gli addominali mantenendo il movimento lento e regolare.',2.5),
 'chest-dumbbells':ex('chest-dumbbells','Panca piana con 2 manubri','Pettorali','chest-dumbbells',range(2,6,8),120,'Distensioni su panca piana con due manubri; l’app registra il peso di un singolo manubrio.',2.5,'strength',0,'kg/manubrio'),
 'lat-machine':ex('lat-machine','Lat Machine inversa','Dorsali','lat-machine',range(3,8,10),120,'Trazioni alla lat machine con presa neutra, secondo la scheda. Controlla la fase di ritorno.',2.5),
 'hack-squat':ex('hack-squat','Hack Squat','Quadricipiti','hack-squat',range(2,6,8),120,'Accosciata guidata alla Hack Squat, scendendo nell’escursione che riesci a controllare.',5),
 'lateral-raise':ex('lateral-raise','Alzate laterali','Spalle','lateral-raise',range(3,8,10),120,'Alzate laterali con manubri, eseguite con il busto stabile; annotazione scheda: panca.',2.5,'strength',0,'kg/manubrio'),
 'french-press':ex('french-press','French Press — panca piana','Tricipiti','french-press',range(3,8,10),120,'French press su panca piana con due manubri; annota il peso di ciascun manubrio.',2.5,'strength',0,'kg/manubrio'),
 'ez-curl':ex('ez-curl','Curl in piedi con bilanciere EZ','Bicipiti','ez-curl',range(3,6,8),120,'Curl in piedi con bilanciere EZ; registra il carico complessivo, se possibile.',2.5),
 'seated-curl':ex('seated-curl','Leg Curl seduto','Femorali','seated-curl',range(2,6,8),120,'Leg curl seduto a carico libero. Mantieni il bacino ben appoggiato alla macchina.',2.5)
};
const first=['treadmill','sphinx','chest-machine','pulldown','leg-press','shoulder-press','triceps-cable','biceps-cable','standing-curl','leg-extension','crunch'];
const second=['treadmill','sphinx','chest-dumbbells','lat-machine','hack-squat','lateral-raise','french-press','ez-curl','seated-curl','crunch'];
const data={catalog,first,second};
root.ForgeSeed=data;
if(typeof module!=='undefined')module.exports=data;
})(typeof globalThis!=='undefined'?globalThis:this);
