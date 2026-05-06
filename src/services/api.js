const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const getFallbackData = (count) => {
  const templates = [
    {
      title: 'Filsafat Pendidikan Nasional',
      category: 'Edukasi',
      topic: 'Filsafat',
      author: 'Ki Hajar Dewantara',
      thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Teknologi Digital & Masyarakat',
      category: 'Teknologi',
      topic: 'Digital',
      author: 'Budi Raharjo',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Sosiologi Modern',
      category: 'Sosial',
      topic: 'Sosiologi',
      author: 'Selo Soemardjan',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Seni & Budaya Nusantara',
      category: 'Budaya',
      topic: 'Seni',
      author: 'Tim Budaya',
      thumbnail: 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Pemikiran Kritis di Era Informasi',
      category: 'Edukasi',
      topic: 'Literasi',
      author: 'Rina Wijaya',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Revolusi Industri 4.0',
      category: 'Teknologi',
      topic: 'Industri',
      author: 'Ahmad Fauzi',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return Array.from({ length: count }).map((_, index) => {
    const template = templates[index % templates.length];
    return {
      id: `fallback-${index}`,
      title: template.title,
      description: 'Deskripsi lengkap untuk konten ini belum tersedia secara offline, ini adalah data simulasi karena API limit.',
      category: template.category,
      topic: template.topic,
      format: index % 2 === 0 ? 'Buku' : 'Artikel',
      difficulty: 'Menengah',
      author: template.author,
      created_at: '2024',
      content_body: 'Konten lengkap simulasi offline.',
      summary: 'Data ini adalah data fallback yang muncul karena limit kuota Google Books API telah tercapai...',
      impact_score: Math.floor(Math.random() * 20) + 80,
      views: Math.floor(Math.random() * 5000) + 500,
      tags: [template.topic.toLowerCase(), template.category.toLowerCase()],
      thumbnail: template.thumbnail
    };
  });
};

export const fetchBooks = async (query = 'pendidikan indonesia filsafat', maxResults = 10) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
    const data = await response.json();
    
    if (!data.items) {
      console.warn("Google API returned no items or quota exceeded. Using fallback data.");
      return getFallbackData(maxResults);
    }

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
    return getFallbackData(maxResults);
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const item = await response.json();
    
    if (item.error || !item.id) {
      return getFallbackData(1)[0];
    }
    
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
    return getFallbackData(1)[0];
  }
};
