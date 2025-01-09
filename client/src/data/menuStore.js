export const menuData = {
    rolls: [
      {
        id: '1',
        name: "California Roll",
        description: "Palta, pepino, kanikama",
        price: 1200,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1617196034280-45e7be97f013?w=800"
      },
      {
        id: '2',
        name: "Sake Roll",
        description: "Salmón, palta, queso philadelphia",
        price: 1500,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1617196035303-964a45bbc9f0?w=800"
      },
      {
        id: '3',
        name: "Ebi Roll",
        description: "Langostinos, palta, verdeo",
        price: 1400,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800"
      },
      {
        id: '4',
        name: "Dragon Roll",
        description: "Langostinos rebozados, palta por fuera",
        price: 1600,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800"
      },
      {
        id: '5',
        name: "Rainbow Roll",
        description: "Roll cubierto con finas láminas de pescados variados",
        price: 1700,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800"
      },
      {
        id: '6',
        name: "Veggie Roll",
        description: "Palta, pepino, zanahoria y verduras de estación",
        price: 1100,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800"
      },
      {
        id: '7',
        name: "Tempura Roll",
        description: "Roll rebozado y frito con salmón y queso",
        price: 1550,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800"
      },
      {
        id: '8',
        name: "Spicy Tuna Roll",
        description: "Atún picante, verdeo y pepino",
        price: 1450,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800"
      }
    ],
    promociones: [
      {
        id: 'p1',
        name: "Combo Familiar",
        description: "30 piezas variadas + 2 bebidas",
        price: 4500,
        originalPrice: 5500,
        image: "https://images.unsplash.com/photo-1676037150108-0fa45654cd70?w=800"
      },
      {
        id: 'p2',
        name: "Combo Amigos",
        description: "24 piezas + 1 bebida",
        price: 3800,
        originalPrice: 4500,
        image: "https://images.unsplash.com/photo-1674147905121-5694d864339f?w=800"
      }
    ],
    // Función helper para buscar productos
    findProduct: function(name) {
      return this.rolls.find(r => r.name.toLowerCase() === name.toLowerCase()) ||
             this.promociones.find(p => p.name.toLowerCase() === name.toLowerCase());
    }
  };