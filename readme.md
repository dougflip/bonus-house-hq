Bonus House HQ
==============

Server targeting an rpi zero w for automation in the bonus house.

## Setup

```
npm install
```

## Running the Server

For development you should use:

```
npm start
```

[http://localhost:6555/]

For actual use you should set NODE_ENV to `production`

```
NODE_ENV=production npm start
```

This will pick up the real libs for reading and writing GPIO.

## PI Setup

The server is hard coded to write to GPIO 14 and read from GPIO 4.
GPIO 14 is used to power a [relay](https://www.amazon.com/gp/product/B0087ZTN08/ref=oh_aui_detailpage_o07_s00?ie=UTF8&psc=1)
which powers outside flood lights.
GPIO 4 is reading from a [temp/humidity sensor](https://www.amazon.com/gp/product/B01H3J3H82/ref=oh_aui_detailpage_o02_s01?ie=UTF8&psc=1)
located inside.

## Thanks

- https://github.com/fivdi/onoff
- https://github.com/momenso/node-dht-sensor
