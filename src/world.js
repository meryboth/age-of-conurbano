import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {BUILDINGS,CENTRO,BLOCKS,STREETS,MAP_HALF,BLOCK_HALF,LOT_WIDTH,LOT_DEPTH,ROW_LOTS,footprint,lotSpot} from './economy.js';

const materials={};
// Meshes sharing a material become one draw call. Animated flag cloth stays separate.
function mergeGroup(group){group.updateMatrixWorld(true);const inverse=group.matrixWorld.clone().invert(),byMaterial=new Map(),merged=[];
 group.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o.userData.rest)return;const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse,o.matrixWorld));for(const k of Object.keys(g.attributes))if(!['position','normal','uv'].includes(k))g.deleteAttribute(k);if(!byMaterial.has(o.material))byMaterial.set(o.material,[]);byMaterial.get(o.material).push(g);merged.push(o);});
 for(const o of merged){o.removeFromParent();o.geometry.dispose();}
 for(const [material,geometries] of byMaterial){const m=new THREE.Mesh(mergeGeometries(geometries),material);m.castShadow=true;m.receiveShadow=true;group.add(m);for(const g of geometries)g.dispose();}
 return group;}
const mat=c=>materials[c]??=new THREE.MeshStandardMaterial({color:c,roughness:.93});
function mesh(geo,color,x,y,z,p){const m=new THREE.Mesh(geo,typeof color==='string'?mat(color):color);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m;}
const box=(w,h,d,c,x,y,z,p)=>mesh(new THREE.BoxGeometry(w,h,d),c,x,y,z,p);
const cyl=(r,h,c,x,y,z,p,n=10)=>mesh(new THREE.CylinderGeometry(r,r,h,n),c,x,y,z,p);
function bush(rx,ry,rz,c,x,y,z,p){const m=mesh(new THREE.IcosahedronGeometry(1,1),c,x,y,z,p);m.scale.set(rx,ry,rz);return m;}
function line(points,color,parent){const geometry=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p)));const l=new THREE.Line(geometry,new THREE.LineBasicMaterial({color}));parent.add(l);return l;}
function sign(text,w,h,x,y,z,p,bg='#345e58',fg='#f5ecd4'){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,512,128);ctx.fillStyle=fg;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 48px sans-serif';ctx.fillText(text,256,69,470);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;return box(w,h,.035,new THREE.MeshStandardMaterial({map:texture,roughness:.9}),x,y,z,p);}
let flagTexture;
// Flagpole with an Argentine flag; the cloth keeps its rest vertices so the world can make it wave.
function flag(x,z,h,p){cyl(.03,h,'#d9dcd6',x,h/2,z,p,8);bush(.055,.055,.055,'#e8c25a',x,h+.03,z,p);
 if(!flagTexture){const c=document.createElement('canvas');c.width=300;c.height=190;const ctx=c.getContext('2d');ctx.fillStyle='#74acdf';ctx.fillRect(0,0,300,190);ctx.fillStyle='#ffffff';ctx.fillRect(0,63,300,64);ctx.translate(150,95);ctx.fillStyle='#f6b40e';for(let i=0;i<16;i++){ctx.rotate(Math.PI/8);ctx.beginPath();ctx.moveTo(-4,0);ctx.lineTo(0,i%2?26:30);ctx.lineTo(4,0);ctx.fill();}ctx.beginPath();ctx.arc(0,0,14,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#85340a';ctx.lineWidth=1.5;ctx.stroke();flagTexture=new THREE.CanvasTexture(c);flagTexture.colorSpace=THREE.SRGBColorSpace;}
 const geo=new THREE.PlaneGeometry(1.15,.72,12,1);geo.translate(.575,0,0);const cloth=mesh(geo,new THREE.MeshStandardMaterial({map:flagTexture,side:THREE.DoubleSide,roughness:.85}),x+.03,h-.4,z,p);cloth.userData.rest=geo.attributes.position.array.slice();(p.userData.flags??=[]).push(cloth);return cloth;}
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
 }else if(type==='huerta'){cropBeds(p,3.1,5.4);sign('SOJA',1.3,.25,0,.71,2.86,p,'#597146');}
 else if(type==='club'){
  box(6,.12,6,'#b8b5a1',0,.04,0,p);slab(5.8,4.5,2.25,'#b5c5b9',0,-.63,p);box(5.94,.21,4.6,'#7e9697',0,2.5,-.63,p);for(const x of [-2.2,-1.35])windowFront(x,1.29,1.64,p,.56,.86);door(.15,.94,1.65,p,'#527d7b',1.05,1.64);windowFront(1.87,1.07,1.65,p,1.42,.82);sign('CLUB DE BARRIO',5.45,.42,0,2.16,1.7,p,'#3f727e');sign('TERO LOTEADO',2.8,.22,-.62,1.8,1.7,p,'#e6d8b8','#436e76');sign('BUFFET',1.22,.19,1.88,1.63,1.73,p,'#bd744d');box(5.9,.1,.85,'#709391',0,1.78,2.02,p);for(const x of [-2.75,2.75])box(.055,1.72,.055,'#506f70',x,.93,2.38,p);cyl(.4,.07,'#a88457',1.88,.7,2.28,p);for(const x of [1.4,2.35])box(.3,.05,.32,'#8c9c73',x,.44,2.4,p);box(1.25,.07,.32,'#9c8060',-1.64,.54,2.6,p);for(const x of [-2.15,-1.1])box(.06,.5,.25,'#547773',x,.29,2.6,p);tank(1.85,-2,2.65,p);plant(-2.53,2.7,p);flag(2.85,2.9,4.6,p);
 }else if(type==='potrero'){
  const W=14,D=10,L=W/2-.5;box(W,.05,D,'#7e9760',0,.06,0,p);
  for(let i=0;i<70;i++){const x=Math.sin(i*93.31)*(L-.3),z=Math.cos(i*43.9)*(D/2-.6);const patch=mesh(new THREE.CircleGeometry(.25+(i%5)*.12,7),i%3?'#8da16e':'#a69668',x,.095,z,p);patch.rotation.x=-Math.PI/2;}
  for(const sx of [-1,1]){box(2.2,.015,3.4,'#ac9d74',sx*(L-1),.1,0,p);box(.025,.015,4.2,'#c4c49a',sx*(L-1.9),.106,0,p);for(const z of [-2.1,2.1])box(1.9,.015,.025,'#c4c49a',sx*(L-.95),.106,z,p);
   for(const z of [-1.3,1.3])box(.08,1.25,.08,'#e0d9b6',sx*L,.7,z,p);box(.08,.08,2.68,'#e0d9b6',sx*L,1.3,0,p);for(const z of [-1.3,1.3])box(.6,.04,.04,'#d8d2b5',sx*(L+.3),.2,z,p);}
  box(.025,.015,D-1.2,'#c4c49a',0,.106,0,p);for(const s of [-1,1]){box(W-1,.015,.025,'#c4c49a',0,.106,s*(D/2-.6),p);box(.025,.015,D-1.2,'#c4c49a',s*(W/2-.5),.106,0,p);}
  const circle=mesh(new THREE.RingGeometry(1.2,1.26,40),new THREE.MeshBasicMaterial({color:'#d2d0a4',side:THREE.DoubleSide}),0,.11,0,p);circle.rotation.x=-Math.PI/2;
  bush(.13,.13,.13,'#e4ded0',.9,.24,.4,p);bush(.07,.04,.07,'#596658',.87,.35,.41,p);
  for(let x=-W/2+.1;x<=W/2;x+=1.4)for(const z of [-D/2+.1,D/2-.1])if(Math.abs(x)>1.4||z<0)cyl(.03,1.1,'#94866b',x,.6,z,p,5);for(let z=-D/2+.1;z<=D/2;z+=1.4)for(const x of [-W/2+.1,W/2-.1])cyl(.03,1.1,'#94866b',x,.6,z,p,5);
  for(const s of [-1,1]){line([[-W/2+.1,1.05,s*(D/2-.1)],[W/2-.1,1.05,s*(D/2-.1)]],'#a39a84',p);line([[s*(W/2-.1),1.05,-D/2+.1],[s*(W/2-.1),1.05,D/2-.1]],'#a39a84',p);}
  sign('EL POTRERO',2.2,.32,-3.4,1.2,D/2+.02,p,'#8b7956');for(const x of [-4.3,-2.5])cyl(.04,1.05,'#7d6f57',x,.55,D/2+.02,p,5);
  box(2.4,.08,.4,'#9c8060',3.6,.45,-D/2+.8,p);for(const x of [2.6,4.6])box(.08,.4,.3,'#6f624d',x,.24,-D/2+.8,p);
  flag(-W/2+.5,-D/2+.5,3.6,p);
 }else if(type==='taller'){
  slab(4,4.8,2.05,'#a87555',0,0,p);box(2.75,1.7,.06,'#6d8c8a',0,.95,2.44,p);for(let i=0;i<12;i++)box(2.76,.017,.08,'#46676a',0,.18+i*.135,2.48,p);box(4.08,.16,4.92,'#949f96',0,2.27,0,p);for(let i=0;i<16;i++)box(.045,.045,4.92,'#7c8980',-1.98+i*.265,2.36,0,p);sign('TALLER DEL BARRIO',3.6,.35,0,1.98,2.5,p,'#345c66');box(.4,.5,1.1,'#b39866',1.73,.25,1.7,p);tank(-1,-1.6,2.37,p);
 }else{
  box(4.5,.12,4.4,'#bcb9a6',0,.03,0,p);slab(4.4,3.3,2.1,'#d7cba6',0,-.45,p);box(4.55,.23,.16,'#7a9b9e',0,2.4,1.22,p);sign('SOCIEDAD DE FOMENTO',3.95,.36,0,1.96,1.26,p,'#527c80');door(0,.85,1.27,p,'#53767a',.85,1.55);for(const x of [-1.4,1.4])windowFront(x,1.1,1.25,p,.8,.9);box(4.6,.11,1,'#8a9a8a',0,1.78,1.55,p);for(const x of [-2.05,2.05])box(.09,1.7,.09,'#64868a',x,.87,1.98,p);tank(1.3,-1.25,2.27,p);
  cyl(.025,3.5,'#b9c4b8',-2.48,1.75,1.8,p,6);for(let i=0;i<3;i++)box(.85,.19,.02,i===1?'#f4efd9':'#80b6c9',-2.07,3.2-i*.19,1.8,p);box(.5,.07,.28,'#99866b',1.35,.57,1.8,p);for(const x of [1.16,1.54])box(.05,.53,.05,'#687669',x,.27,1.8,p);
 }
 return p;
}

export function createWorld(scene,state){const pickables=[],obstacles=[];const statics=new THREE.Group();scene.add(statics);let seed=81;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 function register(group,entity){group.traverse(o=>{if(o.isMesh){o.userData.entity=entity;pickables.push(o);}});}
 const span=MAP_HALF*2,plate=span+10;
 box(plate,1.3,plate,'#807a59',0,-.76,0,statics);box(320,.1,320,'#899c7f',0,-1.5,0,statics);box(plate,.1,plate,'#8c9a73',0,-.05,0,statics);box(span-2,.02,span-2,'#757c6b',0,-.01,0,statics);
 // Manzanas: sidewalk ring, lot rows with cadastral lines, and a core of private backyards.
 const lotLine='#7c8868';
 for(const bx of BLOCKS)for(const bz of BLOCKS){
  box(28,.13,28,'#b2b1a0',bx,.04,bz,statics);box(BLOCK_HALF*2,.15,BLOCK_HALF*2,rand()>.45?'#91a16d':'#9aaa73',bx,.12,bz,statics);
  const core=BLOCK_HALF-LOT_DEPTH;box(core*2-.2,.02,core*2-.2,'#879a68',bx,.2,bz,statics);
  for(const s of [-1,1]){
   box(BLOCK_HALF*2,.01,.05,lotLine,bx,.2,bz+s*core,statics);for(let i=1;i<ROW_LOTS.N;i++)box(.05,.01,LOT_DEPTH,lotLine,bx-BLOCK_HALF+.1+i*LOT_WIDTH,.2,bz+s*(BLOCK_HALF-LOT_DEPTH/2),statics);
   box(.05,.01,core*2,lotLine,bx+s*core,.2,bz,statics);box(LOT_DEPTH,.01,.05,lotLine,bx+s*(BLOCK_HALF-LOT_DEPTH/2),.2,bz,statics);
   box(.07,.19,BLOCK_HALF*2,'#b4a58a',bx+s*BLOCK_HALF,.24,bz,statics);box(BLOCK_HALF*2,.19,.07,'#b4a58a',bx,.24,bz+s*BLOCK_HALF,statics);
  }
  for(const s of [-1,1])for(const t of [-9,-1.8,5.4]){if(rand()>.3)tree(bx+t,bz+s*13.6,rand()>.7);if(rand()>.3)tree(bx+s*13.6,bz+t+1.8,rand()>.7);}
  tree(bx+2.2+rand(),bz-1.5-rand(),rand()>.5);clothesline(bx-3.2,bz+1.4,bx-.8,bz+2.6,1.1,statics);
 }
 for(const p of STREETS){box(2,.06,span,'#777a70',p,.015,0,statics);box(span,.06,2,'#777a70',0,.016,p,statics);for(const q of STREETS)for(let i=0;i<4;i++){for(const s of [-1,1]){box(.22,.008,.75,'#d4d2b6',p-.7+i*.46,.053,q+s*1.45,statics);box(.75,.008,.22,'#d4d2b6',p+s*1.45,.054,q-.7+i*.46,statics);}}}
 // The rural edge: a railway to the east and soy rows beyond the southern street.
 const rail=MAP_HALF+3;box(2.8,.08,plate,'#857f6d',rail,.055,0,statics);for(let z=-plate/2+.4;z<plate/2;z+=.7)box(2,.07,.19,'#675f4f',rail,.13,z,statics);for(const x of [rail-.6,rail+.6])box(.09,.12,plate,'#a6aba2',x,.2,0,statics);
 for(let i=0;i<6;i++)box(span-4,.06,.34,i%2?'#6f8a4a':'#7f9a55',-2,.04,MAP_HALF+.8+i*.7,statics);
 for(const x of [-13.5,16.5])for(let z=-38.5;z<=38.5;z+=11){cyl(.08,4.3,'#83705a',x,2.15,z,scene,7);box(1.1,.1,.1,'#6b6a5a',x,4,z,statics);if(z+11<=38.5)for(const dx of [-.4,.4])line([[x+dx,4,z],[x+dx,3.67,z+5.5],[x+dx,4,z+11]],'#677365',statics);}
 for(const z of [-13.5,16.5])for(const x of [-28,-5,8,25,40]){cyl(.065,3.6,'#687875',x,1.8,z,scene,7);box(1.1,.13,.15,'#6d7f7b',x+.5,3.5,z,statics);box(.49,.1,.32,'#e3d7aa',x+.95,3.45,z,statics);}
 const tower=new THREE.Group();tower.position.set(30,0,-30);statics.add(tower);for(const x of [-.6,.6])for(const z of [-.6,.6])box(.1,4.6,.1,'#7c8f8c',x,2.3,z,tower);cyl(1,1.4,'#bcc3b4',0,4.7,0,tower,12);cyl(1.08,.08,'#8faba8',0,5.44,0,tower,12);sign('TERO LOTEADO',1.6,.3,0,4.9,1.01,tower,'#aebbb0','#46676c');obstacles.push({x:30,z:-30,width:1.6,depth:1.6});
 function tree(x,z,jacaranda=false){const g=new THREE.Group();g.position.set(x,0,z);statics.add(g);cyl(.12,1.9,'#7c7156',0,.95,0,g,7);const colors=jacaranda?['#9182b2','#a18cbb','#849567']:['#65844f','#7e985f','#829a5a'];bush(.87,.73,.88,colors[0],0,2.15,0,g);bush(.65,.6,.65,colors[1],.4,2.5,.1,g);bush(.65,.57,.58,colors[2],-.38,2.44,-.1,g);return g;}
 const flags=[],finishing=[];
 // A work site: first the slab (concrete, or levelled soil for open lots), then rebar, then scaffolding around the rising walls.
 function constructionSite(b,spec){const site=new THREE.Group(),open=['huerta','potrero'].includes(b.type),w=spec.width,d=spec.depth,H=b.height;site.position.set(b.x,0,b.z);site.rotation.y=b.rotation;
  const slab=new THREE.Group(),frame=new THREE.Group(),rebar=new THREE.Group(),scaffold=new THREE.Group();site.add(slab,frame,rebar,scaffold);
  if(open){box(w,.14,d,'#8b7356',0,.07,0,slab);for(let i=0;i<Math.floor(w/.5);i++)box(.07,.03,d*.9,'#74604a',-w/2+.28+i*.5,.15,0,slab);}
  else{box(w+.16,.18,d+.16,'#aaa79d',0,.09,0,slab);for(const sx of [-1,1])box(.05,.24,d+.28,'#b58d5c',sx*(w/2+.11),.12,0,frame);for(const sz of [-1,1])box(w+.28,.24,.05,'#b58d5c',0,.12,sz*(d/2+.11),frame);for(const sx of [-1,1])for(const sz of [-1,1])box(.07,.4,.07,'#9c7a4f',sx*(w/2+.2),.2,sz*(d/2+.2),frame);
   const posts=[];for(const sx of [-1,1])for(let t=-d/2+.15;t<=d/2-.1;t+=1.1)posts.push([sx*(w/2-.15),t]);for(const sz of [-1,1])for(let t=-w/2+.95;t<w/2-.8;t+=1.1)posts.push([t,sz*(d/2-.15)]);
   for(const [px,pz] of posts)cyl(.025,.75,'#7a4d38',px,.375,pz,rebar,5);
   for(const sx of [-1,1])for(let t=-d/2;t<=d/2+.01;t+=d/Math.ceil(d/1.6))cyl(.03,H,'#8e9690',sx*(w/2+.42),H/2,t,scaffold,6);
   for(let y=.8;y<H;y+=.85)for(const sx of [-1,1]){box(.34,.04,d+.1,'#b89366',sx*(w/2+.42),y,0,scaffold);box(.03,.03,d+.1,'#8e9690',sx*(w/2+.58),y+.35,0,scaffold);}
   box(.5,.28,.34,'#a8614a',-w/2+.45,.33,-d/2+.4,slab);bush(.3,.16,.3,'#c9b183',w/2-.45,.26,-d/2+.45,slab);}
  rebar.position.y=.18;scene.add(site);register(site,b);return {site,slab,rebar,scaffold};}
 // Progress 0–20% pours the base; the rest raises the building from the slab upward through a clipping plane.
 function setProgress(b,p){b.progress=p;if(p>=1){if(!b.works)return;scene.remove(b.works.site);b.group.traverse(o=>{if(o.userData.finalMaterial){o.material.dispose();o.material=o.userData.finalMaterial;delete o.userData.finalMaterial;}});b.group.visible=true;b.works=null;for(let i=pickables.length-1;i>=0;i--)if(pickables[i].userData.entity===b)pickables.splice(i,1);mergeGroup(b.group);register(b.group,b);finishing.push({b,t:0});return;}
  if(!b.works)return;const {slab,rebar,scaffold}=b.works,base=Math.min(1,p/.2),rise=Math.max(0,(p-.2)/.8);slab.scale.y=Math.max(.02,base);rebar.visible=base>.6&&rise<.3;rebar.scale.y=Math.max(.02,Math.min(1,(base-.6)/.4));
  b.group.visible=rise>0;b.clip.constant=b.base+rise*b.height*1.02;scaffold.visible=rise>0;scaffold.scale.y=Math.min(1,.12+rise);}
 function makeBuilding(type,x,z,complete=true,rotation=0){const group=architecture(type);group.position.set(x,.18,z);group.rotation.y=rotation;scene.add(group);const spec=BUILDINGS[type]||CENTRO;const dims=footprint(spec,rotation);const b={kind:'building',type,name:type==='centro'?'Sociedad de fomento':spec.name,x,z,...dims,size:spec.size,rotation,group,progress:complete?1:0};state.buildings.push(b);if(complete)mergeGroup(group);register(group,b);flags.push(...(group.userData.flags||[]));
  if(!complete){group.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(group);b.base=bb.min.y;b.height=bb.max.y-bb.min.y;b.clip=new THREE.Plane(new THREE.Vector3(0,-1,0),b.base);
   group.traverse(o=>{if(o.material){o.userData.finalMaterial=o.material;o.material=o.material.clone();Object.assign(o.material,{clippingPlanes:[b.clip],clipShadows:true,side:THREE.DoubleSide});}});
   b.works=constructionSite(b,spec);setProgress(b,0);}
  return b;}
 // Removes a building from the scene, including an unfinished work site.
 function removeBuilding(b){for(let i=pickables.length-1;i>=0;i--)if(pickables[i].userData.entity===b)pickables.splice(i,1);scene.remove(b.group);if(b.works)scene.remove(b.works.site);const set=new Set(b.group.userData.flags||[]);for(let i=flags.length-1;i>=0;i--)if(set.has(flags[i]))flags.splice(i,1);}
 // Waving flags, and a short settle with a dust ring when a building is finished.
 function animateWorld(dt,time){for(const cloth of flags){const pos=cloth.geometry.attributes.position,rest=cloth.userData.rest;for(let i=0;i<pos.count;i++){const px=rest[i*3],k=px/1.15;pos.array[i*3+2]=Math.sin(px*6.5-time*3.2)*.07*k;pos.array[i*3+1]=rest[i*3+1]-k*.04*(1+Math.sin(time*1.3));}pos.needsUpdate=true;cloth.geometry.computeVertexNormals();}
  for(let i=finishing.length-1;i>=0;i--){const f=finishing[i];f.t+=dt;if(!f.dust){f.dust=new THREE.Group();f.dust.position.set(f.b.x,.2,f.b.z);scene.add(f.dust);const r=Math.max(f.b.width,f.b.depth)/2;for(let j=0;j<14;j++){const a=j/14*Math.PI*2,m=new THREE.Mesh(new THREE.IcosahedronGeometry(.28,0),new THREE.MeshStandardMaterial({color:'#d8ccb0',transparent:true,opacity:.7,roughness:1}));m.position.set(Math.cos(a)*r,0,Math.sin(a)*r);m.userData.dir=a;f.dust.add(m);}}
   const k=Math.min(1,f.t/.9);f.b.group.scale.set(1+Math.sin(k*Math.PI)*.04,1-Math.sin(k*Math.PI*2)*.05*(1-k),1+Math.sin(k*Math.PI)*.04);for(const m of f.dust.children){m.position.x+=Math.cos(m.userData.dir)*dt*1.2;m.position.z+=Math.sin(m.userData.dir)*dt*1.2;m.position.y+=dt*.5;m.scale.setScalar(1+k*1.5);m.material.opacity=.7*(1-k);}
   if(k>=1){f.b.group.scale.set(1,1,1);scene.remove(f.dust);f.dust.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});finishing.splice(i,1);}}}
 // Starting barrio, placed on lots: [type, block x, block z, side, first lot].
 const lot=(type,bx,bz,side,slot)=>{const spec=BUILDINGS[type]||CENTRO,spot=lotSpot(bx,bz,side,slot,spec.lots,spec.depth);return makeBuilding(type,spot.x,spot.z,true,spot.rotation);};
 for(const args of [['centro',0,0,'S',2],['casa_chorizo',0,0,'S',0],['casa_chorizo',0,0,'S',1],['casa_chorizo',0,0,'S',5],['casa_chorizo',0,0,'N',1],['conventillo',0,0,'N',3],['casa_chorizo',0,-30,'S',2],['casa_chorizo',0,-30,'S',3],['club',-30,0,'E',0],['huerta',-30,30,'N',3]])lot(...args);
 function addNode(type,x,z){const group=new THREE.Group();group.position.set(x,.19,z);scene.add(group);
  if(type==='wood'){box(2.2,.08,1.7,'#b0a184',0,.03,0,group);for(let row=0;row<3;row++)for(let i=0;i<5;i++)box(.31,.17,.45,['#a46746','#b77a51','#bd8b60'][row],-.8+i*.34,.18+row*.17,-.45,group);for(let j=0;j<5;j++)box(1.7,.075,.12,'#b29969',.1,.13+j*.078,.45,group);box(.7,.56,.6,'#baad91',.7,.3,-.1,group);}
  else if(type==='food'){cropBeds(group,2.4,2.4);}
  else{box(1.8,.7,1.4,'#b29b6b',0,.36,0,group);for(let i=0;i<5;i++)box(.29,.36,.43,i%2?'#7f9760':'#8c9a69',-.62+i*.31,.91,0,group);sign('YERBA',1.4,.25,0,.43,.73,group,'#6e8051');}
  mergeGroup(group);const node={kind:'resource',type,name:type==='wood'?'Acopio de materiales':type==='food'?'Cultivo de soja':'Proveeduría de yerba',x,z,width:type==='wood'?2.2:type==='food'?2.4:1.8,depth:type==='wood'?1.7:type==='food'?2.4:1.4,remaining:type==='wood'?300:220,group};state.nodes.push(node);register(group,node);
 }
 // Resources sit on vacant lots near the sidewalk; those lots can be built once the resource runs out.
 const vacant=(type,bx,bz,side,slot)=>{const spot=lotSpot(bx,bz,side,slot,1,4.4);addNode(type,spot.x,spot.z);};
 for(const args of [[0,0,'N',6],[0,-30,'S',5],[-30,0,'S',3],[30,0,'W',0],[0,30,'N',1],[-30,-30,'S',4]])vacant('wood',...args);
 for(const args of [[-30,30,'E',0],[0,30,'N',5],[30,30,'W',1],[-30,-30,'E',1]])vacant('food',...args);
 for(const args of [[0,0,'W',0],[30,0,'S',2],[0,-30,'E',1]])vacant('yerba',...args);
 // Grass tufts grow in the backyards, which are never built on.
 const tufts=1600,grass=new THREE.InstancedMesh(new THREE.ConeGeometry(.04,.22,3),mat('#b6b783'),tufts);const dummy=new THREE.Object3D();const core=BLOCK_HALF-LOT_DEPTH-.3;
 for(let i=0;i<tufts;i++){const bx=BLOCKS[Math.floor(rand()*3)],bz=BLOCKS[Math.floor(rand()*3)];dummy.position.set(bx+(rand()*2-1)*core,.3,bz+(rand()*2-1)*core);dummy.rotation.y=rand()*6;dummy.updateMatrix();grass.setMatrixAt(i,dummy.matrix);}scene.add(grass);
 // Parked cars along the curbs: [x, z, colour, parked along x].
 for(const [x,z,c,alongX]of[[-14.45,-6,'#a76551'],[15.55,21,'#d9cda4'],[-44.45,8,'#5f8b96'],[4,15.55,'#b98c4f',true],[-24,-14.45,'#7b8e9a',true],[33,44.45,'#a76551',true]]){const g=new THREE.Group();g.position.set(x,.09,z);if(alongX)g.rotation.y=Math.PI/2;statics.add(g);box(.95,.39,1.9,c,0,.45,0,g);box(.8,.36,1.03,'#789496',0,.78,-.1,g);box(.86,.07,1.08,c,0,.97,-.1,g);for(const xx of [-.49,.49])for(const zz of [-.56,.56]){const wheel=cyl(.2,.13,'#4e514b',xx,.24,zz,g,10);wheel.rotation.z=Math.PI/2;}obstacles.push({x,z,width:alongX?1.9:.95,depth:alongX?.95:1.9});}
 mergeGroup(statics);
 return{pickables,obstacles,register,makeBuilding,removeBuilding,setProgress,animateWorld};
}

export function buildingPreviews(){const result={};const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setSize(240,160);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight('#fff0d1','#66734e',3));const sun=new THREE.DirectionalLight('#fff4d7',3);sun.position.set(-5,9,8);scene.add(sun);const camera=new THREE.OrthographicCamera(-5.4,5.4,3.6,-3.6,.1,60);camera.position.set(9,11,13);camera.lookAt(0,.7,0);
 for(const type of Object.keys(BUILDINGS)){const b=architecture(type);b.scale.setScalar(Math.min(1,7/BUILDINGS[type].size));scene.add(b);renderer.render(scene,camera);result[type]=renderer.domElement.toDataURL('image/png');scene.remove(b);b.traverse(o=>o.geometry?.dispose());}renderer.dispose();return result;}
