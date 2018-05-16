var express = require('express'),
    app = express(),
    port = process.env.PORT || 3006,
    bodyParser = require('body-parser');
var cors = require('cors');
var exec = require('child_process').exec;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.listen(port);



app.get('/test', function (req, res) {
    res.end("Success!");
})

app.get('/deployApp', function (req, res) {

    exec('sh /home/ubuntu/myfolder/batchfiles/deploy-buyer-app.sh',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);

            console.log(`${stderr}`);
            res.json(true);
            if (error !== null) {
                console.log(`exec error: ${error}`);
                res.json(false);
            }
        });

})

app.get('/deployService', function (req, res) {

    exec('sh /home/ubuntu/myfolder/batchfiles/deploy-buyer-service.sh',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);

            console.log(`${stderr}`);
            res.json(true);
            if (error !== null) {
                console.log(`exec error: ${error}`);
                res.json(false);
            }
        });

})



console.log('Buyer App started on: ' + port);

