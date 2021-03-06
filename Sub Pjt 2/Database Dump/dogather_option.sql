-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: i6e104.p.ssafy.io    Database: dogather
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `option`
--

DROP TABLE IF EXISTS `option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option` (
  `option_no` int NOT NULL AUTO_INCREMENT,
  `group_no` int DEFAULT NULL,
  `option_name` varchar(50) DEFAULT NULL,
  `option_price` int DEFAULT NULL,
  PRIMARY KEY (`option_no`),
  KEY `group_fk_idx` (`group_no`),
  CONSTRAINT `group_fk5` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=554 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option`
--

LOCK TABLES `option` WRITE;
/*!40000 ALTER TABLE `option` DISABLE KEYS */;
INSERT INTO `option` VALUES (385,291,'240',0),(386,291,'250',0),(387,291,'260',0),(388,291,'270',0),(389,291,'280',0),(390,291,'290',1000),(391,291,'300',1000),(392,299,'M',0),(393,299,'L',0),(394,299,'XL',0),(395,300,'36',0),(396,300,'38',10000),(397,300,'40',10000),(398,300,'42',0),(399,301,'S',0),(400,301,'M',0),(401,301,'L',0),(402,301,'S / 기모',3000),(403,301,'M / 기모',3000),(404,301,'L / 기모',3000),(405,302,'S',0),(406,302,'M',0),(407,302,'L',0),(408,302,'XL',0),(409,303,'M',0),(410,303,'L',0),(411,303,'XL',0),(412,304,'S',0),(413,304,'M',0),(414,304,'L',0),(415,305,'M',0),(416,305,'L',0),(417,305,'XL',0),(418,306,'M',0),(419,306,'L',0),(420,306,'XL',0),(421,307,'M',0),(422,307,'L',0),(423,308,'S',0),(424,308,'M',0),(425,308,'L',0),(426,308,'XL',0),(427,309,'S',0),(428,309,'M',0),(429,309,'L',0),(430,310,'S',0),(431,310,'M',0),(432,310,'L',0),(433,311,'44',0),(434,311,'46',0),(435,311,'48',0),(436,312,'블랙',5000),(437,312,'아이보리',0),(438,313,'44',0),(439,313,'46',0),(440,313,'48',0),(441,314,'S',0),(442,314,'M',0),(443,314,'L',0),(444,316,'85',0),(445,316,'90',0),(446,316,'95',0),(447,316,'100',0),(448,317,'S',0),(449,317,'M',0),(450,290,'S',0),(451,290,'M',0),(452,290,'L',0),(453,319,'80',0),(454,319,'85',0),(455,319,'90',0),(456,320,'아이보리',0),(457,320,'네이비',0),(458,322,'S',0),(459,322,'M',0),(460,323,'21호',0),(461,323,'23호',0),(462,323,'25호',0),(463,323,'27호',0),(464,324,'로즈브라운',0),(465,324,'멜로우브라운',0),(466,324,'소울브라운',0),(467,324,'엔젤',0),(468,324,'로즈골드',0),(469,325,'크런키 블랙',0),(470,325,'누 페블',0),(471,325,'로지 시럽',0),(472,326,'21',0),(473,326,'23',0),(474,326,'27',0),(475,327,'허브우디',0),(476,327,'피치블러썸',0),(477,327,'에이프릴코튼',0),(478,329,'아날로그 로즈',0),(479,329,'빈티지 레드',1000),(488,345,'Op1==== update',1000),(489,345,'Op3',3000),(499,367,'블랙',0),(500,367,'화이트',0),(501,370,'블랙',0),(502,370,'화이트',0),(503,373,'레드',0),(504,373,'블랙',0),(505,373,'블루',0),(506,375,'블랙',0),(507,375,'블루',0),(508,375,'화이트',0),(509,378,'블랙',0),(510,378,'레드',0),(511,378,'화이트',0),(512,378,'블루',0),(513,397,'화이트',0),(514,397,'블랙',4000),(515,403,'s',0),(516,403,'m',0),(517,403,'l',0),(518,403,'xl',0),(519,404,'블랙',0),(520,404,'화이트',0),(521,404,'블루',0),(522,406,'블랙',0),(523,406,'화이트',0),(524,406,'핑크',0),(525,406,'블루',0),(526,426,'250',0),(527,426,'260',0),(528,426,'270',0),(529,426,'280',0),(530,435,'밝은 베이지 90',0),(531,435,'밝은 베이지 95',0),(532,435,'밝은 베이지 100',0),(533,436,'베이지 0XS',1000),(534,436,'블랙 OXS',0),(535,436,'블랙 OOS',2000),(536,438,'브라운 30~31',1000),(537,438,'브라운 32',1000),(538,438,'브라운 34',1000),(539,440,'카키 95',1000),(540,440,'카키 100',10000),(541,440,'카키 105',1000),(542,441,'네이비 s',1000),(543,441,'네이비 m',1000),(544,442,'베이지 90',1000),(545,442,'베이지 95',1000),(546,442,'베이지 100',1000),(547,443,'test',1),(548,444,'베이지 85',1000),(549,444,'베이지 88',1000),(550,444,'베이지 91',1000),(551,446,'ddd',11),(552,454,'블랙',0),(553,454,'그래이',0);
/*!40000 ALTER TABLE `option` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 10:23:02
