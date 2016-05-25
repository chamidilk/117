CREATE PROCEDURE create_views() BEGIN

CREATE
 VIEW `vw_partial_current_status_logs`
 AS select * FROM Request_Status_Log WHERE DATE(`req_status_change_date`) = CURDATE()


CREATE
 VIEW `vw_partial_dashboard_requests`
 AS 
SELECT req_type_ref,
	case
		when reqstatus_REF = 'OPEN' or reqstatus_REF = 'ALLOCATED' or reqstatus_REF = 'PARTIAL' then count(*) 
	end as totalOpen,
	case 
		when DATE(`req_made_date`) = CURDATE() then count(*) 
	end as openedToday,
	case
		when DATE(`req_close_date`) = CURDATE() then count(*) 
	end as closedToday,
	case
		when reqstatus_REF = 'CLOSED' and DATE(`req_close_date`) = CURDATE() then sum(req_for_people)
	end as peopleSupportedToday
FROM `Request`  group by req_type_ref


CREATE
 VIEW `vw_partial_total_resolutionTime`
 AS 
select t2.req_id ,TIMEDIFF(min(t1.req_status_change_date), t2.req_status_change_date) as resolutionTime from Request_Status_Log t1 join Request_Status_Log t2  on t1.req_id = t2.req_id where (  t1.req_status_ref = 'PARTIAL' or t1.req_status_ref = 'ALLOCATED' or t1.req_status_ref = 'CLOSED' ) and t2.req_status_ref = 'OPEN' group by req_id 


CREATE
 VIEW `vw_partial_total_avg_resolutionTime`
 AS 
select req_type_ref,avg(resolutionTime) as avgResolutionTime from 
	vw_partial_total_resolutionTime
	 responcetime join Request reqs on reqs.req_id = responcetime.req_id group by req_type_ref


CREATE
 VIEW `vw_partial_current_resolutionTime`
 AS
select t2.req_id ,TIMEDIFF(min(t1.req_status_change_date), t2.req_status_change_date) as resolutionTime from vw_partial_current_status_logs t1 join vw_partial_current_status_logs t2  on t1.req_id = t2.req_id where (  t1.req_status_ref = 'PARTIAL' or t1.req_status_ref = 'ALLOCATED' or t1.req_status_ref = 'CLOSED' ) and t2.req_status_ref = 'OPEN'  group by req_id


CREATE
 VIEW `vw_partial_current_avg_resolutionTime`
 AS
select req_type_ref,avg(resolutionTime) as avgResolutionTimeToday from vw_partial_current_resolutionTime responcetime join Request reqs on reqs.req_id = responcetime.req_id group by req_type_ref


CREATE
 VIEW `vw_partial_total_closingTime`
 AS
select t2.req_id ,TIMEDIFF(t1.req_status_change_date, t2.req_status_change_date) as closeTime from Request_Status_Log t1 join Request_Status_Log t2  on t1.req_id = t2.req_id where t1.req_status_ref = 'CLOSED'  and t2.req_status_ref = 'OPEN' group by req_id



CREATE
 VIEW `vw_partial_rate_closingTime`
 AS
select req_type_ref,avg(closeTime) as rate  from vw_partial_total_closingTime responcetime join Request reqs on reqs.req_id = responcetime.req_id group by req_type_ref



CREATE
 VIEW `vw_dashboard`
 AS 
select tt1.req_type_ref,tt1.totalOpen,tt1.openedToday,tt1.closedToday,tt1.peopleSupportedToday,tt2.avgResolutionTime,tt3.avgResolutionTimeToday,tt1.CLOSEDToday/tt1.OPENedToday * 100 as closedPercentage,tt1.totalOpen*EXTRACT(HOUR FROM tt4.rate)/24 as daysToClose from vw_partial_dashboard_requests as tt1 left outer join vw_partial_total_avg_resolutionTime as tt2 on tt1.req_type_ref = tt2.req_type_ref left outer join vw_partial_current_avg_resolutionTime as tt3 on tt1.req_type_ref = tt3.req_type_ref left outer join vw_partial_rate_closingTime as tt4 on tt1.req_type_ref = tt4.req_type_ref

END;

CALL create_views();