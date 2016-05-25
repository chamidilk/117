CREATE
 VIEW `vw_partial_current_avg_resolutionTime`
 AS
select req_type_ref,avg(resolutionTime) as avgResolutionTimeToday from vw_partial_current_resolutionTime responcetime join Request reqs on reqs.req_id = responcetime.req_id group by req_type_ref
