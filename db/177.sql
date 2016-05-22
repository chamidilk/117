
-- Author: chamindra@gmail.com
-- --------------------------------------------------------

CREATE DATABASE 177Support;
USE 177Support;

--
-- The Person table that store details about requestors, fulfillers, volunteers, staff, etc
-- per_ID - primary key
-- nationaID - National identity car number
-- per_mobile - persons mobile phone that will be used to SMS status information
-- per_phone_other - a secondary contact number
-- per_organization - the organization name of the person
-- per_email - email address of the person
-- per_comment - details about this person 
-- per_status_REF - the status of this person. Valid statues include
--      - unverified
--      - mob_verifed
--      - verified
--      - trusted
--      - untrusted
-- per_password - md5 hash of users password (email is username)
-- per_user_level_REF - auth level of user
--      - admin
--      - trusted
--      - verified
--      - public

DROP TABLE IF EXISTS `Person`;

CREATE TABLE `Person` (
  `per_ID` int(11) NOT NULL AUTO_INCREMENT,
  `nationalID` varchar(20) NOT NULL,
  `per_fullname` varchar(200) NOT NULL,
  `per_mobile` varchar(20) NOT NULL,
  `per_phone_other` varchar(20) NOT NULL,
  `per_organization` varchar(20) NOT NULL,
  `per_email` varchar(20) NOT NULL,
  `per_comments` varchar(300) NOT NULL,
  `per_status_REF` varchar(20) NOT NULL,
  `per_password` varchar(64) NOT NULL,
  `per_user_level_REF` int(11) NOT NULL,
  PRIMARY KEY(`per_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Requst details table
-- req_ID - primary key for requests
-- req_made_date - date request was made
-- req_close_date - date request was closed
-- req_type_REF - the request type that can be
--      - evac
--      - shelter
--      - medical
--      - food
--      - missing
--      - damage
--      - other
-- requestor_per_ID - the reference per_ID of the requestor
-- donor_per_ID - the reference per_ID of the donor
-- reqarea_ID - the GN,DS code reference
-- req_address - the street address
-- req_GPS - GPS coodinates
-- req_for_* - this request is for number of *
-- req_summary - summary title of requirement to be displaed in list
-- req_details - details of requirement
-- reqstatus_REF - status of Request
--      - open
--      - partial
--      - fulfilled
--      - deffered
--      - duplicate
--      - rejected

DROP TABLE IF EXISTS `Request`;

CREATE TABLE `Request` (
  `req_ID` int(11) NOT NULL AUTO_INCREMENT,
  `req_made_date` date NOT NULL,
  `req_close_date` date NOT NULL,
  `req_type_REF` varchar(20) NOT NULL,
  `requestor_per_ID` int(11) NOT NULL,
  `donor_per_ID` int(11) NOT NULL,
  `reqarea_ID` int(11) NOT NULL,
  `req_address` varchar(200) NOT NULL,
  `req_GPS` varchar(100) NOT NULL,
  `req_for_people` int(11) NOT NULL,
  `req_for_adults` int(11) NOT NULL,
  `req_for_male_adults` int(11) NOT NULL,
  `req_for_female_adults` int(11) NOT NULL,
  `req_for_kids` int(11) NOT NULL,
  `req_for_infants` int(11) NOT NULL,
  `req_summary` varchar(20) NOT NULL,
  `req_details` varchar(400) NOT NULL,
  `reqstatus_REF` varchar(20) NOT NULL,
  PRIMARY KEY(`req_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- The request area table provides the Gov divisional gierarchy for managing the requst
-- reqloc_ID - PCODE or similar unique code
-- reqloc_province - province name
-- reqloc_district - district name
-- reqloc_GN - Grama Nilidari name
-- reqloc_GN_details - GN point person and contact details
--

DROP TABLE IF EXISTS `Request_Area`;

CREATE TABLE `Request_Area` (
  `reqloc_ID` int(11) NOT NULL AUTO_INCREMENT,
  `reqloc_province` int(11) NOT NULL,
  `reqloc_district` int(11) NOT NULL,
  `reqloc_GN` int(11) NOT NULL,
  `reqloc_GN_details` varchar(400) NOT NULL,
  PRIMARY KEY(`reqloc_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- This table captures the log of status changes to a request
-- req_log_ID - unique id of this log entry
-- req_status_change_date - date this change was made
-- req_status_per_ID - login of person who made this status change
-- req_status_comment - comment for status change including final fillfilment details when closed 
-- req_status_REF - status of Request
--      - open
--      - partial
--      - fulfilled
--      - deffered
--      - duplicate
--      - rejected


DROP TABLE IF EXISTS `Request_Status_Log`;

CREATE TABLE `Request_Status_Log` (
  `req_log_ID` int(11) NOT NULL AUTO_INCREMENT,
  `req_ID` int(11) NOT NULL,
  `req_status_change_date` date NOT NULL,
  `req_status_REF` varchar(20) NOT NULL,
  `req_status_per_ID` int(11) NOT NULL,
  `req_status_comment` varchar(400) NOT NULL,
  PRIMARY KEY(`req_log_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------


