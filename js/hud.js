let health = document.getElementById('health');
let armour = document.getElementById('armour');
let virus = document.getElementById('virus');
let money = document.getElementById('money');
let ammo = document.getElementById('ammo');
let wanted = document.getElementById('wanted');
let gun = document.getElementById('gunid');

cef.emit("game:hud:setComponentVisible", "interface", false);
cef.emit("game:data:pollPlayerStats", true, 50);

cef.on("game:hud:newVisibleState", (success) => cef.hide(!success));
cef.on("hud:virus", (value) => virus.value = value);
cef.on("game:data:playerStats", (hp, max_hp, arm, breath, wanteds, weapon, ammos, max_ammo, moneys, speed) => {
	health.value = hp;
	armour.value = arm;
	money.innerHTML = moneys;
	gun.src = "/image/guns/" + weapon + ".png";
	
	if(wanteds > 10) return;
	else wanted.src = "/image/wanted/wanted-" + wanteds + ".png";
	
	if(weapon == 0)	ammo.innerHTML = "";
	else ammo.innerHTML = ammos + "/" + max_ammo;
});