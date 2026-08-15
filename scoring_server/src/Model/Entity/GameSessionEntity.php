<?php

namespace App\Model\Entity;

use App\Lib\Model\Entity\IEntityWithId;
use App\Lib\Model\Entity\IEntityWithTimestamp;
use Cake\ORM\Entity;
use DateTime;

/**
 * @property string $code
 * @property string $game_type
 * @property int $sequence
 * @property string $data
 * @property DateTime|null $finished_date
 */
class GameSessionEntity extends Entity implements IEntityWithTimestamp, IEntityWithId
{
  #region field constants

  public const CODE = 'code';
  public const GAME_TYPE = 'game_type';
  public const SEQUENCE  = 'sequence';
  public const DATA = 'data';
  public const FINISHED_DATE   = 'finished_date';

  #endregion
}
