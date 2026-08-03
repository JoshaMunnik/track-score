<?php
declare(strict_types=1);

// Minimal bootstrap for isolated unit tests.
// Load composer's autoloader so classes (Cake components and ModelBase) can be autoloaded.
require __DIR__ . '/../vendor/autoload.php';

// Minimal stubs/initializations to avoid loading the full app bootstrap which runs migrations.
// Configure CakePHP cache used by I18n and other core functions so tests don't need full bootstrap.
if (class_exists(\Cake\Cache\Cache::class)) {
    // Set simple file caches used by I18n and core code.
    // Ensure serialization is enabled so objects (like Translator) can be cached.
    $tmp = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'cake_cache_';
    \Cake\Cache\Cache::setConfig('_cake_core_', [
        'className' => 'File',
        'path' => $tmp . 'core_',
        'serialize' => true,
    ]);
    \Cake\Cache\Cache::setConfig('_cake_translations_', [
        'className' => 'File',
        'path' => $tmp . 'translations_',
        'serialize' => true,
    ]);
}

