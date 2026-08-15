<?php

namespace App\Lib\Model\Table;

use Cake\ORM\Table;
use Cake\Utility\Inflector;

/**
 * Base class for all tables within the project. Set the entity class to
 * App\Model\Entity\{singular table name}Entity
 */
class TableBase extends Table
{
  #region CakePHP callbacks

  /**
   * @inheritDoc
   */
  public function initialize(array $config): void
  {
    parent::initialize($config);
    $defaultAlias = static::getDefaultAlias();
    if ($defaultAlias !== null) {
      $entityClass = sprintf(
        'App\\Model\\Entity\\%sEntity',
        Inflector::singularize($defaultAlias)
      );
      $this->setEntityClass($entityClass);
    }
  }

  #endregion

  #region public methods

  /**
   * Gets the default alias based on the class name removing the 'Table' text at the end.
   *
   * Code is based on {@link Table::getAlias()}
   *
   * @return string|null
   */
  public static function getDefaultAlias(): ?string
  {
    $alias = namespaceSplit(static::class);
    return substr(end($alias), 0, -5) ?: null;
  }

  /**
   * Adds the table alias to a column name using '.' as separater character.
   *
   * @param string $aColumnName
   *
   * @return string Column name with table alias
   */
  public function prefix(string $aColumnName): string
  {
    return $this->getAlias().'.'.$aColumnName;
  }

  /**
   * Gets the values in an array, key = id, value = name field and sort it on the name field.
   *
   * @return string[]
   */
  public function getSortedList(): array
  {
    $list = $this->find('list')->toArray();
    uasort($list, fn($first, $second) => strcasecmp($first, $second));
    return $list;
  }

  #endregion
}
