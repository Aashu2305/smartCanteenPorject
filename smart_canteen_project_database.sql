-- Step 1: create the database 

CREATE DATABASE smart_canteen_db;
USE smart_canteen_db;

-- Step 2: Create the 'users' table
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_username` (`username`),
  UNIQUE KEY `UK_email` (`email`)
);

-- Step 3: Create the 'products' table with all features
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `stock_quantity` int NOT NULL DEFAULT 0,
  `description` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `emoji` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `price_small` double DEFAULT 0,
  `stock_small` int DEFAULT 0,
  `price_medium` double DEFAULT 0,
  `stock_medium` int DEFAULT 0,
  `price_large` double DEFAULT 0,
  `stock_large` int DEFAULT 0,
  PRIMARY KEY (`id`)
);



-- Step 4: Create the 'orders' table with the user link
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_items` text,
  `total_price` double NOT NULL,
  `order_timestamp` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);


INSERT INTO products (id, name, price, type, description, tags, emoji, image_url, stock_quantity, price_small, stock_small, price_medium, stock_medium, price_large, stock_large) VALUES
(1, 'Samosa', 15, 'veg', 'Classic crispy pastry with a spiced potato filling.', 'Fried,Classic', '🥟', '/images/Samosa.jpg', 20, 0, 0, 0, 0, 0, 0),
(2, 'Idli (2 Pcs)', 30, 'veg', 'Soft, steamed rice cakes served with chutney.', 'Steamed,Healthy', '🍚', '/images/idli.jpg', 20, 0, 0, 0, 0, 0, 0),
(3, 'Veg Patties', 25, 'veg', 'Flaky puff pastry with a savory vegetable mix.', 'Baked,Snack', '🥧', '/images/veg_pattie.jpg', 20, 0, 0, 0, 0, 0, 0),
(4, 'Chicken Patties', 35, 'non-veg', 'Flaky puff pastry with a spiced chicken filling.', 'Baked,Snack', '🥧', '/images/veg_pattie.jpg', 20, 0, 0, 0, 0, 0, 0),
(5, 'Veg Roll', 40, 'veg', 'Fresh veggies and sauces wrapped in a soft flatbread.', 'Fresh,Healthy', '🌯', '/images/veg_roll.jpg', 20, 0, 0, 0, 0, 0, 0),
(6, 'Chicken Roll', 60, 'non-veg', 'Tender chicken pieces and sauces in a flatbread wrap.', 'Grilled,Filling', '🌯', '/images/chicken_roll.jpg', 20, 0, 0, 0, 0, 0, 0),
(7, 'Veg Sandwich', 35, 'veg', 'A simple classic with cucumber, tomato, and lettuce.', 'Cold,Fresh', '🥪', '/images/veg_sandwich.png', 20, 0, 0, 0, 0, 0, 0),
(8, 'Chicken Sandwich', 55, 'non-veg', 'Creamy shredded chicken in toasted bread.', 'Classic,Creamy', '🥪', '/images/chicken_sandwich.jpg', 20, 0, 0, 0, 0, 0, 0),
(9, 'Hot Dog', 50, 'non-veg', 'A grilled sausage in a sliced bun with mustard.', 'Grilled,Classic', '🌭', '/images/veg_roll.jpg', 20, 0, 0, 0, 0, 0, 0),
(10, 'Margherita Pizza', 0, 'veg', 'A classic cheese and tomato pizza for one.', 'Cheesy,Classic', '🍕', '/images/veg_pizza.jpg', 0, 99.00, 15, 149.00, 20, 199.00, 10),
(11, 'Chicken Pizza', 0, 'non-veg', 'Personal pizza topped with chicken and cheese.', 'Cheesy,Meat', '🍕', '/images/non_veg_pizza.jpg', 0, 129.00, 15, 179.00, 20, 229.00, 10),
(12, 'Pineapple Pastry', 40, 'veg', 'A light and fluffy slice of tropical heaven.', 'Sweet,Creamy', '🍰', '/images/pineapple_pastery.jpg', 20, 0, 0, 0, 0, 0, 0),
(13, 'Chocolate Muffin', 45, 'veg', 'A rich, moist muffin packed with chocolate chips.', 'Sweet,Chocolate', '🧁', '/images/chocolate_muffin.jpg', 20, 0, 0, 0, 0, 0, 0),
(14, 'Vanilla Muffin', 40, 'veg', 'A classic soft muffin with a delicate vanilla flavor.', 'Sweet,Classic', '🧁', '/images/vanilla_muffin.jpg', 20, 0, 0, 0, 0, 0, 0),
(15, 'Marble Cake Slice', 35, 'veg', 'A beautiful blend of vanilla and chocolate cake.', 'Sweet,Cake', '🍰', '/images/marble_cake_slice.jpg', 20, 0, 0, 0, 0, 0, 0),
(16, 'Cheesecake Slice', 80, 'veg', 'A creamy, decadent slice of New York style cheesecake.', 'Premium,Dessert', '🧀', '/images/cheesecake.jpg', 20, 0, 0, 0, 0, 0, 0),
(17, 'Apple Pie Slice', 70, 'veg', 'Warm, spiced apples in a flaky pastry crust.', 'Classic,Dessert', '🥧', '/images/apple_pie.jpg', 20, 0, 0, 0, 0, 0, 0),
(18, 'Chocolate Ice Cream', 50, 'veg', 'A single scoop of rich, dark chocolate ice cream.', 'Cold,Sweet', '🍨', '/images/chocolate_icecream.jpg', 20, 0, 0, 0, 0, 0, 0),
(19, 'Vanilla Ice Cream', 40, 'veg', 'A single scoop of classic creamy vanilla ice cream.', 'Cold,Sweet', '🍨', '/images/vanilla_icecream.jpg', 20, 0, 0, 0, 0, 0, 0),
(20, 'Chai', 15, 'veg', 'A hot cup of classic Indian masala tea.', 'Hot,Classic', '☕', '/images/chai.jpg', 20, 0, 0, 0, 0, 0, 0),
(21, 'Hot Coffee', 25, 'veg', 'A freshly brewed cup of hot coffee.', 'Hot,Classic', '☕', '/images/hot_coffee.jpg', 20, 0, 0, 0, 0, 0, 0),
(22, 'Cold Coffee', 50, 'veg', 'A refreshing blended iced coffee.', 'Cold,Sweet', '🧋', '/images/cold_coffee.jpg', 20, 0, 0, 0, 0, 0, 0),
(23, 'Sweet Lassi', 40, 'veg', 'A cool and refreshing sweet yogurt-based drink.', 'Cold,Yogurt', '🥛', '/images/lassi.jpg', 20, 0, 0, 0, 0, 0, 0),
(24, 'Lime Soda', 30, 'veg', 'A fizzy mix of lime juice and soda.', 'Cold,Fizzy', '🥤', '/images/lime_soda.jpg', 20, 0, 0, 0, 0, 0, 0),
(25, 'Orange Juice', 45, 'veg', 'A fresh glass of orange juice.', 'Cold,Healthy', '🍊', '/images/orange_juice.jpg', 20, 0, 0, 0, 0, 0, 0),
(26, 'Mango Juice', 45, 'veg', 'A sweet and pulpy mango juice.', 'Cold,Sweet', '🥭', '/images/mango_juice.jpg', 20, 0, 0, 0, 0, 0, 0),
(27, 'KitKat (4-Finger)', 25, 'veg', 'Have a break, have a KitKat.', 'Chocolate,Wafer', '🍫', '/images/kitkat.jpg', 20, 0, 0, 0, 0, 0, 0),
(28, 'Galaxy Chocolate', 40, 'veg', 'Smooth and creamy milk chocolate.', 'Chocolate,Creamy', '🍫', '/images/galaxy_chocolate.jpg', 20, 0, 0, 0, 0, 0, 0),
(29, 'Hershey''s Kisses', 50, 'veg', 'A pouch of iconic milk chocolate drops.', 'Chocolate,Classic', ' H', '/images/hersheys_kisses.jpg', 20, 0, 0, 0, 0, 0, 0),
(30, 'Snickers', 20, 'veg', 'Packed with peanuts, caramel and nougat.', 'Chocolate,Nuts', '🍫', '/images/snickers.jpg', 20, 0, 0, 0, 0, 0, 0),
(31, 'Bounty', 20, 'veg', 'Moist tender coconut covered in milk chocolate.', 'Chocolate,Coconut', '🥥', '/images/bounty.jpg', 20, 0, 0, 0, 0, 0, 0),
(32, 'Twix', 20, 'veg', 'A caramel and biscuit bar covered in chocolate.', 'Chocolate,Caramel', '🍫', '/images/twix.jpg', 20, 0, 0, 0, 0, 0, 0),
(33, 'Lays Classic', 20, 'veg', 'Classic salted potato chips.', 'Chips,Salty', '🥔', '/images/lays_classic.jpg', 20, 0, 0, 0, 0, 0, 0),
(34, 'Kurkure Masala', 20, 'veg', 'Spicy, crunchy corn puffs.', 'Chips,Spicy', '🌶️', '/images/kurkure_masala.jpg', 20, 0, 0, 0, 0, 0, 0),
(35, 'Act II Popcorn', 25, 'veg', 'A packet of classic butter popcorn.', 'Popcorn,Salty', '🍿', '/images/popcorn.jpg', 20, 0, 0, 0, 0, 0, 0),
(36, 'Cup Noodles', 40, 'veg', 'Instant noodles in a cup. Just add hot water.', 'Instant,Hot', '🍜', '/images/cup_noodles.jpg', 20, 0, 0, 0, 0, 0, 0),
(37, 'Good Day Cookies', 10, 'veg', 'A small packet of cashew cookies.', 'Biscuit,Sweet', '🍪', '/images/good_day_cookies.jpg', 20, 0, 0, 0, 0, 0, 0),
(38, 'Saffola Oats', 20, 'veg', 'A single-serving pouch of masala oats.', 'Healthy,Hot', '🥣', '/images/saffola_oats.jpg', 20, 0, 0, 0, 0, 0, 0),
(39, 'Nescafé Coffee Can', 40, 'veg', 'A can of ready-to-drink cold coffee.', 'Cold,Coffee', '🥫', '/images/nescafe_coffee_can.jpg', 20, 0, 0, 0, 0, 0, 0),
(40, 'Nescafé Pouch', 2, 'veg', 'A single-serve instant coffee powder sachet.', 'Hot,Coffee', '☕', '/images/nescafe_pouch.jpg', 20, 0, 0, 0, 0, 0, 0),
(41, 'Masala Dosa', 50, 'veg', 'Crispy rice crepe with a savory potato filling.', 'South Indian,Classic', ' dosa', '/images/masala_dosa.jpg', 20, 0, 0, 0, 0, 0, 0),
(42, 'Vada (2 Pcs)', 25, 'veg', 'Fried lentil doughnuts, crispy outside, soft inside.', 'South Indian,Fried', ' vada', '/images/vada.jpg', 20, 0, 0, 0, 0, 0, 0),
(43, 'Uttapam', 45, 'veg', 'Thick rice pancake with onion and tomato toppings.', 'South Indian,Healthy', ' pancake', '/images/uttapam.jpg', 20, 0, 0, 0, 0, 0, 0),
(44, 'Curd Rice', 40, 'veg', 'Comforting dish of yogurt mixed with cooked rice.', 'South Indian,Healthy', '🍚', '/images/curd_rice.jpg', 20, 0, 0, 0, 0, 0, 0),
(45, 'Lemon Rice', 40, 'veg', 'Tangy and flavorful rice tempered with spices.', 'South Indian,Classic', '🍋', '/images/lemon_rice.jpg', 20, 0, 0, 0, 0, 0, 0),
(46, 'Veg Noodles', 50, 'veg', 'Stir-fried noodles with mixed vegetables.', 'Chinese,Noodles', '🍜', '/images/veg_noodles.jpg', 20, 0, 0, 0, 0, 0, 0),
(47, 'Egg Noodles', 60, 'non-veg', 'Stir-fried noodles with egg and vegetables.', 'Chinese,Noodles', '🍜', '/images/egg_noodles.jpg', 20, 0, 0, 0, 0, 0, 0),
(48, 'Veg Fried Rice', 50, 'veg', 'Classic fried rice with assorted veggies.', 'Chinese,Rice', '🍚', '/images/veg_fried_rice.jpg', 20, 0, 0, 0, 0, 0, 0),
(49, 'Chicken Fried Rice', 70, 'non-veg', 'Fried rice with chicken chunks and veggies.', 'Chinese,Rice', '🍚', '/images/chicken_fried_rice.jpg', 20, 0, 0, 0, 0, 0, 0),
(50, 'Chilli Paneer', 70, 'veg', 'Spicy and tangy paneer stir-fried with peppers.', 'Chinese,Spicy', '🌶️', '/images/chilli_paneer.jpg', 20, 0, 0, 0, 0, 0, 0),
(51, 'Chilli Chicken', 80, 'non-veg', 'Spicy chicken stir-fried with peppers and onions.', 'Chinese,Spicy', '🌶️', '/images/chilli_chicken.jpg', 20, 0, 0, 0, 0, 0, 0),
(52, 'Maggi', 30, 'veg', 'The classic instant noodles, a student favorite.', 'Instant,Noodles', '🍜', '/images/maggi.jpg', 20, 0, 0, 0, 0, 0, 0),
(53, 'Veg Momos (6 Pcs)', 40, 'veg', 'Steamed dumplings with a vegetable filling.', 'Steamed,Snack', '🥟', '/images/veg_momos.jpg', 20, 0, 0, 0, 0, 0, 0),
(54, 'Chicken Momos (6 Pcs)', 50, 'non-veg', 'Steamed dumplings with a minced chicken filling.', 'Steamed,Snack', '🥟', '/images/chicken_momo.jpg', 20, 0, 0, 0, 0, 0, 0);





select * from orders;













