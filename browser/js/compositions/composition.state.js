app.config( function ($stateProvider) {
  // $stateProvider.state('composition', {
  //   url: '/composition/:compositionId',
  //   templateUrl: '/js/compositions/composition.html',
  //   resolve: {
  //     composition: function(CompositionFactory, $stateParams) {
  //       return CompositionFactory.getById($stateParams.compositionId, true);
  //     }
  //   },
  //   controller: 'CompositionCtrl'
  // })
  $stateProvider
  .state('editComposition', {
    url: '/composition/:compositionId',
    templateUrl: '/js/compositions/composition.edit.html',
    controller: 'CompositionEditor',
    resolve: {
      composition: function(CompositionFactory, $stateParams) {
        if (!$stateParams.compositionId) return CompositionFactory.new();
        return CompositionFactory.getById($stateParams.compositionId, true);
      },
      loopBucket: function (UserFactory) {
          return UserFactory.getLoopBucket()
      }
    }
  })
  .state('composition',{
    url: '/finalComposition',
    templateUrl: '/js/compositions/composition.view.html',
    controller: 'CompViewCtrl'
  })


});