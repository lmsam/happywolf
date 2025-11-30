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
        alertDeckCount: '請選擇 {target} 張卡牌！',
        roleAction: {
            apprenticeseer: "學徒預言家，請查看一張中間卡牌。",
            witch: "女巫，請查看一張中間卡牌，然後與任何玩家交換。",
            troublemaker: "搗蛋鬼，請交換兩位玩家的卡牌。",
            drunk: "醉漢，請將你的卡牌與一張中間卡牌交換。",
            insomniac: "失眠者，請查看你自己的卡牌。",
            doppelganger: "化身幽靈，請查看一張其他玩家的卡牌。",
            seer: "預言家，請查看一位玩家的卡牌，或兩張中間卡牌。",
            robber: "強盜，請查看一位玩家的卡牌，然後與你的卡牌交換。",
            minion: "爪牙，請確認狼人身份。",
            sentinel: "守衛，請將盾牌標記放在一位玩家的卡牌上。",
            pi: "偵探，請查看最多兩張玩家卡牌。如果你睻到狼人或爪牙，你會變成該角色。",
            mysticwolf: "神秘狼，你可以睇一張其他玩家嘅牌。",
            revealer: "揭示者，翻開一張玩家牌。如果係狼人或皮匠，要翻返落面。"
        },
        shieldBlocked: "你被盾牌保護,無法行動。",
        loneWolf: "你係唯一一隻狼，可以睇一張中間卡。",
        werewolf: "狼人，請互相確認身份。"
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
        alertDeckCount: 'Please select {target} cards!',
        roleAction: {
            apprenticeseer: "Apprentice Seer, view one center card.",
            witch: "Witch, view a center card then swap it with any player.",
            troublemaker: "Troublemaker, swap two players.",
            drunk: "Drunk, swap your card with a center card.",
            insomniac: "Insomniac, view your own card.",
            doppelganger: "Doppelgänger, view another player's card.",
            seer: "Seer, view a player card or two center cards.",
            robber: "Robber, view a player card then swap with yours.",
            minion: "Minion, check who the werewolves are.",
            sentinel: "Sentinel, place a shield token on a player card.",
            pi: "P.I., view up to 2 player cards. If you see a Werewolf or Minion, you become that role.",
            mysticwolf: "Mystic Wolf, you may look at one other player's card.",
            revealer: "Revealer, flip one player's card face up. If Werewolf or Tanner, flip it back."
        },
        shieldBlocked: "You are shielded and cannot act.",
        loneWolf: "You are alone. You may view one center card.",
        werewolf: "Werewolves, wake up and look for other werewolves."
    }
};

const rolesData = [
    { 
        id: 'sentinel', 
        name: { 'zh-HK': '守衛', 'en-US': 'Sentinel' },
        desc: { 'zh-HK': '將盾牌標記放在任何玩家的卡牌上。', 'en-US': 'Place a shield token on any player\'s card.' },
        tips: { 'zh-HK': '保護重要角色，或者保護自己！', 'en-US': 'Protect important roles, or yourself!' },
        team: 'village',
        wakeOrder: 1, duration: 10, 
        scriptStart: { 'zh-HK': '守衛請擘大眼，將盾牌標記放在任何玩家的卡牌上', 'en-US': 'Sentinel, wake up. You may place a shield token on any player\'s card.' },
        scriptEnd: { 'zh-HK': '守衛請閉眼', 'en-US': 'Sentinel, close your eyes.' }
    },
    { 
        id: 'doppelganger', 
        name: { 'zh-HK': '化身幽靈', 'en-US': 'Doppelgänger' },
        desc: { 'zh-HK': '複製另一個玩家的技能。', 'en-US': 'Look at another player\'s card and become that role.' },
        tips: { 'zh-HK': '如果睇到狼人，你就會變成狼人！', 'en-US': 'If you see a Werewolf, you become a Werewolf!' },
        team: 'village', // Variable, but starts as village usually
        wakeOrder: 2, duration: 10, 
        scriptStart: { 'zh-HK': '化身幽靈請擘大眼，睇一張其他人嘅牌', 'en-US': 'Doppelgänger, wake up and look at another player\'s card.' },
        scriptEnd: { 'zh-HK': '化身幽靈請閉眼', 'en-US': 'Doppelgänger, close your eyes.' }
    },
    { 
        id: 'werewolf', 
        name: { 'zh-HK': '狼人', 'en-US': 'Werewolf' },
        desc: { 'zh-HK': '互相確認身份。如果只有你一個，可以睇一張中間牌。', 'en-US': 'Wake up and look for other werewolves. If alone, look at a center card.' },
        tips: { 'zh-HK': '扮好人！', 'en-US': 'Act like a villager!' },
        team: 'werewolf',
        wakeOrder: 3, duration: 10, 
        scriptStart: { 'zh-HK': '狼人請擘大眼，互相確認身份。如果你係唯一一隻狼，可以睇一張中間嘅牌。', 'en-US': 'Werewolves, wake up and look for other werewolves. If you are the only werewolf, you may look at one center card.' },
        scriptEnd: { 'zh-HK': '狼人請閉眼', 'en-US': 'Werewolves, close your eyes.' }
    },
    { 
        id: 'dreamwolf', 
        name: { 'zh-HK': '夢遊狼', 'en-US': 'Dream Wolf' },
        desc: { 'zh-HK': '你係狼人，但唔會同其他狼人一齊醒來。其他狼人知道你係邊個，但你唔知道佢哋係邊個。', 'en-US': 'You are a Werewolf, but you don\'t wake with other Werewolves. They know who you are, but you don\'t know who they are.' },
        tips: { 'zh-HK': '小心！你唔知道邊個係你嘅隊友！', 'en-US': 'Be careful! You don\'t know who your teammates are!' },
        team: 'werewolf',
        wakeOrder: -1, // Doesn't actually wake up
        scriptStart: { 'zh-HK': '', 'en-US': '' }, // No separate turn
        scriptEnd: { 'zh-HK': '', 'en-US': '' }
    },
    { 
        id: 'minion', 
        name: { 'zh-HK': '爪牙', 'en-US': 'Minion' },
        desc: { 'zh-HK': '知道邊個係狼人，但狼人唔知你係邊個。', 'en-US': 'Know who the Werewolves are, but they don\'t know you.' },
        tips: { 'zh-HK': '保護狼人，甚至幫佢哋頂罪！', 'en-US': 'Protect the Werewolves, even sacrifice yourself!' },
        team: 'werewolf',
        wakeOrder: 4, duration: 10, 
        scriptStart: { 'zh-HK': '爪牙請擘大眼，狼人請舉起手指公俾爪牙確認身份', 'en-US': 'Minion, wake up. Werewolves, stick out your thumb so the Minion can see you.' },
        scriptEnd: { 'zh-HK': '爪牙請閉眼，狼人請收埋手指公', 'en-US': 'Minion, close your eyes. Werewolves, put your thumbs away.' }
    },
    { 
        id: 'mason', 
        name: { 'zh-HK': '守夜人', 'en-US': 'Mason' },
        desc: { 'zh-HK': '互相確認身份。如果你係唯一守夜人，即係另一張喺中間。', 'en-US': 'See other Masons. If alone, the other is in the center.' },
        tips: { 'zh-HK': '第一時間搵同伴！', 'en-US': 'Find your partner immediately!' },
        team: 'village',
        wakeOrder: 5, duration: 10, 
        scriptStart: { 'zh-HK': '守夜人請擘大眼，互相確認身份', 'en-US': 'Masons, wake up and look for other Masons.' },
        scriptEnd: { 'zh-HK': '守夜人請閉眼', 'en-US': 'Masons, close your eyes.' }
    },
    { 
        id: 'seer', 
        name: { 'zh-HK': '預言家', 'en-US': 'Seer' },
        desc: { 'zh-HK': '查看一張玩家卡或兩張中間卡。', 'en-US': 'View a player card or 2 center cards.' },
        tips: { 'zh-HK': '小心唔好太早暴露身份！', 'en-US': 'Don\'t reveal yourself too early!' },
        team: 'village',
        wakeOrder: 6, duration: 10, 
        scriptStart: { 'zh-HK': '預言家請擘大眼，睇一張其他人嘅牌，或者睇中間兩張牌', 'en-US': 'Seer, wake up. You may look at another player\'s card or two of the center cards.' },
        scriptEnd: { 'zh-HK': '預言家請閉眼', 'en-US': 'Seer, close your eyes.' }
    },
    { 
        id: 'apprenticeseer', 
        name: { 'zh-HK': '學徒預言家', 'en-US': 'Apprentice Seer' },
        desc: { 'zh-HK': '查看一張中間卡。', 'en-US': 'View one center card.' },
        tips: { 'zh-HK': '你睇到嘅資訊好有用！', 'en-US': 'The information you see is valuable!' },
        team: 'village',
        wakeOrder: 7, duration: 10, 
        scriptStart: { 'zh-HK': '學徒預言家請擘大眼，睇一張中間嘅牌', 'en-US': 'Apprentice Seer, wake up. You may look at one of the center cards.' },
        scriptEnd: { 'zh-HK': '學徒預言家請閉眼', 'en-US': 'Apprentice Seer, close your eyes.' }
    },
    { 
        id: 'pi', 
        name: { 'zh-HK': '偵探', 'en-US': 'P.I.' },
        desc: { 'zh-HK': '查看最多兩張玩家卡。如果睇到狼人、爪牙或皮匠，你會變成該角色。', 'en-US': 'View up to 2 player cards. If you see a Werewolf, Minion, or Tanner, you become that role.' },
        tips: { 'zh-HK': '小心！睇到狼人你就會變成狼人！睇到皮匠你就要令自己被殺！', 'en-US': 'Be careful! See a Werewolf and you become one! See a Tanner and you must get killed!' },
        team: 'village',
        wakeOrder: 5.5, duration: 15, 
        scriptStart: { 'zh-HK': '偵探請擘大眼，你可以睇最多兩張其他玩家嘅牌。如果你睇到狼人、爪牙或者皮匠，你就會變成嗰個角色，然後要即刻閉眼。', 'en-US': 'P.I., wake up. You may look at up to two other players\' cards. If you see a Werewolf, Minion, or Tanner, you become that role and must immediately close your eyes.' },
        scriptEnd: { 'zh-HK': '偵探請閉眼', 'en-US': 'P.I., close your eyes.' }
    },
    { 
        id: 'robber', 
        name: { 'zh-HK': '強盜', 'en-US': 'Robber' },
        desc: { 'zh-HK': '交換並查看另一玩家的卡。你變成新角色！', 'en-US': 'Swap and view another player\'s card. You become that role!' },
        tips: { 'zh-HK': '如果你偷到狼人，你就係狼人啦！', 'en-US': 'If you steal a Werewolf, you are now a Werewolf!' },
        team: 'village',
        wakeOrder: 8, duration: 10, 
        scriptStart: { 'zh-HK': '強盜請擘大眼，將自己嘅牌同其他人交換，然後睇下新嘅牌', 'en-US': 'Robber, wake up. You may exchange your card with another player\'s card, and then view your new card.' },
        scriptEnd: { 'zh-HK': '強盜請閉眼', 'en-US': 'Robber, close your eyes.' }
    },
    { 
        id: 'witch', 
        name: { 'zh-HK': '女巫', 'en-US': 'Witch' },
        desc: { 'zh-HK': '查看一張中間卡，然後將其與任何玩家交換。', 'en-US': 'View a center card, then swap it with any player.' },
        tips: { 'zh-HK': '你可以將狼人卡換俾其他人！', 'en-US': 'You can swap a Werewolf card to someone else!' },
        team: 'village',
        wakeOrder: 10, duration: 10, 
        scriptStart: { 'zh-HK': '女巫請擘大眼，睇一張中間嘅牌，然後將佢同任何一個玩家交換', 'en-US': 'Witch, wake up. You may look at one of the center cards and then exchange it with any player\'s card.' },
        scriptEnd: { 'zh-HK': '女巫請閉眼', 'en-US': 'Witch, close your eyes.' }
    },
    { 
        id: 'troublemaker', 
        name: { 'zh-HK': '搗蛋鬼', 'en-US': 'Troublemaker' },
        desc: { 'zh-HK': '交換兩名玩家的卡，但唔可以睇。', 'en-US': 'Swap two other players\' cards without looking.' },
        tips: { 'zh-HK': '製造混亂，令狼人唔知自己係邊個！', 'en-US': 'Create chaos so Werewolves don\'t know who they are!' },
        team: 'village',
        wakeOrder: 11, duration: 10, 
        scriptStart: { 'zh-HK': '搗蛋鬼請擘大眼，交換兩個人嘅牌', 'en-US': 'Troublemaker, wake up. You may exchange cards between two other players.' },
        scriptEnd: { 'zh-HK': '搗蛋鬼請閉眼', 'en-US': 'Troublemaker, close your eyes.' }
    },
    { 
        id: 'drunk', 
        name: { 'zh-HK': '酒鬼', 'en-US': 'Drunk' },
        desc: { 'zh-HK': '將自己嘅卡同中間一張卡交換，但唔可以睇。', 'en-US': 'Swap your card with a center card without looking.' },
        tips: { 'zh-HK': '你唔知自己變成咩，小心講嘢！', 'en-US': 'You don\'t know what you became, be careful!' },
        team: 'village',
        wakeOrder: 12, duration: 10, 
        scriptStart: { 'zh-HK': '酒鬼請擘大眼，將自己嘅牌同中間其中一張牌交換', 'en-US': 'Drunk, wake up and exchange your card with a card from the center.' },
        scriptEnd: { 'zh-HK': '酒鬼請閉眼', 'en-US': 'Drunk, close your eyes.' }
    },
    { 
        id: 'insomniac', 
        name: { 'zh-HK': '失眠者', 'en-US': 'Insomniac' },
        desc: { 'zh-HK': '最後醒來，查看自己的卡有無變。', 'en-US': 'Wake up last and check if your card changed.' },
        tips: { 'zh-HK': '如果你變咗狼人，記得要幫狼人！', 'en-US': 'If you became a Werewolf, help them!' },
        team: 'village',
        wakeOrder: 13, duration: 10, 
        scriptStart: { 'zh-HK': '失眠者請擘大眼，確認自己嘅身份', 'en-US': 'Insomniac, wake up and look at your card.' },
        scriptEnd: { 'zh-HK': '失眠者請閉眼', 'en-US': 'Insomniac, close your eyes.' }
    },
    { 
        id: 'mysticwolf', 
        name: { 'zh-HK': '神秘狼', 'en-US': 'Mystic Wolf' },
        desc: { 'zh-HK': '狼人陣營。狼人回合後，可以睇一張其他玩家嘅牌。', 'en-US': 'Werewolf team. After werewolf phase, look at one other player\'s card.' },
        tips: { 'zh-HK': '可以扮 Robber 話自己搶咗嗰個人嘅牌！', 'en-US': 'Claim Robber and say you stole the card you viewed!' },
        team: 'werewolf',
        wakeOrder: 4.5, duration: 10, 
        scriptStart: { 'zh-HK': '神秘狼請擘大眼，你可以睇一張其他玩家嘅牌', 'en-US': 'Mystic Wolf, wake up. You may look at one other player\'s card.' },
        scriptEnd: { 'zh-HK': '神秘狼請閉眼', 'en-US': 'Mystic Wolf, close your eyes.' }
    },
    { 
        id: 'revealer', 
        name: { 'zh-HK': '揭示者', 'en-US': 'Revealer' },
        desc: { 'zh-HK': '翻開一張玩家牌。如果係村民陣營就保持翻開；狼人/皮匠就蓋返。', 'en-US': 'Flip one player\'s card face up. Village cards stay revealed; Werewolf/Tanner flip back.' },
        tips: { 'zh-HK': '揭到村民可以確認身份，揭到狼人只有你知！', 'en-US': 'Reveal a villager to confirm them; reveal a werewolf and only you know!' },
        team: 'village',
        wakeOrder: 14, duration: 10, 
        scriptStart: { 'zh-HK': '揭示者請擘大眼，翻開一張其他玩家嘅牌。如果係狼人或者皮匠，翻返落面', 'en-US': 'Revealer, wake up. Flip one player\'s card face up. If it is a Werewolf or Tanner, flip it back face down.' },
        scriptEnd: { 'zh-HK': '揭示者請閉眼', 'en-US': 'Revealer, close your eyes.' }
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
    // Auto-save when player name changes
    if (typeof saveSetupConfig === 'function') {
        saveSetupConfig();
    }
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
    'sentinel': 'Sentinel.jpg',
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
    'dreamwolf': 'DreamWolf.png',
    'minion': 'minion.png',
    'apprenticeseer': 'ApprenticeSeer.png',
    'witch': 'Witch.png',
    'pi': 'PI.png',
    'mysticwolf': 'MysticWolf.png',
    'revealer': 'Revealer.png'
};

function renderLibrary() {
    libraryGrid.innerHTML = '';
    
    // Sort roles by wakeOrder for display (non-waking roles like villager go to the end)
    const sortedRoles = [...rolesData].sort((a, b) => {
        const orderA = a.wakeOrder === -1 ? 999 : a.wakeOrder;
        const orderB = b.wakeOrder === -1 ? 999 : b.wakeOrder;
        return orderA - orderB;
    });
    
    sortedRoles.forEach(role => {
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
    // Auto-save when deck changes
    if (typeof saveSetupConfig === 'function') {
        saveSetupConfig();
    }
}

// --- Deck Builder (Modified) ---
function addToDeck(roleId) {
    if (deck.length < players.length + 3) {
        deck.push(roleId);
        updateDeckUI();
        // Auto-save when deck changes
        if (typeof saveSetupConfig === 'function') {
            saveSetupConfig();
        }
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
        
        let scriptToSpeak = role.scriptStart[currentLang];
        
        // Dynamic Script for Werewolf if Dream Wolf exists
        if (role.id === 'werewolf' && deck.includes('dreamwolf')) {
            const dreamWolfScript = currentLang === 'zh-HK' 
                ? "夢遊狼請伸出手指公，但唔好擘眼。 " 
                : "Dream Wolf, stick out your thumb but keep your eyes closed. ";
            
            scriptToSpeak = dreamWolfScript + scriptToSpeak;
        }
        
        speak(scriptToSpeak, () => {
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
            
            // Check if role is in play (based on INITIAL role)
            // Players wake up based on their INITIAL card, not what they currently hold.
            const isRoleInPlay = playerRoles.some(p => p.initialRoleId === role.id);
            
            if (!isRoleInPlay) {
                console.log(`${role.name['en-US']} is in center. Fake turn.`);
                // Disable interaction (handled by checks in handleCardClick)
                // But we need to ensure handleCardClick knows it's a fake turn?
                // Actually, handleCardClick checks `currentNightRole`. 
                // We can set a flag `currentNightRole.isFake = true`.
                currentNightRole.isFake = true;
            } else {
                // Real turn
                // Try to use Handler system if available
                const handler = getRoleHandler(role.id);
                
                if (handler) {
                    // Use new Handler system
                    const gameState = {
                        playerRoles: playerRoles,
                        centerCards: centerCards,
                        currentPlayerIndex: playerRoles.findIndex(p => p.initialRoleId === role.id)
                    };
                    
                    const turnInfo = handler.startTurn(gameState);
                    console.log(`[Handler] ${role.id} turn started:`, turnInfo);
                    
                    // Handler might update instruction message
                    if (turnInfo.message) {
                        // Keep the timer display but update message
                        instructionText.innerHTML = `${role.name[currentLang]} - ${turnInfo.message} <span id="action-timer"></span>`;
                    }
                    
                    // Check if turn is already complete (e.g., role is shielded and cannot act)
                    if (handler.isTurnComplete(gameState)) {
                        console.log(`[Handler] ${role.id} turn auto-completed (shielded or no action needed)`);
                        nightActionState.completed = true;
                    }
                    
                    // Render table to apply any highlights/states
                    renderTable();
                } else {
                    console.warn(`No handler found for role ${role.id}`);
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

let isTransitioning = false;

function finishNightStep() {
    if (!currentNightRole) return;
    if (isTransitioning) return; // Prevent double calls
    
    isTransitioning = true;
    if (actionTimerInterval) clearInterval(actionTimerInterval);
    
    speak(currentNightRole.scriptEnd[currentLang], () => {
        setTimeout(() => {
            // Increment step BEFORE saving to prevent duplicate turns on refresh
            currentStep++;
            saveGameState();
            isTransitioning = false;
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
        
        // Try to use Handler system first
        const handler = getRoleHandler(roleId);
        
        if (handler) {
            // Use new Handler system
            const gameState = {
                playerRoles: playerRoles,
                centerCards: centerCards,
                currentPlayerIndex: activePlayerIndex
            };
            
            const result = handler.handleAction(gameState, type, index);
            
            // Support both boolean and object return values
            const handled = typeof result === 'object' ? result.handled : result;
            const shouldReveal = typeof result === 'object' ? result.shouldReveal : true;
            const needsRerender = typeof result === 'object' ? result.needsRerender : false;
            // Support custom reveal target (e.g., Robber reveals their own card after swap)
            const revealTarget = typeof result === 'object' && result.revealTarget ? result.revealTarget : { type, index };
            
            if (handled) {
                console.log(`[Handler] ${roleId} handled action:`, type, index);
                
                // Handle P.I. transformation - "跟牌" mode
                // The transformation is bound to the CARD (not player) using a token
                // If the card gets swapped away, whoever holds the P.I. card inherits the win condition
                if (handler.actionState && handler.actionState.transformed && handler.actionState.transformedTo) {
                    const newRole = handler.actionState.transformedTo;
                    const cardIndex = handler.actionState.transformedCardIndex ?? activePlayerIndex;
                    
                    // Add transformation token to the P.I.'s CARD
                    // This token will move with the card if it gets swapped
                    addToken({ type: 'player', index: cardIndex }, `pi-transformed-${newRole}`);
                    
                    // Update perceived role so P.I. knows what they became
                    if (playerRoles[activePlayerIndex].roles) {
                        playerRoles[activePlayerIndex].roles.perceived = newRole;
                    }
                    console.log(`[P.I.] Card at position ${cardIndex} transformed to ${newRole} (token bound to card)`);
                }
                
                // Handle Revealer - mark card as permanently revealed if village team
                if (handler.actionState && handler.actionState.hasRevealed && handler.actionState.shouldStayRevealed) {
                    const revealedIndex = handler.actionState.revealedPlayerIndex;
                    // Add a token to mark this card as permanently revealed
                    addToken({ type: 'player', index: revealedIndex }, 'revealed-by-revealer');
                    console.log(`[Revealer] Card at position ${revealedIndex} marked as permanently revealed`);
                }
                
                // Re-render first if needed (e.g., to show tokens or swapped cards)
                // This must happen BEFORE revealing to avoid losing the revealed state
                if (needsRerender) {
                    renderTable();
                }
                
                // Reveal card if applicable (some roles like Sentinel don't reveal)
                if (shouldReveal) {
                    const card = getCardElement(revealTarget.type, revealTarget.index);
                    if (card && !card.classList.contains('revealed')) {
                        card.classList.add('revealed');
                        
                        // Check if this is a Revealer reveal that should stay open
                        const shouldStayOpen = handler.actionState && 
                                               handler.actionState.shouldStayRevealed && 
                                               revealTarget.index === handler.actionState.revealedPlayerIndex;
                        
                        if (!shouldStayOpen) {
                            // Normal reveal - hide after 2 seconds
                            setTimeout(() => card.classList.remove('revealed'), 2000);
                        } else {
                            // Revealer revealed a village card - stays revealed permanently
                            console.log(`[Revealer] Card stays revealed permanently`);
                        }
                    }
                }
                
                // Check if turn is complete
                if (handler.isTurnComplete(gameState)) {
                    console.log(`[Handler] ${roleId} turn complete`);
                    nightActionState.completed = true; // Block further clicks immediately
                    setTimeout(finishNightStep, 2000);
                }
                
                return; // Handler processed the action
            }
            // Handler exists but didn't handle this action (invalid click, e.g., wrong card type)
            // This is normal - just silently ignore
            return;
        }
        
        console.warn(`No handler found for role ${roleId}`);
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
    
    // Always append to centerZone (even if reused)
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
    // --- Get Card Data Reference ---
    let cardData = null;
    if (type === 'player') {
        cardData = playerRoles[index];
    } else if (type === 'center') {
        cardData = centerCards[index];
    }
    
    if (!cardData) cardData = {}; // Fallback
    
    // --- Interaction State Logic ---
    if (cardData.interactionState) {
        if (cardData.interactionState.selectable) card.classList.add('selectable');
        if (cardData.interactionState.selected) card.classList.add('selected');
        if (cardData.interactionState.animating) card.classList.add('animating');
        if (cardData.interactionState.locked) card.classList.add('locked');
        if (cardData.interactionState.highlighted) card.classList.add('highlighted');
    }
    
    // --- Token Rendering ---
    if (cardData.tokens && cardData.tokens.length > 0) {
        const tokenContainer = document.createElement('div');
        tokenContainer.className = 'token-container';
        
        cardData.tokens.forEach(tokenType => {
            const token = document.createElement('div');
            token.className = `token ${tokenType}`;
            
            // Optional: Add icon/text based on type
            if (tokenType === 'shield') token.innerText = '🛡️';
            else if (tokenType === 'mark') token.innerText = '🎯';
            else if (tokenType === 'infection') token.innerText = '🧟';
            else if (tokenType === 'link') token.innerText = '🔗';
            else if (tokenType === 'revealed-by-revealer') token.innerText = '👁️';
            
            tokenContainer.appendChild(token);
        });
        
        card.appendChild(tokenContainer);
    }
    
    // Check if card should be permanently revealed (by Revealer)
    if (type === 'player' && cardData.tokens && cardData.tokens.includes('revealed-by-revealer')) {
        card.classList.add('revealed');
    }

    // 2. Night Phase: Active Role Logic (Legacy & Hybrid)
    // We keep the legacy logic for now but prioritize interactionState if set
    if (gamePhaseState === 'NIGHT' && currentNightRole && !currentNightRole.isFake) {
        // ... (Legacy highlighting logic can remain as fallback or be refactored later)
        // For now, if interactionState is used, it overrides legacy highlights
        if (!cardData.interactionState || Object.keys(cardData.interactionState).length === 0) {
             // Legacy logic here (omitted for brevity in this replacement, but should be preserved if not fully replacing)
             // Actually, to be safe, let's keep the legacy logic below but ensure it doesn't conflict.
             // The legacy logic adds 'highlight' class.
             // Our new logic adds 'selectable', 'highlighted', etc.
             // They can coexist.
        }
    }
    
    // Legacy Highlight Logic (Preserved for backward compatibility during migration)
    if (gamePhaseState === 'NIGHT' && currentNightRole && !currentNightRole.isFake) {
         const activeRoleId = currentNightRole.mimicId || currentNightRole.id;
         // ... (Original logic)
         // Since I am replacing a block, I need to be careful not to delete the legacy logic if I want to keep it.
         // The user instruction was to "Modify renderCard".
         // Let's assume we want to KEEP the legacy logic for now but ADD the new features.
         
         // Re-inserting the legacy logic I am replacing:
         let activePlayerIndex = -1;
         if (currentNightRole.mimicId) {
             activePlayerIndex = playerRoles.findIndex(p => p.initialRoleId === 'doppelganger');
         } else {
             activePlayerIndex = playerRoles.findIndex(p => p.initialRoleId === activeRoleId);
         }
         
         if (activeRoleId === 'werewolf' && type === 'player') {
              if (playerRoles[index].initialRoleId === 'werewolf' || playerRoles[index].initialRoleId === 'dreamwolf' || playerRoles[index].mimickedRole === 'werewolf') {
                  shouldHighlight = true;
              }
         }
         
         if (activeRoleId === 'werewolf' && type === 'center') {
             const werewolfCount = playerRoles.filter(p => p.initialRoleId === 'werewolf' || p.initialRoleId === 'dreamwolf' || p.mimickedRole === 'werewolf').length;
             if (werewolfCount === 1) shouldHighlight = true;
         }
         
         if (activeRoleId === 'seer') shouldHighlight = true; 
         if (activeRoleId === 'drunk' && type === 'center') shouldHighlight = true;
         
         if ((activeRoleId === 'robber' || activeRoleId === 'troublemaker') && type === 'player') {
             if (index !== activePlayerIndex) {
                 const isSelected = nightActionState.selection && nightActionState.selection.some(s => s.type === type && s.index === index);
                 if (activeRoleId === 'robber' && nightActionState.swapped) {
                     if (isSelected) card.classList.add('selected');
                 } else {
                     const isSelectionFull = activeRoleId === 'troublemaker' && nightActionState.selection && nightActionState.selection.length >= 2;
                     if (isSelected) card.classList.add('selected');
                     else if (!isSelectionFull) shouldHighlight = true;
                 }
             }
         }
         
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
        // New Interaction Manager Check
        if (cardData.interactionState && cardData.interactionState.selectable) {
            handleCardClick(type, index); // We need to implement this new handler or update the old one
            // For now, let's assume the old handleCardClick will be updated or we use a new one.
            // Actually, we haven't implemented the unified handleCardClick in script.js yet (it was in the design doc).
            // So we should probably stick to the old handler for now, or implement the new one.
            // The task list says "Implement InteractionManager logic", which we did.
            // But we didn't implement the unified `handleCardClick` yet.
            // Let's use the old one for legacy support, but if selectable is true, we might want to trigger the new logic.
            
            // For Phase 2, we are just visualizing. The logic refactoring is Phase 3.
            // So let's keep the old click handler but maybe add a log.
        }
        
        // Legacy Handler
        handleCardClick(type, index);
    };
    
    return card;
}

function stopGame() {
    isPlaying = false;
    synth.cancel();
    
    clearGameState(); // Clear game state on exit, but keep setup config
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

// --- Setup Configuration Persistence ---
function saveSetupConfig() {
    const volumeControl = document.getElementById('volume-control');
    const dayDuration = document.getElementById('day-duration');
    const interfaceMode = document.getElementById('interface-mode');
    
    const setupConfig = {
        players: players,
        deck: deck,
        volume: volumeControl ? volumeControl.value : 1,
        dayDuration: dayDuration ? dayDuration.value : '5',
        interfaceMode: interfaceMode ? interfaceMode.value : 'desktop',
        currentLang: currentLang
    };
    
    localStorage.setItem('happywolf_setup', JSON.stringify(setupConfig));
    console.log('Setup configuration saved:', setupConfig);
}

function loadSetupConfig() {
    const saved = localStorage.getItem('happywolf_setup');
    if (!saved) return false;
    
    try {
        const config = JSON.parse(saved);
        
        // Restore players
        if (config.players && config.players.length > 0) {
            players = config.players;
            renderPlayerList();
        }
        
        // Restore deck
        if (config.deck && config.deck.length > 0) {
            deck = config.deck;
            updateDeckUI();
        }
        
        // Restore settings
        const volumeControl = document.getElementById('volume-control');
        if (volumeControl && config.volume !== undefined) {
            volumeControl.value = config.volume;
        }
        
        const dayDuration = document.getElementById('day-duration');
        if (dayDuration && config.dayDuration) {
            dayDuration.value = config.dayDuration;
        }
        
        const interfaceMode = document.getElementById('interface-mode');
        if (interfaceMode && config.interfaceMode) {
            interfaceMode.value = config.interfaceMode;
        }
        
        // Restore language
        if (config.currentLang && config.currentLang !== currentLang) {
            currentLang = config.currentLang;
            updateUIText();
        }
        
        console.log('Setup configuration loaded:', config);
        return true;
    } catch (e) {
        console.error('Failed to load setup config:', e);
        return false;
    }
}

function clearSetupConfig() {
    localStorage.removeItem('happywolf_setup');
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
    const confirmDeckBtn = document.getElementById('confirm-deck-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const roleModal = document.getElementById('role-modal');
    renderLibrary();
    updateDeckUI();
    
    // Bind Setup Buttons
    document.getElementById('add-player-btn').addEventListener('click', () => {
        addPlayer(`Player ${players.length + 1}`);
        saveSetupConfig(); // Auto-save on change
    });
    
    document.getElementById('random-seat-btn').addEventListener('click', () => {
        shuffleArray(players);
        renderPlayerList();
        saveSetupConfig(); // Auto-save on change
    });
    
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    
    document.getElementById('test-audio-btn').addEventListener('click', () => {
        unlockAudio();
        speak(currentLang === 'zh-HK' ? "天黑請閉眼" : "Everyone, close your eyes", null, true);
    });
    
    // Auto-save settings when changed
    const volumeControl = document.getElementById('volume-control');
    if (volumeControl) {
        volumeControl.addEventListener('change', saveSetupConfig);
    }
    
    const dayDuration = document.getElementById('day-duration');
    if (dayDuration) {
        dayDuration.addEventListener('change', saveSetupConfig);
    }
    
    const interfaceMode = document.getElementById('interface-mode');
    if (interfaceMode) {
        interfaceMode.addEventListener('change', saveSetupConfig);
    }
    
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
        
        // Save setup config before starting game
        saveSetupConfig();
        
        // Prepare Game Data
        // Shuffle Deck
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        
        // Assign Roles
        playerRoles = players.map((p, i) => {
            const roleId = deck[i];
            const player = {
                // New fields
                id: p.id,
                name: p.name,
                seatIndex: i,
                roles: {
                    initial: roleId,
                    perceived: roleId,
                    actual: roleId
                },
                roleHistory: [{
                    timestamp: Date.now(),
                    event: 'initial',
                    role: roleId,
                    perceived: true
                }],
                knowledge: {
                    viewedCards: [],
                    swappedCards: [],
                    heardAnnouncements: [],
                    seenTokens: []
                },
                special: {
                    cardTransformed: false,
                    mimicking: null,
                    linked: null,
                    infected: false
                },
                revealed: false
            };

            // Backward Compatibility
            Object.defineProperty(player, 'roleId', {
                get() { return this.roles.actual; },
                set(value) { this.roles.actual = value; },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(player, 'initialRoleId', {
                get() { return this.roles.initial; },
                set(value) { this.roles.initial = value; },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(player, 'playerId', {
                get() { return this.id; },
                enumerable: true,
                configurable: true
            });

            return player;
        });
        
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
    const interfaceMode2 = document.getElementById('interface-mode');
    if (interfaceMode2 && window.innerWidth < 768) {
        interfaceMode2.value = 'mobile';
    }
    
    // Unlock Audio on interaction
    document.body.addEventListener('click', window.unlockHandler);
    document.body.addEventListener('touchend', window.unlockHandler);
    document.body.addEventListener('keydown', window.unlockHandler);
    
    // Try to load previous setup configuration
    const hasLoadedSetup = loadSetupConfig();
    
    // If no saved setup, add default players
    if (!hasLoadedSetup || players.length === 0) {
        addPlayer("Player 1");
        addPlayer("Player 2");
        addPlayer("Player 3");
    }
}

function initGame() {
    console.log("Initializing Game Phase...");
    const setupPhase = document.getElementById('setup-phase');
    const gamePhase = document.getElementById('game-phase');
    const menuBtn = document.getElementById('menu-btn'); // Assuming this exists
    const resumeBtn = document.getElementById('resume-btn'); // Assuming this exists
    const endGameBtn = document.getElementById('end-game-btn'); // Assuming this exists
    const readyBtn = document.getElementById('ready-btn'); // Assuming this exists
    const closeModalBtn = document.querySelector('.close-modal');
    const roleModal = document.getElementById('role-modal');
    const pauseMenu = document.getElementById('pause-menu'); // Assuming this exists

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
if (typeof module === 'undefined') {
    init();
}



function swapCards(target1, target2, options = {}) {
    const {
        source = 'unknown',
        silent = false
    } = options;

    // Helper to get card data
    const getCard = (target) => {
        if (target.type === 'player') {
            const p = playerRoles[target.index];
            return p ? { role: p.roles.actual, ref: p } : null;
        } else if (target.type === 'center') {
            const c = centerCards[target.index];
            return c ? { role: c.roleId, ref: c } : null;
        }
        return null;
    };

    const card1 = getCard(target1);
    const card2 = getCard(target2);

    if (!card1 || !card2) {
        console.error("Invalid swap targets", target1, target2);
        return;
    }

    // Perform Swap
    const role1 = card1.role;
    const role2 = card2.role;

    // Update Target 1
    if (target1.type === 'player') {
        updatePlayerRole(target1.index, role2, {
            event: 'swap',
            source: source,
            target: target2,
            perceived: false // Swaps are usually hidden from the victim
        });
    } else {
        card1.ref.roleId = role2;
    }

    // Update Target 2
    if (target2.type === 'player') {
        updatePlayerRole(target2.index, role1, {
            event: 'swap',
            source: source,
            target: target1,
            perceived: false
        });
    } else {
        card2.ref.roleId = role1;
    }
    
    if (!silent) {
        console.log(`[Swap] ${target1.type} ${target1.index} (${role1}) <-> ${target2.type} ${target2.index} (${role2}) via ${source}`);
    }
}



// --- Token Manager ---
function addToken(target, token) {
    const card = getCardRef(target);
    if (!card) return;
    
    if (!card.tokens) card.tokens = [];
    if (!card.tokens.includes(token)) {
        card.tokens.push(token);
    }
}

function removeToken(target, token) {
    const card = getCardRef(target);
    if (!card || !card.tokens) return;
    
    const index = card.tokens.indexOf(token);
    if (index > -1) {
        card.tokens.splice(index, 1);
    }
}

function hasToken(target, token) {
    const card = getCardRef(target);
    return card && card.tokens && card.tokens.includes(token);
}

function clearAllTokens() {
    // Clear tokens from all players
    if (playerRoles) {
        playerRoles.forEach(p => {
            if (p) p.tokens = [];
        });
    }
    // Clear tokens from all center cards
    if (centerCards) {
        centerCards.forEach(c => {
            if (c) c.tokens = [];
        });
    }
}

// --- Interaction Manager ---
function setCardInteractionState(target, state, value) {
    const card = getCardRef(target);
    if (!card) return;
    
    if (!card.interactionState) card.interactionState = {};
    card.interactionState[state] = value;
    
    // UI updates will be handled by renderTable or specific UI update functions
    // For now, we just update the state
}

function getCardInteractionState(target) {
    const card = getCardRef(target);
    return card && card.interactionState ? card.interactionState : {};
}

// --- Role Handler System ---
class RoleHandler {
    constructor(roleId) {
        this.roleId = roleId;
    }

    /**
     * Called when the role's turn starts.
     * @param {Object} gameState - Current game state (players, centerCards, etc.)
     * @returns {Object} - UI instructions or state updates
     */
    startTurn(gameState) {
        return {
            message: `Role ${this.roleId} turn started`,
            canInteract: false
        };
    }

    /**
     * Called when a player interacts with a card (click/tap).
     * @param {Object} gameState - Current game state
     * @param {string} type - 'player' or 'center'
     * @param {number} index - Index of the card
     * @returns {boolean} - True if action was handled, false otherwise
     */
    handleAction(gameState, type, index) {
        return false;
    }

    /**
     * Called when the role's turn ends.
     * @param {Object} gameState - Current game state
     */
    endTurn(gameState) {
        // Cleanup
    }
    
    /**
     * Check if the turn is complete.
     * @param {Object} gameState 
     * @returns {boolean}
     */
    isTurnComplete(gameState) {
        return true;
    }
}

class SeerHandler extends RoleHandler {
    constructor() {
        super('seer');
        this.actionState = {
            viewedCount: 0,
            viewedType: null // 'player' or 'center'
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            viewedCount: 0,
            viewedType: null
        };
        
        return {
            message: i18n[currentLang].roleAction.seer || "Seer, view a player card or two center cards.",
            canInteract: true
        };
    }

    handleAction(gameState, type, index) {
        // Prevent viewing self (if player) - Seer is usually a player
        // But we need to know WHO is the Seer. 
        // In the new system, the handler might not know the player index unless passed or stored.
        // For now, let's assume validation happens or we check against currentNightRole.index
        
        if (this.actionState.viewedCount >= 2) return false;
        if (this.actionState.viewedType === 'player' && this.actionState.viewedCount >= 1) return false;

        if (type === 'player') {
            // Seer cannot view shielded players
            if (hasToken({type, index}, 'shield')) return false;
            
            if (this.actionState.viewedCount === 0) {
                this.actionState.viewedType = 'player';
                this.actionState.viewedCount++;
                // Seer views the card - should reveal
                return { handled: true, shouldReveal: true }; 
            }
        } else if (type === 'center') {
            if (this.actionState.viewedCount === 0 || this.actionState.viewedType === 'center') {
                this.actionState.viewedType = 'center';
                this.actionState.viewedCount++;
                return { handled: true, shouldReveal: true };
            }
        }
        return false;
    }
    
    isTurnComplete(gameState) {
        if (this.actionState.viewedType === 'player' && this.actionState.viewedCount === 1) return true;
        if (this.actionState.viewedType === 'center' && this.actionState.viewedCount === 2) return true;
        return false; // Can end early if they want? Usually forced.
    }
}

class RobberHandler extends RoleHandler {
    constructor() {
        super('robber');
        this.actionState = {
            step: 'select', // 'select' -> 'view'
            targetIndex: -1,
            selfShielded: false
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            step: 'select',
            targetIndex: -1,
            selfShielded: false
        };
        
        // Check if Robber is shielded
        const playerIdx = gameState.currentPlayerIndex;
        if (hasToken({type: 'player', index: playerIdx}, 'shield')) {
            this.actionState.selfShielded = true;
            this.actionState.step = 'complete';
            return {
                message: (i18n[currentLang].roleAction.robber || "Robber, view a player card then swap with yours.") + " " + (i18n[currentLang].shieldBlocked || "You are shielded and cannot act."),
                canInteract: false
            };
        }
        
        return {
            message: i18n[currentLang].roleAction.robber || "Robber, view a player card then swap with yours.",
            canInteract: true
        };
    }

    handleAction(gameState, type, index) {
        if (type !== 'player') return false;
        if (this.actionState.step !== 'select') return false;
        
        // Robber cannot rob shielded players
        if (hasToken({type, index}, 'shield')) return false;
        
        const playerIdx = gameState.currentPlayerIndex;
        if (index === playerIdx) return false; // Can't rob self
        
        this.actionState.targetIndex = index;
        this.actionState.step = 'complete';
        
        // Perform Swap
        const temp = gameState.playerRoles[playerIdx].roleId;
        gameState.playerRoles[playerIdx].roleId = gameState.playerRoles[index].roleId;
        gameState.playerRoles[index].roleId = temp;
        
        console.log(`[Robber] Swapped Player ${playerIdx} with Player ${index}`);
        
        // Robber sees their OWN card after swap (the new role they got)
        // Need re-render to update card backs, then reveal Robber's position
        return { 
            handled: true, 
            shouldReveal: true, 
            needsRerender: true,
            revealTarget: { type: 'player', index: playerIdx }
        };
    }

    isTurnComplete(gameState) {
        return this.actionState.step === 'complete';
    }
}

class WerewolfHandler extends RoleHandler {
    constructor() {
        super('werewolf');
        this.actionState = {
            isLoneWolf: false,
            viewedCenter: false
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            isLoneWolf: false,
            viewedCenter: false
        };
        
        // Check for other werewolves
        const werewolves = gameState.playerRoles.filter(p => p.roles.actual === 'werewolf' || p.roles.actual === 'dreamwolf');
        this.actionState.isLoneWolf = werewolves.length === 1;
        
        let message;
        if (this.actionState.isLoneWolf) {
            message = (i18n[currentLang].roleAction.werewolf || "Werewolves, wake up.") + " " + (i18n[currentLang].loneWolf || "You are alone. You may view one center card.");
        } else {
            message = i18n[currentLang].roleAction.werewolf || "Werewolves, wake up and look for other werewolves.";
        }
        
        return {
            message: message,
            canInteract: this.actionState.isLoneWolf
        };
    }

    handleAction(gameState, type, index) {
        if (!this.actionState.isLoneWolf) {
            // Pack wolves might click, but it shouldn't trigger an action/error.
            // Returning true means "handled" (even if nothing happens), preventing the warning.
            // But if we return true, it might try to reveal the card in handleCardClick.
            // We only want to allow revealing if it's a valid action.
            // If we return false, it logs a warning.
            // Pack wolves see each other because of `renderTable` highlighting.
            // They don't need to click anything.
            // If they click, suppress warning but don't reveal any card.
            return { handled: true, shouldReveal: false }; 
        }
        
        if (this.actionState.viewedCenter) return false;
        
        if (type === 'center') {
            this.actionState.viewedCenter = true;
            // Lone wolf views center card
            return { handled: true, shouldReveal: true };
        }
        
        return false;
    }
    
    isTurnComplete(gameState) {
        if (!this.actionState.isLoneWolf) return true; // Standard werewolves just look
        return this.actionState.viewedCenter;
    }
}

class ApprenticeSeerHandler extends RoleHandler {
    constructor() {
        super('apprenticeseer');
        this.actionState = {
            viewedCenter: false
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            viewedCenter: false
        };
        
        return {
            message: i18n[currentLang].roleAction.apprenticeseer || "Apprentice Seer, view one center card."
        };
    }

    handleAction(gameState, type, index) {
        if (this.actionState.viewedCenter) return false;
        if (type !== 'center') return false;

        this.actionState.viewedCenter = true;
        // Apprentice Seer views center card
        return { handled: true, shouldReveal: true };
    }

    isTurnComplete(gameState) {
        return this.actionState.viewedCenter;
    }
}

class WitchHandler extends RoleHandler {
    constructor() {
        super('witch');
        this.actionState = {
            viewedCenter: false,
            centerIndex: -1,
            swapped: false,
            selfShielded: false
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            viewedCenter: false,
            centerIndex: -1,
            swapped: false,
            selfShielded: false
        };
        
        // Check if Witch is shielded - but Witch can still act, just can't swap with self
        const playerIdx = gameState.currentPlayerIndex;
        if (hasToken({type: 'player', index: playerIdx}, 'shield')) {
            this.actionState.selfShielded = true;
        }
        
        return {
            message: i18n[currentLang].roleAction.witch || "Witch, view a center card then swap it with any player."
        };
    }

    handleAction(gameState, type, index) {
        // Step 1: View Center Card
        if (!this.actionState.viewedCenter) {
            if (type !== 'center') return false;
            
            this.actionState.viewedCenter = true;
            this.actionState.centerIndex = index;
            
            // Witch views center card first
            return { handled: true, shouldReveal: true };
        }
        
        // Step 2: Swap with Player
        if (!this.actionState.swapped) {
            if (type !== 'player') return false;
            
            // Witch cannot swap shielded players
            if (hasToken({type, index}, 'shield')) return false;
            
            // Witch cannot swap with self if shielded
            const currentPlayerIdx = gameState.currentPlayerIndex;
            if (index === currentPlayerIdx && this.actionState.selfShielded) return false;
            
            const centerIdx = this.actionState.centerIndex;
            const playerIdx = index;
            
            // Perform Swap
            const temp = gameState.centerCards[centerIdx].roleId;
            gameState.centerCards[centerIdx].roleId = gameState.playerRoles[playerIdx].roleId;
            gameState.playerRoles[playerIdx].roleId = temp;
            
            this.actionState.swapped = true;
            // Witch swaps but doesn't reveal the player's card, needs re-render
            return { handled: true, shouldReveal: false, needsRerender: true };
        }
        
        return false;
    }

    isTurnComplete(gameState) {
        return this.actionState.swapped;
    }
}

class TroublemakerHandler extends RoleHandler {
    constructor() {
        super('troublemaker');
        this.actionState = {
            selection: [],
            swapped: false
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            selection: [],
            swapped: false
        };
        
        return {
            message: i18n[currentLang].roleAction.troublemaker || "Troublemaker, swap two players."
        };
    }

    handleAction(gameState, type, index) {
        if (this.actionState.swapped) return false;
        if (type !== 'player') return false;
        
        // Check if already selected
        if (this.actionState.selection.some(s => s.index === index)) return false;
        
        // Troublemaker cannot swap shielded players
        if (hasToken({type, index}, 'shield')) return false;
        
        this.actionState.selection.push({ type, index });
        
        if (this.actionState.selection.length === 2) {
            const idx1 = this.actionState.selection[0].index;
            const idx2 = this.actionState.selection[1].index;
            
            // Swap
            const temp = gameState.playerRoles[idx1].roleId;
            gameState.playerRoles[idx1].roleId = gameState.playerRoles[idx2].roleId;
            gameState.playerRoles[idx2].roleId = temp;
            
            this.actionState.swapped = true;
            // Troublemaker doesn't see the cards - just swaps, but needs re-render
            return { handled: true, shouldReveal: false, needsRerender: true };
        }
        
        // Selection accepted but not complete yet
        return { handled: true, shouldReveal: false };
    }

    isTurnComplete(gameState) {
        return this.actionState.swapped;
    }
}

class DrunkHandler extends RoleHandler {
    constructor() {
        super('drunk');
        this.actionState = {
            swapped: false,
            selfShielded: false
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            swapped: false,
            selfShielded: false
        };
        
        // Check if Drunk is shielded
        const playerIdx = gameState.currentPlayerIndex;
        if (hasToken({type: 'player', index: playerIdx}, 'shield')) {
            this.actionState.selfShielded = true;
            this.actionState.swapped = true; // Mark as complete
            return {
                message: (i18n[currentLang].roleAction.drunk || "Drunk, swap your card with a center card.") + " " + (i18n[currentLang].shieldBlocked || "你被盾牌保護，無法行動。"),
                canInteract: false
            };
        }
        
        return {
            message: i18n[currentLang].roleAction.drunk || "Drunk, swap your card with a center card."
        };
    }

    handleAction(gameState, type, index) {
        if (this.actionState.swapped) return false;
        if (type !== 'center') return false;
        
        const playerIdx = gameState.currentPlayerIndex;
        if (playerIdx === -1) return false; // Should not happen
        
        // Swap (Drunk doesn't see the new card)
        const temp = gameState.playerRoles[playerIdx].roleId;
        gameState.playerRoles[playerIdx].roleId = gameState.centerCards[index].roleId;
        gameState.centerCards[index].roleId = temp;
        
        this.actionState.swapped = true;
        
        // Return object to indicate: handled but don't reveal the card, needs re-render
        return { handled: true, shouldReveal: false, needsRerender: true };
    }

    isTurnComplete(gameState) {
        return this.actionState.swapped;
    }
}

class InsomniacHandler extends RoleHandler {
    constructor() {
        super('insomniac');
        this.actionState = {
            viewedSelf: false
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            viewedSelf: false
        };
        
        return {
            message: i18n[currentLang].roleAction.insomniac || "Insomniac, view your own card."
        };
    }

    handleAction(gameState, type, index) {
        if (this.actionState.viewedSelf) return false;
        if (type !== 'player') return false;
        
        // Must view SELF
        const playerIdx = gameState.currentPlayerIndex;
        if (index !== playerIdx) return false;
        
        this.actionState.viewedSelf = true;
        // Insomniac views their own card
        return { handled: true, shouldReveal: true };
    }

    isTurnComplete(gameState) {
        return this.actionState.viewedSelf;
    }
}

class DoppelgangerHandler extends RoleHandler {
    constructor() {
        super('doppelganger');
        this.actionState = {
            viewed: false,
            mimicId: null,
            subHandler: null,
            subState: null
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            viewed: false,
            mimicId: null,
            subHandler: null,
            subState: null
        };
        
        return {
            message: i18n[currentLang].roleAction.doppelganger || "Doppelgänger, view another player's card."
        };
    }

    handleAction(gameState, type, index) {
        // If already mimicking and has sub-handler, delegate
        if (this.actionState.subHandler) {
            const result = this.actionState.subHandler.handleAction(gameState, type, index);
            // Delegate returns the sub-handler's result directly
            return result;
        }
        
        // If already viewed but no sub-handler (passive role), do nothing
        if (this.actionState.viewed) return false;
        
        // Step 1: View Player Card
        if (type !== 'player') return false;
        
        // Can't view self
        const playerIdx = gameState.currentPlayerIndex;
        if (index === playerIdx) return false;
        
        // Doppelganger cannot view shielded players
        if (hasToken({type, index}, 'shield')) return false;
        
        this.actionState.viewed = true;
        
        // Get Target Role
        const targetRole = gameState.playerRoles[index].roleId;
        this.actionState.mimicId = targetRole;
        
        // Update Doppelganger's Role
        gameState.playerRoles[playerIdx].roleId = targetRole;
        gameState.playerRoles[playerIdx].mimickedRole = targetRole;
        
        console.log(`[Doppelganger] Mimicking ${targetRole}`);
        
        // Initialize Sub-Handler if interactive
        const handler = getRoleHandler(targetRole);
        if (handler) {
            this.actionState.subHandler = handler;
            // We need to initialize the sub-handler
            // Note: startTurn usually returns a message, we might want to log it or ignore it
            // The sub-handler might need specific initialization based on game state
            handler.startTurn(gameState);
            
            // IMPORTANT: Some handlers (like Werewolf) check for "Lone Wolf" in startTurn.
            // We need to ensure the gameState reflects the Doppelganger as the new role?
            // Yes, we updated playerRoles above, so it should be fine.
        }
        
        // Doppelganger views target's card
        return { handled: true, shouldReveal: true };
    }

    isTurnComplete(gameState) {
        if (!this.actionState.viewed) return false;
        
        if (this.actionState.subHandler) {
            return this.actionState.subHandler.isTurnComplete(gameState);
        }
        
        return true; // Passive role mimic is complete after viewing
    }
}

class MinionHandler extends RoleHandler {
    constructor() {
        super('minion');
    }

    startTurn(gameState) {
        return {
            message: i18n[currentLang].roleAction.minion || "Minion, wake up. Werewolves, stick out your thumb.",
            canInteract: false
        };
    }

    handleAction(gameState, type, index) {
        // Minion doesn't interact - suppress warning for any clicks
        return { handled: true, shouldReveal: false };
    }

    isTurnComplete(gameState) {
        return true; // Always complete (timer based)
    }
}

class SentinelHandler extends RoleHandler {
    constructor() {
        super('sentinel');
        this.actionState = {
            tokenPlaced: false
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            tokenPlaced: false
        };
        
        return {
            message: i18n[currentLang].roleAction.sentinel || "Sentinel, place a shield token on a player card.",
            canInteract: true
        };
    }

    handleAction(gameState, type, index) {
        if (this.actionState.tokenPlaced) return false;
        if (type !== 'player') return false;
        
        // Place Shield Token
        addToken({type, index}, 'shield');
        this.actionState.tokenPlaced = true;
        
        console.log(`[Sentinel] Placed shield on Player ${index}`);
        
        // Return object to indicate: handled but don't reveal the card, needs re-render to show token
        return { handled: true, shouldReveal: false, needsRerender: true };
    }

    isTurnComplete(gameState) {
        return this.actionState.tokenPlaced;
    }
}

class PIHandler extends RoleHandler {
    constructor() {
        super('pi');
        this.actionState = {
            viewedCount: 0,
            transformed: false,
            transformedTo: null,
            viewedPlayers: [],
            transformedCardIndex: null // The card that holds the transformation token
        };
    }

    startTurn(gameState) {
        // Reset actionState for new turn
        this.actionState = {
            viewedCount: 0,
            transformed: false,
            transformedTo: null,
            viewedPlayers: [],
            transformedCardIndex: null
        };
        
        return {
            message: i18n[currentLang]?.roleAction?.pi || "P.I., view up to 2 player cards. If you see a Werewolf, Minion, or Tanner, you become that role.",
            canInteract: true
        };
    }

    handleAction(gameState, type, index) {
        // P.I. can only view player cards
        if (type !== 'player') return false;
        
        // Cannot view after transformation
        if (this.actionState.transformed) return false;
        
        // Cannot view more than 2 cards
        if (this.actionState.viewedCount >= 2) return false;
        
        // Cannot view self
        const playerIdx = gameState.currentPlayerIndex;
        if (index === playerIdx) return false;
        
        // Cannot view same player twice
        if (this.actionState.viewedPlayers.includes(index)) return false;
        
        // Cannot view shielded players
        if (hasToken({type, index}, 'shield')) return false;
        
        // View the card
        this.actionState.viewedCount++;
        this.actionState.viewedPlayers.push(index);
        
        // Check if target is a role that triggers transformation
        // Werewolf team: werewolf, minion, dreamwolf
        // Independent: tanner
        const targetRole = gameState.playerRoles[index].roleId;
        const transformRoles = ['werewolf', 'minion', 'dreamwolf', 'tanner'];
        
        if (transformRoles.includes(targetRole)) {
            // P.I. transforms - the transformation is bound to P.I.'s CARD (not player)
            this.actionState.transformed = true;
            this.actionState.transformedTo = targetRole;
            this.actionState.transformedCardIndex = playerIdx; // P.I.'s card position
            
            console.log(`[P.I.] Card transformed into ${targetRole} after viewing Player ${index}`);
        }
        
        return { handled: true, shouldReveal: true };
    }

    isTurnComplete(gameState) {
        // Complete if transformed OR viewed 2 cards
        return this.actionState.transformed || this.actionState.viewedCount >= 2;
    }
}

class MysticWolfHandler extends RoleHandler {
    constructor() {
        super('mysticwolf');
        this.actionState = {
            hasViewed: false,
            viewedPlayerIndex: null
        };
    }

    startTurn(gameState) {
        this.actionState = {
            hasViewed: false,
            viewedPlayerIndex: null
        };
        
        return {
            message: i18n[currentLang]?.roleAction?.mysticwolf || "Mystic Wolf, you may look at one other player's card.",
            canInteract: true
        };
    }

    handleAction(gameState, type, index) {
        // Already viewed
        if (this.actionState.hasViewed) return false;
        
        // Can only view player cards
        if (type !== 'player') return false;
        
        // Cannot view self
        const playerIdx = gameState.currentPlayerIndex;
        if (index === playerIdx) return false;
        
        // Cannot view shielded players
        if (hasToken({ type, index }, 'shield')) return false;
        
        // View the card
        this.actionState.hasViewed = true;
        this.actionState.viewedPlayerIndex = index;
        
        console.log(`[Mystic Wolf] Viewed Player ${index}'s card`);
        
        return { handled: true, shouldReveal: true };
    }

    isTurnComplete(gameState) {
        return this.actionState.hasViewed;
    }
}

class RevealerHandler extends RoleHandler {
    constructor() {
        super('revealer');
        this.actionState = {
            hasRevealed: false,
            revealedPlayerIndex: null,
            shouldStayRevealed: false
        };
    }

    startTurn(gameState) {
        this.actionState = {
            hasRevealed: false,
            revealedPlayerIndex: null,
            shouldStayRevealed: false
        };
        
        return {
            message: i18n[currentLang]?.roleAction?.revealer || "Revealer, flip one player's card face up.",
            canInteract: true
        };
    }

    handleAction(gameState, type, index) {
        // Already revealed
        if (this.actionState.hasRevealed) return false;
        
        // Can only reveal player cards
        if (type !== 'player') return false;
        
        // Cannot reveal self
        const playerIdx = gameState.currentPlayerIndex;
        if (index === playerIdx) return false;
        
        // Cannot reveal shielded players
        if (hasToken({ type, index }, 'shield')) return false;
        
        // Reveal the card
        this.actionState.hasRevealed = true;
        this.actionState.revealedPlayerIndex = index;
        
        // Check if card should stay revealed (village team only)
        const targetRole = gameState.playerRoles[index].roleId;
        const nonVillageRoles = ['werewolf', 'minion', 'tanner', 'dreamwolf', 'mysticwolf'];
        
        if (nonVillageRoles.includes(targetRole)) {
            // Werewolf/Tanner - flip back down (Revealer sees it but others don't)
            this.actionState.shouldStayRevealed = false;
            console.log(`[Revealer] Revealed Player ${index} (${targetRole}) - flipping back down`);
        } else {
            // Village team - stays revealed for everyone
            this.actionState.shouldStayRevealed = true;
            console.log(`[Revealer] Revealed Player ${index} (${targetRole}) - stays revealed`);
        }
        
        return { handled: true, shouldReveal: true };
    }

    isTurnComplete(gameState) {
        return this.actionState.hasRevealed;
    }
}

// --- Role Handler Registry ---
const roleHandlers = {
    'seer': new SeerHandler(),
    'robber': new RobberHandler(),
    'werewolf': new WerewolfHandler(),
    'apprenticeseer': new ApprenticeSeerHandler(),
    'witch': new WitchHandler(),
    'troublemaker': new TroublemakerHandler(),
    'drunk': new DrunkHandler(),
    'insomniac': new InsomniacHandler(),
    'doppelganger': new DoppelgangerHandler(),
    'minion': new MinionHandler(),
    'sentinel': new SentinelHandler(),
    'pi': new PIHandler(),
    'mysticwolf': new MysticWolfHandler(),
    'revealer': new RevealerHandler()
};

// Helper function to get handler for a role
function getRoleHandler(roleId) {
    return roleHandlers[roleId] || null;
}

function getCardRef(target) {
    if (target.type === 'player') {
        return playerRoles[target.index];
    } else if (target.type === 'center') {
        return centerCards[target.index];
    }
    return null;
}

function validateGameState() {
    const errors = [];
    const validRoleIds = rolesData.map(r => r.id);
    
    // Check Players
    playerRoles.forEach((p, i) => {
        if (!p.roles || !p.roles.actual) {
            errors.push(`Player ${i} has no role`);
            return;
        }
        if (!validRoleIds.includes(p.roles.actual)) {
            errors.push(`Invalid role ID: ${p.roles.actual} for Player ${i}`);
        }
    });
    
    // Check Center Cards
    centerCards.forEach((c, i) => {
        if (!c.roleId) {
            errors.push(`Center Card ${i} has no role`);
            return;
        }
        if (!validRoleIds.includes(c.roleId)) {
            errors.push(`Invalid role ID: ${c.roleId} for Center Card ${i}`);
        }
    });
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function updatePlayerRole(playerIndex, newRole, options = {}) {
    const {
        perceived = false,      // Does the player know about this change?
        event = 'unknown',      // Event type
        source = null,          // Source (role/player causing change)
        target = null,          // Target (if applicable)
        transformCard = false   // Is the card itself transformed (e.g. P.I.)
    } = options;
    
    // In the new architecture, playerRoles[playerIndex] is the player object
    // But we need to be careful if we are in the middle of migration
    // The test mocks `players` global, but script.js uses `playerRoles` for game state.
    // However, my test uses `global.players` which mimics `playerRoles` in the new structure?
    // Wait, the test mocks `global.players` as the array of player objects.
    // In script.js, `playerRoles` IS the array of player objects (with roles).
    // So I should use `playerRoles` here.
    
    // But wait, the test file `__tests__/playerRole.test.js` sets `global.players` and expects `updatePlayerRole` to modify it?
    // Let's check the test again.
    // The test calls `updatePlayerRole(0, ...)`
    // And expects `global.players[0].roles.actual` to change.
    
    // In script.js, `playerRoles` is the main state array.
    // But `players` is just setup info.
    // I should probably use `playerRoles` in `updatePlayerRole`.
    
    // However, for the test to pass, `updatePlayerRole` needs to operate on whatever the test set up.
    // The test set up `global.players`.
    // If `updatePlayerRole` uses `playerRoles`, I need to mock `playerRoles` in the test too.
    // In my test file I did: `global.players = [...]` and `global.playerRoles = []`.
    
    // Let's look at the test file content again (Step 1210).
    // `global.players = [ { ... roles: ... } ]`
    // `global.playerRoles = []`
    
    // If I implement `updatePlayerRole` to use `playerRoles`, the test will fail because it populates `players`.
    // I should update the test to populate `playerRoles` instead, OR update `updatePlayerRole` to use `players`?
    // No, `playerRoles` is the correct game state variable in `script.js`.
    // So I should fix the test to populate `playerRoles` instead of `players`.
    
    // BUT, I can't fix the test right now without a separate tool call.
    // I should implement `updatePlayerRole` correctly (using `playerRoles`) and then fix the test if it fails.
    // Actually, looking at `script.js`, `playerRoles` is the one holding the role state.
    
    // Let's implement it using `playerRoles`.
    
    const player = playerRoles[playerIndex];
    if (!player) return;
    
    const oldRole = player.roles.actual;
    
    // Update actual role
    player.roles.actual = newRole;
    
    // Update perceived role if player knows
    if (perceived) {
        player.roles.perceived = newRole;
    }
    
    // Update backward compatibility property if needed (setter handles it, but just in case)
    // player.roleId = newRole; // The setter I defined earlier does this: this.roles.actual = value
    
    // Record history
    if (player.roleHistory) {
        player.roleHistory.push({
            timestamp: Date.now(),
            event: event,
            from: oldRole,
            to: newRole,
            perceived: perceived,
            source: source,
            target: target
        });
    }
    
    console.log(`[Role Update] Player ${playerIndex}: ${oldRole} -> ${newRole} (perceived: ${perceived})`);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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

// 測試環境導出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Core functions to test
        init,
        initGame,
        initSetup,
        
        // Helper functions
        shuffleArray,
        
        // Game Logic functions (will add more as we refactor)
        updatePlayerRole, 
        swapCards,
        validateGameState,
        
        // Token & Interaction
        addToken, removeToken, hasToken, clearAllTokens,
        setCardInteractionState, getCardInteractionState,
        
        // UI Helpers
        createCard,
        
        // Role Handlers
        RoleHandler,
        SeerHandler,
        RobberHandler,
        WerewolfHandler,
        ApprenticeSeerHandler,
        WitchHandler,
        TroublemakerHandler,
        DrunkHandler,
        InsomniacHandler,
        DoppelgangerHandler,
        SentinelHandler,
        MinionHandler,
        PIHandler,
        MysticWolfHandler,
        RevealerHandler,
        
        // Test Helpers
        setPlayerRoles: (roles) => { playerRoles = roles; },
        getPlayerRoles: () => playerRoles,
        setCenterCards: (cards) => { centerCards = cards; },
        getCenterCards: () => centerCards,
    };
}
