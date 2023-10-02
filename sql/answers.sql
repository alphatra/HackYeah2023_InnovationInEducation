-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: hackyeah_db
-- Generation Time: Paź 01, 2023 at 02:54 AM
-- Wersja serwera: 8.1.0
-- Wersja PHP: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackyeah_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kopia_answers`
--

CREATE TABLE `answers` (
  `answer_id` int NOT NULL DEFAULT '0',
  `answer` varchar(255) DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `technical` int DEFAULT NULL,
  `medical` int DEFAULT NULL,
  `lingual` int DEFAULT NULL,
  `art` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kopia_answers`
--

INSERT INTO `answers` (`answer_id`, `answer`, `question_id`, `technical`, `medical`, `lingual`, `art`) VALUES
(1, 'Przyroda i matematyka', 1, 1, 1, 0, 0),
(2, 'Języki i literatura', 1, 0, 0, 1, 0),
(3, 'Sztuka i kultura', 1, 0, 0, 0, 1),
(4, 'Społeczne i psychologia', 1, 0, 1, 1, 0),

(5, 'Praca z danymi i analizy', 2, 1, 1, 0, 0),
(6, 'Praca z ludźmi i doradztwo', 2, 0, 1, 1, 0),
(7, 'Praca twórcza i artystyczna', 2, 1, 0, 0, 1),
(8, 'Praca z technologią i innowacjami', 2, 1, 1, 0, 0),
(9, 'Żadna z powyższych', 2, 0, 0, 0, 0),

(10, 'Analiza i rozwiązywanie problemów', 3, 1, 1, 0, 0),
(11, 'Empatia i komunikacja', 3, 0, 1, 1, 0),
(12, 'Kreatywność i innowacyjność', 3, 1, 1, 0, 1),
(13, 'Zrozumienie technologii', 3, 1, 1, 0, 0),

(14, 'Samodzielnie', 4, 0, 0, 1, 1),
(15, 'W zespole', 4, 1, 1, 0, 0),
(16, 'Bez różnicy', 4, 1, 1, 1, 1),

(17, '1', 5, 1, 1, 0, 0),
(18, '2', 5, 1, 0, 0, 0),
(19, '3', 5, 1, 0, 1, 0),
(20, '4', 5, 0, 0, 1, 1),
(21, '5', 5, 0, 0, 0, 1),

(22, 'Tak', 6, 0, 0, 1, 1),
(23, 'Nie', 6, 1, 1, 0, 0),
(24, 'Nie jestem pewien', 6, 1, 0, 1, 0),

(25, 'Tak', 7, 1, 0, 0, 1),
(26, 'Nie', 7, 0, 1, 1, 0),
(27, 'Nie jestem pewien', 7, 1, 0, 1, 0),

(28, 'Tak', 8, 1, 1, 0, 0),
(29, 'Nie', 8, 0, 0, 1, 1),
(30, 'Nie jestem pewien', 8, 0, 1, 1, 0),

(31, 'Tak', 9, 0, 1, 1, 0),
(32, 'Nie', 9, 1, 0, 0, 1),
(33, 'Nie jestem pewien', 9, 0, 0, 1, 1),

(34, 'Tak', 10, 1, 1, 0, 0),
(35, 'Nie', 10, 0, 0, 1, 1),
(36, 'Nie jestem pewien', 10, 1, 0, 1, 0),

(37, 'Poniżej 2 godzin', 11, 0, 0, 0, 1),
(38, '2 do 4 godzin', 11, 0, 0, 1, 0),
(39, '4 do 6 godzin', 11, 0, 1, 0, 0),
(40, 'Więcej niż 6 godzin', 11, 1, 0, 0, 0),

(41, 'Tak', 12, 0, 1, 1, 1),
(42, 'Nie', 12, 1, 0, 0, 0),
(43, 'Trochę', 12, 0, 0, 1, 1),
(44, 'Nie jestem pewien', 12, 0, 0, 0, 0),

(45, 'Tak', 13, 1, 1, 0, 1),
(46, 'Nie', 13, 1, 1, 1, 0),
(47, 'Trochę', 13, 1, 0, 0, 0),
(48, 'Nie jestem pewien', 13, 0, 0, 0, 0),

(49, 'Tak', 14, 1, 1, 1, 0),
(50, 'Nie', 14, 0, 0, 0, 1),
(51, 'Trochę', 14, 1, 0, 0, 1),
(52, 'Nie jestem pewien', 14, 0, 0, 0, 0),

(53, 'Tak', 15, 1, 1, 0, 0),
(54, 'Nie', 15, 0, 0, 1, 1),
(55, 'Może', 15, 0, 1, 1, 0),

(56, 'Tak', 16, 1, 0, 0, 1),
(57, 'Nie', 16, 0, 1, 1, 0),
(58, 'Trochę', 16, 1, 0, 1, 0),
(59, 'Nie jestem pewien', 16, 0, 0, 0, 0);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
