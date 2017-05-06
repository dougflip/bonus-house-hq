module.exports = (dht, pin) => {
    const toF = c => (c * 1.8 + 32).toFixed(1);

    const fetchData = () => {
        return new Promise((resolve, reject) => {
            dht.read(11, pin, function(err, temperature, humidity) {
                return err
                    ? reject(err)
                    : resolve({
                          farenheight: toF(temperature),
                          humidity
                      });
            });
        });
    };

    const sendTempDataResponse = res => data => {
        res.setTimeout(500);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const result = Object.assign({}, data, {
            timestamp: new Date().toISOString()
        });
        res.end(JSON.stringify(result));
    };

    const sendTempDataError = res => err => {
        res.setTimeout(500);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ err }));
    };

    const handleWeatherDataRequest = (req, res) => {
        return fetchData()
            .then(sendTempDataResponse(res))
            .catch(sendTempDataError(res));
    };

    return {
        handleWeatherDataRequest
    };
};
