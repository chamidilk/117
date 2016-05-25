CREATE
 VIEW `vw_partial_rate_closingTime`
 AS
select req_type_ref,avg(closeTime) as rate  from vw_partial_total_closingTime responcetime join Request reqs on reqs.req_id = responcetime.req_id group by req_type_ref
