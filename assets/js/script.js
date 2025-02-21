document.addEventListener('DOMContentLoaded', () => {
    const terminalContainer = document.getElementById('terminal');
    const terminalText = document.getElementById('terminal-text');
    const videoBackground = document.getElementById('myVideo');
    const audioBackground = document.getElementById('myAudio');
    const blurredBox = document.getElementById('blurred-box');
    const closeButton = document.getElementById('close-button');
    
    const terminalTextContent = [
        "User: unknown",
        "IP: Loading...",
        `System: ${getOperatingSystem()}`,
        "Bio Loaded",
        "Press Enter To Continue",
    ];
    let currentIndex = 0;
    
    audioBackground.pause();
    
    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => terminalTextContent[1] = `IP: ${data.ip}`)
        .catch(() => terminalTextContent[1] = "IP: Unable to fetch IP address")
        .finally(typeWriter);
    
    function typeWriter() {
        if (currentIndex >= terminalTextContent.length + 1) return addEventListeners();
        
        let line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1], i = 0;
        (function typeChar() {
            if (i < line.length) {
                terminalText.textContent += line[i++];
                setTimeout(typeChar, 20);
            } else {
                terminalText.textContent += "\n";
                currentIndex++;
                typeWriter();
            }
        })();
    }
    
    function handleInput() {
        terminalContainer.style.display = 'none';
        videoBackground.play(); 
        audioBackground.play(); 
        blurredBox.style.display = 'block';
        removeEventListeners();
    }
    
    function addEventListeners() {
        document.addEventListener('keydown', handleKeyPress);
        terminalContainer.addEventListener('click', handleInput);
    }
    
    function removeEventListeners() {
        document.removeEventListener('keydown', handleKeyPress);
        terminalContainer.removeEventListener('click', handleInput);
    }
    
    function handleKeyPress(event) {
        if (event.key === 'Enter') handleInput();
    }
    
    closeButton.addEventListener('click', handleInput);
    
    function getOperatingSystem() {
        const ua = navigator.userAgent;
        if (/Windows NT (\d+\.\d+)/.test(ua)) return {
            "5.1": "Windows XP", "6.0": "Windows Vista", "6.1": "Windows 7",
            "6.2": "Windows 8", "6.3": "Windows 8.1", "10.0": "Windows 10/11"
        }[RegExp.$1] || "Windows";
        if (/Mac OS X ([\d_]+)/.test(ua)) return `macOS ${RegExp.$1.replace(/_/g, '.')}`;
        if (/Android ([\d.]+)/.test(ua)) return `Android ${RegExp.$1}`;
        if (/iPhone|iPad|iPod/.test(ua)) return `iOS ${(/OS ([\d_]+)/.test(ua) ? RegExp.$1.replace(/_/g, '.') : "")}`;
        return /Linux/.test(ua) ? "Linux" : "Unknown";
    }
    
    function centerTerminal() {
        Object.assign(terminalContainer.style, {
            position: 'absolute',
            left: `${(window.innerWidth - terminalContainer.offsetWidth) / 2}px`,
            top: `${(window.innerHeight - terminalContainer.offsetHeight) / 2}px`
        });
    }
    
    window.addEventListener('resize', centerTerminal);
    centerTerminal();
    terminalText.style.textAlign = 'center';
    
    function getAsciiArt() {
        return `
  ⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
  ⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
  ⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
  ⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
  ⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
  ⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
  ⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
  ⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
  ⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
  ⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
  ⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
  ⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
  ⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣  
        
        
        `;
    }
    
    audioBackground.volume = Math.min(audioBackground.volume, 0.1);
});
