// Barrio layout: a 3 × 3 grid of manzanas with streets every 30 units. Each manzana is subdivided into lots:
// seven along the north and south streets and two along the east and west streets; the core is private backyards.
export const BLOCKS=[-30,0,30];
export const STREETS=[-45,-15,15,45];
export const MAP_HALF=47;
export const BLOCK_HALF=12.7;
export const LOT_WIDTH=3.6;
export const LOT_DEPTH=8;
export const ROW_LOTS={N:7,S:7,E:2,W:2};
export const BUILDINGS={
 casa_chorizo:{name:'Casa chorizo',subtitle:'Habitaciones, galería y patio',wood:70,food:0,time:11,width:3,depth:6,size:6,lots:1,capacity:4,description:'Aloja a 4 vecinos. Habitaciones en hilera sobre una medianera, galería y patio lateral; zaguán al frente y servicios al fondo.',icon:'house',footprint:'1 lote · 3 × 6'},
 almacen:{name:'Almacén',subtitle:'Provisiones a la vuelta',wood:90,food:25,time:13,width:3.5,depth:3.6,size:3.6,lots:1,capacity:0,description:'Local a la calle, vidriera y depósito atrás. Produce 1 de yerba cada 5 segundos, o 2 si está en un lote de esquina; la yerba permite invitar nuevos vecinos.',icon:'store',footprint:'1 lote · mejor en esquina'},
 conventillo:{name:'Conventillo',subtitle:'Un patio, muchas historias',wood:150,food:35,time:20,width:6,depth:6,size:6,lots:2,capacity:8,description:'Aloja a 8 vecinos. Cuartos alrededor de un patio compartido, galerías de acceso y servicios comunes al fondo.',icon:'users-round',footprint:'2 lotes · 6 × 6'},
 huerta:{name:'Lote de soja',subtitle:'La cosecha del borde urbano',wood:40,food:0,time:7,width:3.4,depth:6,size:6,lots:1,capacity:0,description:'Surcos de soja en un lote abierto. Produce 3 de soja cada 5 segundos para abastecer la economía del barrio.',icon:'sprout',footprint:'1 lote · 3,4 × 6'},
 taller:{name:'Taller',subtitle:'Oficios que levantan el barrio',wood:100,food:20,time:15,width:4,depth:4.8,size:4.8,lots:2,capacity:0,description:'Nave de trabajo con portón, banco y depósito. Las herramientas aumentan un 25% la recuperación de materiales. El efecto no se acumula.',icon:'hammer',footprint:'2 lotes · 4 × 4,8'},
 club:{name:'Club de barrio',subtitle:'La casa de todos',wood:140,food:30,time:18,width:6,depth:6,size:6,lots:2,capacity:0,description:'Salón social, buffet y vereda de encuentro. Con un club terminado, invitar a un vecino cuesta 25 de soja y 3 de yerba. El beneficio no se acumula.',icon:'landmark',footprint:'2 lotes · 6 × 6'},
 potrero:{name:'Potrero de fútbol',subtitle:'La pelota siempre vuelve',wood:45,food:0,time:8,width:14,depth:10,size:14,lots:4,capacity:0,description:'Un baldío de cuatro lotes con césped desparejo, arcos y alambrado. Un espacio de juego para la cuadra; no produce recursos ni suma viviendas.',icon:'goal',footprint:'4 lotes · 14 × 10'},
};
// The sociedad de fomento is part of the starting barrio and cannot be built.
export const CENTRO={width:4.5,depth:4.4,size:4.8,lots:2};
export function canAfford(resources,spec){return resources.wood>=spec.wood&&resources.food>=spec.food;}
export function footprint(spec,rotation=0){const swap=Math.round(rotation/(Math.PI/2))%2!==0;return {width:swap?spec.depth:spec.width,depth:swap?spec.width:spec.depth};}
export function overlaps(x,z,width,depth,buildings,gap=.35){return buildings.some(b=>Math.abs(b.x-x)<(b.width+width)/2+gap&&Math.abs(b.z-z)<(b.depth+depth)/2+gap);}
// Centre and orientation of something `lots` wide and `depth` deep, fronting the street on one side of a manzana.
// The architecture faces +z, so the rotation turns that front toward the street.
export function lotSpot(bx,bz,side,slot,lots=1,depth=LOT_DEPTH){const count=ROW_LOTS[side];if(!count||slot<0||slot+lots>count)return null;
 const along=-count*LOT_WIDTH/2+LOT_WIDTH*(slot+lots/2),inset=BLOCK_HALF-depth/2;
 if(side==='N')return {x:bx+along,z:bz-inset,rotation:Math.PI};
 if(side==='S')return {x:bx+along,z:bz+inset,rotation:0};
 if(side==='E')return {x:bx+inset,z:bz+along,rotation:Math.PI/2};
 return {x:bx-inset,z:bz+along,rotation:Math.PI*1.5};}
function describe(bx,bz,side,slot,spec){const spot=lotSpot(bx,bz,side,slot,spec.lots,spec.depth);if(!spot)return null;const count=ROW_LOTS[side];return {...spot,block:[bx,bz],side,slot,corner:(side==='N'||side==='S')&&(slot===0||slot+spec.lots===count)};}
const nearest=v=>BLOCKS.reduce((a,b)=>Math.abs(b-v)<Math.abs(a-v)?b:a);
// Snaps a pointer position to the lot row under it. Wide buildings that do not fit on a short side use the nearest long side.
export function lotPlacement(spec,px,pz){const bx=nearest(px),bz=nearest(pz),lx=px-bx,lz=pz-bz;if(Math.abs(lx)>15||Math.abs(lz)>15)return null;
 let side=lz<-BLOCK_HALF+LOT_DEPTH?'N':lz>BLOCK_HALF-LOT_DEPTH?'S':lx<0?'W':'E';if(spec.lots>ROW_LOTS[side])side=lz<0?'N':'S';
 const count=ROW_LOTS[side],along=side==='N'||side==='S'?lx:lz;const slot=Math.max(0,Math.min(count-spec.lots,Math.round((along+count*LOT_WIDTH/2)/LOT_WIDTH-spec.lots/2)));
 return describe(bx,bz,side,slot,spec);}
export function allPlacements(spec){const result=[];for(const bx of BLOCKS)for(const bz of BLOCKS)for(const side of Object.keys(ROW_LOTS))for(let slot=0;slot+spec.lots<=ROW_LOTS[side];slot++)result.push(describe(bx,bz,side,slot,spec));return result;}
