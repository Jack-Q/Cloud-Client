var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var spawn = require('child_process').spawn;
var net = require('net');
var fs = require('fs');
var API_PORT = 0;

var isWin = /^win/.test(process.platform);
var mainWindow = null;
var server = null;
var portrange = 12345;
var configFilePath = "server/config.json";

function getPort(cb) {
    var port = portrange++;

    var server = net.createServer()
    server.listen(port, function (err) {
        server.once('close', function () {
            cb(port);
        })
        server.close();
    })
    server.on('error', function (err) {
        getPort(cb);
    })
}

var startServer = () => {
    var portrange = 12345;
    if (isWin) {
        server = spawn('cmd.exe', ['/c', 'server\\server.bat']);
    } else {
        server = spawn('sh', ['-c', 'server/server.sh']);
    }
}

var shutDownServer = () => {
    server.stdin.pause();
    server.kill();
}

app.on('ready', function () {
    getPort((port) => {
        global["PORT"] = port;
        var config = JSON.parse(fs.readFileSync(configFilePath));
        config.port = port;
        fs.writeFileSync(configFilePath, JSON.stringify(config));

        startServer();

        // main browser window
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600
        });
        mainWindow.hide();
        mainWindow.setMenuBarVisibility(false);
        mainWindow.setMinimumSize(800, 600);

        mainWindow.loadURL('file://' + __dirname + '/index.html');

        mainWindow.on('closed', function () {
            mainWindow = null;
            shutDownServer();
        });


        setTimeout(() => {
            mainWindow.show();
        }, 2000);


    })



});