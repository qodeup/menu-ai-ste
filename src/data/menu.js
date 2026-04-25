export const categories = [
  { id: 'antipasti', label: { it: 'Antipasti', en: 'Starters' } },
  { id: 'primi', label: { it: 'Primi', en: 'First Courses' } },
  { id: 'secondi', label: { it: 'Secondi', en: 'Main Courses' } },
  { id: 'contorni', label: { it: 'Contorni', en: 'Side Dishes' } },
  { id: 'pizze', label: { it: 'Pizze', en: 'Pizzas' } },
  { id: 'dolci', label: { it: 'Dolci', en: 'Desserts' } },
  { id: 'bevande', label: { it: 'Bevande', en: 'Drinks' } },
]

export const products = {
  antipasti: [
    { id: 1, name: { it: 'Bruschetta al Pomodoro', en: 'Tomato Bruschetta' }, description: { it: 'Pane tostato con pomodori freschi, basilico e olio EVO', en: 'Toasted bread with fresh tomatoes, basil and extra virgin olive oil' }, price: 6.50, allergens: ['gluten'] },
    { id: 2, name: { it: 'Tagliere di Salumi', en: 'Cured Meats Board' }, description: { it: 'Selezione di salumi artigianali con olive e sottaceti', en: 'Selection of artisan cured meats with olives and pickles' }, price: 14.00, allergens: [] },
    { id: 3, name: { it: 'Carpaccio di Manzo', en: 'Beef Carpaccio' }, description: { it: 'Fettine di manzo crude con rucola, grana e limone', en: 'Thin slices of raw beef with arugula, grana and lemon' }, price: 12.00, allergens: ['dairy'] },
    { id: 4, name: { it: 'Caprese', en: 'Caprese Salad' }, description: { it: 'Mozzarella di bufala, pomodoro e basilico fresco', en: 'Buffalo mozzarella, tomato and fresh basil' }, price: 10.00, allergens: ['dairy'] },
  ],
  primi: [
    { id: 5, name: { it: 'Spaghetti alla Carbonara', en: 'Spaghetti Carbonara' }, description: { it: 'Spaghetti con guanciale, uova, pecorino e pepe nero', en: 'Spaghetti with guanciale, eggs, pecorino and black pepper' }, price: 13.00, allergens: ['gluten', 'eggs', 'dairy'] },
    { id: 6, name: { it: 'Penne all\'Arrabbiata', en: 'Penne Arrabbiata' }, description: { it: 'Penne con salsa di pomodoro piccante e aglio', en: 'Penne with spicy tomato sauce and garlic' }, price: 11.00, allergens: ['gluten'] },
    { id: 7, name: { it: 'Risotto ai Funghi Porcini', en: 'Porcini Mushroom Risotto' }, description: { it: 'Riso Carnaroli con funghi porcini e parmigiano', en: 'Carnaroli rice with porcini mushrooms and parmesan' }, price: 15.00, allergens: ['dairy'] },
    { id: 8, name: { it: 'Tagliatelle al Ragù', en: 'Tagliatelle Bolognese' }, description: { it: 'Tagliatelle fresche con ragù di carne alla bolognese', en: 'Fresh tagliatelle with Bolognese meat sauce' }, price: 14.00, allergens: ['gluten', 'eggs'] },
  ],
  secondi: [
    { id: 9, name: { it: 'Filetto di Manzo', en: 'Beef Fillet' }, description: { it: 'Filetto di manzo alla griglia con salsa al pepe verde', en: 'Grilled beef fillet with green pepper sauce' }, price: 26.00, allergens: ['dairy'] },
    { id: 10, name: { it: 'Branzino al Forno', en: 'Baked Sea Bass' }, description: { it: 'Branzino intero al forno con erbe aromatiche e limone', en: 'Whole baked sea bass with aromatic herbs and lemon' }, price: 22.00, allergens: ['fish'] },
    { id: 11, name: { it: 'Pollo alla Cacciatora', en: 'Chicken Cacciatore' }, description: { it: 'Pollo in umido con olive, capperi e pomodoro', en: 'Braised chicken with olives, capers and tomato' }, price: 16.00, allergens: [] },
  ],
  contorni: [
    { id: 12, name: { it: 'Patate al Forno', en: 'Roasted Potatoes' }, description: { it: 'Patate croccanti al rosmarino', en: 'Crispy rosemary potatoes' }, price: 5.00, allergens: [] },
    { id: 13, name: { it: 'Insalata Mista', en: 'Mixed Salad' }, description: { it: 'Insalata di stagione con pomodorini e carote', en: 'Seasonal salad with cherry tomatoes and carrots' }, price: 5.00, allergens: [] },
    { id: 14, name: { it: 'Verdure Grigliate', en: 'Grilled Vegetables' }, description: { it: 'Zucchine, melanzane e peperoni alla griglia', en: 'Grilled zucchini, eggplant and peppers' }, price: 6.00, allergens: [] },
  ],
  pizze: [
    { id: 15, name: { it: 'Margherita', en: 'Margherita' }, description: { it: 'Pomodoro, fior di latte, basilico', en: 'Tomato, fior di latte, basil' }, price: 9.00, allergens: ['gluten', 'dairy'] },
    { id: 16, name: { it: 'Diavola', en: 'Diavola' }, description: { it: 'Pomodoro, fior di latte, salame piccante', en: 'Tomato, fior di latte, spicy salami' }, price: 11.00, allergens: ['gluten', 'dairy'] },
    { id: 17, name: { it: 'Quattro Stagioni', en: 'Four Seasons' }, description: { it: 'Pomodoro, mozzarella, funghi, carciofi, olive, prosciutto', en: 'Tomato, mozzarella, mushrooms, artichokes, olives, ham' }, price: 13.00, allergens: ['gluten', 'dairy'] },
    { id: 18, name: { it: 'Bufalina', en: 'Bufalina' }, description: { it: 'Pomodorini, mozzarella di bufala DOP, basilico fresco', en: 'Cherry tomatoes, DOP buffalo mozzarella, fresh basil' }, price: 14.00, allergens: ['gluten', 'dairy'] },
  ],
  dolci: [
    { id: 19, name: { it: 'Tiramisù', en: 'Tiramisù' }, description: { it: 'Classico tiramisù con mascarpone e savoiardi', en: 'Classic tiramisù with mascarpone and ladyfingers' }, price: 7.00, allergens: ['gluten', 'eggs', 'dairy'] },
    { id: 20, name: { it: 'Panna Cotta', en: 'Panna Cotta' }, description: { it: 'Panna cotta con coulis di frutti di bosco', en: 'Panna cotta with wild berry coulis' }, price: 6.00, allergens: ['dairy'] },
    { id: 21, name: { it: 'Cannolo Siciliano', en: 'Sicilian Cannolo' }, description: { it: 'Cannolo croccante con ricotta dolce e canditi', en: 'Crispy cannolo with sweet ricotta and candied fruit' }, price: 6.50, allergens: ['gluten', 'dairy', 'eggs'] },
  ],
  bevande: [
    { id: 22, name: { it: 'Acqua Naturale', en: 'Still Water' }, description: { it: 'Bottiglia 75 cl', en: '75 cl bottle' }, price: 2.50, allergens: [] },
    { id: 23, name: { it: 'Acqua Frizzante', en: 'Sparkling Water' }, description: { it: 'Bottiglia 75 cl', en: '75 cl bottle' }, price: 2.50, allergens: [] },
    { id: 24, name: { it: 'Vino della Casa', en: 'House Wine' }, description: { it: 'Rosso o bianco, 1/4 di litro', en: 'Red or white, 1/4 litre carafe' }, price: 4.00, allergens: ['sulphites'] },
    { id: 25, name: { it: 'Birra Artigianale', en: 'Craft Beer' }, description: { it: 'Bottiglia 33 cl', en: '33 cl bottle' }, price: 5.00, allergens: ['gluten'] },
    { id: 26, name: { it: 'Caffè Espresso', en: 'Espresso Coffee' }, description: { it: 'Miscela arabica selezionata', en: 'Selected arabica blend' }, price: 1.50, allergens: [] },
  ],
}
