<?php
declare(strict_types=1);

namespace App;

use App\Middleware\HostHeaderMiddleware;
use Cake\Core\Configure;
use Cake\Core\ContainerInterface;
use Cake\Datasource\FactoryLocator;
use Cake\Error\Middleware\ErrorHandlerMiddleware;
use Cake\Event\EventManagerInterface;
use Cake\Http\BaseApplication;
use Cake\Http\Middleware\BodyParserMiddleware;
use Cake\Http\Middleware\CsrfProtectionMiddleware;
use Cake\Http\MiddlewareQueue;
use Cake\Http\Response;
use Cake\ORM\Locator\TableLocator;
use Cake\Routing\Middleware\AssetMiddleware;
use Cake\Routing\Middleware\RoutingMiddleware;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Application setup class.
 *
 * @extends BaseApplication<Application>
 */
class Application extends BaseApplication
{
  /**
   * Load all the application config and bootstrap logic.
   *
   * @return void
   */
  public function bootstrap(): void
  {
    // Call parent to load bootstrap from files.
    parent::bootstrap();

    // By default, does not allow fallback classes.
    FactoryLocator::add('Table', (new TableLocator())->allowFallbackClass(false));
  }

  /**
   * Setups the middleware queue your application will use.
   *
   * @param MiddlewareQueue $middlewareQueue The middleware queue to setup.
   * @return MiddlewareQueue The updated middleware queue.
   */
  public function middleware(MiddlewareQueue $middlewareQueue): MiddlewareQueue
  {
    $csrf = new CsrfProtectionMiddleware([
      'httponly' => true,
    ]);
    // skip CSRF validation for GameSession controller (since it is a stateless API provider)
    $csrf->skipCheckCallback(function ($request) {
      return ($request->getParam('controller') === 'GameSession');
    });
    $middlewareQueue
      // allow calls from vite dev server (localhost:5173)
      ->add(function (ServerRequestInterface $request, $handler): ResponseInterface {
        // if it's a preflight request, stop CakePHP right here and return 200
        if ($request->getMethod() === 'OPTIONS') {
          $response = new Response();
          return $response
            ->withStatus(200)
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers',
              'X-Requested-With, Content-Type, Authorization')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
        }
        $response = $handler->handle($request);
        return $response
          ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
          ->withHeader('Access-Control-Allow-Headers',
            'X-Requested-With, Content-Type, Authorization')
          ->withHeader('Access-Control-Allow-Credentials', 'true');
      })

      // Catch any exceptions in the lower layers,
      // and make an error page/response
      ->add(new ErrorHandlerMiddleware(Configure::read('Error'), $this))

      // Validate Host header to prevent Host Header Injection attacks.
      // In production, ensures App.fullBaseUrl is configured and validates
      // the incoming Host header against it.
      ->add(new HostHeaderMiddleware())

      // Handle plugin/theme assets like CakePHP normally does.
      ->add(new AssetMiddleware([
        'cacheTime' => Configure::read('Asset.cacheTime'),
      ]))

      // Add routing middleware.
      // If you have a large number of routes connected, turning on routes
      // caching in production could improve performance.
      // See https://github.com/CakeDC/cakephp-cached-routing
      ->add(new RoutingMiddleware($this))

      // Parse various types of encoded request bodies so that they are
      // available as array through $request->getData()
      // https://book.cakephp.org/5/en/controllers/middleware.html#body-parser-middleware
      ->add(new BodyParserMiddleware())

      // Cross Site Request Forgery (CSRF) Protection Middleware
      // https://book.cakephp.org/5/en/security/csrf.html#cross-site-request-forgery-csrf-middleware
      ->add($csrf)
    ;

    return $middlewareQueue;
  }

  /**
   * Register application container services.
   *
   * @param ContainerInterface $container The Container to update.
   * @return void
   * @link https://book.cakephp.org/5/en/development/dependency-injection.html#dependency-injection
   */
  public function services(ContainerInterface $container): void
  {
    // Allow your Tables to be dependency injected
    //$container->delegate(new \Cake\ORM\Locator\TableContainer());
  }

  /**
   * Register custom event listeners here
   *
   * @param EventManagerInterface $eventManager
   * @return EventManagerInterface
   * @link https://book.cakephp.org/5/en/core-libraries/events.html#registering-listeners
   */
  public function events(EventManagerInterface $eventManager): EventManagerInterface
  {
    // $eventManager->on(new SomeCustomListenerClass());

    return $eventManager;
  }
}
