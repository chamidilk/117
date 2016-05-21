<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');

    $db = getConnection();

    return $response->withJson(array('name' => $name));
});
$app->get('/requests', function (Request $request, Response $response) {
    $db = getConnection();
    /*if(!checkAuth($request->getHeaderLine('Authorization'), $db)) {
        return $response->withJson(array('error' => 'Authorization invalid'), 403);
    }*/
    $qParams = $request->getQueryParams();
    $reqType = $qParams['req_type_REF'];
    $reqStatus = $qParams['reqstatus_REF'];
    $startDate = $qParams['startDate'];
    $endDate = $qParams['endDate'];
    $limit = $qParams['limit'];
    $offset = $qParams['offset'];
    $orderBy = $qParams['orderBy'];
    $orderingDirection = $qParams['direction'];
    try {

        // default query
        $reqSql = "SELECT Request.*, Person.* FROM Request INNER JOIN Person ON Request.requestor_per_ID=Person.per_ID";

        if(isset($reqType) && isset($startDate) && isset($endDate)) {
            $reqSql .= " WHERE Request.req_type_REF='$reqType' AND Request.req_made_date >= '$startDate' AND Request.req_made_date <= '$endDate'";
        } else if (isset($reqType) && isset($startDate)) {
            $reqSql .= " WHERE Request.req_type_REF='$reqType' AND Request.req_made_date >= '$startDate'";
        } else if (isset($reqType) && isset($endDate)) {
            $reqSql .= " WHERE Request.req_type_REF='$reqType' AND Request.req_made_date <= '$endDate'";
        } else if(isset($startDate) && isset($endDate)) {
            $reqSql .= " WHERE Request.req_made_date >= '$startDate' AND Request.req_made_date <= '$endDate'";
        } else if(isset($reqType)) {
            $reqSql .= " WHERE Request.req_type_REF='$reqType'";
        } else if(isset($startDate)) {
            $reqSql .= " WHERE Request.req_made_date >= '$startDate'";
        } else if(isset($endDate)) {
            $reqSql .= " WHERE Request.req_made_date <= '$endDate'";
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
        return $response->withJson($reqs);
    } catch(PDOException $pdoe) {
        return $response->withJson(array('error' => 'Error fetching request data',
            'detail' => $pdoe->getMessage(),
            'query' => $reqSql), 500);
    }

});
$app->post('/requests', function (Request $request, Response $response) {
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
    $person->per_comments = "";
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
