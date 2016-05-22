<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;

// Middleware
$app->add(function ($request, $response, $next) {
    if($request->isOptions()) {
        return $response->withHeader("Access-Control-Allow-Origin", "*");
    }
});


$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');

    $db = getConnection();

    return $response->withJson(array('name' => $name));
});
$app->post('/login', function (Request $request, Response $response) {
    $response = $response->withHeader("Access-Control-Allow-Origin", "*");
    $db = getConnection();
    if(!checkAuth($request->getHeaderLine('Authorization'), $db)) {
        return $response->withJson(array('error' => 'Authorization invalid'), 403);
    } else {
        return $response->withJson(array('status' => 'success'));
    }
});
$app->get('/statistics', function (Request $request, Response $response) {
    $response = $response->withHeader("Access-Control-Allow-Origin", "*");
    $qParams = $request->getQueryParams();

    $db = getConnection();
    if($qParams['type']=='requests') {
        try {
            $reqSql = "SELECT * FROM Request";
            $reqStmt = $db->prepare($reqSql);
            $reqStmt->execute();
            $reqs = $reqStmt->fetchAll(PDO::FETCH_ASSOC);
            $evac_opened_today = 0;
            $evac_closed_today = 0;
            $evac_rejected_today = 0;

        } catch(PDOException $pdoe) {
            return $response->withJson(array('error' => 'Error fetching request data',
                'detail' => $pdoe->getMessage()), 500);
        }
    }
    return $response->withJson($reqs);
});
$app->post('/requests/status', function(Request $request, Response $response) {
    $response = $response->withHeader("Access-Control-Allow-Origin", "*");
    date_default_timezone_set('Asia/Colombo');
    $db = getConnection();
    $body = $request->getParsedBody();
    $reqLog = new stdClass();
    $reqLog->req_log_ID = null;
    $reqLog->req_ID = $body['req_ID'];
    $reqLog->req_status_per_ID = 2;
    $reqLog->req_status_comment = $body['req_status_comment'];
    $reqLog->req_status_change_date = date('Y-m-d');
    $reqLog->req_status_REF = strtolower($body['reqstatus_REF']);

    try {
        $updateSql = "UPDATE Request SET reqstatus_REF=:reqstatus_REF WHERE req_ID=:req_ID";
        if($reqLog->req_status_REF == 'fulfilled') {
            $updateSql = "UPDATE Request SET reqstatus_REF=:reqstatus_REF,req_close_date=:req_close_date WHERE req_ID=:req_ID";
        }
        $updateStmt = $db->prepare($updateSql);
        $updateStmt->bindParam("reqstatus_REF", $reqLog->req_status_REF);
        if($reqLog->req_status_REF == 'fulfilled') {
            $updateStmt->bindParam("req_close_date", $reqLog->req_status_change_date);
        }
        $updateStmt->bindParam("req_ID", $req_ID);

        $updateStmt->execute();
        $reqLog->req_log_ID = insertObject($db,'Request_Status_Log' ,$reqLog);
        return $response->withJson($reqLog);
    } catch(PDOException $pdoe) {
        return $response->withJson(array('error' => 'Error updating request status',
            'detail' => $pdoe->getMessage(),
            'query' => $updateStmt->queryString), 500);
    }

});
$app->get('/requests', function (Request $request, Response $response) {
    $response = $response->withHeader("Access-Control-Allow-Origin", "*");
    $db = getConnection();
    /*if(!checkAuth($request->getHeaderLine('Authorization'), $db)) {
        return $response->withJson(array('error' => 'Authorization invalid'), 403);
    }*/
    $qParams = $request->getQueryParams();
    $reqType = $qParams['req_type_REF'];
    $reqStatus = $qParams['reqstatus_REF'];
    $reqArea = $qParams['req_area'];
    $perNationalID = $qParams['nationalID'];
    $perOrganization = $qParams['per_organization'];
    $startDate = $qParams['startDate'];
    $endDate = $qParams['endDate'];
    $limit = $qParams['limit'];
    $offset = $qParams['offset'];
    $orderBy = $qParams['orderBy'];
    $orderingDirection = $qParams['direction'];
    try {

        // default query
        $reqSql = "SELECT Request.*, Person.nationalID, Person.per_fullname, Person.per_mobile, Person.per_organization, Person.per_email, Person.per_user_level_REF, Person.per_comments FROM Request INNER JOIN Person ON Request.requestor_per_ID=Person.per_ID WHERE true";

        if(isset($reqType)) {
            $reqSql .= " AND Request.req_type_REF='$reqType'";
        }
        if(isset($reqStatus)) {
            $reqSql .= " AND Request.reqstatus_REF='$reqStatus'";
        }
        if(isset($startDate)) {
            $reqSql .= " AND Request.req_made_date >= '$startDate'";
        }
        if(isset($endDate)) {
            $reqSql .= " AND Request.req_made_date <= '$endDate'";
        }
        if(isset($reqArea)) {
            $reqSql .= " AND Request.req_area='$reqArea'";
        }
        if(isset($perNationalID)) {
            $reqSql .= " AND Person.nationalID='$perNationalID'";
        }
        if(isset($perOrganization)) {
            $reqSql .= " AND Person.per_organization='$perOrganization'";
        }

        if(isset($orderBy)) {
            $reqSql .= " ORDER BY Request.$orderBy " . strtoupper($orderingDirection);
        }

        if(isset($limit)) {
            $reqSql .= " LIMIT $limit";
        }

        if(isset($offset)) {
            $reqSql .= " OFFSET $offset";
        }
        $reqStmt = $db->prepare($reqSql);
        $reqStmt->execute();
        $reqs = $reqStmt->fetchAll(PDO::FETCH_ASSOC);
        //$reqs['sql'] = $reqSql;
        return $response->withJson($reqs);
    } catch(PDOException $pdoe) {
        return $response->withJson(array('error' => 'Error fetching request data',
            'detail' => $pdoe->getMessage(),
            'query' => $reqSql), 500);
    }

});
$app->post('/requests', function (Request $request, Response $response) {
    $response = $response->withHeader("Access-Control-Allow-Origin", "*");
    date_default_timezone_set('Asia/Colombo');
    $body = $request->getParsedBody();
    $db = getConnection();
    $person = new stdClass();
    $person->per_ID = null;
    $person->nationalID = strtoupper($body['nationalID']);
    $person->per_fullname = $body['per_fullname'];
    $person->per_mobile = $body['per_mobile'];
    $person->per_phone_other = isset($body['per_phone_other']) ? $body['per_phone_other'] : "";
    $person->per_organization = isset($body['per_organization']) ? $body['per_organization'] : "";
    $person->per_email = $body['per_email'];
    $person->per_comments = isset($body['per_comments']) ? $body['per_comments'] : "";
    $person->per_status_REF = 0;

    $personSql = "SELECT * FROM Person WHERE nationalID=:nationalID";
    $personStmt = $db->prepare($personSql);
    $personStmt->bindParam("nationalID", $person->nationalID );
    $personStmt->execute();
    $storedPerson = $personStmt->fetchAll(PDO::FETCH_ASSOC);
    if(!isset($storedPerson[0])) {
        // person does not exist, store as a new person
        try {
            $person->per_ID = insertObject($db,'Person', $person);
        } catch(PDOException $pdoe) {
            return $response->withJson(array('error' => 'New person could not be entered',
                'detail' => $pdoe->getMessage()), 500);
        }

    } else {
        $person->per_ID = $storedPerson[0]['per_ID'];
    }


    $resourceRequest = new stdClass();
    $resourceRequest->req_ID = null;
    $resourceRequest->req_made_date = date('Y-m-d');
    $resourceRequest->req_close_date = '0000-00-00';
    $resourceRequest->req_type_REF = strtoupper($body['req_type_REF']);
    $resourceRequest->requestor_per_ID = $person->per_ID;
    $resourceRequest->donor_per_ID = 0;
    $resourceRequest->reqarea_ID = isset($body['reqarea_ID']) ? $body['reqarea_ID'] : 0;
    $resourceRequest->req_area = $body['req_area'];
    $resourceRequest->req_address = $body['req_address'];
    $resourceRequest->req_GPS = isset($body['req_GPS']) ? $body['req_GPS'] : "";
    $resourceRequest->req_for_people = isset($body['req_for_people']) ? $body['req_for_people'] : 0;
    $resourceRequest->req_for_adults = isset($body['req_for_adults']) ? $body['req_for_adults'] : 0;
    $resourceRequest->req_for_male_adults = isset($body['req_for_male_adults']) ? $body['req_for_male_adults'] : 0;
    $resourceRequest->req_for_female_adults = isset($body['req_for_female_adults']) ? $body['req_for_female_adults'] : 0;
    $resourceRequest->req_for_kids = isset($body['req_for_kids']) ? $body['req_for_kids'] : 0;
    $resourceRequest->req_for_infants = isset($body['req_for_infants']) ? $body['req_for_infants'] : 0;
    $resourceRequest->req_summary = isset($body['req_summary']) ? $body['req_summary'] : "";
    $resourceRequest->req_details = isset($body['req_details']) ? $body['req_details'] : "";
    $resourceRequest->reqstatus_REF = 'open';

    try {
        $resourceRequest->req_ID = insertObject($db,'Request', $resourceRequest);
    } catch(PDOException $pdoe) {
        return $response->withJson(array('error' => 'New request could not be added',
            'detail' => $pdoe->getMessage()), 500);
    }
    return $response->withJson($resourceRequest, 200);
});

$app->run();

function getConnection() {
    // mysql://b8b5ceedc559fd:d58b20ed@us-cdbr-iron-east-04.cleardb.net/heroku_2ceffc3dc0a99d5?reconnect=true
    try {
        $db_username = "b8b5ceedc559fd";
        $db_password = "d58b20ed";
        $conn = new PDO('mysql:host=us-cdbr-iron-east-04.cleardb.net;dbname=heroku_2ceffc3dc0a99d5', $db_username, $db_password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
    return $conn;
}

function insertObject($db, $table, &$object, $keyname = NULL) {
    foreach(get_object_vars($object) as $field => $value) {
        $ins[] = ":" . $field;
    }
    $ins = implode(',', $ins);
    $fields = implode(',', array_keys(get_object_vars($object)));
    $sql = "INSERT INTO $table ($fields) VALUES ($ins)";

    $sth = $db->prepare($sql);
    foreach (get_object_vars($object) as $f => $v)
    {
        $sth->bindValue(':' . $f, $v);
    }
    $sth->execute();
    return $db->lastInsertId();
}
function checkAuth($authHeader, $db) {
    if(!isset($authHeader)) {
        return false;
    }
    $authBase64 = explode(' ', $authHeader);
    $authParts = explode(':', base64_decode($authBase64));
    $username = $authParts[0];
    $password = md5($authParts[1]);
    $authSql = "SELECT * FROM Person WHERE per_email=:email AND per_password=:password";
    $authStmt = $db->prepare($authSql);
    $authStmt->bindParam("email", $username );
    $authStmt->bindParam("password", $password);
    $authStmt->execute();
    $person = $authStmt->fetchAll(PDO::FETCH_ASSOC);
    if(isset($person[0])) {
        return true;
    } else {
        return false;
    }
}
