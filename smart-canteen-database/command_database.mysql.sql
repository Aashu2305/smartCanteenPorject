
# DATABASE NAME IS smart_canteen_db

# IN TOTAL THREE TABLES ARE THERE : order ,products , users



#to see the users : 

SELECT username, password FROM users;


#to delete particular user :

DELETE FROM users WHERE username = 'anshu';
COMMIT;


#see the order given by all the users :

SELECT * FROM orders;


#see all the products
SELECT * FROM products;


show tables;


