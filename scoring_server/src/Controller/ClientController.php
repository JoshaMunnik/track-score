<?php

namespace App\Controller;

use Cake\Http\Response;
use Cake\Routing\Asset;
use RuntimeException;

/**
 * The name of this controller matches the name of the directory where the SPA is built.
 * This controller will serve the `index.html` file from that directory.
 */
class ClientController extends AppController
{
  /**
   * Adds a timestamp to the resource within the given link in the HTML string.
   *
   * @param string $html Html source to update
   * @param string $tag Tag to check
   * @param string $attribute Attribute that might contain a local asset
   *
   * @return string Update Html source
   */
  private function addTimestamp(string $html, string $tag, string $attribute): string
  {
    $expression = '/<'.$tag.'[^>]+'.$attribute.'\s*=\s*["\"](.*)["\"]/i';
    if (preg_match_all($expression, $html, $matches) === false) {
      return $html;
    }
    // get all the captured values
    $assets = $matches[1];
    $done = [];
    for ($index = 0; $index < count($assets); $index++) {
      $asset = $assets[$index];
      // skip if the asset has been processed before
      if (in_array($asset, $done)) {
        continue;
      }
      $done[] = $asset;
      $withTimestamp = Asset::Url($asset, ['timestamp' => 'force']);
      $html = str_replace($asset, $withTimestamp, $html);
    }
    return $html;
  }

  /**
   * Returns the contents of `index.html` which will load the SPA.
   *
   * @return Response|null
   */
  public function index(): ?Response
  {
    $indexPath = WWW_ROOT.'client'.DS.'index.html';
    $indexHtml = file_get_contents($indexPath);
    if ($indexHtml === false) {
      throw new RuntimeException('Unable to read build index file: '.$indexPath);
    }
    $indexHtml = $this->addTimestamp($indexHtml, 'script', 'src');
    $indexHtml = $this->addTimestamp($indexHtml, 'link', 'href');
    return $this->response
      ->withType('html')
      ->withStringBody($indexHtml);
  }
}
