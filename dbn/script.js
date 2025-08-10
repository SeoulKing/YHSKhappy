// RSVP 기능 제거됨

// 축하 메시지 추가
function addMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message === '') {
        showNotification('메시지를 입력해주세요!');
        return;
    }
    
    const messagesList = document.getElementById('messagesList');
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    
    const currentTime = new Date();
    const timeString = currentTime.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    messageItem.innerHTML = `
        <div class="message-text">${message}</div>
        <div class="message-time">${timeString}</div>
    `;
    
    messagesList.appendChild(messageItem);
    
    // 입력 필드 초기화
    input.value = '';
    
    // 로컬 스토리지에 메시지 저장
    saveMessage(message, timeString);
    
    // 메시지 목록을 맨 아래로 스크롤
    messagesList.scrollTop = messagesList.scrollHeight;
    
    showNotification('축하 메시지가 전송되었습니다! 💝');
}

// 메시지 저장
function saveMessage(message, time) {
    let messages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    messages.push({ message, time });
    localStorage.setItem('birthdayMessages', JSON.stringify(messages));
}

// 저장된 메시지 불러오기
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    const messagesList = document.getElementById('messagesList');
    
    messages.forEach(msg => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.innerHTML = `
            <div class="message-text">${msg.message}</div>
            <div class="message-time">${msg.time}</div>
        `;
        messagesList.appendChild(messageItem);
    });
}

// RSVP 로드 기능 제거됨

// 알림 표시
function showNotification(message) {
    // 기존 알림이 있다면 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// 애니메이션 키프레임 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
`;
document.head.appendChild(style);

// Enter 키로 메시지 전송
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addMessage();
    }
});

// 페이지 로드 시 저장된 데이터 불러오기
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
    
    // 커버 이미지가 없을 경우 기본 배경 사용
    const coverImg = document.getElementById('coverImg');
    coverImg.addEventListener('error', function() {
        this.style.display = 'none';
        document.querySelector('.cover-image').style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
    });
});

// 스크롤 애니메이션
function animateOnScroll() {
    const elements = document.querySelectorAll('.info-card, .messages-section, .calendar-card, .gallery-grid img, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 스크롤 애니메이션 활성화
document.addEventListener('DOMContentLoaded', animateOnScroll);
