// =====================
// Canvas
// =====================

const canvas =
document.getElementById(
    "gameCanvas"
);

const ctx =
canvas.getContext(
    "2d"
);

function resizeCanvas() {

    canvas.width =
        canvas.clientWidth;

    canvas.height =
        canvas.clientHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

// =====================
// ตัวแปรเกม
// =====================

let birds = [];

let particles = [];

let autoTimer = 0;

// =====================
// สร้างนก
// =====================

function spawnBird() {

    const type =
        BIRDS[
            Math.floor(
                Math.random() *
                BIRDS.length
            )
        ];

    birds.push({

        x: -50,

        y:
            Math.random() *
            (
                canvas.height -
                100
            ),

        width: 40,

        height: 40,

        speed:
            type.speed,

        reward:
            type.reward,

        hp:
            type.hp,

        emoji:
            type.emoji

    });

}

// =====================
// สุ่มเกิดนก
// =====================

setInterval(() => {

    spawnBird();

}, 1200);

// =====================
// ยิงนก
// =====================

canvas.addEventListener(
    "click",
    function(event) {

        const rect =
            canvas
            .getBoundingClientRect();

        const mouseX =
            event.clientX -
            rect.left;

        const mouseY =
            event.clientY -
            rect.top;

        birds.forEach(
            (
                bird,
                index
            ) => {

            if (

    mouseX >
    bird.x - 25 &&

    mouseX <
    bird.x +
    bird.width + 25 &&

    mouseY >
    bird.y - 25 &&

    mouseY <
    bird.y +
    bird.height + 25

) {

                bird.hp -=
                    player.damage;

                if (
                    bird.hp <= 0
                ) {

                    let reward =
                        bird.reward;

                    reward *=
                        player.moneyMultiplier;

                    if (
                        player.currentPet
                        !== null
                    ) {

                        reward *=
                        PETS[
                            player.currentPet
                        ]
                        .moneyBonus;

                    }

                    reward *=
                        (
                            1 +
                            player.rebirths
                        );

                    player.money +=
                        reward;

                    player.kills++;

                    createFloatingText(
                        "+" +
                        Math.floor(
                            reward
                        ),
                        mouseX,
                        mouseY
                    );

                    birds.splice(
                        index,
                        1
                    );

                    updateQuest();

                    updateUI();

                    saveGame();

                }

            }

        });

    }
);

// =====================
// ข้อความลอย
// =====================

function createFloatingText(
    text,
    x,
    y
) {

    particles.push({

        text,

        x,

        y,

        life:60

    });

}

// =====================
// เควส
// =====================

function updateQuest() {

    const quest =
        QUESTS[
            player.questIndex
        ];

    if (
        !quest
    )
    return;

    if (
        player.kills >=
        quest.target
    ) {

        document
        .getElementById(
            "claimQuest"
        )
        .disabled = false;

    }

    updateQuestUI();

}

function updateQuestUI() {

    const quest =
        QUESTS[
            player.questIndex
        ];

    if (!quest)
        return;

    document
    .getElementById(
        "questText"
    )
    .textContent =

        "ยิงนก " +
        quest.target +
        " ตัว (" +
        player.kills +
        "/" +
        quest.target +
        ")";

}

// =====================
// รับเควส
// =====================

document
.getElementById(
    "claimQuest"
)
.addEventListener(
    "click",
    function() {

        const quest =
            QUESTS[
                player.questIndex
            ];

        if (
            !quest
        )
        return;

        if (
            player.kills <
            quest.target
        ) {

            alert(
                "เควสยังไม่สำเร็จ"
            );

            return;

        }

        player.money +=
            quest.reward;

        player.questIndex++;

        updateUI();

        saveGame();

        alert(
            "🎁 ได้รับ "
            +
            quest.reward
            +
            " เงิน"
        );

    }
);

// =====================
// Auto Shoot
// =====================

function autoShoot() {

    if (
        !player.autoShoot
    )
    return;

    if (
        birds.length <= 0
    )
    return;

    const bird =
        birds[0];

    bird.hp -=
        player.damage;

    if (
        bird.hp <= 0
    ) {

        player.money +=
            bird.reward;

        player.kills++;

        birds.shift();

        updateQuest();

        updateUI();

    }

}

// =====================
// เปลี่ยนแมพ
// =====================

document
.getElementById(
    "mapSelect"
)
.addEventListener(
    "change",
    function() {

        const map =
            MAPS[
                this.value
            ];

        if (
            player.money <
            map.unlock
        ) {

            alert(
                "ปลดล็อกไม่สำเร็จ"
            );

            return;

        }

        player.currentMap =
            this.value;

        canvas.style
        .background =
            map.color;

        saveGame();

    }
);

// =====================
// วาดนก
// =====================

function drawBirds() {

    birds.forEach(
        bird => {

        ctx.font =
            "32px Arial";

        ctx.fillText(
            bird.emoji,
            bird.x,
            bird.y
        );

    });

}

// =====================
// อัปเดตนก
// =====================

function updateBirds() {

    birds.forEach(
        (
            bird,
            index
        ) => {

        bird.x +=
            bird.speed;

        if (
            bird.x >
            canvas.width
        ) {

            birds.splice(
                index,
                1
            );

        }

    });

}

// =====================
// วาดเอฟเฟกต์
// =====================

function drawParticles() {

    particles.forEach(
        (
            p,
            index
        ) => {

        ctx.fillStyle =
            "gold";

        ctx.font =
            "20px Arial";

        ctx.fillText(
            p.text,
            p.x,
            p.y
        );

        p.y -= 1;

        p.life--;

        if (
            p.life <= 0
        ) {

            particles.splice(
                index,
                1
            );

        }

    });

}

// =====================
// Game Loop
// =====================

function gameLoop() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    updateBirds();

    drawBirds();

    drawParticles();

    autoTimer++;

    if (
        autoTimer >= 30
    ) {

        autoShoot();

        autoTimer = 0;

    }

    requestAnimationFrame(
        gameLoop
    );

}

updateUI();

updateQuestUI();

claimDailyReward();

gameLoop();
