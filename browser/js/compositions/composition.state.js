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
  $stateProvider.state('editComposition', {
    url: '/composition',
    templateUrl: '/js/compositions/composition.edit.html',
    controller: 'CompositionEditor'
  })
})