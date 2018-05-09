module.exports = function(sdk){
  var request = sdk.modules.request,
      _ = sdk.modules.lodash,
      router = new sdk.Router(),
      TicketShow = sdk.models.TicketShow;

  router.post('/api/v1/tickets', function(req, resp, next){    
    const { id_show, id_ingresso } = req.body;
    const params = { 
      id_show: id_show, 
      id_ingresso: id_ingresso 
    };

    TicketShow.create( params ).then( obj => {
      next( obj );
    }).catch( next );
  });

  router.get('/api/v1/tickets', function(req, resp, next){ 
    const { query } = req;
    const { id_show } = query;

    TicketShow.count({ where: { id_show: id_show } }).then( total => {
      resp.json(total || 0);
    }).catch( next );
  });

  router.get('/api/v1/tickets/validate', function(req, resp, next){
    const { query } = req;
    const { id_show, id_ingresso } = query;

    TicketShow.count({ where: { id_show: id_show, id_ingresso: id_ingresso } }).then( count => {
      resp.json( { 
        valid: (count || 0) > 0
      });
    }).catch( next );
  });

  return router;
}