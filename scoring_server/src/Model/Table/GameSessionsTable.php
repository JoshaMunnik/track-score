<?php

namespace App\Model\Table;

use App\Lib\Model\Entity\IEntityWithTimestamp;
use App\Lib\Model\Table\TableWithTimestampBase;
use App\Model\Entity\GameSessionEntity;
use DateTime;

/**
 * A table that stores the sessions for various games. The data is stored as a single string,
 * assuming the client knows how to create and process the data.
 */
class GameSessionsTable extends TableWithTimestampBase
{
  #region private constants

  /**
   * Alphabet minus characters that can be confused with numbers (I, O) and numbers minus characters
   * that can be confused with letters (1, 0).
   */
  private const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  private const NUMBERS = '23456789';

  #endregion

  #region public methods

  /**
   * Creates a new game session with a unique code.
   *
   * @param string $type Game type the session is created for
   * @param string $data Initial data to store
   *
   * @return GameSessionEntity|false False if the entity could not be created in the database
   */
  public function createSession(string $type, string $data): GameSessionEntity|false
  {
    while(true) {
      $code = $this->createCode();
      if (!$this->exists([GameSessionEntity::CODE => $code])) {
        /** @var GameSessionEntity $session */
        $session = $this->newEntity([
          GameSessionEntity::CODE => $code,
          GameSessionEntity::SEQUENCE => 1,
          GameSessionEntity::GAME_TYPE => $type,
          GameSessionEntity::DATA => $data,
        ]);
        return $this->save($session) !== false ? $session : false;
      }
    }
  }

  /**
   * Updates a session.
   *
   * @param string $code Code that identifies the session
   * @param string $data New data
   * @param bool $finished True to set session to finished
   *
   * @return bool False if no session could be found or the session is already finished.
   */
  public function updateSession(string $code, string $data, bool $finished): bool
  {
    /** @var GameSessionEntity $entity */
    $entity = $this
      ->find()
      ->where([
        GameSessionEntity::CODE => $code,
        GameSessionEntity::FINISHED_DATE.' IS' => null
      ])
      ->first();
    if ($entity === null) {
      return false;
    }
    $entity->data = $data;
    $entity->finished_date = $finished ? new DateTime() : null;
    $entity->sequence++;
    return $this->save($entity) !== false;
  }

  /**
   * Gets new session data (if any).
   *
   * @param string $code Code that identifies the session
   * @param int $sequence Sequence received with previous data
   *
   * @return GameSessionEntity|false False if there is no session or there is no new data.
   */
  public function getSession(string $code, int $sequence): GameSessionEntity|false
  {
    /** @var GameSessionEntity $entity */
    $entity = $this
      ->find()
      ->where([
        GameSessionEntity::CODE => $code,
        GameSessionEntity::SEQUENCE.' >' => $sequence
      ])
      ->first();
    return $entity !== null ? $entity : false;
  }

  /**
   * Removes all entities that are older than 1 month.
   *
   * @return int Number of entities removed.
   */
  public function cleanup(): int {
    $now = new DateTime();
    $oneMonthAgo = $now->modify('-1 month');
    return $this->deleteAll([
      IEntityWithTimestamp::MODIFIED.' <' => $oneMonthAgo
    ]);
  }

  #endregion

  #region private methods

  /**
   * Creates a short unique code
   *
   * @return string
   */
  private function createCode(): string
  {
    return $this->randomChar(self::ALPHABET)
      . $this->randomChar(self::ALPHABET)
      . $this->randomChar(self::NUMBERS)
      . $this->randomChar(self::ALPHABET)
      . $this->randomChar(self::NUMBERS);
  }

  /**
   * Gets a random character from a string of characters.
   *
   * @param string $characters
   *
   * @return string
   */
  private function randomChar(string $characters): string
  {
    return $characters[rand(0, strlen($characters) - 1)];
  }

  #endregion
}
