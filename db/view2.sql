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