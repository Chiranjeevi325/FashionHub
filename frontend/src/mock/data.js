export const CATEGORIES = ['All', 'Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry'];

export const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Silk Evening Gown',
        description: 'A luxurious silk evening gown with a sleek finish and elegant drape.',
        price: 1200,
        category: 'Clothing',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'],
        brand: 'Ethereal',
        status: 'published',
        isDeleted: false,
    },
    {
        id: '2',
        name: 'Leather Crossbody Bag',
        description: 'Handcrafted genuine leather bag with gold hardware.',
        price: 450,
        category: 'Bags',
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'],
        brand: 'Luxe Leather',
        status: 'published',
        isDeleted: false,
    },
    {
        id: '3',
        name: 'Minimalist Gold Watch',
        description: 'Timeless design with a slim profile and Japanese movement.',
        price: 850,
        category: 'Accessories',
        images: ['https://images.unsplash.com/photo-1524592091214-8c97af7c431d?auto=format&fit=crop&q=80&w=800'],
        brand: 'Chronos',
        status: 'published',
        isDeleted: false,
    },
    {
        id: '4',
        name: 'Velvet Stiletto Heels',
        description: 'Elegant velvet heels for the perfect night out.',
        price: 600,
        category: 'Shoes',
        images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'],
        brand: 'Ethereal',
        status: 'published',
        isDeleted: false,
    },
    {
        id: '5',
        name: 'Cashmere Oversized Sweater',
        description: 'Ultra-soft cashmere for ultimate comfort and style.',
        price: 320,
        category: 'Clothing',
        images: ['https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=800'],
        brand: 'Ethereal',
        status: 'draft',
        isDeleted: false,
    }
];

export const MOCK_STATS = {
    totalProducts: 5,
    publishedCount: 4,
    archivedCount: 1
};
