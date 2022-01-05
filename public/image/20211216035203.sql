-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Jul 2021 pada 12.37
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `city`
--

CREATE TABLE `city` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `houses_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `houses`
--

CREATE TABLE `houses` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `typeRent` varchar(255) DEFAULT NULL,
  `amenities` varchar(255) DEFAULT NULL,
  `bedroom` int(11) DEFAULT NULL,
  `bathroom` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `listas`
--

CREATE TABLE `listas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `listas`
--

INSERT INTO `listas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2021-07-29 07:31:18', '2021-07-29 07:31:18'),
(2, 'user', '2021-07-29 07:31:18', '2021-07-29 07:31:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `stock`, `photo`, `createdAt`, `updatedAt`) VALUES
(2, 'robust', 10000, 'enak', 100, '1627537389803-kopi.jpg', '2021-07-29 05:43:09', '2021-07-29 05:43:09'),
(3, 'robust', 10000, 'enak', 100, '1627537405444-kopi.jpg', '2021-07-29 05:43:25', '2021-07-29 05:43:25'),
(11, 'kopi baru', 1231231, 'kopi baru enak', 123123, '1627543461870-kopi.jpg', '2021-07-29 07:24:21', '2021-07-29 07:24:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210701022522-create-user.js'),
('20210703124026-create-city.js'),
('20210703153238-create-house.js'),
('20210705140945-create-list-as.js'),
('20210706062804-create-transaction.js'),
('20210728200113-create-product.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `orderQuantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `product_id`, `name`, `email`, `phone`, `address`, `status`, `attachment`, `orderQuantity`, `createdAt`, `updatedAt`) VALUES
(12, 2, 'undefined', 'Mohamad alfian', 'alfian2@gmail.com', NULL, 'By pass Tulungagung kecamatan kertasemaya rt 21 rw 05 no 98', 'Cancel', '1627542679361-WhatsAppImage2021-06-03at10.29.23.jpeg', 1, '2021-07-29 07:11:19', '2021-07-29 10:31:57'),
(13, 2, 'undefined', 'Mohamad alfian', 'alfian1@gmail.com', NULL, 'By pass Tulungagung kecamatan kertasemaya rt 21 rw 05 no 98', 'On The Way', '1627543984367-WhatsAppImage2021-06-03at10.29.23.jpeg', 2, '2021-07-29 07:33:04', '2021-07-29 10:29:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `listasid` int(11) NOT NULL,
  `phone` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `image`, `listasid`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 'alfianuser1', 'alfianuser6@gmail.com', '$2b$10$kWOLXDsnS4G.xThOlH0WieSkQwz7OZExjkmbC8QkiStSlTG2mAwRS', NULL, 2, 0, '2021-07-28 20:35:04', '2021-07-28 20:35:04'),
(2, 'alfianuser1', 'alfianuser1@gmail.com', '$2b$10$Gr6sZ5YSDC8xBCQh5A/C0OQys0duBirgoiMG4ZsfuFFnZ9Arht.a.', NULL, 2, 0, '2021-07-28 20:35:28', '2021-07-28 20:35:28'),
(3, 'Mohamad alfian', 'alfianadmin@gmail.com', '$2b$10$9HEdwln9hM0.YvPD.UYIeOYXvJixkkax2EDPkdixVhQ40UKwMyKJK', NULL, 1, 0, '2021-07-28 22:40:09', '2021-07-28 22:40:09'),
(4, 'Mohamad alfian', 'alfianadmin2@gmail.com', '$2b$10$Rzw1jd4dX4m4iER/.7BPK.rc340A70njMJYGaZeI4nawBfsCMvtX2', NULL, 1, 0, '2021-07-28 22:43:27', '2021-07-28 22:43:27');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `listas`
--
ALTER TABLE `listas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
