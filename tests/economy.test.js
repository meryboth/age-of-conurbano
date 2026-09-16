import test from 'node:test';
import assert from 'node:assert/strict';
import { BUILDINGS, canAfford, overlaps, validTerrain, footprint, facesStreet } from '../src/economy.js';

test('building costs require both resources, including exact-cost purchases', () => {
  assert.equal(canAfford({wood:90,food:25},BUILDINGS.almacen),true);
  assert.equal(canAfford({wood:90,food:24},BUILDINGS.almacen),false);
  assert.equal(canAfford({wood:69,food:100},BUILDINGS.casa_chorizo),false);
});
test('placement reserves streets, sidewalks, railway and map edges', () => {
  assert.equal(validTerrain(0,0,3,6),true);
  assert.equal(validTerrain(27,0,3,6),false);
  assert.equal(validTerrain(0,27,3,6),false);
  assert.equal(validTerrain(6,0,3,6),false);
  assert.equal(validTerrain(4,0,3,6),false);
  assert.equal(validTerrain(0,4,3,6),false);
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
});
test('housing fronts must face a nearby street',()=>{
  assert.equal(facesStreet(0,0,BUILDINGS.casa_chorizo,0),true);
  assert.equal(facesStreet(0,0,BUILDINGS.casa_chorizo,Math.PI/2),true);
  assert.equal(facesStreet(0,-2,BUILDINGS.casa_chorizo,0),false);
  assert.equal(facesStreet(0,2,BUILDINGS.casa_chorizo,0),false);
});
