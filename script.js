const tabMessages = {
    default: "I hope you enjoy this gift I made for you, Jem <3",
    tab1: "I know you don't take compliments but I couldn't help myself listing all those great things about you :>",
    tab2: "Yung tab lang talaga na toh yung naiiba sa lahat ehh. Sorry mb pero I wanted to recommend these things cause I thought you'd like them!",
    tab3: "Grabe naman nakakakilig yung message na yun ha! ♡⁠(⁠>⁠ ⁠ਊ⁠ ⁠<⁠)⁠♡",
    tab4: "OMG, ang ganda naman nung boses ng kumanta na yun! (⁠♡⁠ω⁠♡)⁠ ⁠~⁠♪"
};

let currentIntro = 0;
const introScreens = document.querySelectorAll(".intro-screen");
document.getElementById("home").style.display = "none";

/* -------------------- INTRO ANIMATION -------------------- */
function animateIn(element) {
    let text = element.innerText;
    element.innerHTML = "";

    setTimeout(() => {
        let hint = element.parentElement.querySelector(".intro-hint");
        if (hint) hint.style.opacity = "0.8";
    }, text.length * 40);

    text.split("").forEach((char, index) => {
        let span = document.createElement("span");
        span.innerHTML = char === " " ? "&nbsp;" : char;
        element.appendChild(span);

        setTimeout(() => { span.classList.add("show"); }, index * 70);
    });

    if (currentIntro === introScreens.length - 1) {
        setTimeout(() => {
            let currentText = introScreens[currentIntro].querySelector(".intro-text");
            animateOut(currentText, () => {
                introScreens[currentIntro].classList.remove("active");
                document.getElementById("home").style.display = "block";
            });
        }, text.length * 70 + 800);
    }
}

function animateOut(element, callback) {
    let spans = element.querySelectorAll("span");
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.remove("show");
            span.classList.add("hide");
        }, index * 30);
    });

    setTimeout(callback, spans.length * 30 + 300);
}

animateIn(introScreens[0].querySelector(".intro-text"));

document.addEventListener("click", (e) => {

    if (document.getElementById("secretTab").style.display === "flex") return;

    // ❌ stop if intro finished
    if (currentIntro >= introScreens.length) return;

    // ❌ stop clicking on last screen
    if (currentIntro === introScreens.length - 1) return;

    let currentText = introScreens[currentIntro].querySelector(".intro-text");

    animateOut(currentText, () => {
        introScreens[currentIntro].classList.remove("active");
        currentIntro++;

        let nextScreen = introScreens[currentIntro];
        nextScreen.classList.add("active");

        let nextText = nextScreen.querySelector(".intro-text");
        animateIn(nextText);
    });
});

/* -------------------- HOME / TABS -------------------- */
function goHome(fromTab = "default") {
    document.querySelectorAll(".tab").forEach(tab => { tab.style.display = "none"; });
    document.getElementById("home").style.display = "block";

    const messageBox = document.getElementById("mainMessage");
    messageBox.style.opacity = 0;

    setTimeout(() => {
        messageBox.innerText = tabMessages[fromTab] || tabMessages.default;
        messageBox.style.opacity = 1;
    }, 200);
}

function openTab(tabId) {
    document.getElementById("home").style.display = "none";
    document.querySelectorAll(".tab").forEach(tab => { tab.style.display = "none"; });

    const activeTab = document.getElementById(tabId);
    activeTab.style.display = "block";

    if (tabId === "tab1") {
        document.querySelectorAll(".thing").forEach((card, index) => {
            card.classList.remove("show");
            setTimeout(() => { card.classList.add("show"); }, index * 80);
        });
    }

    if (tabId === "tab3") {
        const letter = document.querySelector(".letter-container");
        letter.classList.remove("show");
        setTimeout(() => { letter.classList.add("show"); }, 100);
    }
}

/* -------------------- LETTER TYPEWRITER -------------------- */
const messageText = `Hi Jem :>

I don't really know how to start this letter/message, but I just wanted to say thank you. Thank you for being someone I can talk to easily, someone who doesn't judge, and someone who makes each moment special.

When I first confessed to you, I was scared as fuck. I was so scared that when you were reading the letter I made for you, I could hear my heart pounding. I was scared because I was already expecting the worst. I thought that our friendship/relationship that we have would be ruined. I thought things would be awkward and that we would grow apart. But I was wrong and I'm glad I was wrong.

After I confessed, I was so happy. I felt lighter and more confident. I don't know why I felt more confident, but I used that to make things not awkward for us. Each time I showed you a reel to tease you or compliment you randomly was all spontaneous.

Anyways, I'm yapping too much. I just wanted to tell you how much I really appreciate you. I like you Jem. 

Anyways, that's all I really wanted to say. I hope you will enjoy exploring this website.

P.S. There's a secret in one of these tabs.`;

function typeLetter(containerId, text, speed = 20) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            container.innerHTML += text[i];
            i++;
            setTimeout(typeChar, speed);
        }
    }

    typeChar();
}

if (!window.originalOpenTab) {
    window.originalOpenTab = openTab;
    openTab = function (tabId) {
        originalOpenTab(tabId);
        if (tabId === "tab3") typeLetter("letterMessage", messageText, 15);
    }
}

/* -------------------- RECOMMENDATION CARDS -------------------- */
document.querySelectorAll(".rec-card").forEach(card => {
    card.addEventListener("click", () => {
        const reason = card.querySelector(".rec-reason");
        const isVisible = reason.style.opacity === "1";
        reason.style.opacity = isVisible ? "0" : "1";
        reason.style.maxHeight = isVisible ? "0" : "500px";
    });
});

/* -------------------- HEART BACKGROUND -------------------- */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";
    heart.style.fontSize = (16 + Math.random() * 20) + "px";
    document.querySelector(".hearts-container").appendChild(heart);
    setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 500);

/* -------------------- SECRET TAB -------------------- */
const secretTexts = [
    "Hey, you found the secret!",
    "If you found this that means you've searched and explored the website I made for you!",
    "For starters, please don't judge what you'll see beyond this point.",
    "Also, I considered whether or not to put this in. But, I just said to myself \"Fuck it\" and added it anyways.",
    "Please don't judge, please."
];

let secretIndex = 0;

function typeText(element, text, speed = 20, callback) {
    element.innerHTML = "";
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            element.innerHTML += text[i];
            i++;
            setTimeout(typeChar, speed);
        } else if (callback) callback();
    }
    typeChar();
}

function openSecret() {
    const secretTab = document.getElementById("secretTab");
    const secretIntro = document.getElementById("secretIntro");
    const secretIntroText = document.getElementById("secretIntroText");
    const secretContent = document.getElementById("secretContent");

    // Show secret tab and hide everything else
    secretTab.style.display = "flex";
    secretContent.style.display = "none";
    document.getElementById("home").style.display = "none";
    document.querySelectorAll(".tab:not(#secretTab)").forEach(tab => tab.style.display = "none");

    let secretIndex = 0;
    let isTyping = false;

    function typeCurrentText() {
        const text = secretTexts[secretIndex];
        secretIntroText.innerHTML = "";
        isTyping = true;
        let i = 0;

        function typeChar() {
            if (i < text.length) {
                secretIntroText.innerHTML += text[i];
                i++;
                setTimeout(typeChar, 20);
            } else {
                isTyping = false;
            }
        }

        typeChar();
    }

    // Start typing first secret text
    typeCurrentText();

    // Click handler to progress intro
    secretIntro.addEventListener("click", () => {
        if (isTyping) return;

        secretIndex++;

        if (secretIndex < secretTexts.length) {
            typeCurrentText();
        } else {
            // Fade out intro
            secretIntro.style.transition = "opacity 0.8s ease";
            secretIntro.style.opacity = "0";

            setTimeout(() => {
                secretIntro.style.display = "none";
                // Show secret video
                secretContent.style.display = "flex";
                secretContent.style.opacity = "0";
                secretContent.style.transition = "opacity 1s ease";

                setTimeout(() => {
                    secretContent.style.opacity = "1";
                }, 50);

                // Play video from start
                const secretVideo = secretContent.querySelector("video");
                secretVideo.currentTime = 0;
                secretVideo.play();

                // When video ends, return to main page
                secretVideo.onended = () => {
                    secretTab.style.display = "none";
                    document.getElementById("home").style.display = "block";
                    secretVideo.currentTime = 0;
                };
            }, 800);
        }
    });
}

// Attach openSecret to the button
document.getElementById("secretBtn").addEventListener("click", openSecret);