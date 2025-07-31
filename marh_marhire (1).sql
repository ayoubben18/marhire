-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 29, 2025 at 01:04 PM
-- Server version: 10.11.13-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marh_marhire`
--

-- --------------------------------------------------------

--
-- Table structure for table `agencies`
--

CREATE TABLE `agencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(190) DEFAULT NULL,
  `agency_name` varchar(191) DEFAULT NULL,
  `category_id` int(11) NOT NULL DEFAULT -1,
  `sub_categories_ids` varchar(191) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `agency_logo` varchar(191) DEFAULT NULL,
  `id_city` int(11) NOT NULL DEFAULT -1,
  `contact_name` varchar(191) DEFAULT NULL,
  `phone_number` varchar(191) DEFAULT NULL,
  `whatsapp` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agencies`
--

INSERT INTO `agencies` (`id`, `slug`, `agency_name`, `category_id`, `sub_categories_ids`, `short_description`, `description`, `status`, `agency_logo`, `id_city`, `contact_name`, `phone_number`, `whatsapp`, `email`, `notes`, `id_user`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 'top-cars', 'Top Cars', 2, NULL, '<p>MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech. ETC</p>', '<p>Experience the ultimate in car rental services with Marhire Car Fes. Our agency offers a diverse range of modern, well-maintained vehicles to suit every need, whether you’re traveling for business or leisure. Enjoy competitive rates, flexible booking options, and a hassle-free pick-up and drop-off service that makes exploring Fes a breeze. With our dedicated customer support and commitment to excellence, Marhire Car Fes is your trusted partner for a comfortable and memorable journey.</p>', 'Active', 'images/agencies/agency_68113b458ce75.png', 2, 'charaf chaouki', '0600000001', '0600000002', 'contact@topcars.ma', NULL, NULL, '2025-05-03 15:56:55', '2025-07-16 19:12:59', NULL),
(3, 'fezcar', 'FezCar', 2, NULL, 'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.', '<p>Experience the ultimate in car rental services with Marhire Car Fes. Our agency offers a diverse range of modern, well-maintained vehicles to suit every need, whether you’re traveling for business or leisure. Enjoy competitive rates, flexible booking options, and a hassle-free pick-up and drop-off service that makes exploring Fes a breeze. With our dedicated customer support and commitment to excellence, Marhire Car Fes is your trusted partner for a comfortable and memorable journey.</p>', 'Active', 'images/agencies/agency_68113b458ce75.png', 6, 'Ahmed', '0611111111', '0611111112', 'contact@fezcar.ma', NULL, NULL, '2025-05-03 15:57:36', '2025-07-16 19:06:55', NULL),
(7, 'boat-agency', 'Boat agency', 4, NULL, 'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.', NULL, 'Active', 'images/agencies/agency_68113b458ce75.png', 2, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 12:10:39', '2025-05-14 12:10:39', NULL),
(8, 'activity-agency', 'Activity Agency', 5, NULL, 'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.', NULL, 'Active', 'images/agencies/agency_68113b458ce75.png', 2, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 12:10:54', '2025-05-14 12:10:54', NULL),
(9, 'private-car-agency', 'Private Car Agency', 3, NULL, 'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.', NULL, 'Active', 'images/agencies/agency_68113b458ce75.png', 2, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 12:11:12', '2025-05-14 12:11:12', NULL),
(10, 'next-moto', 'Next Moto', 2, NULL, 'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.', NULL, 'Active', 'images/agencies/agency_68113b458ce75.png', 2, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-16 12:05:32', '2025-07-16 12:05:32', NULL),
(16, '', 'Test 3000', 4, NULL, NULL, NULL, 'Need Approval', NULL, 2, 'charaf chaouki', '0694123146', '212694123146', 'charafchaouki126@gmail.com', NULL, NULL, '2025-07-24 11:16:52', '2025-07-24 11:16:52', NULL),
(13, '-2', 'test', 2, NULL, NULL, NULL, 'Need Approval', NULL, 2, 'test', '0600000000', '0600000002', 'test@gmail.com', 'test', NULL, '2025-07-22 09:50:03', '2025-07-22 09:50:03', NULL),
(14, '-3', 'test', 2, NULL, NULL, NULL, 'Need Approval', NULL, 2, 'test', '0600000000', '0600000002', 'test@gmail.com', 'test', NULL, '2025-07-22 09:50:24', '2025-07-22 09:50:24', NULL),
(15, '-4', 'test', 2, NULL, NULL, NULL, 'Need Approval', NULL, 2, 'test', '0600000', '0600000002', 'test@gmail.com', 'tst', NULL, '2025-07-22 09:51:16', '2025-07-22 09:51:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `agency_features`
--

CREATE TABLE `agency_features` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `feature` varchar(191) DEFAULT NULL,
  `icon` varchar(191) DEFAULT NULL,
  `agency_id` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agency_features`
--

INSERT INTO `agency_features` (`id`, `feature`, `icon`, `agency_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Feature 1', 'images/icons/feature_68113e50738f5.png', 1, '2025-04-29 21:02:08', '2025-04-29 21:02:08', NULL),
(2, 'Feature 2', 'images/icons/feature_68113e5077c82.png', 1, '2025-04-29 21:02:08', '2025-04-29 21:02:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `agency_sub_categories`
--

CREATE TABLE `agency_sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subcategory_id` int(11) NOT NULL DEFAULT -1,
  `option_id` int(11) NOT NULL DEFAULT -1,
  `agency_id` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agency_sub_categories`
--

INSERT INTO `agency_sub_categories` (`id`, `subcategory_id`, `option_id`, `agency_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 16, 26, 1, '2025-04-29 21:52:30', '2025-04-29 21:52:30', NULL),
(2, 16, 25, 1, '2025-04-29 21:52:30', '2025-04-29 21:52:30', NULL),
(3, 16, 26, 4, '2025-05-03 19:01:40', '2025-05-03 19:01:40', NULL),
(4, 16, 25, 4, '2025-05-03 19:01:41', '2025-05-03 19:01:41', NULL),
(5, 16, 26, 5, '2025-05-03 19:01:49', '2025-05-03 19:01:49', NULL),
(6, 16, 25, 5, '2025-05-03 19:01:49', '2025-05-03 19:01:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `amenities`
--

CREATE TABLE `amenities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `listing_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ammenies`
--

CREATE TABLE `ammenies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `listing_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `short_description` varchar(191) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `featured_img` varchar(191) DEFAULT NULL,
  `slug` varchar(191) DEFAULT NULL,
  `meta_title` varchar(191) DEFAULT NULL,
  `meta_description` varchar(191) DEFAULT NULL,
  `schema` varchar(191) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `short_description`, `content`, `featured_img`, `slug`, `meta_title`, `meta_description`, `schema`, `category_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 'Le Mans Circuit Guide | Hertz Racing Gold', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', NULL, 'images/articles/article_6875153879045.jpg', 'le-mans-circuit-guide-hertz-racing-gold', 'Le Mans Circuit Guide | Hertz Racing Gold', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', '<script></script>', NULL, NULL, '2025-07-14 14:33:28', '2025-07-14 14:33:28', NULL),
(3, 'The low-carb foodie guide to Florence, Italy', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', NULL, 'images/articles/article_68751b9654be2.jpg', 'the-low-carb-foodie-guide-to-florence-italy', NULL, NULL, NULL, NULL, 1, '2025-07-14 15:00:38', '2025-07-14 15:00:38', NULL),
(4, 'Experience the Grand Canyon at night', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', NULL, 'images/articles/article_68751bae81b16.jpg', 'experience-the-grand-canyon-at-night', NULL, NULL, NULL, NULL, 1, '2025-07-14 15:01:02', '2025-07-14 15:01:02', NULL),
(5, '10 ways successful people spend their free time', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', NULL, 'images/articles/article_68751bc65b18a.jpg', '10-ways-successful-people-spend-their-free-time', NULL, NULL, NULL, NULL, 1, '2025-07-14 15:01:26', '2025-07-14 15:01:26', NULL),
(6, 'A road trip through Virginia\'s civil war sites', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', NULL, 'images/articles/article_68751be0d1f01.jpg', 'a-road-trip-through-virginias-civil-war-sites', NULL, NULL, NULL, NULL, 1, '2025-07-14 15:01:52', '2025-07-14 15:01:52', NULL),
(7, 'A road trip through Virginia\'s civil war sites', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', NULL, 'images/articles/article_68751bfed6899.jpg', 'a-road-trip-through-virginias-civil-war-sites-1', NULL, NULL, NULL, NULL, 1, '2025-07-14 15:02:22', '2025-07-14 15:02:22', NULL),
(8, 'Best things to do in San Francisco', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', NULL, 'images/articles/article_68751c1aa2670.jpg', 'best-things-to-do-in-san-francisco', NULL, NULL, NULL, NULL, 1, '2025-07-14 15:02:50', '2025-07-14 15:02:50', NULL),
(9, '10 ways successful people spend their free time', 'Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots', '<p>In today’s fast-paced world, we often rush through airports, tick off attractions, and squeeze multiple cities into one short trip. But what if the best way to explore the world was to slow down?</p><p>Welcome to the world of slow travel—a growing movement that encourages travelers to immerse themselves deeply in the culture, people, and rhythm of a place.</p><h3>🧭 What is Slow Travel?</h3><p>Slow travel isn’t about how many countries you visit in a month—it’s about how deeply you connect with the places you go. Instead of hopping between cities, slow travelers choose to stay longer in fewer places, savoring the local food, learning the language, and forming authentic relationships with locals.</p><p>It’s not just a style of travel—it’s a mindset.</p><h3>🌿 Why Choose Slow Travel?</h3><p>Here are a few reasons why slow travel is becoming the preferred choice for modern adventurers:</p><h3>1. Deeper Cultural Experiences</h3><p>Spending more time in one destination lets you uncover hidden gems, attend local festivals, and enjoy experiences most tourists miss. Imagine cooking tagine with a Berber family in Morocco or helping out at a vineyard in Italy.</p><h3>2. More Sustainable</h3><p>Traveling slowly reduces your carbon footprint. Fewer flights, more public transport, and local accommodation options help protect the environment and support local economies.</p><h3>3. Less Stressful</h3><p>Forget airport stress and tight itineraries. With slow travel, you wake up without an alarm, wander without a map, and let each day unfold naturally.</p><h3>4. Authentic Connections</h3><p>Whether it’s chatting with a street vendor, learning a traditional craft, or volunteering with a community project—slow travel helps you form genuine connections that last far beyond your trip.</p><h3>🏞 Where to Start Your Slow Travel Journey?</h3><p>If you\'re ready to embrace slow travel, here are some ideal destinations to start with:</p><p>Chiang Mai, Thailand – Ideal for yoga retreats, Thai cooking classes, and mountain hikes.</p><p>Essaouira, Morocco – A calm coastal town perfect for surfing, souks, and sunsets.</p><p>Lisbon, Portugal – Spend weeks exploring the winding alleys, Fado music, and delicious pastéis de nata.</p><p>Kyoto, Japan – Dive into centuries of tradition with tea ceremonies, temple stays, and local markets.</p><h3>✈️ Tips for Traveling Slow</h3><p>Book longer stays in fewer places</p><p>Learn basic phrases in the local language</p><p>Shop at markets, not malls</p><p>Choose homestays or locally-owned guesthouses</p><p>Travel by train or bus instead of flights</p><p>Be curious. Talk to people. Listen more than you speak.</p><h3>🧳 Final Thoughts</h3><p>Traveling slowly isn\'t just about seeing the world—it’s about feeling it. It’s a way to travel that respects people, places, and the planet. Whether you\'re backpacking through South America or living a month in a Moroccan riad, slow travel offers memories that no fast-paced tour can match.</p><p>So next time you plan a trip, ask yourself:</p><blockquote><p>“Am I just visiting this place—or truly experiencing it?”</p></blockquote>', 'images/articles/article_68751c35a39fd.jpg', '10-ways-successful-people-spend-their-free-time-1', 'CTM 1', 'CTM 2', '<script>Schema</script>', NULL, 1, '2025-07-14 15:03:17', '2025-07-24 19:22:38', NULL),
(10, 'tst', '1', '<p>1</p>', '', 'tst', '1', '12', '13', NULL, 1, '2025-07-14 17:16:32', '2025-07-14 17:18:40', '2025-07-14 17:18:40');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` int(11) NOT NULL DEFAULT -1,
  `activity_type` int(11) DEFAULT NULL,
  `listing_id` int(11) NOT NULL DEFAULT -1,
  `first_name` varchar(191) DEFAULT NULL,
  `last_name` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `whatsapp` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Pending',
  `booking_price` double DEFAULT NULL,
  `total_addons` double DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `net_agency_price` double DEFAULT NULL,
  `commission_amount` double DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `pickup_date` varchar(191) DEFAULT NULL,
  `pickup_time` varchar(191) DEFAULT NULL,
  `dropoff_date` varchar(191) DEFAULT NULL,
  `dropoff_time` varchar(191) DEFAULT NULL,
  `pickup_location` varchar(191) DEFAULT NULL,
  `droppoff_location` varchar(191) DEFAULT NULL,
  `duration` varchar(191) DEFAULT NULL,
  `propose` varchar(191) DEFAULT NULL,
  `number_of_people` int(11) DEFAULT NULL,
  `prefered_date` varchar(191) DEFAULT NULL,
  `pricing_option_id` int(11) NOT NULL DEFAULT -1,
  `flight_number` varchar(191) DEFAULT NULL,
  `booking_source` varchar(191) NOT NULL DEFAULT 'Admin Entry',
  `discount_or_extra` double NOT NULL DEFAULT 0,
  `airport_or_intercity` varchar(191) DEFAULT NULL,
  `car_type` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `city_a_id` int(11) DEFAULT NULL,
  `city_b_id` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `category_id`, `activity_type`, `listing_id`, `first_name`, `last_name`, `email`, `whatsapp`, `country`, `status`, `booking_price`, `total_addons`, `total_price`, `net_agency_price`, `commission_amount`, `notes`, `age`, `pickup_date`, `pickup_time`, `dropoff_date`, `dropoff_time`, `pickup_location`, `droppoff_location`, `duration`, `propose`, `number_of_people`, `prefered_date`, `pricing_option_id`, `flight_number`, `booking_source`, `discount_or_extra`, `airport_or_intercity`, `car_type`, `city_id`, `city_a_id`, `city_b_id`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, NULL, 3, 'john', 'nativ', 'aumin@gmail.com', '87644449', 'Albania', 'Pending', 60, 30, 90, NULL, NULL, NULL, 34, '2025-07-24', '00:30', '2025-07-26', '00:30', 'agadir', 'agadir', NULL, NULL, NULL, NULL, -1, '57878', 'Admin Entry', 0, NULL, NULL, 3, NULL, NULL, 1, '2025-07-24 20:01:01', '2025-07-24 20:01:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `booking_addons`
--

CREATE TABLE `booking_addons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `booking_id` int(11) NOT NULL DEFAULT -1,
  `addon_id` int(11) NOT NULL DEFAULT -1,
  `price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking_addons`
--

INSERT INTO `booking_addons` (`id`, `booking_id`, `addon_id`, `price`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, NULL, '2025-07-24 20:01:01', '2025-07-24 20:01:01', NULL),
(2, 1, 2, NULL, '2025-07-24 20:01:01', '2025-07-24 20:01:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand` varchar(191) DEFAULT NULL,
  `telephone` varchar(191) DEFAULT NULL,
  `lien_store` varchar(191) DEFAULT NULL,
  `logo` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category` varchar(191) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`, `short_description`, `description`, `logo`, `created_at`, `updated_at`) VALUES
(2, 'Car Rental', 'This is the primary category where all vehicle listings will be featured. The structure within\r\nthis category focuses on cities and car types.', NULL, 'images/logos/logo_6806aa967af13.jpg', '2025-04-21 20:29:10', '2025-04-21 20:29:10'),
(3, 'Private Car with Driver', 'This category will list vehicles available with professional drivers for specific services. This is\r\nideal for users who want private transportation for various needs, including city transfers,\r\nintercity travel, or business travel.', NULL, 'images/logos/logo_6806aaf4d480f.png', '2025-04-21 20:30:44', '2025-04-21 20:30:44'),
(4, 'Boat Rentals', 'This category will feature boat and yacht rentals. Each listing will detail boat types, available\r\nservices, and relevant information for tourists looking to enjoy the water in Morocco.', NULL, 'images/logos/logo_6806ab2bd15e1.png', '2025-04-21 20:31:39', '2025-04-21 20:31:39'),
(5, 'Things to do', 'This category will focus on various tours, excursions, and experiences for travelers visiting\r\nMorocco. The activities will range from adventurous quad and buggy rides to relaxing jet ski\r\nsessions.', NULL, 'images/logos/logo_6806ad160ad28.svg', '2025-04-21 20:32:35', '2025-05-23 13:30:09');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city_name` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `city_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, NULL, '2025-04-29 12:56:04', '2025-04-29 12:56:23', '2025-04-29 12:56:23'),
(2, 'Casablanca', '2025-04-29 12:57:52', '2025-04-29 12:57:52', NULL),
(3, 'Agadir', '2025-04-29 12:58:00', '2025-04-29 12:58:00', NULL),
(4, 'Rabat', '2025-04-29 12:58:09', '2025-04-29 12:58:09', NULL),
(5, 'Marrakech', '2025-04-29 12:58:19', '2025-04-29 12:58:19', NULL),
(6, 'Fez', '2025-04-29 12:58:46', '2025-04-29 12:58:46', NULL),
(7, 'Tangier', '2025-04-29 12:58:56', '2025-04-29 12:58:56', NULL),
(8, 'Tetouan', '2025-04-29 22:04:33', '2025-04-29 22:04:33', NULL),
(9, 'Essaouira', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country` varchar(191) DEFAULT NULL,
  `flag` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `country`, `flag`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Aruba', 'https://flagcdn.com/w40/aw.png', NULL, NULL, NULL),
(2, 'Afghanistan', 'https://flagcdn.com/w40/af.png', NULL, NULL, NULL),
(3, 'Angola', 'https://flagcdn.com/w40/ao.png', NULL, NULL, NULL),
(4, 'Anguilla', 'https://flagcdn.com/w40/ai.png', NULL, NULL, NULL),
(5, 'Åland Islands', 'https://flagcdn.com/w40/ax.png', NULL, NULL, NULL),
(6, 'Albania', 'https://flagcdn.com/w40/al.png', NULL, NULL, NULL),
(7, 'Andorra', 'https://flagcdn.com/w40/ad.png', NULL, NULL, NULL),
(8, 'United Arab Emirates', 'https://flagcdn.com/w40/ae.png', NULL, NULL, NULL),
(9, 'Argentina', 'https://flagcdn.com/w40/ar.png', NULL, NULL, NULL),
(10, 'Armenia', 'https://flagcdn.com/w40/am.png', NULL, NULL, NULL),
(11, 'American Samoa', 'https://flagcdn.com/w40/as.png', NULL, NULL, NULL),
(12, 'Antarctica', 'https://flagcdn.com/w40/aq.png', NULL, NULL, NULL),
(13, 'French Southern Territories', 'https://flagcdn.com/w40/tf.png', NULL, NULL, NULL),
(14, 'Antigua and Barbuda', 'https://flagcdn.com/w40/ag.png', NULL, NULL, NULL),
(15, 'Australia', 'https://flagcdn.com/w40/au.png', NULL, NULL, NULL),
(16, 'Austria', 'https://flagcdn.com/w40/at.png', NULL, NULL, NULL),
(17, 'Azerbaijan', 'https://flagcdn.com/w40/az.png', NULL, NULL, NULL),
(18, 'Burundi', 'https://flagcdn.com/w40/bi.png', NULL, NULL, NULL),
(19, 'Belgium', 'https://flagcdn.com/w40/be.png', NULL, NULL, NULL),
(20, 'Benin', 'https://flagcdn.com/w40/bj.png', NULL, NULL, NULL),
(21, 'Bonaire, Sint Eustatius and Saba', 'https://flagcdn.com/w40/bq.png', NULL, NULL, NULL),
(22, 'Burkina Faso', 'https://flagcdn.com/w40/bf.png', NULL, NULL, NULL),
(23, 'Bangladesh', 'https://flagcdn.com/w40/bd.png', NULL, NULL, NULL),
(24, 'Bulgaria', 'https://flagcdn.com/w40/bg.png', NULL, NULL, NULL),
(25, 'Bahrain', 'https://flagcdn.com/w40/bh.png', NULL, NULL, NULL),
(26, 'Bahamas', 'https://flagcdn.com/w40/bs.png', NULL, NULL, NULL),
(27, 'Bosnia and Herzegovina', 'https://flagcdn.com/w40/ba.png', NULL, NULL, NULL),
(28, 'Saint Barthélemy', 'https://flagcdn.com/w40/bl.png', NULL, NULL, NULL),
(29, 'Belarus', 'https://flagcdn.com/w40/by.png', NULL, NULL, NULL),
(30, 'Belize', 'https://flagcdn.com/w40/bz.png', NULL, NULL, NULL),
(31, 'Bermuda', 'https://flagcdn.com/w40/bm.png', NULL, NULL, NULL),
(32, 'Bolivia, Plurinational State of', 'https://flagcdn.com/w40/bo.png', NULL, NULL, NULL),
(33, 'Brazil', 'https://flagcdn.com/w40/br.png', NULL, NULL, NULL),
(34, 'Barbados', 'https://flagcdn.com/w40/bb.png', NULL, NULL, NULL),
(35, 'Brunei Darussalam', 'https://flagcdn.com/w40/bn.png', NULL, NULL, NULL),
(36, 'Bhutan', 'https://flagcdn.com/w40/bt.png', NULL, NULL, NULL),
(37, 'Bouvet Island', 'https://flagcdn.com/w40/bv.png', NULL, NULL, NULL),
(38, 'Botswana', 'https://flagcdn.com/w40/bw.png', NULL, NULL, NULL),
(39, 'Central African Republic', 'https://flagcdn.com/w40/cf.png', NULL, NULL, NULL),
(40, 'Canada', 'https://flagcdn.com/w40/ca.png', NULL, NULL, NULL),
(41, 'Cocos (Keeling) Islands', 'https://flagcdn.com/w40/cc.png', NULL, NULL, NULL),
(42, 'Switzerland', 'https://flagcdn.com/w40/ch.png', NULL, NULL, NULL),
(43, 'Chile', 'https://flagcdn.com/w40/cl.png', NULL, NULL, NULL),
(44, 'China', 'https://flagcdn.com/w40/cn.png', NULL, NULL, NULL),
(45, 'Côte d\'Ivoire', 'https://flagcdn.com/w40/ci.png', NULL, NULL, NULL),
(46, 'Cameroon', 'https://flagcdn.com/w40/cm.png', NULL, NULL, NULL),
(47, 'Congo, The Democratic Republic of the', 'https://flagcdn.com/w40/cd.png', NULL, NULL, NULL),
(48, 'Congo', 'https://flagcdn.com/w40/cg.png', NULL, NULL, NULL),
(49, 'Cook Islands', 'https://flagcdn.com/w40/ck.png', NULL, NULL, NULL),
(50, 'Colombia', 'https://flagcdn.com/w40/co.png', NULL, NULL, NULL),
(51, 'Comoros', 'https://flagcdn.com/w40/km.png', NULL, NULL, NULL),
(52, 'Cabo Verde', 'https://flagcdn.com/w40/cv.png', NULL, NULL, NULL),
(53, 'Costa Rica', 'https://flagcdn.com/w40/cr.png', NULL, NULL, NULL),
(54, 'Cuba', 'https://flagcdn.com/w40/cu.png', NULL, NULL, NULL),
(55, 'Curaçao', 'https://flagcdn.com/w40/cw.png', NULL, NULL, NULL),
(56, 'Christmas Island', 'https://flagcdn.com/w40/cx.png', NULL, NULL, NULL),
(57, 'Cayman Islands', 'https://flagcdn.com/w40/ky.png', NULL, NULL, NULL),
(58, 'Cyprus', 'https://flagcdn.com/w40/cy.png', NULL, NULL, NULL),
(59, 'Czechia', 'https://flagcdn.com/w40/cz.png', NULL, NULL, NULL),
(60, 'Germany', 'https://flagcdn.com/w40/de.png', NULL, NULL, NULL),
(61, 'Djibouti', 'https://flagcdn.com/w40/dj.png', NULL, NULL, NULL),
(62, 'Dominica', 'https://flagcdn.com/w40/dm.png', NULL, NULL, NULL),
(63, 'Denmark', 'https://flagcdn.com/w40/dk.png', NULL, NULL, NULL),
(64, 'Dominican Republic', 'https://flagcdn.com/w40/do.png', NULL, NULL, NULL),
(65, 'Algeria', 'https://flagcdn.com/w40/dz.png', NULL, NULL, NULL),
(66, 'Ecuador', 'https://flagcdn.com/w40/ec.png', NULL, NULL, NULL),
(67, 'Egypt', 'https://flagcdn.com/w40/eg.png', NULL, NULL, NULL),
(68, 'Eritrea', 'https://flagcdn.com/w40/er.png', NULL, NULL, NULL),
(69, 'Western Sahara', 'https://flagcdn.com/w40/eh.png', NULL, NULL, NULL),
(70, 'Spain', 'https://flagcdn.com/w40/es.png', NULL, NULL, NULL),
(71, 'Estonia', 'https://flagcdn.com/w40/ee.png', NULL, NULL, NULL),
(72, 'Ethiopia', 'https://flagcdn.com/w40/et.png', NULL, NULL, NULL),
(73, 'Finland', 'https://flagcdn.com/w40/fi.png', NULL, NULL, NULL),
(74, 'Fiji', 'https://flagcdn.com/w40/fj.png', NULL, NULL, NULL),
(75, 'Falkland Islands (Malvinas)', 'https://flagcdn.com/w40/fk.png', NULL, NULL, NULL),
(76, 'France', 'https://flagcdn.com/w40/fr.png', NULL, NULL, NULL),
(77, 'Faroe Islands', 'https://flagcdn.com/w40/fo.png', NULL, NULL, NULL),
(78, 'Micronesia, Federated States of', 'https://flagcdn.com/w40/fm.png', NULL, NULL, NULL),
(79, 'Gabon', 'https://flagcdn.com/w40/ga.png', NULL, NULL, NULL),
(80, 'United Kingdom', 'https://flagcdn.com/w40/gb.png', NULL, NULL, NULL),
(81, 'Georgia', 'https://flagcdn.com/w40/ge.png', NULL, NULL, NULL),
(82, 'Guernsey', 'https://flagcdn.com/w40/gg.png', NULL, NULL, NULL),
(83, 'Ghana', 'https://flagcdn.com/w40/gh.png', NULL, NULL, NULL),
(84, 'Gibraltar', 'https://flagcdn.com/w40/gi.png', NULL, NULL, NULL),
(85, 'Guinea', 'https://flagcdn.com/w40/gn.png', NULL, NULL, NULL),
(86, 'Guadeloupe', 'https://flagcdn.com/w40/gp.png', NULL, NULL, NULL),
(87, 'Gambia', 'https://flagcdn.com/w40/gm.png', NULL, NULL, NULL),
(88, 'Guinea-Bissau', 'https://flagcdn.com/w40/gw.png', NULL, NULL, NULL),
(89, 'Equatorial Guinea', 'https://flagcdn.com/w40/gq.png', NULL, NULL, NULL),
(90, 'Greece', 'https://flagcdn.com/w40/gr.png', NULL, NULL, NULL),
(91, 'Grenada', 'https://flagcdn.com/w40/gd.png', NULL, NULL, NULL),
(92, 'Greenland', 'https://flagcdn.com/w40/gl.png', NULL, NULL, NULL),
(93, 'Guatemala', 'https://flagcdn.com/w40/gt.png', NULL, NULL, NULL),
(94, 'French Guiana', 'https://flagcdn.com/w40/gf.png', NULL, NULL, NULL),
(95, 'Guam', 'https://flagcdn.com/w40/gu.png', NULL, NULL, NULL),
(96, 'Guyana', 'https://flagcdn.com/w40/gy.png', NULL, NULL, NULL),
(97, 'Hong Kong', 'https://flagcdn.com/w40/hk.png', NULL, NULL, NULL),
(98, 'Heard Island and McDonald Islands', 'https://flagcdn.com/w40/hm.png', NULL, NULL, NULL),
(99, 'Honduras', 'https://flagcdn.com/w40/hn.png', NULL, NULL, NULL),
(100, 'Croatia', 'https://flagcdn.com/w40/hr.png', NULL, NULL, NULL),
(101, 'Haiti', 'https://flagcdn.com/w40/ht.png', NULL, NULL, NULL),
(102, 'Hungary', 'https://flagcdn.com/w40/hu.png', NULL, NULL, NULL),
(103, 'Indonesia', 'https://flagcdn.com/w40/id.png', NULL, NULL, NULL),
(104, 'Isle of Man', 'https://flagcdn.com/w40/im.png', NULL, NULL, NULL),
(105, 'India', 'https://flagcdn.com/w40/in.png', NULL, NULL, NULL),
(106, 'British Indian Ocean Territory', 'https://flagcdn.com/w40/io.png', NULL, NULL, NULL),
(107, 'Ireland', 'https://flagcdn.com/w40/ie.png', NULL, NULL, NULL),
(108, 'Iran, Islamic Republic of', 'https://flagcdn.com/w40/ir.png', NULL, NULL, NULL),
(109, 'Iraq', 'https://flagcdn.com/w40/iq.png', NULL, NULL, NULL),
(110, 'Iceland', 'https://flagcdn.com/w40/is.png', NULL, NULL, NULL),
(111, 'Israel', 'https://flagcdn.com/w40/il.png', NULL, NULL, NULL),
(112, 'Italy', 'https://flagcdn.com/w40/it.png', NULL, NULL, NULL),
(113, 'Jamaica', 'https://flagcdn.com/w40/jm.png', NULL, NULL, NULL),
(114, 'Jersey', 'https://flagcdn.com/w40/je.png', NULL, NULL, NULL),
(115, 'Jordan', 'https://flagcdn.com/w40/jo.png', NULL, NULL, NULL),
(116, 'Japan', 'https://flagcdn.com/w40/jp.png', NULL, NULL, NULL),
(117, 'Kazakhstan', 'https://flagcdn.com/w40/kz.png', NULL, NULL, NULL),
(118, 'Kenya', 'https://flagcdn.com/w40/ke.png', NULL, NULL, NULL),
(119, 'Kyrgyzstan', 'https://flagcdn.com/w40/kg.png', NULL, NULL, NULL),
(120, 'Cambodia', 'https://flagcdn.com/w40/kh.png', NULL, NULL, NULL),
(121, 'Kiribati', 'https://flagcdn.com/w40/ki.png', NULL, NULL, NULL),
(122, 'Saint Kitts and Nevis', 'https://flagcdn.com/w40/kn.png', NULL, NULL, NULL),
(123, 'Korea, Republic of', 'https://flagcdn.com/w40/kr.png', NULL, NULL, NULL),
(124, 'Kuwait', 'https://flagcdn.com/w40/kw.png', NULL, NULL, NULL),
(125, 'Lao People\'s Democratic Republic', 'https://flagcdn.com/w40/la.png', NULL, NULL, NULL),
(126, 'Lebanon', 'https://flagcdn.com/w40/lb.png', NULL, NULL, NULL),
(127, 'Liberia', 'https://flagcdn.com/w40/lr.png', NULL, NULL, NULL),
(128, 'Libya', 'https://flagcdn.com/w40/ly.png', NULL, NULL, NULL),
(129, 'Saint Lucia', 'https://flagcdn.com/w40/lc.png', NULL, NULL, NULL),
(130, 'Liechtenstein', 'https://flagcdn.com/w40/li.png', NULL, NULL, NULL),
(131, 'Sri Lanka', 'https://flagcdn.com/w40/lk.png', NULL, NULL, NULL),
(132, 'Lesotho', 'https://flagcdn.com/w40/ls.png', NULL, NULL, NULL),
(133, 'Lithuania', 'https://flagcdn.com/w40/lt.png', NULL, NULL, NULL),
(134, 'Luxembourg', 'https://flagcdn.com/w40/lu.png', NULL, NULL, NULL),
(135, 'Latvia', 'https://flagcdn.com/w40/lv.png', NULL, NULL, NULL),
(136, 'Macao', 'https://flagcdn.com/w40/mo.png', NULL, NULL, NULL),
(137, 'Saint Martin (French part)', 'https://flagcdn.com/w40/mf.png', NULL, NULL, NULL),
(138, 'Morocco', 'https://flagcdn.com/w40/ma.png', NULL, NULL, NULL),
(139, 'Monaco', 'https://flagcdn.com/w40/mc.png', NULL, NULL, NULL),
(140, 'Moldova, Republic of', 'https://flagcdn.com/w40/md.png', NULL, NULL, NULL),
(141, 'Madagascar', 'https://flagcdn.com/w40/mg.png', NULL, NULL, NULL),
(142, 'Maldives', 'https://flagcdn.com/w40/mv.png', NULL, NULL, NULL),
(143, 'Mexico', 'https://flagcdn.com/w40/mx.png', NULL, NULL, NULL),
(144, 'Marshall Islands', 'https://flagcdn.com/w40/mh.png', NULL, NULL, NULL),
(145, 'North Macedonia', 'https://flagcdn.com/w40/mk.png', NULL, NULL, NULL),
(146, 'Mali', 'https://flagcdn.com/w40/ml.png', NULL, NULL, NULL),
(147, 'Malta', 'https://flagcdn.com/w40/mt.png', NULL, NULL, NULL),
(148, 'Myanmar', 'https://flagcdn.com/w40/mm.png', NULL, NULL, NULL),
(149, 'Montenegro', 'https://flagcdn.com/w40/me.png', NULL, NULL, NULL),
(150, 'Mongolia', 'https://flagcdn.com/w40/mn.png', NULL, NULL, NULL),
(151, 'Northern Mariana Islands', 'https://flagcdn.com/w40/mp.png', NULL, NULL, NULL),
(152, 'Mozambique', 'https://flagcdn.com/w40/mz.png', NULL, NULL, NULL),
(153, 'Mauritania', 'https://flagcdn.com/w40/mr.png', NULL, NULL, NULL),
(154, 'Montserrat', 'https://flagcdn.com/w40/ms.png', NULL, NULL, NULL),
(155, 'Martinique', 'https://flagcdn.com/w40/mq.png', NULL, NULL, NULL),
(156, 'Mauritius', 'https://flagcdn.com/w40/mu.png', NULL, NULL, NULL),
(157, 'Malawi', 'https://flagcdn.com/w40/mw.png', NULL, NULL, NULL),
(158, 'Malaysia', 'https://flagcdn.com/w40/my.png', NULL, NULL, NULL),
(159, 'Mayotte', 'https://flagcdn.com/w40/yt.png', NULL, NULL, NULL),
(160, 'Namibia', 'https://flagcdn.com/w40/na.png', NULL, NULL, NULL),
(161, 'New Caledonia', 'https://flagcdn.com/w40/nc.png', NULL, NULL, NULL),
(162, 'Niger', 'https://flagcdn.com/w40/ne.png', NULL, NULL, NULL),
(163, 'Norfolk Island', 'https://flagcdn.com/w40/nf.png', NULL, NULL, NULL),
(164, 'Nigeria', 'https://flagcdn.com/w40/ng.png', NULL, NULL, NULL),
(165, 'Nicaragua', 'https://flagcdn.com/w40/ni.png', NULL, NULL, NULL),
(166, 'Niue', 'https://flagcdn.com/w40/nu.png', NULL, NULL, NULL),
(167, 'Netherlands', 'https://flagcdn.com/w40/nl.png', NULL, NULL, NULL),
(168, 'Norway', 'https://flagcdn.com/w40/no.png', NULL, NULL, NULL),
(169, 'Nepal', 'https://flagcdn.com/w40/np.png', NULL, NULL, NULL),
(170, 'Nauru', 'https://flagcdn.com/w40/nr.png', NULL, NULL, NULL),
(171, 'New Zealand', 'https://flagcdn.com/w40/nz.png', NULL, NULL, NULL),
(172, 'Oman', 'https://flagcdn.com/w40/om.png', NULL, NULL, NULL),
(173, 'Pakistan', 'https://flagcdn.com/w40/pk.png', NULL, NULL, NULL),
(174, 'Panama', 'https://flagcdn.com/w40/pa.png', NULL, NULL, NULL),
(175, 'Pitcairn', 'https://flagcdn.com/w40/pn.png', NULL, NULL, NULL),
(176, 'Peru', 'https://flagcdn.com/w40/pe.png', NULL, NULL, NULL),
(177, 'Philippines', 'https://flagcdn.com/w40/ph.png', NULL, NULL, NULL),
(178, 'Palau', 'https://flagcdn.com/w40/pw.png', NULL, NULL, NULL),
(179, 'Papua New Guinea', 'https://flagcdn.com/w40/pg.png', NULL, NULL, NULL),
(180, 'Poland', 'https://flagcdn.com/w40/pl.png', NULL, NULL, NULL),
(181, 'Puerto Rico', 'https://flagcdn.com/w40/pr.png', NULL, NULL, NULL),
(182, 'Korea, Democratic People\'s Republic of', 'https://flagcdn.com/w40/kp.png', NULL, NULL, NULL),
(183, 'Portugal', 'https://flagcdn.com/w40/pt.png', NULL, NULL, NULL),
(184, 'Paraguay', 'https://flagcdn.com/w40/py.png', NULL, NULL, NULL),
(185, 'Palestine, State of', 'https://flagcdn.com/w40/ps.png', NULL, NULL, NULL),
(186, 'French Polynesia', 'https://flagcdn.com/w40/pf.png', NULL, NULL, NULL),
(187, 'Qatar', 'https://flagcdn.com/w40/qa.png', NULL, NULL, NULL),
(188, 'Réunion', 'https://flagcdn.com/w40/re.png', NULL, NULL, NULL),
(189, 'Romania', 'https://flagcdn.com/w40/ro.png', NULL, NULL, NULL),
(190, 'Russian Federation', 'https://flagcdn.com/w40/ru.png', NULL, NULL, NULL),
(191, 'Rwanda', 'https://flagcdn.com/w40/rw.png', NULL, NULL, NULL),
(192, 'Saudi Arabia', 'https://flagcdn.com/w40/sa.png', NULL, NULL, NULL),
(193, 'Sudan', 'https://flagcdn.com/w40/sd.png', NULL, NULL, NULL),
(194, 'Senegal', 'https://flagcdn.com/w40/sn.png', NULL, NULL, NULL),
(195, 'Singapore', 'https://flagcdn.com/w40/sg.png', NULL, NULL, NULL),
(196, 'South Georgia and the South Sandwich Islands', 'https://flagcdn.com/w40/gs.png', NULL, NULL, NULL),
(197, 'Saint Helena, Ascension and Tristan da Cunha', 'https://flagcdn.com/w40/sh.png', NULL, NULL, NULL),
(198, 'Svalbard and Jan Mayen', 'https://flagcdn.com/w40/sj.png', NULL, NULL, NULL),
(199, 'Solomon Islands', 'https://flagcdn.com/w40/sb.png', NULL, NULL, NULL),
(200, 'Sierra Leone', 'https://flagcdn.com/w40/sl.png', NULL, NULL, NULL),
(201, 'El Salvador', 'https://flagcdn.com/w40/sv.png', NULL, NULL, NULL),
(202, 'San Marino', 'https://flagcdn.com/w40/sm.png', NULL, NULL, NULL),
(203, 'Somalia', 'https://flagcdn.com/w40/so.png', NULL, NULL, NULL),
(204, 'Saint Pierre and Miquelon', 'https://flagcdn.com/w40/pm.png', NULL, NULL, NULL),
(205, 'Serbia', 'https://flagcdn.com/w40/rs.png', NULL, NULL, NULL),
(206, 'South Sudan', 'https://flagcdn.com/w40/ss.png', NULL, NULL, NULL),
(207, 'Sao Tome and Principe', 'https://flagcdn.com/w40/st.png', NULL, NULL, NULL),
(208, 'Suriname', 'https://flagcdn.com/w40/sr.png', NULL, NULL, NULL),
(209, 'Slovakia', 'https://flagcdn.com/w40/sk.png', NULL, NULL, NULL),
(210, 'Slovenia', 'https://flagcdn.com/w40/si.png', NULL, NULL, NULL),
(211, 'Sweden', 'https://flagcdn.com/w40/se.png', NULL, NULL, NULL),
(212, 'Eswatini', 'https://flagcdn.com/w40/sz.png', NULL, NULL, NULL),
(213, 'Sint Maarten (Dutch part)', 'https://flagcdn.com/w40/sx.png', NULL, NULL, NULL),
(214, 'Seychelles', 'https://flagcdn.com/w40/sc.png', NULL, NULL, NULL),
(215, 'Syrian Arab Republic', 'https://flagcdn.com/w40/sy.png', NULL, NULL, NULL),
(216, 'Turks and Caicos Islands', 'https://flagcdn.com/w40/tc.png', NULL, NULL, NULL),
(217, 'Chad', 'https://flagcdn.com/w40/td.png', NULL, NULL, NULL),
(218, 'Togo', 'https://flagcdn.com/w40/tg.png', NULL, NULL, NULL),
(219, 'Thailand', 'https://flagcdn.com/w40/th.png', NULL, NULL, NULL),
(220, 'Tajikistan', 'https://flagcdn.com/w40/tj.png', NULL, NULL, NULL),
(221, 'Tokelau', 'https://flagcdn.com/w40/tk.png', NULL, NULL, NULL),
(222, 'Turkmenistan', 'https://flagcdn.com/w40/tm.png', NULL, NULL, NULL),
(223, 'Timor-Leste', 'https://flagcdn.com/w40/tl.png', NULL, NULL, NULL),
(224, 'Tonga', 'https://flagcdn.com/w40/to.png', NULL, NULL, NULL),
(225, 'Trinidad and Tobago', 'https://flagcdn.com/w40/tt.png', NULL, NULL, NULL),
(226, 'Tunisia', 'https://flagcdn.com/w40/tn.png', NULL, NULL, NULL),
(227, 'Turkey', 'https://flagcdn.com/w40/trm.png', NULL, NULL, NULL),
(228, 'Tuvalu', 'https://flagcdn.com/w40/tv.png', NULL, NULL, NULL),
(229, 'Taiwan, Province of China', 'https://flagcdn.com/w40/tw.png', NULL, NULL, NULL),
(230, 'Tanzania, United Republic of', 'https://flagcdn.com/w40/tz.png', NULL, NULL, NULL),
(231, 'Uganda', 'https://flagcdn.com/w40/ug.png', NULL, NULL, NULL),
(232, 'Ukraine', 'https://flagcdn.com/w40/ua.png', NULL, NULL, NULL),
(233, 'United States Minor Outlying Islands', 'https://flagcdn.com/w40/um.png', NULL, NULL, NULL),
(234, 'Uruguay', 'https://flagcdn.com/w40/uy.png', NULL, NULL, NULL),
(235, 'United States', 'https://flagcdn.com/w40/us.png', NULL, NULL, NULL),
(236, 'Uzbekistan', 'https://flagcdn.com/w40/uz.png', NULL, NULL, NULL),
(237, 'Holy See (Vatican City State)', 'https://flagcdn.com/w40/va.png', NULL, NULL, NULL),
(238, 'Saint Vincent and the Grenadines', 'https://flagcdn.com/w40/vc.png', NULL, NULL, NULL),
(239, 'Venezuela, Bolivarian Republic of', 'https://flagcdn.com/w40/ve.png', NULL, NULL, NULL),
(240, 'Virgin Islands, British', 'https://flagcdn.com/w40/vg.png', NULL, NULL, NULL),
(241, 'Virgin Islands, U.S.', 'https://flagcdn.com/w40/vi.png', NULL, NULL, NULL),
(242, 'Viet Nam', 'https://flagcdn.com/w40/vn.png', NULL, NULL, NULL),
(243, 'Vanuatu', 'https://flagcdn.com/w40/vu.png', NULL, NULL, NULL),
(244, 'Wallis and Futuna', 'https://flagcdn.com/w40/wf.png', NULL, NULL, NULL),
(245, 'Samoa', 'https://flagcdn.com/w40/ws.png', NULL, NULL, NULL),
(246, 'Yemen', 'https://flagcdn.com/w40/ye.png', NULL, NULL, NULL),
(247, 'South Africa', 'https://flagcdn.com/w40/za.png', NULL, NULL, NULL),
(248, 'Zambia', 'https://flagcdn.com/w40/zm.png', NULL, NULL, NULL),
(249, 'Zimbabwe', 'https://flagcdn.com/w40/zw.png', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coupon_code` varchar(191) DEFAULT NULL,
  `discount_type` varchar(191) NOT NULL DEFAULT 'fixed_price',
  `discount_value` double DEFAULT NULL,
  `categories` varchar(191) DEFAULT NULL,
  `valid_from` varchar(191) DEFAULT NULL,
  `valid_untill` varchar(191) DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `used_count` int(11) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `coupon_code`, `discount_type`, `discount_value`, `categories`, `valid_from`, `valid_untill`, `usage_limit`, `used_count`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'SUM25', 'pourcentage', 10, '4,2,3,5', '2025-02-04', '2026-02-23', 23, 0, 'Active', '2025-07-24 19:48:08', '2025-07-24 19:48:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(191) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `slug` varchar(191) DEFAULT NULL,
  `meta_title` varchar(191) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `schema_markup` text DEFAULT NULL,
  `category_id` int(11) NOT NULL DEFAULT -1,
  `city_id` int(11) NOT NULL DEFAULT -1,
  `car_type` varchar(191) DEFAULT NULL,
  `car_model` varchar(191) DEFAULT NULL,
  `vehicule_type` int(11) DEFAULT NULL,
  `vehicule_model` int(11) DEFAULT NULL,
  `service_type` varchar(191) DEFAULT NULL,
  `year` varchar(191) DEFAULT NULL,
  `fuel_type` varchar(191) DEFAULT NULL,
  `transmission` varchar(191) DEFAULT NULL,
  `seats` varchar(191) DEFAULT NULL,
  `doors` varchar(191) DEFAULT NULL,
  `provider_id` int(11) NOT NULL DEFAULT -1,
  `ac` varchar(191) DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `mileage_policy` varchar(191) DEFAULT NULL,
  `fuel_policy` varchar(191) DEFAULT NULL,
  `driver_requirement` varchar(191) DEFAULT NULL,
  `deposit_required` varchar(191) DEFAULT NULL,
  `deposit_amount` varchar(191) DEFAULT NULL,
  `deposit_note` varchar(191) DEFAULT NULL,
  `special_notes` text DEFAULT NULL,
  `pickup_info` text DEFAULT NULL,
  `boat_type` varchar(191) DEFAULT NULL,
  `with_captain` varchar(191) DEFAULT NULL,
  `capacity` varchar(191) DEFAULT NULL,
  `duration_options` varchar(191) DEFAULT NULL,
  `purpose_tags` varchar(191) DEFAULT NULL,
  `departure_location` varchar(191) DEFAULT NULL,
  `max_passengers` varchar(191) DEFAULT NULL,
  `max_luggage` varchar(191) DEFAULT NULL,
  `pickup_location` varchar(191) DEFAULT NULL,
  `languages_spoken` varchar(191) DEFAULT NULL,
  `activity_type` varchar(191) DEFAULT NULL,
  `schedule_options` varchar(191) DEFAULT NULL,
  `pickup` varchar(191) DEFAULT NULL,
  `meeting_point` varchar(191) DEFAULT NULL,
  `private_or_group` varchar(191) DEFAULT NULL,
  `group_size_min` varchar(191) DEFAULT NULL,
  `group_size_max` varchar(191) DEFAULT NULL,
  `difficulty` varchar(191) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `dealer_note` text DEFAULT NULL,
  `rental_terms` text DEFAULT NULL,
  `cancellation_policy` text DEFAULT NULL,
  `disclaimer` text DEFAULT NULL,
  `price_per_hour` double DEFAULT NULL,
  `price_per_half_day` double DEFAULT NULL,
  `price_per_day` double DEFAULT NULL,
  `price_per_week` double DEFAULT NULL,
  `price_per_month` double DEFAULT NULL,
  `price_per_person` double DEFAULT NULL,
  `price_per_group` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `slug`, `meta_title`, `meta_description`, `schema_markup`, `category_id`, `city_id`, `car_type`, `car_model`, `vehicule_type`, `vehicule_model`, `service_type`, `year`, `fuel_type`, `transmission`, `seats`, `doors`, `provider_id`, `ac`, `location`, `mileage_policy`, `fuel_policy`, `driver_requirement`, `deposit_required`, `deposit_amount`, `deposit_note`, `special_notes`, `pickup_info`, `boat_type`, `with_captain`, `capacity`, `duration_options`, `purpose_tags`, `departure_location`, `max_passengers`, `max_luggage`, `pickup_location`, `languages_spoken`, `activity_type`, `schedule_options`, `pickup`, `meeting_point`, `private_or_group`, `group_size_min`, `group_size_max`, `difficulty`, `short_description`, `description`, `dealer_note`, `rental_terms`, `cancellation_policy`, `disclaimer`, `price_per_hour`, `price_per_half_day`, `price_per_day`, `price_per_week`, `price_per_month`, `price_per_person`, `price_per_group`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'test', 'slug1', 'Dacia', 'Dacia meta', NULL, 2, 2, '59', '52', NULL, NULL, NULL, '2024', 'Petrol', 'Manual', '5', '4', 3, 'Yes', NULL, 'Unlimited km', 'Full to Full', '21-70 years', 'Yes', '100', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, 10, 20, 30, NULL, NULL, '2025-07-15 09:09:34', '2025-07-15 09:09:34', NULL),
(2, 'Dacia Logane', 'slug2', NULL, NULL, NULL, 2, 2, '59', '52', NULL, NULL, NULL, '2024', 'Diesel', 'Automatic', '5', '4', 3, 'Yes', NULL, 'Unlimited km', 'Full to Full', '21-70 years', 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, 16, 60, 200, NULL, NULL, '2025-07-15 09:15:44', '2025-07-15 09:15:44', NULL),
(3, 'Hyndai Accent CTM', 'slug3', NULL, NULL, NULL, 2, 3, '60', '54', NULL, NULL, NULL, '2023', 'Petrol', 'Manual', '5', '4', 3, 'Yes', NULL, '100 km/day', 'Same to Same', '26-70 years', 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, 30, 60, 200, NULL, NULL, '2025-07-15 09:18:25', '2025-07-15 09:18:25', NULL),
(4, 'Fiat Tipo', 'slug4', NULL, NULL, NULL, 2, 3, '59', '52', NULL, NULL, NULL, '2024', 'Petrol', 'Manual', '4', '4', 3, 'Yes', NULL, '100 km/day', 'Full to Full', '21-70 years', 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, 20, 60, 200, NULL, NULL, '2025-07-15 09:21:16', '2025-07-15 09:21:16', NULL),
(5, 'VW Golf 8', 'slug5', NULL, NULL, NULL, 2, 3, '61', '52', NULL, NULL, NULL, '2023', 'Diesel', 'Manual', '4', '4', 3, 'Yes', NULL, '100 km/day', 'Full to Full', '21-70 years', 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, 15, 60, 100, NULL, NULL, '2025-07-15 09:23:08', '2025-07-15 09:23:08', NULL),
(6, 'Nissan', 'slug6', NULL, NULL, NULL, 3, 3, NULL, NULL, 72, 71, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10', '10', 'Airport', 'English,French', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(7, 'Iveco', 'slug7', NULL, NULL, NULL, 3, 3, NULL, NULL, 73, 76, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10', '6', 'airport', 'French', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(8, 'Renault Kangoo', 'slug8', NULL, NULL, NULL, 3, 3, NULL, NULL, 73, 71, NULL, NULL, NULL, NULL, NULL, NULL, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5', '10', 'Airport', 'English', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-15 09:29:21', '2025-07-15 09:29:21', NULL),
(9, 'Renault Master 12M3', 'slug9', NULL, NULL, NULL, 3, 3, NULL, NULL, 72, 77, NULL, NULL, NULL, NULL, NULL, NULL, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4', '10', 'Airport', 'English', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL),
(10, 'Bali 4.4 | La Calma', 'slug10', NULL, NULL, NULL, 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '55', 'Yes', '10', '2h', 'Family Outing', 'Agadir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, 10, 20, 30, NULL, NULL, NULL, NULL, '2025-07-15 13:19:06', '2025-07-15 13:19:06', NULL),
(11, 'Jeanneau Sun Odyssey 479', 'slug11', NULL, NULL, NULL, 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '56', 'Yes', '40', 'Full-Day', 'Fishing Trip', 'Agadir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, 10, 20, 30, NULL, NULL, NULL, NULL, '2025-07-15 13:20:38', '2025-07-15 13:20:38', NULL),
(12, 'Beneteau Oceanis 45', 'slug12', NULL, NULL, NULL, 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '67', 'No', '23', 'Half-Day', 'Romantic Experience', 'Agadir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, 10, 20, 30, NULL, NULL, NULL, NULL, '2025-07-15 13:22:15', '2025-07-15 13:22:15', NULL),
(13, 'Delta 365', 'slug13', NULL, NULL, NULL, 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '56', 'Yes', '15', 'Half-Day', 'Private Cruise', 'Agadir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, 15, 20, 40, NULL, NULL, NULL, NULL, '2025-07-15 13:23:27', '2025-07-15 13:23:27', NULL),
(14, 'Boat Casablanca', 'slug14', NULL, NULL, NULL, 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '56', 'Yes', '10', 'Half-Day', 'Family Outing', 'Casablanca', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, 10, 20, 30, NULL, NULL, NULL, NULL, '2025-07-15 13:36:22', '2025-07-15 13:36:22', NULL),
(15, 'Quad Bike Tour', 'slug15', NULL, NULL, NULL, 5, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1h', NULL, NULL, NULL, NULL, NULL, 'English', '57', NULL, 'Yes', 'Agadir Centre', 'Private', NULL, NULL, 'Easy', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-15 13:41:00', '2025-07-15 13:41:00', NULL),
(16, 'Buggy Tour', 'guad', NULL, NULL, NULL, 5, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Half-Day', NULL, NULL, NULL, NULL, NULL, 'French', '58', NULL, 'No', 'Agadir Centre', 'Group', '5', '10', 'Hard', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-15 13:42:52', '2025-07-15 13:42:52', NULL),
(17, 'Buggy Rover', 'slug17', NULL, NULL, NULL, 5, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Half-Day', NULL, NULL, NULL, NULL, NULL, 'French', '58', NULL, 'Yes', 'Agadir Centre', 'Private', NULL, NULL, 'Medium', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-15 13:44:18', '2025-07-15 13:44:18', NULL),
(18, 'Horse Ride Tour', 'slug18', NULL, NULL, NULL, 5, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3h', NULL, NULL, NULL, NULL, NULL, 'French', '57', NULL, 'Yes', 'Agadir Centre', 'Private', NULL, NULL, 'Medium', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-15 13:45:35', '2025-07-15 13:45:35', NULL),
(19, 'test', 'slug19', NULL, NULL, NULL, 2, 3, '59', '54', NULL, NULL, NULL, '2021', 'Hybrid', 'Manual', '5', '4', 3, 'Yes', NULL, '100 km/day', 'Full to Full', '21-70 years', 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, 10, 20, 30, NULL, NULL, '2025-07-15 15:25:43', '2025-07-15 15:25:43', NULL),
(20, 'tst 3', 'slug-bt23', NULL, NULL, NULL, 2, 2, '60', '52', NULL, NULL, NULL, '2024', 'Hybrid', 'Manual', '5', '5', 3, 'Yes', NULL, 'Unlimited km', 'Full to Full', '21-70 years', 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', 'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.', NULL, NULL, NULL, NULL, NULL, NULL, 10, 20, 30, NULL, NULL, '2025-07-15 16:17:45', '2025-07-15 16:17:45', NULL),
(21, 'boat test agadir', '', 'test', 'asny adkd a;dd adj', 'aefqskdugsf', 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets</p>', NULL, '55', 'Yes', '10', '2h', 'Fishing Trip', 'agadir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets</p>', '<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets', NULL, NULL, NULL, 13, 55, 116, NULL, NULL, NULL, NULL, '2025-07-24 19:41:17', '2025-07-24 19:41:17', NULL),
(22, 'boat test casablanca', '-1', 'test', 'had nika gaaah', 'lalaqkid', 4, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>', NULL, '67', 'Yes', '20', '1h,2h,3h,Half-Day,Full-Day', 'Romantic Experience,Family Outing,Sunset Cruise', 'agadir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>', '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their', NULL, NULL, NULL, 11, 55, 115, NULL, NULL, NULL, NULL, '2025-07-24 19:46:20', '2025-07-24 19:46:20', NULL),
(23, 'test boat marrakech', '-2', 'test', 'kaalij', 'abankij', 4, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing</p>', NULL, '56', 'Yes', '23', '1h,3h,Half-Day', 'Family Outing,Sunset Cruise,Birthday Celebration,Luxury Experience', 'agadir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing</p>', '<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing</p>', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing', NULL, NULL, NULL, 13, 45, 119, NULL, NULL, NULL, NULL, '2025-07-24 19:50:00', '2025-07-24 19:50:00', NULL),
(24, 'التجلج على الرمال فاس', '-3', 'test', 'alanike sdvqdv', 'qdvqd zkgsKJ', 5, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock</p>', NULL, NULL, NULL, NULL, '1h,2h,3h,Half-Day,Full-Day', NULL, NULL, NULL, NULL, NULL, 'English,French,Arabic,Spanish', '58', NULL, 'Yes', 'fes', 'Private', NULL, NULL, 'Medium', '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,</p>', '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,</p>', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(25, 'surf naaady', '-4', 'test', 'anaaki jan kal', 'anaaki jan kal', 5, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>', NULL, NULL, NULL, NULL, '2h,3h,Half-Day', NULL, NULL, NULL, NULL, NULL, 'French', '79', NULL, 'Yes', 'fes', 'Private', NULL, NULL, 'Medium', '<p>need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>', '<p>need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>', 'need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(26, 'HADL', '-5', 'anaaki jan kal', 'anaaki jan kal', 'anaaki jan kal', 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>anaaki jan kal</p>', NULL, '56', 'Yes', '23', '2h,3h', 'Fishing Trip', 'agadir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>anaaki jan kal</p>', '<p>anaaki jan kal</p>', 'anaaki jan kal', NULL, NULL, NULL, 15, 55, 115, NULL, NULL, NULL, NULL, '2025-07-24 20:36:27', '2025-07-24 20:36:27', NULL),
(27, 'camel ride', 'camel-ride-essaouira', 'camel ride essaouira', 'this is  camel ride essaouira hope you get it', NULL, 5, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>he cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.</p>', NULL, NULL, NULL, NULL, '1h,2h,3h', NULL, NULL, NULL, NULL, NULL, 'English', '78', NULL, 'Yes', 'mogador', 'Private', NULL, NULL, 'Medium', '<p>he cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.</p>', '<p>he cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.</p>', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-24 20:44:12', '2025-07-24 20:44:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listing_addons`
--

CREATE TABLE `listing_addons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `addon` varchar(191) DEFAULT NULL,
  `category_id` int(11) NOT NULL DEFAULT -1,
  `price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listing_addons`
--

INSERT INTO `listing_addons` (`id`, `addon`, `category_id`, `price`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Extra Driver', 2, 10, '2025-07-22 12:59:19', '2025-07-22 12:59:19', NULL),
(2, 'Child Seat', 2, 20, '2025-07-22 12:59:30', '2025-07-22 12:59:30', NULL),
(3, 'Booster Seat', 2, 15, '2025-07-22 12:59:43', '2025-07-22 12:59:43', NULL),
(4, 'Sunset Cruise Upgrade', 4, 12, '2025-07-24 19:37:30', '2025-07-24 19:37:30', NULL),
(5, 'Water Sports Equipment', 4, 13, '2025-07-24 19:37:47', '2025-07-24 19:37:47', NULL),
(6, 'Private Chef', 4, 19, '2025-07-24 19:38:07', '2025-07-24 19:38:07', NULL),
(7, 'Multilingual Tour Guide', 3, 23, '2025-07-24 19:38:34', '2025-07-24 19:38:34', NULL),
(8, 'Wi-Fi Onboard', 3, 33, '2025-07-24 19:38:51', '2025-07-24 19:38:51', NULL),
(9, 'Child Seat', 3, 12, '2025-07-24 19:39:06', '2025-07-24 19:39:06', NULL),
(10, 'Photo & Video Souvenir Package', 5, 23, '2025-07-24 19:39:20', '2025-07-24 19:39:20', NULL),
(11, 'Offer Moroccan tea', 5, 24, '2025-07-24 19:39:47', '2025-07-24 19:39:47', NULL),
(12, 'Insurance or Safety', 5, 24, '2025-07-24 19:40:03', '2025-07-24 19:40:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listing_addon_affecteds`
--

CREATE TABLE `listing_addon_affecteds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `addon_id` int(11) NOT NULL DEFAULT -1,
  `listing_id` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listing_addon_affecteds`
--

INSERT INTO `listing_addon_affecteds` (`id`, `addon_id`, `listing_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 3, NULL, NULL, NULL),
(2, 2, 3, NULL, NULL, NULL),
(3, 3, 3, NULL, NULL, NULL),
(4, 6, 21, '2025-07-24 19:41:17', '2025-07-24 19:41:17', NULL),
(5, 6, 22, '2025-07-24 19:46:20', '2025-07-24 19:46:20', NULL),
(6, 5, 22, '2025-07-24 19:46:20', '2025-07-24 19:46:20', NULL),
(7, 5, 23, '2025-07-24 19:50:00', '2025-07-24 19:50:00', NULL),
(8, 11, 24, '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(9, 12, 25, '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(10, 11, 27, '2025-07-24 20:44:12', '2025-07-24 20:44:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listing_galleries`
--

CREATE TABLE `listing_galleries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `listing_id` int(11) NOT NULL DEFAULT -1,
  `file_name` varchar(191) DEFAULT NULL,
  `file_path` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listing_galleries`
--

INSERT INTO `listing_galleries` (`id`, `listing_id`, `file_name`, `file_path`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, NULL, 'images/listings/listing_68761c4041ea6.webp', '2025-07-15 09:15:44', '2025-07-15 09:15:44', NULL),
(2, 3, NULL, 'images/listings/listing_68761ce186587.webp', '2025-07-15 09:18:25', '2025-07-15 09:18:25', NULL),
(3, 4, NULL, 'images/listings/listing_68761d8cc62fb.webp', '2025-07-15 09:21:16', '2025-07-15 09:21:16', NULL),
(4, 5, NULL, 'images/listings/listing_68761dfc7ae82.webp', '2025-07-15 09:23:08', '2025-07-15 09:23:08', NULL),
(5, 6, NULL, 'images/listings/listing_68761ebb0e7fe.png', '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(6, 7, NULL, 'images/listings/listing_68761f081ab08.png', '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(7, 8, NULL, 'images/listings/listing_68761f71ed66b.png', '2025-07-15 09:29:21', '2025-07-15 09:29:21', NULL),
(8, 9, NULL, 'images/listings/listing_68761fc251adf.webp', '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL),
(9, 10, NULL, 'images/listings/listing_6876554ab6dd4.webp', '2025-07-15 13:19:06', '2025-07-15 13:19:06', NULL),
(10, 11, NULL, 'images/listings/listing_687655a6121aa.webp', '2025-07-15 13:20:38', '2025-07-15 13:20:38', NULL),
(11, 12, NULL, 'images/listings/listing_68765607eab77.webp', '2025-07-15 13:22:15', '2025-07-15 13:22:15', NULL),
(12, 13, NULL, 'images/listings/listing_6876564f54c56.webp', '2025-07-15 13:23:27', '2025-07-15 13:23:27', NULL),
(13, 14, NULL, 'images/listings/listing_68765956779dd.webp', '2025-07-15 13:36:22', '2025-07-15 13:36:22', NULL),
(14, 15, NULL, 'images/listings/listing_68765a6cc3fb9.jpg', '2025-07-15 13:41:00', '2025-07-15 13:41:00', NULL),
(15, 16, NULL, 'images/listings/listing_68765adc9f3a6.jpg', '2025-07-15 13:42:52', '2025-07-15 13:42:52', NULL),
(16, 17, NULL, 'images/listings/listing_68765b3287fc1.jpg', '2025-07-15 13:44:18', '2025-07-15 13:44:18', NULL),
(17, 18, NULL, 'images/listings/listing_68765b7f43f79.jpg', '2025-07-15 13:45:35', '2025-07-15 13:45:35', NULL),
(18, 19, NULL, 'images/listings/listing_687672f776d33.jpg', '2025-07-15 15:25:43', '2025-07-15 15:25:43', NULL),
(19, 20, NULL, 'images/listings/listing_68767f29968b8.jpg', '2025-07-15 16:17:45', '2025-07-15 16:17:45', NULL),
(20, 21, NULL, 'images/listings/listing_68827e4d95b8e.jpg', '2025-07-24 19:41:17', '2025-07-24 19:41:17', NULL),
(21, 22, NULL, 'images/listings/listing_68827f7c7dff8.jpg', '2025-07-24 19:46:20', '2025-07-24 19:46:20', NULL),
(22, 23, NULL, 'images/listings/listing_688280589d5a9.jpg', '2025-07-24 19:50:00', '2025-07-24 19:50:00', NULL),
(23, 24, NULL, 'images/listings/listing_688285afd11b5.jpg', '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(24, 24, NULL, 'images/listings/listing_688285afd1cea.jpg', '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(25, 24, NULL, 'images/listings/listing_688285afd1ebd.jpg', '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(26, 25, NULL, 'images/listings/listing_688289c4636ce.jpg', '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(27, 25, NULL, 'images/listings/listing_688289c4644a8.jpg', '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(28, 25, NULL, 'images/listings/listing_688289c464753.jpg', '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(29, 26, NULL, 'images/listings/listing_68828b3b69be9.jpg', '2025-07-24 20:36:27', '2025-07-24 20:36:27', NULL),
(30, 26, NULL, 'images/listings/listing_68828b3b6adbf.jpg', '2025-07-24 20:36:27', '2025-07-24 20:36:27', NULL),
(31, 26, NULL, 'images/listings/listing_68828b3b6aff3.jpg', '2025-07-24 20:36:27', '2025-07-24 20:36:27', NULL),
(32, 26, NULL, 'images/listings/listing_68828b3b6b1e8.jpg', '2025-07-24 20:36:27', '2025-07-24 20:36:27', NULL),
(33, 26, NULL, 'images/listings/listing_68828b3b6b3fc.jpg', '2025-07-24 20:36:27', '2025-07-24 20:36:27', NULL),
(34, 27, NULL, 'images/listings/listing_68828d0c54408.jpg', '2025-07-24 20:44:12', '2025-07-24 20:44:12', NULL),
(35, 27, NULL, 'images/listings/listing_68828d0c5505a.jpg', '2025-07-24 20:44:12', '2025-07-24 20:44:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listing_includeds`
--

CREATE TABLE `listing_includeds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item` varchar(191) DEFAULT NULL,
  `listing_id` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listing_includeds`
--

INSERT INTO `listing_includeds` (`id`, `item`, `listing_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Fuel', 2, '2025-07-15 09:15:44', '2025-07-15 09:15:44', NULL),
(2, 'Life Jackets', 2, '2025-07-15 09:15:44', '2025-07-15 09:15:44', NULL),
(3, 'WI-FI', 2, '2025-07-15 09:15:44', '2025-07-15 09:15:44', NULL),
(4, 'Fuel', 3, '2025-07-15 09:18:25', '2025-07-15 09:18:25', NULL),
(5, 'Life Jackets', 3, '2025-07-15 09:18:25', '2025-07-15 09:18:25', NULL),
(6, 'WI-FI', 3, '2025-07-15 09:18:25', '2025-07-15 09:18:25', NULL),
(7, 'Fuel', 4, '2025-07-15 09:21:16', '2025-07-15 09:21:16', NULL),
(8, 'Life Jackets', 4, '2025-07-15 09:21:16', '2025-07-15 09:21:16', NULL),
(9, 'WI-FI', 4, '2025-07-15 09:21:16', '2025-07-15 09:21:16', NULL),
(10, 'Fuel', 5, '2025-07-15 09:23:08', '2025-07-15 09:23:08', NULL),
(11, 'Life Jackets', 5, '2025-07-15 09:23:08', '2025-07-15 09:23:08', NULL),
(12, 'WI-FI', 5, '2025-07-15 09:23:08', '2025-07-15 09:23:08', NULL),
(13, 'Fuel', 6, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(14, 'Life Jackets', 6, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(15, 'WI-FI', 6, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(16, 'sah', 21, '2025-07-24 19:41:17', '2025-07-24 19:41:17', NULL),
(17, 'sah', 22, '2025-07-24 19:46:20', '2025-07-24 19:46:20', NULL),
(18, 'ssaq', 23, '2025-07-24 19:50:00', '2025-07-24 19:50:00', NULL),
(19, 'sah', 24, '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(20, 'ssaq', 25, '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(21, 'test 1', 27, '2025-07-24 20:44:12', '2025-07-24 20:44:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listing_not_includeds`
--

CREATE TABLE `listing_not_includeds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item` varchar(191) DEFAULT NULL,
  `listing_id` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listing_not_includeds`
--

INSERT INTO `listing_not_includeds` (`id`, `item`, `listing_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Meals', 2, '2025-07-15 09:15:44', '2025-07-15 09:15:44', NULL),
(2, 'Tips', 2, '2025-07-15 09:15:44', '2025-07-15 09:15:44', NULL),
(3, 'Meals', 3, '2025-07-15 09:18:25', '2025-07-15 09:18:25', NULL),
(4, 'Tips', 3, '2025-07-15 09:18:25', '2025-07-15 09:18:25', NULL),
(5, 'Meals', 4, '2025-07-15 09:21:16', '2025-07-15 09:21:16', NULL),
(6, 'Tips', 4, '2025-07-15 09:21:16', '2025-07-15 09:21:16', NULL),
(7, 'Meals', 5, '2025-07-15 09:23:08', '2025-07-15 09:23:08', NULL),
(8, 'Tips', 5, '2025-07-15 09:23:08', '2025-07-15 09:23:08', NULL),
(9, 'Meals', 6, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(10, 'Tips', 6, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(11, 'azdhlzkfh', 21, '2025-07-24 19:41:17', '2025-07-24 19:41:17', NULL),
(12, 'azdhlzkfh', 22, '2025-07-24 19:46:20', '2025-07-24 19:46:20', NULL),
(13, 'efffez', 23, '2025-07-24 19:50:00', '2025-07-24 19:50:00', NULL),
(14, 'azdhlzkfh', 24, '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(15, 'azdhlzkfh', 25, '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(16, 'test', 27, '2025-07-24 20:44:12', '2025-07-24 20:44:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listing_pricings`
--

CREATE TABLE `listing_pricings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `listing_id` int(11) NOT NULL DEFAULT -1,
  `element` varchar(191) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listing_pricings`
--

INSERT INTO `listing_pricings` (`id`, `listing_id`, `element`, `price`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 15, '1h', 10, '2025-07-15 13:41:00', '2025-07-15 13:41:00', NULL),
(2, 15, '2h', 20, '2025-07-15 13:41:00', '2025-07-15 13:41:00', NULL),
(3, 15, '3h', 30, '2025-07-15 13:41:00', '2025-07-15 13:41:00', NULL),
(4, 16, '1h', 10, '2025-07-15 13:42:52', '2025-07-15 13:42:52', NULL),
(5, 16, '2h', 20, '2025-07-15 13:42:52', '2025-07-15 13:42:52', NULL),
(6, 16, '3h', 30, '2025-07-15 13:42:52', '2025-07-15 13:42:52', NULL),
(7, 17, '1h', 10, '2025-07-15 13:44:18', '2025-07-15 13:44:18', NULL),
(8, 17, '2h', 20, '2025-07-15 13:44:18', '2025-07-15 13:44:18', NULL),
(9, 17, '3h', 30, '2025-07-15 13:44:18', '2025-07-15 13:44:18', NULL),
(10, 18, '1h', 10, '2025-07-15 13:45:35', '2025-07-15 13:45:35', NULL),
(11, 18, '2h', 20, '2025-07-15 13:45:35', '2025-07-15 13:45:35', NULL),
(12, 19, '3h', 30, '2025-07-15 13:45:35', '2025-07-15 13:45:35', NULL),
(13, 24, 'camel with tea', 50, '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(14, 24, 'camel only', 25, '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(15, 25, 'camel with tea', 34, '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(16, 25, 'GRET', 43, '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(17, 25, 'TREF', 43, '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(18, 27, 'full day', 67, '2025-07-24 20:44:12', '2025-07-24 20:44:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listing_schedules`
--

CREATE TABLE `listing_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `listing_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listing_schedules`
--

INSERT INTO `listing_schedules` (`id`, `title`, `listing_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '08:00', 15, '2025-07-15 13:41:00', '2025-07-15 13:41:00', NULL),
(2, '10:00', 15, '2025-07-15 13:41:00', '2025-07-15 13:41:00', NULL),
(3, '08:00', 16, '2025-07-15 13:42:52', '2025-07-15 13:42:52', NULL),
(4, '10:00', 16, '2025-07-15 13:42:52', '2025-07-15 13:42:52', NULL),
(5, '12:00', 16, '2025-07-15 13:42:52', '2025-07-15 13:42:52', NULL),
(6, 'ahan', 24, '2025-07-24 20:12:47', '2025-07-24 20:12:47', NULL),
(7, 'ahan', 25, '2025-07-24 20:30:12', '2025-07-24 20:30:12', NULL),
(8, 'morning', 27, '2025-07-24 20:44:12', '2025-07-24 20:44:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1),
(9, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(10, '2022_12_12_130619_create_societes_table', 1),
(11, '2024_05_07_111455_create_notifications_table', 1),
(12, '2024_12_04_205617_create_jobs_table', 1),
(13, '2025_03_03_123544_create_brands_table', 1),
(14, '2025_04_21_211048_create_categories_table', 2),
(15, '2025_04_21_211431_create_sub_categories_table', 3),
(16, '2025_04_28_112615_create_cities_table', 4),
(27, '2025_04_28_113624_create_agencies_table', 11),
(53, '2025_04_28_113652_create_listings_table', 29),
(22, '2025_04_29_175937_create_sub_category_options_table', 7),
(25, '2025_04_29_212337_create_agency_features_table', 9),
(26, '2025_04_29_224551_create_agency_sub_categories_table', 10),
(28, '2025_05_05_171316_create_listing_addons_table', 12),
(29, '2025_05_05_201957_create_listing_galleries_table', 13),
(33, '2025_05_06_132711_create_listing_includeds_table', 15),
(34, '2025_05_06_132910_create_listing_not_includeds_table', 16),
(35, '2025_05_06_175639_create_listing_addon_affecteds_table', 17),
(38, '2025_05_14_120603_create_listing_pricings_table', 19),
(39, '2025_05_14_131234_create_terms_and_conditions_table', 20),
(56, '2025_05_14_180450_create_bookings_table', 30),
(41, '2025_05_14_181358_create_booking_addons_table', 22),
(43, '2025_05_16_104332_create_countries_table', 24),
(49, '2025_05_23_144034_create_coupons_table', 26),
(52, '2025_05_26_200849_create_private_listing_pricings_table', 28),
(57, '2025_06_10_122119_create_ammenies_table', 31),
(58, '2025_06_10_152329_create_amenities_table', 32),
(59, '2025_06_10_174732_create_listing_schedules_table', 33),
(61, '2025_07_14_142948_create_articles_table', 34),
(62, '2025_07_22_181321_create_pages_table', 35);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `message` varchar(191) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_obj` int(11) DEFAULT NULL,
  `type` varchar(191) DEFAULT NULL,
  `seen` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(191) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(191) NOT NULL,
  `meta_title` varchar(191) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `schema_markup` longtext DEFAULT NULL,
  `content_sections` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content_sections`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `slug`, `meta_title`, `meta_description`, `schema_markup`, `content_sections`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '/', 'Marhire: Car Rental CTM', 'Marhire: Car Rental Booking CTM', '<script type=\"application/ld+json\">\r\n{\r\n  \"@context\": \"https://schema.org\",\r\n  \"@type\": \"CarRental\",\r\n  \"name\": \"MarHire Car Rental\",\r\n  \"description\": \"Affordable car rental services with and without driver in Morocco. Pickup at airport or city center.\",\r\n  \"url\": \"https://yourdomain.com\",\r\n  \"logo\": \"https://yourdomain.com/images/logo.png\",\r\n  \"telephone\": \"+212600000000\",\r\n  \"address\": {\r\n    \"@type\": \"PostalAddress\",\r\n    \"streetAddress\": \"123 Boulevard Zerktouni\",\r\n    \"addressLocality\": \"Casablanca\",\r\n    \"addressRegion\": \"Casablanca-Settat\",\r\n    \"postalCode\": \"20000\",\r\n    \"addressCountry\": \"MA\"\r\n  },\r\n  \"openingHours\": \"Mo-Su 08:00-22:00\",\r\n  \"sameAs\": [\r\n    \"https://www.facebook.com/marhire\",\r\n    \"https://www.instagram.com/marhire\"\r\n  ],\r\n  \"priceRange\": \"$$\",\r\n  \"aggregateRating\": {\r\n    \"@type\": \"AggregateRating\",\r\n    \"ratingValue\": \"4.6\",\r\n    \"reviewCount\": \"190\"\r\n  }\r\n}\r\n</script>', '[{\"text\": \"The freedom of the open road is so appealing for good reason: Having your own set of wheels puts you in control of what you\'re doing and when you\'re doing it. When you rent a car, there\'s no need to worry about public transport that\'s delayed...\", \"title\": \"Reasons to rent a car\"}, {\"text\": \"Car class and supplier: Economy, compact, midsize, convertible... there are all kinds of cars to choose from and each comes with its own conditions.\", \"title\": \"Things to look out for\"}, {\"text\": \"Input your desired pick-up/drop-off points and dates in the search field at the top of the page. If you\'ve got a specific collection or return time in mind, you can add it here, too...\", \"title\": \"How to book your rental car\"}, {\"text\": \"If you\'re renting a car within the US, whether as a one-way rental or a long-term one, your personal auto insurance might cover you...\", \"title\": \"Insurance requirements\"}, {\"text\": \"Certain rental car providers might ask you to provide a credit card or put down a deposit before you drive off into the sunset.\", \"title\": \"Deposits and debit cards\"}, {\"text\": \"CTM\", \"title\": \"CTM\"}]', '2025-07-22 18:11:51', '2025-07-23 21:37:47', NULL),
(2, 'about-us', 'Marhire: About us CTM', 'About us meta', NULL, '[{\"text\": \"The freedom of the open road is so appealing for good reason: Having your own set of wheels puts you in control of what you\'re doing and when you\'re doing it. When you rent a car, there\'s no need to worry about public transport that\'s delayed...\", \"title\": \"Reasons to rent a car\"}, {\"text\": \"Car class and supplier: Economy, compact, midsize, convertible... there are all kinds of cars to choose from and each comes with its own conditions.\", \"title\": \"Things to look out for\"}, {\"text\": \"Input your desired pick-up/drop-off points and dates in the search field at the top of the page. If you\'ve got a specific collection or return time in mind, you can add it here, too...\", \"title\": \"How to book your rental car\"}, {\"text\": \"If you\'re renting a car within the US, whether as a one-way rental or a long-term one, your personal auto insurance might cover you...\", \"title\": \"Insurance requirements\"}, {\"text\": \"Certain rental car providers might ask you to provide a credit card or put down a deposit before you drive off into the sunset.\", \"title\": \"Deposits and debit cards\"}]', '2025-07-22 18:12:56', '2025-07-23 21:40:09', NULL),
(3, 'how-we-work', 'Marhire: How we Work', 'Marhire: How we Work Meta', NULL, NULL, '2025-07-22 18:14:22', '2025-07-22 18:14:22', NULL),
(4, 'list-your-property', 'List Your Property or Service on MarHire', 'List Your Property or Service on MarHire Meta', NULL, NULL, '2025-07-22 18:15:06', '2025-07-22 18:15:06', NULL),
(5, 'faq', 'Marhire: FAQ', 'Marhire: FAQ Meta', NULL, NULL, '2025-07-22 18:15:30', '2025-07-22 18:15:30', NULL),
(6, 'blog', 'Marhire: Blog CTM', 'Marhire: Blog Meta', NULL, NULL, '2025-07-22 18:16:18', '2025-07-23 21:40:33', NULL),
(7, 'terms-conditions', 'Marhire: Terms & conditions', 'Marhire: Terms & conditions meta', NULL, NULL, '2025-07-22 18:16:50', '2025-07-22 18:16:50', NULL),
(8, 'privacy-policy', 'Marhire: Privacy Policy', 'Marhire: Privacy Policy meta', NULL, NULL, '2025-07-22 18:17:18', '2025-07-22 18:17:18', NULL),
(9, 'cookie-policy', 'Marhire: Cookie Policy', 'Marhire: Cookie Policy meta', NULL, NULL, '2025-07-22 18:17:43', '2025-07-22 18:17:43', NULL),
(10, 'cancellation-policy', 'Marhire: Cancellation Policy', 'Marhire: Cancellation Policy meta', NULL, NULL, '2025-07-22 18:18:09', '2025-07-22 18:18:09', NULL),
(11, 'insurance-conditions', 'Marhire: Insurance Conditions', 'Marhire: Insurance Conditions meta', NULL, NULL, '2025-07-22 18:18:39', '2025-07-22 18:18:39', NULL),
(12, 'category/car-rental', 'Car Rental in Morocco | Cheap Prices, No Deposit, Free Pickup – MarHire CTM', 'Compare & book car rentals across Morocco with no deposit, unlimited kilometers, and airport pickup. Full insurance included. Book with MarHire – trusted local partners.', NULL, '[{\"text\": \"ee\", \"title\": \"cc\"}]', '2025-07-22 18:19:36', '2025-07-23 21:41:38', NULL),
(13, 'category/private-driver', 'Private Driver Morocco | Book Chauffeur & Airport Transfers – MarHire', 'Hire a private driver in Morocco for business, airport pickup, or guided day tours. Multilingual chauffeurs. No deposit. Fixed price. 24/7 support.', NULL, NULL, '2025-07-22 18:19:54', '2025-07-22 19:04:12', NULL),
(14, 'category/boats', 'Boat Rental in Morocco | Private Cruises, Fishing & Sunset Tours – MarHire', 'Rent boats, yachts, and speedboats in Morocco with captain included. Private tours, sunset cruises, fishing trips, and party boats. Book online with MarHire.', NULL, NULL, '2025-07-22 18:20:12', '2025-07-22 19:04:48', NULL),
(15, 'category/things-to-do', 'Things to Do in Morocco | Top Tours, Activities & Experiences – MarHire', 'Discover the best things to do in Morocco. Book camel rides, quad tours, food classes & cultural activities. Free cancellation. Local guides. Verified partners.', NULL, NULL, '2025-07-22 18:20:32', '2025-07-22 19:05:26', NULL),
(16, 'city/*', '$CITY Travel Services | Car Rental, Drivers, Boats & Tours – MarHire CTM', 'Explore verified travel services in $CITY with MarHire. Rent cars with no deposit, book private drivers, enjoy boat trips & tours. Transparent pricing, local experts.', NULL, '[{\"text\": \"The freedom of the open road is so appealing for good reason: Having your own set of wheels puts you in control of what you\'re doing and when you\'re doing it. When you rent a car, there\'s no need to worry about public transport that\'s delayed...\", \"title\": \"Reasons to rent a car\"}, {\"text\": \"Input your desired pick-up/drop-off points and dates in the search field at the top of the page. If you\'ve got a specific collection or return time in mind, you can add it here, too...\", \"title\": \"How to book your rental car\"}, {\"text\": \"Car class and supplier: Economy, compact, midsize, convertible... there are all kinds of cars to choose from and each comes with its own conditions.\", \"title\": \"Things to look out for\"}, {\"text\": \"If you\'re renting a car within the US, whether as a one-way rental or a long-term one, your personal auto insurance might cover you...\", \"title\": \"Insurance requirements\"}, {\"text\": \"Certain rental car providers might ask you to provide a credit card or put down a deposit before you drive off into the sunset.\", \"title\": \"Deposits and debit cards\"}]', '2025-07-22 19:11:26', '2025-07-23 21:42:28', NULL),
(17, 'agency/*', '$AGENCY - Rental Agency CTM', '$AGENCY - Rental Agency meta', NULL, NULL, '2025-07-22 19:19:52', '2025-07-23 21:43:11', NULL),
(18, 'category/car-rental/$city', 'Car Rental in $city', 'META in $city', NULL, '[{\"text\": \"Car Rental in $city\", \"title\": \"Car Rental in $city\"}]', '2025-07-23 10:57:34', '2025-07-23 21:44:14', NULL),
(19, 'category/private-driver/$city', 'Private driver in $city', NULL, NULL, NULL, '2025-07-23 10:57:59', '2025-07-23 10:57:59', NULL),
(20, 'category/boats/$city', 'Boat Rental in $city', NULL, NULL, NULL, '2025-07-23 10:59:38', '2025-07-23 10:59:38', NULL),
(21, 'category/things-to-do/$city', 'Things To Do in $city', NULL, NULL, NULL, '2025-07-23 11:00:04', '2025-07-23 11:00:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `private_listing_pricings`
--

CREATE TABLE `private_listing_pricings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `listing_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `airport_one` double NOT NULL DEFAULT 0,
  `airport_round` double NOT NULL DEFAULT 0,
  `intercity_one` double NOT NULL DEFAULT 0,
  `intercity_round` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `private_listing_pricings`
--

INSERT INTO `private_listing_pricings` (`id`, `listing_id`, `city_id`, `airport_one`, `airport_round`, `intercity_one`, `intercity_round`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 6, 3, 10, 20, 30, 40, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(2, 6, 2, 10, 20, 30, 40, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(3, 6, 6, 10, 20, 30, 40, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(4, 6, 5, 10, 20, 30, 40, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(5, 6, 4, 10, 20, 30, 40, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(6, 6, 7, 0, 0, 0, 0, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(7, 6, 8, 0, 0, 0, 0, '2025-07-15 09:26:19', '2025-07-15 09:26:19', NULL),
(8, 7, 3, 10, 20, 30, 40, '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(9, 7, 2, 10, 20, 30, 40, '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(10, 7, 6, 10, 20, 30, 40, '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(11, 7, 5, 0, 0, 0, 0, '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(12, 7, 4, 0, 0, 0, 0, '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(13, 7, 7, 0, 0, 0, 0, '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(14, 7, 8, 0, 0, 0, 0, '2025-07-15 09:27:36', '2025-07-15 09:27:36', NULL),
(15, 8, 3, 10, 20, 30, 40, '2025-07-15 09:29:21', '2025-07-15 09:29:21', NULL),
(16, 8, 2, 10, 20, 30, 40, '2025-07-15 09:29:21', '2025-07-15 09:29:21', NULL),
(17, 8, 6, 10, 20, 30, 40, '2025-07-15 09:29:21', '2025-07-15 09:29:21', NULL),
(18, 8, 5, 0, 0, 0, 0, '2025-07-15 09:29:22', '2025-07-15 09:29:22', NULL),
(19, 8, 4, 0, 0, 0, 0, '2025-07-15 09:29:22', '2025-07-15 09:29:22', NULL),
(20, 8, 7, 0, 0, 0, 0, '2025-07-15 09:29:22', '2025-07-15 09:29:22', NULL),
(21, 8, 8, 0, 0, 0, 0, '2025-07-15 09:29:22', '2025-07-15 09:29:22', NULL),
(22, 9, 3, 10, 20, 30, 40, '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL),
(23, 9, 2, 10, 20, 30, 40, '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL),
(24, 9, 6, 0, 0, 0, 0, '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL),
(25, 9, 5, 0, 0, 0, 0, '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL),
(26, 9, 4, 0, 0, 0, 0, '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL),
(27, 9, 7, 0, 0, 0, 0, '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL),
(28, 9, 8, 0, 0, 0, 0, '2025-07-15 09:30:42', '2025-07-15 09:30:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `societes`
--

CREATE TABLE `societes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `raison_sociale` varchar(191) DEFAULT NULL,
  `logo` varchar(191) NOT NULL DEFAULT 'images/logo-light.png',
  `addresse` varchar(191) DEFAULT NULL,
  `ville` varchar(191) DEFAULT NULL,
  `telephone` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `siteweb` varchar(191) DEFAULT NULL,
  `instagram` varchar(191) DEFAULT NULL,
  `facebook` varchar(191) DEFAULT NULL,
  `whatsapp` varchar(191) DEFAULT NULL,
  `youtube` varchar(191) DEFAULT NULL,
  `twitter` varchar(191) DEFAULT NULL,
  `facture_liv_mode` varchar(191) NOT NULL DEFAULT 'manuel',
  `color1` varchar(191) NOT NULL DEFAULT '--color1',
  `color2` varchar(191) NOT NULL DEFAULT '#1d543b',
  `color3` varchar(191) NOT NULL DEFAULT '#f2f8f5',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `societes`
--

INSERT INTO `societes` (`id`, `raison_sociale`, `logo`, `addresse`, `ville`, `telephone`, `email`, `siteweb`, `instagram`, `facebook`, `whatsapp`, `youtube`, `twitter`, `facture_liv_mode`, `color1`, `color2`, `color3`, `created_at`, `updated_at`) VALUES
(1, 'MarHire', 'images/logo.png', 'Agadir, Maroc', 'casablanca', '0600000001', 'contact@marhire.ma', NULL, NULL, NULL, NULL, NULL, NULL, 'manuel', '#1c584e', '#eeb543', '#f2f8f5', NULL, '2025-04-21 19:26:07');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subcategory` varchar(191) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(191) DEFAULT NULL,
  `id_category` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `subcategory`, `short_description`, `description`, `logo`, `id_category`, `created_at`, `updated_at`) VALUES
(24, 'Vehicule Model', NULL, NULL, '', 3, '2025-06-10 10:55:55', '2025-06-10 11:20:21'),
(15, 'Car Model', NULL, NULL, '', 2, '2025-04-29 19:12:17', '2025-05-13 11:23:41'),
(16, 'Car Type', NULL, NULL, '', 2, '2025-04-29 19:16:22', '2025-05-13 11:23:32'),
(17, 'Service Type', NULL, NULL, '', 3, '2025-04-29 19:17:35', '2025-04-29 19:17:35'),
(18, 'Vehicule Type', NULL, NULL, '', 3, '2025-04-29 19:18:35', '2025-06-10 11:19:08'),
(19, 'Boat Type', NULL, NULL, '', 4, '2025-04-29 19:19:46', '2025-04-29 19:19:46'),
(20, 'Activity Type', NULL, NULL, '', 5, '2025-04-29 19:21:28', '2025-04-29 19:21:28');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category_options`
--

CREATE TABLE `sub_category_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `option` varchar(191) DEFAULT NULL,
  `subcategory_id` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_category_options`
--

INSERT INTO `sub_category_options` (`id`, `option`, `subcategory_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'option 1', -1, '2025-04-29 18:01:16', '2025-04-29 19:03:59', '2025-04-29 19:03:59'),
(2, 'option 2', -1, '2025-04-29 18:01:16', '2025-04-29 19:03:59', '2025-04-29 19:03:59'),
(3, 'option 3', -1, '2025-04-29 18:01:16', '2025-04-29 19:03:59', '2025-04-29 19:03:59'),
(4, 'option 1', 14, '2025-04-29 18:03:12', '2025-04-29 19:03:59', '2025-04-29 19:03:59'),
(5, 'option 2', 14, '2025-04-29 18:03:12', '2025-04-29 19:03:59', '2025-04-29 19:03:59'),
(6, 'option 3', 14, '2025-04-29 18:03:12', '2025-04-29 19:03:59', '2025-04-29 19:03:59'),
(7, 'option 1', 6, '2025-04-29 19:03:59', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(8, 'option 2', 6, '2025-04-29 19:03:59', '2025-04-29 19:05:49', '2025-04-29 19:05:49'),
(9, 'option 3', 6, '2025-04-29 19:03:59', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(10, 'opt5', 6, '2025-04-29 19:05:49', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(11, 'Cheap Cars', 15, '2025-04-29 19:12:17', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(12, 'Luxury Cars', 15, '2025-04-29 19:12:17', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(13, 'Family Cars', 15, '2025-04-29 19:12:17', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(14, 'SUVs', 15, '2025-04-29 19:12:17', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(15, 'MPVs', 15, '2025-04-29 19:12:17', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(16, 'Sedans', 15, '2025-04-29 19:12:17', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(17, 'Hatchbacks', 15, '2025-04-29 19:12:17', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(18, 'Dacia', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(19, 'Renault', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(20, 'Hyundai', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(21, 'Skoda', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(22, 'Seat', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(23, 'Opel', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(24, 'Mercedes', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(25, 'BMW', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(26, 'Audi', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(27, 'Toyota', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(28, 'Range rover', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(29, 'Porsche', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(30, 'Jeep', 16, '2025-04-29 19:16:22', '2025-05-06 18:18:48', '2025-05-06 18:18:48'),
(31, 'Airport Transfers', 17, '2025-04-29 19:17:35', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(32, 'Business Travel', 17, '2025-04-29 19:17:35', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(33, 'Intercity Travel', 17, '2025-04-29 19:17:35', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(34, 'Sedans', 18, '2025-04-29 19:18:35', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(35, 'SUVs', 18, '2025-04-29 19:18:35', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(36, 'Luxury Vehicles', 18, '2025-04-29 19:18:35', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(37, 'Minivans', 18, '2025-04-29 19:18:35', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(38, 'Coaches/Minibuses', 18, '2025-04-29 19:18:35', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(39, 'Yachts', 19, '2025-04-29 19:19:46', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(40, 'Speedboats', 19, '2025-04-29 19:19:46', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(41, 'Sailing Boats', 19, '2025-04-29 19:19:46', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(42, 'Luxury Boats', 19, '2025-04-29 19:19:46', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(43, 'Quad & Buggy Tours', 20, '2025-04-29 19:21:28', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(44, 'Desert Tours', 20, '2025-04-29 19:21:28', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(45, 'Surf Experience', 20, '2025-04-29 19:21:28', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(46, 'Camel Rides', 20, '2025-04-29 19:21:28', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(47, 'City Tours', 20, '2025-04-29 19:21:28', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(48, 'Jet Skiing', 20, '2025-04-29 19:21:28', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(49, '2020', 21, '2025-04-29 22:02:41', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(50, '2022', 21, '2025-04-29 22:02:41', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(51, '2025', 21, '2025-04-29 22:02:41', '2025-05-06 18:16:08', '2025-05-06 18:16:08'),
(52, 'Dacia', 15, '2025-05-06 18:18:48', '2025-05-30 20:31:05', NULL),
(53, 'Models', 15, '2025-05-06 18:19:03', '2025-05-06 18:19:21', '2025-05-06 18:19:21'),
(54, 'Audi', 15, '2025-05-06 18:19:21', '2025-05-30 20:31:05', NULL),
(55, 'Yacht', 19, '2025-05-06 18:21:22', '2025-07-24 20:15:25', NULL),
(56, 'Speedboat', 19, '2025-05-06 18:21:22', '2025-07-24 20:15:25', NULL),
(57, 'Quad', 20, '2025-05-06 18:22:09', '2025-07-17 12:09:00', NULL),
(58, 'Desert', 20, '2025-05-06 18:22:09', '2025-07-17 12:09:00', NULL),
(59, 'SUV', 16, '2025-05-06 18:24:26', '2025-05-13 11:23:32', NULL),
(60, 'hatchback', 16, '2025-05-06 18:24:26', '2025-05-13 11:23:32', NULL),
(61, 'MPV', 16, '2025-05-06 18:24:26', '2025-05-13 11:23:32', NULL),
(62, 'Sedan', 16, '2025-05-06 18:24:26', '2025-05-13 11:23:32', NULL),
(63, 'Airport Transfer', 17, '2025-05-06 18:31:08', '2025-05-06 18:31:08', NULL),
(64, 'Intercity Travel', 17, '2025-05-06 18:31:08', '2025-05-06 18:31:08', NULL),
(65, 'Daily Private Driver', 17, '2025-05-06 18:31:08', '2025-05-06 18:31:08', NULL),
(66, 'Business Travel', 17, '2025-05-06 18:31:08', '2025-05-06 18:31:08', NULL),
(67, 'custom', 19, '2025-05-08 20:42:54', '2025-07-24 20:15:25', '2025-07-24 20:15:25'),
(68, 'SUV / Sedan', 24, '2025-06-10 10:55:55', '2025-06-10 15:03:40', '2025-06-10 15:03:40'),
(69, 'Van', 24, '2025-06-10 10:55:55', '2025-06-10 15:03:40', '2025-06-10 15:03:40'),
(70, 'Fourgon (Large Van)', 24, '2025-06-10 10:55:55', '2025-06-10 15:03:40', '2025-06-10 15:03:40'),
(71, 'Model 1', 24, '2025-06-10 10:55:55', '2025-06-10 15:03:40', NULL),
(72, 'SUV', 18, '2025-06-10 11:19:08', '2025-07-24 20:14:19', NULL),
(73, 'Sedan', 18, '2025-06-10 11:19:08', '2025-07-24 20:14:19', NULL),
(74, 'Van', 18, '2025-06-10 11:19:08', '2025-07-24 20:14:19', NULL),
(75, 'Fourgon (Large Van)', 18, '2025-06-10 11:19:08', '2025-07-24 20:14:19', NULL),
(76, 'Model 2', 24, '2025-06-10 11:20:21', '2025-06-10 15:03:40', NULL),
(77, 'Model 3', 24, '2025-06-10 11:20:21', '2025-06-10 15:03:40', NULL),
(78, 'Camel Ride', 20, '2025-07-17 12:09:00', '2025-07-17 12:09:00', NULL),
(79, 'Surf', 20, '2025-07-17 12:09:00', '2025-07-17 12:09:00', NULL),
(80, 'Bus (Coach)', 18, '2025-07-24 20:14:19', '2025-07-24 20:14:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `terms_and_conditions`
--

CREATE TABLE `terms_and_conditions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `category_id` int(11) NOT NULL DEFAULT -1,
  `content` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `terms_and_conditions`
--

INSERT INTO `terms_and_conditions` (`id`, `title`, `category_id`, `content`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Rental Terms', 2, '<p>Terms</p>', '2025-05-14 16:21:00', '2025-07-14 10:53:03', '2025-07-14 10:53:03'),
(2, 'Cancellation Policy', 2, '<p>Cancellation</p>', '2025-05-14 16:21:28', '2025-07-14 10:52:58', '2025-07-14 10:52:58'),
(3, 'Disclaimer', 2, '<p>Diclaimer</p>', '2025-05-14 16:22:01', '2025-07-14 10:52:52', '2025-07-14 10:52:52'),
(4, 'tes', 3, '<p>jjj</p>', '2025-05-14 16:25:30', '2025-05-14 16:29:54', '2025-05-14 16:29:54'),
(5, 'cancellation', 4, '<p>test</p>', '2025-05-14 20:01:44', '2025-07-14 10:52:46', '2025-07-14 10:52:46'),
(6, 'Insurance Terms', 2, '<p>Insurance</p>', '2025-05-23 13:28:42', '2025-07-14 10:52:34', '2025-07-14 10:52:34'),
(7, 'new terms', -1, '<p>tst</p>', '2025-06-10 10:47:02', '2025-06-10 10:47:08', '2025-06-10 10:47:08'),
(8, 'Terms & Conditions', -1, '<h3><strong>1. Introduction</strong></h3><p>By booking a vehicle through our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before making a reservation.</p><h3><strong>2. Eligibility</strong></h3><p>Drivers must be at least 21 years old (age may vary by car category and location) and hold a valid driver’s license for at least 1 year.</p><h3><strong>3. Booking &amp; Payment</strong></h3><p>All bookings are subject to vehicle availability.</p><p>Full or partial payment may be required at the time of booking.</p><p>Additional charges may apply for optional extras (GPS, child seats, etc.).</p><h3><strong>4. Vehicle Collection &amp; Return</strong></h3><p>Vehicles must be collected and returned at the agreed times and locations.</p><p>Late returns may incur additional fees.</p><p>Vehicles must be returned with the same fuel level as at collection.</p><h3><strong>5. Use of Vehicle</strong></h3><p>Vehicles must not be used for illegal activities, racing, or off-road driving.</p><p>Only authorized drivers are permitted to operate the vehicle.</p><p>The renter is responsible for any traffic violations or fines.</p><p><strong>6. Damages, Accidents &amp; Theft</strong></p><p>The renter is responsible for all damages not covered by insurance.</p><p>In the event of an accident or theft, notify us and the authorities immediately.</p><p><strong>7. Cancellation &amp; Modifications</strong></p><p>Please refer to our Cancellation Policy for details.</p><h3><strong>8. Liability</strong></h3><p>Our liability is limited as permitted by law.</p><p>We are not responsible for loss of personal items left in the vehicle.</p><h3><strong>9. Amendments</strong></h3><p>We reserve the right to amend these terms at any time.</p>', '2025-07-14 10:53:29', '2025-07-14 11:49:04', NULL),
(9, 'Privacy policy', -1, '<h2>Privacy Policy – MarHire</h2><p><strong>Last updated: [Insert Date]</strong></p><p>Your privacy matters to us. This Privacy Policy explains how <strong>MarHire</strong> collects, uses, stores, and protects your personal data when you use our website, mobile platform, or book our services (cars, drivers, boats, or activities).</p><h3>📌 1. Information We Collect</h3><p>We collect the following types of personal information:</p><h4>a) Information You Provide</h4><p>Full name, email, phone number</p><p>Pickup &amp; drop-off location, rental dates</p><p>Payment information (handled securely by third-party processors)</p><p>Identification documents (if required by law)</p><h4>b) Automatically Collected</h4><p>IP address, browser type, device information</p><p>Pages visited, time spent, and booking behavior</p><p>Location (if enabled on your device)</p><h3>🧠 2. Why We Collect Your Data</h3><p>We use your data to:</p><p>Process and confirm bookings</p><p>Provide customer service and support</p><p>Improve our website and services</p><p>Send important updates and promotional offers (if you opt-in)</p><p>Meet legal or regulatory obligations</p><h3>🔐 3. How We Protect Your Data</h3><p>We implement the following security measures:</p><p>SSL encryption</p><p>Secure cloud storage</p><p>Restricted employee access</p><p>Regular security audits</p><p>We <strong>never sell your personal information</strong> to third parties.</p><h3>🤝 4. Sharing Your Information</h3><p>We may share your data with:</p><p><strong>Trusted partners</strong> (agencies, drivers, boat owners, etc.)—only to complete your booking</p><p><strong>Payment gateways</strong> (Stripe, PayPal, etc.)—for secure transactions</p><p><strong>Legal authorities</strong>—if required by law</p><h3>🧾 5. Your Rights</h3><p>You have the right to:</p><p>Access your data</p><p>Correct inaccurate data</p><p>Request deletion of your data</p><p>Withdraw consent to marketing communications</p><p>Request data portability</p><p>To exercise your rights, contact us at:<br><strong>📧 Email:</strong> [your-email@example.com]</p><h3>🍪 6. Cookies</h3><p>We use cookies to personalize your experience. See our full <a href=\"#\">Cookies Policy</a> for more info.</p><h3>🔄 7. Policy Updates</h3><p>We may update this Privacy Policy as laws or our services change. You’ll be notified on our website when updates occur.</p><h3>📬 Contact Us</h3><p>If you have any concerns about your privacy or data use, reach out to us:<br><strong>MarHire</strong><br>📧 Email: [your-email@example.com]<br>🌍 Website: www.marhirecar.com</p>', '2025-07-14 10:53:42', '2025-07-24 20:10:53', NULL),
(10, 'Cookie Policy', -1, '<h2>🍪 Cookies Policy – MarHire</h2><p><strong>Last updated: [Insert Date]</strong></p><p>At MarHire, we value your privacy. This Cookies Policy explains how we use cookies and similar technologies on our website to improve your experience and ensure transparency.</p><h3>📌 What Are Cookies?</h3><p>Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit a website. They help us recognize your browser and remember information about your visit, such as your language preference, login status, or items in your cart.</p><h3>🛠️ Types of Cookies We Use</h3><h4>1. <strong>Essential Cookies</strong></h4><p>These cookies are necessary for the website to function properly.<br>They include:</p><p>User login/session handling</p><p>Security and fraud prevention</p><p>Booking functionality</p><p><strong>You cannot disable these cookies.</strong></p><h4>2. <strong>Performance &amp; Analytics Cookies</strong></h4><p>Used to understand how users interact with our website, so we can improve design, speed, and content.</p><p>Examples:</p><p>Google Analytics</p><p>Page load performance trackers</p><p><strong>We only use these with your consent.</strong></p><h4>3. <strong>Functionality Cookies</strong></h4><p>They remember your preferences (language, location) and enhance your browsing experience.</p><h4>4. <strong>Marketing &amp; Advertising Cookies</strong></h4><p>Used to show you personalized ads on platforms like Facebook, Instagram, or Google based on your behavior on our site.</p><p>These are <strong>optional</strong> and only active if you agree.</p><h3>🔐 How to Control Cookies</h3><p>When you first visit our website, you\'ll see a cookie banner asking for your consent. You can:</p><p>Accept all cookies</p><p>Reject non-essential cookies</p><p>Customize your preferences</p><p>You can also manage or delete cookies via your browser settings at any time.</p><h3>🔄 Changes to This Policy</h3><p>We may update this Cookies Policy occasionally. Any changes will be posted here with the new effective date.</p><h3>📩 Contact Us</h3><p>If you have questions about our cookie usage or privacy practices, contact us at:<br><strong>📧 Email:</strong> [your-email@example.com]</p>', '2025-07-14 10:53:53', '2025-07-24 19:50:19', NULL),
(11, 'Cancellation Policy', -1, '<p>We understand that travel plans may change. Our cancellation policy is designed to be fair to both our customers and our service providers.</p><h3>✅ <strong>Free Cancellation</strong></h3><p><strong>You can cancel for free</strong> up to <strong>48 hours</strong> before the scheduled service (private driver, boat rental, or activity).</p><p>A full refund will be processed within 3–7 business days.</p><h3>⚠️ <strong>Late Cancellation</strong></h3><p>If you cancel <strong>less than 48 hours</strong> but more than 24 hours before the service:<br>→ <strong>50% refund</strong></p><p>If you cancel <strong>less than 24 hours</strong> before the service or don’t show up:<br>→ <strong>No refund</strong> (100% cancellation fee applies)</p><h3>🔁 <strong>Modifications</strong></h3><p>Date or time changes are <strong>free</strong> if requested more than 24 hours in advance and subject to availability.</p><p>Within 24 hours, changes are <strong>not guaranteed</strong> and may incur additional fees.</p><h3>💳 <strong>No-Show Policy</strong></h3><p>If the customer doesn’t show up at the pickup location and doesn’t contact us:<br>→ The service is considered <strong>used</strong> and <strong>non-refundable</strong>.</p><h3>🌀 <strong>Force Majeure</strong></h3><p>In the event of natural disasters, political unrest, or other unforeseen circumstances (e.g. flight cancellations), we will work with you to:</p><p>Reschedule the service at no cost</p><p>Or offer a credit valid for 12 months</p><p>Refunds in such cases will be evaluated case by case</p>', '2025-07-14 10:54:20', '2025-07-24 19:49:41', NULL),
(12, 'Insurance Conditions', -1, '<h3><strong>Included Insurance Coverage</strong></h3><p>Every private driver service includes <strong>basic passenger and third-party liability insurance</strong>, covering:</p><p>✅ Personal injury and medical costs (in case of an accident)</p><p>✅ Damage to third-party vehicles or property</p><p>✅ Legal liability of the driver</p><h3>⚠️ <strong>Not Covered (Excluded by Default)</strong></h3><p>The following are not covered under the standard insurance unless additional coverage is purchased:</p><p>❌ Theft or loss of personal items</p><p>❌ Accidents resulting from passenger negligence (e.g., not wearing a seatbelt)</p><p>❌ Damage caused during off-road use (unless pre-approved)</p><p>❌ Medical emergencies unrelated to road accidents</p><h3>🛡️ Optional Add-On: Full Passenger Coverage</h3><p>Enhance your safety with <strong>Full Coverage Insurance</strong>, which includes:</p><p>🏥 Medical expenses for all passengers</p><p>💼 Personal belongings theft protection</p><p>🛠️ Roadside assistance in remote areas</p><p>🚖 Replacement vehicle in case of breakdown</p><p><strong>Price:</strong> +€10–€20 per day</p><h3>📄 Insurance Claim Conditions</h3><p>To process any insurance claim:</p><p>The incident must be reported immediately to the driver and local authorities if necessary.</p><p>Passengers must keep all receipts, documents, and police reports.</p><p>Insurance does not cover delays caused by force majeure (weather, traffic, road closures).</p>', '2025-07-14 10:54:33', '2025-07-24 19:48:53', NULL),
(13, 'By booking a vehicle through our platform', -1, NULL, '2025-07-14 14:20:24', '2025-07-14 14:21:08', '2025-07-14 14:21:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(191) DEFAULT NULL,
  `prenom` varchar(191) DEFAULT NULL,
  `cin` varchar(191) DEFAULT NULL,
  `ville` varchar(191) DEFAULT NULL,
  `zone` varchar(191) DEFAULT NULL,
  `adresse` text DEFAULT NULL,
  `codepostal` varchar(191) DEFAULT NULL,
  `pays` varchar(191) NOT NULL DEFAULT 'Maroc',
  `type_compte` varchar(191) NOT NULL DEFAULT 'admin',
  `email` varchar(191) NOT NULL,
  `valide_compte` int(11) NOT NULL DEFAULT 0,
  `image` varchar(191) NOT NULL DEFAULT 'images/profiles/default.png',
  `telephone` varchar(191) DEFAULT NULL,
  `telephone2` varchar(191) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `api_token` text DEFAULT NULL,
  `secret_key` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `cin`, `ville`, `zone`, `adresse`, `codepostal`, `pays`, `type_compte`, `email`, `valide_compte`, `image`, `telephone`, `telephone2`, `email_verified_at`, `password`, `api_token`, `secret_key`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Chaouki', 'Charaf', NULL, NULL, NULL, NULL, NULL, 'Maroc', 'admin', 'admin@gmail.com', 1, 'images/profiles/user_681d25a22f089.png', '0694123146', NULL, NULL, '$2y$10$mBif1FUxbPDlndV/zqXpKOxY0d2GTjekqyzOzEtnZIVxMmY00Lf22', NULL, NULL, NULL, '2025-04-21 18:37:18', '2025-07-25 10:18:27', NULL),
(2, 'Marhire', 'Youssef', NULL, NULL, NULL, NULL, NULL, 'Maroc', 'admin', 'youssef@gmail.com', 1, 'images/profiles/default.png', '0600000000', NULL, NULL, '$2y$10$8l24ePTy8hUlUznlHQFi1OnRv/NxJsfoCI/.t./BhIXhHxFswrDy6', NULL, NULL, NULL, '2025-04-21 19:45:35', '2025-04-21 19:45:35', NULL),
(3, 'Youssefy', 'Nourdine', NULL, NULL, NULL, NULL, NULL, 'Maroc', 'staff', 'staff@gmail.com', 1, 'images/profiles/default.png', '0600000001', NULL, NULL, '$2y$10$SS3jVn4wW3J1mImp7yYS1ehxuFGC2EtVOF5.3Z4W5VvQQ5MEgyHxq', NULL, NULL, NULL, '2025-04-21 19:50:55', '2025-04-21 20:01:04', NULL),
(4, 'test', 'test', NULL, NULL, NULL, NULL, NULL, 'Maroc', 'staff', 'test@gmail.com', 1, 'images/profiles/default.png', '0600000000', NULL, NULL, '$2y$10$pctcH.re2MYv9eNIwfWjwOW77SkFM.Yw6BZs9dias5fYvfDMZAm.q', NULL, NULL, NULL, '2025-04-21 19:53:48', '2025-04-21 19:55:44', '2025-04-21 19:55:44'),
(5, 'tst', 'test2', NULL, NULL, NULL, NULL, NULL, 'Maroc', 'admin', 'test12@gmail.com', 1, 'images/profiles/default.png', '0694123146', NULL, NULL, '$2y$10$bEuOcnW7RiZ3da5iOokX1u.vaJGL8SxyX4285KHL97Wuf/hIBCP4i', NULL, NULL, NULL, '2025-04-21 21:21:32', '2025-04-21 21:22:02', '2025-04-21 21:22:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agencies`
--
ALTER TABLE `agencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agency_features`
--
ALTER TABLE `agency_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agency_sub_categories`
--
ALTER TABLE `agency_sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ammenies`
--
ALTER TABLE `ammenies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_addons`
--
ALTER TABLE `booking_addons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_addons`
--
ALTER TABLE `listing_addons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_addon_affecteds`
--
ALTER TABLE `listing_addon_affecteds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_galleries`
--
ALTER TABLE `listing_galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_includeds`
--
ALTER TABLE `listing_includeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_not_includeds`
--
ALTER TABLE `listing_not_includeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_pricings`
--
ALTER TABLE `listing_pricings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing_schedules`
--
ALTER TABLE `listing_schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `private_listing_pricings`
--
ALTER TABLE `private_listing_pricings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `societes`
--
ALTER TABLE `societes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_category_options`
--
ALTER TABLE `sub_category_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms_and_conditions`
--
ALTER TABLE `terms_and_conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `agency_features`
--
ALTER TABLE `agency_features`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `agency_sub_categories`
--
ALTER TABLE `agency_sub_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `amenities`
--
ALTER TABLE `amenities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ammenies`
--
ALTER TABLE `ammenies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `booking_addons`
--
ALTER TABLE `booking_addons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `listing_addons`
--
ALTER TABLE `listing_addons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `listing_addon_affecteds`
--
ALTER TABLE `listing_addon_affecteds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `listing_galleries`
--
ALTER TABLE `listing_galleries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `listing_includeds`
--
ALTER TABLE `listing_includeds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `listing_not_includeds`
--
ALTER TABLE `listing_not_includeds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `listing_pricings`
--
ALTER TABLE `listing_pricings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `listing_schedules`
--
ALTER TABLE `listing_schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `private_listing_pricings`
--
ALTER TABLE `private_listing_pricings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `societes`
--
ALTER TABLE `societes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `sub_category_options`
--
ALTER TABLE `sub_category_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `terms_and_conditions`
--
ALTER TABLE `terms_and_conditions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
