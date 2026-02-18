// ---------------------------------------------------------
// UTILITY: TYPEWRITER EFFECT
// ---------------------------------------------------------
async function typeWriter(element, text, speed = 20, className = "text-zinc-300") {
    const line = document.createElement('div');
    line.className = className;
    element.appendChild(line);

    for (let i = 0; i < text.length; i++) {
        if (text.substr(i, 4) === "<br>") {
            line.innerHTML += "<br>";
            i += 3;
        } else if (text.substr(i, 7) === "</span>") { 
            line.innerHTML += text.charAt(i);
        } else {
            line.textContent += text.charAt(i);
        }
        await new Promise(r => setTimeout(r, speed));
    }
}

// ---------------------------------------------------------
// DATA: POOL OF ALERTS
// ---------------------------------------------------------
const alertPool = [
    { type: 'RISK', label: 'DAILY_MAX_LOSS', msg: 'Stop trading. Daily limit (-$500) hit.', color: 'rose' },
    { type: 'BEHAVIOR', label: 'TILT_DETECTED', msg: 'Entry interval < 20s. Slow down.', color: 'purple' },
    { type: 'EXECUTION', label: 'SLIPPAGE_HIGH', msg: 'Avg fill 4 ticks off signal.', color: 'blue' },
    { type: 'SYSTEM', label: 'WIN_STREAK', msg: '3 Wins in a row. Watch for overconfidence.', color: 'emerald' },
    { type: 'RULE', label: 'TIME_CONSTRAINT', msg: 'No entries allowed after 11:30 AM.', color: 'zinc' },
    { type: 'PSYCH', label: 'FOMO_TAG', msg: 'Chasing price. 2R deviation detected.', color: 'rose' },
    { type: 'EDGE', label: 'SQN_DROP', msg: 'System Quality dropped below 2.0.', color: 'purple' }
];

// ---------------------------------------------------------
// ANIMATION 1: TALK TO DATA (Chat Interface)
// ---------------------------------------------------------
async function runTalkDataAnim() {
    const container = document.getElementById('talk-data-anim');
    if (!container || container.classList.contains('played')) return;
    container.classList.add('played');

    // User Bubble
    const userDiv = document.createElement('div');
    userDiv.className = "flex justify-end mb-4 opacity-0 transition-opacity duration-500";
    userDiv.innerHTML = `<div class="bg-blue-600/20 border border-blue-500/30 text-blue-100 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%]">Why did I bleed profit on Tuesday?</div>`;
    container.appendChild(userDiv);
    
    // Reveal User
    setTimeout(() => userDiv.classList.remove('opacity-0'), 100);

    // Wait then Analyst
    await new Promise(r => setTimeout(r, 1500));

    const analystDiv = document.createElement('div');
    analystDiv.className = "flex justify-start mb-4";
    const innerAnalyst = document.createElement('div');
    innerAnalyst.className = "bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-lg";
    innerAnalyst.innerHTML = `<span class="text-purple-400 font-bold block mb-1">@Analyst:</span><span id="analyst-text-target"></span><span class="cursor-blink text-purple-500">_</span>`;
    analystDiv.appendChild(innerAnalyst);
    container.appendChild(analystDiv);

    // Type the response
    const textTarget = innerAnalyst.querySelector('#analyst-text-target');
    const msg = "You paid a $420 'Fear Tax' on 3 entries. You waited 14s avg after the signal, causing 6 ticks of slippage per trade.";
    
    for (let i = 0; i < msg.length; i++) {
        textTarget.textContent += msg.charAt(i);
        await new Promise(r => setTimeout(r, 20));
    }
}

// ---------------------------------------------------------
// ANIMATION 2: AUDIT EDGE (Bars & Numbers)
// ---------------------------------------------------------
function runAuditEdgeAnim() {
    const container = document.getElementById('audit-edge-anim');
    if (!container || container.classList.contains('played')) return;
    container.classList.add('played');

    // SQN Bar
    document.getElementById('sqn-bar').style.width = '75%';
    document.getElementById('sqn-label').classList.remove('opacity-0');

    // SQN Number Counter
    let count = 0.00;
    const target = 2.84;
    const interval = setInterval(() => {
        count += 0.05;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        document.getElementById('sqn-number').textContent = count.toFixed(2);
    }, 30);

    // Risk Leakage Bars (Height)
    document.getElementById('risk-bar-1').style.height = '80%';
    document.getElementById('risk-bar-2').style.height = '20%';
    document.getElementById('risk-bar-3').style.height = '15%';
    document.getElementById('risk-bar-4').style.height = '60%';
    
    // Show text popup
    setTimeout(() => {
        const riskText = document.getElementById('risk-text');
        if(riskText) riskText.classList.remove('opacity-0');
    }, 1500);
}

// ---------------------------------------------------------
// ANIMATION 3: ML DATA (JSON Typing)
// ---------------------------------------------------------
async function runMLDataAnim() {
    const container = document.getElementById('ml-data-anim');
    if (!container || container.classList.contains('played')) return;
    container.classList.add('played');

    const lines = [
        { text: '"strategy_id": "REV_02",', color: "text-zinc-500" },
        { text: '"entry_rsi": 72.4,', color: "text-blue-400" },
        { text: '"psych_tag": "FOMO",', color: "text-rose-400" },
        { text: '"mae_ticks": 12,', color: "text-blue-400" },
        { text: '"time_hold": "440s",', color: "text-zinc-300" },
        { text: '...', color: "text-zinc-600" }
    ];

    for (let line of lines) {
        const div = document.createElement('div');
        div.className = `${line.color} whitespace-nowrap`;
        container.appendChild(div);
        
        for (let i = 0; i < line.text.length; i++) {
            div.textContent += line.text.charAt(i);
            await new Promise(r => setTimeout(r, 15));
        }
        await new Promise(r => setTimeout(r, 100));
    }
}

// ---------------------------------------------------------
// ANIMATION 4: INFINITE ALERT FEED
// ---------------------------------------------------------
function startAlertStream() {
    const container = document.getElementById('alert-feed-container');
    if (!container || container.classList.contains('active')) return;
    container.classList.add('active');

    // 1. Initial Fill
    addAlertToFeed(container);
    setTimeout(() => addAlertToFeed(container), 400);
    setTimeout(() => addAlertToFeed(container), 800);

    // 2. Start Infinite Loop
    setInterval(() => {
        addAlertToFeed(container);
    }, 2500);
}

function addAlertToFeed(container) {
    const data = alertPool[Math.floor(Math.random() * alertPool.length)];
    
    const colorMap = {
        'rose': 'border-rose-500/30 bg-rose-500/5 text-rose-500',
        'blue': 'border-blue-500/30 bg-blue-500/5 text-blue-400',
        'purple': 'border-purple-500/30 bg-purple-500/5 text-purple-400',
        'emerald': 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500',
        'zinc': 'border-zinc-700 bg-zinc-800/50 text-zinc-400'
    };
    const theme = colorMap[data.color];

    const el = document.createElement('div');
    el.className = `transform -translate-y-4 opacity-0 transition-all duration-500 ease-out flex items-center justify-between p-3 border rounded-lg mb-3 ${theme}`;
    el.innerHTML = `
        <div class="flex flex-col">
            <span class="text-[9px] font-bold opacity-80 mb-0.5">${data.type}: ${data.label}</span>
            <span class="text-[10px] text-zinc-300 font-mono leading-tight">${data.msg}</span>
        </div>
        <div class="h-1.5 w-1.5 rounded-full bg-current animate-pulse"></div>
    `;

    container.prepend(el);

    requestAnimationFrame(() => {
        el.classList.remove('-translate-y-4', 'opacity-0');
    });

    const items = container.querySelectorAll('div.flex.items-center');
    if (items.length > 5) {
        const lastItem = items[items.length - 1];
        lastItem.style.opacity = '0';
        setTimeout(() => lastItem.remove(), 500);
    }
}

// ---------------------------------------------------------
// MASTER OBSERVER (Triggers animations on scroll)
// ---------------------------------------------------------
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            
            // --- FIXED: Explicitly checking all IDs ---
            if (id === 'talk-data-anim') runTalkDataAnim();
            if (id === 'audit-edge-anim') runAuditEdgeAnim();
            if (id === 'ml-data-anim') runMLDataAnim();
            if (id === 'alert-feed-container') startAlertStream();
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Attach observers
document.addEventListener('DOMContentLoaded', () => {
    // --- FIXED: Updated array to match actual HTML IDs ---
    const targets = ['talk-data-anim', 'audit-edge-anim', 'ml-data-anim', 'alert-feed-container'];
    targets.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // Start the Main Header Chat Loop
    setTimeout(runScenario, 1000); 
});

// ---------------------------------------------------------
// EXISTING SCENARIO LOGIC (Header Section)
// ---------------------------------------------------------
const chatWindow = document.getElementById('chat-window');
const scenarios = [
    {
        user: "Yo - check my trades from this month where I tagged 'Hesitation'. What’s the actual damage?",
        analyst: "I just ran the numbers - it's not pretty. When you hesitate, your average fill is about 4 ticks worse than the signal price. That 'Entry Friction' has cost you roughly $1,240 this month alone."
    },
    {
        user: "Why do I keep getting chopped up on Tuesday afternoons?",
        analyst: "I looked at your Tuesday data - specifically that 2 PM window. Your 'Expectancy Velocity' drops off a cliff there. It looks like you’re taking 'Revenge' tags right after the morning session closes."
    }
];

let scenarioIndex = 0;

async function typeText(element, text, className) {
    const lineContainer = document.createElement('div');
    lineContainer.className = "mb-4 leading-relaxed";
    
    const labelSpan = document.createElement('span');
    if (className === 'user') {
        labelSpan.className = "text-blue-400 font-bold mr-2";
        labelSpan.textContent = "User:";
    } else {
        labelSpan.className = "text-purple-400 font-bold mr-2";
        labelSpan.textContent = "Analyst:";
    }
    lineContainer.appendChild(labelSpan);

    const textSpan = document.createElement('span');
    textSpan.className = className === 'user' ? "text-zinc-300" : "text-teal-400"; 
    lineContainer.appendChild(textSpan);
    
    const cursor = document.createElement('span');
    cursor.className = "cursor-blink text-purple-500 ml-1";
    cursor.textContent = "_";
    lineContainer.appendChild(cursor);

    element.appendChild(lineContainer);
    element.scrollTop = element.scrollHeight;

    for (let i = 0; i < text.length; i++) {
        textSpan.textContent += text.charAt(i);
        element.scrollTop = element.scrollHeight;
        await new Promise(r => setTimeout(r, 20));
    }
    cursor.remove();
}

async function runScenario() {
    if(!chatWindow) return; 
    const currentScenario = scenarios[scenarioIndex];
    await typeText(chatWindow, currentScenario.user, 'user');
    await new Promise(r => setTimeout(r, 800));
    await typeText(chatWindow, currentScenario.analyst, 'analyst');
    await new Promise(r => setTimeout(r, 5000));
    chatWindow.innerHTML = '';
    scenarioIndex = (scenarioIndex + 1) % scenarios.length;
    runScenario();
}