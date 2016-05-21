
-- Author: chamindra@gmail.com
-- --------------------------------------------------------

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

CREATE TABLE `Person` (
  `per_ID` int(11) NOT NULL,
  `nationalID` varchar(20) NOT NULL,
  `per_fullname` varchar(200) NOT NULL,
  `per_mobile` varchar(20) NOT NULL,
  `per_phone_other` varchar(20) NOT NULL,
  `per_organization` varchar(20) NOT NULL,
  `per_email` varchar(20) NOT NULL,
  `per_comments` varchar(300) NOT NULL,
  `per_status_REF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Request`
--

CREATE TABLE `Request` (
  `req_ID` int(11) NOT NULL,
  `req_made_date` date NOT NULL,
  `req_close_date` date NOT NULL,
  `req_type_REF` varchar(20) NOT NULL,
  `requestor_per_ID` int(11) NOT NULL,
  `donar_per_ID` int(11) NOT NULL,
  `reqarea_ID` int(11) NOT NULL,
  `req_address` varchar(200) NOT NULL,
  `req_GPS` varchar(100) NOT NULL,
  `reqlocation_ID` int(11) NOT NULL,
  `req_for_people` int(11) NOT NULL,
  `req_for_adults` int(11) NOT NULL,
  `req_for_kids` int(11) NOT NULL,
  `req_for_infants` int(11) NOT NULL,
  `req_summary` varchar(20) NOT NULL,
  `req_details` varchar(400) NOT NULL,
  `reqstatus_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Request_Area`
--

CREATE TABLE `Request_Area` (
  `reqloc_ID` int(11) NOT NULL,
  `reqloc_province` int(11) NOT NULL,
  `reqloc_district` int(11) NOT NULL,
  `reqloc_GN` int(11) NOT NULL,
  `reqloc_GN_details` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Request_Status_Log`
--

CREATE TABLE `Request_Status_Log` (
  `req_log_ID` int(11) NOT NULL,
  `req_status_change_date` date NOT NULL,
  `req_status_REF` varchar(20) NOT NULL,
  `req_status_per_ID` int(11) NOT NULL,
  `req_status_comment` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Request_Type`
--

CREATE TABLE `Request_Type` (
  `reqtype_ID` int(11) NOT NULL,
  `reqtype_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Person`
--
ALTER TABLE `Person`
  ADD PRIMARY KEY (`per_ID`),
  ADD UNIQUE KEY `req_ID` (`per_ID`);

--
-- Indexes for table `Request`
--
ALTER TABLE `Request`
  ADD PRIMARY KEY (`req_ID`);

--
-- Indexes for table `Request_Area`
--
ALTER TABLE `Request_Area`
  ADD PRIMARY KEY (`reqloc_ID`);

--
-- Indexes for table `Request_Status_Log`
--
ALTER TABLE `Request_Status_Log`
  ADD PRIMARY KEY (`req_log_ID`);

--
-- Indexes for table `Request_Type`
--
ALTER TABLE `Request_Type`
  ADD PRIMARY KEY (`reqtype_ID`);

