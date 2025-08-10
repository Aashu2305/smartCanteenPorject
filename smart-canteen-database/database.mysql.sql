CREATE DATABASE smart_canteen_db;


USE smart_canteen_db;


INSERT INTO products (id, name, price, type, description, tags, emoji) VALUES
(1, 'Samosa', 15, 'veg', 'Classic crispy pastry with a spiced potato filling.', 'Fried,Classic', '🥟'),
(2, 'Idli (2 Pcs)', 30, 'veg', 'Soft, steamed rice cakes served with chutney.', 'Steamed,Healthy', '🍚'),
(3, 'Veg Patties', 25, 'veg', 'Flaky puff pastry with a savory vegetable mix.', 'Baked,Snack', '🥧'),
(4, 'Chicken Patties', 35, 'non-veg', 'Flaky puff pastry with a spiced chicken filling.', 'Baked,Snack', '🥧'),
(5, 'Veg Roll', 40, 'veg', 'Fresh veggies and sauces wrapped in a soft flatbread.', 'Fresh,Healthy', '🌯'),
(6, 'Chicken Roll', 60, 'non-veg', 'Tender chicken pieces and sauces in a flatbread wrap.', 'Grilled,Filling', '🌯'),
(7, 'Veg Sandwich', 35, 'veg', 'A simple classic with cucumber, tomato, and lettuce.', 'Cold,Fresh', '🥪'),
(8, 'Chicken Sandwich', 55, 'non-veg', 'Creamy shredded chicken in toasted bread.', 'Classic,Creamy', '🥪'),
(9, 'Hot Dog', 50, 'non-veg', 'A grilled sausage in a sliced bun with mustard.', 'Grilled,Classic', '🌭'),
(10, 'Margherita Pizza', 99, 'veg', 'A classic cheese and tomato pizza for one.', 'Cheesy,Classic', '🍕'),
(11, 'Chicken Pizza', 129, 'non-veg', 'Personal pizza topped with chicken and cheese.', 'Cheesy,Meat', '🍕'),
(12, 'Pineapple Pastry', 40, 'veg', 'A light and fluffy slice of tropical heaven.', 'Sweet,Creamy', '🍰'),
(13, 'Chocolate Muffin', 45, 'veg', 'A rich, moist muffin packed with chocolate chips.', 'Sweet,Chocolate', '🧁'),
(14, 'Vanilla Muffin', 40, 'veg', 'A classic soft muffin with a delicate vanilla flavor.', 'Sweet,Classic', '🧁'),
(15, 'Marble Cake Slice', 35, 'veg', 'A beautiful blend of vanilla and chocolate cake.', 'Sweet,Cake', '🍰'),
(16, 'Cheesecake Slice', 80, 'veg', 'A creamy, decadent slice of New York style cheesecake.', 'Premium,Dessert', '🧀'),
(17, 'Apple Pie Slice', 70, 'veg', 'Warm, spiced apples in a flaky pastry crust.', 'Classic,Dessert', '🥧'),
(18, 'Chocolate Ice Cream', 50, 'veg', 'A single scoop of rich, dark chocolate ice cream.', 'Cold,Sweet', '🍨'),
(19, 'Vanilla Ice Cream', 40, 'veg', 'A single scoop of classic creamy vanilla ice cream.', 'Cold,Sweet', '🍨'),
(20, 'Chai', 15, 'veg', 'A hot cup of classic Indian masala tea.', 'Hot,Classic', '☕'),
(21, 'Hot Coffee', 25, 'veg', 'A freshly brewed cup of hot coffee.', 'Hot,Classic', '☕'),
(22, 'Cold Coffee', 50, 'veg', 'A refreshing blended iced coffee.', 'Cold,Sweet', '🧋'),
(23, 'Sweet Lassi', 40, 'veg', 'A cool and refreshing sweet yogurt-based drink.', 'Cold,Yogurt', '🥛'),
(24, 'Lime Soda', 30, 'veg', 'A fizzy mix of lime juice and soda.', 'Cold,Fizzy', '🥤'),
(25, 'Orange Juice', 45, 'veg', 'A fresh glass of orange juice.', 'Cold,Healthy', '🍊'),
(26, 'Mango Juice', 45, 'veg', 'A sweet and pulpy mango juice.', 'Cold,Sweet', '🥭'),
(27, 'KitKat (4-Finger)', 25, 'veg', 'Have a break, have a KitKat.', 'Chocolate,Wafer', '🍫'),
(28, 'Galaxy Chocolate', 40, 'veg', 'Smooth and creamy milk chocolate.', 'Chocolate,Creamy', '🍫'),
(29, 'Hershey''s Kisses', 50, 'veg', 'A pouch of iconic milk chocolate drops.', 'Chocolate,Classic', ' H'),
(30, 'Snickers', 20, 'veg', 'Packed with peanuts, caramel and nougat.', 'Chocolate,Nuts', '🍫'),
(31, 'Bounty', 20, 'veg', 'Moist tender coconut covered in milk chocolate.', 'Chocolate,Coconut', '🥥'),
(32, 'Twix', 20, 'veg', 'A caramel and biscuit bar covered in chocolate.', 'Chocolate,Caramel', '🍫'),
(33, 'Lays Classic', 20, 'veg', 'Classic salted potato chips.', 'Chips,Salty', '🥔'),
(34, 'Kurkure Masala', 20, 'veg', 'Spicy, crunchy corn puffs.', 'Chips,Spicy', '🌶️'),
(35, 'Act II Popcorn', 25, 'veg', 'A packet of classic butter popcorn.', 'Popcorn,Salty', '🍿'),
(36, 'Cup Noodles', 40, 'veg', 'Instant noodles in a cup. Just add hot water.', 'Instant,Hot', '🍜'),
(37, 'Good Day Cookies', 10, 'veg', 'A small packet of cashew cookies.', 'Biscuit,Sweet', '🍪'),
(38, 'Saffola Oats', 20, 'veg', 'A single-serving pouch of masala oats.', 'Healthy,Hot', '🥣'),
(39, 'Nescafé Coffee Can', 40, 'veg', 'A can of ready-to-drink cold coffee.', 'Cold,Coffee', '🥫'),
(40, 'Nescafé Pouch', 2, 'veg', 'A single-serve instant coffee powder sachet.', 'Hot,Coffee', '☕');


commit;


