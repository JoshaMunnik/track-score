<?php
use Cake\Routing\Route\DashedRoute;
use Cake\Routing\RouteBuilder;

return function (RouteBuilder $routes): void {
  $routes->setRouteClass(DashedRoute::class);
  $routes->scope('/', function (RouteBuilder $builder): void {
    // API handler
    $builder->connect('/game-session/{action}', ['controller' => 'GameSession']);
    // the rest of the url is handled by the SPA
    $builder->connect('/client/**', ['controller' => 'Client', 'action' => 'index']);
    // just handle all urls and redirect back to /client/...
    $builder->connect('/**', ['controller' => 'Home', 'action' => 'index']);
  });
};
