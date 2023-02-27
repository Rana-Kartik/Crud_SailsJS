/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    list: function(req, res)  { 
       Test.find({}).exec(function(err, test) {
            //console.log(test)
            if(err){
                res.send(500, {error : 'Database Error'})
            }
                res.view('list',{test: test})
            })
    },
    add : function(req,res){
           res.view('add')
    },
    create : function(req,res){
        let title = req.body.title
        let body = req.body.body
        console.log(title)
        console.log(body)
           Test.create({ title: title, body: body }).exec(function(err){
            console.log('post created')
            if(err){
                res.send(500, {error : 'Database Error'})
            }
            res.redirect('/test/list')
            })   
    },
    delete : function(req,res){
       Test.destroy({id : req.params.id}).exec(function(err){
        if(err){
            res.send(500, {error : 'Database Error'})
        }
        res.redirect('/test/list') 
       })
    },
    edit : function(req,res){
        Test.findOne({id: req.params.id}).exec(function(err,test){
            if(err){
                res.send(500, {error : 'Database Error'})
            }
            res.view('edit',{test: test}) 
        })
    },
    update : function(req,res){
        var title = req.body.title
        var body =  req.body.body
        Test.update({id : req.params.id},{title: title, body: body}).exec(function(err){
            if(err){
                res.send(500, {error : 'Database Error'})
            }
            res.redirect('/test/list')
        })
        return false
    }
}
