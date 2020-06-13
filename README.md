# ZAP Friendly Report

A friendly ZAP Report converter from XML to HTML and Material Design.

The following import methods are supported:

* URL
* File upload
* XML string

# Status

This project is still a `Work In Progress`.

What's missing:

* ~~Finish the main form~~ (Done)
* Fix `dark` theme
* Fix charts `style` issues

# Debugging

There is a `debug` mode which can be turned on. Just edit the file `main.js`:

```javascript
$(function (event) {
    // Config
    var Settings = {
        'debug': false,
```

> Set the value to `true` to enable the `debug` mode.

# Preview

![image](https://user-images.githubusercontent.com/9881407/60761913-7a886680-a053-11e9-9903-29deeeab3533.png)
![image](https://user-images.githubusercontent.com/9881407/60761921-98ee6200-a053-11e9-95c6-8b7095a579ce.png)
![image](https://user-images.githubusercontent.com/9881407/60761926-bae7e480-a053-11e9-9e58-e505310ace11.png)
![image](https://user-images.githubusercontent.com/9881407/60761936-d0f5a500-a053-11e9-8e2a-a9679c120886.png)
![image](https://user-images.githubusercontent.com/9881407/60761939-f1bdfa80-a053-11e9-9908-0d972d6379e7.png)
![image](https://user-images.githubusercontent.com/9881407/60761951-524d3780-a054-11e9-800e-1e4c1bffebea.png)

> Pictures are subject to changes during the development. I will try to keep them updated.

# Charts

Charts are provided by the open-source project named [eCharts](https://echarts.apache.org).

## Themes

Charts themes are generated and downloaded from https://echarts.baidu.com/theme-builder/. Once downloaded, modify the following files:

* `index.html`: Add a new `javascript` include line at the end of the file. (_next to the others already existing_)
* `main.js`: Replace the defined chart `theme` names by the new ones.

# Feedback / Discussions

If you want to send any feedback or having any ideas you want to share regarding this project, feel free to check:

* the dedicated group on Google: https://groups.google.com/forum/#!msg/zaproxy-users/d7sQrlvR0Tg/SkflKmq1BAAJ
* or the dedicated thread on Twitter: https://twitter.com/psiinon/status/1141352908266659840

# Contribute

Feel free to open issues / pull requests if you want to contribute to this project.

# Thanks to

The people who helped me to make this project better and better.

* [@Sevendogs5](https://twitter.com/Sevendogs5): Who provided me sample report data and brainstorming.
* [@psiinon](https://twitter.com/psiinon): Who support me for this project.
* [@javanrasokat](https://twitter.com/javanrasokat): For the new upcomming features.

# Contact

You can reach me by email at jonathan.barda+zaproxy@gmail.com or on Twitter [@Jiab77](https://twitter.com/Jiab77)
