import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire('C:/Users/mboth/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});await page.waitForFunction(()=>!!window.gameInspect);
const snapshot=()=>page.evaluate(()=>window.gameSnapshot());
const project=async(x,z,y=0)=>page.evaluate(p=>window.gameInspect.project(...p),[x,z,y]);
const clickWorld=async(x,z,y=0,button='left')=>{const p=await project(x,z,y);await page.mouse.click(p.x,p.y,{button});};
try{
 assert.equal(await page.locator('h1').innerText(),'Tero Cosechado\n01');
 // Select a real person from the UI and issue a world-space resource order.
 await page.locator('#neighbors-tab').click();await page.locator('[data-unit="0"]').click();
 await clickWorld(-10.55,1.55,.45,'right');
 await page.waitForFunction(()=>window.gameSnapshot().gathered>=2,{},{timeout:30000});
 assert.ok((await snapshot()).resources.wood>=282);
 console.log('PASS: material collection, movement and resource accounting');
 await page.locator('#stop-unit').click();
 // Build a real house, letting the worker path to the construction site and finish it.
 await page.locator('#build-tab').click();await page.locator('[data-building="casa_chorizo"]').click();
 const before=await snapshot();await clickWorld(-14,0);
 await page.waitForFunction(n=>window.gameSnapshot().buildings.length>n,before.buildings.length,{timeout:3000});
 const during=await snapshot();assert.equal(Math.floor(during.resources.wood),Math.floor(before.resources.wood)-70);
 await page.waitForFunction(()=>window.gameSnapshot().buildings.some(b=>b.x===-14&&b.z===0&&b.progress===1),{},{timeout:40000});
 assert.equal((await snapshot()).capacity,before.capacity+4);
 console.log('PASS: chorizo footprint, placement, cost, construction and housing capacity');
 // Streets must reject a building without charging the player.
 await page.locator('[data-building="casa_chorizo"]').click();const invalidBefore=await snapshot();await clickWorld(6,12);assert.equal((await snapshot()).buildings.length,invalidBefore.buildings.length);assert.equal((await snapshot()).resources.wood,invalidBefore.resources.wood);await page.keyboard.press('Escape');
 console.log('PASS: no construction on roads, no resource loss on invalid placement');
 // Rotation can be reached by keyboard and cancelled without cost.
 await page.locator('[data-building="casa_chorizo"]').click();await page.keyboard.press('r');await page.keyboard.press('Escape');assert.equal((await snapshot()).placing,null);
 await page.locator('#neighbors-tab').click();const invitationBefore=await snapshot();await page.locator('#invite-list').click();assert.equal((await snapshot()).units.length,invitationBefore.units.length+1);assert.equal((await snapshot()).resources.yerba,invitationBefore.resources.yerba-3);
 await page.locator('#pause').click();const paused=await snapshot();await page.waitForTimeout(500);assert.equal((await snapshot()).time,paused.time);await page.locator('#save').click();await page.locator('#load').click();const loaded=await snapshot();assert.equal(loaded.units.length,paused.units.length);assert.equal(loaded.buildings.length,paused.buildings.length);assert.equal(loaded.resources.wood,paused.resources.wood);assert.equal(loaded.capacity,paused.capacity);
 console.log('PASS: invite, pause, save/load preserve constructed houses and resources');
 // The requested potrero is a real buildable open space, with no housing bonus.
 await page.locator('#build-tab').click();const beforePotrero=await snapshot();await page.keyboard.press('7');await clickWorld(12,12);
 await page.waitForFunction(()=>window.gameSnapshot().buildings.some(b=>b.type==='potrero'&&b.progress===1),{},{timeout:45000});
 const afterPotrero=await snapshot();assert.equal(afterPotrero.resources.wood,beforePotrero.resources.wood-45);assert.equal(afterPotrero.capacity,beforePotrero.capacity);
 assert.ok(await page.locator('[data-building="club"]').count());
 console.log('PASS: club is in the catalog; potrero constructs for 45 materials without adding housing');
 await page.locator('#build-tab').click();await page.screenshot({path:'preview-desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'preview-mobile.png'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);console.log('PASS: responsive layout and no browser runtime errors');
}catch(error){await page.screenshot({path:'playthrough-failure.png'});console.log('Failure snapshot',await snapshot(),await page.locator('#toast').textContent());throw error;}finally{await browser.close();}
