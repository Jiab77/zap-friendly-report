# ZAP Friendly Report

A friendly ZAP Report converter from XML to HTML and Material Design.

The following import methods are supported:

* URL
* File upload
* XML string

## Status

This project is still a `Work In Progress`.

TODO:

- [X] Finish the main form
- [X] Fix `dark` theme
- [X] Fix charts `style` issues
- [X] Fix `dark` theme not applied when the report is loaded after theme selection
- [X] Display found evidences ([#3](https://github.com/Jiab77/zap-friendly-report/issues/3))

What's missing:

- [X] Add support multi-sites reports (thanks to [@JavanXD](https://github.com/JavanXD) for pointing it)
- [ ] Replace [Materializecss](http://archives.materializecss.com/0.100.2/) by [Fomantic-UI](https://fomantic-ui.com/)
- [ ] Split main code in several parts
- [ ] Add translations and country flags
- [ ] Add `dark` theme detection from user environment
- [ ] Create a wiki
- [ ] Create a [ZAP](https://www.zaproxy.org/) pluggin version

## Debugging

There is a `debug` mode which can be turned on. Just edit the file `main.js`:

```javascript
$(function (event) {
    // Config
    var Settings = {
        'debug': false,
```

> Set the value to `true` to enable the `debug` mode.

## Improve themes

You can improve the whole theming by changing two parts in the project.

### CSS

You can change the whole design by changing style properties in the `main.css` file.

> You should avoid chaning properties of the `body` and `main` blocks.
>
> __If you do so, you might break the whole design.__

### Javascript

You can change witch elements will be styled in dark in the `main.js` file by changing the following parts:

```js
// User want it dark!
if (theme === 'dark') {
    ...

    // Change body classes
    Framework.body.removeClass('grey lighten-5 grey-text text-darken-3');
    Framework.body.addClass('grey darken-2 white-text');

    // Change report source fieldset classes
    $('#report-source').addClass('grey darken-3');

    // Change generated collapsibles classes
    $('.collapsible').each(function () {
        $(this).addClass('grey darken-4 white-text');
    });
    $('.collapsible-header').each(function () {
        $(this).addClass('grey darken-3 white-text');
    });
}

// User want it light... (booo! lol)
else {
    ...

    // Change body classes
    Framework.body.removeClass('grey darken-2 white-text');
    Framework.body.addClass('grey lighten-5 grey-text text-darken-3');

    // Change report source fieldset classes
    $('#report-source').removeClass('grey darken-3');

    // Change generated collapsibles classes
    $('.collapsible').each(function () {
        $(this).removeClass('grey darken-4 white-text');
    });
    $('.collapsible-header').each(function () {
        $(this).removeClass('grey darken-3 white-text');
    });
}
```

Near line `305` in the `selectTheme` function.

## Preview (light theme)

### Home
![image](https://user-images.githubusercontent.com/9881407/87247881-bb7d3d00-c456-11ea-8523-3a8db302811d.png)

### Report loaded
![image](https://user-images.githubusercontent.com/9881407/87247938-00a16f00-c457-11ea-8ae9-a633a0c2752f.png)

### Report opened
![image](https://user-images.githubusercontent.com/9881407/87247982-452d0a80-c457-11ea-9c93-8b2ecda53510.png)

### Report graph
![image](https://user-images.githubusercontent.com/9881407/87248025-76a5d600-c457-11ea-98c7-50dc1081cebe.png)

### Report alerts
![image](https://user-images.githubusercontent.com/9881407/87248058-a3f28400-c457-11ea-8932-48461e569c08.png)

### Report alert details
![image](https://user-images.githubusercontent.com/9881407/87248115-e3b96b80-c457-11ea-9c25-1064b25c2d34.png)

## Preview (dark theme)

### Home
![image](https://user-images.githubusercontent.com/9881407/87248184-575b7880-c458-11ea-9c9d-c8c6fdaa4682.png)

### Report loaded
![image](https://user-images.githubusercontent.com/9881407/87248207-840f9000-c458-11ea-824f-c2ddb196a7d0.png)

### Report opened
![image](https://user-images.githubusercontent.com/9881407/87248220-a9040300-c458-11ea-9263-b988c2e51974.png)

### Report graph
![image](https://user-images.githubusercontent.com/9881407/87248256-ce910c80-c458-11ea-820b-a33e4af710f4.png)

### Report alerts
![image](https://user-images.githubusercontent.com/9881407/87248287-04ce8c00-c459-11ea-9e12-b35e8f78bd57.png)

### Report alert details
![image](https://user-images.githubusercontent.com/9881407/87248328-23cd1e00-c459-11ea-810d-677657a4abf0.png)

> Pictures are subject to changes during the development. I will try to keep them updated.

## Charts

Charts are provided by the open-source project named [eCharts](https://echarts.apache.org).

### Configure charts themes

Charts themes are generated and downloaded from https://echarts.baidu.com/theme-builder/. Once downloaded, modify the following files:

* `index.html`: Add a new `javascript` include line at the end of the file. (_next to the others already existing_)
* `main.js`: Modify the following parts:

```js
themes: [
    // Available 'dark' chart themes:
    // - dark
    // - chalk
    // - purple-passion
    {name: 'dark', category: 'dark'},
    {name: 'chalk', category: 'dark', default: true},
    {name: 'purple-passion', category: 'dark'},

    // Available 'light' chart themes:
    // - light
    // - vintage
    // - westeros
    // - wonderland
    // - macarons
    // - walden
    {name: 'light', category: 'light'},
    {name: 'vintage', category: 'light'},
    {name: 'westeros', category: 'light'},
    {name: 'wonderland', category: 'light'},
    {name: 'macarons', category: 'light'},
    {name: 'walden', category: 'light', default: true},
],
theme: 'walden', // Set default chart them
themeCategory: 'light' // Set default chart them category
```

From the `Report.charts` object near line `319` in `main.js` file.

## Feedback / Discussions

If you want to send any feedback or having any ideas you want to share regarding this project, feel free to check:

* the dedicated group on Google: https://groups.google.com/forum/#!msg/zaproxy-users/d7sQrlvR0Tg/SkflKmq1BAAJ
* or the dedicated thread on Twitter: https://twitter.com/psiinon/status/1141352908266659840

## Contribute

Feel free to open issues / pull requests if you want to contribute to this project.

## Thanks to

The people who helped me to make this project better and better.

* [@Sevendogs5](https://twitter.com/Sevendogs5): Who provided me sample report data and brainstorming.
* [@psiinon](https://twitter.com/psiinon): Who support me for this project.
* [@javanrasokat](https://twitter.com/javanrasokat): For the new upcomming features.

## Contact

* [Twitter](https://twitter.com/Jiab77)
