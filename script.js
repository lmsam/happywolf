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
        desc: { 'zh-HK': '互相確認身份。如果得你一隻狼，可以睇一張中間牌。', 'en-US': 'See other Werewolves. If alone, view a center card.' },
        tips: { 'zh-HK': '扮成好人，誤導其他人！', 'en-US': 'Pretend to be a Villager and mislead others!' },
        team: 'werewolf',
        wakeOrder: 2, duration: 10, 
        scriptStart: { 'zh-HK': '狼人請擘大眼，互相確認身份', 'en-US': 'Werewolves, wake up and look for other werewolves.' },
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
function init() {
    // Default players
    addPlayer('Player 1');
    addPlayer('Player 2');
    addPlayer('Player 3');
    addPlayer('Player 4');
    
    renderLibrary();
    updateDeckUI();
    updateUIText();
    
    addPlayerBtn.addEventListener('click', () => addPlayer(`Player ${players.length + 1}`));
    randomSeatBtn.addEventListener('click', randomizeSeats);
    
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    
    confirmDeckBtn.addEventListener('click', startPeekPhase);
    
    // Menu Listeners
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
    
    readyBtn.addEventListener('click', startNightPhase);
    
    closeModalBtn.addEventListener('click', () => {
        closeModal();
        // If in Peek Phase, closing modal means "Done Peeking"
        if (gamePhaseState === 'PEEK') {
            completePeek();
        }
    });
    
    // Global click for modal outside
    window.addEventListener('click', (e) => {
        if (e.target === roleModal) {
            closeModal();
            if (gamePhaseState === 'PEEK') completePeek();
        }
    });
    
    // Handle Resize
    window.addEventListener('resize', () => {
        if (!gamePhase.classList.contains('hidden')) {
            renderTable();
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'zh-HK' ? 'en-US' : 'zh-HK';
    updateUIText();
    renderLibrary();
    updateDeckUI();
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
    // Shuffle Deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    // Assign Roles
    playerRoles = players.map((p, i) => ({
        playerId: p.id,
        roleId: deck[i],
        revealed: false
    }));
    
    centerCards = deck.slice(players.length).map(roleId => ({
        roleId: roleId,
        revealed: false
    }));
    
    // Force Werewolf Logic: Ensure at least 1 Werewolf is in play if available
    const playerHasWerewolf = playerRoles.some(p => p.roleId === 'werewolf');
    if (!playerHasWerewolf) {
        const centerWerewolfIndex = centerCards.findIndex(c => c.roleId === 'werewolf');
        
        if (centerWerewolfIndex !== -1) {
            // Found a werewolf in center, swap with a random player
            const randomPlayerIndex = Math.floor(Math.random() * players.length);
            
            console.log(`Force Werewolf: Swapping Player ${randomPlayerIndex} (${playerRoles[randomPlayerIndex].roleId}) with Center ${centerWerewolfIndex} (werewolf)`);
            
            const temp = playerRoles[randomPlayerIndex].roleId;
            playerRoles[randomPlayerIndex].roleId = centerCards[centerWerewolfIndex].roleId;
            centerCards[centerWerewolfIndex].roleId = temp;
        }
    }

    setupPhase.classList.add('hidden');
    gamePhase.classList.remove('hidden');
    readyBtn.classList.add('hidden');
    
    gamePhaseState = 'PEEK';
    currentPeekIndex = 0;
    
    renderTable();
    updatePeekState();
}

function updatePeekState() {
    if (currentPeekIndex < players.length) {
        const p = players[currentPeekIndex];
        instructionText.innerText = `${p.name}, ${i18n[currentLang].revealBtn} / Tap to view`;
        renderTable(); // Re-render to update highlights
    } else {
        instructionText.innerText = i18n[currentLang].ready;
        readyBtn.classList.remove('hidden');
        gamePhaseState = 'READY_TO_START';
        renderTable();
    }
}

function completePeek() {
    // Called when modal closes during PEEK phase
    currentPeekIndex++;
    updatePeekState();
}

// --- Night Phase ---
function startNightPhase() {
    readyBtn.classList.add('hidden');
    gamePhaseState = 'NIGHT';
    
    const uniqueRoles = [...new Set(deck)];
    nightSequence = rolesData
        .filter(r => uniqueRoles.includes(r.id) && r.wakeOrder > 0)
        .sort((a, b) => a.wakeOrder - b.wakeOrder);
        
    isPlaying = true;
    currentStep = -1;
    
    // Reset any highlights
    renderTable();
    
    setTimeout(nextStep, 1000);
}

function nextStep() {
    if (!isPlaying) return;
    
    // Reset Action State
    nightActionState = { viewed: 0, swapped: false, selection: [] };
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
        
        instructionText.innerHTML = `${role.name[currentLang]} ${i18n[currentLang].action} <span id="action-timer"></span>`;
        
        speak(role.scriptStart[currentLang], () => {
            // Start Timer
            startActionTimer(role.duration || 10, () => {
                // Timer End Callback
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

function startDayPhase() {
    const durationMin = parseInt(document.getElementById('day-duration').value);
    let timeLeft = durationMin * 60;
    
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.classList.remove('hidden');
    
    updateTimerDisplay(timeLeft);
    
    if (dayTimerInterval) clearInterval(dayTimerInterval);
    
    dayTimerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(dayTimerInterval);
            startVotingPhase();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('timer-display').innerText = `${m}:${s}`;
}

function startVotingPhase() {
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.innerText = "VOTE!";
    timerDisplay.classList.add('vote-pulse');
    
    // Play Audio
    const voteScript = currentLang === 'zh-HK' ? "時間到！請投票！" : "Time's up! Please vote!";
    speak(voteScript, () => {
        // Wait a bit for voting to happen manually
        setTimeout(startRevealPhase, 5000);
    });
}

function startRevealPhase() {
    gamePhaseState = 'REVEAL';
    
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.classList.remove('vote-pulse');
    timerDisplay.innerText = currentLang === 'zh-HK' ? "揭示身份" : "Reveal Roles";
    
    instructionText.innerText = currentLang === 'zh-HK' ? "點擊卡牌查看最終身份" : "Tap cards to reveal final roles";
    
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
            currentStep++;
            nextStep();
        }, 2000);
    });
}

// Helper to get card element
function getCardElement(type, index) {
    return document.querySelector(`.table-card[data-type="${type}"][data-index="${index}"]`);
}

function speak(text, callback) {
    if (!isPlaying) return;
    
    // Cancel any previous speech to prevent queue buildup
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang;
    utterance.volume = document.getElementById('volume-control').value;
    utterance.rate = 0.9;
    
    let callbackCalled = false;
    
    const done = () => {
        if (!callbackCalled && callback) {
            callbackCalled = true;
            callback();
        }
    };
    
    utterance.onend = done;
    utterance.onerror = (e) => {
        console.error("Speech Error:", e);
        done();
    };
    
    synth.speak(utterance);
    
    // Fallback: If speech doesn't end within reasonable time (e.g. text length * 200ms + 1s), force callback
    const estimatedDuration = (text.length * 200) + 1000;
    setTimeout(done, estimatedDuration);
}

// --- Interaction Handler ---
function handleCardClick(type, index) {
    if (gamePhaseState === 'PEEK') {
        if (type === 'player' && index === currentPeekIndex) {
            // Flip Card
            const card = getCardElement(type, index);
            if (card) {
                card.classList.add('revealed');
                // Auto close after 3s
                setTimeout(() => {
                    card.classList.remove('revealed');
                    completePeek();
                }, 3000);
            }
        }
        return;
    }
    
    if (gamePhaseState === 'NIGHT' && currentNightRole) {
        // Block interaction if it's a fake turn
        if (currentNightRole.isFake) return;
        
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
    
    // 2. Check if target role has an action
    const actionRoles = ['seer', 'robber', 'troublemaker', 'werewolf', 'drunk'];
    
    if (actionRoles.includes(targetRoleId)) {
        // Start Mimic Sub-turn
        currentNightRole.mimicId = targetRoleId;
        
        // Update Instruction
        const roleName = rolesData.find(r => r.id === targetRoleId).name[currentLang];
        instructionText.innerText = `${i18n[currentLang].roleTitle} ${roleName}! ${i18n[currentLang].actionTitle}...`;
        
        // Reset Action State for the new role
        nightActionState = { viewed: 0, swapped: false, selection: [], confirmed: false };
        
        // Re-render to update highlights for the new role
        renderTable();
        
        // Note: We do NOT call finishNightStep here. User must perform the new action.
    } else {
        // Passive role (Villager, Tanner, Hunter, Mason, Minion, Insomniac)
        // Note: Mason/Minion/Insomniac usually have info, but for simplicity in Doppelganger:
        // - Mason/Minion: You see them? (Complex to implement "wake up" again). 
        //   Standard rules: You are now that role. You wake up immediately if that role wakes up.
        //   But since Doppelganger is first, other roles haven't woken up yet.
        //   Actually, if you copy Mason, you are a Mason. You wake up when Masons wake up? 
        //   No, Doppelganger performs action *immediately*.
        //   If copy Minion: You see Werewolves?
        //   If copy Mason: You see other Masons?
        //   Let's keep it simple: If it's an "Action" role (manipulation), do it. 
        //   If "Info" role (Minion, Mason, Insomniac), maybe show info?
        //   For now, treat as passive or show alert.
        
        // Let's just finish for non-action roles for now to avoid complexity overload.
        // Or maybe show a quick alert "You are now [Role]"
        setTimeout(finishNightStep, 2000);
    }
}

function handleWerewolfAction(type, index) {
    // Werewolf: If solo, can peek 1 center. If pack, just confirm.
    const werewolfCount = playerRoles.filter(p => p.roleId === 'werewolf').length;
    
    if (werewolfCount === 1) {
        // Solo werewolf can peek center
        if (type !== 'center') return;
        if (nightActionState.viewed > 0) return;
        
        const targetRoleId = centerCards[index].roleId;
        openRoleModal(targetRoleId);
        
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
        setTimeout(finishNightStep, 3500); // Wait for flip back + buffer
    } else if (nightActionState.viewed === 2 && nightActionState.selection.every(s => s.type === 'center')) {
        // Viewed 2 center -> Done
        setTimeout(finishNightStep, 3500);
    }
}

function handleRobberAction(type, index) {
    // Robber: Swap with 1 Player and View
    if (type !== 'player') return;
    if (nightActionState.swapped) return;
    
    // Wait, Robber swaps SELF with Target. We need to know who is Robber.
    // If Mimicking, we are the current player (or the doppelganger slot).
    // Actually, Robber swaps "My Card" with "Target Card".
    
    let robberIdx = playerRoles.findIndex(p => p.roleId === 'robber');
    
    // Special handling for Doppelganger mimicking Robber
    if (currentNightRole.mimicId === 'robber') {
        robberIdx = playerRoles.findIndex(p => p.roleId === 'doppelganger');
    }
    
    if (robberIdx === -1) return; 
    if (index === robberIdx) return; // Can't rob self
    
    // Swap Data
    const temp = playerRoles[robberIdx].roleId;
    playerRoles[robberIdx].roleId = playerRoles[index].roleId;
    playerRoles[index].roleId = temp;
    
    nightActionState.swapped = true;
    
    // Re-render to update DOM (images might change? No, images stay with card, but we need to update the "Back" face of the Robber's card to show the NEW role)
    // Actually, we should update the DOM for the Robber's card so when they flip it, they see the NEW role.
    renderTable();
    
    // Reveal new role to Robber (Flip Robber's card)
    const robberCard = getCardElement('player', robberIdx);
    if (robberCard) {
        robberCard.classList.add('revealed');
        setTimeout(() => robberCard.classList.remove('revealed'), 3000);
    }
    
    setTimeout(finishNightStep, 3500);
}

function handleTroublemakerAction(type, index) {
    // Swap 2 players
    if (type !== 'player') return;
    
    // Toggle selection
    const existingIdx = nightActionState.selection.findIndex(s => s.index === index);
    if (existingIdx >= 0) {
        nightActionState.selection.splice(existingIdx, 1);
    } else {
        if (nightActionState.selection.length < 2) {
            nightActionState.selection.push({ type, index });
        }
    }
    
    renderTable(); // Update selection highlights
    
    if (nightActionState.selection.length === 2) {
        // Swap
        const idx1 = nightActionState.selection[0].index;
        const idx2 = nightActionState.selection[1].index;
        
        const temp = playerRoles[idx1].roleId;
        playerRoles[idx1].roleId = playerRoles[idx2].roleId;
        playerRoles[idx2].roleId = temp;
        
        nightActionState.swapped = true;
        setTimeout(finishNightStep, 1000);
    }
}

function handleDrunkAction(type, index) {
    // Swap self with Center
    if (type !== 'center') return;
    if (nightActionState.swapped) return;
    
    let drunkIdx = playerRoles.findIndex(p => p.roleId === 'drunk');
    
    // Special handling for Doppelganger mimicking Drunk
    if (currentNightRole.mimicId === 'drunk') {
        drunkIdx = playerRoles.findIndex(p => p.roleId === 'doppelganger');
    }
    
    if (drunkIdx === -1) return;
    
    // Swap
    const temp = playerRoles[drunkIdx].roleId;
    playerRoles[drunkIdx].roleId = centerCards[index].roleId;
    centerCards[index].roleId = temp;
    
    nightActionState.swapped = true;
    setTimeout(finishNightStep, 1000);
}


// --- Render Table (Grid Layout) ---
function renderTable() {
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
            const roleData = rolesData.find(d => d.id === r.roleId);
            if (roleData) {
                roleNameEn = roleData.name['en-US'];
                roleNameZh = roleData.name['zh-HK'];
                roleId = roleData.id;
            }
        }
    } else {
        // Center card
        const rId = centerCards[index];
        const roleData = rolesData.find(d => d.id === rId);
        if (roleData) {
            roleNameEn = roleData.name['en-US'];
            roleNameZh = roleData.name['zh-HK'];
            roleId = roleData.id;
        }
    }
    
    // Image Mapping
    // Use global roleImageMap
    const imageFile = roleImageMap[roleId] || 'Villager.png'; // Default fallback
    
    // Render Image and Overlay
    faceBack.innerHTML = `
        <img src="images/characters/${imageFile}" class="role-image" alt="${roleNameEn}">
        <div class="role-overlay">
            <div class="role-name-en">${roleNameEn}</div>
            <div class="role-name-zh">${roleNameZh}</div>
        </div>
    `;
    
    inner.appendChild(faceFront);
    inner.appendChild(faceBack);
    card.appendChild(inner);
    
    // Label outside flip
    const labelDiv = document.createElement('div');
    labelDiv.className = 'card-label';
    labelDiv.innerText = label;
    card.appendChild(labelDiv);
    
    // --- Highlight Logic ---
    let shouldHighlight = false;
    
    // 1. Peek Phase: Highlight current player
    if (gamePhaseState === 'PEEK' && type === 'player' && index === currentPeekIndex) {
        shouldHighlight = true;
    }
    
    // 2. Night Phase: Active Role Logic
    if (gamePhaseState === 'NIGHT' && currentNightRole) {
        const activeRoleId = currentNightRole.mimicId || currentNightRole.id;
        
        // Werewolf Pack Logic (Highlight teammates)
        if (activeRoleId === 'werewolf' && type === 'player') {
             if (playerRoles[index].roleId === 'werewolf') {
                 shouldHighlight = true;
             }
        }
        
        // Target Highlighting Logic
        // Drunk: Highlight Center
        if (activeRoleId === 'drunk' && type === 'center') {
            shouldHighlight = true;
        }
        
        // Solo Werewolf: Highlight Center
        if (activeRoleId === 'werewolf' && type === 'center') {
            // Check if solo
            const werewolfCount = playerRoles.filter(p => p.roleId === 'werewolf').length;
            if (werewolfCount === 1) {
                shouldHighlight = true;
            }
        }
        
        // Seer: Highlight Players OR Center
        if (activeRoleId === 'seer') {
            shouldHighlight = true; // Can pick anything
        }
        
        // Robber / Troublemaker: Highlight Players (except self for Robber?)
        if ((activeRoleId === 'robber' || activeRoleId === 'troublemaker') && type === 'player') {
            shouldHighlight = true;
        }
        
        // Selection State (User clicked something)
        if (nightActionState.selection && nightActionState.selection.some(s => s.type === type && s.index === index)) {
             shouldHighlight = true;
             // Add a specific class for 'selected' vs 'target' if needed, but highlight works for now
             card.classList.add('selected'); 
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
    
    // Check if revealed state
    // In Peek phase, we might want to keep it revealed if it was just clicked? 
    // Actually handleCardClick opens modal currently. We want to change that to Flip.
    
    return card;
}

function speak(text, callback) {
    if (!isPlaying) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang;
    utterance.volume = document.getElementById('volume-control').value;
    utterance.rate = 0.9;
    utterance.onend = () => { if (callback) callback(); };
    synth.speak(utterance);
}

function stopGame() {
    isPlaying = false;
    synth.cancel();
    gamePhase.classList.add('hidden');
    setupPhase.classList.remove('hidden');
    deck = [];
    updateDeckUI();
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

init();

