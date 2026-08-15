<?php

// Redirect to https version of the url
function isSSL(): bool
{
  if (!empty($_SERVER['HTTPS'])) {
    return true;
  }
  if (
    !empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && ($_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')
  ) {
    return true;
  }
  return false;
}

if (!isSSL()) {
  header("Location: https://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"]);
  exit();
}

// For built-in server
if (PHP_SAPI === 'cli-server') {
  $_SERVER['PHP_SELF'] = '/'.basename(__FILE__);

  $url = parse_url(urldecode($_SERVER['REQUEST_URI']));
  $file = __DIR__.$url['path'];
  if (!str_contains($url['path'], '..') && str_contains($url['path'], '.') && is_file($file)) {
    return false;
  }
}
require dirname(__DIR__, 1).'/scoring_server/vendor/autoload.php';

use App\Application;
use Cake\Http\Server;

// Bind your application to the server.
$server = new Server(new Application(dirname(__DIR__, 1).'/scoring_server/config'));

// Run the request/response through the application and emit the response.
$server->emit($server->run());
