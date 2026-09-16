import * as THREE from 'three';
import {BUILDINGS,STREETS,footprint} from './economy.js';

const materials={};
const mat=c=>materials[c]??=new THREE.MeshStandardMaterial({color:c,roughness:.93});
function mesh(geo,color,x,y,z,p){const m=new THREE.Mesh(geo,typeof color==='string'?mat(color):color);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m;}
const box=(w,h,d,c,x,y,z,p)=>mesh(new THREE.BoxGeometry(w,h,d),c,x,y,z,p);
const cyl=(r,h,c,x,y,z,p,n=10)=>mesh(new THREE.CylinderGeometry(r,r,h,n),c,x,y,z,p);
function bush(rx,ry,rz,c,x,y,z,p){const m=mesh(new THREE.IcosahedronGeometry(1,1),c,x,y,z,p);m.scale.set(rx,ry,rz);return m;}
function line(points,color,parent){const geometry=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p)));const l=new THREE.Line(geometry,new THREE.LineBasicMaterial({color}));parent.add(l);return l;}
function sign(text,w,h,x,y,z,p,bg='#345e58',fg='#f5ecd4'){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,512,128);ctx.fillStyle=fg;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 48px sans-serif';ctx.fillText(text,256,69,470);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;return box(w,h,.035,new THREE.MeshStandardMaterial({map:texture,roughness:.9}),x,y,z,p);}
function door(x,y,z,p,color='#547773',w=.43,h=1.25){box(w,h,.07,color,x,y,z,p);box(.04,.06,.08,'#d9bf83',x+w*.3,y,z+.05,p);}
function windowFront(x,y,z,p,w=.45,h=.7){box(w+.1,h+.1,.08,'#e9d5ac',x,y,z,p);box(w,h,.1,'#507378',x,y,z+.03,p);box(.035,h,.12,'#d3cab3',x,y,z+.05,p);}
function slab(w,d,h,color,x,z,p){box(w,h,d,color,x,h/2+.12,z,p);box(w+.09,.1,d+.09,'#bdb69e',x,h+.18,z,p);}
function tank(x,z,y,p){cyl(.3,.5,'#59656a',x,y+.25,z,p,12);cyl(.33,.045,'#414f57',x,y+.52,z,p,12);}
function patio(x,z,w,d,p){box(w,.05,d,'#c5aa81',x,.15,z,p);for(let i=-w/2;i<w/2;i+=.35)box(.012,.01,d,'#e3caa8',x+i,.18,z,p);for(let i=-d/2;i<d/2;i+=.35)box(w,.01,.012,'#e3caa8',x,.18,z+i,p);}
function plant(x,z,p){cyl(.16,.23,'#aa6645',x,.22,z,p);bush(.27,.36,.25,'#678c4b',x,.57,z,p);}
function clothesline(x1,z1,x2,z2,y,p){for(const [x,z]of[[x1,z1],[x2,z2]])cyl(.025,y,'#7d8171',x,y/2,z,p,5);line([[x1,y,z1],[x2,y,z2]],'#d2c9ae',p);for(let i=0;i<4;i++){const t=(i+1)/5;box(.3,.45,.02,['#f2dfb6','#7faab7','#c27766','#eee9da'][i],x1+(x2-x1)*t,y-.23,z1+(z2-z1)*t,p);}}
function railFence(x,z,w,p){for(let i=0;i<=w;i+=.35)box(.025,.75,.025,'#525f56',x+i,.5,z,p);box(w,.035,.035,'#525f56',x+w/2,.85,z,p);}
function cropBeds(p,w=3,d=3){box(w,.08,d,'#796047',0,.09,0,p);for(let i=0;i<5;i++){const x=-w*.38+i*w*.19;box(.25,.1,d*.82,'#5e4834',x,.15,0,p);for(let j=0;j<6;j++){const z=-d*.34+j*d*.136;box(.025,.38,.025,'#79944a',x,.36,z,p);for(const side of [-1,1]){const leaf=bush(.14,.045,.095,(i+j)%2?'#629148':'#89a953',x+side*.095,.47,z,p);leaf.rotation.z=side*.25;}bush(.095,.055,.14,'#73994c',x,.59,z,p);}}for(const sx of [-1,1])box(.035,.5,d+.12,'#aa9c7a',sx*(w/2+.05),.25,0,p);railFence(-w/2,d/2+.1,w,p);}

export function architecture(type){const p=new THREE.Group();
 if(type==='casa_chorizo'){
  // Rooms against a longitudinal party wall, with doors onto the lateral gallery.
  box(3,.13,6,'#b4b098',0,.03,0,p);patio(.65,-.12,1.42,4.6,p);
  for(let i=0;i<3;i++){const z=1.55-i*1.48;slab(1.43,1.43,1.7,['#d1b385','#ceb18c','#c3a17d'][i],-.72,z,p);box(.055,1.2,.48,'#5d8983',.015,.8,z,p);box(.09,.07,.55,'#e2cfac',.05,1.45,z,p);}
  slab(3,1.1,1.98,'#d6b98e',0,2.43,p);windowFront(-.82,1.1,3,p,.59,.89);door(.9,.84,3,p,'#527b75',.5,1.52);box(3.12,.17,.14,'#efdab2',0,2.23,3,p);box(3.08,.08,.16,'#c5aa80',0,1.86,3.03,p);box(3.03,.36,.11,'#dbbf98',0,.23,3.02,p);
  for(const x of [-1.45,.15,1.43])box(.1,1.85,.1,'#e2cba5',x,1.02,3.04,p);
  const gallery=new THREE.MeshStandardMaterial({color:'#b59868',transparent:true,opacity:.64,roughness:.8});box(.67,.08,4.45,gallery,.35,1.55,-.13,p);for(let i=0;i<4;i++)box(.045,1.5,.045,'#5b7869',.68,.87,1.8-i*1.22,p);
  slab(2.92,.7,1.38,'#c6af85',0,-2.6,p);tank(-.62,-2.57,1.56,p);box(.09,1.1,4.9,'#d3c09b',1.46,.57,-.23,p);box(.09,1.9,6,'#bba589',-1.49,1.01,0,p);plant(1,1.5,p);plant(1,-1.8,p);clothesline(.9,.9,.9,-1,1.2,p);box(.6,.1,.42,'#aa7951',.99,.57,-.8,p);for(const z of [-.93,-.67])box(.05,.5,.05,'#7a6650',1.08,.29,z,p);
 }else if(type==='almacen'){
  slab(3.5,3.5,1.95,'#d8c391',0,0,p);box(3.65,.28,.16,'#e1d4b3',0,2.18,1.72,p);door(-1.01,.79,1.8,p,'#467c7c',.66,1.42);windowFront(.57,1.04,1.81,p,1.65,1.05);sign('ALMACÉN',3.2,.42,0,1.81,1.86,p);
  for(let i=0;i<8;i++){const m=box(.42,.06,.87,i%2?'#e4d4b1':'#537d65',-1.47+i*.42,1.47,2.1,p);m.rotation.x=.12;}for(const x of [-1.65,1.65])box(.035,1.35,.035,'#485e52',x,.68,2.46,p);
  for(let i=0;i<3;i++){box(.48,.27,.4,'#997547',.3+i*.5,.2,2.04,p);for(let j=0;j<3;j++)bush(.065,.07,.065,i%2?'#be8346':'#7d993d',.17+i*.5+j*.12,.37,2.04,p);}tank(-1,-1,2.12,p);
 }else if(type==='conventillo'){
  box(6,.12,6,'#b0aa93',0,.04,0,p);patio(0,.05,3.15,4.8,p);
  for(const side of [-1,1])for(let i=0;i<4;i++){const z=-2.08+i*1.38;slab(1.45,1.32,1.65,['#be9d7f','#c4b184','#94ada2','#c4a18a'][i],side*2.21,z,p);box(.07,1.2,.43,['#608384','#a36e50','#688552','#648a9b'][i],side*1.47,.77,z,p);box(.55,.06,1.3,'#ab946f',side*1.23,1.52,z,p);box(.045,1.5,.045,'#526e60',side*.98,.85,z+.59,p);}
  slab(3.2,.65,1.45,'#bdab86',0,-2.65,p);tank(0,-2.65,1.62,p);box(1.05,1.75,.17,'#c9a787',-2.45,.94,2.95,p);box(1.05,1.75,.17,'#c9a787',2.45,.94,2.95,p);railFence(-1.9,2.94,3.8,p);clothesline(-.7,-1,.7,1.5,1.35,p);plant(-.64,2.18,p);plant(.68,-2,p);cyl(.35,.09,'#8b7957',.4,.68,.15,p);for(const x of [.07,.73])box(.045,.65,.045,'#79684f',x,.33,.15,p);
 }else if(type==='huerta'){cropBeds(p,3.1,3.1);sign('SOJA',1.3,.25,0,.71,1.72,p,'#597146');}
 else if(type==='club'){
  box(6,.12,6,'#b8b5a1',0,.04,0,p);slab(5.8,4.5,2.25,'#b5c5b9',0,-.63,p);box(5.94,.21,4.6,'#7e9697',0,2.5,-.63,p);for(const x of [-2.2,-1.35])windowFront(x,1.29,1.64,p,.56,.86);door(.15,.94,1.65,p,'#527d7b',1.05,1.64);windowFront(1.87,1.07,1.65,p,1.42,.82);sign('CLUB DE BARRIO',5.45,.42,0,2.16,1.7,p,'#3f727e');sign('TERO COSECHADO',2.8,.22,-.62,1.8,1.7,p,'#e6d8b8','#436e76');sign('BUFFET',1.22,.19,1.88,1.63,1.73,p,'#bd744d');box(5.9,.1,.85,'#709391',0,1.78,2.02,p);for(const x of [-2.75,2.75])box(.055,1.72,.055,'#506f70',x,.93,2.38,p);cyl(.4,.07,'#a88457',1.88,.7,2.28,p);for(const x of [1.4,2.35])box(.3,.05,.32,'#8c9c73',x,.44,2.4,p);box(1.25,.07,.32,'#9c8060',-1.64,.54,2.6,p);for(const x of [-2.15,-1.1])box(.06,.5,.25,'#547773',x,.29,2.6,p);tank(1.85,-2,2.65,p);plant(-2.53,2.7,p);
 }else if(type==='potrero'){
  box(7,.05,7,'#7e9760',0,.06,0,p);for(let i=0;i<38;i++){const x=Math.sin(i*93.31)*3.3,z=Math.cos(i*43.9)*3.3;const patch=mesh(new THREE.CircleGeometry(.2+(i%5)*.09,7),i%3?'#8da16e':'#a69668',x,.095,z,p);patch.rotation.x=-Math.PI/2;}for(const z of [-2.88,2.88]){box(2.55,.015,1.4,'#ac9d74',0,.1,z,p);for(const x of [-1.13,1.13])box(.07,1.2,.07,'#e0d9b6',x,.67,z,p);box(2.33,.07,.07,'#e0d9b6',0,1.27,z,p);}const circle=mesh(new THREE.RingGeometry(.61,.64,32),new THREE.MeshBasicMaterial({color:'#d2d0a4',side:THREE.DoubleSide}),0,.11,0,p);circle.rotation.x=-Math.PI/2;box(6.1,.015,.025,'#c4c49a',0,.106,0,p);bush(.13,.13,.13,'#e4ded0',.28,.24,.12,p);bush(.07,.04,.07,'#596658',.25,.35,.13,p);sign('EL POTRERO',1.8,.27,-2.2,.8,3.45,p,'#8b7956');for(const x of [-3.45,3.45])for(let z=-3;z<=3;z+=1.5)cyl(.03,.62,'#94866b',x,.35,z,p,5);
 }else if(type==='taller'){
  slab(4,4.8,2.05,'#a87555',0,0,p);box(2.75,1.7,.06,'#6d8c8a',0,.95,2.44,p);for(let i=0;i<12;i++)box(2.76,.017,.08,'#46676a',0,.18+i*.135,2.48,p);box(4.08,.16,4.92,'#949f96',0,2.27,0,p);for(let i=0;i<16;i++)box(.045,.045,4.92,'#7c8980',-1.98+i*.265,2.36,0,p);sign('TALLER DEL BARRIO',3.6,.35,0,1.98,2.5,p,'#345c66');box(.4,.5,1.1,'#b39866',1.73,.25,1.7,p);tank(-1,-1.6,2.37,p);
 }else{
  box(4.5,.12,4.4,'#bcb9a6',0,.03,0,p);slab(4.4,3.3,2.1,'#d7cba6',0,-.45,p);box(4.55,.23,.16,'#7a9b9e',0,2.4,1.22,p);sign('SOCIEDAD DE FOMENTO',3.95,.36,0,1.96,1.26,p,'#527c80');door(0,.85,1.27,p,'#53767a',.85,1.55);for(const x of [-1.4,1.4])windowFront(x,1.1,1.25,p,.8,.9);box(4.6,.11,1,'#8a9a8a',0,1.78,1.55,p);for(const x of [-2.05,2.05])box(.09,1.7,.09,'#64868a',x,.87,1.98,p);tank(1.3,-1.25,2.27,p);
  cyl(.025,3.5,'#b9c4b8',-2.48,1.75,1.8,p,6);for(let i=0;i<3;i++)box(.85,.19,.02,i===1?'#f4efd9':'#80b6c9',-2.07,3.2-i*.19,1.8,p);box(.5,.07,.28,'#99866b',1.35,.57,1.8,p);for(const x of [1.16,1.54])box(.05,.53,.05,'#687669',x,.27,1.8,p);
 }
 return p;
}

export function createWorld(scene,state){const pickables=[];let seed=81;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 function register(group,entity){group.traverse(o=>{if(o.isMesh){o.userData.entity=entity;pickables.push(o);}});}
 box(64,1.3,60,'#807a59',0,-.76,0,scene);box(180,.1,180,'#899c7f',0,-1.5,0,scene);box(64,.1,60,'#757c6b',0,-.05,0,scene);
 // Raised sidewalks and block interiors with visible cadastral lines.
 for(const x of [-24,-12,0,12,24])for(const z of [-24,-12,0,12,24]){
  box(10.3,.13,10.3,'#b2b1a0',x,.04,z,scene);box(8.7,.15,8.7,rand()>.45?'#91a16d':'#9aaa73',x,.12,z,scene);
  for(let k=-4;k<=4;k++){box(.016,.01,10.1,'#939c8b',x+k,.115,z,scene);box(10.1,.01,.016,'#939c8b',x,.115,z+k,scene);}
  for(const dx of [-4.25,4.25])box(.07,.19,8.5,'#b4a58a',x+dx,.24,z,scene);box(8.5,.19,.07,'#b4a58a',x,.24,z-4.25,scene);
 }
 for(const p of STREETS){box(2,.06,60,'#777a70',p,.015,0,scene);box(64,.06,2,'#777a70',0,.016,p,scene);for(const q of STREETS)for(let i=0;i<4;i++){box(.22,.008,.75,'#d4d2b6',p-.7+i*.46,.053,q+1.3,scene);box(.75,.008,.22,'#d4d2b6',p+1.3,.054,q-.7+i*.46,scene);}}
 box(2.8,.08,60,'#857f6d',28,.055,0,scene);for(let z=-29;z<30;z+=.7)box(2,.07,.19,'#675f4f',28,.13,z,scene);for(const x of [27.4,28.6])box(.09,.12,60,'#a6aba2',x,.2,0,scene);
 for(let z=-24;z<=24;z+=12){const x=7.3;cyl(.065,3.6,'#687875',x,1.8,z+4.7,scene,7);box(.15,.13,1.1,'#6d7f7b',x,3.5,z+4.2,scene);box(.32,.1,.49,'#e3d7aa',x,3.45,z+3.75,scene);}
 for(let z=-25;z<26;z+=12){const x=-7.4;cyl(.08,4.3,'#83705a',x,2.15,z,scene,7);box(1.1,.1,.1,'#6b6a5a',x,4,z,scene);if(z<23)for(const dx of [-.4,.4])line([[x+dx,4,z],[x+dx,3.67,z+6],[x+dx,4,z+12]],'#677365',scene);}
 const tower=new THREE.Group();tower.position.set(22,0,-23);scene.add(tower);for(const x of [-.6,.6])for(const z of [-.6,.6])box(.1,4.6,.1,'#7c8f8c',x,2.3,z,tower);cyl(1,1.4,'#bcc3b4',0,4.7,0,tower,12);cyl(1.08,.08,'#8faba8',0,5.44,0,tower,12);sign('TERO COSECHADO',1.6,.3,0,4.9,1.01,tower,'#aebbb0','#46676c');
 function tree(x,z,jacaranda=false){const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);cyl(.12,1.9,'#7c7156',0,.95,0,g,7);const colors=jacaranda?['#9182b2','#a18cbb','#849567']:['#65844f','#7e985f','#829a5a'];bush(.87,.73,.88,colors[0],0,2.15,0,g);bush(.65,.6,.65,colors[1],.4,2.5,.1,g);bush(.65,.57,.58,colors[2],-.38,2.44,-.1,g);return g;}
 for(const p of [-24,-12,0,12,24])for(const z of [-19.3,-7.3,7.3,19.3])if(p<24)tree(p+2,z,rand()>.65);for(const [x,z]of[[-23,12],[-22,15],[14,24],[-24,-24],[22,13]])tree(x,z,true);
 function makeBuilding(type,x,z,complete=true,rotation=0){const group=architecture(type);group.position.set(x,.18,z);group.rotation.y=rotation;scene.add(group);const spec=BUILDINGS[type]||{width:4.8,depth:4.5,size:4.8};const dims=footprint(spec,rotation);const b={kind:'building',type,name:type==='centro'?'Sociedad de fomento':spec.name,x,z,...dims,size:spec.size,rotation,group,progress:complete?1:0};state.buildings.push(b);register(group,b);if(!complete)group.scale.y=.08;return b;}
 makeBuilding('centro',-1.5,1.6);makeBuilding('casa_chorizo',2.8,-.5);makeBuilding('casa_chorizo',-1,-12);makeBuilding('huerta',-24,24);
 makeBuilding('casa_chorizo',-14,-12);makeBuilding('casa_chorizo',-10.5,-12);makeBuilding('casa_chorizo',12,-24);makeBuilding('casa_chorizo',-1,-24);makeBuilding('conventillo',12,24);
 makeBuilding('club',-24,-12);
 function addNode(type,x,z){const group=new THREE.Group();group.position.set(x,.19,z);scene.add(group);
  if(type==='wood'){box(2.2,.08,1.7,'#b0a184',0,.03,0,group);for(let row=0;row<3;row++)for(let i=0;i<5;i++)box(.31,.17,.45,['#a46746','#b77a51','#bd8b60'][row],-.8+i*.34,.18+row*.17,-.45,group);for(let j=0;j<5;j++)box(1.7,.075,.12,'#b29969',.1,.13+j*.078,.45,group);box(.7,.56,.6,'#baad91',.7,.3,-.1,group);}
  else if(type==='food'){cropBeds(group,2.4,2.4);}
  else{box(1.8,.7,1.4,'#b29b6b',0,.36,0,group);for(let i=0;i<5;i++)box(.29,.36,.43,i%2?'#7f9760':'#8c9a69',-.62+i*.31,.91,0,group);sign('YERBA',1.4,.25,0,.43,.73,group,'#6e8051');}
  const node={kind:'resource',type,name:type==='wood'?'Acopio de materiales':type==='food'?'Cultivo de soja':'Proveeduría de yerba',x,z,remaining:type==='wood'?300:220,group};state.nodes.push(node);register(group,node);
 }
 for(const [x,z]of[[-10,2],[10,-1],[-2,13],[-12,12],[14,-14],[-22,2]])addNode('wood',x,z);
 for(const [x,z]of[[-24,12],[-24,0],[-12,24],[0,24]])addNode('food',x,z);
 for(const [x,z]of[[-2,-2.5],[14,2],[-10,14]])addNode('yerba',x,z);
 const grass=new THREE.InstancedMesh(new THREE.ConeGeometry(.04,.22,3),mat('#b6b783'),650);const dummy=new THREE.Object3D();for(let i=0;i<650;i++){let x=rand()*50-25,z=rand()*55-27.5;if(STREETS.some(v=>Math.abs(x-v)<2||Math.abs(z-v)<2)||state.buildings.some(b=>Math.abs(x-b.x)<b.width/2+.3&&Math.abs(z-b.z)<b.depth/2+.3))x=-30;dummy.position.set(x,.26,z);dummy.rotation.y=rand()*6;dummy.updateMatrix();grass.setMatrixAt(i,dummy.matrix);}scene.add(grass);
 for(const [x,z,c]of[[-5.7,1,'#a76551'],[6,-12,'#d9cda4'],[-17.8,12,'#5f8b96']]){const g=new THREE.Group();g.position.set(x,.09,z);scene.add(g);box(.95,.39,1.9,c,0,.45,0,g);box(.8,.36,1.03,'#789496',0,.78,-.1,g);box(.86,.07,1.08,c,0,.97,-.1,g);for(const xx of [-.49,.49])for(const zz of [-.56,.56]){const wheel=cyl(.2,.13,'#4e514b',xx,.24,zz,g,10);wheel.rotation.z=Math.PI/2;}}
 return{pickables,register,makeBuilding};
}

export function buildingPreviews(){const result={};const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setSize(240,160);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight('#fff0d1','#66734e',3));const sun=new THREE.DirectionalLight('#fff4d7',3);sun.position.set(-5,9,8);scene.add(sun);const camera=new THREE.OrthographicCamera(-5.4,5.4,3.6,-3.6,.1,60);camera.position.set(9,11,13);camera.lookAt(0,.7,0);
 for(const type of Object.keys(BUILDINGS)){const b=architecture(type);scene.add(b);renderer.render(scene,camera);result[type]=renderer.domElement.toDataURL('image/png');scene.remove(b);b.traverse(o=>o.geometry?.dispose());}renderer.dispose();return result;}
