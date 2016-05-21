<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");
    $db = getConnection();

    return $response;
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
