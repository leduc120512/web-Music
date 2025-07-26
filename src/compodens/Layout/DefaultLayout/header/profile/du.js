-- Tạo database
CREATE DATABASE  bookstore3;
USE bookstore3;
select * from categories;
select * from products where product_id = 40;
INSERT INTO users (name, address, email, phone, username, password, role) VALUES ('de', 'sdf', 'asdfdsaf', 'asdfadsf', 'asdfasdf', 'asdfadf', 'customer');
select * from  users;
select categories.category_id,categories.category_name from categories where categories.category_id;
update products set category_id = 2 where product_id = 15


UPDATE products 
SET 
    name = 'New Product Name', 
    description = 'New Description', 
    image = 'http://example.com/new-image.jpg', 
    price = 29.99, 
    stock = 150, 
    sold = 30, 
    category_id = 2 
WHERE 
    product_id = 101;
select * from products
DELETE FROM products WHERE product_id =80
SELECT * FROM orders WHERE user_id = 3;
-- Thay 1 bằng ID người dùng thực tế  -- Thay ? bằng ID người dùng cụ thể -- Thay ? bằng ID đơn hàng cụ thể -- Thay thế ? bằng ID đơn hàng cụ thể
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);ALTER TABLE users ADD COLUMN role VARCHAR(255) DEFAULT 'customer';
DELETE FROM products WHERE product_id = 70
	SELECT p.product_id, p.name, p.description, p.price, ci.quantity
	FROM products p
	JOIN cart_items ci ON p.product_id = ci.product_id
	JOIN carts c ON ci.cart_id = c.cart_id
	WHERE c.user_id = 3 AND c.order_id IS NULL;

SELECT 
    ci.product_id, 
    p.name AS product_name, 
    ci.quantity, 
    p.price, 
    cat.category_name 
FROM carts c 
LEFT JOIN cart_items ci ON c.cart_id = ci.cart_id 
LEFT JOIN products p ON ci.product_id = p.product_id 
LEFT JOIN categories cat ON p.category_id = cat.category_id 
WHERE c.user_id = 4;
SELECT o.order_id, o.date_order, o.total_price, o.status, o.shipping_address, 
       oi.product_id, p.name AS product_name, oi.quantity, oi.price 
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.user_id = 3;
SELECT * 
FROM orders 
WHERE user_id = 3;

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
INSERT INTO products (name, description, image, price, stock, sold, category_id) VALUES ('The Theory of Everything', 'A book by Stephen Hawking', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 ', 987352, 234, 2532, 3);
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') NOT NULL
);




-- Bảng shipping_methods (Phương thức giao hàng)
CREATE TABLE shipping_methods (
    shipping_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
SELECT o.order_id, o.date_order, o.total_price, o.status, o.shipping_address, oi.product_id, oi.quantity, oi.price
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.user_id = 1;


CREATE TABLE carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id_user VARCHAR(255),
    transaction_id_merchant VARCHAR(255),
    order_id INT,
    user_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    product_id INT,
    cart_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id)
);
SELECT 
    o.order_id, 
    o.date_order, 
    o.total_price, 
    o.status, 
    o.shipping_address, 
    oi.product_id, 
    p.name AS product_name, 
    oi.quantity, 
    oi.price 
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.user_id = 1;

-- Bảng orders (Đơn hàng)
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    date_order DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'shipped', 'completed', 'canceled') NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_id INT,
    user_id INT,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Bảng payments (Thanh toán)
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    date_payment DATE NOT NULL,
    method VARCHAR(50) NOT NULL,
    cart_id INT,
    user_id INT,
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

select * from  users;
select * from orders where orders.user_id= 12

-- --duc-- 
SELECT 
    ci.product_id, 
    p.name AS product_name, 
    ci.quantity, 
    p.price, 
    cat.category_name, 
    p.image 
FROM 
    carts c 
LEFT JOIN 
    cart_items ci ON c.cart_id = ci.cart_id 
LEFT JOIN 
    products p ON ci.product_id = p.product_id 
LEFT JOIN 
    categories cat ON p.category_id = cat.category_id 
WHERE 
    c.user_id = 1;  -- Thay ? bằng user_id thực tế
SELECT 
    ci.product_id, 
    ci.quantity, 
    p.price 
FROM 
    cart_items ci 
JOIN 
    products p ON ci.product_id = p.product_id 
WHERE 
    ci.cart_id = (SELECT cart_id FROM carts WHERE user_id = 1 AND order_id IS NULL);
    SELECT 
    ci.product_id, 
    p.name AS product_name, 
    ci.quantity, 
    p.price, 
    cat.category_name, 
    p.image 
FROM 
    carts c 
LEFT JOIN 
    cart_items ci ON c.cart_id = ci.cart_id 
LEFT JOIN 
    products p ON ci.product_id = p.product_id 
LEFT JOIN 
    categories cat ON p.category_id = cat.category_id 
WHERE 
    c.user_id = 1;  -- Thay ? bằng user_id thực tế
   UPDATE products
SET price = 20.99
WHERE product_id = null;
select * from products;
SELECT * FROM carts WHERE user_id = 1; -- Thay ? bằng user_id thực tế
SELECT 
    ci.product_id, 
    p.name AS product_name, 
    ci.quantity, 
    p.price, 
    cat.category_name, 
    p.image 
FROM 
    carts c 
LEFT JOIN 
    cart_items ci ON c.cart_id = ci.cart_id 
LEFT JOIN 
    products p ON ci.product_id = p.product_id 
LEFT JOIN 
    categories cat ON p.category_id = cat.category_id 
WHERE 
    c.user_id = 1; 
    SELECT 
    ci.product_id, 
    p.name AS product_name, 
    ci.quantity, 
    p.price, 
    cat.category_name, 
    p.image 
FROM 
    carts c 
LEFT JOIN 
    cart_items ci ON c.cart_id = ci.cart_id 
LEFT JOIN 
    products p ON ci.product_id = p.product_id 
LEFT JOIN 
    categories cat ON p.category_id = cat.category_id 
WHERE 
    c.user_id = 1
    AND ci.product_id IS NOT NULL;

    -- Thay ? bằng user_id thực tế
    select * from carts;
    select * from products;
    
    SELECT o.order_id, o.date_order, o.total_price, o.status, o.shipping_address, 
       oi.quantity, oi.price, p.product_id,p.image, p.name AS product_name
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.user_id = 12 and o.status= 'pending';
SELECT 
    o.order_id, 
    o.date_order, 
    o.total_price, 
    o.status, 
    o.shipping_address, 
    oi.quantity, 
    oi.price, 
    p.product_id, 
    p.image, 
    p.name AS product_name, 
    categories.category_name 
FROM 
    orders o 
JOIN 
    order_items oi ON o.order_id = oi.order_id 
JOIN 
    products p ON oi.product_id = p.product_id 
JOIN 
    categories ON p.category_id = categories.category_id 
WHERE 
    o.user_id = 1 
    AND o.status = 'pending';


 select * from users
select * from orders where orders.user_id=9

SELECT  products.product_id, categories.category_name
FROM products
join categories on products.category_id = categories.category_id
where products.product_id = 15
select * from products
select * from  categories
UPDATE orders
SET o.status= 'shipped'
WHERE orders.user_id= 
  (  SELECT o.user_id
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.user_id = 12 and o.status= 'shipped');






INSERT INTO order_items (order_id, product_id, quantity, price, image, name) 
VALUES (10, 17, 2, 19.99, 'image_url_1', 'Product A');
select * from order_items
ALTER TABLE order_items MODIFY name VARCHAR(255) DEFAULT 'Unknown Product';
ALTER TABLE order_items
ADD image varchar(255);
ALTER TABLE order_items
ADD     name VARCHAR(255) NOT NULL
SELECT order_id, date_order, total_price, status, shipping_address
FROM orders
WHERE user_id = 12;
select * from  users;

   SELECT o.order_id, o.date_order, o.total_price, o.status, o.shipping_address, 
       oi.quantity, oi.price, p.product_id,p.image, p.name AS product_name,categories.category_name
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
join categories on p.category_id = categories.category_id
WHERE o.user_id = 12 and o.status= 'shipped';


SELECT 
    o.order_id, 
    o.date_order, 
    o.total_price, 
    o.status, 
    o.shipping_address, 
    oi.quantity, 
    oi.price, 
    p.product_id, 
    p.image, 
    p.name AS product_name, 
    categories.category_name 
FROM 
    orders o 
JOIN 
    order_items oi ON o.order_id = oi.order_id 
JOIN 
    products p ON oi.product_id = p.product_id 
JOIN 
    categories ON p.category_id = categories.category_id 
WHERE 
    o.user_id = 12 AND o.status = 'pending';
    select * from users;
  
    SELECT o.order_id, o.date_order, o.total_price, o.status, o.shipping_address, 
       oi.quantity, oi.price, p.product_id, p.image, p.name AS product_name, 
       c.category_name 
FROM orders o 
JOIN order_items oi ON o.order_id = oi.order_id 
JOIN products p ON oi.product_id = p.product_id 
JOIN categories c ON p.category_id = c.category_id 
WHERE o.user_id = 12 AND o.status = 'pending';

SELECT o.order_id, o.date_order, o.total_price, o.status, o.shipping_address, 
       oi.quantity, oi.price, p.product_id, p.image, p.name AS product_name, 
       categories.category_name
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN categories ON p.category_id = categories.category_id
WHERE o.user_id = 9 AND o.status = 'pending';
select * from users;
select * from orders where orders.user_id=9 and order_id=123

SELECT 
    o.order_id, 
    o.date_order, 
    o.total_price, 
    o.status, 
    o.shipping_address, 
    oi.quantity, 
    oi.price, 
    p.product_id, 
    p.image, 
    p.name AS product_name, 
    categories.category_name 
FROM 
    orders o 
JOIN 
    order_items oi ON o.order_id = oi.order_id 
JOIN 
    products p ON oi.product_id = p.product_id 
JOIN 
    categories ON p.category_id = categories.category_id 
WHERE 
    o.user_id = ? AND o.status = 'shipped';
    
    
    SELECT o.order_id, o.date_order, o.total_price, o.status, o.shipping_address, 
       oi.quantity, oi.price, p.product_id, p.image, p.name AS product_name, 
       c.category_name
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
WHERE o.user_id = 1 and o.order_id=14;


DELETE ci 
FROM cart_items ci 
JOIN carts c ON ci.cart_id = c.cart_id 
WHERE ci.cart_item_id =2  
AND c.user_id = 1;
select * from cart_items  ;
select * from carts where 
;
AND o.status IN ('pending', 'shipped', 'completed', 'canceled');
select * from orders ;
select * from users;
update orders set status = 'shipped' where orders.user_id=12 and orders.order_id=103;