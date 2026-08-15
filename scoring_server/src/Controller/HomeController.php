<?php

namespace App\Controller;

use Cake\Http\Response;

class HomeController extends AppController
{
  /**
   * Redirect to client page that will load the SPA.
   *
   * @return Response|null
   */
  public function index(): ?Response
  {
    return $this->redirect(['controller' => 'Client', 'action' => 'index']);
  }
}
