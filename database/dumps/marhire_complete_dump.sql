mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: marhire
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agencies`
--

DROP TABLE IF EXISTS `agencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agencies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agency_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int NOT NULL DEFAULT '-1',
  `sub_categories_ids` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  `agency_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_city` int NOT NULL DEFAULT '-1',
  `contact_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agencies`
--

LOCK TABLES `agencies` WRITE;
/*!40000 ALTER TABLE `agencies` DISABLE KEYS */;
INSERT INTO `agencies` VALUES (2,'top-cars','Top Cars',2,NULL,'<p>MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech. ETC</p>','<p>Experience the ultimate in car rental services with Marhire Car Fes. Our agency offers a diverse range of modern, well-maintained vehicles to suit every need, whether you’re traveling for business or leisure. Enjoy competitive rates, flexible booking options, and a hassle-free pick-up and drop-off service that makes exploring Fes a breeze. With our dedicated customer support and commitment to excellence, Marhire Car Fes is your trusted partner for a comfortable and memorable journey.</p>','Active','images/agencies/agency_68113b458ce75.png',2,'charaf chaouki','0600000001','0600000002','contact@topcars.ma',NULL,NULL,'2025-05-03 15:56:55','2025-07-16 19:12:59',NULL),(3,'fezcar','FezCar',2,NULL,'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.','<p>Experience the ultimate in car rental services with Marhire Car Fes. Our agency offers a diverse range of modern, well-maintained vehicles to suit every need, whether you’re traveling for business or leisure. Enjoy competitive rates, flexible booking options, and a hassle-free pick-up and drop-off service that makes exploring Fes a breeze. With our dedicated customer support and commitment to excellence, Marhire Car Fes is your trusted partner for a comfortable and memorable journey.</p>','Active','images/agencies/agency_68113b458ce75.png',6,'Ahmed','0611111111','0611111112','contact@fezcar.ma',NULL,NULL,'2025-05-03 15:57:36','2025-07-16 19:06:55',NULL),(7,'boat-agency','Boat agency',4,NULL,'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.',NULL,'Active','images/agencies/agency_68113b458ce75.png',2,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-14 12:10:39','2025-05-14 12:10:39',NULL),(8,'activity-agency','Activity Agency',5,NULL,'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.',NULL,'Active','images/agencies/agency_68113b458ce75.png',2,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-14 12:10:54','2025-05-14 12:10:54',NULL),(9,'private-car-agency','Private Car Agency',3,NULL,'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.',NULL,'Active','images/agencies/agency_68113b458ce75.png',2,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-14 12:11:12','2025-05-14 12:11:12',NULL),(10,'next-moto','Next Moto',2,NULL,'MarHire is your go-to travel platform for exploring every nook and cranny of Morocco effortlessly. Whether you\'re soaking up the sun on the beaches of Agadir, wandering through the vibrant streets of Marrakech.',NULL,'Active','images/agencies/agency_68113b458ce75.png',2,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-16 12:05:32','2025-07-16 12:05:32',NULL),(13,'-2','test',2,NULL,NULL,NULL,'Need Approval',NULL,2,'test','0600000000','0600000002','test@gmail.com','test',NULL,'2025-07-22 09:50:03','2025-07-22 09:50:03',NULL),(14,'-3','test',2,NULL,NULL,NULL,'Need Approval',NULL,2,'test','0600000000','0600000002','test@gmail.com','test',NULL,'2025-07-22 09:50:24','2025-07-22 09:50:24',NULL),(15,'-4','test',2,NULL,NULL,NULL,'Need Approval',NULL,2,'test','0600000','0600000002','test@gmail.com','tst',NULL,'2025-07-22 09:51:16','2025-07-22 09:51:16',NULL),(16,'','Test 3000',4,NULL,NULL,NULL,'Need Approval',NULL,2,'charaf chaouki','0694123146','212694123146','charafchaouki126@gmail.com',NULL,NULL,'2025-07-24 11:16:52','2025-07-24 11:16:52',NULL);
/*!40000 ALTER TABLE `agencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agency_features`
--

DROP TABLE IF EXISTS `agency_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency_features` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `feature` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agency_id` int NOT NULL DEFAULT '-1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agency_features`
--

LOCK TABLES `agency_features` WRITE;
/*!40000 ALTER TABLE `agency_features` DISABLE KEYS */;
INSERT INTO `agency_features` VALUES (1,'Feature 1','images/icons/feature_68113e50738f5.png',1,'2025-04-29 21:02:08','2025-04-29 21:02:08',NULL),(2,'Feature 2','images/icons/feature_68113e5077c82.png',1,'2025-04-29 21:02:08','2025-04-29 21:02:08',NULL);
/*!40000 ALTER TABLE `agency_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agency_sub_categories`
--

DROP TABLE IF EXISTS `agency_sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency_sub_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `subcategory_id` int NOT NULL DEFAULT '-1',
  `option_id` int NOT NULL DEFAULT '-1',
  `agency_id` int NOT NULL DEFAULT '-1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agency_sub_categories`
--

LOCK TABLES `agency_sub_categories` WRITE;
/*!40000 ALTER TABLE `agency_sub_categories` DISABLE KEYS */;
INSERT INTO `agency_sub_categories` VALUES (1,16,26,1,'2025-04-29 21:52:30','2025-04-29 21:52:30',NULL),(2,16,25,1,'2025-04-29 21:52:30','2025-04-29 21:52:30',NULL),(3,16,26,4,'2025-05-03 19:01:40','2025-05-03 19:01:40',NULL),(4,16,25,4,'2025-05-03 19:01:41','2025-05-03 19:01:41',NULL),(5,16,26,5,'2025-05-03 19:01:49','2025-05-03 19:01:49',NULL),(6,16,25,5,'2025-05-03 19:01:49','2025-05-03 19:01:49',NULL);
/*!40000 ALTER TABLE `agency_sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `listing_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ammenies`
--

DROP TABLE IF EXISTS `ammenies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ammenies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `listing_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ammenies`
--

LOCK TABLES `ammenies` WRITE;
/*!40000 ALTER TABLE `ammenies` DISABLE KEYS */;
/*!40000 ALTER TABLE `ammenies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `featured_img` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schema` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (2,'Le Mans Circuit Guide | Hertz Racing Gold','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots',NULL,'images/articles/article_6875153879045.jpg','le-mans-circuit-guide-hertz-racing-gold','Le Mans Circuit Guide | Hertz Racing Gold','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots','<script></script>',NULL,NULL,'2025-07-14 14:33:28','2025-07-14 14:33:28',NULL),(3,'The low-carb foodie guide to Florence, Italy','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots',NULL,'images/articles/article_68751b9654be2.jpg','the-low-carb-foodie-guide-to-florence-italy',NULL,NULL,NULL,NULL,1,'2025-07-14 15:00:38','2025-07-14 15:00:38',NULL),(4,'Experience the Grand Canyon at night','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots',NULL,'images/articles/article_68751bae81b16.jpg','experience-the-grand-canyon-at-night',NULL,NULL,NULL,NULL,1,'2025-07-14 15:01:02','2025-07-14 15:01:02',NULL),(5,'10 ways successful people spend their free time','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots',NULL,'images/articles/article_68751bc65b18a.jpg','10-ways-successful-people-spend-their-free-time',NULL,NULL,NULL,NULL,1,'2025-07-14 15:01:26','2025-07-14 15:01:26',NULL),(6,'A road trip through Virginia\'s civil war sites','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots',NULL,'images/articles/article_68751be0d1f01.jpg','a-road-trip-through-virginias-civil-war-sites',NULL,NULL,NULL,NULL,1,'2025-07-14 15:01:52','2025-07-14 15:01:52',NULL),(7,'A road trip through Virginia\'s civil war sites','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots',NULL,'images/articles/article_68751bfed6899.jpg','a-road-trip-through-virginias-civil-war-sites-1',NULL,NULL,NULL,NULL,1,'2025-07-14 15:02:22','2025-07-14 15:02:22',NULL),(8,'Best things to do in San Francisco','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots',NULL,'images/articles/article_68751c1aa2670.jpg','best-things-to-do-in-san-francisco',NULL,NULL,NULL,NULL,1,'2025-07-14 15:02:50','2025-07-14 15:02:50',NULL),(9,'10 ways successful people spend their free time','Trackside tips for visitors to the Le Mans racetrack from Hertz. Find the best viewing spots','<p>In today’s fast-paced world, we often rush through airports, tick off attractions, and squeeze multiple cities into one short trip. But what if the best way to explore the world was to slow down?</p><p>Welcome to the world of slow travel—a growing movement that encourages travelers to immerse themselves deeply in the culture, people, and rhythm of a place.</p><h3>🧭 What is Slow Travel?</h3><p>Slow travel isn’t about how many countries you visit in a month—it’s about how deeply you connect with the places you go. Instead of hopping between cities, slow travelers choose to stay longer in fewer places, savoring the local food, learning the language, and forming authentic relationships with locals.</p><p>It’s not just a style of travel—it’s a mindset.</p><h3>🌿 Why Choose Slow Travel?</h3><p>Here are a few reasons why slow travel is becoming the preferred choice for modern adventurers:</p><h3>1. Deeper Cultural Experiences</h3><p>Spending more time in one destination lets you uncover hidden gems, attend local festivals, and enjoy experiences most tourists miss. Imagine cooking tagine with a Berber family in Morocco or helping out at a vineyard in Italy.</p><h3>2. More Sustainable</h3><p>Traveling slowly reduces your carbon footprint. Fewer flights, more public transport, and local accommodation options help protect the environment and support local economies.</p><h3>3. Less Stressful</h3><p>Forget airport stress and tight itineraries. With slow travel, you wake up without an alarm, wander without a map, and let each day unfold naturally.</p><h3>4. Authentic Connections</h3><p>Whether it’s chatting with a street vendor, learning a traditional craft, or volunteering with a community project—slow travel helps you form genuine connections that last far beyond your trip.</p><h3>🏞 Where to Start Your Slow Travel Journey?</h3><p>If you\'re ready to embrace slow travel, here are some ideal destinations to start with:</p><p>Chiang Mai, Thailand – Ideal for yoga retreats, Thai cooking classes, and mountain hikes.</p><p>Essaouira, Morocco – A calm coastal town perfect for surfing, souks, and sunsets.</p><p>Lisbon, Portugal – Spend weeks exploring the winding alleys, Fado music, and delicious pastéis de nata.</p><p>Kyoto, Japan – Dive into centuries of tradition with tea ceremonies, temple stays, and local markets.</p><h3>✈️ Tips for Traveling Slow</h3><p>Book longer stays in fewer places</p><p>Learn basic phrases in the local language</p><p>Shop at markets, not malls</p><p>Choose homestays or locally-owned guesthouses</p><p>Travel by train or bus instead of flights</p><p>Be curious. Talk to people. Listen more than you speak.</p><h3>🧳 Final Thoughts</h3><p>Traveling slowly isn\'t just about seeing the world—it’s about feeling it. It’s a way to travel that respects people, places, and the planet. Whether you\'re backpacking through South America or living a month in a Moroccan riad, slow travel offers memories that no fast-paced tour can match.</p><p>So next time you plan a trip, ask yourself:</p><blockquote><p>“Am I just visiting this place—or truly experiencing it?”</p></blockquote>','images/articles/article_68751c35a39fd.jpg','10-ways-successful-people-spend-their-free-time-1','CTM 1','CTM 2','<script>Schema</script>',NULL,1,'2025-07-14 15:03:17','2025-07-24 19:22:38',NULL),(10,'tst','1','<p>1</p>','','tst','1','12','13',NULL,1,'2025-07-14 17:16:32','2025-07-14 17:18:40','2025-07-14 17:18:40');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_addons`
--

DROP TABLE IF EXISTS `booking_addons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_addons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL DEFAULT '-1',
  `addon_id` int NOT NULL DEFAULT '-1',
  `price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_addons`
--

LOCK TABLES `booking_addons` WRITE;
/*!40000 ALTER TABLE `booking_addons` DISABLE KEYS */;
INSERT INTO `booking_addons` VALUES (1,1,1,NULL,'2025-07-24 20:01:01','2025-07-24 20:01:01',NULL),(2,1,2,NULL,'2025-07-24 20:01:01','2025-07-24 20:01:01',NULL),(3,8,1,10,'2025-08-04 20:06:45','2025-08-04 20:06:45',NULL);
/*!40000 ALTER TABLE `booking_addons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL DEFAULT '-1',
  `listing_id` int NOT NULL DEFAULT '-1',
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activity_type` int DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_of_residence` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `booking_price` double DEFAULT NULL,
  `total_addons` double DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `net_agency_price` double DEFAULT NULL,
  `commission_amount` double DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additional_notes` text COLLATE utf8mb4_unicode_ci,
  `age` int DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `pickup_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_time` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dropoff_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dropoff_time` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `droppoff_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `propose` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number_of_people` int DEFAULT NULL,
  `prefered_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pricing_option_id` int NOT NULL DEFAULT '-1',
  `flight_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `booking_source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Admin Entry',
  `discount_or_extra` double NOT NULL DEFAULT '0',
  `airport_or_intercity` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `car_type` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `city_a_id` int DEFAULT NULL,
  `city_b_id` int DEFAULT NULL,
  `created_by` int NOT NULL DEFAULT '-1',
  `terms_accepted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,2,3,NULL,NULL,'john','nativ','aumin@gmail.com','87644449',NULL,'Albania',NULL,'Pending',60,30,90,NULL,NULL,NULL,NULL,34,NULL,'2025-07-24','00:30','2025-07-26','00:30','agadir','agadir',NULL,NULL,NULL,NULL,-1,'57878','Admin Entry',0,NULL,NULL,3,NULL,NULL,1,0,'2025-07-24 20:01:01','2025-07-24 20:01:01',NULL),(2,2,5,NULL,NULL,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+212736434',NULL,'Morocco',NULL,'Pending',45,0,45,NULL,NULL,NULL,NULL,21,'2004-06-05','2025-08-01','20:00','2025-08-04','19:00','3',NULL,NULL,NULL,NULL,NULL,-1,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,0,'2025-07-31 18:01:28','2025-07-31 18:01:28',NULL),(3,3,8,NULL,NULL,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+78678435',NULL,'Morocco',NULL,'Pending',345,0,345,NULL,NULL,'Road type: one_way Luggage: 0',NULL,NULL,'2004-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-08-02',-1,NULL,'Client Booking',0,'airport_transfer',1,3,3,NULL,-1,0,'2025-07-31 18:28:24','2025-07-31 18:28:24',NULL),(4,4,13,NULL,NULL,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+8374343434',NULL,'Morocco',NULL,'Pending',17.5,0,17.5,NULL,NULL,NULL,NULL,NULL,'2004-05-06',NULL,'09:00',NULL,NULL,NULL,NULL,'3.5','Leisure',1,'2025-08-03',-1,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,0,'2025-07-31 18:29:36','2025-07-31 18:29:36',NULL),(5,5,15,NULL,1,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+837434345',NULL,'Morocco',NULL,'Pending',28,0,28,NULL,NULL,NULL,NULL,NULL,'2004-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-08-03',1,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,0,'2025-07-31 18:51:57','2025-07-31 18:51:57',NULL),(6,2,4,NULL,NULL,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+73648734',NULL,'Morocco',NULL,'Pending',60,0,60,NULL,NULL,NULL,NULL,21,'2004-06-05','2025-08-01','20:00','2025-08-04','20:00','3',NULL,NULL,NULL,NULL,NULL,-1,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,0,'2025-07-31 18:52:59','2025-07-31 18:52:59',NULL),(7,2,3,NULL,NULL,'Ayoub','Bensalah','ayoubbbenslaah2004@gmail.com','+212873487834',NULL,'Morocco',NULL,'Pending',120,0,120,NULL,NULL,NULL,NULL,21,'2004-06-05','2025-08-03','07:00','2025-08-06','08:00','3',NULL,NULL,NULL,NULL,NULL,-1,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,0,'2025-08-01 11:13:51','2025-08-01 11:13:51',NULL),(8,2,3,NULL,NULL,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+212625950284',NULL,'Morocco',NULL,'Pending',90,10,100,NULL,NULL,'sdfsfdsdf','sdfsfdsdf',25,'2000-06-07','2025-08-05','22:00','2025-08-08','21:00','3',NULL,NULL,NULL,NULL,NULL,-1,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,1,'2025-08-04 20:06:45','2025-08-04 21:27:41',NULL),(9,2,4,NULL,NULL,'Yousv','havej','hyvgg@f.c','+2120655224411',NULL,'Ucucug',NULL,'Pending',100,0,100,NULL,NULL,NULL,NULL,29,'1995-08-22','2025-08-06','07:00','2025-08-10','10:00','3',NULL,NULL,NULL,NULL,NULL,-1,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,1,'2025-08-04 22:47:53','2025-08-04 22:47:53',NULL),(10,2,19,NULL,NULL,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+212736434',NULL,'Morocco',NULL,'Pending',30,0,30,NULL,NULL,NULL,NULL,21,'2004-05-06','2025-08-07','13:00','2025-08-10','13:00','3',NULL,NULL,NULL,NULL,NULL,-1,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,1,'2025-08-06 11:02:32','2025-08-06 11:02:32',NULL),(11,3,6,NULL,NULL,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+14534653465',NULL,'Morocco',NULL,'Pending',498,0,498,NULL,NULL,'Road type: one_way Luggage: 0','sdvdsvd',NULL,'2004-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-08-08',-1,NULL,'Client Booking',0,'airport_transfer',1,3,3,NULL,-1,1,'2025-08-06 11:37:35','2025-08-06 11:37:35',NULL),(12,5,15,NULL,1,'Ayoub','Bensalah','ayoubbensalah2004@gmail.com','+134365436',NULL,'Morocco',NULL,'Pending',150,0,150,NULL,NULL,NULL,NULL,NULL,'2000-06-05',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-08-08',3,NULL,'Client Booking',0,NULL,NULL,3,NULL,NULL,-1,1,'2025-08-06 11:38:14','2025-08-06 11:38:14',NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `brand` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lien_store` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Car Rental','This is the primary category where all vehicle listings will be featured. The structure within\r\nthis category focuses on cities and car types.',NULL,'images/logos/logo_6806aa967af13.jpg','2025-04-21 20:29:10','2025-04-21 20:29:10'),(3,'Private Car with Driver','This category will list vehicles available with professional drivers for specific services. This is\r\nideal for users who want private transportation for various needs, including city transfers,\r\nintercity travel, or business travel.',NULL,'images/logos/logo_6806aaf4d480f.png','2025-04-21 20:30:44','2025-04-21 20:30:44'),(4,'Boat Rentals','This category will feature boat and yacht rentals. Each listing will detail boat types, available\r\nservices, and relevant information for tourists looking to enjoy the water in Morocco.',NULL,'images/logos/logo_6806ab2bd15e1.png','2025-04-21 20:31:39','2025-04-21 20:31:39'),(5,'Things to do','This category will focus on various tours, excursions, and experiences for travelers visiting\r\nMorocco. The activities will range from adventurous quad and buggy rides to relaxing jet ski\r\nsessions.',NULL,'images/logos/logo_6806ad160ad28.svg','2025-04-21 20:32:35','2025-05-23 13:30:09');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `city_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,NULL,'2025-04-29 12:56:04','2025-04-29 12:56:23','2025-04-29 12:56:23'),(2,'Casablanca','2025-04-29 12:57:52','2025-04-29 12:57:52',NULL),(3,'Agadir','2025-04-29 12:58:00','2025-04-29 12:58:00',NULL),(4,'Rabat','2025-04-29 12:58:09','2025-04-29 12:58:09',NULL),(5,'Marrakech','2025-04-29 12:58:19','2025-04-29 12:58:19',NULL),(6,'Fez','2025-04-29 12:58:46','2025-04-29 12:58:46',NULL),(7,'Tangier','2025-04-29 12:58:56','2025-04-29 12:58:56',NULL),(8,'Tetouan','2025-04-29 22:04:33','2025-04-29 22:04:33',NULL),(9,'Essaouira',NULL,NULL,NULL);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flag` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Aruba','https://flagcdn.com/w40/aw.png',NULL,NULL,NULL),(2,'Afghanistan','https://flagcdn.com/w40/af.png',NULL,NULL,NULL),(3,'Angola','https://flagcdn.com/w40/ao.png',NULL,NULL,NULL),(4,'Anguilla','https://flagcdn.com/w40/ai.png',NULL,NULL,NULL),(5,'Åland Islands','https://flagcdn.com/w40/ax.png',NULL,NULL,NULL),(6,'Albania','https://flagcdn.com/w40/al.png',NULL,NULL,NULL),(7,'Andorra','https://flagcdn.com/w40/ad.png',NULL,NULL,NULL),(8,'United Arab Emirates','https://flagcdn.com/w40/ae.png',NULL,NULL,NULL),(9,'Argentina','https://flagcdn.com/w40/ar.png',NULL,NULL,NULL),(10,'Armenia','https://flagcdn.com/w40/am.png',NULL,NULL,NULL),(11,'American Samoa','https://flagcdn.com/w40/as.png',NULL,NULL,NULL),(12,'Antarctica','https://flagcdn.com/w40/aq.png',NULL,NULL,NULL),(13,'French Southern Territories','https://flagcdn.com/w40/tf.png',NULL,NULL,NULL),(14,'Antigua and Barbuda','https://flagcdn.com/w40/ag.png',NULL,NULL,NULL),(15,'Australia','https://flagcdn.com/w40/au.png',NULL,NULL,NULL),(16,'Austria','https://flagcdn.com/w40/at.png',NULL,NULL,NULL),(17,'Azerbaijan','https://flagcdn.com/w40/az.png',NULL,NULL,NULL),(18,'Burundi','https://flagcdn.com/w40/bi.png',NULL,NULL,NULL),(19,'Belgium','https://flagcdn.com/w40/be.png',NULL,NULL,NULL),(20,'Benin','https://flagcdn.com/w40/bj.png',NULL,NULL,NULL),(21,'Bonaire, Sint Eustatius and Saba','https://flagcdn.com/w40/bq.png',NULL,NULL,NULL),(22,'Burkina Faso','https://flagcdn.com/w40/bf.png',NULL,NULL,NULL),(23,'Bangladesh','https://flagcdn.com/w40/bd.png',NULL,NULL,NULL),(24,'Bulgaria','https://flagcdn.com/w40/bg.png',NULL,NULL,NULL),(25,'Bahrain','https://flagcdn.com/w40/bh.png',NULL,NULL,NULL),(26,'Bahamas','https://flagcdn.com/w40/bs.png',NULL,NULL,NULL),(27,'Bosnia and Herzegovina','https://flagcdn.com/w40/ba.png',NULL,NULL,NULL),(28,'Saint Barthélemy','https://flagcdn.com/w40/bl.png',NULL,NULL,NULL),(29,'Belarus','https://flagcdn.com/w40/by.png',NULL,NULL,NULL),(30,'Belize','https://flagcdn.com/w40/bz.png',NULL,NULL,NULL),(31,'Bermuda','https://flagcdn.com/w40/bm.png',NULL,NULL,NULL),(32,'Bolivia, Plurinational State of','https://flagcdn.com/w40/bo.png',NULL,NULL,NULL),(33,'Brazil','https://flagcdn.com/w40/br.png',NULL,NULL,NULL),(34,'Barbados','https://flagcdn.com/w40/bb.png',NULL,NULL,NULL),(35,'Brunei Darussalam','https://flagcdn.com/w40/bn.png',NULL,NULL,NULL),(36,'Bhutan','https://flagcdn.com/w40/bt.png',NULL,NULL,NULL),(37,'Bouvet Island','https://flagcdn.com/w40/bv.png',NULL,NULL,NULL),(38,'Botswana','https://flagcdn.com/w40/bw.png',NULL,NULL,NULL),(39,'Central African Republic','https://flagcdn.com/w40/cf.png',NULL,NULL,NULL),(40,'Canada','https://flagcdn.com/w40/ca.png',NULL,NULL,NULL),(41,'Cocos (Keeling) Islands','https://flagcdn.com/w40/cc.png',NULL,NULL,NULL),(42,'Switzerland','https://flagcdn.com/w40/ch.png',NULL,NULL,NULL),(43,'Chile','https://flagcdn.com/w40/cl.png',NULL,NULL,NULL),(44,'China','https://flagcdn.com/w40/cn.png',NULL,NULL,NULL),(45,'Côte d\'Ivoire','https://flagcdn.com/w40/ci.png',NULL,NULL,NULL),(46,'Cameroon','https://flagcdn.com/w40/cm.png',NULL,NULL,NULL),(47,'Congo, The Democratic Republic of the','https://flagcdn.com/w40/cd.png',NULL,NULL,NULL),(48,'Congo','https://flagcdn.com/w40/cg.png',NULL,NULL,NULL),(49,'Cook Islands','https://flagcdn.com/w40/ck.png',NULL,NULL,NULL),(50,'Colombia','https://flagcdn.com/w40/co.png',NULL,NULL,NULL),(51,'Comoros','https://flagcdn.com/w40/km.png',NULL,NULL,NULL),(52,'Cabo Verde','https://flagcdn.com/w40/cv.png',NULL,NULL,NULL),(53,'Costa Rica','https://flagcdn.com/w40/cr.png',NULL,NULL,NULL),(54,'Cuba','https://flagcdn.com/w40/cu.png',NULL,NULL,NULL),(55,'Curaçao','https://flagcdn.com/w40/cw.png',NULL,NULL,NULL),(56,'Christmas Island','https://flagcdn.com/w40/cx.png',NULL,NULL,NULL),(57,'Cayman Islands','https://flagcdn.com/w40/ky.png',NULL,NULL,NULL),(58,'Cyprus','https://flagcdn.com/w40/cy.png',NULL,NULL,NULL),(59,'Czechia','https://flagcdn.com/w40/cz.png',NULL,NULL,NULL),(60,'Germany','https://flagcdn.com/w40/de.png',NULL,NULL,NULL),(61,'Djibouti','https://flagcdn.com/w40/dj.png',NULL,NULL,NULL),(62,'Dominica','https://flagcdn.com/w40/dm.png',NULL,NULL,NULL),(63,'Denmark','https://flagcdn.com/w40/dk.png',NULL,NULL,NULL),(64,'Dominican Republic','https://flagcdn.com/w40/do.png',NULL,NULL,NULL),(65,'Algeria','https://flagcdn.com/w40/dz.png',NULL,NULL,NULL),(66,'Ecuador','https://flagcdn.com/w40/ec.png',NULL,NULL,NULL),(67,'Egypt','https://flagcdn.com/w40/eg.png',NULL,NULL,NULL),(68,'Eritrea','https://flagcdn.com/w40/er.png',NULL,NULL,NULL),(69,'Western Sahara','https://flagcdn.com/w40/eh.png',NULL,NULL,NULL),(70,'Spain','https://flagcdn.com/w40/es.png',NULL,NULL,NULL),(71,'Estonia','https://flagcdn.com/w40/ee.png',NULL,NULL,NULL),(72,'Ethiopia','https://flagcdn.com/w40/et.png',NULL,NULL,NULL),(73,'Finland','https://flagcdn.com/w40/fi.png',NULL,NULL,NULL),(74,'Fiji','https://flagcdn.com/w40/fj.png',NULL,NULL,NULL),(75,'Falkland Islands (Malvinas)','https://flagcdn.com/w40/fk.png',NULL,NULL,NULL),(76,'France','https://flagcdn.com/w40/fr.png',NULL,NULL,NULL),(77,'Faroe Islands','https://flagcdn.com/w40/fo.png',NULL,NULL,NULL),(78,'Micronesia, Federated States of','https://flagcdn.com/w40/fm.png',NULL,NULL,NULL),(79,'Gabon','https://flagcdn.com/w40/ga.png',NULL,NULL,NULL),(80,'United Kingdom','https://flagcdn.com/w40/gb.png',NULL,NULL,NULL),(81,'Georgia','https://flagcdn.com/w40/ge.png',NULL,NULL,NULL),(82,'Guernsey','https://flagcdn.com/w40/gg.png',NULL,NULL,NULL),(83,'Ghana','https://flagcdn.com/w40/gh.png',NULL,NULL,NULL),(84,'Gibraltar','https://flagcdn.com/w40/gi.png',NULL,NULL,NULL),(85,'Guinea','https://flagcdn.com/w40/gn.png',NULL,NULL,NULL),(86,'Guadeloupe','https://flagcdn.com/w40/gp.png',NULL,NULL,NULL),(87,'Gambia','https://flagcdn.com/w40/gm.png',NULL,NULL,NULL),(88,'Guinea-Bissau','https://flagcdn.com/w40/gw.png',NULL,NULL,NULL),(89,'Equatorial Guinea','https://flagcdn.com/w40/gq.png',NULL,NULL,NULL),(90,'Greece','https://flagcdn.com/w40/gr.png',NULL,NULL,NULL),(91,'Grenada','https://flagcdn.com/w40/gd.png',NULL,NULL,NULL),(92,'Greenland','https://flagcdn.com/w40/gl.png',NULL,NULL,NULL),(93,'Guatemala','https://flagcdn.com/w40/gt.png',NULL,NULL,NULL),(94,'French Guiana','https://flagcdn.com/w40/gf.png',NULL,NULL,NULL),(95,'Guam','https://flagcdn.com/w40/gu.png',NULL,NULL,NULL),(96,'Guyana','https://flagcdn.com/w40/gy.png',NULL,NULL,NULL),(97,'Hong Kong','https://flagcdn.com/w40/hk.png',NULL,NULL,NULL),(98,'Heard Island and McDonald Islands','https://flagcdn.com/w40/hm.png',NULL,NULL,NULL),(99,'Honduras','https://flagcdn.com/w40/hn.png',NULL,NULL,NULL),(100,'Croatia','https://flagcdn.com/w40/hr.png',NULL,NULL,NULL),(101,'Haiti','https://flagcdn.com/w40/ht.png',NULL,NULL,NULL),(102,'Hungary','https://flagcdn.com/w40/hu.png',NULL,NULL,NULL),(103,'Indonesia','https://flagcdn.com/w40/id.png',NULL,NULL,NULL),(104,'Isle of Man','https://flagcdn.com/w40/im.png',NULL,NULL,NULL),(105,'India','https://flagcdn.com/w40/in.png',NULL,NULL,NULL),(106,'British Indian Ocean Territory','https://flagcdn.com/w40/io.png',NULL,NULL,NULL),(107,'Ireland','https://flagcdn.com/w40/ie.png',NULL,NULL,NULL),(108,'Iran, Islamic Republic of','https://flagcdn.com/w40/ir.png',NULL,NULL,NULL),(109,'Iraq','https://flagcdn.com/w40/iq.png',NULL,NULL,NULL),(110,'Iceland','https://flagcdn.com/w40/is.png',NULL,NULL,NULL),(111,'Israel','https://flagcdn.com/w40/il.png',NULL,NULL,NULL),(112,'Italy','https://flagcdn.com/w40/it.png',NULL,NULL,NULL),(113,'Jamaica','https://flagcdn.com/w40/jm.png',NULL,NULL,NULL),(114,'Jersey','https://flagcdn.com/w40/je.png',NULL,NULL,NULL),(115,'Jordan','https://flagcdn.com/w40/jo.png',NULL,NULL,NULL),(116,'Japan','https://flagcdn.com/w40/jp.png',NULL,NULL,NULL),(117,'Kazakhstan','https://flagcdn.com/w40/kz.png',NULL,NULL,NULL),(118,'Kenya','https://flagcdn.com/w40/ke.png',NULL,NULL,NULL),(119,'Kyrgyzstan','https://flagcdn.com/w40/kg.png',NULL,NULL,NULL),(120,'Cambodia','https://flagcdn.com/w40/kh.png',NULL,NULL,NULL),(121,'Kiribati','https://flagcdn.com/w40/ki.png',NULL,NULL,NULL),(122,'Saint Kitts and Nevis','https://flagcdn.com/w40/kn.png',NULL,NULL,NULL),(123,'Korea, Republic of','https://flagcdn.com/w40/kr.png',NULL,NULL,NULL),(124,'Kuwait','https://flagcdn.com/w40/kw.png',NULL,NULL,NULL),(125,'Lao People\'s Democratic Republic','https://flagcdn.com/w40/la.png',NULL,NULL,NULL),(126,'Lebanon','https://flagcdn.com/w40/lb.png',NULL,NULL,NULL),(127,'Liberia','https://flagcdn.com/w40/lr.png',NULL,NULL,NULL),(128,'Libya','https://flagcdn.com/w40/ly.png',NULL,NULL,NULL),(129,'Saint Lucia','https://flagcdn.com/w40/lc.png',NULL,NULL,NULL),(130,'Liechtenstein','https://flagcdn.com/w40/li.png',NULL,NULL,NULL),(131,'Sri Lanka','https://flagcdn.com/w40/lk.png',NULL,NULL,NULL),(132,'Lesotho','https://flagcdn.com/w40/ls.png',NULL,NULL,NULL),(133,'Lithuania','https://flagcdn.com/w40/lt.png',NULL,NULL,NULL),(134,'Luxembourg','https://flagcdn.com/w40/lu.png',NULL,NULL,NULL),(135,'Latvia','https://flagcdn.com/w40/lv.png',NULL,NULL,NULL),(136,'Macao','https://flagcdn.com/w40/mo.png',NULL,NULL,NULL),(137,'Saint Martin (French part)','https://flagcdn.com/w40/mf.png',NULL,NULL,NULL),(138,'Morocco','https://flagcdn.com/w40/ma.png',NULL,NULL,NULL),(139,'Monaco','https://flagcdn.com/w40/mc.png',NULL,NULL,NULL),(140,'Moldova, Republic of','https://flagcdn.com/w40/md.png',NULL,NULL,NULL),(141,'Madagascar','https://flagcdn.com/w40/mg.png',NULL,NULL,NULL),(142,'Maldives','https://flagcdn.com/w40/mv.png',NULL,NULL,NULL),(143,'Mexico','https://flagcdn.com/w40/mx.png',NULL,NULL,NULL),(144,'Marshall Islands','https://flagcdn.com/w40/mh.png',NULL,NULL,NULL),(145,'North Macedonia','https://flagcdn.com/w40/mk.png',NULL,NULL,NULL),(146,'Mali','https://flagcdn.com/w40/ml.png',NULL,NULL,NULL),(147,'Malta','https://flagcdn.com/w40/mt.png',NULL,NULL,NULL),(148,'Myanmar','https://flagcdn.com/w40/mm.png',NULL,NULL,NULL),(149,'Montenegro','https://flagcdn.com/w40/me.png',NULL,NULL,NULL),(150,'Mongolia','https://flagcdn.com/w40/mn.png',NULL,NULL,NULL),(151,'Northern Mariana Islands','https://flagcdn.com/w40/mp.png',NULL,NULL,NULL),(152,'Mozambique','https://flagcdn.com/w40/mz.png',NULL,NULL,NULL),(153,'Mauritania','https://flagcdn.com/w40/mr.png',NULL,NULL,NULL),(154,'Montserrat','https://flagcdn.com/w40/ms.png',NULL,NULL,NULL),(155,'Martinique','https://flagcdn.com/w40/mq.png',NULL,NULL,NULL),(156,'Mauritius','https://flagcdn.com/w40/mu.png',NULL,NULL,NULL),(157,'Malawi','https://flagcdn.com/w40/mw.png',NULL,NULL,NULL),(158,'Malaysia','https://flagcdn.com/w40/my.png',NULL,NULL,NULL),(159,'Mayotte','https://flagcdn.com/w40/yt.png',NULL,NULL,NULL),(160,'Namibia','https://flagcdn.com/w40/na.png',NULL,NULL,NULL),(161,'New Caledonia','https://flagcdn.com/w40/nc.png',NULL,NULL,NULL),(162,'Niger','https://flagcdn.com/w40/ne.png',NULL,NULL,NULL),(163,'Norfolk Island','https://flagcdn.com/w40/nf.png',NULL,NULL,NULL),(164,'Nigeria','https://flagcdn.com/w40/ng.png',NULL,NULL,NULL),(165,'Nicaragua','https://flagcdn.com/w40/ni.png',NULL,NULL,NULL),(166,'Niue','https://flagcdn.com/w40/nu.png',NULL,NULL,NULL),(167,'Netherlands','https://flagcdn.com/w40/nl.png',NULL,NULL,NULL),(168,'Norway','https://flagcdn.com/w40/no.png',NULL,NULL,NULL),(169,'Nepal','https://flagcdn.com/w40/np.png',NULL,NULL,NULL),(170,'Nauru','https://flagcdn.com/w40/nr.png',NULL,NULL,NULL),(171,'New Zealand','https://flagcdn.com/w40/nz.png',NULL,NULL,NULL),(172,'Oman','https://flagcdn.com/w40/om.png',NULL,NULL,NULL),(173,'Pakistan','https://flagcdn.com/w40/pk.png',NULL,NULL,NULL),(174,'Panama','https://flagcdn.com/w40/pa.png',NULL,NULL,NULL),(175,'Pitcairn','https://flagcdn.com/w40/pn.png',NULL,NULL,NULL),(176,'Peru','https://flagcdn.com/w40/pe.png',NULL,NULL,NULL),(177,'Philippines','https://flagcdn.com/w40/ph.png',NULL,NULL,NULL),(178,'Palau','https://flagcdn.com/w40/pw.png',NULL,NULL,NULL),(179,'Papua New Guinea','https://flagcdn.com/w40/pg.png',NULL,NULL,NULL),(180,'Poland','https://flagcdn.com/w40/pl.png',NULL,NULL,NULL),(181,'Puerto Rico','https://flagcdn.com/w40/pr.png',NULL,NULL,NULL),(182,'Korea, Democratic People\'s Republic of','https://flagcdn.com/w40/kp.png',NULL,NULL,NULL),(183,'Portugal','https://flagcdn.com/w40/pt.png',NULL,NULL,NULL),(184,'Paraguay','https://flagcdn.com/w40/py.png',NULL,NULL,NULL),(185,'Palestine, State of','https://flagcdn.com/w40/ps.png',NULL,NULL,NULL),(186,'French Polynesia','https://flagcdn.com/w40/pf.png',NULL,NULL,NULL),(187,'Qatar','https://flagcdn.com/w40/qa.png',NULL,NULL,NULL),(188,'Réunion','https://flagcdn.com/w40/re.png',NULL,NULL,NULL),(189,'Romania','https://flagcdn.com/w40/ro.png',NULL,NULL,NULL),(190,'Russian Federation','https://flagcdn.com/w40/ru.png',NULL,NULL,NULL),(191,'Rwanda','https://flagcdn.com/w40/rw.png',NULL,NULL,NULL),(192,'Saudi Arabia','https://flagcdn.com/w40/sa.png',NULL,NULL,NULL),(193,'Sudan','https://flagcdn.com/w40/sd.png',NULL,NULL,NULL),(194,'Senegal','https://flagcdn.com/w40/sn.png',NULL,NULL,NULL),(195,'Singapore','https://flagcdn.com/w40/sg.png',NULL,NULL,NULL),(196,'South Georgia and the South Sandwich Islands','https://flagcdn.com/w40/gs.png',NULL,NULL,NULL),(197,'Saint Helena, Ascension and Tristan da Cunha','https://flagcdn.com/w40/sh.png',NULL,NULL,NULL),(198,'Svalbard and Jan Mayen','https://flagcdn.com/w40/sj.png',NULL,NULL,NULL),(199,'Solomon Islands','https://flagcdn.com/w40/sb.png',NULL,NULL,NULL),(200,'Sierra Leone','https://flagcdn.com/w40/sl.png',NULL,NULL,NULL),(201,'El Salvador','https://flagcdn.com/w40/sv.png',NULL,NULL,NULL),(202,'San Marino','https://flagcdn.com/w40/sm.png',NULL,NULL,NULL),(203,'Somalia','https://flagcdn.com/w40/so.png',NULL,NULL,NULL),(204,'Saint Pierre and Miquelon','https://flagcdn.com/w40/pm.png',NULL,NULL,NULL),(205,'Serbia','https://flagcdn.com/w40/rs.png',NULL,NULL,NULL),(206,'South Sudan','https://flagcdn.com/w40/ss.png',NULL,NULL,NULL),(207,'Sao Tome and Principe','https://flagcdn.com/w40/st.png',NULL,NULL,NULL),(208,'Suriname','https://flagcdn.com/w40/sr.png',NULL,NULL,NULL),(209,'Slovakia','https://flagcdn.com/w40/sk.png',NULL,NULL,NULL),(210,'Slovenia','https://flagcdn.com/w40/si.png',NULL,NULL,NULL),(211,'Sweden','https://flagcdn.com/w40/se.png',NULL,NULL,NULL),(212,'Eswatini','https://flagcdn.com/w40/sz.png',NULL,NULL,NULL),(213,'Sint Maarten (Dutch part)','https://flagcdn.com/w40/sx.png',NULL,NULL,NULL),(214,'Seychelles','https://flagcdn.com/w40/sc.png',NULL,NULL,NULL),(215,'Syrian Arab Republic','https://flagcdn.com/w40/sy.png',NULL,NULL,NULL),(216,'Turks and Caicos Islands','https://flagcdn.com/w40/tc.png',NULL,NULL,NULL),(217,'Chad','https://flagcdn.com/w40/td.png',NULL,NULL,NULL),(218,'Togo','https://flagcdn.com/w40/tg.png',NULL,NULL,NULL),(219,'Thailand','https://flagcdn.com/w40/th.png',NULL,NULL,NULL),(220,'Tajikistan','https://flagcdn.com/w40/tj.png',NULL,NULL,NULL),(221,'Tokelau','https://flagcdn.com/w40/tk.png',NULL,NULL,NULL),(222,'Turkmenistan','https://flagcdn.com/w40/tm.png',NULL,NULL,NULL),(223,'Timor-Leste','https://flagcdn.com/w40/tl.png',NULL,NULL,NULL),(224,'Tonga','https://flagcdn.com/w40/to.png',NULL,NULL,NULL),(225,'Trinidad and Tobago','https://flagcdn.com/w40/tt.png',NULL,NULL,NULL),(226,'Tunisia','https://flagcdn.com/w40/tn.png',NULL,NULL,NULL),(227,'Turkey','https://flagcdn.com/w40/trm.png',NULL,NULL,NULL),(228,'Tuvalu','https://flagcdn.com/w40/tv.png',NULL,NULL,NULL),(229,'Taiwan, Province of China','https://flagcdn.com/w40/tw.png',NULL,NULL,NULL),(230,'Tanzania, United Republic of','https://flagcdn.com/w40/tz.png',NULL,NULL,NULL),(231,'Uganda','https://flagcdn.com/w40/ug.png',NULL,NULL,NULL),(232,'Ukraine','https://flagcdn.com/w40/ua.png',NULL,NULL,NULL),(233,'United States Minor Outlying Islands','https://flagcdn.com/w40/um.png',NULL,NULL,NULL),(234,'Uruguay','https://flagcdn.com/w40/uy.png',NULL,NULL,NULL),(235,'United States','https://flagcdn.com/w40/us.png',NULL,NULL,NULL),(236,'Uzbekistan','https://flagcdn.com/w40/uz.png',NULL,NULL,NULL),(237,'Holy See (Vatican City State)','https://flagcdn.com/w40/va.png',NULL,NULL,NULL),(238,'Saint Vincent and the Grenadines','https://flagcdn.com/w40/vc.png',NULL,NULL,NULL),(239,'Venezuela, Bolivarian Republic of','https://flagcdn.com/w40/ve.png',NULL,NULL,NULL),(240,'Virgin Islands, British','https://flagcdn.com/w40/vg.png',NULL,NULL,NULL),(241,'Virgin Islands, U.S.','https://flagcdn.com/w40/vi.png',NULL,NULL,NULL),(242,'Viet Nam','https://flagcdn.com/w40/vn.png',NULL,NULL,NULL),(243,'Vanuatu','https://flagcdn.com/w40/vu.png',NULL,NULL,NULL),(244,'Wallis and Futuna','https://flagcdn.com/w40/wf.png',NULL,NULL,NULL),(245,'Samoa','https://flagcdn.com/w40/ws.png',NULL,NULL,NULL),(246,'Yemen','https://flagcdn.com/w40/ye.png',NULL,NULL,NULL),(247,'South Africa','https://flagcdn.com/w40/za.png',NULL,NULL,NULL),(248,'Zambia','https://flagcdn.com/w40/zm.png',NULL,NULL,NULL),(249,'Zimbabwe','https://flagcdn.com/w40/zw.png',NULL,NULL,NULL);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `coupon_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fixed_price',
  `discount_value` double DEFAULT NULL,
  `categories` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valid_from` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valid_untill` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `used_count` int NOT NULL DEFAULT '0',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (1,'SUM25','pourcentage',10,'4,2,3,5','2025-02-04','2026-02-23',23,0,'Active','2025-07-24 19:48:08','2025-07-24 19:48:08',NULL);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_booking_options`
--

DROP TABLE IF EXISTS `custom_booking_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_booking_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `listing_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_booking_options_listing_id_index` (`listing_id`),
  CONSTRAINT `custom_booking_options_listing_id_foreign` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_booking_options`
--

LOCK TABLES `custom_booking_options` WRITE;
/*!40000 ALTER TABLE `custom_booking_options` DISABLE KEYS */;
INSERT INTO `custom_booking_options` VALUES (1,15,'30min',28.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(2,15,'1h',69.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(3,15,'2h',150.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(4,15,'Half Day',161.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(5,15,'Full Day',312.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(6,16,'30min',21.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(7,16,'1h',86.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(8,16,'2h',118.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(9,16,'Half Day',225.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(10,16,'Full Day',246.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(11,17,'30min',36.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(12,17,'1h',87.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(13,17,'2h',112.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(14,17,'Half Day',234.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(15,17,'Full Day',208.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(16,18,'30min',40.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(17,18,'1h',82.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(18,18,'2h',93.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(19,18,'Half Day',115.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(20,18,'Full Day',165.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(21,24,'30min',37.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(22,24,'1h',45.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(23,24,'2h',128.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(24,24,'Half Day',249.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(25,24,'Full Day',257.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(26,25,'30min',50.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(27,25,'1h',53.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(28,25,'2h',77.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(29,25,'Half Day',195.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(30,25,'Full Day',249.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(31,27,'30min',32.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(32,27,'1h',85.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(33,27,'2h',109.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(34,27,'Half Day',119.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(35,27,'Full Day',158.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(36,10,'30min',85.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(37,10,'1h',83.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(38,10,'1.5h',134.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(39,10,'2h',188.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(40,10,'3h',382.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(41,10,'4h',370.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(42,10,'5h',510.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(43,10,'6h',459.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(44,10,'7h',431.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(45,10,'8h',536.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(46,11,'30min',60.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(47,11,'1h',126.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(48,11,'1.5h',109.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(49,11,'2h',225.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(50,11,'3h',312.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(51,11,'4h',286.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(52,11,'5h',383.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(53,11,'6h',475.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(54,11,'7h',682.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(55,11,'8h',729.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(56,12,'30min',90.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(57,12,'1h',150.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(58,12,'1.5h',164.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(59,12,'2h',217.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(60,12,'3h',319.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(61,12,'4h',420.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(62,12,'5h',554.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(63,12,'6h',359.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(64,12,'7h',409.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(65,12,'8h',767.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(66,13,'30min',56.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(67,13,'1h',125.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(68,13,'1.5h',118.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(69,13,'2h',234.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(70,13,'3h',257.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(71,13,'4h',290.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(72,13,'5h',343.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(73,13,'6h',623.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(74,13,'7h',733.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(75,13,'8h',818.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(76,14,'30min',93.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(77,14,'1h',144.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(78,14,'1.5h',139.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(79,14,'2h',158.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(80,14,'3h',331.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(81,14,'4h',341.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(82,14,'5h',571.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(83,14,'6h',435.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(84,14,'7h',471.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(85,14,'8h',587.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(86,21,'30min',76.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(87,21,'1h',144.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(88,21,'1.5h',135.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(89,21,'2h',186.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(90,21,'3h',263.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(91,21,'4h',280.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(92,21,'5h',424.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(93,21,'6h',505.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(94,21,'7h',652.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(95,21,'8h',785.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(96,22,'30min',73.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(97,22,'1h',113.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(98,22,'1.5h',126.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(99,22,'2h',219.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(100,22,'3h',216.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(101,22,'4h',417.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(102,22,'5h',365.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(103,22,'6h',567.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(104,22,'7h',713.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(105,22,'8h',757.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(106,23,'30min',100.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(107,23,'1h',125.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(108,23,'1.5h',111.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(109,23,'2h',229.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(110,23,'3h',317.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(111,23,'4h',265.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(112,23,'5h',504.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(113,23,'6h',492.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(114,23,'7h',505.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(115,23,'8h',751.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(116,26,'30min',87.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(117,26,'1h',93.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(118,26,'1.5h',158.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(119,26,'2h',248.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(120,26,'3h',396.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(121,26,'4h',344.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(122,26,'5h',364.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(123,26,'6h',604.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(124,26,'7h',499.00,'2025-07-31 18:34:02','2025-07-31 18:34:02'),(125,26,'8h',870.00,'2025-07-31 18:34:02','2025-07-31 18:34:02');
/*!40000 ALTER TABLE `custom_booking_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver_pricings`
--

DROP TABLE IF EXISTS `driver_pricings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver_pricings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `listing_id` bigint unsigned NOT NULL,
  `service_type` enum('airport_transfer','intercity') COLLATE utf8mb4_unicode_ci NOT NULL,
  `road_type` enum('one_way','road_trip') COLLATE utf8mb4_unicode_ci NOT NULL,
  `city_a_id` bigint unsigned NOT NULL,
  `city_b_id` bigint unsigned DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `driver_pricings_city_b_id_foreign` (`city_b_id`),
  KEY `driver_pricings_listing_id_service_type_road_type_index` (`listing_id`,`service_type`,`road_type`),
  KEY `driver_pricings_city_a_id_city_b_id_index` (`city_a_id`,`city_b_id`),
  CONSTRAINT `driver_pricings_city_a_id_foreign` FOREIGN KEY (`city_a_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `driver_pricings_city_b_id_foreign` FOREIGN KEY (`city_b_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `driver_pricings_listing_id_foreign` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_pricings`
--

LOCK TABLES `driver_pricings` WRITE;
/*!40000 ALTER TABLE `driver_pricings` DISABLE KEYS */;
INSERT INTO `driver_pricings` VALUES (1,6,'airport_transfer','one_way',3,NULL,498.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(2,6,'airport_transfer','road_trip',3,NULL,577.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(3,6,'intercity','one_way',3,2,690.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(4,6,'intercity','road_trip',3,2,2258.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(5,6,'intercity','one_way',3,4,1359.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(6,6,'intercity','road_trip',3,4,924.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(7,6,'intercity','one_way',3,5,1488.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(8,6,'intercity','road_trip',3,5,1189.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(9,6,'intercity','one_way',3,6,1356.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(10,6,'intercity','road_trip',3,6,3434.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(11,6,'intercity','one_way',3,7,1567.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(12,6,'intercity','road_trip',3,7,1088.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(13,6,'intercity','one_way',3,8,798.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(14,6,'intercity','road_trip',3,8,2796.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(15,6,'intercity','one_way',3,9,1170.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(16,6,'intercity','road_trip',3,9,994.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(17,7,'airport_transfer','one_way',3,NULL,476.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(18,7,'airport_transfer','road_trip',3,NULL,500.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(19,7,'intercity','one_way',3,2,1120.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(20,7,'intercity','road_trip',3,2,3214.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(21,7,'intercity','one_way',3,4,1333.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(22,7,'intercity','road_trip',3,4,1586.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(23,7,'intercity','one_way',3,5,1137.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(24,7,'intercity','road_trip',3,5,2707.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(25,7,'intercity','one_way',3,6,1730.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(26,7,'intercity','road_trip',3,6,2424.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(27,7,'intercity','one_way',3,7,1836.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(28,7,'intercity','road_trip',3,7,843.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(29,7,'intercity','one_way',3,8,1351.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(30,7,'intercity','road_trip',3,8,1403.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(31,7,'intercity','one_way',3,9,810.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(32,7,'intercity','road_trip',3,9,2328.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(33,8,'airport_transfer','one_way',3,NULL,345.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(34,8,'airport_transfer','road_trip',3,NULL,505.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(35,8,'intercity','one_way',3,2,504.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(36,8,'intercity','road_trip',3,2,1329.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(37,8,'intercity','one_way',3,4,1791.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(38,8,'intercity','road_trip',3,4,2891.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(39,8,'intercity','one_way',3,5,529.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(40,8,'intercity','road_trip',3,5,1913.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(41,8,'intercity','one_way',3,6,1915.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(42,8,'intercity','road_trip',3,6,1451.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(43,8,'intercity','one_way',3,7,596.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(44,8,'intercity','road_trip',3,7,2532.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(45,8,'intercity','one_way',3,8,1094.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(46,8,'intercity','road_trip',3,8,3191.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(47,8,'intercity','one_way',3,9,543.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(48,8,'intercity','road_trip',3,9,2502.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(49,9,'airport_transfer','one_way',3,NULL,466.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(50,9,'airport_transfer','road_trip',3,NULL,792.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(51,9,'intercity','one_way',3,2,1486.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(52,9,'intercity','road_trip',3,2,2365.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(53,9,'intercity','one_way',3,4,1807.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(54,9,'intercity','road_trip',3,4,1586.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(55,9,'intercity','one_way',3,5,1655.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(56,9,'intercity','road_trip',3,5,922.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(57,9,'intercity','one_way',3,6,1492.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(58,9,'intercity','road_trip',3,6,1943.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(59,9,'intercity','one_way',3,7,1855.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(60,9,'intercity','road_trip',3,7,1381.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(61,9,'intercity','one_way',3,8,684.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(62,9,'intercity','road_trip',3,8,1097.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(63,9,'intercity','one_way',3,9,1890.00,'2025-07-31 18:26:15','2025-07-31 18:26:15'),(64,9,'intercity','road_trip',3,9,1442.00,'2025-07-31 18:26:15','2025-07-31 18:26:15');
/*!40000 ALTER TABLE `driver_pricings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_logs`
--

DROP TABLE IF EXISTS `email_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `booking_id` bigint unsigned DEFAULT NULL,
  `recipient_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipient_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('sending','sent','failed','skipped') COLLATE utf8mb4_unicode_ci DEFAULT 'sending',
  `error_message` text COLLATE utf8mb4_unicode_ci,
  `pdf_path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_data` json DEFAULT NULL,
  `retry_count` int NOT NULL DEFAULT '0',
  `sent_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email_logs_status_created_at_index` (`status`,`created_at`),
  KEY `email_logs_booking_id_email_type_index` (`booking_id`,`email_type`),
  KEY `email_logs_recipient_email_index` (`recipient_email`),
  CONSTRAINT `email_logs_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_logs`
--

LOCK TABLES `email_logs` WRITE;
/*!40000 ALTER TABLE `email_logs` DISABLE KEYS */;
INSERT INTO `email_logs` VALUES (1,NULL,'ayoubbensalah2004@gmail.com','customer','booking_confirmed','sent',NULL,'invoices/invoice-.pdf','{\"check_in\": null, \"check_out\": null, \"timestamp\": \"2025-08-05T20:16:04+01:00\", \"booking_id\": null, \"email_type\": \"booking_confirmed\", \"total_amount\": null, \"customer_name\": null, \"listing_title\": \"Test Service\", \"customer_email\": \"ayoubbensalah2004@gmail.com\", \"booking_reference\": \"N/A\"}',0,'2025-08-05 19:16:12','2025-08-05 19:16:04','2025-08-05 19:16:12'),(2,10,'ayoubbensalah2004@gmail.com','customer','booking_received','sent',NULL,NULL,'{\"check_in\": null, \"check_out\": null, \"timestamp\": \"2025-08-06T12:02:32+01:00\", \"booking_id\": 10, \"email_type\": \"booking_received\", \"total_amount\": null, \"customer_name\": null, \"listing_title\": \"test\", \"customer_email\": \"ayoubbensalah2004@gmail.com\", \"booking_reference\": \"N/A\"}',0,'2025-08-06 11:02:39','2025-08-06 11:02:32','2025-08-06 11:02:39'),(3,10,'admin@marhire.com','admin','booking_received','sent',NULL,NULL,'{\"check_in\": null, \"check_out\": null, \"timestamp\": \"2025-08-06T12:02:39+01:00\", \"booking_id\": 10, \"email_type\": \"booking_received\", \"total_amount\": null, \"customer_name\": null, \"listing_title\": \"test\", \"customer_email\": \"ayoubbensalah2004@gmail.com\", \"booking_reference\": \"N/A\"}',0,'2025-08-06 11:02:41','2025-08-06 11:02:39','2025-08-06 11:02:41'),(4,11,'ayoubbensalah2004@gmail.com','customer','booking_received','sent',NULL,NULL,'{\"check_in\": null, \"check_out\": null, \"timestamp\": \"2025-08-06T12:37:35+01:00\", \"booking_id\": 11, \"email_type\": \"booking_received\", \"total_amount\": null, \"customer_name\": null, \"listing_title\": \"Nissan\", \"customer_email\": \"ayoubbensalah2004@gmail.com\", \"booking_reference\": \"N/A\"}',0,'2025-08-06 11:37:38','2025-08-06 11:37:35','2025-08-06 11:37:38'),(5,11,'admin@marhire.com','admin','booking_received','sent',NULL,NULL,'{\"check_in\": null, \"check_out\": null, \"timestamp\": \"2025-08-06T12:37:38+01:00\", \"booking_id\": 11, \"email_type\": \"booking_received\", \"total_amount\": null, \"customer_name\": null, \"listing_title\": \"Nissan\", \"customer_email\": \"ayoubbensalah2004@gmail.com\", \"booking_reference\": \"N/A\"}',0,'2025-08-06 11:37:45','2025-08-06 11:37:38','2025-08-06 11:37:45'),(6,12,'ayoubbensalah2004@gmail.com','customer','booking_received','sent',NULL,NULL,'{\"check_in\": null, \"check_out\": null, \"timestamp\": \"2025-08-06T12:38:14+01:00\", \"booking_id\": 12, \"email_type\": \"booking_received\", \"total_amount\": null, \"customer_name\": null, \"listing_title\": \"Quad Bike Tour\", \"customer_email\": \"ayoubbensalah2004@gmail.com\", \"booking_reference\": \"N/A\"}',0,'2025-08-06 11:38:17','2025-08-06 11:38:14','2025-08-06 11:38:17'),(7,12,'admin@marhire.com','admin','booking_received','sent',NULL,NULL,'{\"check_in\": null, \"check_out\": null, \"timestamp\": \"2025-08-06T12:38:17+01:00\", \"booking_id\": 12, \"email_type\": \"booking_received\", \"total_amount\": null, \"customer_name\": null, \"listing_title\": \"Quad Bike Tour\", \"customer_email\": \"ayoubbensalah2004@gmail.com\", \"booking_reference\": \"N/A\"}',0,'2025-08-06 11:38:19','2025-08-06 11:38:17','2025-08-06 11:38:19');
/*!40000 ALTER TABLE `email_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_settings`
--

DROP TABLE IF EXISTS `email_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `group` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_settings_key_unique` (`key`),
  KEY `email_settings_group_key_index` (`group`,`key`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_settings`
--

LOCK TABLES `email_settings` WRITE;
/*!40000 ALTER TABLE `email_settings` DISABLE KEYS */;
INSERT INTO `email_settings` VALUES (1,'sender_email','\"contact@marhire.com\"','general','2025-08-05 18:44:28','2025-08-05 18:44:28'),(2,'sender_name','\"Marhire.com\"','general','2025-08-05 18:44:28','2025-08-05 18:44:28'),(3,'admin_email','\"admin@marhire.com\"','general','2025-08-05 18:44:28','2025-08-05 18:44:28'),(4,'reminder_hours','48','general','2025-08-05 18:44:28','2025-08-05 18:44:28'),(5,'car_rental.booking_received','true','car_rental','2025-08-05 18:44:28','2025-08-05 18:44:28'),(6,'car_rental.booking_confirmed','true','car_rental','2025-08-05 18:44:28','2025-08-05 18:44:28'),(7,'car_rental.booking_cancelled','true','car_rental','2025-08-05 18:44:28','2025-08-05 18:44:28'),(8,'car_rental.booking_reminder','true','car_rental','2025-08-05 18:44:28','2025-08-05 18:44:28'),(9,'private_driver.booking_received','true','private_driver','2025-08-05 18:44:28','2025-08-05 18:44:28'),(10,'private_driver.booking_confirmed','true','private_driver','2025-08-05 18:44:28','2025-08-05 18:44:28'),(11,'private_driver.booking_cancelled','true','private_driver','2025-08-05 18:44:28','2025-08-05 18:44:28'),(12,'private_driver.booking_reminder','true','private_driver','2025-08-05 18:44:28','2025-08-05 18:44:28'),(13,'boat_rental.booking_received','true','boat_rental','2025-08-05 18:44:28','2025-08-05 18:44:28'),(14,'boat_rental.booking_confirmed','true','boat_rental','2025-08-05 18:44:28','2025-08-05 18:44:28'),(15,'boat_rental.booking_cancelled','true','boat_rental','2025-08-05 18:44:28','2025-08-05 18:44:28'),(16,'boat_rental.booking_reminder','true','boat_rental','2025-08-05 18:44:28','2025-08-05 18:44:28'),(17,'things_to_do.booking_received','true','things_to_do','2025-08-05 18:44:28','2025-08-05 18:44:28'),(18,'things_to_do.booking_confirmed','true','things_to_do','2025-08-05 18:44:28','2025-08-05 18:44:28'),(19,'things_to_do.booking_cancelled','true','things_to_do','2025-08-05 18:44:28','2025-08-05 18:44:28'),(20,'things_to_do.booking_reminder','true','things_to_do','2025-08-05 18:44:28','2025-08-05 18:44:28');
/*!40000 ALTER TABLE `email_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_templates`
--

DROP TABLE IF EXISTS `email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_templates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body_html` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_body_html` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `available_variables` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_templates_category_event_type_unique` (`category`,`event_type`),
  KEY `email_templates_event_type_index` (`event_type`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_templates`
--

LOCK TABLES `email_templates` WRITE;
/*!40000 ALTER TABLE `email_templates` DISABLE KEYS */;
INSERT INTO `email_templates` VALUES (1,NULL,'booking_received','Your Booking Request Has Been Received – MarHire','<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\" />\r\n  <title>Booking Confirmation</title>\r\n  <style>\r\n    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }\r\n    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }\r\n    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }\r\n    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }\r\n    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }\r\n    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }\r\n    .help-box {\r\n      background-color: #f1fdfb;\r\n      border: 1px solid #cbe8e4;\r\n      padding: 15px;\r\n      border-radius: 6px;\r\n      font-size: 14px;\r\n      margin-top: 10px;\r\n    }\r\n    .help-box a {\r\n      font-weight: bold;\r\n    }\r\n    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }\r\n    a { color: #225f54; text-decoration: none; }\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"email-container\">\r\n    <div class=\"header\">Your Booking Request Has Been Received – MarHire</div>\r\n    <p>Hello <strong>{{client_name}}</strong>,</p>\r\n    <p>Thank you for booking with <strong>MarHire</strong>. We\'ve received your booking request and it is currently under review. Please find the invoice attached to this email.</p>\r\n\r\n    <div class=\"section-title\">Booking Summary</div>\r\n    <table class=\"content-table\">\r\n      <tr><td><strong>Invoice No:</strong></td><td>{{booking_reference}}</td></tr>\r\n      <tr><td><strong>Status:</strong></td><td style=\"color: #f0ad4e; font-weight: bold;\">Pending</td></tr>\r\n      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>\r\n      <tr><td><strong>Check In:</strong></td><td>{{check_in_date}}</td></tr>\r\n      <tr><td><strong>Check Out:</strong></td><td>{{check_out_date}}</td></tr>\r\n      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>\r\n    </table>\r\n\r\n    <div class=\"section-title\">Client Information</div>\r\n    <table class=\"content-table\">\r\n      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>\r\n      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>\r\n    </table>\r\n\r\n    <div class=\"section-title\">Need Help?</div>\r\n    <div class=\"help-box\">\r\n      Our support team is here to assist you anytime:<br><br>\r\n      Email: <a href=\"mailto:info@marhire.com\">info@marhire.com</a><br>\r\n      Phone / WhatsApp: <a href=\"tel:+212660745055\">+212 660 745 055</a><br>\r\n      Website: <a href=\"https://www.marhire.com\">www.marhire.com</a>\r\n    </div>\r\n\r\n    <div class=\"footer\">\r\n      Thank you for choosing <strong>MarHire</strong>.<br />\r\n      <em><a href=\"https://www.marhire.com/terms\">Terms & Conditions</a> | <a href=\"https://www.marhire.com/cancellation-policy\">Cancellation Policy</a></em>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>','<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <style>\r\n        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }\r\n        .email-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }\r\n        .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; border-radius: 5px 5px 0 0; }\r\n        .content { padding: 20px; }\r\n        .booking-details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }\r\n        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }\r\n    </style>\r\n</head>\r\n<body>\r\n    <div class=\"email-container\">\r\n        <div class=\"header\">\r\n            <h1>MarHire</h1>\r\n            <p>Booking Received</p>\r\n        </div>\r\n        <div class=\"content\">\r\n            <p>Dear {{client_name}},</p>\r\n            <p>Thank you for your booking request. We have received your booking and will review it shortly.</p>\r\n            \r\n            <div class=\"booking-details\">\r\n                <h3>Booking Details:</h3>\r\n                <p><strong>Reference:</strong> {{booking_reference}}</p>\r\n                <p><strong>Service:</strong> {{listing_title}}</p>\r\n                <p><strong>Date:</strong> {{check_in_date}}</p>\r\n                <p><strong>Total Amount:</strong> {{currency}} {{total_amount}}</p>\r\n            </div>\r\n            \r\n            <p>You will receive a confirmation email once your booking has been approved.</p>\r\n            <p>If you have any questions, please contact us at {{admin_email}}</p>\r\n            \r\n            <p>Best regards,<br>The MarHire Team</p>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <p>© 2025 MarHire. All rights reserved.</p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>','Booking Received - {{booking_reference}}','{\"{{currency}}\": \"Currency symbol\", \"{{booking_id}}\": \"Booking ID\", \"{{admin_email}}\": \"Admin email address\", \"{{client_name}}\": \"Customer full name\", \"{{client_email}}\": \"Customer email\", \"{{total_amount}}\": \"Total price\", \"{{check_in_date}}\": \"Check-in/Start date\", \"{{listing_title}}\": \"Service/Product name\", \"{{check_out_date}}\": \"Check-out/End date\", \"{{booking_reference}}\": \"Booking reference number\"}',1,'2025-08-05 18:20:08','2025-08-05 19:09:45'),(2,NULL,'booking_confirmed','Your Booking is Confirmed – MarHire','<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\" />\r\n  <title>Booking Confirmation</title>\r\n  <style>\r\n    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }\r\n    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }\r\n    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }\r\n    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }\r\n    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }\r\n    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }\r\n    .help-box {\r\n      background-color: #f1fdfb;\r\n      border: 1px solid #cbe8e4;\r\n      padding: 15px;\r\n      border-radius: 6px;\r\n      font-size: 14px;\r\n      margin-top: 10px;\r\n    }\r\n    .help-box a {\r\n      font-weight: bold;\r\n    }\r\n    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }\r\n    a { color: #225f54; text-decoration: none; }\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"email-container\">\r\n    <div class=\"header\">Your Booking is Confirmed – MarHire</div>\r\n    <p>Hello <strong>{{client_name}}</strong>,</p>\r\n    <p>Thank you for booking with <strong>MarHire</strong>. We\'re pleased to confirm your reservation. Please find the invoice attached to this email.</p>\r\n\r\n    <div class=\"section-title\">Booking Summary</div>\r\n    <table class=\"content-table\">\r\n      <tr><td><strong>Invoice No:</strong></td><td>{{booking_reference}}</td></tr>\r\n      <tr><td><strong>Status:</strong></td><td style=\"color: #28a745; font-weight: bold;\">Confirmed</td></tr>\r\n      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>\r\n      <tr><td><strong>Check In:</strong></td><td>{{check_in_date}}</td></tr>\r\n      <tr><td><strong>Check Out:</strong></td><td>{{check_out_date}}</td></tr>\r\n      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>\r\n    </table>\r\n\r\n    <div class=\"section-title\">Client Information</div>\r\n    <table class=\"content-table\">\r\n      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>\r\n      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>\r\n    </table>\r\n\r\n    <div class=\"section-title\">Need Help?</div>\r\n    <div class=\"help-box\">\r\n      Our support team is here to assist you anytime:<br><br>\r\n      Email: <a href=\"mailto:info@marhire.com\">info@marhire.com</a><br>\r\n      Phone / WhatsApp: <a href=\"tel:+212660745055\">+212 660 745 055</a><br>\r\n      Website: <a href=\"https://www.marhire.com\">www.marhire.com</a>\r\n    </div>\r\n\r\n    <div class=\"footer\">\r\n      Thank you for choosing <strong>MarHire</strong>.<br />\r\n      <em><a href=\"https://www.marhire.com/terms\">Terms & Conditions</a> | <a href=\"https://www.marhire.com/cancellation-policy\">Cancellation Policy</a></em>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>','<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <style>\r\n        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }\r\n        .email-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }\r\n        .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; border-radius: 5px 5px 0 0; }\r\n        .content { padding: 20px; }\r\n        .booking-details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }\r\n        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }\r\n        .success { color: #27ae60; font-weight: bold; }\r\n    </style>\r\n</head>\r\n<body>\r\n    <div class=\"email-container\">\r\n        <div class=\"header\">\r\n            <h1>MarHire</h1>\r\n            <p>Booking Confirmed</p>\r\n        </div>\r\n        <div class=\"content\">\r\n            <p>Dear {{client_name}},</p>\r\n            <p class=\"success\">Great news! Your booking has been confirmed.</p>\r\n            \r\n            <div class=\"booking-details\">\r\n                <h3>Confirmed Booking Details:</h3>\r\n                <p><strong>Reference:</strong> {{booking_reference}}</p>\r\n                <p><strong>Service:</strong> {{listing_title}}</p>\r\n                <p><strong>Check-in Date:</strong> {{check_in_date}}</p>\r\n                <p><strong>Check-out Date:</strong> {{check_out_date}}</p>\r\n                <p><strong>Total Amount:</strong> {{currency}} {{total_amount}}</p>\r\n            </div>\r\n            \r\n            <p>Please keep this confirmation for your records.</p>\r\n            <p>If you have any questions, please contact us at {{admin_email}}</p>\r\n            \r\n            <p>We look forward to serving you!</p>\r\n            \r\n            <p>Best regards,<br>The MarHire Team</p>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <p>© 2025 MarHire. All rights reserved.</p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>','Booking Confirmed - {{booking_reference}}','{\"{{currency}}\": \"Currency symbol\", \"{{booking_id}}\": \"Booking ID\", \"{{admin_email}}\": \"Admin email address\", \"{{client_name}}\": \"Customer full name\", \"{{client_email}}\": \"Customer email\", \"{{total_amount}}\": \"Total price\", \"{{check_in_date}}\": \"Check-in/Start date\", \"{{listing_title}}\": \"Service/Product name\", \"{{check_out_date}}\": \"Check-out/End date\", \"{{booking_reference}}\": \"Booking reference number\"}',1,'2025-08-05 18:20:08','2025-08-05 19:09:45'),(3,NULL,'booking_cancelled','Your Booking Has Been Canceled – MarHire','<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\" />\r\n  <title>Booking Confirmation</title>\r\n  <style>\r\n    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }\r\n    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }\r\n    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }\r\n    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }\r\n    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }\r\n    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }\r\n    .help-box {\r\n      background-color: #f1fdfb;\r\n      border: 1px solid #cbe8e4;\r\n      padding: 15px;\r\n      border-radius: 6px;\r\n      font-size: 14px;\r\n      margin-top: 10px;\r\n    }\r\n    .help-box a {\r\n      font-weight: bold;\r\n    }\r\n    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }\r\n    a { color: #225f54; text-decoration: none; }\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"email-container\">\r\n    <div class=\"header\">Your Booking Has Been Canceled – MarHire</div>\r\n    <p>Hello <strong>{{client_name}}</strong>,</p>\r\n    <p>Thank you for booking with <strong>MarHire</strong>. Unfortunately, your booking has been canceled. If you have any questions or would like to reschedule, please contact our support team. Please find the invoice attached to this email.</p>\r\n\r\n    <div class=\"section-title\">Booking Summary</div>\r\n    <table class=\"content-table\">\r\n      <tr><td><strong>Invoice No:</strong></td><td>{{booking_reference}}</td></tr>\r\n      <tr><td><strong>Status:</strong></td><td style=\"color: #d9534f; font-weight: bold;\">Canceled</td></tr>\r\n      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>\r\n      <tr><td><strong>Check In:</strong></td><td>{{check_in_date}}</td></tr>\r\n      <tr><td><strong>Check Out:</strong></td><td>{{check_out_date}}</td></tr>\r\n      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>\r\n    </table>\r\n\r\n    <div class=\"section-title\">Client Information</div>\r\n    <table class=\"content-table\">\r\n      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>\r\n      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>\r\n    </table>\r\n\r\n    <div class=\"section-title\">Need Help?</div>\r\n    <div class=\"help-box\">\r\n      Our support team is here to assist you anytime:<br><br>\r\n      Email: <a href=\"mailto:info@marhire.com\">info@marhire.com</a><br>\r\n      Phone / WhatsApp: <a href=\"tel:+212660745055\">+212 660 745 055</a><br>\r\n      Website: <a href=\"https://www.marhire.com\">www.marhire.com</a>\r\n    </div>\r\n\r\n    <div class=\"footer\">\r\n      Thank you for choosing <strong>MarHire</strong>.<br />\r\n      <em><a href=\"https://www.marhire.com/terms\">Terms & Conditions</a> | <a href=\"https://www.marhire.com/cancellation-policy\">Cancellation Policy</a></em>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>','<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <style>\r\n        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }\r\n        .email-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }\r\n        .header { background-color: #e74c3c; color: #fff; text-align: center; padding: 15px; border-radius: 5px 5px 0 0; }\r\n        .content { padding: 20px; }\r\n        .booking-details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }\r\n        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }\r\n        .cancelled { color: #e74c3c; font-weight: bold; }\r\n    </style>\r\n</head>\r\n<body>\r\n    <div class=\"email-container\">\r\n        <div class=\"header\">\r\n            <h1>MarHire</h1>\r\n            <p>Booking Cancelled</p>\r\n        </div>\r\n        <div class=\"content\">\r\n            <p>Dear {{client_name}},</p>\r\n            <p class=\"cancelled\">Your booking has been cancelled.</p>\r\n            \r\n            <div class=\"booking-details\">\r\n                <h3>Cancelled Booking Details:</h3>\r\n                <p><strong>Reference:</strong> {{booking_reference}}</p>\r\n                <p><strong>Service:</strong> {{listing_title}}</p>\r\n                <p><strong>Original Date:</strong> {{check_in_date}}</p>\r\n            </div>\r\n            \r\n            <p>If you believe this is an error or would like to rebook, please contact us at {{admin_email}}</p>\r\n            \r\n            <p>We hope to serve you in the future.</p>\r\n            \r\n            <p>Best regards,<br>The MarHire Team</p>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <p>© 2025 MarHire. All rights reserved.</p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>','Booking Cancelled - {{booking_reference}}','{\"{{currency}}\": \"Currency symbol\", \"{{booking_id}}\": \"Booking ID\", \"{{admin_email}}\": \"Admin email address\", \"{{client_name}}\": \"Customer full name\", \"{{client_email}}\": \"Customer email\", \"{{total_amount}}\": \"Total price\", \"{{check_in_date}}\": \"Check-in/Start date\", \"{{listing_title}}\": \"Service/Product name\", \"{{check_out_date}}\": \"Check-out/End date\", \"{{booking_reference}}\": \"Booking reference number\"}',1,'2025-08-05 18:20:08','2025-08-05 19:09:45'),(4,NULL,'booking_reminder','Upcoming Booking Reminder – MarHire','<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\" />\r\n  <title>Booking Reminder</title>\r\n  <style>\r\n    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }\r\n    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }\r\n    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }\r\n    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }\r\n    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }\r\n    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }\r\n    .help-box {\r\n      background-color: #f1fdfb;\r\n      border: 1px solid #cbe8e4;\r\n      padding: 15px;\r\n      border-radius: 6px;\r\n      font-size: 14px;\r\n      margin-top: 10px;\r\n    }\r\n    .help-box a {\r\n      font-weight: bold;\r\n    }\r\n    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }\r\n    a { color: #225f54; text-decoration: none; }\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"email-container\">\r\n    <div class=\"header\">Upcoming Booking Reminder – MarHire</div>\r\n    <p>Hello <strong>{{client_name}}</strong>,</p>\r\n    <p>This is a friendly reminder that your upcoming booking with <strong>MarHire</strong> is scheduled to start soon. Please review the details below and make sure everything is in order. <strong>If you decide to cancel or make changes, please let us know as soon as possible.</strong> If you have any questions or last-minute changes, feel free to contact us.</p>\r\n\r\n    <div class=\"section-title\">Booking Summary</div>\r\n    <table class=\"content-table\">\r\n      <tr><td><strong>Invoice No:</strong></td><td>{{booking_reference}}</td></tr>\r\n      <tr><td><strong>Status:</strong></td><td style=\"color: #f0ad4e; font-weight: bold;\">Upcoming</td></tr>\r\n      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>\r\n      <tr><td><strong>Check In:</strong></td><td>{{check_in_date}}</td></tr>\r\n      <tr><td><strong>Check Out:</strong></td><td>{{check_out_date}}</td></tr>\r\n      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>\r\n    </table>\r\n\r\n    <div class=\"section-title\">Client Information</div>\r\n    <table class=\"content-table\">\r\n      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>\r\n      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>\r\n    </table>\r\n\r\n    <div class=\"section-title\">Need Help?</div>\r\n    <div class=\"help-box\">\r\n      Our support team is here to assist you anytime:<br><br>\r\n      Email: <a href=\"mailto:info@marhire.com\">info@marhire.com</a><br>\r\n      Phone / WhatsApp: <a href=\"tel:+212660745055\">+212 660 745 055</a><br>\r\n      Website: <a href=\"https://www.marhire.com\">www.marhire.com</a>\r\n    </div>\r\n\r\n    <div class=\"footer\">\r\n      Thank you for choosing <strong>MarHire</strong>.<br />\r\n      <em><a href=\"https://www.marhire.com/terms\">Terms & Conditions</a> | <a href=\"https://www.marhire.com/cancellation-policy\">Cancellation Policy</a></em>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>','<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <style>\r\n        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }\r\n        .email-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }\r\n        .header { background-color: #f39c12; color: #fff; text-align: center; padding: 15px; border-radius: 5px 5px 0 0; }\r\n        .content { padding: 20px; }\r\n        .booking-details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }\r\n        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }\r\n        .reminder { color: #f39c12; font-weight: bold; }\r\n    </style>\r\n</head>\r\n<body>\r\n    <div class=\"email-container\">\r\n        <div class=\"header\">\r\n            <h1>MarHire</h1>\r\n            <p>Booking Reminder</p>\r\n        </div>\r\n        <div class=\"content\">\r\n            <p>Dear {{client_name}},</p>\r\n            <p class=\"reminder\">This is a friendly reminder about your upcoming booking!</p>\r\n            \r\n            <div class=\"booking-details\">\r\n                <h3>Upcoming Booking Details:</h3>\r\n                <p><strong>Reference:</strong> {{booking_reference}}</p>\r\n                <p><strong>Service:</strong> {{listing_title}}</p>\r\n                <p><strong>Check-in Date:</strong> {{check_in_date}}</p>\r\n                <p><strong>Check-out Date:</strong> {{check_out_date}}</p>\r\n                <p><strong>Total Amount:</strong> {{currency}} {{total_amount}}</p>\r\n            </div>\r\n            \r\n            <p>Please ensure you have all necessary documents and preparations ready.</p>\r\n            <p>If you have any questions or need to make changes, please contact us at {{admin_email}}</p>\r\n            \r\n            <p>We look forward to seeing you soon!</p>\r\n            \r\n            <p>Best regards,<br>The MarHire Team</p>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <p>© 2025 MarHire. All rights reserved.</p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>','Reminder: Your booking is coming up - {{booking_reference}}','{\"{{currency}}\": \"Currency symbol\", \"{{booking_id}}\": \"Booking ID\", \"{{admin_email}}\": \"Admin email address\", \"{{client_name}}\": \"Customer full name\", \"{{client_email}}\": \"Customer email\", \"{{total_amount}}\": \"Total price\", \"{{check_in_date}}\": \"Check-in/Start date\", \"{{listing_title}}\": \"Service/Product name\", \"{{check_out_date}}\": \"Check-out/End date\", \"{{booking_reference}}\": \"Booking reference number\"}',1,'2025-08-05 18:20:08','2025-08-05 19:09:45');
/*!40000 ALTER TABLE `email_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_addon_affecteds`
--

DROP TABLE IF EXISTS `listing_addon_affecteds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_addon_affecteds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `addon_id` int NOT NULL DEFAULT '-1',
  `listing_id` int NOT NULL DEFAULT '-1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_addon_affecteds`
--

LOCK TABLES `listing_addon_affecteds` WRITE;
/*!40000 ALTER TABLE `listing_addon_affecteds` DISABLE KEYS */;
INSERT INTO `listing_addon_affecteds` VALUES (1,1,3,NULL,NULL,NULL),(2,2,3,NULL,NULL,NULL),(3,3,3,NULL,NULL,NULL),(4,6,21,'2025-07-24 19:41:17','2025-07-24 19:41:17',NULL),(5,6,22,'2025-07-24 19:46:20','2025-07-24 19:46:20',NULL),(6,5,22,'2025-07-24 19:46:20','2025-07-24 19:46:20',NULL),(7,5,23,'2025-07-24 19:50:00','2025-07-24 19:50:00',NULL),(8,11,24,'2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(9,12,25,'2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(10,11,27,'2025-07-24 20:44:12','2025-07-24 20:44:12',NULL);
/*!40000 ALTER TABLE `listing_addon_affecteds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_addons`
--

DROP TABLE IF EXISTS `listing_addons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_addons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `addon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int NOT NULL DEFAULT '-1',
  `price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_addons`
--

LOCK TABLES `listing_addons` WRITE;
/*!40000 ALTER TABLE `listing_addons` DISABLE KEYS */;
INSERT INTO `listing_addons` VALUES (1,'Extra Driver',2,10,'2025-07-22 12:59:19','2025-07-22 12:59:19',NULL),(2,'Child Seat',2,20,'2025-07-22 12:59:30','2025-07-22 12:59:30',NULL),(3,'Booster Seat',2,15,'2025-07-22 12:59:43','2025-07-22 12:59:43',NULL),(4,'Sunset Cruise Upgrade',4,12,'2025-07-24 19:37:30','2025-07-24 19:37:30',NULL),(5,'Water Sports Equipment',4,13,'2025-07-24 19:37:47','2025-07-24 19:37:47',NULL),(6,'Private Chef',4,19,'2025-07-24 19:38:07','2025-07-24 19:38:07',NULL),(7,'Multilingual Tour Guide',3,23,'2025-07-24 19:38:34','2025-07-24 19:38:34',NULL),(8,'Wi-Fi Onboard',3,33,'2025-07-24 19:38:51','2025-07-24 19:38:51',NULL),(9,'Child Seat',3,12,'2025-07-24 19:39:06','2025-07-24 19:39:06',NULL),(10,'Photo & Video Souvenir Package',5,23,'2025-07-24 19:39:20','2025-07-24 19:39:20',NULL),(11,'Offer Moroccan tea',5,24,'2025-07-24 19:39:47','2025-07-24 19:39:47',NULL),(12,'Insurance or Safety',5,24,'2025-07-24 19:40:03','2025-07-24 19:40:03',NULL);
/*!40000 ALTER TABLE `listing_addons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_galleries`
--

DROP TABLE IF EXISTS `listing_galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_galleries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `listing_id` int NOT NULL DEFAULT '-1',
  `file_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_galleries`
--

LOCK TABLES `listing_galleries` WRITE;
/*!40000 ALTER TABLE `listing_galleries` DISABLE KEYS */;
INSERT INTO `listing_galleries` VALUES (1,2,NULL,'images/listings/listing_68761c4041ea6.webp','2025-07-15 09:15:44','2025-07-15 09:15:44',NULL),(2,3,NULL,'images/listings/listing_68761ce186587.webp','2025-07-15 09:18:25','2025-07-15 09:18:25',NULL),(3,4,NULL,'images/listings/listing_68761d8cc62fb.webp','2025-07-15 09:21:16','2025-07-15 09:21:16',NULL),(4,5,NULL,'images/listings/listing_68761dfc7ae82.webp','2025-07-15 09:23:08','2025-07-15 09:23:08',NULL),(5,6,NULL,'images/listings/listing_68761ebb0e7fe.png','2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(6,7,NULL,'images/listings/listing_68761f081ab08.png','2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(7,8,NULL,'images/listings/listing_68761f71ed66b.png','2025-07-15 09:29:21','2025-07-15 09:29:21',NULL),(8,9,NULL,'images/listings/listing_68761fc251adf.webp','2025-07-15 09:30:42','2025-07-15 09:30:42',NULL),(9,10,NULL,'images/listings/listing_6876554ab6dd4.webp','2025-07-15 13:19:06','2025-07-15 13:19:06',NULL),(10,11,NULL,'images/listings/listing_687655a6121aa.webp','2025-07-15 13:20:38','2025-07-15 13:20:38',NULL),(11,12,NULL,'images/listings/listing_68765607eab77.webp','2025-07-15 13:22:15','2025-07-15 13:22:15',NULL),(12,13,NULL,'images/listings/listing_6876564f54c56.webp','2025-07-15 13:23:27','2025-07-15 13:23:27',NULL),(13,14,NULL,'images/listings/listing_68765956779dd.webp','2025-07-15 13:36:22','2025-07-15 13:36:22',NULL),(14,15,NULL,'images/listings/listing_68765a6cc3fb9.jpg','2025-07-15 13:41:00','2025-07-15 13:41:00',NULL),(15,16,NULL,'images/listings/listing_68765adc9f3a6.jpg','2025-07-15 13:42:52','2025-07-15 13:42:52',NULL),(16,17,NULL,'images/listings/listing_68765b3287fc1.jpg','2025-07-15 13:44:18','2025-07-15 13:44:18',NULL),(17,18,NULL,'images/listings/listing_68765b7f43f79.jpg','2025-07-15 13:45:35','2025-07-15 13:45:35',NULL),(18,19,NULL,'images/listings/listing_687672f776d33.jpg','2025-07-15 15:25:43','2025-07-15 15:25:43',NULL),(19,20,NULL,'images/listings/listing_68767f29968b8.jpg','2025-07-15 16:17:45','2025-07-15 16:17:45',NULL),(20,21,NULL,'images/listings/listing_68827e4d95b8e.jpg','2025-07-24 19:41:17','2025-07-24 19:41:17',NULL),(21,22,NULL,'images/listings/listing_68827f7c7dff8.jpg','2025-07-24 19:46:20','2025-07-24 19:46:20',NULL),(22,23,NULL,'images/listings/listing_688280589d5a9.jpg','2025-07-24 19:50:00','2025-07-24 19:50:00',NULL),(23,24,NULL,'images/listings/listing_688285afd11b5.jpg','2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(24,24,NULL,'images/listings/listing_688285afd1cea.jpg','2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(25,24,NULL,'images/listings/listing_688285afd1ebd.jpg','2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(26,25,NULL,'images/listings/listing_688289c4636ce.jpg','2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(27,25,NULL,'images/listings/listing_688289c4644a8.jpg','2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(28,25,NULL,'images/listings/listing_688289c464753.jpg','2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(29,26,NULL,'images/listings/listing_68828b3b69be9.jpg','2025-07-24 20:36:27','2025-07-24 20:36:27',NULL),(30,26,NULL,'images/listings/listing_68828b3b6adbf.jpg','2025-07-24 20:36:27','2025-07-24 20:36:27',NULL),(31,26,NULL,'images/listings/listing_68828b3b6aff3.jpg','2025-07-24 20:36:27','2025-07-24 20:36:27',NULL),(32,26,NULL,'images/listings/listing_68828b3b6b1e8.jpg','2025-07-24 20:36:27','2025-07-24 20:36:27',NULL),(33,26,NULL,'images/listings/listing_68828b3b6b3fc.jpg','2025-07-24 20:36:27','2025-07-24 20:36:27',NULL),(34,27,NULL,'images/listings/listing_68828d0c54408.jpg','2025-07-24 20:44:12','2025-07-24 20:44:12',NULL),(35,27,NULL,'images/listings/listing_68828d0c5505a.jpg','2025-07-24 20:44:12','2025-07-24 20:44:12',NULL);
/*!40000 ALTER TABLE `listing_galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_includeds`
--

DROP TABLE IF EXISTS `listing_includeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_includeds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `item` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `listing_id` int NOT NULL DEFAULT '-1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_includeds`
--

LOCK TABLES `listing_includeds` WRITE;
/*!40000 ALTER TABLE `listing_includeds` DISABLE KEYS */;
INSERT INTO `listing_includeds` VALUES (1,'Fuel',2,'2025-07-15 09:15:44','2025-07-15 09:15:44',NULL),(2,'Life Jackets',2,'2025-07-15 09:15:44','2025-07-15 09:15:44',NULL),(3,'WI-FI',2,'2025-07-15 09:15:44','2025-07-15 09:15:44',NULL),(4,'Fuel',3,'2025-07-15 09:18:25','2025-07-15 09:18:25',NULL),(5,'Life Jackets',3,'2025-07-15 09:18:25','2025-07-15 09:18:25',NULL),(6,'WI-FI',3,'2025-07-15 09:18:25','2025-07-15 09:18:25',NULL),(7,'Fuel',4,'2025-07-15 09:21:16','2025-07-15 09:21:16',NULL),(8,'Life Jackets',4,'2025-07-15 09:21:16','2025-07-15 09:21:16',NULL),(9,'WI-FI',4,'2025-07-15 09:21:16','2025-07-15 09:21:16',NULL),(10,'Fuel',5,'2025-07-15 09:23:08','2025-07-15 09:23:08',NULL),(11,'Life Jackets',5,'2025-07-15 09:23:08','2025-07-15 09:23:08',NULL),(12,'WI-FI',5,'2025-07-15 09:23:08','2025-07-15 09:23:08',NULL),(13,'Fuel',6,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(14,'Life Jackets',6,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(15,'WI-FI',6,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(16,'sah',21,'2025-07-24 19:41:17','2025-07-24 19:41:17',NULL),(17,'sah',22,'2025-07-24 19:46:20','2025-07-24 19:46:20',NULL),(18,'ssaq',23,'2025-07-24 19:50:00','2025-07-24 19:50:00',NULL),(19,'sah',24,'2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(20,'ssaq',25,'2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(21,'test 1',27,'2025-07-24 20:44:12','2025-07-24 20:44:12',NULL);
/*!40000 ALTER TABLE `listing_includeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_not_includeds`
--

DROP TABLE IF EXISTS `listing_not_includeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_not_includeds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `item` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `listing_id` int NOT NULL DEFAULT '-1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_not_includeds`
--

LOCK TABLES `listing_not_includeds` WRITE;
/*!40000 ALTER TABLE `listing_not_includeds` DISABLE KEYS */;
INSERT INTO `listing_not_includeds` VALUES (1,'Meals',2,'2025-07-15 09:15:44','2025-07-15 09:15:44',NULL),(2,'Tips',2,'2025-07-15 09:15:44','2025-07-15 09:15:44',NULL),(3,'Meals',3,'2025-07-15 09:18:25','2025-07-15 09:18:25',NULL),(4,'Tips',3,'2025-07-15 09:18:25','2025-07-15 09:18:25',NULL),(5,'Meals',4,'2025-07-15 09:21:16','2025-07-15 09:21:16',NULL),(6,'Tips',4,'2025-07-15 09:21:16','2025-07-15 09:21:16',NULL),(7,'Meals',5,'2025-07-15 09:23:08','2025-07-15 09:23:08',NULL),(8,'Tips',5,'2025-07-15 09:23:08','2025-07-15 09:23:08',NULL),(9,'Meals',6,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(10,'Tips',6,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(11,'azdhlzkfh',21,'2025-07-24 19:41:17','2025-07-24 19:41:17',NULL),(12,'azdhlzkfh',22,'2025-07-24 19:46:20','2025-07-24 19:46:20',NULL),(13,'efffez',23,'2025-07-24 19:50:00','2025-07-24 19:50:00',NULL),(14,'azdhlzkfh',24,'2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(15,'azdhlzkfh',25,'2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(16,'test',27,'2025-07-24 20:44:12','2025-07-24 20:44:12',NULL);
/*!40000 ALTER TABLE `listing_not_includeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_pricings`
--

DROP TABLE IF EXISTS `listing_pricings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_pricings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `listing_id` int NOT NULL DEFAULT '-1',
  `element` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_pricings`
--

LOCK TABLES `listing_pricings` WRITE;
/*!40000 ALTER TABLE `listing_pricings` DISABLE KEYS */;
INSERT INTO `listing_pricings` VALUES (1,15,'1h',10,'2025-07-15 13:41:00','2025-07-15 13:41:00',NULL),(2,15,'2h',20,'2025-07-15 13:41:00','2025-07-15 13:41:00',NULL),(3,15,'3h',30,'2025-07-15 13:41:00','2025-07-15 13:41:00',NULL),(4,16,'1h',10,'2025-07-15 13:42:52','2025-07-15 13:42:52',NULL),(5,16,'2h',20,'2025-07-15 13:42:52','2025-07-15 13:42:52',NULL),(6,16,'3h',30,'2025-07-15 13:42:52','2025-07-15 13:42:52',NULL),(7,17,'1h',10,'2025-07-15 13:44:18','2025-07-15 13:44:18',NULL),(8,17,'2h',20,'2025-07-15 13:44:18','2025-07-15 13:44:18',NULL),(9,17,'3h',30,'2025-07-15 13:44:18','2025-07-15 13:44:18',NULL),(10,18,'1h',10,'2025-07-15 13:45:35','2025-07-15 13:45:35',NULL),(11,18,'2h',20,'2025-07-15 13:45:35','2025-07-15 13:45:35',NULL),(12,19,'3h',30,'2025-07-15 13:45:35','2025-07-15 13:45:35',NULL),(13,24,'camel with tea',50,'2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(14,24,'camel only',25,'2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(15,25,'camel with tea',34,'2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(16,25,'GRET',43,'2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(17,25,'TREF',43,'2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(18,27,'full day',67,'2025-07-24 20:44:12','2025-07-24 20:44:12',NULL);
/*!40000 ALTER TABLE `listing_pricings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_schedules`
--

DROP TABLE IF EXISTS `listing_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_schedules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `listing_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_schedules`
--

LOCK TABLES `listing_schedules` WRITE;
/*!40000 ALTER TABLE `listing_schedules` DISABLE KEYS */;
INSERT INTO `listing_schedules` VALUES (1,'08:00',15,'2025-07-15 13:41:00','2025-07-15 13:41:00',NULL),(2,'10:00',15,'2025-07-15 13:41:00','2025-07-15 13:41:00',NULL),(3,'08:00',16,'2025-07-15 13:42:52','2025-07-15 13:42:52',NULL),(4,'10:00',16,'2025-07-15 13:42:52','2025-07-15 13:42:52',NULL),(5,'12:00',16,'2025-07-15 13:42:52','2025-07-15 13:42:52',NULL),(6,'ahan',24,'2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(7,'ahan',25,'2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(8,'morning',27,'2025-07-24 20:44:12','2025-07-24 20:44:12',NULL);
/*!40000 ALTER TABLE `listing_schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci,
  `schema_markup` text COLLATE utf8mb4_unicode_ci,
  `category_id` int NOT NULL DEFAULT '-1',
  `city_id` int NOT NULL DEFAULT '-1',
  `car_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `car_model` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicule_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicule_model` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fuel_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transmission` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seats` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doors` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` int NOT NULL DEFAULT '-1',
  `ac` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mileage_policy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fuel_policy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `driver_requirement` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deposit_required` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deposit_amount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deposit_note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `special_notes` text COLLATE utf8mb4_unicode_ci,
  `pickup_info` text COLLATE utf8mb4_unicode_ci,
  `boat_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `with_captain` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration_options` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_duration_options` json DEFAULT NULL,
  `purpose_tags` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `departure_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `max_passengers` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `max_luggage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `languages_spoken` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activity_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schedule_options` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_point` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `private_or_group` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_size_min` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_size_max` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `difficulty` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `dealer_note` text COLLATE utf8mb4_unicode_ci,
  `rental_terms` text COLLATE utf8mb4_unicode_ci,
  `cancellation_policy` text COLLATE utf8mb4_unicode_ci,
  `disclaimer` text COLLATE utf8mb4_unicode_ci,
  `price_per_hour` double DEFAULT NULL,
  `price_per_half_day` double DEFAULT NULL,
  `price_per_day` double DEFAULT NULL,
  `price_per_week` double DEFAULT NULL,
  `price_per_month` double DEFAULT NULL,
  `price_per_person` double DEFAULT NULL,
  `price_per_group` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (1,'test','slug1','Dacia','Dacia meta',NULL,2,2,'59','52',NULL,NULL,NULL,'2024','Petrol','Manual','5','4',3,'Yes',NULL,'Unlimited km','Full to Full','21-70 years','Yes','100',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,10,20,30,NULL,NULL,'2025-07-15 09:09:34','2025-07-15 09:09:34',NULL),(2,'Dacia Logane','slug2',NULL,NULL,NULL,2,2,'59','52',NULL,NULL,NULL,'2024','Diesel','Automatic','5','4',3,'Yes',NULL,'Unlimited km','Full to Full','21-70 years','No',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,16,60,200,NULL,NULL,'2025-07-15 09:15:44','2025-07-15 09:15:44',NULL),(3,'Hyndai Accent CTM','slug3',NULL,NULL,NULL,2,3,'60','54',NULL,NULL,NULL,'2023','Petrol','Manual','5','4',3,'Yes',NULL,'100 km/day','Same to Same','26-70 years','No',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,30,60,200,NULL,NULL,'2025-07-15 09:18:25','2025-07-15 09:18:25',NULL),(4,'Fiat Tipo','slug4',NULL,NULL,NULL,2,3,'59','52',NULL,NULL,NULL,'2024','Petrol','Manual','4','4',3,'Yes',NULL,'100 km/day','Full to Full','21-70 years','No',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,20,60,200,NULL,NULL,'2025-07-15 09:21:16','2025-07-15 09:21:16',NULL),(5,'VW Golf 8','slug5',NULL,NULL,NULL,2,3,'61','52',NULL,NULL,NULL,'2023','Diesel','Manual','4','4',3,'Yes',NULL,'100 km/day','Full to Full','21-70 years','No',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,15,60,100,NULL,NULL,'2025-07-15 09:23:08','2025-07-15 09:23:08',NULL),(6,'Nissan','slug6',NULL,NULL,NULL,3,3,NULL,NULL,'72','71',NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10','10','Airport','English,French',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(7,'Iveco','slug7',NULL,NULL,NULL,3,3,NULL,NULL,'73','76',NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10','6','airport','French',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(8,'Renault Kangoo','slug8',NULL,NULL,NULL,3,3,NULL,NULL,'73','71',NULL,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5','10','Airport','English',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-15 09:29:21','2025-07-15 09:29:21',NULL),(9,'Renault Master 12M3','slug9',NULL,NULL,NULL,3,3,NULL,NULL,'72','77',NULL,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4','10','Airport','English',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-15 09:30:42','2025-07-15 09:30:42',NULL),(10,'Bali 4.4 | La Calma','slug10',NULL,NULL,NULL,4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'55','Yes','10','2h',NULL,'Family Outing','Agadir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,10,20,30,NULL,NULL,NULL,NULL,'2025-07-15 13:19:06','2025-07-15 13:19:06',NULL),(11,'Jeanneau Sun Odyssey 479','slug11',NULL,NULL,NULL,4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'56','Yes','40','Full-Day',NULL,'Fishing Trip','Agadir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,10,20,30,NULL,NULL,NULL,NULL,'2025-07-15 13:20:38','2025-07-15 13:20:38',NULL),(12,'Beneteau Oceanis 45','slug12',NULL,NULL,NULL,4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'67','No','23','Half-Day',NULL,'Romantic Experience','Agadir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,10,20,30,NULL,NULL,NULL,NULL,'2025-07-15 13:22:15','2025-07-15 13:22:15',NULL),(13,'Delta 365','slug13',NULL,NULL,NULL,4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'56','Yes','15','Half-Day',NULL,'Private Cruise','Agadir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,15,20,40,NULL,NULL,NULL,NULL,'2025-07-15 13:23:27','2025-07-15 13:23:27',NULL),(14,'Boat Casablanca','slug14',NULL,NULL,NULL,4,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'56','Yes','10','Half-Day',NULL,'Family Outing','Casablanca',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,10,20,30,NULL,NULL,NULL,NULL,'2025-07-15 13:36:22','2025-07-15 13:36:22',NULL),(15,'Quad Bike Tour','slug15',NULL,NULL,NULL,5,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1h',NULL,NULL,NULL,NULL,NULL,NULL,'English','57',NULL,'Yes','Agadir Centre','Private',NULL,NULL,'Easy','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-15 13:41:00','2025-07-15 13:41:00',NULL),(16,'Buggy Tour','guad',NULL,NULL,NULL,5,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Half-Day',NULL,NULL,NULL,NULL,NULL,NULL,'French','58',NULL,'No','Agadir Centre','Group','5','10','Hard','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-15 13:42:52','2025-07-15 13:42:52',NULL),(17,'Buggy Rover','slug17',NULL,NULL,NULL,5,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Half-Day',NULL,NULL,NULL,NULL,NULL,NULL,'French','58',NULL,'Yes','Agadir Centre','Private',NULL,NULL,'Medium','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-15 13:44:18','2025-07-15 13:44:18',NULL),(18,'Horse Ride Tour','slug18',NULL,NULL,NULL,5,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3h',NULL,NULL,NULL,NULL,NULL,NULL,'French','57',NULL,'Yes','Agadir Centre','Private',NULL,NULL,'Medium','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-15 13:45:35','2025-07-15 13:45:35',NULL),(19,'test','slug19',NULL,NULL,NULL,2,3,'59','54',NULL,NULL,NULL,'2021','Hybrid','Manual','5','4',3,'Yes',NULL,'100 km/day','Full to Full','21-70 years','No',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,10,20,30,NULL,NULL,'2025-07-15 15:25:43','2025-07-15 15:25:43',NULL),(20,'tst 3','slug-bt23',NULL,NULL,NULL,2,2,'60','52',NULL,NULL,NULL,'2024','Hybrid','Manual','5','5',3,'Yes',NULL,'Unlimited km','Full to Full','21-70 years','No',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.','The Renault Clio 5 2025 is a masterpiece of compact design,\r\n                    blending sporty aesthetics with advanced features, making it\r\n                    an ideal choice for urban drivers who want a stylish yet\r\n                    practical vehicle. Its sleek, aerodynamic silhouette makes\r\n                    it one of the most eye-catching hatchbacks in its class.\r\n                    Inside, the Clio 5 feels surprisingly spacious, offering a\r\n                    premium feel with high-quality materials and a\r\n                    well-organized dashboard.',NULL,NULL,NULL,NULL,NULL,NULL,10,20,30,NULL,NULL,'2025-07-15 16:17:45','2025-07-15 16:17:45',NULL),(21,'boat test agadir','','test','asny adkd a;dd adj','aefqskdugsf',4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets</p>',NULL,'55','Yes','10','2h',NULL,'Fishing Trip','agadir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets</p>','<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets</p>','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets',NULL,NULL,NULL,13,55,116,NULL,NULL,NULL,NULL,'2025-07-24 19:41:17','2025-07-24 19:41:17',NULL),(22,'boat test casablanca','-1','test','had nika gaaah','lalaqkid',4,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>',NULL,'67','Yes','20','1h,2h,3h,Half-Day,Full-Day',NULL,'Romantic Experience,Family Outing,Sunset Cruise','agadir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>','<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their</p>','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their',NULL,NULL,NULL,11,55,115,NULL,NULL,NULL,NULL,'2025-07-24 19:46:20','2025-07-24 19:46:20',NULL),(23,'test boat marrakech','-2','test','kaalij','abankij',4,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing</p>',NULL,'56','Yes','23','1h,3h,Half-Day',NULL,'Family Outing,Sunset Cruise,Birthday Celebration,Luxury Experience','agadir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing</p>','<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing</p>','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing',NULL,NULL,NULL,13,45,119,NULL,NULL,NULL,NULL,'2025-07-24 19:50:00','2025-07-24 19:50:00',NULL),(24,'التجلج على الرمال فاس','-3','test','alanike sdvqdv','qdvqd zkgsKJ',5,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock</p>',NULL,NULL,NULL,NULL,'1h,2h,3h,Half-Day,Full-Day',NULL,NULL,NULL,NULL,NULL,NULL,'English,French,Arabic,Spanish','58',NULL,'Yes','fes','Private',NULL,NULL,'Medium','<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,</p>','<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,</p>','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-24 20:12:47','2025-07-24 20:12:47',NULL),(25,'surf naaady','-4','test','anaaki jan kal','anaaki jan kal',5,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>',NULL,NULL,NULL,NULL,'2h,3h,Half-Day',NULL,NULL,NULL,NULL,NULL,NULL,'French','79',NULL,'Yes','fes','Private',NULL,NULL,'Medium','<p>need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>','<p>need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>','need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-24 20:30:12','2025-07-24 20:30:12',NULL),(26,'HADL','-5','anaaki jan kal','anaaki jan kal','anaaki jan kal',4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>anaaki jan kal</p>',NULL,'56','Yes','23','2h,3h',NULL,'Fishing Trip','agadir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>anaaki jan kal</p>','<p>anaaki jan kal</p>','anaaki jan kal',NULL,NULL,NULL,15,55,115,NULL,NULL,NULL,NULL,'2025-07-24 20:36:27','2025-07-24 20:36:27',NULL),(27,'camel ride','camel-ride-essaouira','camel ride essaouira','this is  camel ride essaouira hope you get it',NULL,5,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>he cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.</p>',NULL,NULL,NULL,NULL,'1h,2h,3h',NULL,NULL,NULL,NULL,NULL,NULL,'English','78',NULL,'Yes','mogador','Private',NULL,NULL,'Medium','<p>he cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.</p>','<p>he cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.</p>',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-07-24 20:44:12','2025-07-24 20:44:12',NULL);
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2016_06_01_000001_create_oauth_auth_codes_table',1),(4,'2016_06_01_000002_create_oauth_access_tokens_table',1),(5,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(6,'2016_06_01_000004_create_oauth_clients_table',1),(7,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(8,'2019_08_19_000000_create_failed_jobs_table',1),(9,'2019_12_14_000001_create_personal_access_tokens_table',1),(10,'2022_12_12_130619_create_societes_table',1),(11,'2024_05_07_111455_create_notifications_table',1),(12,'2024_12_04_205617_create_jobs_table',1),(13,'2025_03_03_123544_create_brands_table',1),(14,'2025_04_21_211048_create_categories_table',1),(15,'2025_04_21_211431_create_sub_categories_table',1),(16,'2025_04_28_112615_create_cities_table',1),(17,'2025_04_28_113624_create_agencies_table',1),(18,'2025_04_28_113652_create_listings_table',1),(19,'2025_04_29_175937_create_sub_category_options_table',1),(20,'2025_04_29_212337_create_agency_features_table',1),(21,'2025_04_29_224551_create_agency_sub_categories_table',1),(22,'2025_05_05_171316_create_listing_addons_table',1),(23,'2025_05_05_201957_create_listing_galleries_table',1),(24,'2025_05_06_132711_create_listing_includeds_table',1),(25,'2025_05_06_132910_create_listing_not_includeds_table',1),(26,'2025_05_06_175639_create_listing_addon_affecteds_table',1),(27,'2025_05_14_120603_create_listing_pricings_table',1),(28,'2025_05_14_131234_create_terms_and_conditions_table',1),(29,'2025_05_14_180450_create_bookings_table',1),(30,'2025_05_14_181358_create_booking_addons_table',1),(31,'2025_05_16_104332_create_countries_table',1),(32,'2025_05_23_144034_create_coupons_table',1),(33,'2025_05_26_200849_create_private_listing_pricings_table',1),(34,'2025_06_10_152329_create_amenities_table',1),(35,'2025_06_10_174732_create_listing_schedules_table',1),(36,'2025_07_14_142948_create_articles_table',1),(37,'2025_07_22_181321_create_pages_table',1),(38,'2025_07_31_130920_update_bookings_table_v2',1),(63,'2025_01_31_create_custom_booking_options_table',2),(64,'2025_01_31_create_driver_pricing_table',2),(65,'2025_01_31_remove_things_duration_add_options',2),(66,'2025_01_31_update_boats_custom_durations',2),(67,'2025_08_05_141406_create_email_logs_table',3),(68,'2025_08_05_191550_create_email_templates_table',3),(69,'2025_08_05_193300_create_scheduled_reminders_table',4),(70,'2025_08_05_194348_create_email_settings_table',5),(71,'2025_08_05_200058_update_email_logs_status_enum',6),(72,'2025_08_05_201200_make_booking_id_nullable_in_email_logs',7);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `id_obj` int DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seen` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `client_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `client_id` bigint unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci,
  `schema_markup` longtext COLLATE utf8mb4_unicode_ci,
  `content_sections` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,'/','Marhire: Car Rental CTM','Marhire: Car Rental Booking CTM','<script type=\"application/ld+json\">\r\n{\r\n  \"@context\": \"https://schema.org\",\r\n  \"@type\": \"CarRental\",\r\n  \"name\": \"MarHire Car Rental\",\r\n  \"description\": \"Affordable car rental services with and without driver in Morocco. Pickup at airport or city center.\",\r\n  \"url\": \"https://yourdomain.com\",\r\n  \"logo\": \"https://yourdomain.com/images/logo.png\",\r\n  \"telephone\": \"+212600000000\",\r\n  \"address\": {\r\n    \"@type\": \"PostalAddress\",\r\n    \"streetAddress\": \"123 Boulevard Zerktouni\",\r\n    \"addressLocality\": \"Casablanca\",\r\n    \"addressRegion\": \"Casablanca-Settat\",\r\n    \"postalCode\": \"20000\",\r\n    \"addressCountry\": \"MA\"\r\n  },\r\n  \"openingHours\": \"Mo-Su 08:00-22:00\",\r\n  \"sameAs\": [\r\n    \"https://www.facebook.com/marhire\",\r\n    \"https://www.instagram.com/marhire\"\r\n  ],\r\n  \"priceRange\": \"$$\",\r\n  \"aggregateRating\": {\r\n    \"@type\": \"AggregateRating\",\r\n    \"ratingValue\": \"4.6\",\r\n    \"reviewCount\": \"190\"\r\n  }\r\n}\r\n</script>','[{\"text\": \"The freedom of the open road is so appealing for good reason: Having your own set of wheels puts you in control of what you\'re doing and when you\'re doing it. When you rent a car, there\'s no need to worry about public transport that\'s delayed...\", \"title\": \"Reasons to rent a car\"}, {\"text\": \"Car class and supplier: Economy, compact, midsize, convertible... there are all kinds of cars to choose from and each comes with its own conditions.\", \"title\": \"Things to look out for\"}, {\"text\": \"Input your desired pick-up/drop-off points and dates in the search field at the top of the page. If you\'ve got a specific collection or return time in mind, you can add it here, too...\", \"title\": \"How to book your rental car\"}, {\"text\": \"If you\'re renting a car within the US, whether as a one-way rental or a long-term one, your personal auto insurance might cover you...\", \"title\": \"Insurance requirements\"}, {\"text\": \"Certain rental car providers might ask you to provide a credit card or put down a deposit before you drive off into the sunset.\", \"title\": \"Deposits and debit cards\"}, {\"text\": \"CTM\", \"title\": \"CTM\"}]','2025-07-22 18:11:51','2025-07-23 21:37:47',NULL),(2,'about-us','Marhire: About us CTM','About us meta',NULL,'[{\"text\": \"The freedom of the open road is so appealing for good reason: Having your own set of wheels puts you in control of what you\'re doing and when you\'re doing it. When you rent a car, there\'s no need to worry about public transport that\'s delayed...\", \"title\": \"Reasons to rent a car\"}, {\"text\": \"Car class and supplier: Economy, compact, midsize, convertible... there are all kinds of cars to choose from and each comes with its own conditions.\", \"title\": \"Things to look out for\"}, {\"text\": \"Input your desired pick-up/drop-off points and dates in the search field at the top of the page. If you\'ve got a specific collection or return time in mind, you can add it here, too...\", \"title\": \"How to book your rental car\"}, {\"text\": \"If you\'re renting a car within the US, whether as a one-way rental or a long-term one, your personal auto insurance might cover you...\", \"title\": \"Insurance requirements\"}, {\"text\": \"Certain rental car providers might ask you to provide a credit card or put down a deposit before you drive off into the sunset.\", \"title\": \"Deposits and debit cards\"}]','2025-07-22 18:12:56','2025-07-23 21:40:09',NULL),(3,'how-we-work','Marhire: How we Work','Marhire: How we Work Meta',NULL,NULL,'2025-07-22 18:14:22','2025-07-22 18:14:22',NULL),(4,'list-your-property','List Your Property or Service on MarHire','List Your Property or Service on MarHire Meta',NULL,NULL,'2025-07-22 18:15:06','2025-07-22 18:15:06',NULL),(5,'faq','Marhire: FAQ','Marhire: FAQ Meta',NULL,NULL,'2025-07-22 18:15:30','2025-07-22 18:15:30',NULL),(6,'blog','Marhire: Blog CTM','Marhire: Blog Meta',NULL,NULL,'2025-07-22 18:16:18','2025-07-23 21:40:33',NULL),(7,'terms-conditions','Marhire: Terms & conditions','Marhire: Terms & conditions meta',NULL,NULL,'2025-07-22 18:16:50','2025-07-22 18:16:50',NULL),(8,'privacy-policy','Marhire: Privacy Policy','Marhire: Privacy Policy meta',NULL,NULL,'2025-07-22 18:17:18','2025-07-22 18:17:18',NULL),(9,'cookie-policy','Marhire: Cookie Policy','Marhire: Cookie Policy meta',NULL,NULL,'2025-07-22 18:17:43','2025-07-22 18:17:43',NULL),(10,'cancellation-policy','Marhire: Cancellation Policy','Marhire: Cancellation Policy meta',NULL,NULL,'2025-07-22 18:18:09','2025-07-22 18:18:09',NULL),(11,'insurance-conditions','Marhire: Insurance Conditions','Marhire: Insurance Conditions meta',NULL,NULL,'2025-07-22 18:18:39','2025-07-22 18:18:39',NULL),(12,'category/car-rental','Car Rental in Morocco | Cheap Prices, No Deposit, Free Pickup – MarHire CTM','Compare & book car rentals across Morocco with no deposit, unlimited kilometers, and airport pickup. Full insurance included. Book with MarHire – trusted local partners.',NULL,'[{\"text\": \"ee\", \"title\": \"cc\"}]','2025-07-22 18:19:36','2025-07-23 21:41:38',NULL),(13,'category/private-driver','Private Driver Morocco | Book Chauffeur & Airport Transfers – MarHire','Hire a private driver in Morocco for business, airport pickup, or guided day tours. Multilingual chauffeurs. No deposit. Fixed price. 24/7 support.',NULL,NULL,'2025-07-22 18:19:54','2025-07-22 19:04:12',NULL),(14,'category/boats','Boat Rental in Morocco | Private Cruises, Fishing & Sunset Tours – MarHire','Rent boats, yachts, and speedboats in Morocco with captain included. Private tours, sunset cruises, fishing trips, and party boats. Book online with MarHire.',NULL,NULL,'2025-07-22 18:20:12','2025-07-22 19:04:48',NULL),(15,'category/things-to-do','Things to Do in Morocco | Top Tours, Activities & Experiences – MarHire','Discover the best things to do in Morocco. Book camel rides, quad tours, food classes & cultural activities. Free cancellation. Local guides. Verified partners.',NULL,NULL,'2025-07-22 18:20:32','2025-07-22 19:05:26',NULL),(16,'city/*','$CITY Travel Services | Car Rental, Drivers, Boats & Tours – MarHire CTM','Explore verified travel services in $CITY with MarHire. Rent cars with no deposit, book private drivers, enjoy boat trips & tours. Transparent pricing, local experts.',NULL,'[{\"text\": \"The freedom of the open road is so appealing for good reason: Having your own set of wheels puts you in control of what you\'re doing and when you\'re doing it. When you rent a car, there\'s no need to worry about public transport that\'s delayed...\", \"title\": \"Reasons to rent a car\"}, {\"text\": \"Input your desired pick-up/drop-off points and dates in the search field at the top of the page. If you\'ve got a specific collection or return time in mind, you can add it here, too...\", \"title\": \"How to book your rental car\"}, {\"text\": \"Car class and supplier: Economy, compact, midsize, convertible... there are all kinds of cars to choose from and each comes with its own conditions.\", \"title\": \"Things to look out for\"}, {\"text\": \"If you\'re renting a car within the US, whether as a one-way rental or a long-term one, your personal auto insurance might cover you...\", \"title\": \"Insurance requirements\"}, {\"text\": \"Certain rental car providers might ask you to provide a credit card or put down a deposit before you drive off into the sunset.\", \"title\": \"Deposits and debit cards\"}]','2025-07-22 19:11:26','2025-07-23 21:42:28',NULL),(17,'agency/*','$AGENCY - Rental Agency CTM','$AGENCY - Rental Agency meta',NULL,NULL,'2025-07-22 19:19:52','2025-07-23 21:43:11',NULL),(18,'category/car-rental/$city','Car Rental in $city','META in $city',NULL,'[{\"text\": \"Car Rental in $city\", \"title\": \"Car Rental in $city\"}]','2025-07-23 10:57:34','2025-07-23 21:44:14',NULL),(19,'category/private-driver/$city','Private driver in $city',NULL,NULL,NULL,'2025-07-23 10:57:59','2025-07-23 10:57:59',NULL),(20,'category/boats/$city','Boat Rental in $city',NULL,NULL,NULL,'2025-07-23 10:59:38','2025-07-23 10:59:38',NULL),(21,'category/things-to-do/$city','Things To Do in $city',NULL,NULL,NULL,'2025-07-23 11:00:04','2025-07-23 11:00:04',NULL);
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_listing_pricings`
--

DROP TABLE IF EXISTS `private_listing_pricings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_listing_pricings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `listing_id` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `airport_one` double NOT NULL DEFAULT '0',
  `airport_round` double NOT NULL DEFAULT '0',
  `intercity_one` double NOT NULL DEFAULT '0',
  `intercity_round` double NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_listing_pricings`
--

LOCK TABLES `private_listing_pricings` WRITE;
/*!40000 ALTER TABLE `private_listing_pricings` DISABLE KEYS */;
INSERT INTO `private_listing_pricings` VALUES (1,6,3,10,20,30,40,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(2,6,2,10,20,30,40,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(3,6,6,10,20,30,40,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(4,6,5,10,20,30,40,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(5,6,4,10,20,30,40,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(6,6,7,0,0,0,0,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(7,6,8,0,0,0,0,'2025-07-15 09:26:19','2025-07-15 09:26:19',NULL),(8,7,3,10,20,30,40,'2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(9,7,2,10,20,30,40,'2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(10,7,6,10,20,30,40,'2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(11,7,5,0,0,0,0,'2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(12,7,4,0,0,0,0,'2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(13,7,7,0,0,0,0,'2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(14,7,8,0,0,0,0,'2025-07-15 09:27:36','2025-07-15 09:27:36',NULL),(15,8,3,10,20,30,40,'2025-07-15 09:29:21','2025-07-15 09:29:21',NULL),(16,8,2,10,20,30,40,'2025-07-15 09:29:21','2025-07-15 09:29:21',NULL),(17,8,6,10,20,30,40,'2025-07-15 09:29:21','2025-07-15 09:29:21',NULL),(18,8,5,0,0,0,0,'2025-07-15 09:29:22','2025-07-15 09:29:22',NULL),(19,8,4,0,0,0,0,'2025-07-15 09:29:22','2025-07-15 09:29:22',NULL),(20,8,7,0,0,0,0,'2025-07-15 09:29:22','2025-07-15 09:29:22',NULL),(21,8,8,0,0,0,0,'2025-07-15 09:29:22','2025-07-15 09:29:22',NULL),(22,9,3,10,20,30,40,'2025-07-15 09:30:42','2025-07-15 09:30:42',NULL),(23,9,2,10,20,30,40,'2025-07-15 09:30:42','2025-07-15 09:30:42',NULL),(24,9,6,0,0,0,0,'2025-07-15 09:30:42','2025-07-15 09:30:42',NULL),(25,9,5,0,0,0,0,'2025-07-15 09:30:42','2025-07-15 09:30:42',NULL),(26,9,4,0,0,0,0,'2025-07-15 09:30:42','2025-07-15 09:30:42',NULL),(27,9,7,0,0,0,0,'2025-07-15 09:30:42','2025-07-15 09:30:42',NULL),(28,9,8,0,0,0,0,'2025-07-15 09:30:42','2025-07-15 09:30:42',NULL);
/*!40000 ALTER TABLE `private_listing_pricings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduled_reminders`
--

DROP TABLE IF EXISTS `scheduled_reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scheduled_reminders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `booking_id` bigint unsigned NOT NULL,
  `send_at` timestamp NOT NULL,
  `status` enum('pending','sent','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `scheduled_reminders_booking_id_foreign` (`booking_id`),
  KEY `scheduled_reminders_status_send_at_index` (`status`,`send_at`),
  CONSTRAINT `scheduled_reminders_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduled_reminders`
--

LOCK TABLES `scheduled_reminders` WRITE;
/*!40000 ALTER TABLE `scheduled_reminders` DISABLE KEYS */;
/*!40000 ALTER TABLE `scheduled_reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `societes`
--

DROP TABLE IF EXISTS `societes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `societes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `raison_sociale` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'images/logo-light.png',
  `addresse` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ville` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `siteweb` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facture_liv_mode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'manuel',
  `color1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '--color1',
  `color2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#1d543b',
  `color3` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#f2f8f5',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `societes`
--

LOCK TABLES `societes` WRITE;
/*!40000 ALTER TABLE `societes` DISABLE KEYS */;
INSERT INTO `societes` VALUES (1,'MarHire','images/logo.png','Agadir, Maroc','casablanca','0600000001','contact@marhire.ma',NULL,NULL,NULL,NULL,NULL,NULL,'manuel','#1c584e','#eeb543','#f2f8f5',NULL,'2025-04-21 19:26:07');
/*!40000 ALTER TABLE `societes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `subcategory` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_category` int NOT NULL DEFAULT '-1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (15,'Car Model',NULL,NULL,'',2,'2025-04-29 19:12:17','2025-05-13 11:23:41'),(16,'Car Type',NULL,NULL,'',2,'2025-04-29 19:16:22','2025-05-13 11:23:32'),(17,'Service Type',NULL,NULL,'',3,'2025-04-29 19:17:35','2025-04-29 19:17:35'),(18,'Vehicule Type',NULL,NULL,'',3,'2025-04-29 19:18:35','2025-06-10 11:19:08'),(19,'Boat Type',NULL,NULL,'',4,'2025-04-29 19:19:46','2025-04-29 19:19:46'),(20,'Activity Type',NULL,NULL,'',5,'2025-04-29 19:21:28','2025-04-29 19:21:28'),(24,'Vehicule Model',NULL,NULL,'',3,'2025-06-10 10:55:55','2025-06-10 11:20:21');
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category_options`
--

DROP TABLE IF EXISTS `sub_category_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `option` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subcategory_id` int NOT NULL DEFAULT '-1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category_options`
--

LOCK TABLES `sub_category_options` WRITE;
/*!40000 ALTER TABLE `sub_category_options` DISABLE KEYS */;
INSERT INTO `sub_category_options` VALUES (1,'option 1',-1,'2025-04-29 18:01:16','2025-04-29 19:03:59','2025-04-29 19:03:59'),(2,'option 2',-1,'2025-04-29 18:01:16','2025-04-29 19:03:59','2025-04-29 19:03:59'),(3,'option 3',-1,'2025-04-29 18:01:16','2025-04-29 19:03:59','2025-04-29 19:03:59'),(4,'option 1',14,'2025-04-29 18:03:12','2025-04-29 19:03:59','2025-04-29 19:03:59'),(5,'option 2',14,'2025-04-29 18:03:12','2025-04-29 19:03:59','2025-04-29 19:03:59'),(6,'option 3',14,'2025-04-29 18:03:12','2025-04-29 19:03:59','2025-04-29 19:03:59'),(7,'option 1',6,'2025-04-29 19:03:59','2025-05-06 18:16:08','2025-05-06 18:16:08'),(8,'option 2',6,'2025-04-29 19:03:59','2025-04-29 19:05:49','2025-04-29 19:05:49'),(9,'option 3',6,'2025-04-29 19:03:59','2025-05-06 18:16:08','2025-05-06 18:16:08'),(10,'opt5',6,'2025-04-29 19:05:49','2025-05-06 18:16:08','2025-05-06 18:16:08'),(11,'Cheap Cars',15,'2025-04-29 19:12:17','2025-05-06 18:16:08','2025-05-06 18:16:08'),(12,'Luxury Cars',15,'2025-04-29 19:12:17','2025-05-06 18:16:08','2025-05-06 18:16:08'),(13,'Family Cars',15,'2025-04-29 19:12:17','2025-05-06 18:16:08','2025-05-06 18:16:08'),(14,'SUVs',15,'2025-04-29 19:12:17','2025-05-06 18:16:08','2025-05-06 18:16:08'),(15,'MPVs',15,'2025-04-29 19:12:17','2025-05-06 18:16:08','2025-05-06 18:16:08'),(16,'Sedans',15,'2025-04-29 19:12:17','2025-05-06 18:16:08','2025-05-06 18:16:08'),(17,'Hatchbacks',15,'2025-04-29 19:12:17','2025-05-06 18:16:08','2025-05-06 18:16:08'),(18,'Dacia',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(19,'Renault',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(20,'Hyundai',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(21,'Skoda',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(22,'Seat',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(23,'Opel',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(24,'Mercedes',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(25,'BMW',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(26,'Audi',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(27,'Toyota',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(28,'Range rover',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(29,'Porsche',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(30,'Jeep',16,'2025-04-29 19:16:22','2025-05-06 18:18:48','2025-05-06 18:18:48'),(31,'Airport Transfers',17,'2025-04-29 19:17:35','2025-05-06 18:16:08','2025-05-06 18:16:08'),(32,'Business Travel',17,'2025-04-29 19:17:35','2025-05-06 18:16:08','2025-05-06 18:16:08'),(33,'Intercity Travel',17,'2025-04-29 19:17:35','2025-05-06 18:16:08','2025-05-06 18:16:08'),(34,'Sedans',18,'2025-04-29 19:18:35','2025-05-06 18:16:08','2025-05-06 18:16:08'),(35,'SUVs',18,'2025-04-29 19:18:35','2025-05-06 18:16:08','2025-05-06 18:16:08'),(36,'Luxury Vehicles',18,'2025-04-29 19:18:35','2025-05-06 18:16:08','2025-05-06 18:16:08'),(37,'Minivans',18,'2025-04-29 19:18:35','2025-05-06 18:16:08','2025-05-06 18:16:08'),(38,'Coaches/Minibuses',18,'2025-04-29 19:18:35','2025-05-06 18:16:08','2025-05-06 18:16:08'),(39,'Yachts',19,'2025-04-29 19:19:46','2025-05-06 18:16:08','2025-05-06 18:16:08'),(40,'Speedboats',19,'2025-04-29 19:19:46','2025-05-06 18:16:08','2025-05-06 18:16:08'),(41,'Sailing Boats',19,'2025-04-29 19:19:46','2025-05-06 18:16:08','2025-05-06 18:16:08'),(42,'Luxury Boats',19,'2025-04-29 19:19:46','2025-05-06 18:16:08','2025-05-06 18:16:08'),(43,'Quad & Buggy Tours',20,'2025-04-29 19:21:28','2025-05-06 18:16:08','2025-05-06 18:16:08'),(44,'Desert Tours',20,'2025-04-29 19:21:28','2025-05-06 18:16:08','2025-05-06 18:16:08'),(45,'Surf Experience',20,'2025-04-29 19:21:28','2025-05-06 18:16:08','2025-05-06 18:16:08'),(46,'Camel Rides',20,'2025-04-29 19:21:28','2025-05-06 18:16:08','2025-05-06 18:16:08'),(47,'City Tours',20,'2025-04-29 19:21:28','2025-05-06 18:16:08','2025-05-06 18:16:08'),(48,'Jet Skiing',20,'2025-04-29 19:21:28','2025-05-06 18:16:08','2025-05-06 18:16:08'),(49,'2020',21,'2025-04-29 22:02:41','2025-05-06 18:16:08','2025-05-06 18:16:08'),(50,'2022',21,'2025-04-29 22:02:41','2025-05-06 18:16:08','2025-05-06 18:16:08'),(51,'2025',21,'2025-04-29 22:02:41','2025-05-06 18:16:08','2025-05-06 18:16:08'),(52,'Dacia',15,'2025-05-06 18:18:48','2025-05-30 20:31:05',NULL),(53,'Models',15,'2025-05-06 18:19:03','2025-05-06 18:19:21','2025-05-06 18:19:21'),(54,'Audi',15,'2025-05-06 18:19:21','2025-05-30 20:31:05',NULL),(55,'Yacht',19,'2025-05-06 18:21:22','2025-07-24 20:15:25',NULL),(56,'Speedboat',19,'2025-05-06 18:21:22','2025-07-24 20:15:25',NULL),(57,'Quad',20,'2025-05-06 18:22:09','2025-07-17 12:09:00',NULL),(58,'Desert',20,'2025-05-06 18:22:09','2025-07-17 12:09:00',NULL),(59,'SUV',16,'2025-05-06 18:24:26','2025-05-13 11:23:32',NULL),(60,'hatchback',16,'2025-05-06 18:24:26','2025-05-13 11:23:32',NULL),(61,'MPV',16,'2025-05-06 18:24:26','2025-05-13 11:23:32',NULL),(62,'Sedan',16,'2025-05-06 18:24:26','2025-05-13 11:23:32',NULL),(63,'Airport Transfer',17,'2025-05-06 18:31:08','2025-05-06 18:31:08',NULL),(64,'Intercity Travel',17,'2025-05-06 18:31:08','2025-05-06 18:31:08',NULL),(65,'Daily Private Driver',17,'2025-05-06 18:31:08','2025-05-06 18:31:08',NULL),(66,'Business Travel',17,'2025-05-06 18:31:08','2025-05-06 18:31:08',NULL),(67,'custom',19,'2025-05-08 20:42:54','2025-07-24 20:15:25','2025-07-24 20:15:25'),(68,'SUV / Sedan',24,'2025-06-10 10:55:55','2025-06-10 15:03:40','2025-06-10 15:03:40'),(69,'Van',24,'2025-06-10 10:55:55','2025-06-10 15:03:40','2025-06-10 15:03:40'),(70,'Fourgon (Large Van)',24,'2025-06-10 10:55:55','2025-06-10 15:03:40','2025-06-10 15:03:40'),(71,'Model 1',24,'2025-06-10 10:55:55','2025-06-10 15:03:40',NULL),(72,'SUV',18,'2025-06-10 11:19:08','2025-07-24 20:14:19',NULL),(73,'Sedan',18,'2025-06-10 11:19:08','2025-07-24 20:14:19',NULL),(74,'Van',18,'2025-06-10 11:19:08','2025-07-24 20:14:19',NULL),(75,'Fourgon (Large Van)',18,'2025-06-10 11:19:08','2025-07-24 20:14:19',NULL),(76,'Model 2',24,'2025-06-10 11:20:21','2025-06-10 15:03:40',NULL),(77,'Model 3',24,'2025-06-10 11:20:21','2025-06-10 15:03:40',NULL),(78,'Camel Ride',20,'2025-07-17 12:09:00','2025-07-17 12:09:00',NULL),(79,'Surf',20,'2025-07-17 12:09:00','2025-07-17 12:09:00',NULL),(80,'Bus (Coach)',18,'2025-07-24 20:14:19','2025-07-24 20:14:19',NULL);
/*!40000 ALTER TABLE `sub_category_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms_and_conditions`
--

DROP TABLE IF EXISTS `terms_and_conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terms_and_conditions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int NOT NULL DEFAULT '-1',
  `content` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms_and_conditions`
--

LOCK TABLES `terms_and_conditions` WRITE;
/*!40000 ALTER TABLE `terms_and_conditions` DISABLE KEYS */;
INSERT INTO `terms_and_conditions` VALUES (1,'Rental Terms',2,'<p>Terms</p>','2025-05-14 16:21:00','2025-07-14 10:53:03','2025-07-14 10:53:03'),(2,'Cancellation Policy',2,'<p>Cancellation</p>','2025-05-14 16:21:28','2025-07-14 10:52:58','2025-07-14 10:52:58'),(3,'Disclaimer',2,'<p>Diclaimer</p>','2025-05-14 16:22:01','2025-07-14 10:52:52','2025-07-14 10:52:52'),(4,'tes',3,'<p>jjj</p>','2025-05-14 16:25:30','2025-05-14 16:29:54','2025-05-14 16:29:54'),(5,'cancellation',4,'<p>test</p>','2025-05-14 20:01:44','2025-07-14 10:52:46','2025-07-14 10:52:46'),(6,'Insurance Terms',2,'<p>Insurance</p>','2025-05-23 13:28:42','2025-07-14 10:52:34','2025-07-14 10:52:34'),(7,'new terms',-1,'<p>tst</p>','2025-06-10 10:47:02','2025-06-10 10:47:08','2025-06-10 10:47:08'),(8,'Terms & Conditions',-1,'<h3><strong>1. Introduction</strong></h3><p>By booking a vehicle through our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before making a reservation.</p><h3><strong>2. Eligibility</strong></h3><p>Drivers must be at least 21 years old (age may vary by car category and location) and hold a valid driver’s license for at least 1 year.</p><h3><strong>3. Booking &amp; Payment</strong></h3><p>All bookings are subject to vehicle availability.</p><p>Full or partial payment may be required at the time of booking.</p><p>Additional charges may apply for optional extras (GPS, child seats, etc.).</p><h3><strong>4. Vehicle Collection &amp; Return</strong></h3><p>Vehicles must be collected and returned at the agreed times and locations.</p><p>Late returns may incur additional fees.</p><p>Vehicles must be returned with the same fuel level as at collection.</p><h3><strong>5. Use of Vehicle</strong></h3><p>Vehicles must not be used for illegal activities, racing, or off-road driving.</p><p>Only authorized drivers are permitted to operate the vehicle.</p><p>The renter is responsible for any traffic violations or fines.</p><p><strong>6. Damages, Accidents &amp; Theft</strong></p><p>The renter is responsible for all damages not covered by insurance.</p><p>In the event of an accident or theft, notify us and the authorities immediately.</p><p><strong>7. Cancellation &amp; Modifications</strong></p><p>Please refer to our Cancellation Policy for details.</p><h3><strong>8. Liability</strong></h3><p>Our liability is limited as permitted by law.</p><p>We are not responsible for loss of personal items left in the vehicle.</p><h3><strong>9. Amendments</strong></h3><p>We reserve the right to amend these terms at any time.</p>','2025-07-14 10:53:29','2025-07-14 11:49:04',NULL),(9,'Privacy policy',-1,'<h2>Privacy Policy – MarHire</h2><p><strong>Last updated: [Insert Date]</strong></p><p>Your privacy matters to us. This Privacy Policy explains how <strong>MarHire</strong> collects, uses, stores, and protects your personal data when you use our website, mobile platform, or book our services (cars, drivers, boats, or activities).</p><h3>📌 1. Information We Collect</h3><p>We collect the following types of personal information:</p><h4>a) Information You Provide</h4><p>Full name, email, phone number</p><p>Pickup &amp; drop-off location, rental dates</p><p>Payment information (handled securely by third-party processors)</p><p>Identification documents (if required by law)</p><h4>b) Automatically Collected</h4><p>IP address, browser type, device information</p><p>Pages visited, time spent, and booking behavior</p><p>Location (if enabled on your device)</p><h3>🧠 2. Why We Collect Your Data</h3><p>We use your data to:</p><p>Process and confirm bookings</p><p>Provide customer service and support</p><p>Improve our website and services</p><p>Send important updates and promotional offers (if you opt-in)</p><p>Meet legal or regulatory obligations</p><h3>🔐 3. How We Protect Your Data</h3><p>We implement the following security measures:</p><p>SSL encryption</p><p>Secure cloud storage</p><p>Restricted employee access</p><p>Regular security audits</p><p>We <strong>never sell your personal information</strong> to third parties.</p><h3>🤝 4. Sharing Your Information</h3><p>We may share your data with:</p><p><strong>Trusted partners</strong> (agencies, drivers, boat owners, etc.)—only to complete your booking</p><p><strong>Payment gateways</strong> (Stripe, PayPal, etc.)—for secure transactions</p><p><strong>Legal authorities</strong>—if required by law</p><h3>🧾 5. Your Rights</h3><p>You have the right to:</p><p>Access your data</p><p>Correct inaccurate data</p><p>Request deletion of your data</p><p>Withdraw consent to marketing communications</p><p>Request data portability</p><p>To exercise your rights, contact us at:<br><strong>📧 Email:</strong> [your-email@example.com]</p><h3>🍪 6. Cookies</h3><p>We use cookies to personalize your experience. See our full <a href=\"#\">Cookies Policy</a> for more info.</p><h3>🔄 7. Policy Updates</h3><p>We may update this Privacy Policy as laws or our services change. You’ll be notified on our website when updates occur.</p><h3>📬 Contact Us</h3><p>If you have any concerns about your privacy or data use, reach out to us:<br><strong>MarHire</strong><br>📧 Email: [your-email@example.com]<br>🌍 Website: www.marhirecar.com</p>','2025-07-14 10:53:42','2025-07-24 20:10:53',NULL),(10,'Cookie Policy',-1,'<h2>🍪 Cookies Policy – MarHire</h2><p><strong>Last updated: [Insert Date]</strong></p><p>At MarHire, we value your privacy. This Cookies Policy explains how we use cookies and similar technologies on our website to improve your experience and ensure transparency.</p><h3>📌 What Are Cookies?</h3><p>Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit a website. They help us recognize your browser and remember information about your visit, such as your language preference, login status, or items in your cart.</p><h3>🛠️ Types of Cookies We Use</h3><h4>1. <strong>Essential Cookies</strong></h4><p>These cookies are necessary for the website to function properly.<br>They include:</p><p>User login/session handling</p><p>Security and fraud prevention</p><p>Booking functionality</p><p><strong>You cannot disable these cookies.</strong></p><h4>2. <strong>Performance &amp; Analytics Cookies</strong></h4><p>Used to understand how users interact with our website, so we can improve design, speed, and content.</p><p>Examples:</p><p>Google Analytics</p><p>Page load performance trackers</p><p><strong>We only use these with your consent.</strong></p><h4>3. <strong>Functionality Cookies</strong></h4><p>They remember your preferences (language, location) and enhance your browsing experience.</p><h4>4. <strong>Marketing &amp; Advertising Cookies</strong></h4><p>Used to show you personalized ads on platforms like Facebook, Instagram, or Google based on your behavior on our site.</p><p>These are <strong>optional</strong> and only active if you agree.</p><h3>🔐 How to Control Cookies</h3><p>When you first visit our website, you\'ll see a cookie banner asking for your consent. You can:</p><p>Accept all cookies</p><p>Reject non-essential cookies</p><p>Customize your preferences</p><p>You can also manage or delete cookies via your browser settings at any time.</p><h3>🔄 Changes to This Policy</h3><p>We may update this Cookies Policy occasionally. Any changes will be posted here with the new effective date.</p><h3>📩 Contact Us</h3><p>If you have questions about our cookie usage or privacy practices, contact us at:<br><strong>📧 Email:</strong> [your-email@example.com]</p>','2025-07-14 10:53:53','2025-07-24 19:50:19',NULL),(11,'Cancellation Policy',-1,'<p>We understand that travel plans may change. Our cancellation policy is designed to be fair to both our customers and our service providers.</p><h3>✅ <strong>Free Cancellation</strong></h3><p><strong>You can cancel for free</strong> up to <strong>48 hours</strong> before the scheduled service (private driver, boat rental, or activity).</p><p>A full refund will be processed within 3–7 business days.</p><h3>⚠️ <strong>Late Cancellation</strong></h3><p>If you cancel <strong>less than 48 hours</strong> but more than 24 hours before the service:<br>→ <strong>50% refund</strong></p><p>If you cancel <strong>less than 24 hours</strong> before the service or don’t show up:<br>→ <strong>No refund</strong> (100% cancellation fee applies)</p><h3>🔁 <strong>Modifications</strong></h3><p>Date or time changes are <strong>free</strong> if requested more than 24 hours in advance and subject to availability.</p><p>Within 24 hours, changes are <strong>not guaranteed</strong> and may incur additional fees.</p><h3>💳 <strong>No-Show Policy</strong></h3><p>If the customer doesn’t show up at the pickup location and doesn’t contact us:<br>→ The service is considered <strong>used</strong> and <strong>non-refundable</strong>.</p><h3>🌀 <strong>Force Majeure</strong></h3><p>In the event of natural disasters, political unrest, or other unforeseen circumstances (e.g. flight cancellations), we will work with you to:</p><p>Reschedule the service at no cost</p><p>Or offer a credit valid for 12 months</p><p>Refunds in such cases will be evaluated case by case</p>','2025-07-14 10:54:20','2025-07-24 19:49:41',NULL),(12,'Insurance Conditions',-1,'<h3><strong>Included Insurance Coverage</strong></h3><p>Every private driver service includes <strong>basic passenger and third-party liability insurance</strong>, covering:</p><p>✅ Personal injury and medical costs (in case of an accident)</p><p>✅ Damage to third-party vehicles or property</p><p>✅ Legal liability of the driver</p><h3>⚠️ <strong>Not Covered (Excluded by Default)</strong></h3><p>The following are not covered under the standard insurance unless additional coverage is purchased:</p><p>❌ Theft or loss of personal items</p><p>❌ Accidents resulting from passenger negligence (e.g., not wearing a seatbelt)</p><p>❌ Damage caused during off-road use (unless pre-approved)</p><p>❌ Medical emergencies unrelated to road accidents</p><h3>🛡️ Optional Add-On: Full Passenger Coverage</h3><p>Enhance your safety with <strong>Full Coverage Insurance</strong>, which includes:</p><p>🏥 Medical expenses for all passengers</p><p>💼 Personal belongings theft protection</p><p>🛠️ Roadside assistance in remote areas</p><p>🚖 Replacement vehicle in case of breakdown</p><p><strong>Price:</strong> +€10–€20 per day</p><h3>📄 Insurance Claim Conditions</h3><p>To process any insurance claim:</p><p>The incident must be reported immediately to the driver and local authorities if necessary.</p><p>Passengers must keep all receipts, documents, and police reports.</p><p>Insurance does not cover delays caused by force majeure (weather, traffic, road closures).</p>','2025-07-14 10:54:33','2025-07-24 19:48:53',NULL),(13,'By booking a vehicle through our platform',-1,NULL,'2025-07-14 14:20:24','2025-07-14 14:21:08','2025-07-14 14:21:08');
/*!40000 ALTER TABLE `terms_and_conditions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prenom` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ville` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adresse` text COLLATE utf8mb4_unicode_ci,
  `codepostal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pays` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Maroc',
  `type_compte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `banque` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-1',
  `marque` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rip` text COLLATE utf8mb4_unicode_ci,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valide_compte` int NOT NULL DEFAULT '0',
  `id_agence` int NOT NULL DEFAULT '-1',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'images/profiles/default.png',
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `forme_juridique` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Individual',
  `rc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `par_bl` int NOT NULL DEFAULT '1',
  `par_colis` int NOT NULL DEFAULT '1',
  `par_fact` int NOT NULL DEFAULT '1',
  `par_demande_ramassage` int NOT NULL DEFAULT '1',
  `par_clients` int NOT NULL DEFAULT '1',
  `par_livreurs` int NOT NULL DEFAULT '1',
  `par_ramassage` int NOT NULL DEFAULT '1',
  `par_utilisateurs` int NOT NULL DEFAULT '1',
  `par_settings` int NOT NULL DEFAULT '1',
  `par_distribution` int NOT NULL DEFAULT '1',
  `par_retours` int NOT NULL DEFAULT '1',
  `par_stocks` int NOT NULL DEFAULT '1',
  `par_brands` int NOT NULL DEFAULT '1',
  `par_reclamations` int NOT NULL DEFAULT '1',
  `par_staff` int NOT NULL DEFAULT '1',
  `par_sous_livreurs` int NOT NULL DEFAULT '1',
  `par_emballages` int NOT NULL DEFAULT '1',
  `par_annonces` int NOT NULL DEFAULT '1',
  `par_connect` int NOT NULL DEFAULT '1',
  `client_tarif_livraison` double DEFAULT NULL,
  `client_tarif_annulation` double DEFAULT NULL,
  `client_tarif_retour` double DEFAULT NULL,
  `google_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cni_recto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cni_recto_filename` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cni_verso` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cni_verso_filename` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rib_file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_client` int NOT NULL DEFAULT '-1',
  `api_token` text COLLATE utf8mb4_unicode_ci,
  `secret_key` text COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Chaouki','Charaf',NULL,NULL,NULL,NULL,NULL,'Maroc','admin','-1',NULL,NULL,NULL,'admin@gmail.com',1,-1,'images/profiles/user_681d25a22f089.png','0694123146',NULL,'Individual',NULL,NULL,'$2y$10$mBif1FUxbPDlndV/zqXpKOxY0d2GTjekqyzOzEtnZIVxMmY00Lf22',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,NULL,NULL,'2025-04-21 18:37:18','2025-07-25 10:18:27',NULL),(2,'Marhire','Youssef',NULL,NULL,NULL,NULL,NULL,'Maroc','admin','-1',NULL,NULL,NULL,'youssef@gmail.com',1,-1,'images/profiles/default.png','0600000000',NULL,'Individual',NULL,NULL,'$2y$10$8l24ePTy8hUlUznlHQFi1OnRv/NxJsfoCI/.t./BhIXhHxFswrDy6',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,NULL,NULL,'2025-04-21 19:45:35','2025-04-21 19:45:35',NULL),(3,'Youssefy','Nourdine',NULL,NULL,NULL,NULL,NULL,'Maroc','staff','-1',NULL,NULL,NULL,'staff@gmail.com',1,-1,'images/profiles/default.png','0600000001',NULL,'Individual',NULL,NULL,'$2y$10$SS3jVn4wW3J1mImp7yYS1ehxuFGC2EtVOF5.3Z4W5VvQQ5MEgyHxq',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,NULL,NULL,'2025-04-21 19:50:55','2025-04-21 20:01:04',NULL),(4,'test','test',NULL,NULL,NULL,NULL,NULL,'Maroc','staff','-1',NULL,NULL,NULL,'test@gmail.com',1,-1,'images/profiles/default.png','0600000000',NULL,'Individual',NULL,NULL,'$2y$10$pctcH.re2MYv9eNIwfWjwOW77SkFM.Yw6BZs9dias5fYvfDMZAm.q',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,NULL,NULL,'2025-04-21 19:53:48','2025-04-21 19:55:44','2025-04-21 19:55:44'),(5,'tst','test2',NULL,NULL,NULL,NULL,NULL,'Maroc','admin','-1',NULL,NULL,NULL,'test12@gmail.com',1,-1,'images/profiles/default.png','0694123146',NULL,'Individual',NULL,NULL,'$2y$10$bEuOcnW7RiZ3da5iOokX1u.vaJGL8SxyX4285KHL97Wuf/hIBCP4i',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,NULL,NULL,NULL,'2025-04-21 21:21:32','2025-04-21 21:22:02','2025-04-21 21:22:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-06 12:38:55
