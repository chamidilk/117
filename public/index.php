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
    try {
        $db_username = "rdeshapr_ramindu";
        $db_password = "181mihiri";
        $conn = new PDO('mysql:host=67.20.48.4;dbname=rdeshapr_117', $db_username, $db_password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
    return $conn;
}
