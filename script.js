// Rastgele HEX, RGB ve HSL renk üreten fonksiyonlar
function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomHslColor() {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Renk değiştirme fonksiyonu
function changeBackgroundColor() {
    const format = document.getElementById('colorFormat').value;
    let newColor;
    if (format === 'HEX') {
        newColor = getRandomHexColor();
    } else if (format === 'RGB') {
        newColor = getRandomRgbColor();
    } else {
        newColor = getRandomHslColor();
    }
    
    document.body.style.backgroundColor = newColor;
    document.getElementById('colorCode').textContent = newColor;

    // Renk geçmişine ve favorilere ekleme
    addColorToHistory(newColor);
}

// Renk geçmişine yeni renk ekleme fonksiyonu (5 renk sınırı ile)
function addColorToHistory(color) {
    const historyList = document.getElementById('historyList');
    const newItem = document.createElement('li');
    newItem.textContent = color;
    newItem.style.backgroundColor = color;
    newItem.style.color = "#ffffff";
    newItem.onclick = () => addColorToFavorites(color);
    historyList.prepend(newItem);
    
    // Maksimum 5 renk sınırı
    if (historyList.childElementCount > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Favori renkler listesine ekleme fonksiyonu
function addColorToFavorites(color) {
    const favoritesList = document.getElementById('favoritesList');
    const newItem = document.createElement('li');
    newItem.textContent = color;
    newItem.style.backgroundColor = color;
    newItem.style.color = "#ffffff";
    newItem.onclick = () => {
        document.body.style.backgroundColor = color;
        document.getElementById('colorCode').textContent = color;
    };
    favoritesList.appendChild(newItem);
}

// Renk kodunu kopyalama
document.getElementById('colorCode').addEventListener('click', function() {
    const color = this.textContent;
    navigator.clipboard.writeText(color).then(() => {
        const copyMessage = document.getElementById('copyMessage');
        copyMessage.style.display = 'inline';
        setTimeout(() => copyMessage.style.display = 'none', 1000);
    });
});

// Butona tıklama etkinliği
document.getElementById('colorButton').addEventListener('click', changeBackgroundColor);
