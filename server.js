const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// Mengambil PORT dari Environment Variable (diset di Railway/Render, misalnya 5000)
const PORT = process.env.PORT || 5000; 

// Mengambil URI Database dari Environment Variable (diset di Railway/Render)
const MONGO_URI = process.env.MONGO_URI; 

// --- 1. Middleware ---
app.use(cors({
    // Izinkan semua domain (termasuk InfinityFree Anda) untuk mengakses API
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json()); // Untuk membaca data JSON dari permintaan POST/PUT

// --- 2. Koneksi Database ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// --- 3. Routes API ---
// Import route file Anda di sini
const anggotaRoutes = require('./routes/anggotaRoute');
const kasRoutes = require('./routes/kasRoute');

// Menghubungkan route ke endpoint utama: /api/anggota dan /api/kas
app.use('/api/anggota', anggotaRoutes);
app.use('/api/kas', kasRoutes);

// --- 4. Server Listener ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
