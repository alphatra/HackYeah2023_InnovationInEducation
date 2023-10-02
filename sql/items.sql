-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: hackyeah_db
-- Generation Time: Paź 01, 2023 at 03:20 AM
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
-- Struktura tabeli dla tabeli `kopia_items`
--

CREATE TABLE `items` (
  `id` int NOT NULL DEFAULT '0',
  `question` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kopia_items`
--

INSERT INTO `items` (`id`, `question`) VALUES
(1, 'Jakie przedmioty szkolne lub zajęcia pozaszkolne najbardziej Cię interesują?'),
(2, 'Jaką pracę wyobrażasz sobie wykonywać w przyszłości?'),
(3, 'Jakie umiejętności uważasz za swoje największe atuty?'),
(4, 'Wolisz pracować samodzielnie, czy w zespole?'),
(5, 'W jakim stopniu oceniasz swoją pracę pod presją czasu?'),
(6, 'Czy lubisz podróżować i poznawać inne kultury? '),
(7, 'Czy masz w sobie duszę artysty?'),
(8, 'Czy lubisz rozwiązywać problemy matematyczne lub logiczne zagadki?'),
(9, 'Czy interesujesz się zagadnieniami społecznymi i problemami społecznymi?'),
(10, 'Czy jesteś zainteresowany/a badaniami naukowymi i eksperymentami??'),
(11, 'Ile czasu spędzasz dziennie na komputerze'),
(12, 'Czy zastanawiałeś się kiedykolwiek nad pracą z dziećmi'),
(13, 'Czy interesuje Cię przedsiębiorczość i tworzenie własnej firmy?'),
(14, 'Czy masz zdolności przywódcze i czy dobrze odnajdujesz się w roli lidera zespołu?'),
(15, 'Czy wybrałbyś większe zarobki ponad pracę w obrębie swoich zainteresowań?'),
(16, 'Czy masz zdolności do kreatywnego tworzenia i myślenia?');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
