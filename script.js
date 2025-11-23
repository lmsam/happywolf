// Bilingual Dictionary
const i18n = {
    'zh-HK': {
        appTitle: '終極一夜狼人殺',
        appSubtitle: '主持人助手',
        settingsTitle: '遊戲設定',
        playerCountLabel: '玩家人數',
        volumeLabel: '音量',
        deckTitle: '建立牌庫',
        deckHint: '請選擇 {target} 張卡牌 (人數 + 3)',
        libraryTitle: '角色庫',
        selectedTitle: '已選卡牌',
        confirmDeckBtn: '確認牌庫',
        passToPlayer: '請傳給玩家 {n}',
        revealBtn: '查看身份',
        nextBtn: '下一位',
        startNightBtn: '入夜',
        roleTitle: '你的身份是',
        centerCards: '中間卡牌',
        abilityTitle: '能力',
        wakeOrderTitle: '行動次序',
        tipsTitle: '攻略',
        teamVillage: '好人陣營',
        teamWerewolf: '狼人陣營',
        teamTanner: '皮匠陣營',
        wakeFirst: '最先',
        wakeMiddle: '中間',
        wakeLast: '最後',
        wakeNone: '無 (不需喚醒)',
        
        startBtn: '開始遊戲 (入夜)',
        stopBtn: '結束遊戲',
        ready: '準備中...',
        nightStart: '天黑請閉眼',
        nightStartScript: '天黑請閉眼。所有人，請閉眼。',
        action: '行動中',
        dayStart: '天光！',
        dayStartScript: '天光！所有人請擘大眼。',
        discussion: '討論時間',
        vote: '請投票！',
        voteScript: '時間到！請投票！',
        alertDeckCount: '請選擇 {target} 張卡牌！'
    },
    'en-US': {
        appTitle: 'One Night Ultimate Werewolf',
        appSubtitle: 'Moderator App',
        settingsTitle: 'Settings',
        playerCountLabel: 'Players',
        volumeLabel: 'Volume',
        deckTitle: 'Build Deck',
        deckHint: 'Select {target} cards (Players + 3)',
        libraryTitle: 'Library',
        selectedTitle: 'Selected',
        confirmDeckBtn: 'Confirm Deck',
        passToPlayer: 'Pass to Player {n}',
        revealBtn: 'Reveal Identity',
        nextBtn: 'Next Player',
        startNightBtn: 'Start Night',
        roleTitle: 'You are',
        centerCards: 'Center Cards',
        abilityTitle: 'Ability',
        wakeOrderTitle: 'Wake Order',
        tipsTitle: 'Tips',
        teamVillage: 'Village Team',
        teamWerewolf: 'Werewolf Team',
        teamTanner: 'Tanner Team',
        wakeFirst: 'First',
        wakeMiddle: 'Middle',
        wakeLast: 'Last',
        wakeNone: 'None (Do not wake)',

        startBtn: 'Start Game (Night)',
        stopBtn: 'End Game',
        ready: 'Ready...',
        nightStart: 'Night Falls',
        nightStartScript: 'Night falls. Everyone, close your eyes.',
        action: 'Waking Up',
        dayStart: 'Daybreak!',
        dayStartScript: 'Daybreak! Everyone, open your eyes.',
        discussion: 'Discussion',
        vote: 'Vote!',
        voteScript: 'Time is up! Please vote!',
        alertDeckCount: 'Please select {target} cards!'
    }
};

const rolesData = [
    { 
        id: 'doppelganger', 
        name: { 'zh-HK': '化身幽靈', 'en-US': 'Doppelgänger' },
        desc: { 'zh-HK': '複製另一個玩家的技能。', 'en-US': 'Look at another player\'s card and become that role.' },
        tips: { 'zh-HK': '如果睇到狼人，你就會變成狼人！', 'en-US': 'If you see a Werewolf, you become a Werewolf!' },
        team: 'village', // Variable, but starts as village usually
        wakeOrder: 1, duration: 10, 
        scriptStart: { 'zh-HK': '化身幽靈請擘大眼，睇一張其他人嘅牌', 'en-US': 'Doppelgänger, wake up and look at another player\'s card.' },
        scriptEnd: { 'zh-HK': '化身幽靈請閉眼', 'en-US': 'Doppelgänger, close your eyes.' }
    },
    { 
        id: 'werewolf', 
        name: { 'zh-HK': '狼人', 'en-US': 'Werewolf' },
        desc: { 'zh-HK': '互相確認身份。如果只有你一個，可以睇一張中間牌。', 'en-US': 'Wake up and look for other werewolves. If alone, look at a center card.' },
        tips: { 'zh-HK': '扮好人！', 'en-US': 'Act like a villager!' },
        team: 'werewolf',
        wakeOrder: 2, duration: 15, 
        scriptStart: { 'zh-HK': '狼人請擘大眼，互相確認身份。如果你係唯一一隻狼，可以睇一張中間嘅牌。', 'en-US': 'Werewolves, wake up and look for other werewolves. If you are the only werewolf, you may look at one center card.' },
        scriptEnd: { 'zh-HK': '狼人請閉眼', 'en-US': 'Werewolves, close your eyes.' }
    },
    { 
        id: 'minion', 
        name: { 'zh-HK': '爪牙', 'en-US': 'Minion' },
        desc: { 'zh-HK': '知道邊個係狼人，但狼人唔知你係邊個。', 'en-US': 'Know who the Werewolves are, but they don\'t know you.' },
        tips: { 'zh-HK': '保護狼人，甚至幫佢哋頂罪！', 'en-US': 'Protect the Werewolves, even sacrifice yourself!' },
        team: 'werewolf',
        wakeOrder: 3, duration: 10, 
        scriptStart: { 'zh-HK': '爪牙請擘大眼，狼人請舉起手指公俾爪牙確認身份', 'en-US': 'Minion, wake up. Werewolves, stick out your thumb so the Minion can see you.' },
        scriptEnd: { 'zh-HK': '爪牙請閉眼，狼人請收埋手指公', 'en-US': 'Minion, close your eyes. Werewolves, put your thumbs away.' }
    },
    { 
        id: 'mason', 
        name: { 'zh-HK': '守夜人', 'en-US': 'Mason' },
        desc: { 'zh-HK': '互相確認身份。如果你係唯一守夜人，即係另一張喺中間。', 'en-US': 'See other Masons. If alone, the other is in the center.' },
        tips: { 'zh-HK': '第一時間搵同伴！', 'en-US': 'Find your partner immediately!' },
        team: 'village',
        wakeOrder: 4, duration: 10, 
        scriptStart: { 'zh-HK': '守夜人請擘大眼，互相確認身份', 'en-US': 'Masons, wake up and look for other Masons.' },
        scriptEnd: { 'zh-HK': '守夜人請閉眼', 'en-US': 'Masons, close your eyes.' }
    },
    { 
        id: 'seer', 
        name: { 'zh-HK': '預言家', 'en-US': 'Seer' },
        desc: { 'zh-HK': '查看一張玩家卡或兩張中間卡。', 'en-US': 'View a player card or 2 center cards.' },
        tips: { 'zh-HK': '小心唔好太早暴露身份！', 'en-US': 'Don\'t reveal yourself too early!' },
        team: 'village',
        wakeOrder: 5, duration: 10, 
        scriptStart: { 'zh-HK': '預言家請擘大眼，睇一張其他人嘅牌，或者睇中間兩張牌', 'en-US': 'Seer, wake up. You may look at another player\'s card or two of the center cards.' },
        scriptEnd: { 'zh-HK': '預言家請閉眼', 'en-US': 'Seer, close your eyes.' }
    },
    { 
        id: 'robber', 
        name: { 'zh-HK': '強盜', 'en-US': 'Robber' },
        desc: { 'zh-HK': '交換並查看另一玩家的卡。你變成新角色！', 'en-US': 'Swap and view another player\'s card. You become that role!' },
        tips: { 'zh-HK': '如果你偷到狼人，你就係狼人啦！', 'en-US': 'If you steal a Werewolf, you are now a Werewolf!' },
        team: 'village',
        wakeOrder: 6, duration: 10, 
        scriptStart: { 'zh-HK': '強盜請擘大眼，將自己嘅牌同其他人交換，然後睇下新嘅牌', 'en-US': 'Robber, wake up. You may exchange your card with another player\'s card, and then view your new card.' },
        scriptEnd: { 'zh-HK': '強盜請閉眼', 'en-US': 'Robber, close your eyes.' }
    },
    { 
        id: 'troublemaker', 
        name: { 'zh-HK': '搗蛋鬼', 'en-US': 'Troublemaker' },
        desc: { 'zh-HK': '交換兩名玩家的卡，但唔可以睇。', 'en-US': 'Swap two other players\' cards without looking.' },
        tips: { 'zh-HK': '製造混亂，令狼人唔知自己係邊個！', 'en-US': 'Create chaos so Werewolves don\'t know who they are!' },
        team: 'village',
        wakeOrder: 7, duration: 10, 
        scriptStart: { 'zh-HK': '搗蛋鬼請擘大眼，交換兩個人嘅牌', 'en-US': 'Troublemaker, wake up. You may exchange cards between two other players.' },
        scriptEnd: { 'zh-HK': '搗蛋鬼請閉眼', 'en-US': 'Troublemaker, close your eyes.' }
    },
    { 
        id: 'drunk', 
        name: { 'zh-HK': '酒鬼', 'en-US': 'Drunk' },
        desc: { 'zh-HK': '將自己嘅卡同中間一張卡交換，但唔可以睇。', 'en-US': 'Swap your card with a center card without looking.' },
        tips: { 'zh-HK': '你唔知自己變成咩，小心講嘢！', 'en-US': 'You don\'t know what you became, be careful!' },
        team: 'village',
        wakeOrder: 8, duration: 10, 
        scriptStart: { 'zh-HK': '酒鬼請擘大眼，將自己嘅牌同中間其中一張牌交換', 'en-US': 'Drunk, wake up and exchange your card with a card from the center.' },
        scriptEnd: { 'zh-HK': '酒鬼請閉眼', 'en-US': 'Drunk, close your eyes.' }
    },
    { 
        id: 'insomniac', 
        name: { 'zh-HK': '失眠者', 'en-US': 'Insomniac' },
        desc: { 'zh-HK': '最後醒來，查看自己的卡有無變。', 'en-US': 'Wake up last and check if your card changed.' },
        tips: { 'zh-HK': '如果你變咗狼人，記得要幫狼人！', 'en-US': 'If you became a Werewolf, help them!' },
        team: 'village',
        wakeOrder: 9, duration: 10, 
        scriptStart: { 'zh-HK': '失眠者請擘大眼，確認自己嘅身份', 'en-US': 'Insomniac, wake up and look at your card.' },
        scriptEnd: { 'zh-HK': '失眠者請閉眼', 'en-US': 'Insomniac, close your eyes.' }
    },
    { id: 'villager', name: { 'zh-HK': '村民', 'en-US': 'Villager' }, desc: { 'zh-HK': '無特殊能力，靠推理搵出狼人。', 'en-US': 'No special ability. Find Werewolves by deduction.' }, tips: { 'zh-HK': '專心聽人講嘢，搵出破綻！', 'en-US': 'Listen carefully and find inconsistencies!' }, team: 'village', wakeOrder: -1 },
    { id: 'tanner', name: { 'zh-HK': '皮匠', 'en-US': 'Tanner' }, desc: { 'zh-HK': '如果你死咗，你就贏。', 'en-US': 'You win if you die.' }, tips: { 'zh-HK': '扮到好似狼人咁，引人投你！', 'en-US': 'Act suspicious so people vote for you!' }, team: 'tanner', wakeOrder: -1 },
    { id: 'hunter', name: { 'zh-HK': '獵人', 'en-US': 'Hunter' }, desc: { 'zh-HK': '如果你死咗，可以帶走另一個人。', 'en-US': 'If you die, you take someone with you.' }, tips: { 'zh-HK': '死都要拉個墊屍底！', 'en-US': 'Take a Werewolf down with you!' }, team: 'village', wakeOrder: -1 }
];

// ... (i18n and rolesData remain the same, adding new keys if needed)
// Update i18n for new features
i18n['zh-HK'].playersTitle = '玩家入座';
i18n['zh-HK'].addPlayerBtn = '+ 玩家';
i18n['zh-HK'].randomSeatBtn = '隨機坐位';
i18n['zh-HK'].actionTitle = '行動';
i18n['zh-HK'].confirmBtn = '完成';
i18n['en-US'].playersTitle = 'Players';
i18n['en-US'].addPlayerBtn = '+ Player';
i18n['en-US'].randomSeatBtn = 'Randomize Seats';
i18n['en-US'].actionTitle = 'Action';
i18n['en-US'].confirmBtn = 'Done';

// State
let players = []; // { name: "Ming", id: 1 }
let deck = []; 
let centerCards = []; // { id: 'werewolf', revealed: false }
let playerRoles = []; // { playerId: 1, roleId: 'seer', revealed: false }
let isPlaying = false;
let gamePhaseState = 'SETUP'; // SETUP, PEEK, NIGHT, DAY
let currentPeekIndex = 0;
let currentNightRole = null;
let nightActionState = {}; // { viewed: 0, swapped: false, selection: [] }
let nightSequence = [];
let currentStep = 0;
let timerInterval;
let synth = window.speechSynthesis;
let currentLang = 'zh-HK';

// DOM Elements
const playerListContainer = document.getElementById('player-list');
const addPlayerBtn = document.getElementById('add-player-btn');
const randomSeatBtn = document.getElementById('random-seat-btn');
const libraryGrid = document.getElementById('library-grid');
const deckGrid = document.getElementById('deck-grid');
const setupPhase = document.getElementById('setup-phase');
const gamePhase = document.getElementById('game-phase');
const deckStatus = document.getElementById('deck-status');
const targetCardCount = document.getElementById('target-card-count');
const confirmDeckBtn = document.getElementById('confirm-deck-btn');

// Table View DOM
const tableContainer = document.getElementById('table-container');
// centerArea and playersArea are removed from HTML, so remove refs here too
// const centerArea = document.getElementById('center-area'); 
// const playersArea = document.getElementById('players-area');
// Instruction banner is now dynamic
let instructionBanner;
let instructionText;

const menuBtn = document.getElementById('menu-btn');
const pauseMenu = document.getElementById('pause-menu');
const resumeBtn = document.getElementById('resume-btn');
const endGameBtn = document.getElementById('end-game-btn');
const readyBtn = document.getElementById('ready-btn');

// Modal DOM
const roleModal = document.getElementById('role-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalRoleName = document.getElementById('modal-role-name');
const modalRoleTeam = document.getElementById('modal-role-team');
const modalRoleDesc = document.getElementById('modal-role-desc');
const modalWakeOrder = document.getElementById('modal-wake-order');
const modalRoleTips = document.getElementById('modal-role-tips');

// Initialize
// Old init removed


function toggleLanguage() {
    currentLang = currentLang === 'zh-HK' ? 'en-US' : 'zh-HK';
    updateUIText();
    renderLibrary();
    updateDeckUI();
    saveGameState();
}

function updateUIText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        let text = i18n[currentLang][key];
        if (key === 'deckHint' || key === 'alertDeckCount') {
            text = text.replace('{target}', players.length + 3);
        }
        if (text) el.innerText = text;
    });
    targetCardCount.innerText = players.length + 3;
    document.documentElement.lang = currentLang;
}

// --- Player Setup ---
function addPlayer(name) {
    if (players.length >= 10) return;
    players.push({ name: name, id: Date.now() + Math.random() });
    renderPlayerList();
    updateDeckUI(); // Update target count
}

function removePlayer(index) {
    if (players.length <= 3) return;
    players.splice(index, 1);
    renderPlayerList();
    updateDeckUI();
}

function renderPlayerList() {
    playerListContainer.innerHTML = '';
    players.forEach((p, index) => {
        const row = document.createElement('div');
        row.className = 'player-input-row';
        row.innerHTML = `
            <input type="text" class="player-input" value="${p.name}" onchange="updatePlayerName(${index}, this.value)">
            <button class="remove-player-btn" onclick="removePlayer(${index})">X</button>
        `;
        playerListContainer.appendChild(row);
    });
    updateUIText();
}

window.updatePlayerName = function(index, value) {
    players[index].name = value;
};

window.removePlayer = removePlayer; // Expose to global

function randomizeSeats() {
    for (let i = players.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [players[i], players[j]] = [players[j], players[i]];
    }
    renderPlayerList();
}


// Image Mapping
const roleImageMap = {
    'doppelganger': 'Doppelganger.png',
    'drunk': 'Drunk.png',
    'hunter': 'Hunter.png',
    'insomniac': 'Insomniac.png',
    'mason': 'Mason.png',
    'robber': 'Robber.png',
    'seer': 'Seer.png',
    'tanner': 'Tanner.png',
    'troublemaker': 'Troublemaker.png',
    'villager': 'Villager.png',
    'werewolf': 'Wolf.png',
    'minion': 'minion.png'
};

function renderLibrary() {
    libraryGrid.innerHTML = '';
    rolesData.forEach(role => {
        const div = document.createElement('div');
        div.className = 'role-card';
        const imageFile = roleImageMap[role.id] || 'Villager.png';
        
        div.onclick = (e) => {
            if (!e.target.classList.contains('info-btn')) {
                addToDeck(role.id);
            }
        };
        
        div.innerHTML = `
            <img src="images/characters/${imageFile}" class="role-card-img" alt="${role.name['en-US']}">
            <div class="role-overlay">
                <div class="role-name-en">${role.name['en-US']}</div>
                <div class="role-name-zh">${role.name['zh-HK']}</div>
            </div>
            <div class="info-btn" onclick="openRoleModal('${role.id}')">?</div>
        `;
        libraryGrid.appendChild(div);
    });
}

function removeFromDeck(index) {
    deck.splice(index, 1);
    updateDeckUI();
}

// --- Deck Builder (Modified) ---
function addToDeck(roleId) {
    if (deck.length < players.length + 3) {
        deck.push(roleId);
        updateDeckUI();
    }
}

function updateDeckUI() {
    deckGrid.innerHTML = '';
    deck.forEach((roleId, index) => {
        const role = rolesData.find(r => r.id === roleId);
        const div = document.createElement('div');
        div.className = 'role-card selected';
        const imageFile = roleImageMap[roleId] || 'Villager.png';
        
        div.onclick = () => removeFromDeck(index);
        div.innerHTML = `
            <img src="images/characters/${imageFile}" class="role-card-img" alt="${role.name['en-US']}">
            <div class="role-overlay">
                <div class="role-name-en">${role.name['en-US']}</div>
                <div class="role-name-zh">${role.name['zh-HK']}</div>
            </div>
        `;
        deckGrid.appendChild(div);
    });

    const target = players.length + 3;
    deckStatus.innerText = `${deck.length} / ${target}`;
    confirmDeckBtn.disabled = deck.length !== target;
}

// --- Modal Logic ---
window.openRoleModal = function(roleId, isGameReveal = false) {
    const role = rolesData.find(r => r.id === roleId);
    if (!role) return;
    
    modalRoleName.innerHTML = `${role.name['en-US']}<br><span class="zh-sub">${role.name['zh-HK']}</span>`;
    
    modalRoleDesc.innerHTML = `
        <div class="bilingual-block">
            <p class="en">${role.desc['en-US']}</p>
            <p class="zh">${role.desc['zh-HK']}</p>
        </div>`;
        
    modalRoleTips.innerHTML = `
        <div class="bilingual-block">
            <p class="en">${role.tips['en-US']}</p>
            <p class="zh">${role.tips['zh-HK']}</p>
        </div>`;
    
    const teamEn = i18n['en-US']['team' + role.team.charAt(0).toUpperCase() + role.team.slice(1)];
    const teamZh = i18n['zh-HK']['team' + role.team.charAt(0).toUpperCase() + role.team.slice(1)];
    modalRoleTeam.className = 'team-badge ' + role.team;
    modalRoleTeam.innerHTML = `${teamEn} / ${teamZh}`;
    
    let orderText = '';
    if (role.wakeOrder === 1) {
        orderText = `First / 最先`;
    } else if (role.id === 'insomniac') {
        orderText = `Last / 最後`;
    } else if (role.wakeOrder > 0) {
        orderText = `Order #${role.wakeOrder} / 第 ${role.wakeOrder} 位`;
    } else {
        orderText = `None / 無 (不需喚醒)`;
    }
    modalWakeOrder.innerHTML = orderText;
    
    roleModal.classList.remove('hidden');
};

function closeModal() {
    roleModal.classList.add('hidden');
}

// --- Peek Phase ---
function startPeekPhase() {
    // Data is already prepared and saved in initSetup
    
    setupPhase.classList.add('hidden');
    gamePhase.classList.remove('hidden');
    readyBtn.classList.add('hidden');
    
    gamePhaseState = 'PEEK';
    // currentPeekIndex = 0; // Already set in state
    
    renderTable();
    updatePeekState();
    saveGameState();
}

function updatePeekState() {
    if (currentPeekIndex < players.length) {
        const p = players[currentPeekIndex];
        instructionText.innerText = `${p.name}, ${i18n[currentLang].revealBtn} / Tap to view`;
        renderTable(); // Re-render to update highlights
    } else {
        instructionText.innerText = i18n[currentLang].ready;
        readyBtn.classList.remove('hidden');
        
        // Add Peek Again Button
        let peekAgainBtn = document.getElementById('peek-again-btn');
        if (!peekAgainBtn) {
            peekAgainBtn = document.createElement('button');
            peekAgainBtn.id = 'peek-again-btn';
            peekAgainBtn.className = 'comic-btn small';
            peekAgainBtn.innerText = currentLang === 'zh-HK' ? "再睇一次" : "Peek Again";
            peekAgainBtn.style.marginLeft = '10px';
            peekAgainBtn.onclick = () => {
                currentPeekIndex = 0;
                gamePhaseState = 'PEEK';
                readyBtn.classList.add('hidden');
                peekAgainBtn.remove(); // Remove self
                updatePeekState();
            };
            instructionBanner.appendChild(peekAgainBtn);
        }
        
        gamePhaseState = 'READY_TO_START';
        renderTable();
    }
}

function completePeek() {
    // Called when modal closes during PEEK phase
    currentPeekIndex++;
    updatePeekState();
    saveGameState();
}

// --- Night Phase ---
function startNightPhase() {
    readyBtn.classList.add('hidden');
    
    // Remove Peek Again Button if exists
    const peekAgainBtn = document.getElementById('peek-again-btn');
    if (peekAgainBtn) peekAgainBtn.remove();
    
    gamePhaseState = 'NIGHT';
    
    const uniqueRoles = [...new Set(deck)];
    nightSequence = rolesData
        .filter(r => uniqueRoles.includes(r.id) && r.wakeOrder > 0)
        .sort((a, b) => a.wakeOrder - b.wakeOrder);
        
    isPlaying = true;
    currentStep = -1;
    
    // Reset any highlights
    renderTable();
    
    saveGameState();
    setTimeout(nextStep, 1000);
}

function nextStep() {
    if (!isPlaying) return;
    
    // Reset Action State
    nightActionState = { viewed: 0, swapped: false, selection: [], completed: false };
    currentNightRole = null;
    renderTable(); // Clear highlights
    
    if (currentStep === -1) {
        instructionText.innerText = i18n[currentLang].nightStart;
        speak(i18n[currentLang].nightStartScript, () => {
            setTimeout(() => { currentStep++; nextStep(); }, 2000);
        });
    } else if (currentStep < nightSequence.length) {
        const role = nightSequence[currentStep];
        currentNightRole = role;
        saveGameState();
        
        instructionText.innerHTML = `${role.name[currentLang]} ${i18n[currentLang].action} <span id="action-timer"></span>`;
        
        speak(role.scriptStart[currentLang], () => {
            // Start Timer
            startActionTimer(role.duration || 10, () => {
                // Timer End Callback
                nightActionState.timerExpired = true; // Mark timer as expired
                
                // Check if action was completed (set by action handlers)
                if (nightActionState.completed) {
                    finishNightStep();
                    return;
                }
                
                // Check if role requires interaction
                const interactiveRoles = ['seer', 'robber', 'troublemaker', 'drunk', 'doppelganger'];
                const roleId = currentNightRole.mimicId || currentNightRole.id;
                
                if (interactiveRoles.includes(roleId)) {
                    // Check if action was performed
                    const actionPerformed = nightActionState.viewed > 0 || nightActionState.swapped || nightActionState.selection.length > 0;
                    
                    if (!actionPerformed && !currentNightRole.isFake) {
                        // No action performed, don't auto-advance
                        console.log(`${role.name['en-US']}: Timer expired but no action performed. Waiting for player input.`);
                        instructionText.innerHTML = `${role.name[currentLang]} - ${currentLang === 'zh-HK' ? '請完成行動' : 'Please complete your action'}`;
                        return; // Don't call finishNightStep
                    }
                }
                
                // Auto-advance for non-interactive roles or if action was performed
                finishNightStep();
            });
            
            // Check if role is in play
            // Note: Doppelganger is always "in play" if assigned, but if it mimics a role, 
            // that role's turn is separate.
            // Here we check if the *original* role is assigned to a player.
            const isRoleInPlay = playerRoles.some(p => p.roleId === role.id);
            
            if (!isRoleInPlay) {
                console.log(`${role.name['en-US']} is in center. Fake turn.`);
                // Disable interaction (handled by checks in handleCardClick)
                // But we need to ensure handleCardClick knows it's a fake turn?
                // Actually, handleCardClick checks `currentNightRole`. 
                // We can set a flag `currentNightRole.isFake = true`.
                currentNightRole.isFake = true;
            } else {
                // Real turn
                // Auto-advance for non-interactive roles
                if (['minion', 'mason', 'insomniac'].includes(role.id)) {
                     // Just wait for timer
                } else if (role.id === 'werewolf') {
                    // Werewolf logic...
                    const werewolfCount = playerRoles.filter(p => p.roleId === 'werewolf').length;
                    if (werewolfCount > 1) {
                        renderTable(); // Highlight
                    } else if (werewolfCount === 1) {
                        // Lone Wolf: Highlight Center Cards
                        const centerCardsEls = document.querySelectorAll('.table-card[data-type="center"]');
                        centerCardsEls.forEach(el => el.classList.add('highlight'));
                    }
                }
            }
        });
    } else {
        instructionText.innerText = i18n[currentLang].dayStart;
        speak(i18n[currentLang].dayStartScript, () => { 
            gamePhaseState = 'DAY';
            startDayPhase();
        });
    }
}

let dayTimerInterval;

function startDayPhase(resume = false) {
    const dayDurationEl = document.getElementById('day-duration');
    const durationMin = dayDurationEl ? parseInt(dayDurationEl.value) : parseInt(window.savedDayDuration || '5');
    let timeLeft;
    
    if (resume && window.dayEndTime) {
        timeLeft = Math.ceil((window.dayEndTime - Date.now()) / 1000);
    } else {
        timeLeft = durationMin * 60;
        window.dayEndTime = Date.now() + (timeLeft * 1000);
    }
    
    saveGameState(); // Save state at start of day
    
    // Show Manual Vote Button
    const voteBtn = document.getElementById('manual-vote-btn');
    if (voteBtn) voteBtn.classList.remove('hidden');
    
    // Hide old timer display if exists
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.classList.add('hidden');
    
    updateTimerDisplay(timeLeft);
    
    if (dayTimerInterval) clearInterval(dayTimerInterval);
    
    dayTimerInterval = setInterval(() => {
        timeLeft = Math.ceil((window.dayEndTime - Date.now()) / 1000);
        // timeLeft--; // Use timestamp diff for accuracy
        
        if (timeLeft < 0) timeLeft = 0;
        updateTimerDisplay(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(dayTimerInterval);
            startVotingPhase();
        }
    }, 1000);
}

// Debug Helper: Fast Forward Day
window.fastForwardDay = function(seconds = 5) {
    if (gamePhaseState !== 'DAY') {
        console.warn("Not in Day Phase.");
        return;
    }
    console.log(`Fast forwarding day to ${seconds}s...`);
    window.dayEndTime = Date.now() + (seconds * 1000);
    // Force immediate update
    const timeLeft = Math.ceil((window.dayEndTime - Date.now()) / 1000);
    updateTimerDisplay(timeLeft);
    saveGameState();
};

function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    const timeStr = `${m}:${s}`;
    
    const instruction = document.getElementById('instruction-text');
    instruction.innerHTML = `${currentLang === 'zh-HK' ? "天光！" : "Day Phase"} ${timeStr}`;
}

function startVotingPhase() {
    console.log("Starting Voting Phase...");
    clearInterval(dayTimerInterval); // Ensure timer stops
    gamePhaseState = 'VOTE';
    
    const instruction = document.getElementById('instruction-text');
    instruction.innerText = currentLang === 'zh-HK' ? "時間到！請投票！" : "Time's up! VOTE!";
    instruction.classList.add('vote-pulse');
    
    // Hide Vote Button
    const voteBtn = document.getElementById('manual-vote-btn');
    if (voteBtn) voteBtn.classList.add('hidden');
    
    // Play Audio
    const voteScript = currentLang === 'zh-HK' ? "時間到！請投票！" : "Time's up! Please vote!";
    speak(voteScript, () => {
        // Wait a bit for voting to happen manually
        setTimeout(startRevealPhase, 5000);
    });
    saveGameState();
}

function startRevealPhase() {
    gamePhaseState = 'REVEAL';
    
    const instruction = document.getElementById('instruction-text');
    instruction.classList.remove('vote-pulse');
    instruction.innerText = currentLang === 'zh-HK' ? "點擊卡牌查看最終身份" : "Tap cards to reveal final roles";
    
    saveGameState();
    
    // Reveal all center cards automatically? Or let players check?
    // Usually players check their own first.
    // Let's just enable flipping.
}



let actionTimerInterval;

function startActionTimer(duration, onComplete) {
    if (actionTimerInterval) clearInterval(actionTimerInterval);
    
    let timeLeft = duration;
    const timerSpan = document.getElementById('action-timer');
    if (timerSpan) timerSpan.innerText = `(${timeLeft}s)`;
    
    actionTimerInterval = setInterval(() => {
        timeLeft--;
        if (timerSpan) timerSpan.innerText = `(${timeLeft}s)`;
        
        if (timeLeft <= 0) {
            clearInterval(actionTimerInterval);
            if (onComplete) onComplete();
        }
    }, 1000);
}

function finishNightStep() {
    if (!currentNightRole) return;
    if (actionTimerInterval) clearInterval(actionTimerInterval);
    
    speak(currentNightRole.scriptEnd[currentLang], () => {
        setTimeout(() => {
            // Increment step BEFORE saving to prevent duplicate turns on refresh
            currentStep++;
            saveGameState();
            nextStep();
        }, 2000);
    });
}

// Helper to get card element
function getCardElement(type, index) {
    return document.querySelector(`.table-card[data-type="${type}"][data-index="${index}"]`);
}

let currentUtterance = null; // Prevent GC on iOS
let audioContext = null; // Web Audio Context for unlocking

function speak(text, callback, force = false) {
    if (!isPlaying && !force) return;
    
    // Ensure resumed (iOS sometimes pauses it)
    if (synth.paused) synth.resume();
    
    // Cancel any previous speech to prevent queue buildup
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance; // Keep reference
    
    utterance.lang = currentLang;
    const volEl = document.getElementById('volume-control');
    utterance.volume = volEl ? volEl.value : (window.savedVolume || 1);
    utterance.rate = 0.9;
    
    let callbackCalled = false;
    
    const done = () => {
        if (!callbackCalled && callback) {
            callbackCalled = true;
            callback();
        }
        // Don't nullify immediately if we want to be safe, but usually fine.
        // Actually, keeping it until next speak is safer for some browsers.
    };
    
    utterance.onend = done;
    utterance.onerror = (e) => {
        if (e.error === 'interrupted') {
            // This happens when synth.cancel() is called. 
            // We DO NOT want to trigger done() here, because we are likely starting a new speech.
            return;
        }
        console.error("Speech Error:", e);
        // If error occurs, try to resume and retry? No, just proceed to prevent hang.
        if (synth.paused) synth.resume();
        done();
    };
    
    synth.speak(utterance);
    
    // Fallback: If speech doesn't end within reasonable time (e.g. text length * 300ms + 2s), force callback
    const estimatedDuration = (text.length * 300) + 2000;
    setTimeout(done, estimatedDuration);
}

function unlockAudio() {
    // 1. Web Audio API Unlock (Standard for iOS)
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        // Play silent buffer
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
    } catch (e) {
        console.error("AudioContext Unlock Error:", e);
    }

    // 2. Speech Synthesis Unlock
    if (synth) {
        if (synth.paused) synth.resume();
        const utterance = new SpeechSynthesisUtterance('');
        synth.speak(utterance);
    }
}

// --- Interaction Handler ---
function handleCardClick(type, index) {
    if (gamePhaseState === 'PEEK') {
        if (type === 'player' && index === currentPeekIndex) {
            // Flip Card
            const card = getCardElement(type, index);
            if (card) {
                if (card.classList.contains('revealed')) {
                    // Hide and Next
                    card.classList.remove('revealed');
                    // Wait for flip animation (0.6s) before moving to next state
                    setTimeout(completePeek, 600);
                } else {
                    // Reveal
                    card.classList.add('revealed');
                    instructionText.innerText = currentLang === 'zh-HK' ? "再次點擊卡牌以隱藏" : "Tap card again to hide";
                }
            }
        }
        return;
    }

    if (gamePhaseState === 'REVEAL') {
        // Allow flipping any card
        const card = getCardElement(type, index);
        if (card) {
            card.classList.toggle('revealed');
        }
        return;
    }
    
    if (gamePhaseState === 'NIGHT' && currentNightRole) {
        // Block interaction if it's a fake turn (no player holds this role initially)
        const activeRoleId = currentNightRole.id;
        const activePlayerIndex = playerRoles.findIndex(p => p.initialRoleId === activeRoleId);
        
        if (activePlayerIndex === -1) return;
        
        // Block if already completed (waiting for timer)
        if (nightActionState.completed) return;
        
        // Check for Mimic ID first
        const roleId = currentNightRole.mimicId || currentNightRole.id;
        
        if (roleId === 'doppelganger') {
            handleDoppelgangerAction(type, index);
        } else if (roleId === 'werewolf') {
            handleWerewolfAction(type, index);
        } else if (roleId === 'seer') {
            handleSeerAction(type, index);
        } else if (roleId === 'robber') {
            handleRobberAction(type, index);
        } else if (roleId === 'troublemaker') {
            handleTroublemakerAction(type, index);
        } else if (roleId === 'drunk') {
            handleDrunkAction(type, index);
        } else if (roleId === 'insomniac') {
            handleInsomniacAction(type, index);
        }
    }
}

function handleDoppelgangerAction(type, index) {
    // Doppelganger: View 1 player card
    if (type !== 'player') return;
    
    // If already mimicking, don't allow viewing another card unless the mimic role allows it (handled by dispatch)
    if (currentNightRole.mimicId) return;
    
    if (nightActionState.viewed > 0) return;
    
    // 1. Reveal the card (Flip)
    const card = getCardElement(type, index);
    if (card) {
        card.classList.add('revealed');
        setTimeout(() => card.classList.remove('revealed'), 2000);
    }
    
    const targetRoleId = playerRoles[index].roleId;
    nightActionState.viewed++;
    
    // 2. Update Doppelganger's Role
    const doppelgangerIdx = playerRoles.findIndex(p => p.initialRoleId === 'doppelganger');
    if (doppelgangerIdx !== -1) {
        playerRoles[doppelgangerIdx].roleId = targetRoleId;
        playerRoles[doppelgangerIdx].mimickedRole = targetRoleId; // Track original copy
        console.log(`Doppelganger became ${targetRoleId}`);
        saveGameState();
        logCurrentRoles("After Doppelganger Action");
    }
    
    // 3. Check if target role has an action
    const actionRoles = ['seer', 'robber', 'troublemaker', 'werewolf', 'drunk', 'insomniac'];
    // Added insomniac to action roles so they can check their new card (which is the one they just copied, but standard Insomniac checks self)
    
    if (actionRoles.includes(targetRoleId)) {
        // Wait for reveal animation (2s) to finish before starting new role action
        setTimeout(() => {
            // Start Mimic Sub-turn
            currentNightRole.mimicId = targetRoleId;
            
            // Update Instruction
            const roleName = rolesData.find(r => r.id === targetRoleId).name[currentLang];
            instructionText.innerText = `${i18n[currentLang].roleTitle} ${roleName}! ${i18n[currentLang].actionTitle}...`;
            
            // Reset Action State for the new role
            // IMPORTANT: Reset viewed count so they can perform the action (e.g. Seer views 2 cards)
            nightActionState = { viewed: 0, swapped: false, selection: [], confirmed: false, completed: false };
            
            // For Robber/Troublemaker/Drunk, we need to ensure highlighting works.
            // renderTable will be called by next interaction or we can force it.
            renderTable();
        }, 2000);
        
    } else {
        // Passive role (Villager, Tanner, Hunter, Mason, Minion)
        // Just finish
        setTimeout(finishNightStep, 2000);
    }
}

function handleWerewolfAction(type, index) {
    // Werewolf: If solo, can peek 1 center. If pack, just confirm.
    const werewolfCount = playerRoles.filter(p => p.initialRoleId === 'werewolf' || p.mimickedRole === 'werewolf').length;
    
    if (werewolfCount === 1) {
        // Solo werewolf can peek center
        if (type !== 'center') return;
        if (nightActionState.viewed > 0) return;
        
        const targetRoleId = centerCards[index].roleId;
        
        // Reveal Card (Flip)
        const card = getCardElement(type, index);
        if (card) {
            card.classList.add('revealed');
            setTimeout(() => card.classList.remove('revealed'), 2000);
        }
        
        nightActionState.viewed++;
        setTimeout(finishNightStep, 2000);
    } else {
        // Pack werewolves - they just see each other (already highlighted)
        // Any click advances
        if (!nightActionState.confirmed) {
            nightActionState.confirmed = true;
            setTimeout(finishNightStep, 500);
        }
    }
}

function handleSeerAction(type, index) {
    // Seer: View 1 Player OR 2 Center
    
    if (nightActionState.viewed >= 2) return; // Max limit
    if (type === 'player' && nightActionState.selection.some(s => s.type === 'player')) return; // Already viewed a player
    if (type === 'player' && nightActionState.selection.length > 0 && nightActionState.selection[0].type === 'center') return; // Can't mix player and center
    
    // Reveal Card (Flip)
    const card = getCardElement(type, index);
    if (card) {
        card.classList.add('revealed');
        setTimeout(() => card.classList.remove('revealed'), 3000);
    }
    
    nightActionState.viewed++;
    nightActionState.selection.push({ type, index });
    
    // Check completion
    if (type === 'player') {
        // Viewed 1 player -> Done
        setTimeout(() => {
            nightActionState.completed = true;
            // If timer already expired, advance immediately
            if (nightActionState.timerExpired) {
                finishNightStep();
            }
        }, 3500); // Wait for flip back + buffer
    } else if (nightActionState.viewed === 2 && nightActionState.selection.every(s => s.type === 'center')) {
        setTimeout(() => {
            nightActionState.completed = true;
            if (nightActionState.timerExpired) {
                finishNightStep();
            }
        }, 3500);
    }
}

function handleRobberAction(type, index) {
    // Robber: Swap with 1 Player and View
    if (type !== 'player') return;
    if (nightActionState.swapped) return;
    
    // Wait, Robber swaps SELF with Target. We need to know who is Robber.
    // If Mimicking, we are the current player (or the doppelganger slot).
    // Actually, Robber swaps "My Card" with "Target Card".
    
    let robberIdx = playerRoles.findIndex(p => p.initialRoleId === 'robber');
    
    // Special handling for Doppelganger mimicking Robber
    if (currentNightRole.mimicId === 'robber') {
        robberIdx = playerRoles.findIndex(p => p.initialRoleId === 'doppelganger');
    }
    
    if (robberIdx === -1) return; 
    if (index === robberIdx) return; // Can't rob self
    
    // Swap Data
    const temp = playerRoles[robberIdx].roleId;
    playerRoles[robberIdx].roleId = playerRoles[index].roleId;
    playerRoles[index].roleId = temp;
    
    console.log(`[Robber] Swapped Player ${robberIdx} with Player ${index}`);
    saveGameState();
    logCurrentRoles("After Robber Action");
    
    nightActionState.swapped = true;
    nightActionState.selection = [{ type: 'player', index }]; // Track selected card
    
    // Re-render to update card content (images/text) and highlighting
    renderTable();
    
    // Animate Swap
    animateSwap(getCardElement('player', robberIdx), getCardElement('player', index));
    
    // View New Card (Flip Self)
    const robberCard = getCardElement('player', robberIdx);
    if (robberCard) {
        robberCard.classList.add('revealed');
        setTimeout(() => robberCard.classList.remove('revealed'), 3000);
    }
    
    setTimeout(() => {
        nightActionState.completed = true;
        if (nightActionState.timerExpired) {
            finishNightStep();
        }
    }, 4500);
}

function handleTroublemakerAction(type, index) {
    // Swap 2 players
    if (type !== 'player') return;
    if (nightActionState.swapped) return;
    
    // Check if already selected
    if (nightActionState.selection.some(s => s.index === index)) return;
    
    // Prevent selecting self (should be handled by UI, but double check)
    let selfIdx = playerRoles.findIndex(p => p.initialRoleId === 'troublemaker');
    if (currentNightRole.mimicId === 'troublemaker') {
        selfIdx = playerRoles.findIndex(p => p.initialRoleId === 'doppelganger');
    }
    if (index === selfIdx) return;

    nightActionState.selection.push({ type, index });
    renderTable(); // Update highlights (Green)
    
    if (nightActionState.selection.length === 2) {
        const idx1 = nightActionState.selection[0].index;
        const idx2 = nightActionState.selection[1].index;
        
        // Swap
        const temp = playerRoles[idx1].roleId;
        playerRoles[idx1].roleId = playerRoles[idx2].roleId;
        playerRoles[idx2].roleId = temp;
        
        console.log(`[Troublemaker] Swapped Player ${idx1} with Player ${idx2}`);
        saveGameState();
        logCurrentRoles("After Troublemaker Action");
        
        nightActionState.swapped = true;
        
        // Update Text
        instructionText.innerText = currentLang === 'zh-HK' ? "已交換" : "Swapped";
        
        // Animate
        animateSwap(getCardElement('player', idx1), getCardElement('player', idx2));
        
        setTimeout(() => {
            nightActionState.completed = true;
            if (nightActionState.timerExpired) {
                finishNightStep();
            }
        }, 3500);
    }
}

function handleDrunkAction(type, index) {
    // Swap self with Center
    if (type !== 'center') return;
    if (nightActionState.swapped) return;
    
    let drunkIdx = playerRoles.findIndex(p => p.initialRoleId === 'drunk');
    
    // Special handling for Doppelganger mimicking Drunk
    if (currentNightRole.mimicId === 'drunk') {
        drunkIdx = playerRoles.findIndex(p => p.initialRoleId === 'doppelganger');
    }
    
    if (drunkIdx === -1) return;
    
    // Swap
    const temp = playerRoles[drunkIdx].roleId;
    playerRoles[drunkIdx].roleId = centerCards[index].roleId;
    centerCards[index].roleId = temp;
    
    console.log(`Drunk Action: Swapped Drunk (Player ${drunkIdx}) with Center ${index}`);
    
    nightActionState.swapped = true;
    saveGameState();
    setTimeout(() => {
        nightActionState.completed = true;
        if (nightActionState.timerExpired) {
            finishNightStep();
        }
    }, 1000);
}

function handleInsomniacAction(type, index) {
    // Insomniac: View own card
    if (type !== 'player') return;
    
    // Identify valid Insomniacs (Original + Doppelganger-Copy)
    const isOriginal = playerRoles[index].initialRoleId === 'insomniac';
    const isDoppelgangerCopy = playerRoles[index].initialRoleId === 'doppelganger' && playerRoles[index].mimickedRole === 'insomniac';
    
    if (!isOriginal && !isDoppelgangerCopy) return; // Not an Insomniac
    
    // Check if already viewed this specific card
    if (nightActionState.selection && nightActionState.selection.some(s => s.index === index)) return;
    
    // Calculate Total Insomniacs to determine when to finish
    const totalInsomniacs = playerRoles.filter(p => p.initialRoleId === 'insomniac' || (p.initialRoleId === 'doppelganger' && p.mimickedRole === 'insomniac')).length;
    
    if (nightActionState.viewed >= totalInsomniacs) return;
    
    // Reveal Card (Flip)
    const card = getCardElement(type, index);
    if (card) {
        card.classList.add('revealed');
        setTimeout(() => card.classList.remove('revealed'), 3000);
    }
    
    nightActionState.viewed++;
    if (!nightActionState.selection) nightActionState.selection = [];
    nightActionState.selection.push({ type, index });
    
    // Finish if all Insomniacs have acted
    if (nightActionState.viewed >= totalInsomniacs) {
        setTimeout(() => {
            nightActionState.completed = true;
            if (nightActionState.timerExpired) {
                finishNightStep();
            }
        }, 3500);
    }
}


// --- Render Table (Grid Layout) ---
function renderTable() {
    if (window.location.pathname.endsWith('mobile.html')) {
        renderMobileTable();
        return;
    }

    tableContainer.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'table-grid';
    
    // 3x4 Grid = 12 cells
    // Indices:
    // 0  1  2
    // 3  C  5  (C = Center Zone, spans 4,7)
    // 6  C  8
    // 9 10 11
    
    // Smart Seating Logic
    const seatingMap = getSmartSeating(players.length);
    
    // Create 12 cells first
    const cells = [];
    for (let i = 0; i < 12; i++) {
        // Skip 4 and 7 (covered by center zone)
        if (i === 4 || i === 7) continue;
        
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.index = i;
        
        // Grid positioning
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        cell.style.gridRow = row;
        cell.style.gridColumn = col;
        
        grid.appendChild(cell);
        cells[i] = cell;
    }
    
    // Center Zone
    const centerZone = document.createElement('div');
    centerZone.className = 'center-zone';
    
    // Add Center Cards
    const centerCardsRow = document.createElement('div');
    centerCardsRow.className = 'center-cards-row';
    centerCards.forEach((c, i) => {
        const card = createCard('center', i, `Center ${i+1}`);
        centerCardsRow.appendChild(card);
    });
    centerZone.appendChild(centerCardsRow);
    
    // Add Instruction Banner (Moved here)
    if (!instructionBanner) {
        instructionBanner = document.createElement('div');
        instructionBanner.className = 'instruction-banner';
        
        instructionText = document.createElement('h2');
        instructionText.id = 'instruction-text';
        instructionText.innerText = i18n[currentLang].ready; // Default text
        instructionBanner.appendChild(instructionText);
        
        // Add Manual Vote Button (Icon)
        const voteBtn = document.createElement('i');
        voteBtn.id = 'manual-vote-btn';
        voteBtn.className = 'fa fa-hourglass-end hidden';
        voteBtn.setAttribute('aria-hidden', 'true');
        voteBtn.style.cssText = 'margin-left: 15px; font-size: 1.8rem; color: #FFD700; cursor: pointer; text-shadow: 2px 2px 0 #000;';
        voteBtn.title = currentLang === 'zh-HK' ? '立即投票' : 'Vote Now';
        voteBtn.onclick = () => {
            console.log("Manual Vote Button Clicked");
            clearInterval(dayTimerInterval);
            startVotingPhase();
        };
        instructionBanner.appendChild(voteBtn);
    }
    centerZone.appendChild(instructionBanner);
    
    grid.appendChild(centerZone);
    
    // Place Players
    players.forEach((p, i) => {
        if (i >= 10) return; // Max 10
        const gridIndex = seatingMap[i];
        const cell = cells[gridIndex];
        if (cell) {
            const card = createCard('player', i, p.name);
            cell.appendChild(card);
        }
    });
    
    tableContainer.appendChild(grid);
}

function renderMobileTable() {
    tableContainer.innerHTML = '';
    
    // Ensure instructionText reference is correct
    instructionText = document.getElementById('instruction-text');
    
    // 1. Center Cards Row
    const centerRow = document.createElement('div');
    centerRow.className = 'mobile-center-row';
    centerCards.forEach((c, i) => {
        const card = createCard('center', i, `Center ${i+1}`);
        centerRow.appendChild(card);
    });
    tableContainer.appendChild(centerRow);
    
    // 2. Players Grid
    const playersGrid = document.createElement('div');
    playersGrid.className = 'mobile-players-grid';
    players.forEach((p, i) => {
        const card = createCard('player', i, p.name);
        playersGrid.appendChild(card);
    });
    tableContainer.appendChild(playersGrid);
}

// Helper: Get Smart Seating Indices based on player count
function getSmartSeating(count) {
    // Grid Indices:
    // 0  1  2   (Top Row)
    // 3     5   (Middle Row)
    // 6     8   (Middle Row)
    // 9 10 11   (Bottom Row)
    
    // Clockwise Path: 0 -> 1 -> 2 -> 5 -> 8 -> 11 -> 10 -> 9 -> 6 -> 3
    // We want to distribute players evenly along this path.
    
    switch(count) {
        case 3: return [1, 8, 9]; // Top Center, Right, Bottom Left (Triangle) -> Actually [1, 8, 9] is Top, Right-Low, Bottom-Left. 
                // Better: [1, 8, 9] is okay. Or [1, 11, 9]? 
                // Let's try to be symmetric.
                // 3 Players: Top(1), Right-Bottom(11), Left-Bottom(9)? No.
                // Top(1), Right(5), Left(3)?
                return [1, 5, 3]; 
                
        case 4: return [1, 5, 10, 3]; // Top, Right, Bottom, Left (Cross)
                // Or Corners: [0, 2, 11, 9]?
                // User asked for "Clockwise Seating Order (Top -> Right -> Bottom -> Left)"
                // Let's use Cross for 4.
                
        case 5: return [1, 2, 8, 10, 6]; // Top, Top-Right, Right-Low, Bottom, Left-Low?
                // Let's stick to the path and pick equidistant points roughly.
                // Path: 0,1,2,5,8,11,10,9,6,3
                // 5 players: 1, 5, 11, 9, 3? (Top, Right, Bot-R, Bot-L, Left)
                return [1, 5, 11, 9, 3];
                
        case 6: return [0, 2, 5, 11, 9, 3]; // Top-L, Top-R, Right, Bot-R, Bot-L, Left
        
        case 7: return [0, 2, 5, 8, 11, 9, 3]; // Add Right-Low
        
        case 8: return [0, 1, 2, 5, 11, 10, 9, 3]; // Top 3, Right, Bot 3, Left
        
        case 9: return [0, 1, 2, 5, 8, 11, 10, 9, 3]; // Top 3, Right 2, Bot 3, Left 1
        
        case 10: return [0, 1, 2, 5, 8, 11, 10, 9, 6, 3]; // Full Circle
        
        default: return [0, 1, 2, 5, 8, 11, 10, 9, 6, 3];
    }
}

function createCard(type, index, label) {
    const card = document.createElement('div');
    card.className = 'table-card';
    card.dataset.type = type;
    card.dataset.index = index;
    
    // 3D Structure
    const inner = document.createElement('div');
    inner.className = 'card-inner';
    
    // Front Face (Card Back Design)
    const faceFront = document.createElement('div');
    faceFront.className = 'card-face card-face-front';
    
    // Back Face (Role Art)
    const faceBack = document.createElement('div');
    faceBack.className = 'card-face card-face-back';
    
    // Determine Role Content
    let roleNameEn = 'Unknown';
    let roleNameZh = '未知';
    let roleId = 'unknown';
    
    if (type === 'player') {
        const r = playerRoles[index];
        if (r) {
            // Use CURRENT Role for both Image and Name
            // User requested: "Change both text and image"
            const roleData = rolesData.find(d => d.id === r.roleId);
            if (roleData) {
                roleNameEn = roleData.name['en-US'];
                roleNameZh = roleData.name['zh-HK'];
                roleId = roleData.id;
            }
        }
    } else {
        // Center card
        const c = centerCards[index];
        if (c) {
            const roleData = rolesData.find(d => d.id === c.roleId);
            if (roleData) {
                roleNameEn = roleData.name['en-US'];
                roleNameZh = roleData.name['zh-HK'];
                roleId = roleData.id;
            }
        }
    }
    
    // Image Mapping
    // Use global roleImageMap
    const imageFile = roleImageMap[roleId] || 'Villager.png'; // Default fallback
    
    // Render Image and Overlay
    // Check for Doppelgänger Origin
    let isDoppelgangerOrigin = false;
    if (type === 'player' && playerRoles[index].initialRoleId === 'doppelganger') {
        isDoppelgangerOrigin = true;
    }

    // Render Image and Overlay
    faceBack.innerHTML = `
        <img src="images/characters/${imageFile}" class="role-image" alt="${roleNameEn}">
        <div class="role-overlay">
            <div class="role-name-en">${roleNameEn}</div>
            <div class="role-name-zh">${roleNameZh}</div>
        </div>
        ${isDoppelgangerOrigin ? '<div class="mimic-indicator" title="Doppelgänger">🎭</div>' : ''}
    `;
    
    inner.appendChild(faceFront);
    inner.appendChild(faceBack);
    card.appendChild(inner);
    
    // Label outside flip
    const labelDiv = document.createElement('div');
    labelDiv.className = 'card-label';
    labelDiv.innerText = label;
    // Hide labels for center cards
    if (type === 'center') {
        labelDiv.style.display = 'none';
    }
    card.appendChild(labelDiv);
    
    // --- Highlight Logic ---
    let shouldHighlight = false;
    
    // 1. Peek Phase: Highlight current player
    if (gamePhaseState === 'PEEK' && type === 'player' && index === currentPeekIndex) {
        shouldHighlight = true;
    }
    
    // 2. Night Phase: Active Role Logic
    if (gamePhaseState === 'NIGHT' && currentNightRole && !currentNightRole.isFake) {
        const activeRoleId = currentNightRole.mimicId || currentNightRole.id;
        
        // Find Active Player Index (Self)
        let activePlayerIndex = -1;
        if (currentNightRole.mimicId) {
            // Doppelganger is acting
            activePlayerIndex = playerRoles.findIndex(p => p.initialRoleId === 'doppelganger');
        } else {
            // Normal role acting
            activePlayerIndex = playerRoles.findIndex(p => p.initialRoleId === activeRoleId);
        }
        
        // Werewolf Logic
        if (activeRoleId === 'werewolf' && type === 'player') {
             if (playerRoles[index].initialRoleId === 'werewolf' || playerRoles[index].mimickedRole === 'werewolf') {
                 shouldHighlight = true;
             }
        }
        
        // Solo Werewolf: Highlight Center
        if (activeRoleId === 'werewolf' && type === 'center') {
            const werewolfCount = playerRoles.filter(p => p.initialRoleId === 'werewolf' || p.mimickedRole === 'werewolf').length;
            if (werewolfCount === 1) {
                shouldHighlight = true;
            }
        }
        
        // Seer: Highlight Players OR Center
        if (activeRoleId === 'seer') {
            shouldHighlight = true; 
        }
        
        // Drunk: Highlight Center
        if (activeRoleId === 'drunk' && type === 'center') {
            shouldHighlight = true;
        }
        
        // Robber / Troublemaker: Highlight Players EXCEPT Self
        if ((activeRoleId === 'robber' || activeRoleId === 'troublemaker') && type === 'player') {
            if (index !== activePlayerIndex) {
                const isSelected = nightActionState.selection && nightActionState.selection.some(s => s.type === type && s.index === index);
                
                // For Robber: if swapped, only show selected card as green
                if (activeRoleId === 'robber' && nightActionState.swapped) {
                    if (isSelected) {
                        card.classList.add('selected'); // Green border
                    }
                    // Don't highlight others after swap
                } else {
                    // Before swap (or Troublemaker logic)
                    const isSelectionFull = activeRoleId === 'troublemaker' && nightActionState.selection && nightActionState.selection.length >= 2;
                    
                    if (isSelected) {
                        card.classList.add('selected');
                    } else if (!isSelectionFull) {
                        // Only highlight others if selection is NOT full
                        shouldHighlight = true;
                    }
                }
            }
        }
        
        // Selection State (Generic fallback for other roles if needed)
        if (activeRoleId !== 'robber' && activeRoleId !== 'troublemaker') {
            if (nightActionState.selection && nightActionState.selection.some(s => s.type === type && s.index === index)) {
                 shouldHighlight = true;
                 card.classList.add('selected'); 
            }
        }
    }
    
    if (shouldHighlight) {
        card.classList.add('highlight');
    }
    
    // Click Handler
    card.onclick = () => {
        // If it's a flip reveal (Peek or Seer/Robber reveal), toggle class
        // But handleCardClick manages logic. 
        // We need visual flip if the logic says "Reveal".
        handleCardClick(type, index);
    };
    
    return card;
}

function stopGame() {
    isPlaying = false;
    synth.cancel();
    
    clearGameState(); // Clear save on exit
    window.location.href = 'index.html';
}

// --- Auto Test ---
window.runAutoTest = function() {
    console.log("Starting Auto Test...");
    
    // 1. Reset
    stopGame();
    
    // 2. Setup Players (Ensure 4 players)
    while(players.length < 4) addPlayer(`Player ${players.length+1}`);
    while(players.length > 4) removePlayer(players.length-1);
    
    // 3. Build Deck (Werewolf, Seer, Robber, Troublemaker, Villager x2, Mason x2)
    // Just pick first N roles
    deck = [];
    const testRoles = ['werewolf', 'seer', 'robber', 'troublemaker', 'villager', 'villager', 'mason'];
    testRoles.forEach(id => addToDeck(id));
    
    // 4. Start Game
    setTimeout(() => {
        console.log("Starting Peek Phase...");
        startPeekPhase();
        
        // 5. Simulate Peeks
        let peekInterval = setInterval(() => {
            if (gamePhaseState === 'PEEK') {
                console.log(`Peeking Player ${currentPeekIndex}`);
                handleCardClick('player', currentPeekIndex); // Open modal
                setTimeout(() => {
                    closeModal(); 
                    completePeek(); // Close modal
                }, 500);
            } else if (gamePhaseState === 'READY_TO_START') {
                clearInterval(peekInterval);
                console.log("Starting Night Phase...");
                startNightPhase();
                
                // 6. Simulate Night Actions (Random clicks)
                simulateNight();
            }
        }, 1000);
    }, 1000);
};



function simulateNight() {
    let nightInterval = setInterval(() => {
        if (gamePhaseState === 'DAY') {
            clearInterval(nightInterval);
            console.log("Day Phase Reached! Test Complete.");
            return;
        }
        
        if (gamePhaseState === 'NIGHT' && currentNightRole) {
            // Simulate action based on role
            // Just click random things to progress
            // Try clicking a center card or player card
            const randomType = Math.random() > 0.5 ? 'player' : 'center';
            const randomIndex = Math.floor(Math.random() * (randomType === 'player' ? players.length : 3));
            
            handleCardClick(randomType, randomIndex);
            
            // Also try confirming if needed (Werewolf pack)
            if (currentNightRole.id === 'werewolf') {
                 handleWerewolfAction('player', 0); // Force trigger
            }
        }
    }, 2000);
}

// --- Persistence ---
function saveGameState() {
    const dayDurationEl = document.getElementById('day-duration');
    const state = {
        players,
        deck,
        playerRoles,
        centerCards,
        gamePhaseState,
        currentStep,
        nightActionState,
        currentPeekIndex,
        currentLang,
        dayDuration: dayDurationEl ? dayDurationEl.value : (window.savedDayDuration || '5'),
        volume: document.getElementById('volume-control') ? document.getElementById('volume-control').value : (window.savedVolume || 1),
        dayEndTime: window.dayEndTime || null
    };
    localStorage.setItem('happywolf_save', JSON.stringify(state));
}

function loadGameState() {
    const saved = localStorage.getItem('happywolf_save');
    if (!saved) return false;
    
    try {
        const state = JSON.parse(saved);
        
        // Restore State
        players = state.players;
        deck = state.deck;
        playerRoles = state.playerRoles;
        centerCards = state.centerCards;
        gamePhaseState = state.gamePhaseState;
        currentStep = state.currentStep;
        nightActionState = state.nightActionState;
        currentPeekIndex = state.currentPeekIndex;
        currentLang = state.currentLang;
        
        // Restore Day Duration safely
        if (state.dayDuration) {
            window.savedDayDuration = state.dayDuration; // Store in memory for mobile/desktop
            const dayDurationEl = document.getElementById('day-duration');
            if (dayDurationEl) {
                dayDurationEl.value = state.dayDuration;
            }
        }
        
        // Restore Volume safely
        if (state.volume !== undefined) {
            window.savedVolume = state.volume;
            const volEl = document.getElementById('volume-control');
            if (volEl) {
                volEl.value = state.volume;
            }
        }
        
        window.dayEndTime = state.dayEndTime;
        
        // Restore UI
        if (gamePhaseState !== 'SETUP') {
            setupPhase.classList.add('hidden');
            gamePhase.classList.remove('hidden');
            renderTable();
            
            if (gamePhaseState === 'PEEK') {
                updatePeekState();
            } else if (gamePhaseState === 'NIGHT') {
                // Resume Night Phase
                const uniqueRoles = [...new Set(deck)];
                nightSequence = rolesData
                    .filter(r => uniqueRoles.includes(r.id) && r.wakeOrder > 0)
                    .sort((a, b) => a.wakeOrder - b.wakeOrder);
                
                isPlaying = true;
                nextStep();
            } else if (gamePhaseState === 'DAY') {
                // Resume Day Timer
                startDayPhase(true); // true = resume
            } else if (gamePhaseState === 'VOTE') {
                startVotingPhase();
            } else if (gamePhaseState === 'REVEAL') {
                startRevealPhase();
            }
        }
        
        return true;
    } catch (e) {
        console.error("Failed to load save:", e);
        return false;
    }
}

function clearGameState() {
    localStorage.removeItem('happywolf_save');
}

function init() {
    // Define unlockHandler first
    const unlockHandler = () => {
        unlockAudio();
        document.body.removeEventListener('click', unlockHandler);
        document.body.removeEventListener('touchend', unlockHandler);
        document.body.removeEventListener('keydown', unlockHandler);
    };
    window.unlockHandler = unlockHandler; // Expose globally

    // Route based on page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        initSetup();
    } else if (window.location.pathname.endsWith('mobile.html') || window.location.pathname.endsWith('desktop.html')) {
        initGame();
    } else {
        // Fallback for dev environment or other paths
        if (document.getElementById('setup-phase') && !document.getElementById('setup-phase').classList.contains('hidden')) {
            initSetup();
        } else {
            initGame();
        }
    }
}

function initSetup() {
    console.log("Initializing Setup Phase...");
    renderLibrary();
    updateDeckUI();
    
    // Bind Setup Buttons
    document.getElementById('add-player-btn').addEventListener('click', () => {
        addPlayer(`Player ${players.length + 1}`);
    });
    
    document.getElementById('random-seat-btn').addEventListener('click', () => {
        players.sort(() => Math.random() - 0.5);
        renderPlayerList();
    });
    
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    
    document.getElementById('test-audio-btn').addEventListener('click', () => {
        unlockAudio();
        speak(currentLang === 'zh-HK' ? "天黑請閉眼" : "Everyone, close your eyes", null, true);
    });
    
    // Modal Listeners for Setup Phase (Library Info)
    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === roleModal) {
            closeModal();
        }
    });
    
    confirmDeckBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission if any
        unlockAudio();
        
        // Prepare Game Data
        // Shuffle Deck
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        
        // Assign Roles
        playerRoles = players.map((p, i) => ({
            playerId: p.id,
            roleId: deck[i],
            initialRoleId: deck[i],
            revealed: false
        }));
        
        centerCards = deck.slice(players.length).map(roleId => ({
            roleId: roleId,
            revealed: false
        }));
        
        // Force Werewolf Logic
        const werewolfCount = playerRoles.filter(p => p.roleId === 'werewolf').length;
        if (werewolfCount === 0) {
            const centerWerewolfIndex = centerCards.findIndex(c => c.roleId === 'werewolf');
            if (centerWerewolfIndex !== -1) {
                const randomPlayerIndex = Math.floor(Math.random() * players.length);
                const temp = playerRoles[randomPlayerIndex].roleId;
                playerRoles[randomPlayerIndex].roleId = centerCards[centerWerewolfIndex].roleId;
                centerCards[centerWerewolfIndex].roleId = temp;
                playerRoles[randomPlayerIndex].initialRoleId = playerRoles[randomPlayerIndex].roleId;
                console.log(`Force Werewolf: Swapped Player ${randomPlayerIndex} with Center ${centerWerewolfIndex}`);
            }
        }

        // Set Initial Game State
        gamePhaseState = 'PEEK';
        currentPeekIndex = 0;
        
        // Save State
        saveGameState();
        
        // Redirect
        const mode = document.getElementById('interface-mode').value;
        if (mode === 'mobile') {
            window.location.href = 'mobile.html';
        } else {
            window.location.href = 'desktop.html';
        }
    });

    // Smart Default for Interface Mode
    const interfaceMode = document.getElementById('interface-mode');
    if (interfaceMode && window.innerWidth < 768) {
        interfaceMode.value = 'mobile';
    }
    
    // Unlock Audio on interaction
    document.body.addEventListener('click', window.unlockHandler);
    document.body.addEventListener('touchend', window.unlockHandler);
    document.body.addEventListener('keydown', window.unlockHandler);
    
    // Load previous setup if available? (Optional, maybe later)
    // For now, default players
    addPlayer("Player 1");
    addPlayer("Player 2");
    addPlayer("Player 3");
}

function initGame() {
    console.log("Initializing Game Phase...");
    setupPhase.classList.add('hidden');
    gamePhase.classList.remove('hidden');
    
    // Initialize Game UI Elements
    instructionBanner = document.getElementById('instruction-banner');
    instructionText = document.getElementById('instruction-text');
    
    // Load State
    if (!loadGameState()) {
        console.warn("No game state found, redirecting to setup.");
        window.location.href = 'index.html';
        return;
    }
    
    // Debug: Log initial roles for testing
    logCurrentRoles("Initial Game State");
    
    // Bind Game Buttons
    menuBtn.addEventListener('click', () => {
        pauseMenu.classList.remove('hidden');
    });
    resumeBtn.addEventListener('click', () => {
        pauseMenu.classList.add('hidden');
    });
    endGameBtn.addEventListener('click', () => {
        pauseMenu.classList.add('hidden');
        stopGame();
    });
    
    readyBtn.addEventListener('click', () => {
        unlockAudio();
        startNightPhase();
    });
    
    // Bind Manual Vote Button (for both desktop and mobile)
    const manualVoteBtn = document.getElementById('manual-vote-btn');
    if (manualVoteBtn) {
        manualVoteBtn.addEventListener('click', () => {
            console.log("Manual Vote Button Clicked");
            clearInterval(dayTimerInterval);
            startVotingPhase();
        });
    }
    
    closeModalBtn.addEventListener('click', () => {
        closeModal();
        if (gamePhaseState === 'PEEK') completePeek();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === roleModal) {
            closeModal();
            if (gamePhaseState === 'PEEK') completePeek();
        }
    });
    
    // Unlock Audio
    document.body.addEventListener('click', window.unlockHandler);
    document.body.addEventListener('touchend', window.unlockHandler);
    document.body.addEventListener('keydown', window.unlockHandler);
    
    // Handle Resize
    window.addEventListener('resize', () => {
        renderTable();
    });
    
    // Initial Render
    renderTable();
    if (gamePhaseState === 'PEEK') {
        updatePeekState();
    }
}
function logCurrentRoles(label = "Current Roles") {
    console.log(`--- ${label} ---`);
    playerRoles.forEach((p, i) => console.log(`Player ${i + 1}: ${p.roleId} ${p.initialRoleId !== p.roleId ? `(was ${p.initialRoleId})` : ''}`));
    centerCards.forEach((c, i) => console.log(`Center ${i + 1}: ${c.roleId}`));
    console.log("---------------------");
}
init();


function animateSwap(card1, card2) {
    if (!card1 || !card2) return;
    
    // Add swap class
    card1.classList.add('swapping');
    card2.classList.add('swapping');
    
    // Remove after animation
    setTimeout(() => {
        card1.classList.remove('swapping');
        card2.classList.remove('swapping');
    }, 1000);
}
