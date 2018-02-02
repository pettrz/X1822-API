var objectId = require('mongodb').ObjectId;

module.exports = function(app, db){

    //C=Create
    app.post('/notes', (req, res) => {

        const myDB = db.db('notesdb'); //namnet på db i mlab
        //myDB.collection('notes');

        const note = { text: req.body.body, title: req.body.title };
        myDB.collection('notes').insert(note, (err, result)=>{
            if (err){
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });

        console.log(req.body); //{ title: xxx, body: xxx}
        //res.send('Hello from Post');
    });

    //R=Read
    app.get('/notes/:id', (req, res) => {
        
        const myDB = db.db('notesdb');

        const id = req.params.id;
        const details = {'_id' : new objectId(id)};
        myDB.collection('notes').findOne(details, (err, item) => {
            if (err){
                res.send({'error': 'an erro again...'});
            } else {
                res.send(item);
            }
        });
        
        
        console.log('asking for a note');
        //res.send('this should be a returned note');
    });

    //U=Update
    app.put('/notes/:id', (req, res) => {

        const myDB = db.db('notesdb');

        const id = req.params.id;
        const details = { '_id': new objectId(id) };
        const note = { text: req.body.body, title: req.body.title };

        myDB.collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error again...' });
            } else {
                res.send(note);
            }
        });

        console.log('asking for a note');


    });

    //D=Delete
    app.delete('/nodes/:id', (req, res) => {

        const myDB = db.db('notesdb');

        const id = req.params.id;
        const details = { '_id': new objectId(id) };

        myDB.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error again...' });
            } else {
                res.send('Note' + id + 'was deleted.');
            }
        });
    });


};