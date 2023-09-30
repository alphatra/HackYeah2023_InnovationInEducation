-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: hackyeah_db
-- Generation Time: Wrz 30, 2023 at 05:23 AM
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
-- Struktura tabeli dla tabeli `answers`
--

CREATE TABLE `answers` (
  `answer_id` int NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `technical` int DEFAULT NULL,
  `medical` int DEFAULT NULL,
  `lingual` int DEFAULT NULL,
  `art` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`answer_id`, `answer`, `question_id`, `technical`, `medical`, `lingual`, `art`) VALUES
(1, 'Przyroda i matematyka', 1, 1, 1, 0, 0),
(2, 'Języki i literatura', 1, 0, 0, 2, 0),
(3, 'Sztuka i kultura', 1, 0, 0, 1, 1),
(4, 'Społeczne i psychologia', 1, 0, 1, 1, 0),
(5, 'Praca z danymi i analizy', 2, 1, 1, 0, 0),
(6, 'Praca z ludźmi i doradztwo', 2, 0, 1, 1, 0),
(7, 'Praca twórcza i artystyczna', 2, 1, 0, 0, 1),
(8, 'Praca z technologią i innowacjami', 2, 1, 1, 0, 0),
(9, 'Analiza i rozwiązywanie problemów', 3, 1, 1, 0, 0),
(10, 'Empatia i komunikacja', 3, 0, 1, 1, 0),
(11, 'Kreatywność i innowacyjność', 3, 1, 1, 0, 1),
(12, 'Zrozumienie technologii', 3, 1, 1, 0, 0),
(13, 'Samodzielnie', 4, 1, 0, 0, 1),
(14, 'W zespole', 4, 0, 1, 1, 0),
(15, 'Bez różnicy', 4, 1, 0, 1, 0),
(16, 'Tak', 5, 1, 1, 0, 0),
(17, 'Nie', 5, 0, 0, 1, 1),
(18, 'To zależy', 5, 1, 0, 1, 0),
(19, 'Tak', 6, 1, 1, 1, 0),
(20, 'Nie', 6, 0, 0, 0, 1),
(21, 'Nie jestem pewien', 6, 0, 0, 1, 1),
(22, 'Tak', 7, 1, 1, 0, 1),
(23, 'Nie', 7, 0, 1, 1, 0),
(24, 'Trochę', 7, 1, 1, 1, 1),
(25, 'Tak', 8, 1, 1, 0, 0),
(26, 'Nie', 8, 0, 0, 1, 1),
(27, 'Trochę', 8, 0, 1, 0, 0),
(28, 'Nie jestem pewien', 8, 0, 0, 1, 1),
(29, 'Tak', 9, 0, 1, 1, 1),
(30, 'Nie', 9, 1, 1, 0, 0),
(31, 'Trochę', 9, 0, 1, 1, 0),
(32, 'Nie jestem pewien', 9, 1, 1, 1, 0),
(33, 'Tak', 10, 1, 1, 0, 0),
(34, 'Nie', 10, 0, 0, 1, 1),
(35, 'Trochę', 10, 0, 1, 0, 0),
(36, 'Nie jestem pewien', 10, 0, 1, 1, 1),
(37, 'Tak', 11, 1, 0, 0, 0),
(38, 'Nie', 11, 0, 0, 1, 1),
(39, 'Trochę', 11, 1, 1, 0, 0),
(40, 'Nie jestem pewien', 11, 0, 1, 1, 1),
(41, 'Tak', 12, 0, 1, 1, 0),
(42, 'Nie', 12, 1, 0, 1, 1),
(43, 'Trochę', 12, 0, 1, 0, 0),
(44, 'Nie jestem pewien', 12, 0, 0, 0, 0),
(45, 'Tak', 13, 1, 1, 1, 1),
(46, 'Nie', 13, 1, 1, 1, 0),
(47, 'Trochę', 13, 1, 1, 0, 0),
(48, 'Nie jestem pewien', 13, 1, 1, 1, 1),
(49, 'Tak', 14, 1, 1, 1, 0),
(50, 'Nie', 14, 0, 0, 0, 1),
(51, 'Trochę', 14, 1, 1, 0, 0),
(52, 'Nie jestem pewien', 14, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `items`
--

CREATE TABLE `items` (
  `id` int NOT NULL,
  `question` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `question`) VALUES
(13, 'Czy interesuje Cię przedsiębiorczość i tworzenie własnej firmy?'),
(9, 'Czy interesujesz się zagadnieniami społecznymi i problemami społecznymi?'),
(10, 'Czy jesteś zainteresowany/a badaniami naukowymi i eksperymentami?'),
(8, 'Czy lubisz rozwiązywać problemy matematyczne lub logiczne zagadki?'),
(7, 'Czy masz talent artystyczny lub artystyczne zainteresowania?'),
(6, 'Czy masz zamiłowanie do nauki języków obcych?'),
(12, 'Czy masz zamiłowanie do pracy z dziećmi lub młodzieżą?'),
(14, 'Czy masz zdolności przywódcze i lubisz organizować innych?'),
(5, 'Czy preferujesz pracę w stresujących sytuacjach i pod presją czasu?'),
(11, 'Czy preferujesz pracę z komputerem i technologią?'),
(4, 'Czy wolisz pracować samodzielnie, czy w zespole?'),
(2, 'Jaką pracę wyobrażasz sobie wykonywać w przyszłości?'),
(1, 'Jakie przedmioty szkolne lub zajęci
a pozaszkolne najbardziej Cię interesują?'),
(3, 'Jakie umiejętności uważasz za swoje największe atuty?');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `ix_answers_answer_id` (`answer_id`),
  ADD KEY `ix_answers_answer` (`answer`);

--
-- Indeksy dla tabeli `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_items_id` (`id`),
  ADD KEY `ix_items_question` (`question`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `answer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
