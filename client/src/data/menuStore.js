export const menuData = {
    rolls: [
      {
        id: '1',
        name: "California Roll",
        description: "Palta, pepino, kanikama",
        price: 1200,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800"
      },
      {
        id: '2',
        name: "Sake Roll",
        description: "Salmón, palta, queso philadelphia",
        price: 1500,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1595272568891-123402d0fb3b?w=800"
      },
      {
        id: '3',
        name: "Ebi Roll",
        description: "Langostinos, palta, verdeo",
        price: 1400,
        pieces: 8,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800"
      },
      {
        id: '4',
        name: "Dragon Roll",
        description: "Langostinos rebozados, palta por fuera",
        price: 1600,
        pieces: 8,
        image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg"
      },
      {
        id: '5',
        name: "Rainbow Roll",
        description: "Roll cubierto con finas láminas de pescados variados",
        price: 1700,
        pieces: 8,
        image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg"
      },
      {
        id: '6',
        name: "Veggie Roll",
        description: "Palta, pepino, zanahoria y verduras de estación",
        price: 1100,
        pieces: 8,
        image: "https://images.pexels.com/photos/884596/pexels-photo-884596.jpeg"  // Nueva imagen para Veggie Roll
      },
      {
        id: '7',
        name: "Tempura Roll",
        description: "Roll rebozado y frito con salmón y queso",
        price: 1550,
        pieces: 8,
        image: "https://images.pexels.com/photos/2098143/pexels-photo-2098143.jpeg"  // Nueva imagen para Tempura Roll
      },
      {
        id: '8',
        name: "Spicy Tuna Roll",
        description: "Atún picante, verdeo y pepino",
        price: 1450,
        pieces: 8,
        image: "https://images.pexels.com/photos/2098135/pexels-photo-2098135.jpeg"  // Nueva imagen para Spicy Tuna Roll
      }
    ],
    promociones: [
      {
        id: 'p1',
        name: "Combo Familiar",
        description: "30 piezas variadas + 2 bebidas",
        price: 4500,
        originalPrice: 5500,
        image: "https://images.pexels.com/photos/2323391/pexels-photo-2323391.jpeg"
      },
      {
        id: 'p2',
        name: "Combo Amigos",
        description: "24 piezas + 1 bebida",
        price: 3800,
        originalPrice: 4500,
        image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg"
      }
    ],
    findProduct: function(name) {
      return this.rolls.find(r => r.name.toLowerCase() === name.toLowerCase()) ||
             this.promociones.find(p => p.name.toLowerCase() === name.toLowerCase());
    }
  };