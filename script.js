// ========================================
// GPT Workshop Interactive Script
// ========================================

// Global Variables
let currentSlide = 0;
const totalSlides = 18;

// ========================================
// P5.js Background Animation
// ========================================
let particles = [];

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-background');

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    clear();

    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
        particle.connect(particles);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.radius = random(2, 4);
        this.alpha = random(100, 200);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Keep within bounds
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    display() {
        noStroke();
        fill(255, 59, 48, this.alpha);
        ellipse(this.x, this.y, this.radius * 2);
    }

    connect(particles) {
        for (let other of particles) {
            const d = dist(this.x, this.y, other.x, other.y);
            if (d < 150 && d > 0) {
                stroke(255, 59, 48, map(d, 0, 150, 100, 0));
                strokeWeight(map(d, 0, 150, 2, 0.5));
                line(this.x, this.y, other.x, other.y);
            }
        }
    }
}

// ========================================
// Slide Navigation
// ========================================
function showSlide(index) {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[index]) {
        navLinks[index].classList.add('active');
    }

    // Update counter
    document.getElementById('current-slide').textContent = index + 1;

    // Scroll to top
    document.querySelector('.slides-container').scrollTop = 0;

    currentSlide = index;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Navigation link clicks
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Initialize
    showSlide(0);

    // Chat input enter key
    const chatInput = document.getElementById('chat-input');
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// ========================================
// Chat Interface
// ========================================
let chatExpanded = false;

function toggleChat() {
    const chatContainer = document.querySelector('.chat-container');
    const toggleBtn = document.querySelector('.chat-toggle');

    chatExpanded = !chatExpanded;

    if (chatExpanded) {
        chatContainer.classList.add('expanded');
        toggleBtn.textContent = '−';
    } else {
        chatContainer.classList.remove('expanded');
        toggleBtn.textContent = '_';
    }
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const message = input.value.trim();

    if (!message) return;

    // Expand chat if not expanded
    if (!chatExpanded) {
        toggleChat();
    }

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    messagesContainer.appendChild(userMessageDiv);

    // Clear input
    input.value = '';

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Get current slide context
    const currentSlideElement = document.querySelector('.slide.active');
    const slideTitle = currentSlideElement.querySelector('.slide-title')?.textContent || '';
    const slideContent = currentSlideElement.textContent.substring(0, 2000);

    // Call Gemini API
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyCBqyTOuwooxl0qD0ps8gDQsiuVPOb-4sk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `당신은 GPT 활용 생산성 향상 워크샵의 AI 도우미입니다. 현재 학습자가 보고 있는 슬라이드는 "${slideTitle}"입니다.\n\n슬라이드 내용:\n${slideContent}\n\n학습자 질문: ${message}\n\n친절하고 명확하게 한국어로 답변해주세요. 슬라이드 내용과 관련된 질문이면 구체적으로, 추가 질문이면 도움이 되는 정보를 제공하세요.`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0]) {
            const aiResponse = data.candidates[0].content.parts[0].text;

            // Add AI message
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'message ai-message';
            aiMessageDiv.innerHTML = `<p>${escapeHtml(aiResponse)}</p>`;
            messagesContainer.appendChild(aiMessageDiv);
        } else {
            throw new Error('Invalid response from API');
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);

        // Add error message
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'message ai-message';
        errorMessageDiv.innerHTML = `<p>죄송합니다. 일시적인 오류가 발생했습니다. Gemini API 키를 확인해주세요. (script.js 파일에서 YOUR_GEMINI_API_KEY를 실제 API 키로 교체하세요)</p>`;
        messagesContainer.appendChild(errorMessageDiv);
    }

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========================================
// Smooth Scroll for Navigation
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Interactive Elements
// ========================================

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .component-card, .recap-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.content-block, .component-card, .workflow-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// Progress Indicator
// ========================================
// Disabled - progress bar removed per user request
// function updateProgress() {
//     const progress = ((currentSlide + 1) / totalSlides) * 100;
//
//     // Create progress bar if it doesn't exist
//     if (!document.querySelector('.progress-bar')) {
//         const progressBar = document.createElement('div');
//         progressBar.className = 'progress-bar';
//         progressBar.innerHTML = '<div class="progress-fill"></div>';
//         document.querySelector('.sidebar').appendChild(progressBar);
//
//         const style = document.createElement('style');
//         style.textContent = `
//             .progress-bar {
//                 position: absolute;
//                 bottom: 20px;
//                 left: 20px;
//                 right: 20px;
//                 height: 4px;
//                 background: rgba(0, 0, 0, 0.1);
//                 border-radius: 2px;
//                 overflow: hidden;
//             }
//             .progress-fill {
//                 height: 100%;
//                 background: linear-gradient(90deg, #ff3b30, #ff6b60);
//                 border-radius: 2px;
//                 transition: width 0.3s ease;
//                 width: 0%;
//             }
//         `;
//         document.head.appendChild(style);
//     }
//
//     const progressFill = document.querySelector('.progress-fill');
//     if (progressFill) {
//         progressFill.style.width = progress + '%';
//     }
// }
//
// // Update progress on slide change
// document.addEventListener('DOMContentLoaded', () => {
//     updateProgress();
// });
//
// // Override showSlide to update progress
// const originalShowSlide = showSlide;
// showSlide = function(index) {
//     originalShowSlide(index);
//     updateProgress();
// };

// ========================================
// API Key Setup Helper
// ========================================
console.log(`
%c🚀 GPT Workshop Setup Guide

%c1. Gemini API 키 설정:
   - https://makersuite.google.com/app/apikey 에서 API 키 발급
   - script.js 파일의 'YOUR_GEMINI_API_KEY'를 실제 키로 교체

2. 로컬 서버 실행:
   - Python: python -m http.server 8000
   - Node.js: npx http-server
   - 또는 Live Server VS Code 확장 사용

3. 브라우저에서 열기:
   - http://localhost:8000

%c즐거운 학습 되세요! 🎉
`,
'color: #ff3b30; font-size: 16px; font-weight: bold;',
'color: #1d1d1f; font-size: 14px; line-height: 1.6;',
'color: #ff3b30; font-size: 14px; font-weight: bold;'
);
