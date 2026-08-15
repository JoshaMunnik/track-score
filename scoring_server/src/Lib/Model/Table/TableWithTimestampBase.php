<?php

namespace App\Lib\Model\Table;

use Cake\Datasource\EntityInterface;
use Cake\ORM\Behavior\TimestampBehavior;
use DateTimeInterface;

/**
 * {@link TableWithTimestampBase} adds the {@link TimestampBehavior} to a {@link TableBase}.
 *
 * @method DateTimeInterface timestamp(?DateTimeInterface $ts = null, bool $refreshTimestamp = false) Get or set the timestamp to be used
 * @method bool touch(EntityInterface $entity, string $eventName = 'Model.beforeSave') Touch an entity
 */
class TableWithTimestampBase extends TableBase
{
  #region CakePHP callbacks

  /**
   * @inheritDoc
   */
  public function initialize(array $config): void
  {
    parent::initialize($config);
    $this->addBehavior('Timestamp');
  }

  #endregion
}
