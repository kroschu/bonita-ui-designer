(function() {
  'use strict';

  describe('assetType filter', function() {
    var $filter, assets, filters;

    beforeEach(angular.mock.module('bonitasoft.designer.assets'));

    beforeEach(inject(function(_$filter_) {
      $filter = _$filter_;

      assets = [
        { 'name': 'MyAbcExample.js', 'type': 'js' },
        { 'name': 'MyAbcExample.css', 'type': 'css' },
        { 'name': 'MyAbcExample.png', 'type': 'img' }
      ];

      filters = {
        js: { label: 'Javascript', value: true },
        css: { label: 'CSS', value: true },
        img: { label: 'Image', value: true }
      };

    }));

    it('should not filter when no arg filters', function() {
      expect($filter('assetFilter')(assets)).toEqual(assets);
    });

    it('should not filter when filtering items are true', function() {
      expect($filter('assetFilter')(assets, filters)).toEqual(assets);
    });

    it('should exclude css', function() {
      filters.css.value = false;

      expect($filter('assetFilter')(assets, filters)).toEqual([
        { 'name': 'MyAbcExample.js', 'type': 'js' },
        { 'name': 'MyAbcExample.png', 'type': 'img' }
      ]);
    });

    it('should exclude img', function() {
      filters.img.value = false;

      expect($filter('assetFilter')(assets, filters)).toEqual([
        { 'name': 'MyAbcExample.js', 'type': 'js' },
        { 'name': 'MyAbcExample.css', 'type': 'css' }
      ]);
    });

    it('should exclude js', function() {
      filters.js.value = false;

      expect($filter('assetFilter')(assets, filters)).toEqual([
        { 'name': 'MyAbcExample.css', 'type': 'css' },
        { 'name': 'MyAbcExample.png', 'type': 'img' }
      ]);
    });

    it('should exclude an asset with type which is not supported', function() {
      assets.push({ 'name': 'foo.json', 'type': 'json' });

      expect($filter('assetFilter')(assets, filters)).toEqual([
        { 'name': 'MyAbcExample.js', 'type': 'js' },
        { 'name': 'MyAbcExample.css', 'type': 'css' },
        { 'name': 'MyAbcExample.png', 'type': 'img' }
      ]);
    });
  });

})();
