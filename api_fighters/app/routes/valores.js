module.exports = function(sdk){
  var request = sdk.modules.request,
      _ = sdk.modules.lodash,
      router = new sdk.Router(),
      ValorShow = sdk.models.ValorShow;

  router.post('/api/v1/valores', function(req, resp, next){    
    const { id_show, valor } = req.body;
    const params = { 
      id_show: id_show, 
      valor: valor 
    };

    ValorShow.create( params ).then( obj => {
      next( obj );
    }).catch( next );
  });

  router.get('/api/v1/valores', function(req, resp, next){ 
    const { query } = req;
    const { id_show } = query;

    ValorShow.sum('valor', { where: { id_show: id_show } }).then( sum => {
      resp.json( sum || 0 );
    }).catch( next );
  });

  router.get('/api/v1/valores/ticket-medio', function(req, resp, next){
    const { query } = req;
    const { id_show } = query;

    ValorShow.count({ where: { id_show: id_show } }).then( count => {
      ValorShow.sum('valor', { where: { id_show: id_show }}).then( sum => {
        resp.json( { 
          ticket_medio: (sum || 0) / (count || 0)
        });
      }).catch( next );
    }).catch( next );
  });

  return router;
}