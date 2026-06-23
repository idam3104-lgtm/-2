// ======================
// ระบบเซฟข้อมูล
// ======================

const SAVE_KEY = "KIWI_HUNTER_SAVE";

function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(player)
    );

}

// ======================
// โหลดข้อมูล
// ======================

function loadGame() {

    const saveData =
        localStorage.getItem(SAVE_KEY);

    if (!saveData) {

        player = {
            ...DEFAULT_SAVE
        };

        return;
    }

    try {

        player = {
            ...DEFAULT_SAVE,
            ...JSON.parse(saveData)
        };

    } catch (err) {

        console.error(err);

        player = {
            ...DEFAULT_SAVE
        };

    }

}

// ======================
// รีเซ็ตข้อมูล
// ======================

function resetSave() {

    localStorage.removeItem(
        SAVE_KEY
    );

    location.reload();

}

// ======================
// เซฟอัตโนมัติ
// ======================

setInterval(() => {

    saveGame();

}, 5000);

// ======================
// Daily Reward
// ======================

function claimDailyReward() {

    const now = Date.now();

    const day =
        1000 * 60 * 60 * 24;

    if (
        now - player.lastDaily
        < day
    ) {

        const remain =
            Math.ceil(
                (
                    day -
                    (now - player.lastDaily)
                ) / 1000 / 60
            );

        alert(
            "รับแล้ว รออีก "
            + remain +
            " นาที"
        );

        return;
    }

    const reward =
        DAILY_REWARDS[
            Math.floor(
                Math.random() *
                DAILY_REWARDS.length
            )
        ];

    player.money += reward;

    player.lastDaily = now;

    saveGame();

    updateUI();

    alert(
        "🎁 ได้รับ "
        + reward +
        " เงิน"
    );

}

// ======================
// Leaderboard Local
// ======================

function updateLeaderboard() {

    const board = {

        money:
            player.money,

        kills:
            player.kills,

        rebirths:
            player.rebirths

    };

    localStorage.setItem(
        "KIWI_LEADERBOARD",
        JSON.stringify(board)
    );

}

// ======================
// Export Save
// ======================

function exportSave() {

    const data =
        JSON.stringify(
            player
        );

    navigator.clipboard
        .writeText(data);

    alert(
        "คัดลอกเซฟแล้ว"
    );

}

// ======================
// Import Save
// ======================

function importSave() {

    const text =
        prompt(
            "วางเซฟ"
        );

    if (!text)
        return;

    try {

        player =
            JSON.parse(text);

        saveGame();

        updateUI();

        alert(
            "นำเข้าเสร็จ"
        );

    } catch {

        alert(
            "เซฟไม่ถูกต้อง"
        );

    }

}

// ======================
// โหลดตอนเปิดเกม
// ======================

let player = {
    ...DEFAULT_SAVE
};

loadGame();
