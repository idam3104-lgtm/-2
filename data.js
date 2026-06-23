// =======================
// นกทั้งหมด
// =======================

const BIRDS = [
{
    name:"Kiwi",
    emoji:"🥝",
    reward:10,
    speed:2,
    hp:1
},
{
    name:"Golden Kiwi",
    emoji:"✨",
    reward:50,
    speed:3,
    hp:2
},
{
    name:"Diamond Kiwi",
    emoji:"💎",
    reward:100,
    speed:4,
    hp:3
},
{
    name:"Galaxy Kiwi",
    emoji:"🌌",
    reward:500,
    speed:5,
    hp:5
}
];

// =======================
// สัตว์เลี้ยง
// =======================

const PETS = [
{
    id:0,
    name:"Baby Kiwi",
    cost:2000,
    moneyBonus:1.1
},
{
    id:1,
    name:"Golden Kiwi Pet",
    cost:10000,
    moneyBonus:1.5
},
{
    id:2,
    name:"Diamond Kiwi Pet",
    cost:50000,
    moneyBonus:2
}
];

// =======================
// แมพ
// =======================

const MAPS = {
forest:{
    name:"Forest",
    color:"#87CEEB",
    unlock:0
},

snow:{
    name:"Snow",
    color:"#DDF4FF",
    unlock:5000
},

lava:{
    name:"Lava",
    color:"#FF7B54",
    unlock:25000
},

space:{
    name:"Space",
    color:"#111111",
    unlock:100000
}
};

// =======================
// เควส
// =======================

const QUESTS = [
{
    target:25,
    reward:500
},
{
    target:100,
    reward:2500
},
{
    target:250,
    reward:10000
},
{
    target:1000,
    reward:50000
}
];

// =======================
// รางวัลรายวัน
// =======================

const DAILY_REWARDS = [
100,
250,
500,
1000,
2500,
5000,
10000
];

// =======================
// ค่าเริ่มต้นผู้เล่น
// =======================

const DEFAULT_SAVE = {

money:0,

kills:0,

damage:1,

rebirths:0,

moneyMultiplier:1,

autoShoot:false,

currentPet:null,

currentMap:"forest",

questIndex:0,

lastDaily:0

};
