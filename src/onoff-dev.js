module.exports = () => {
    class Gpio {
        constructor(pin, direction) {
            this.pin = pin;
            this.direction = direction;
        }

        writeSync() {
            // noop
        }

        unexport() {
            // noop
        }
    }

    return {
        Gpio
    };
};
