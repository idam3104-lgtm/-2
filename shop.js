// ======================
// อัปเดต UI
// ======================

function updateUI() {

    document.getElementById(
        "money"
    ).textContent =
        Math.floor(
            player.money
        );

    document.getElementById(
        "rebirths"
    ).textContent =
        player.rebirths;

    document.getElementById(
        "kills"
    ).textContent =
        player.kills;

    updateQuestUI();

}

// ======================
// ซื้อดาเมจ
// ======================

function buyDamage() {

    const cost =
        player.damage * 100;

    if (
        player.money < cost
    ) {
        alert(
            "เงินไม่พอ"
        );
        return;
    }

    player.money -= cost;

    player.damage++;

    updateUI();

    saveGame();

}

// ======================
// ซื้อ Auto Shoot
// ======================

function buyAutoShoot() {

    if (
        player.autoShoot
    ) {

        alert(
            "มีแล้ว"
        );

        return;
    }

    const cost = 500;

    if (
        player.money < cost
    ) {

        alert(
            "เงินไม่พอ"
        );

        return;
    }

    player.money -= cost;

    player.autoShoot = true;

    updateUI();

    saveGame();

    alert(
        "🔫 Auto Shoot เปิดใช้งานแล้ว"
    );

}

// ======================
// ซื้อเงิน x2
// ======================

function buyMoneyBoost() {

    const cost = 1000;

    if (
        player.money < cost
    ) {

        alert(
            "เงินไม่พอ"
        );

        return;
    }

    player.money -= cost;

    player.moneyMultiplier *= 2;

    updateUI();

    saveGame();

}

// ======================
// ซื้อสัตว์เลี้ยง
// ======================

function buyPet() {

    if (
        player.currentPet !== null
    ) {

        alert(
            "มีสัตว์เลี้ยงแล้ว"
        );

        return;
    }

    const pet =
        PETS[0];

    if (
        player.money <
        pet.cost
    ) {

        alert(
            "เงินไม่พอ"
        );

        return;
    }

    player.money -= pet.cost;

    player.currentPet =
        pet.id;

    document.getElementById(
        "petStatus"
    ).textContent =
        pet.name;

    updateUI();

    saveGame();

}

// ======================
// รีเบิร์ธ
// ======================

function rebirth() {

    const cost =
        10000 *
        (
            player.rebirths + 1
        );

    if (
        player.money < cost
    ) {

        alert(
            "เงินไม่พอ"
        );

        return;
    }

    player.money = 0;

    player.kills = 0;

    player.damage = 1;

    player.rebirths++;

    player.moneyMultiplier =
        1 +
        (
            player.rebirths * 0.5
        );

    saveGame();

    updateUI();

    alert(
        "⭐ รีเบิร์ธสำเร็จ"
    );

}

// ======================
// ปลดล็อกแมพ
// ======================

function unlockMap(
    mapName
) {

    const map =
        MAPS[mapName];

    if (!map)
        return;

    if (
        player.money <
        map.unlock
    ) {

        alert(
            "เงินไม่พอ"
        );

        return;
    }

    player.money -=
        map.unlock;

    player.currentMap =
        mapName;

    saveGame();

    updateUI();

}

// ======================
// Event
// ======================

document
.getElementById(
    "buyDamage"
)
.addEventListener(
    "click",
    buyDamage
);

document
.getElementById(
    "buyAuto"
)
.addEventListener(
    "click",
    buyAutoShoot
);

document
.getElementById(
    "buyMoney"
)
.addEventListener(
    "click",
    buyMoneyBoost
);

document
.getElementById(
    "buyPet"
)
.addEventListener(
    "click",
    buyPet
);

document
.getElementById(
    "rebirthBtn"
)
.addEventListener(
    "click",
    rebirth
);

updateUI();
