/**
 * API to toggle the given GPIO on and off.
 */
module.exports = relay => {
    const lightOn = () => relay.writeSync(1);
    const lightOff = () => relay.writeSync(0);

    const handleLightRequest = (result, lightFn) => (req, res) => {
        res.setTimeout(1000);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
    };

    const handleLightOn = handleLightRequest('Turned on!', lightOn);
    const handleLightOff = handleLightRequest('Turned off!', lightOff);

    return {
        handleLightOn,
        handleLightOff
    };
};
