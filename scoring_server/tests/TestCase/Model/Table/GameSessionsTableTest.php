<?php

declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Entity\GameSessionEntity;
use App\Model\Table\GameSessionsTable;
use Cake\TestSuite\TestCase;

class GameSessionsTableTest extends TestCase
{
  private GameSessionsTable $table;

  protected function setUp(): void
  {
    parent::setUp();
    /** @noinspection PhpFieldAssignmentTypeMismatchInspection */
    $this->table = $this->fetchTable(GameSessionsTable::getDefaultAlias());
  }

  function testCreateSession(): void {
    $session = $this->table->createSession('game', 'initial data');
    $this->assertNotFalse($session);
    $this->assertInstanceOf(GameSessionEntity::class, $session);
    $this->assertEquals('game', $session->game_type);
    $this->assertEquals('initial data', $session->data);
    $this->assertEquals(1, $session->sequence);
    $this->assertEquals(5, strlen($session->code));
  }

  function testUpdatingNonExistingGameSession(): void {
    $actual = $this->table->updateSession('1234', 'data', true);
    $this->assertFalse($actual);
  }

  function testUpdatingExistingGameSession(): void {
    $session = $this->table->createSession('game', 'initial data');
    $this->assertNotFalse($session);
    $actual = $this->table->updateSession($session->code, 'new data', false);
    $this->assertTrue($actual);
  }

  function testGettingNonExistingGameSession(): void {
    $actual = $this->table->getSession('1234', 0);
    $this->assertFalse($actual);
  }

  function testGettingExistingGameSession(): void {
    $session = $this->table->createSession('game', 'initial data');
    $this->assertNotFalse($session);
    $actual = $this->table->getSession($session->code, 0);
    $this->assertNotFalse($actual);
  }

  function testGettingExistingUnchangedGameSession(): void {
    $session = $this->table->createSession('game', 'initial data');
    $this->assertNotFalse($session);
    $actual = $this->table->getSession($session->code, $session->sequence);
    $this->assertFalse($actual);
  }

  function testGettingExistingChangedGameSession(): void {
    $session = $this->table->createSession('game', 'initial data');
    $this->assertNotFalse($session);
    $sequence = $session->sequence;
    $this->table->updateSession($session->code, 'new data', false);
    $actual = $this->table->getSession($session->code, $sequence);
    $this->assertNotFalse($actual);
  }
}
