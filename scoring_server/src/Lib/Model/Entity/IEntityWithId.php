<?php

namespace App\Lib\Model\Entity;

/**
 * {@link IEntityWithId} adds an {@link id} column.
 *
 * @property int $id Id of record
 */
interface IEntityWithId
{
  #region column names

  public const ID = 'id';

  #endregion
}
