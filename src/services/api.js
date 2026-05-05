const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (query = 'pendidikan indonesia filsafat', maxResults = 10) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
    const data = await response.json();
    
    if (!data.items) return [];

    return data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      description: item.volumeInfo.description || 'Tidak ada deskripsi tersedia.',
      category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Edukasi',
      topic: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Umum',
      format: 'Buku / Artikel',
      difficulty: 'Menengah',
      author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Anonim',
      created_at: item.volumeInfo.publishedDate || '2024',
      content_body: item.volumeInfo.description || 'Konten lengkap belum tersedia untuk pratinjau ini.',
      summary: item.volumeInfo.description ? item.volumeInfo.description.substring(0, 150) + '...' : 'Ringkasan tidak tersedia.',
      impact_score: Math.floor(Math.random() * 20) + 80, // Simulation for now
      views: Math.floor(Math.random() * 5000) + 500,
      tags: item.volumeInfo.categories || ['pendidikan', 'literasi'],
      thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800'
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const item = await response.json();
    
    return {
      id: item.id,
      title: item.volumeInfo.title,
      description: item.volumeInfo.description || 'Tidak ada deskripsi tersedia.',
      category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Edukasi',
      topic: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Umum',
      format: 'Buku / Artikel',
      difficulty: 'Menengah',
      author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Anonim',
      created_at: item.volumeInfo.publishedDate || '2024',
      content_body: item.volumeInfo.description || 'Konten lengkap belum tersedia.',
      summary: item.volumeInfo.description ? item.volumeInfo.description.substring(0, 300) + '...' : 'Ringkasan tidak tersedia.',
      impact_score: Math.floor(Math.random() * 20) + 80,
      views: Math.floor(Math.random() * 5000) + 500,
      tags: item.volumeInfo.categories || ['pendidikan', 'literasi'],
      thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800'
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};
