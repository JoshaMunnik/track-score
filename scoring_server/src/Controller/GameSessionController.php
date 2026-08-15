<?php

namespace App\Controller;

use App\Model\Table\GameSessionsTable;
use Cake\Controller\Controller;
use Cake\Http\Exception\BadRequestException;
use Cake\Http\Exception\UnprocessableContentException;
use Cake\Http\Response;

/**
 * A simple API controller to create, update and get game sessions.
 */
class GameSessionController extends Controller
{
  #region private variables

  private GameSessionsTable $m_gameSessions;

  #endregion

  #region CakePHP callbacks

  /**
   * @inheritDoc
   */
  public function initialize(): void
  {
    parent::initialize();
    $this->getRequest()->allowMethod(['get', 'post', 'put', 'delete']);
    /** @var GameSessionsTable $table */
    $table = self::fetchTable(GameSessionsTable::getDefaultAlias());
    $this->m_gameSessions = $table;
  }

  #endregion

  #region actions

  /**
   * Creates a new session.
   *
   * Expected POST parameter(s):
   * string $type
   * string $data
   *
   * 200 Response body:
   * string $code
   *
   * 400 missing parameters or invalid data (too long)
   * 422 error if no game session could be created
   *
   * @return Response
   */
  public function create(): Response
  {
    ['type' => $type, 'data' => $data] = $this->getPostValues(['type', 'data']);
    if (strlen($data) > 1024 * 1024) {
      throw new BadRequestException('Game session data is too long.');
    }
    $session = $this->m_gameSessions->createSession($type, $data);
    if ($session === false) {
      throw new UnprocessableContentException('Failed to create game session.');
    }
    return $this->jsonResponse([
      'code' => $session->code,
    ]);
  }

  /**
   * Updates a session.
   *
   * Expected POST parameter(s):
   * string $code
   * string $data
   * int $finished (1 = true, other values = false)
   *
   * 200 success (no body)
   * 400 missing parameters or invalid data (too long)
   * 422 the game session could not be updated
   *
   * @return Response
   */
  public function update(): Response
  {
    ['code' => $code, 'data' => $data, 'finished' => $finished] = $this->getPostValues([
      'code',
      'data',
      'finished'
    ]);
    if (strlen($data) > 1024 * 1024) {
      throw new BadRequestException('Game session data is too long.');
    }
    $result = $this->m_gameSessions->updateSession($code, $data, $finished == '1');
    if ($result === false) {
      throw new UnprocessableContentException('Failed to update game session.');
    }
    return $this->jsonResponse([]);
  }

  /**
   * Gets new session data (if any).
   *
   * Expected POST parameter(s):
   * string $code
   * int $sequence
   *
   * 200 Response body:
   * string $data
   * string $type
   * int $sequence
   * int $finished (1 = finished, 0 = unfinished)
   *
   * 400 missing parameters
   * 422 error if there is new data or the code is invalid
   *
   * @return Response
   */
  public function get(): Response
  {
    ['code' => $code, 'sequence' => $sequence] = $this->getPostValues(['code', 'sequence']);
    $session = $this->m_gameSessions->getSession($code, (int) $sequence);
    if ($session === false) {
      throw new UnprocessableContentException('There is no new session data.');
    }
    return $this->jsonResponse([
      'data' => $session->data,
      'type' => $session->game_type,
      'sequence' => $session->sequence,
      'finished' => $session->finished_date != null ? 1 : 0,
    ]);
  }

  /**
   * This call does not expect any parameters and does not return a response body. It removes
   * entities whose last access was one month ago or older.
   *
   *  200 success (no body)
   *
   * @return Response
   */
  public function cleanup(): Response
  {
    $this->m_gameSessions->cleanup();
    return $this->jsonResponse([]);
  }

  #endregion

  #region private methods

  /**
   * Gets the POST values for the given fields. Throws an exception if the request is not a
   * POST request or if one or more fields are missing.
   *
   * @param string[] $fields
   *
   * @return string[] Key is a value from $fields, the value the POST value.
   */
  private function getPostValues(array $fields): array
  {
    if (!$this->request->is('post')) {
      throw new BadRequestException('Only POST requests are allowed');
    }
    $result = [];
    foreach ($fields as $field) {
      $value = $this->request->getData($field);
      if ($value === null) {
        throw new BadRequestException('One or more required fields are missing');
      }
      $result[$field] = $value;
    }
    return $result;
  }

  /**
   * Returns the data as a JSON response.
   *
   * @param mixed $data
   *
   * @return Response
   */
  private function jsonResponse(mixed $data): Response
  {
    return $this
      ->getResponse()
      ->withType('application/json')
      ->withStringBody(json_encode($data));
  }

  #endregion
}
