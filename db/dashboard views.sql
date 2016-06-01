CREATE PROCEDURE create_views() BEGIN

CREATE  VIEW `vw_partial_current_status_logs`  AS select * FROM
Request_Status_Log WHERE DATE(`req_status_change_date`) = CURDATE()

CREATE VIEW vw_partial_totalopen AS SELECT req_type_REF, COUNT(*) AS totalOpen
FROM `Request` WHERE reqstatus_REF = 'OPEN' OR reqstatus_REF = 'ALLOCATED' OR
reqstatus_REF = 'PARTIAL' GROUP BY req_type_REF

CREATE VIEW vw_partial_openedtoday AS SELECT req_type_REF, COUNT(*) AS
openedToday FROM Request WHERE DATE(req_made_date) = CURDATE() GROUP BY
req_type_REF

CREATE VIEW vw_partial_closedtoday AS SELECT req_type_REF, COUNT(*) AS
closedToday FROM Request WHERE DATE(req_close_date) = CURDATE() GROUP BY
req_type_REF

CREATE VIEW vw_partial_peoplesupportedtoday AS  SELECT req_type_REF,
SUM(req_for_people) AS peopleSupportedToday FROM Request WHERE reqstatus_REF =
'CLOSED' AND DATE(req_close_date) = CURDATE()  GROUP BY req_type_REF


CREATE  VIEW `vw_partial_total_resolutionTime`  AS  select t2.req_id
,TIMEDIFF(min(t1.req_status_change_date), t2.req_status_change_date) as
resolutionTime from Request_Status_Log t1 join Request_Status_Log t2  on
t1.req_id = t2.req_id where t1.req_status_ref = 'CLOSED' and t2.req_status_ref
= 'OPEN' group by req_id


CREATE  VIEW `vw_partial_total_avg_resolutionTime`  AS  select
req_type_REF,SEC_TO_TIME(avg(TIME_TO_SEC(resolutionTime))) as avgResolutionTime from
vw_partial_total_resolutionTime      responcetime join Request reqs on
reqs.req_id = responcetime.req_id group by req_type_REF


CREATE  VIEW `vw_partial_current_resolutionTime`  AS select t2.req_id
,TIMEDIFF(min(t1.req_status_change_date), t2.req_status_change_date) as
resolutionTime from vw_partial_current_status_logs t1 join
vw_partial_current_status_logs t2  on t1.req_id = t2.req_id where
t1.req_status_ref = 'CLOSED' and t2.req_status_ref = 'OPEN'  group by req_id


CREATE  VIEW `vw_partial_current_avg_resolutionTime`  AS select
req_type_REF,SEC_TO_TIME(avg(TIME_TO_SEC(resolutionTime))) as avgResolutionTimeToday from
vw_partial_current_resolutionTime responcetime join Request reqs on
reqs.req_id = responcetime.req_id group by req_type_REF


CREATE  VIEW `vw_partial_total_closingTime`  AS select t2.req_id
,TIMEDIFF(t1.req_status_change_date, t2.req_status_change_date) as closeTime
from Request_Status_Log t1 join Request_Status_Log t2  on t1.req_id =
t2.req_id where t1.req_status_ref = 'CLOSED'  and t2.req_status_ref = 'OPEN'
group by req_id



CREATE  VIEW `vw_partial_rate_closingTime`  AS select
req_type_REF,SEC_TO_TIME(avg(TIME_TO_SEC(closeTime))) as rate  from vw_partial_total_closingTime
responcetime join Request reqs on reqs.req_id = responcetime.req_id group by
req_type_REF

CREATE VIEW `vw_partial_req_type_ref` AS  SELECT req_type_REF FROM Request
GROUP BY req_type_REF


CREATE  VIEW `vw_dashboard`  AS  select tt1.req_type_REF,tt5.totalOpen,tt8.openedToday,tt6.closedToday,tt7.peopleSupportedToday,tt2.avgResolutionTime,tt3.avgResolutionTimeToday,tt6.closedToday/tt8.openedToday * 100 as closedPercentage,EXTRACT(HOUR FROM tt4.rate)/24 as daysToClose
from vw_partial_req_type_ref as tt1 left outer join
vw_partial_total_avg_resolutionTime as tt2 on tt1.req_type_ref =
tt2.req_type_ref left outer join vw_partial_current_avg_resolutionTime as tt3
on tt1.req_type_ref = tt3.req_type_ref left outer join
vw_partial_rate_closingTime as tt4 on tt1.req_type_ref = tt4.req_type_ref left
outer join vw_partial_totalopen as tt5 on tt1.req_type_REF = tt5.req_type_REF
left outer join vw_partial_closedtoday as tt6 on tt1.req_type_REF =
tt6.req_type_REF left outer join vw_partial_peoplesupportedtoday as tt7 on
tt1.req_type_REF = tt7.req_type_REF left outer join vw_partial_openedtoday as
tt8 on tt1.req_type_REF = tt8.req_type_REF

END;

CALL create_views();


ALTER DATABASE 117Support CHARACTER SET utf8 COLLATE utf8_unicode_ci;
