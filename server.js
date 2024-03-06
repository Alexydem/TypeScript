const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Добавляем middleware для обработки CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Лучше указать конкретный домен
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Указываем папку, где лежат статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Обработка GET-запроса для получения данных по конкретному месту
app.get('/api/places/:id', (req, res) => {
    const placeId = req.params.id;
    const filePath = path.resolve(__dirname, 'data', 'db.flats.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            const place = jsonData.places[placeId];

            if (place) {
                res.json(place);
            } else {
                res.status(404).json({ error: 'Место не найдено' });
            }
        } catch (parseError) {
            console.error(parseError);
            res.status(500).json({ error: 'Ошибка парсинга JSON' });
        }
    });
});

// Обработка GET-запроса для получения всех данных
app.get('/api/places', (req, res) => {
    const filePath = path.resolve(__dirname, 'data', 'db.flats.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error(parseError);
            res.status(500).json({ error: 'Ошибка парсинга JSON' });
        }
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
