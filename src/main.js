const fs = require('fs');
const http = require('http');
const url = require('url');
const Gpio = process.env.NODE_ENV === 'production'
    ? require('onoff').Gpio
    : require('./onoff-dev')().Gpio;
const sensor = process.env.NODE_ENV === 'production'
    ? require('node-dht-sensor')
    : require('./node-dht-sensor-dev');

const lights = require('./lights');
const weatherData = require('./weather-data');

const indexHtml = fs.readFileSync('./src/index.html', 'utf8');
const handleIndexReq = (req, res) => {
    res.setTimeout(500);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(indexHtml);
};

const floodLightsGpio = new Gpio(14, 'out');
const { handleLightOn, handleLightOff } = lights(floodLightsGpio);

const { handleWeatherDataRequest } = weatherData(sensor, 4);

const actionMap = {
    '/lights/on': handleLightOn,
    '/lights/off': handleLightOff,
    '/weather-data': handleWeatherDataRequest
};

const requestHandler = (req, res) => {
    const { pathname } = url.parse(req.url);
    const action = actionMap[pathname] || handleIndexReq;
    return action(req, res);
};

const server = http.createServer(requestHandler);

server.listen(6555, null, null, () => {
    console.log('server up and running');
});

process.on('SIGINT', () => {
    console.log('see ya!');
    server.close();
    floodLightsGpio.unexport();
});
