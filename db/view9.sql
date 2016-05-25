CREATE
 VIEW `vw_dashboard`
 AS 
select tt1.req_type_ref,tt1.totalOpen,tt1.openedToday,tt1.closedToday,tt1.peopleSupportedToday,tt2.avgResolutionTime,tt3.avgResolutionTimeToday,tt1.CLOSEDToday/tt1.OPENedToday * 100 as closedPercentage,tt1.totalOpen*EXTRACT(HOUR FROM tt4.rate)/24 as daysToClose from vw_partial_dashboard_requests as tt1 left outer join vw_partial_total_avg_resolutionTime as tt2 on tt1.req_type_ref = tt2.req_type_ref left outer join vw_partial_current_avg_resolutionTime as tt3 on tt1.req_type_ref = tt3.req_type_ref left outer join vw_partial_rate_closingTime as tt4 on tt1.req_type_ref = tt4.req_type_ref
