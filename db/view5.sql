CREATE
 VIEW `vw_partial_current_resolutionTime`
 AS
select t2.req_id ,TIMEDIFF(min(t1.req_status_change_date), t2.req_status_change_date) as resolutionTime from vw_partial_current_status_logs t1 join vw_partial_current_status_logs t2  on t1.req_id = t2.req_id where (  t1.req_status_ref = 'PARTIAL' or t1.req_status_ref = 'ALLOCATED' or t1.req_status_ref = 'CLOSED' ) and t2.req_status_ref = 'OPEN'  group by req_id
