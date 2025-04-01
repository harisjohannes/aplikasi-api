// API key dari TMDB (ganti dengan API key Anda)
const API_KEY = 'YOUR_API_KEY_HERE';  // Ganti dengan API Key Anda

// Referensi elemen HTML
const fetchButton = document.getElementById('fetchButton');
const searchTerm = document.getElementById('searchTerm');
const movieList = document.getElementById('movieList');

// Fungsi untuk mengambil data film dari TMDB
const fetchMovies = async () => {
    const query = searchTerm.value.trim();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Menampilkan hasil pencarian atau pesan jika tidak ditemukan film
        if (data.results.length === 0) {
            movieList.innerHTML = '<p>Tidak ada film yang ditemukan.</p>';
        } else {
            const movieHTML = data.results.map(movie => {
                return `
                    <div class="movie-item">
                        <h3>${movie.title}</h3>
                        <p>${movie.overview}</p>
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    </div>
                `;
            }).join('');
            movieList.innerHTML = movieHTML;
        }
    } catch (error) {
        movieList.innerHTML = '<p>Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.</p>';
    }
};

// Event listener untuk tombol cari
fetchButton.addEventListener('click', fetchMovies);
