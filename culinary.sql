-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 06:43 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `culinary`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Śniadanie'),
(2, 'Obiad'),
(3, 'Kolacja');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `unitId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`, `amount`, `unitId`, `recipeId`) VALUES
(2, 'Masło', 20, 2, 1),
(3, 'Kurczak', 200, 2, 2),
(4, 'Ryż', 100, 2, 2),
(7, 'Jabłka', 1, 3, 3),
(8, 'Banany', 1, 3, 3),
(9, 'Jajka', 3, 3, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `opinion`
--

CREATE TABLE `opinion` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `recipeId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `opinion`
--

INSERT INTO `opinion` (`id`, `content`, `recipeId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Świetny przepis, polecam!', 1, 2, '2024-12-10 18:19:51', '2024-12-10 18:19:59'),
(2, 'Wyszło idealnie, dziękuję!', 2, 3, '2024-12-11 18:20:05', '2024-12-11 18:20:09'),
(3, 'Zdrowo i smacznie!', 3, 1, '2024-12-15 18:20:25', '2024-12-15 18:20:28');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `difficulty` int(11) NOT NULL,
  `prepareTime` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `name`, `description`, `imagePath`, `difficulty`, `prepareTime`, `userId`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'Jajecznica', 'Przepis na pyszną jajecznicę.', 'uploads\\1734369961597-jajecznica-z-boczkiem-5.jpg', 1, 10, 1, 1, '2024-12-16 18:18:38', '2024-12-16 18:35:24'),
(2, 'Kurczak z ryżem', 'Kurczak w sosie z ryżem.', 'uploads\\1734370067729-Pieczona-piers-z-kurczaka-z-ryzem-i-brokulem-5.jpg', 2, 45, 2, 2, '2024-12-16 18:18:50', '2024-12-16 18:27:47'),
(3, 'Sałatka owocowa', 'Zdrowa sałatka z owoców.', 'uploads\\1734369767834-orginal_picture_601.jpg', 1, 15, 3, 3, '2024-12-16 18:18:52', '2024-12-16 18:34:47');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `step`
--

CREATE TABLE `step` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `recipeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `step`
--

INSERT INTO `step` (`id`, `content`, `recipeId`) VALUES
(1, 'Rozgrzej patelnię.', 1),
(2, 'Wbij jajka na patelnię.', 1),
(3, 'Podsmaż kurczaka na patelni.', 2),
(4, 'Dodaj ryż do kurczaka.', 2),
(5, 'Pokrój owoce na kawałki.', 3),
(6, 'Wymieszaj owoce w misce.', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id`, `name`) VALUES
(1, 'łyżki'),
(2, 'gramów'),
(3, 'sztuki');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(1, 'JanKowalski', 'jan@example.com', '$2b$10$O9JpXLTO/NuSxAQHoEzt2O7CmEl631SqlBkC5Xiwqy2Ksl.cyo7zK'),
(2, 'AnnaNowak', 'anna@example.com', '$2b$10$pb05NqoDuLm1cQ1Vvc4/kev5y2L9tXAPDVPW1bgwDKwSR1J1FKtIq'),
(3, 'PiotrZielinski', 'piotr@example.com', '$2b$10$57k77pXixVFlpdXFwCcSrOY/MU0eFafQM1LndLzYMUCbI/Q7F5eiG');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unitId` (`unitId`),
  ADD KEY `recipeId` (`recipeId`);

--
-- Indeksy dla tabeli `opinion`
--
ALTER TABLE `opinion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipeId` (`recipeId`),
  ADD KEY `userId` (`userId`);

--
-- Indeksy dla tabeli `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indeksy dla tabeli `step`
--
ALTER TABLE `step`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipeId` (`recipeId`);

--
-- Indeksy dla tabeli `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `opinion`
--
ALTER TABLE `opinion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `step`
--
ALTER TABLE `step`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD CONSTRAINT `ingredient_ibfk_3` FOREIGN KEY (`unitId`) REFERENCES `unit` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `ingredient_ibfk_4` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `opinion_ibfk_3` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `opinion_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `recipe_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `recipe_ibfk_4` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `step`
--
ALTER TABLE `step`
  ADD CONSTRAINT `step_ibfk_1` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
