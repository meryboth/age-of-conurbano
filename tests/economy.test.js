import test from 'node:test';
import assert from 'node:assert/strict';
import { BUILDINGS, BLOCKS, STREETS, BLOCK_HALF, canAfford, overlaps, footprint, lotSpot, lotPlacement, allPlacements } from '../src/economy.js';

const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} ≠ ${b}`);
// Footprint rectangle of a placed building, as the game stores it.
const rect=(spec,p)=>({x:p.x,z:p.z,...footprint(spec,p.rotation)});
const inside=(r,bx,bz)=>Math.abs(r.x-bx)+r.width/2<=BLOCK_HALF+1e-9&&Math.abs(r.z-bz)+r.depth/2<=BLOCK_HALF+1e-9;

test('building costs require both resources, including exact-cost purchases', () => {
  assert.equal(canAfford({wood:90,food:25},BUILDINGS.almacen),true);
  assert.equal(canAfford({wood:90,food:24},BUILDINGS.almacen),false);
  assert.equal(canAfford({wood:69,food:100},BUILDINGS.casa_chorizo),false);
});
test('buildings reserve their footprint and circulation space', () => {
  const town=[{x:0,z:0,width:3,depth:6}];
  assert.equal(overlaps(2,0,3,6,town),true);
  assert.equal(overlaps(4,0,3,6,town),false);
  assert.equal(overlaps(0,5,3,6,town),true);
});
test('rotating an elongated house swaps its lot dimensions',()=>{
  assert.deepEqual(footprint(BUILDINGS.casa_chorizo,0),{width:3,depth:6});
  assert.deepEqual(footprint(BUILDINGS.casa_chorizo,Math.PI/2),{width:6,depth:3});
  assert.deepEqual(footprint(BUILDINGS.casa_chorizo,Math.PI),{width:3,depth:6});
  assert.deepEqual(footprint(BUILDINGS.casa_chorizo,Math.PI*1.5),{width:6,depth:3});
});
test('manzanas sit between streets, 30 units apart',()=>{
  for(const b of BLOCKS)assert.ok(STREETS.some(s=>Math.abs(s-(b-15))<1e-9)&&STREETS.some(s=>Math.abs(s-(b+15))<1e-9));
});
test('each manzana has eighteen lots and every building fits inside its manzana',()=>{
  assert.equal(allPlacements({lots:1,depth:6}).length,BLOCKS.length**2*18);
  for(const spec of Object.values(BUILDINGS))for(const p of allPlacements(spec))assert.ok(inside(rect(spec,p),...p.block),`${spec.name} ${p.side}${p.slot}`);
});
test('fronts face the street of their side',()=>{
  const spec=BUILDINGS.casa_chorizo;
  for(const [side,dx,dz] of [['N',0,-1],['S',0,1],['E',1,0],['W',-1,0]]){
    const p=lotSpot(0,0,side,0,1,spec.depth);
    close(Math.round(Math.sin(p.rotation)),dx);close(Math.round(Math.cos(p.rotation)),dz);
    const front=dx?p.x+dx*spec.depth/2:p.z+dz*spec.depth/2;
    close(Math.abs(front),BLOCK_HALF);
  }
});
test('neighbouring lots never overlap, even for full-width buildings',()=>{
  const spec=BUILDINGS.almacen,row=allPlacements(spec).filter(p=>p.block[0]===0&&p.block[1]===0&&p.side==='S');
  assert.equal(row.length,7);
  for(let i=1;i<row.length;i++)assert.equal(overlaps(row[i].x,row[i].z,spec.width,spec.depth,[rect(spec,row[i-1])],0),false);
});
test('wide buildings only use rows with enough lots',()=>{
  assert.equal(lotSpot(0,0,'E',0,4,10),null);
  assert.equal(lotSpot(0,0,'N',4,4,10),null);
  const p=lotPlacement(BUILDINGS.potrero,10,0);
  assert.ok(p.side==='N'||p.side==='S');
  assert.ok(inside(rect(BUILDINGS.potrero,p),0,0));
});
test('the pointer snaps to the lot row under it',()=>{
  const spec=BUILDINGS.casa_chorizo;
  const south=lotPlacement(spec,0.2,11);
  assert.deepEqual([south.side,south.slot,south.block],['S',3,[0,0]]);
  const west=lotPlacement(spec,-29-11,31);
  assert.deepEqual([west.side,west.block],['W',[-30,30]]);
  assert.equal(lotPlacement(spec,80,0),null);
});
test('only the ends of the long rows are corner lots',()=>{
  const corners=allPlacements(BUILDINGS.almacen).filter(p=>p.block[0]===0&&p.block[1]===0&&p.corner);
  assert.deepEqual(corners.map(p=>p.side+p.slot).sort(),['N0','N6','S0','S6']);
  assert.equal(lotPlacement(BUILDINGS.conventillo,-12,11).corner,true);
});
