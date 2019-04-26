# Host: localhost  (Version: 5.5.53)
# Date: 2019-04-26 08:17:34
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "login"
#

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPRESSED;

#
# Data for table "login"
#

/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'zmao','d4058cd6950d16e7b82536b06793f266','jrZm','123');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;

#
# Structure for table "names"
#

DROP TABLE IF EXISTS `names`;
CREATE TABLE `names` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `idCard` varchar(255) DEFAULT NULL,
  `phoneNum` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "names"
#

/*!40000 ALTER TABLE `names` DISABLE KEYS */;
INSERT INTO `names` VALUES (1,'zmao','吉荣','142601200003278999','19940900327');
/*!40000 ALTER TABLE `names` ENABLE KEYS */;

#
# Structure for table "ticket_info"
#

DROP TABLE IF EXISTS `ticket_info`;
CREATE TABLE `ticket_info` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `num` varchar(255) DEFAULT NULL,
  `fromCity` varchar(255) DEFAULT NULL COMMENT '出发站',
  `toCity` varchar(255) DEFAULT NULL COMMENT '到达站',
  `fromTime` varchar(255) DEFAULT NULL COMMENT '出发时间',
  `toTime` varchar(255) DEFAULT NULL COMMENT '到达时间',
  `usedTime` varchar(255) DEFAULT NULL COMMENT '历时',
  `businessClass` varchar(255) DEFAULT NULL COMMENT '商务座',
  `p1` varchar(255) DEFAULT NULL,
  `firstClass` varchar(255) DEFAULT NULL COMMENT '一等座',
  `p2` varchar(255) DEFAULT NULL,
  `secondClass` varchar(11) DEFAULT NULL,
  `p3` varchar(255) DEFAULT NULL,
  `gjSortSleeper` varchar(11) DEFAULT NULL,
  `p4` varchar(255) DEFAULT NULL,
  `fcSortsleeper` varchar(11) DEFAULT NULL,
  `p5` varchar(255) DEFAULT NULL,
  `dSleeper` varchar(11) DEFAULT NULL,
  `p6` varchar(255) DEFAULT NULL,
  `schardSleeper` varchar(11) DEFAULT NULL,
  `p7` varchar(255) DEFAULT NULL,
  `sortClass` varchar(11) DEFAULT NULL,
  `p8` varchar(255) DEFAULT NULL,
  `hardClass` varchar(11) DEFAULT NULL,
  `p9` varchar(255) DEFAULT NULL,
  `noClass` varchar(11) DEFAULT NULL,
  `p10` varchar(255) DEFAULT NULL,
  `other` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

#
# Data for table "ticket_info"
#

/*!40000 ALTER TABLE `ticket_info` DISABLE KEYS */;
INSERT INTO `ticket_info` VALUES (1,'K961','北京','太原','02:54','13:38','10:44','--',NULL,'--',NULL,'--',NULL,'--',NULL,'无','￥251.0','--',NULL,'无','￥163.0','--',NULL,'3','￥93.0','99','￥93','--'),(2,'G601','北京西','太原南','07:21','10:22','03:01','8','￥612','33','￥315.5','99','￥197','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(3,'G627','北京西','太原南','08:05','11:16','03:11','10','￥612','无',NULL,'无','￥197','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(4,'G91','北京西','太原南','08:40','11:07','02:27','4','￥612','16','￥315','99','￥197','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(5,'Z69','北京西','太原南','10:00','15:11','05:11','--','','--','','--',NULL,'--',NULL,'无','￥205','--',NULL,'无','￥133',NULL,NULL,'35','￥75','99','￥75','--'),(6,'G603','北京西','太原南','10:10','12:55','02:45','7','￥612','1','￥315','99','￥197','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,NULL,NULL,'--'),(7,'G606','太原南','北京西','08:05','10:54','02:49','19','￥612','99','￥315','99','￥197','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(8,'G684','太原南','北京西','08:24','11:41','03:17','无','￥612','5','￥315','99','￥197','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(9,'G92','太原南','北京西','08:33','11:00','02:27','10','￥612','19','￥315','99','￥197','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(10,'Z278','太原','北京西','04:09','08:34','04:25','--',NULL,'--',NULL,'--',NULL,'--',NULL,'1','￥197','--',NULL,'13','￥129','--',NULL,'无','￥72','无','￥72','--'),(11,'Z22','太原','北京西','04:40','08:28','04:28','--',NULL,'--',NULL,'--',NULL,'--',NULL,'9','￥197','--',NULL,'99','￥129','--',NULL,'99','￥72','99','￥72','--'),(12,'T42','太原','北京西','04:27','09:31','05:04','--',NULL,'--',NULL,'--',NULL,'--',NULL,'无','￥197','--',NULL,'1','￥129','--',NULL,'无','￥72','无','￥72','--'),(13,'C2610','天津西','北京南','06:09','06:41','00:32','无','￥174','4','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(14,'C2202','天津','北京南','06:16','06:53','00:37','无','￥174','2','￥88','有','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(15,'C2552','滨海','北京南','06:31','07:41','01:10','无','￥174','无','￥88','无','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(16,'C2614','天津西','北京南','06:31','07:03','00:32','无','￥174','4','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(17,'C2004','天津','北京南','06:38','07:08','00:30','无','￥174','3','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'无','￥54.5','--'),(18,'C2204','天津','北京南','06:38','07:08','00:30','无','￥174','无','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'无','￥54.5','--'),(19,'C2551','北京南','天津','06:02','06:32','00:30','无','￥174','1','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(20,'C2553','北京南','天津','06:07','06:37','00:37','无','￥174','2','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(21,'C2201','北京南','天津','06:48','07:18','00:30','无','￥174','3','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(22,'G105','北京南','天津南','07:20','07:54','00:34','3','￥174','11','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(23,'G481','北京南','天津南','07:25','07:59','00:34','2','￥174','99','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--'),(24,'G177','北京南','天津南','07:30','08:04','00:34','4','￥174','99','￥88','99','￥54','--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--',NULL,'--');
/*!40000 ALTER TABLE `ticket_info` ENABLE KEYS */;

#
# Structure for table "zmao_admin"
#

DROP TABLE IF EXISTS `zmao_admin`;
CREATE TABLE `zmao_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `num` varchar(255) DEFAULT NULL,
  `fromCity` varchar(255) DEFAULT NULL,
  `toCity` varchar(255) DEFAULT NULL,
  `fromTime` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `names` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `dingdNum` varchar(255) DEFAULT NULL,
  `zuo` varchar(255) DEFAULT NULL,
  `zuoNum` varchar(255) DEFAULT NULL,
  `zuoEng` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

#
# Data for table "zmao_admin"
#

/*!40000 ALTER TABLE `zmao_admin` DISABLE KEYS */;
INSERT INTO `zmao_admin` VALUES (1,'2','zmao','G601','北京西1','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(2,'2','zmao','G601','北京西2','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(3,'2','zmao','G601','北京西3','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(4,'2','zmao','G601','北京西4','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(5,'2','zmao','G601','北京西5','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(6,'2','zmao','G601','北京西6','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(7,'2','zmao','G601','北京西7','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(8,'2','zmao','G601','北京西8','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(9,'2','zmao','G601','北京西9','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(10,'2','zmao','G601','北京西10','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(11,'2','zmao','G601','北京西11','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(12,'2','zmao','G601','北京西12','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(13,'2','zmao','G601','北京西13','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(14,'2','zmao','G601','北京西14','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(15,'2','zmao','G601','北京西15','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(16,'2','zmao','G601','北京西16','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(17,'2','zmao','G601','北京西17','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(18,'2','zmao','G601','北京西18','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(19,'2','zmao','G601','北京西19','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(20,'2','zmao','G601','北京西20','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(21,'2','zmao','G601','北京西21','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(22,'2','zmao','G601','北京西22','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(23,'2','zmao','G601','北京西23','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(24,'2','zmao','G601','北京西24','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(25,'2','zmao','G601','北京西25','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(26,'2','zmao','G601','北京西26','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(27,'2','zmao','G601','北京西27','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(28,'2','zmao','G601','北京西28','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(29,'2','zmao','G601','北京西29','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(30,'2','zmao','G601','北京西30','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass'),(31,'2','zmao','G601','北京西31','太原南','07:21','￥612','吉荣','2019-4-24','2019420647','商务座','03车10D号','businessClass');
/*!40000 ALTER TABLE `zmao_admin` ENABLE KEYS */;
