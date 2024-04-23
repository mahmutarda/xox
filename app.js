// DOM'dan gerekli elementleri seçme
const board = document.querySelector(".table"); // Oyun tahtası
const infoLabel = document.querySelector("h1"); // Bilgi etiketi

// Oyun durumu için değişkenler
let flip = false; // Hamle sırası (false: X, true: O)
let count = 0; // Oynanan toplam hamle sayısı

// Oyunu başlatan fonksiyon
let startGame = () => {
    // Oyun tahtasını temizle
    board.innerHTML = "";
    // Bilgi etiketini sıfırla
    infoLabel.textContent = "";
    // Hamle sayısını sıfırla
    count = 0;
    // Oyun tahtasının tüm kutucuklarına tıklamayı etkinleştir
    board.style.pointerEvents = "all";

    // 9 adet kutucuk oluştur ve tahtaya ekle
    for (let i = 1; i <= 9; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        board.appendChild(square);
    }

    // Oluşturulan kutucuklara tıklama olayı ekle
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(item => {
        item.addEventListener("click", (e) => {
            if (!flip) {
                // X işareti ekle
                let sign = document.createElement("div");
                sign.classList.add("cross");
                e.target.style.pointerEvents = "none";
                e.target.appendChild(sign);
                check();
                flip = !flip;
            } else {
                // O işareti ekle
                let sign = document.createElement("div");
                sign.classList.add("circle");
                e.target.style.pointerEvents = "none";
                e.target.appendChild(sign);
                check();
                flip = !flip;
            }
        });
    });
};

// Oyun durumunu kontrol eden fonksiyon
const check = () => {
    const allSquares = document.querySelectorAll(".square");
    // Kazanma kombinasyonları
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Hamle sayısını artır
    count++;

    // Kazananı kontrol et
    winningCombinations.forEach((pair) => {
        let crossWin = pair.every((item) => allSquares[item].firstChild?.classList.contains("cross"));
        let circleWin = pair.every((item) => allSquares[item].firstChild?.classList.contains("circle"));

        if (crossWin) {
            infoLabel.textContent = "X Kazandı!";
            board.style.pointerEvents = "none";
            setTimeout(() => {
                startGame();
            }, 3000);
        } else if (circleWin) {
            infoLabel.textContent = "O Kazandı!";
            board.style.pointerEvents = "none";
            setTimeout(() => {
                startGame();
            }, 3000);
        }

        // Oyun berabere mi?
        if (count === 9) {
            infoLabel.textContent = "Berabere!";
            board.style.pointerEvents = "none";
            setTimeout(() => {
                startGame();
            }, 3000);
        }
    });
};

// Oyunu başlat
startGame();





