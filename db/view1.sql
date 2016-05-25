CREATE
 VIEW `vw_partial_current_status_logs`
 AS select * FROM Request_Status_Log WHERE DATE(`req_status_change_date`) = CURDATE()
