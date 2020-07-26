"use strict";

// Minor String prototype patch
// From: https://stackoverflow.com/a/3291856
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Boot stuff when DOM is loaded
$(function (event) {
	// Config
	var Settings = {
		'debug': true,
		'dialogTimeout': 4000,
		'sampleURL': 'https://raw.githubusercontent.com/zaproxy/zaproxy/develop/examples/ZAP_2.4.3_report-unmerged.xml',
		'sampleFile': './sample-resources/ZAP_2.4.3_report-unmerged.xml',
		'sampleString': (function () {
			var sampleString = '';
			sampleString += '<OWASPZAPReport version="2.4.3" generated="Fri, 29 Jan 2016 12:19:00">';
			sampleString += '<site name="http://localhost:8080" host="localhost" port="8080" ssl="false">';
			sampleString += '<alerts>';
			sampleString += '<alertitem>';
			sampleString += '<pluginid>10016</pluginid>';
			sampleString += '<alert>Web Browser XSS Protection Not Enabled</alert>';
			sampleString += '<riskcode>1</riskcode>';
			sampleString += '<confidence>2</confidence>';
			sampleString += '<riskdesc>Low (Medium)</riskdesc>';
			sampleString += '<desc>&lt;p&gt;Web Browser XSS Protection is not enabled, or is disabled by the configuration of the \'X-XSS-Protection\' HTTP response header on the web server&lt;/p&gt;</desc>';
			sampleString += '<uri>http://localhost:8080/bodgeit</uri>';
			sampleString += '<solution>&lt;p&gt;Ensure that the web browser\'s XSS filter is enabled, by setting the X-XSS-Protection HTTP response header to \'1\'.&lt;/p&gt;</solution>';
			sampleString += '<otherinfo>&lt;p&gt;The X-XSS-Protection HTTP response header allows the web server to enable or disable the web browser\'s XSS protection mechanism. The following values would attempt to enable it: &lt;/p&gt;&lt;p&gt;X-XSS-Protection: 1; mode=block&lt;/p&gt;&lt;p&gt;X-XSS-Protection: 1; report=http://www.example.com/xss&lt;/p&gt;&lt;p&gt;The following values would disable it:&lt;/p&gt;&lt;p&gt;X-XSS-Protection: 0&lt;/p&gt;&lt;p&gt;The X-XSS-Protection HTTP response header is currently supported on Internet Explorer, Chrome and Safari (WebKit).&lt;/p&gt;&lt;p&gt;Note that this alert is only raised if the response body could potentially contain an XSS payload (with a text-based content type, with a non-zero length).&lt;/p&gt;</otherinfo>';
			sampleString += '<reference>&lt;p&gt;https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet&lt;/p&gt;&lt;p&gt;https://blog.veracode.com/2014/03/guidelines-for-setting-security-headers/&lt;/p&gt;</reference>';
			sampleString += '<cweid>933</cweid>';
			sampleString += '<wascid>14</wascid>';
			sampleString += '</alertitem>';
			sampleString += '</alerts>';
			sampleString += '</site>';
			sampleString += '</OWASPZAPReport>';
			return sampleString;
		})()
	};

	// Materialize Components
	var Framework = {
		'body': $('body'),
		'header': $('header'),
		'nav': {
			'scrollspy': $('.scrollspy'),
			'side': $(".button-collapse"),
			'top': $('nav')
		},
		'main': $('main'),
		'images': $('.materialboxed'),
		'parallax': $('.parallax'),
		'tooltips': $('.tooltipped'),
		'dropdowns': $('.dropdown-button'),
		'collapsibles': $('.collapsible'),
		'tabs': $('ul.tabs'),
		'forms': $('form'),
		'progressBar': $('.progress'),
		'footer': $('footer'),
		'modals': $('.modal')
	};

	// UI Components
	var Components = {
		'links': {
			'disabled': $('a[href="#!"]'),
			'sampleReport': $('#sample-report'),
			'sampleFile': $('#sample-report-file'),
			'sampleString': $('#sample-report-string'),
			'theme': $('.theme-links')
		},
		'toggle': {
			'space': $('#toggle-container'),
			'theme': $('#theme-selector')
		},
		'container': $('#dyn-container'),
		'report': $('#report-data'),
		'string': $('#report-string-field'),
		'file': $('#report-upload-field'),
		'upload': $('#report-upload-file'),
		'url': $('#report-url-field')
	};

	// Init debug
	if (Settings.debug === true) {
		console.group('App');
		console.info('DOM Loaded.', event);
		console.info('Settings loaded.', Settings);
		console.info('Framework loaded.', Framework);
		console.info('Components loaded.', Components);
	}

	// Side Nav
	Framework.nav.side.sideNav({
		menuWidth: 300, // Default is 300
		edge: 'left', // Choose the horizontal origin
		closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true, // Choose whether you can drag to open on touch screens,
		onOpen: function(el) { // A function to be called when sideNav is opened
			if (Settings.debug === true) {
				console.log('sideNav -- Open', el);
			}
		},
		onClose: function(el) { // A function to be called when sideNav is closed
			if (Settings.debug === true) {
				console.log('sideNav -- Close', el);
			}
		},
	});

	// Material Boxes
	Framework.images.materialbox();

	// Scrollspy
	Framework.nav.scrollspy.scrollSpy();

	// Parallax
	Framework.parallax.parallax();

	// Tooltips
	Framework.tooltips.tooltip({delay: 50});

	// Dropdowns
	Framework.dropdowns.dropdown({
		inDuration: 300,
		outDuration: 225,
		constrainWidth: false, // Does not change width of dropdown to that of the activator
		hover: true, // Activate on hover
		gutter: 0, // Spacing from edge
		belowOrigin: false, // Displays dropdown below the button
		alignment: 'left', // Displays dropdown with edge aligned to the left of button
		stopPropagation: false // Stops event propagation
	});

	// Collapsibles
	Framework.collapsibles.collapsible({
		accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		onOpen: function(el) { // Callback for Collapsible open
			if (Settings.debug === true) {
				console.log('Collapsible -- Open', el);
			}
		},
		onClose: function(el) { // Callback for Collapsible close
			if (Settings.debug === true) {
				console.log('Collapsible -- Close', el);
			}
		}
	});

	// Modals
	Framework.modals.modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '10%', // Ending top style attribute
		ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
			if (Settings.debug === true) {
				console.log('Modal -- Trigger', trigger);
				console.log('Modal -- Open', modal);
			}
		},
		complete: function(modal, trigger) { // Callback for Modal close
			if (Settings.debug === true) {
				console.log('Modal -- Trigger', trigger);
				console.log('Modal -- Close', modal);
			}
		}
	});

	// Tabs
	Framework.tabs.tabs();

	// Disable click on empty links
	Components.links.disabled.on('click', function (event) {
		event.preventDefault();
	});

	// Select theme
	Components.links.theme.on('click', function (event) {
		event.preventDefault();
		if (Settings.debug === true) {
			console.log('Theme selected.', event);
		}

		Report.selectTheme(event.target.dataset.theme);
	});

	// Load sample report
	Components.links.sampleReport.on('click', function (event) {
		event.preventDefault();
		if (Settings.debug === true) {
			console.info('Loading sample report from github... Check XHR network tab for details.', Settings.sampleURL);
		}
		Report.loadSample();
	});

	// Load sample file
	Components.links.sampleFile.on('click', function (event) {
		event.preventDefault();
		if (Settings.debug === true) {
			console.info('Loading sample report file:', Settings.sampleFile);
		}
		Report.loadSampleFile();
	});

	// Load sample string
	Components.links.sampleString.on('click', function (event) {
		event.preventDefault();
		if (Settings.debug === true) {
			console.info('Loading sample report string:', Settings.sampleString);
		}
		Report.loadSampleString();
	});

	// Load uploaded report
	Components.upload.on('change', function (event) {
		if (Settings.debug === true) {
			console.info('Got new file to parse.', event);
		}
		Report.updateFileSize();
	});

	// Toggle space
	Components.toggle.space.on('click', function (event) {
		event.preventDefault();
		Components.container.toggleClass('container');
		if (!Components.container.hasClass('container')) {
			Components.container.css('padding', '5px');
			Components.toggle.space.text('Reduce');
		}
		else {
			Components.container.css('padding', '');
			Components.toggle.space.text('Enlarge');
		}
	});

	// Toggle theme
	Components.toggle.theme.on('change', function (event) {
		event.preventDefault();
		if (Settings.debug === true) {
			console.log('Theme changed.', event);
		}

		// User want it dark!
		if (event.target.checked === true) {
			Report.selectTheme('dark');
		}

		// Well now he want's it light...
		else {
			Report.selectTheme('light');
		}
	});

	// Forms related code
	Framework.forms.on('submit', function (event) {
		event.preventDefault();

		if (Settings.debug === true) {
			console.group('Form');
			console.info('Id:', event.target.id);
		}

		switch (event.target.id) {
			case 'report-url-form':
				Report.url = Report.escapeHtml($('#report-url-field').val());

				Report.resetAlerts();
				Report.show();
				Report.fetch(Report.url, '#report-container');
				break;

			case 'report-upload-form':
				var selectedFile = document.getElementById('report-upload-file').files[0];

				Report.resetAlerts();
				Report.show();
				Report.openFile(selectedFile);
				break;

			case 'report-string-form':
				var xmlString = Components.string.value;

				Report.resetAlerts();
				Report.show();
				Report.parseXml(xmlString, '#report-container');
				break;

			case 'theme-selector-form':
			case 'side-theme-selector-form':
				if (Settings.debug === true) {
					console.info('Changing user theme.');
				}
				break;

			default:
				if (Settings.debug === true) {
					console.error('Unsupported form Id.');
				}
				break;
		}

		console.groupEnd();
	});

	// Loading XML content
	// Using jquery to be quick as it's already needed by Materializecss
	var Report = {
		alerts: {
			'informational': 0,
			'low': 0,
			'medium': 0,
			'high': 0
		},
		charts: {
			alerts: 'chart-alerts',
			risks: 'chart-risks',
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
		},
		url: '',
		createDialog: function (message) {
			if (!message) {
				Materialize.toast('The "message" argument must be defined.', Settings.dialogTimeout, 'rounded');
			}
			else {
				Materialize.toast(message, Settings.dialogTimeout, 'rounded');
			}
		},
		selectTheme: function (theme) {
			if (!theme) { return false; }

			// Save defined report charts for later use
			var charts = [];
			charts.push(Report.charts.alerts, Report.charts.risks);

			// User want it dark!
			if (theme === 'dark') {
				if (Settings.debug === true) {
					console.log('Switch to dark theme.');
				}

				// Change body classes
				Framework.body.removeClass('grey lighten-5 grey-text text-darken-3');
				// Framework.body.addClass('grey darken-1 grey-text text-darken-4');
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
				if (Settings.debug === true) {
					console.log('Switch to light theme.');
				}

				// Change body classes
				// Framework.body.removeClass('grey darken-1 grey-text text-darken-4');
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

			// Change charts theme
			Report.charts.themes.forEach(function (value, index) {
				if (value.category === theme) {
					if (value.default && value.default === true) {
						Report.charts.theme = value.name;
						Report.charts.themeCategory = theme;
					}
				}
			});

			// Reload charts
			Report.initCharts();

			// Do we have some initilized charts?
			if (charts) {
				// No idea... so we have to search for...
				charts.forEach(function (value, index) {
					if (document.getElementById(value) !== null) {
						var chartInstance = echarts.getInstanceByDom(document.getElementById(value));
						if (typeof chartInstance !== 'undefined') {
							// Found some instances...
							if (Settings.debug === true) {
								console.log('Chart instance:', chartInstance);
								console.log('Instance options:', chartInstance.getOption());
							}

							// Applying some styling fixes based on the assigned chart theme
							switch (Report.charts.theme) {
								case 'light':
									/* chartInstance.setOption({
										textStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										}
									}); */
									break;

								case 'dark':
									/* chartInstance.setOption({
										textStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										}
									}); */
									break;

								default:
									// Nothing to do for other themes
									break;
							}
						}
					}
				});
			}

			if (Settings.debug === true) {
				console.log('Chart theme:', Report.charts.theme);
			}

			// Redraw chart theme selector content
			if (window.savedReport) {
				if (Array.isArray(window.savedReport.site)) {
					window.savedReport.site.forEach(function (site, index) {
						var $chartThemeSelector = $('#chart-themes-dropdown-' + index);
						var $chartThemeStatusText = $('#chart-theme-active-' + index);
						var html = '';
						$chartThemeSelector.html('');
						$chartThemeStatusText.html('');
						Report.charts.themes.forEach(function (value, index) {
							if (value.category === theme) {
								html += '<li id="theme-' + index + '"><a class="light-blue-text text-accent-4" onclick="Report.selectChartTheme(\'' + value.name + '\'); return false;">' + value.name + '</a></li>';
							}
						});
						$chartThemeSelector.html(html);
						$chartThemeStatusText.html(String(Report.charts.theme).capitalize());
					});
				}
				else {
					var $chartThemeSelector = $('#chart-themes-dropdown');
					var $chartThemeStatusText = $('#chart-theme-active');
					var html = '';
					$chartThemeSelector.html('');
					$chartThemeStatusText.html('');
					Report.charts.themes.forEach(function (value, index) {
						if (value.category === theme) {
							html += '<li id="theme-' + index + '"><a class="light-blue-text text-accent-4" onclick="Report.selectChartTheme(\'' + value.name + '\'); return false;">' + value.name + '</a></li>';
						}
					});
					$chartThemeSelector.html(html);
					$chartThemeStatusText.html(String(Report.charts.theme).capitalize());
				}
			}
		},
		selectChartTheme: function (theme) {
			if (!theme) { return false; }

			// Save defined report charts for later use
			var charts = [];
			charts.push(Report.charts.alerts, Report.charts.risks);

			// Change charts theme
			Report.charts.themes.forEach(function (value, index) {
				if (value.name === theme) {
					Report.charts.theme = value.name;
					Report.charts.themeCategory = value.category;
				}
			});

			// Show active theme on charts
			if (window.savedReport) {
				if (Array.isArray(window.savedReport.site)) {
					window.savedReport.site.forEach(function (site, index) {
						var $chartThemeStatusText = $('#chart-theme-active-' + index);

						$chartThemeStatusText.html('');
						$chartThemeStatusText.html(String(Report.charts.theme).capitalize());
					});
				}
				else {
					var $chartThemeStatusText = $('#chart-theme-active');

					$chartThemeStatusText.html('');
					$chartThemeStatusText.html(String(Report.charts.theme).capitalize());
				}
			}

			// Reload charts
			Report.initCharts();

			// Do we have some initilized charts?
			if (charts) {
				// No idea... so we have to search for...
				charts.forEach(function (value, index) {
					if (document.getElementById(value) !== null) {
						var chartInstance = echarts.getInstanceByDom(document.getElementById(value));
						if (typeof chartInstance !== 'undefined') {
							// Found some instances...
							if (Settings.debug === true) {
								console.log('Chart instance:', chartInstance);
								console.log('Instance options:', chartInstance.getOption());
							}
						}
					}
				});
			}

			if (Settings.debug === true) {
				console.log('Chart theme:', Report.charts.theme);
			}
		},
		fetch: function (url, container) {
			if (url && url === '') {
				Report.createDialog("The URL argument must be defined!");
			}
			else if (container && container === undefined) {
				Report.createDialog("The HTML container must be defined!");
			}
			else {
				$.ajax({
					type: "GET",
					url: url,
					dataType: "xml"
				}).done(function(response) {
					Report.hidePreloader();

					if (Settings.debug === true) {
						console.info('Got XML Document:', response);
					}

					var x2js = new X2JS();
					var jsonObj = x2js.xml2json(response);

					if (typeof jsonObj === 'object') {
						if (Settings.debug === true) {
							console.info('Got JSON Object:', jsonObj);
							console.info('Building HTML...');
						}
						Report.build(jsonObj, container);
					}
				}).fail(function(jqXHR) {
					Report.hide();

					Report.createDialog("Can't fetch the XML report!");

					if (Settings.debug === true) {
						console.error("Can't fetch the XML report!", jqXHR);
					}
				});
			}
		},
		parseXml: function (data, container) {
			if (data && data === '') {
				Report.createDialog("The data argument must be defined!");
			}
			else if (container && container === undefined) {
				Report.createDialog("The HTML container must be defined!");
			}
			else {
				Report.hidePreloader();
				if (Settings.debug === true) {
					console.info('Got XML data:', data);
				}

				var x2js = new X2JS();
				var jsonObj = x2js.xml_str2json(data);

				if (typeof jsonObj === 'object') {
					if (Settings.debug === true) {
						console.info('Got JSON Object:', jsonObj);
						console.info('Building HTML...');
					}
					Report.build(jsonObj, container);
				}
			}
		},
		// Escape special characters by encoding them into HTML entities
		// https://stackoverflow.com/a/46685127
		escapeHtml: function (str) {
			var div = document.createElement('div');
			div.innerText = str;
			return div.innerHTML;
		},
		show: function () {
			if (Settings.debug === true) {
				console.info('Showing report container...');
			}
			Components.report.show();
			Report.showPreloader();
		},
		hide: function () {
			if (Settings.debug === true) {
				console.info('Hiding report container...');
			}
			Report.hidePreloader();
			Components.report.hide();
		},
		showPreloader: function () {
			if (Settings.debug === true) {
				console.info('Showing preloader...');
			}
			Framework.progressBar.eq(0).show('slow');
		},
		hidePreloader: function () {
			if (Settings.debug === true) {
				console.info('Hidding preloader...');
			}
			Framework.progressBar.eq(0).hide('slow');
		},
		openFile: function (file) {
			var reader = new FileReader();
			reader.onload = function (event) {
				if (Settings.debug === true) {
					console.info('Data loaded.', event);
				}
				Report.parseXml(event.target.result, '#report-container');
			}
			reader.onerror = function (event) {
				Report.hide();

				Report.createDialog("Can't load the XML file.");

				if (Settings.debug === true) {
					console.error("Can't load the XML file.", event);
				}
			}
			if (Settings.debug === true) {
				console.info('Reading given XML file:', file);
			}
			reader.readAsText(file);
		},
		updateFileSize: function () {
			// Taken from Mozilla MDN and modified for this project
			// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Showing_file(s)_size
			var nBytes = 0,
				oFiles = document.getElementById('report-upload-file').files,
				nFiles = oFiles.length;

			for (var nFileId = 0; nFileId < nFiles; nFileId++) {
				nBytes += oFiles[nFileId].size;
			}
			var sOutput = nBytes + " bytes";
			// optional code for multiples approximation
			for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
				sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
			}
			// end of optional code
			document.getElementById("report-upload-details").style.display = 'block';
			document.getElementById("fileNum").innerHTML = nFiles;
			document.getElementById("fileSize").innerHTML = sOutput;
		},
		resetAlerts: function () {
			delete Report.alerts;
			Report.alerts = {
				'informational': 0,
				'low': 0,
				'medium': 0,
				'high': 0
			}
		},
		summarizeAlerts: function (alerts) {
			// Reset internal counters
			Report.resetAlerts();

			// Internal counting function
			function countAlerts(code) {
				switch (code) {
					case '0': Report.alerts.informational++; break;
					case '1': Report.alerts.low++; break;
					case '2': Report.alerts.medium++; break;
					case '3': Report.alerts.high++; break;
				}
			}

			// Compute alerts
			if (alerts) {
				if (Settings.debug === true) {
					console.info('Summarizing alerts...', alerts);
				}
				if (Array.isArray(alerts)) {
					alerts.forEach(function (alert, index) {
						countAlerts(alert.riskcode);
					});
				}
				else {
					countAlerts(alerts.riskcode);
				}
			}
			else {
				return false;
			}
		},
		summarizeRisks: function (risks) {
			if (risks) {
				if (Settings.debug === true) {
					console.info('Summarizing risks...', risks);
				}
				// Took the idea from: https://stackoverflow.com/a/29957627
				// I'm not a genius... Just a good researcher...
				if (Array.isArray(risks)) {
					return risks.reduce(function(sums,entry){
						sums[entry.alert] = (sums[entry.alert] || 0) + 1;
						return sums;
					},{});
				}
				else {
					var sums = {};
					sums[risks.alert] = 1;
					return sums;
				}
			}
			else {
				return false;
			}
		},
		buildChartData: function (alerts, summarizedData) {
			var data = [
				['code', 'count', 'type']
			];
			if (alerts) {
				if (summarizedData) {
					if (Settings.debug === true) {
						console.info('Building chart data...', summarizedData);
					}
					if (Object.keys(summarizedData).length > 1) {
						Object.keys(summarizedData).forEach(function (value, index) {
							var match = false, code;
							for (var i = 0; i < alerts.length; i++) {
								if (alerts[i].alert === value) {
									match = true;
									code = alerts[i].riskcode;
									break;
								}
							}
							if (match === true) {
								data.push([code, summarizedData[value], value]);
							}
						});
					}
					else {
						data.push([Object.values(summarizedData)[0], 1, Object.keys(summarizedData)[0]]);
					}
					return data;
				}
			}
			else {
				return false;
			}
		},
		buildBarChart: function (data, container, date) {
			var chart, option;

			if (container) {
				// delete any existing instance (theme refresh workaround...)
				if (Settings.debug === true) {
					console.log('Building "Bar" chart.', data);
					console.log('Delete existing instance.');
				}
				echarts.dispose(document.getElementById(container));

				// based on prepared DOM, initialize echarts instance
				chart = echarts.init(document.getElementById(container), Report.charts.theme);

				// specify chart configuration item and data
				option = {
					dataset: {
						source: data
					},
					title : {
						text: 'Risks',
						subtext: date,
						x:'center',
						textStyle: {
							color: 'rgba(255, 255, 255, 0.3)'
						}
					},
					tooltip : {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow' // 'line' | 'shadow'
						}
						/* trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)" */
					},
					grid: {containLabel: true},
					xAxis: {name: data[0][1]},
					yAxis: {type: 'category'},
					visualMap: {
						orient: 'horizontal',
						left: 'center',
						min: 0,
						max: 3,
						text: ['High Score', 'Low Score'],
						// Map the score column to color
						dimension: 0,
						/* inRange: {
							color: ['#D7DA8B', '#E15457']
						} */
					},
					series: [
						{
							type: 'bar',
							encode: {
								// Map the "count" column to X axis.
								x: data[0][1],
								// Map the "type" column to Y axis
								y: data[0][2]
							}
						}
					]
				};

				// use configuration item and data specified to show chart
				chart.setOption(option);
			}
			else {
				if (Settings.debug === true) {
					console.info('Found no chart container.');
				}
			}
		},
		buildPieChart: function (data, container, date) {
			var chart, option;

			if (container) {
				// delete any existing instance (theme refresh workaround...)
				if (Settings.debug === true) {
					console.log('Building "Pie" chart.', data);
					console.log('Delete existing instance.');
				}
				echarts.dispose(document.getElementById(container));

				// based on prepared DOM, initialize echarts instance
				chart = echarts.init(document.getElementById(container), Report.charts.theme);

				// specify chart configuration item and data
				option = {
					title: {
						text: 'Alerts',
						subtext: date,
						x:'center',
						textStyle: {
							color: 'rgba(255, 255, 255, 0.3)'
						}
					},
					tooltip: {
						trigger: 'item',
						// formatter: "{a} <br/>{b} : {c} ({d}%)"
						formatter: "{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: ['Informational','Low','Medium','High'],
						textStyle: {
							color: 'rgba(255, 255, 255, 0.3)'
						}
					},
					series: [
						{
							name: 'Type',
							type: 'pie',
							radius : '55%',
							center: ['50%', '60%'],
							data:[
								{value:data.informational, name:'Informational'},
								{value:data.low, name:'Low'},
								{value:data.medium, name:'Medium'},
								{value:data.high, name:'High'}
							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				};

				// use configuration item and data specified to show chart
				chart.setOption(option);
			}
			else {
				if (Settings.debug === true) {
					console.info('Found no chart container.');
				}
			}
		},
		clearCharts: function () {
			if (Settings.debug === true) {
				console.log(
					'Delete existing chart instances.',
					[
						document.getElementById(Report.charts.alerts),
						document.getElementById(Report.charts.risks)
					]
				);
			}
			echarts.dispose(document.getElementById(Report.charts.alerts));
			echarts.dispose(document.getElementById(Report.charts.risks));

			// Delete existing chart data
			delete window.savedReport;
		},
		initCharts: function () {
			if (!window.savedReport) {
				console.warn('No saved report! Unable to initialize charts.');
			}

			var convertedReport = window.savedReport;

			if (typeof convertedReport !== 'undefined') {
				if (Array.isArray(convertedReport.site)) {
					// Create charts for each sites
					console.info('Found sites:', convertedReport.site.length);
					for (let index = 0; index < convertedReport.site.length; index++) {
						const site = convertedReport.site[index];
						console.log('Building chart data for site:', index);
						Report.summarizeAlerts(site.alerts.alertitem);
						Report.buildPieChart(Report.alerts, 'chart-alerts-' + index, convertedReport._generated);
						Report.buildBarChart(
							Report.buildChartData(
								site.alerts.alertitem,
								Report.summarizeRisks(site.alerts.alertitem)
							),
							'chart-risks-' + index,
							convertedReport._generated
						);
					}
				} else {
					console.log('Building chart data for site:', 0);
					Report.summarizeAlerts(convertedReport.site.alerts.alertitem);
					Report.buildPieChart(Report.alerts, 'chart-alerts', convertedReport._generated);
					Report.buildBarChart(
						Report.buildChartData(
							convertedReport.site.alerts.alertitem,
							Report.summarizeRisks(convertedReport.site.alerts.alertitem)
						),
						'chart-risks',
						convertedReport._generated
					);
				}
			}
		},
		build: function (obj, container) {
			var html;

			if (!container) {
				Report.createDialog("Container not defined.");

				if (Settings.debug === true) {
					console.error("Container not defined.");
				}
				return false;
			}
			else {
				container = $(container);
				if (Settings.debug === true) {
					console.info('Got container:', container);
				}
			}

			if (!obj) {
				Report.createDialog("Object not defined.");

				if (Settings.debug === true) {
					console.error("Object not defined.");
				}
				return false;
			}
			else {
				// Save converted report for later use
				var convertedReport = obj.OWASPZAPReport;

				// Save converted report to global context
				window.savedReport = convertedReport;

				// Main Container
				html  = '<ul class="collapsible' + (Report.charts.themeCategory === 'dark' ? ' grey darken-4 white-text' : '') + '" data-collapsible="accordion">';

				if (Array.isArray(convertedReport.site)) {
					// Create report table for each sites
					console.info('Found sites:', convertedReport.site.length);
					for (let index = 0; index < convertedReport.site.length; index++) {
						const site = convertedReport.site[index];
						console.log('Analysing site:', index);
						createReportTable(site, index);
					}
				} else {
					createReportTable(convertedReport.site);
				}

				function createReportTable(site, id) {
					// Collapsible - start
					html += '<li>';
					html += '<div class="collapsible-header' + (Report.charts.themeCategory === 'dark' ? ' grey darken-3 white-text' : '') + '">';
					html += '<i class="material-icons">filter_drama</i>';
					html += 'Generated:&nbsp;' + convertedReport._generated + '&nbsp;&ndash;&nbsp;Version:&nbsp;' + convertedReport._version;
					html += '&nbsp;&ndash;&nbsp;' + site._host;
					html += '</div>';
					html += '<div class="collapsible-body">';

					// Report Table
					html += '<table>';
					html += '<thead>';
					html += '<tr>';
					html += '<th>Host</th>';
					html += '<th>Name</th>';
					html += '<th>Port</th>';
					html += '<th>SSL</th>';
					html += '<th>Alerts</th>';
					html += '</tr>';
					html += '</thead>';
					html += '<tbody>';
					html += '<tr>';
					html += '<td>' + site._host + '</td>';
					html += '<td><a href="' + site._name + '" target="_blank">' + site._name + '</a></td>';
					html += '<td>' + site._port + '</td>';
					html += '<td>' + site._ssl + '</td>';
					html += '<td>' + (Array.isArray(site.alerts.alertitem) ? site.alerts.alertitem.length : 1) + '</td>';
					html += '</tr>';
					html += '</tbody>';
					html += '</table>';

					// Main - Container
					html += '<ul class="collapsible' + (Report.charts.themeCategory === 'dark' ? ' grey darken-4 white-text' : '') + '" data-collapsible="accordion">';

					// Graphs - Container
					html += '<li id="graphs">';
					html += '<div class="collapsible-header' + (Report.charts.themeCategory === 'dark' ? ' grey darken-3 white-text' : '') + '">';
					html += '<i class="material-icons">assessment</i>Alert Graphs';
					html += '<span style="float: right; margin-left: auto;">';
					html += '<i id="collapsible-state' + (typeof id !== 'undefined' ? '-' + id : '') + '" class="material-icons">arrow_drop_down</i>';
					html += '</span>';
					html += '</div>';
					html += '<div class="collapsible-body">';

					// Charts theme selector
					html += '<div class="row">';
					html += '<div class="col s12">';
					html += '<a class="btn light-blue accent-4 white-text dropdown-button chart-themes-dropdown" href="#!" data-activates="chart-themes-dropdown' + (typeof id !== 'undefined' ? '-' + id : '') + '">Change theme</a>';
					html += '<ul id="chart-themes-dropdown' + (typeof id !== 'undefined' ? '-' + id : '') + '" class="dropdown-content">';
					Report.charts.themes.forEach(function (value, index) {
						if (value.category === Report.charts.themeCategory) {
							html += '<li id="theme-' + index + '"><a class="light-blue-text text-accent-4" onclick="Report.selectChartTheme(\'' + value.name + '\'); return false;">' + value.name + '</a></li>';
						}
					});
					html += '</ul>';
					html += '&nbsp;<span>Active theme:</span>';
					html += '&nbsp;<span id="chart-theme-active' + (typeof id !== 'undefined' ? '-' + id : '') + '">' + String(Report.charts.theme).capitalize() + '</span>';
					html += '</div>';
					html += '</div>';

					// Charts container
					html += '<div class="row">';
					html += '<div id="chart-alerts' + (typeof id !== 'undefined' ? '-' + id : '') + '" class="col s12" style="width: 98%; height: 400px;"></div>';
					html += '<div id="chart-risks' + (typeof id !== 'undefined' ? '-' + id : '') + '" class="col s12" style="width: 98%; height: 400px;"></div>';
					html += '</div>';
					html += '</div>';
					html += '</li>';

					// Alerts - Container
					html += '<li>';
					html += '<div class="collapsible-header' + (Report.charts.themeCategory === 'dark' ? ' grey darken-3 white-text' : '') + '">';
					html += '<i class="material-icons">view_module</i>Alert Items';

					// Init internal alerts counters
					Report.summarizeAlerts(site.alerts.alertitem);

					// The writing order is reversed compared to the display order
					html += '<span style="float: right; margin-left: auto;">';
					html += '<span class="new badge deep-orange accent-3" style="margin-left: 5px;" data-badge-caption="High ' + Report.alerts.high + '"></span>';
					html += '<span class="new badge orange darken-1" style="margin-left: 5px;" data-badge-caption="Medium ' + Report.alerts.medium + '"></span>';
					html += '<span class="new badge yellow grey-text text-lighten-1" style="margin-left: 5px;" data-badge-caption="Low ' + Report.alerts.low + '"></span>';
					html += '<span class="new badge light-blue" data-badge-caption="Informational ' + Report.alerts.informational + '"></span>';
					html += '</span>';

					html += '</div>';
					html += '<div class="collapsible-body">';

					// Alerts - Items
					html += '<ul class="collapsible' + (Report.charts.themeCategory === 'dark' ? ' grey darken-4 white-text' : '') + '" data-collapsible="accordion">';

					if (Array.isArray(site.alerts.alertitem)) {
						site.alerts.alertitem.forEach(function (item, index) {
							/* if (Settings.debug === true) {
								console.log(index, item);
							} */

							html += '<li>';
							html += '<div class="collapsible-header' + (Report.charts.themeCategory === 'dark' ? ' grey darken-3 white-text' : '') + '">';
							html += '<i class="material-icons">info</i>';
							html += 'Alert&nbsp;' + (index+1) + '&nbsp;&ndash;&nbsp;' + item.alert;
							if (typeof item.uri !== 'undefined') {
								html += '&nbsp;&ndash;&nbsp;<a href="' + item.uri + '" target="_blank">Open in browser</a>';
							}
							switch (item.riskcode) {
								case '0':
									html += '<span class="new badge light-blue" data-badge-caption="Risk&nbsp;' + item.riskcode + '&nbsp;&ndash;&nbsp;Informational"></span>';
									break;
								case '1':
									html += '<span class="new badge yellow grey-text text-lighten-1" data-badge-caption="Risk&nbsp;' + item.riskcode + '&nbsp;&ndash;&nbsp;Low"></span>';
									break;
								case '2':
									html += '<span class="new badge orange darken-1" data-badge-caption="Risk&nbsp;' + item.riskcode + '&nbsp;&ndash;&nbsp;Medium"></span>';
									break;
								case '3':
									html += '<span class="new badge deep-orange accent-3" data-badge-caption="Risk&nbsp;' + item.riskcode + '&nbsp;&ndash;&nbsp;High"></span>';
									break;
							}
							html += '</div>';
							html += '<div class="collapsible-body">';
							if (typeof item.attack !== 'undefined') {
								html += '<span style="text-decoration: underline;">Attack Type:</span><br>';
								html += '<p><code><pre>' + Report.escapeHtml(item.attack) + '</pre></code></p>';
							}
							if (typeof item.desc !== 'undefined') {
								html += '<span style="text-decoration: underline;">Description:</span><br>';
								html += item.desc;
							}
							if (typeof item.instances !== 'undefined') {
								if (typeof item.instances === 'object') {
									html += '<span style="text-decoration: underline;">Instances:</span><br>';

									// Create table for instances
									html += '<table class="bordered responsive-table">';
									html += '<thead>';
									html += '<tr>';
									html += '<th>Method</th>';
									if ((Array.isArray(item.instances.instance) && typeof item.instances.instance[0].param !== 'undefined') ||
										(typeof item.instances.instance === 'object' && typeof item.instances.instance.param !== 'undefined')) {
											html += '<th>Param</th>';
									}
									if ((Array.isArray(item.instances.instance) && typeof item.instances.instance[0].evidence !== 'undefined') ||
										(typeof item.instances.instance === 'object' && typeof item.instances.instance.evidence !== 'undefined')) {
											html += '<th>Evidence</th>';
									}
									html += '<th>URI</th>';
									html += '</tr>';
									html += '</thead>';
									html += '<tbody>';

									// Several instances found
									if (Array.isArray(item.instances.instance)) {
	
										// Iterate over found instances
										item.instances.instance.forEach(function (instance, index) {
											if (Settings.debug === true) {
												console.log(index, instance);
											}
	
											html += '<tr>';
											html += '<td>' + instance.method + '</td>';

											if (typeof instance.param !== 'undefined') {
												html += '<td>' + instance.param + '</td>';
											}
											if (typeof instance.evidence !== 'undefined') {
												html += '<td>' + Report.escapeHtml(instance.evidence) + '</td>';
											}
											
											html += '<td><a href="' + instance.uri + '" target="_blank">' + instance.uri + '</a></td>';
											html += '</tr>';
										});
									}

									// Only one instance found
									else {
										html += '<tr>';
										html += '<td>' + item.instances.instance.method + '</td>';
										if (typeof item.instances.instance.param !== 'undefined') {
											html += '<td>' + item.instances.instance.param + '</td>';
										}
										if (typeof item.instances.instance.evidence !== 'undefined') {
											html += '<td>' + Report.escapeHtml(item.instances.instance.evidence) + '</td>';
										}
										html += '<td><a href="' + item.instances.instance.uri + '" target="_blank">' + item.instances.instance.uri + '</a></td>';
										html += '</tr>';
									}

									// End of instances table
									html += '</tbody>';
									html += '</table>';
									html += '<br>';
								}
							}
							if (typeof item.otherinfo !== 'undefined') {
								html += '<span style="text-decoration: underline;">Other info:</span><br>';
								html += '<blockquote>';
								html += '<p>' + item.otherinfo + '</p>';
								html += '</blockquote>';
							}
							if (typeof item.param !== 'undefined') {
								html += '<span style="text-decoration: underline;">Parameter:</span><br>';
								html += '<p><code><pre>' + item.param + '</pre></code></p>';
							}
							if (typeof item.solution !== 'undefined') {
								html += '<span style="text-decoration: underline;">Solution:</span><br>';
								html += item.solution;
							}
							if (typeof item.evidence !== 'undefined') {
								html += '<span style="text-decoration: underline;">Evidence(s):</span><br>';
								html += '<p><code><pre>' + Report.escapeHtml(item.evidence) + '</pre></code></p>';
							}
							if (typeof item.reference !== 'undefined') {
								// Took from: https://stackoverflow.com/a/29288898
								// Tested on: https://regex101.com/
								var regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
								var matches = 0;
								var m;

								html += '<span style="text-decoration: underline;">Reference(s):</span><br>';
								while ((m = regex.exec(item.reference)) !== null) {
									// Increment matches counter
									matches++;

									// This is necessary to avoid infinite loops with zero-width matches
									if (m.index === regex.lastIndex) {
										regex.lastIndex++;
									}

									// The result can be accessed through the `m`-variable.
									m.forEach(function (match, groupIndex) {
										/* if (Settings.debug === true) {
											console.log(`Found match, group ${groupIndex}: ${match}`);
										} */
										html += '<p><a href="' + match + '" target="_blank">' + match + '</a></p>';
									});
								}
								if (matches === 0) {
									html += item.reference;
								}
							}
							if (typeof item.pluginid !== 'undefined') {
								html += '<span style="text-decoration: underline;">Plugin:</span>&nbsp;' + item.pluginid + '<br>';
							}
							if (typeof item.cweid !== 'undefined') {
								html += '<span style="text-decoration: underline;">CWE ID:</span>&nbsp;<a href="https://cwe.mitre.org/data/definitions/' + item.cweid + '.html" target="_blank">' + item.cweid + '</a><br>';
							}
							if (typeof item.wascid !== 'undefined') {
								html += '<span style="text-decoration: underline;">WASC ID:</span>&nbsp;<a href="https://cse.google.com/cse?cx=partner-pub-9396229490951644%3A4ygj091ckzs&ie=ISO-8859-1&q=%22WASC-' + item.wascid + '%22&sa=Search&siteurl=www.webappsec.org" target="_blank">' + item.wascid + '</a><br>';
							}
							html += '</div>';
							html += '</li>';
						});
					}
					else {
						// Shortcut variable
						var item = site.alerts.alertitem;

						html += '<li>';
						html += '<div class="collapsible-header' + (Report.charts.themeCategory === 'dark' ? ' grey darken-3 white-text' : '') + '">';
						html += '<i class="material-icons">info</i>';
						html += 'Alert&nbsp;1&nbsp;&ndash;&nbsp;' + item.alert;
						if (typeof item.uri !== 'undefined') {
							html += '&nbsp;&ndash;&nbsp;<a href="' + item.uri + '" target="_blank">Open in browser</a>';
						}
						switch (item.riskcode) {
							case '0':
								html += '<span class="new badge light-blue" data-badge-caption="Risk&nbsp;' + item.riskcode + '&nbsp;&ndash;&nbsp;Informational"></span>';
								break;
							case '1':
								html += '<span class="new badge yellow grey-text text-lighten-1" data-badge-caption="Risk&nbsp;' + item.riskcode + '&nbsp;&ndash;&nbsp;Low"></span>';
								break;
							case '2':
								html += '<span class="new badge orange darken-1" data-badge-caption="Risk&nbsp;' + item.riskcode + '&nbsp;&ndash;&nbsp;Medium"></span>';
								break;
							case '3':
								html += '<span class="new badge deep-orange accent-3" data-badge-caption="Risk&nbsp;' + item.riskcode + '&nbsp;&ndash;&nbsp;High"></span>';
								break;
						}
						html += '</div>';
						html += '<div class="collapsible-body">';
						if (typeof item.attack !== 'undefined') {
							html += '<span style="text-decoration: underline;">Attack Type:</span><br>';
							html += '<p><code><pre>' + Report.escapeHtml(item.attack) + '</pre></code></p>';
						}
						if (typeof item.desc !== 'undefined') {
							html += '<span style="text-decoration: underline;">Description:</span><br>';
							html += item.desc;
						}
						if (typeof item.instances !== 'undefined') {
							if (typeof item.instances === 'object') {
								html += '<span style="text-decoration: underline;">Instances:</span><br>';

								// Create table for instances
								html += '<table class="bordered responsive-table">';
								html += '<thead>';
								html += '<tr>';
								html += '<th>Method</th>';
								if ((Array.isArray(item.instances.instance) && typeof item.instances.instance[0].param !== 'undefined') ||
									(typeof item.instances.instance === 'object' && typeof item.instances.instance.param !== 'undefined')) {
										html += '<th>Param</th>';
								}
								if ((Array.isArray(item.instances.instance) && typeof item.instances.instance[0].evidence !== 'undefined') ||
									(typeof item.instances.instance === 'object' && typeof item.instances.instance.evidence !== 'undefined')) {
										html += '<th>Evidence</th>';
								}
								html += '<th>URI</th>';
								html += '</tr>';
								html += '</thead>';
								html += '<tbody>';

								// Several instances found
								if (Array.isArray(item.instances.instance)) {

									// Iterate over found instances
									item.instances.instance.forEach(function (instance, index) {
										if (Settings.debug === true) {
											console.log(index, instance);
										}

										html += '<tr>';
										html += '<td>' + instance.method + '</td>';

										if (typeof instance.param !== 'undefined') {
											html += '<td>' + instance.param + '</td>';
										}
										if (typeof instance.evidence !== 'undefined') {
											html += '<td>' + Report.escapeHtml(instance.evidence) + '</td>';
										}

										html += '<td><a href="' + instance.uri + '" target="_blank">' + instance.uri + '</a></td>';
										html += '</tr>';
									});
								}

								// Only one instance found
								else {
									html += '<tr>';
									html += '<td>' + item.instances.instance.method + '</td>';

									if (typeof item.instances.instance.param !== 'undefined') {
										html += '<td>' + item.instances.instance.param + '</td>';
									}
									if (typeof item.instances.instance.evidence !== 'undefined') {
										html += '<td>' + Report.escapeHtml(item.instances.instance.evidence) + '</td>';
									}

									html += '<td><a href="' + item.instances.instance.uri + '" target="_blank">' + item.instances.instance.uri + '</a></td>';
									html += '</tr>';
								}

								// End of instances table
								html += '</tbody>';
								html += '</table>';
								html += '<br>';
							}
						}
						if (typeof item.otherinfo !== 'undefined') {
							html += '<span style="text-decoration: underline;">Other info:</span><br>';
							html += '<blockquote>';
							html += '<p>' + item.otherinfo + '</p>';
							html += '</blockquote>';
						}
						if (typeof item.param !== 'undefined') {
							html += '<span style="text-decoration: underline;">Parameter:</span><br>';
							html += '<p><code><pre>' + item.param + '</pre></code></p>';
						}
						if (typeof item.solution !== 'undefined') {
							html += '<span style="text-decoration: underline;">Solution:</span><br>';
							html += item.solution;
						}
						if (typeof item.evidence !== 'undefined') {
							html += '<span style="text-decoration: underline;">Evidence(s):</span><br>';
							html += '<p><code><pre>' + Report.escapeHtml(item.evidence) + '</pre></code></p>';
						}
						if (typeof item.reference !== 'undefined') {
							// Took from: https://stackoverflow.com/a/29288898
							// Tested on: https://regex101.com/
							var regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
							var matches = 0;
							var m;

							html += '<span style="text-decoration: underline;">Reference(s):</span><br>';
							while ((m = regex.exec(item.reference)) !== null) {
								// Increment matches counter
								matches++;

								// This is necessary to avoid infinite loops with zero-width matches
								if (m.index === regex.lastIndex) {
									regex.lastIndex++;
								}

								// The result can be accessed through the `m`-variable.
								m.forEach(function (match, groupIndex) {
									/* if (Settings.debug === true) {
										console.log(`Found match, group ${groupIndex}: ${match}`);
									} */
									html += '<p><a href="' + match + '" target="_blank">' + match + '</a></p>';
								});
							}
							if (matches === 0) {
								html += item.reference;
							}
						}
						if (typeof item.pluginid !== 'undefined') {
							html += '<span style="text-decoration: underline;">Plugin:</span>&nbsp;' + item.pluginid + '<br>';
						}
						if (typeof item.cweid !== 'undefined') {
							html += '<span style="text-decoration: underline;">CWE ID:</span>&nbsp;<a href="https://cwe.mitre.org/data/definitions/' + item.cweid + '.html" target="_blank">' + item.cweid + '</a><br>';
						}
						if (typeof item.wascid !== 'undefined') {
							html += '<span style="text-decoration: underline;">WASC ID:</span>&nbsp;<a href="https://cse.google.com/cse?cx=partner-pub-9396229490951644%3A4ygj091ckzs&ie=ISO-8859-1&q=%22WASC-' + item.wascid + '%22&sa=Search&siteurl=www.webappsec.org" target="_blank">' + item.wascid + '</a><br>';
						}

						html += '</div>';
						html += '</li>';
						html += '</ul>';
					}

					// End - Alerts - Items
					html += '</div>';
					html += '</li>';
					html += '</ul>';

					// End - Alerts - Container
					html += '</div>';
					
					// End - Collapsible
					html += '</li>';
				}

				// End - Main Container
				html += '</ul>';

				// Assign HTML code to container
				container.html(html);

				// Assign methods on newly created collapsibles
				$('.collapsible').collapsible({
					accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
					onOpen: function(el) { // Callback for Collapsible open
						if (Settings.debug === true) {
							console.log('Collapsible -- Open', el);
						}
						if (el[0] && typeof el[0].id !== 'undefined' && el[0].id === 'graphs') {
							$('#collapsible-state').text('arrow_drop_up');
							Report.initCharts(); // Create charts
						}
					},
					onClose: function(el) { // Callback for Collapsible close
						if (Settings.debug === true) {
							console.log('Collapsible -- Close', el);
						}
						if (el[0] && typeof el[0].id !== 'undefined' && el[0].id === 'graphs') {
							$('#collapsible-state').text('arrow_drop_down');
						}
					}
				});

				// Init newly created dropdowns
				$('.chart-themes-dropdown').dropdown({
					inDuration: 300,
					outDuration: 225,
					constrainWidth: true, // Does not change width of dropdown to that of the activator
					hover: false, // Activate on hover
					gutter: 0, // Spacing from edge
					belowOrigin: true, // Displays dropdown below the button
					alignment: 'left', // Displays dropdown with edge aligned to the left of button
					stopPropagation: false // Stops event propagation
				});
			}
		},
		check: function () {
			if (Settings.debug === true) {
				console.info('Browser:', window.location);
			}
			var safeEnv = true;
			if (window.location.protocol === 'file:') {
				safeEnv = false;
			}
			return safeEnv;
		},
		loadSample: function() {
			// Display App state
			if (Settings.debug === true) {
				Report.getStructure();
			}
			Report.show();
			Report.url = Settings.sampleURL;
			Components.url.val(Report.url);
			Report.fetch(Report.url, '#report-container');
		},
		loadSampleFile: function() {
			// Display App state
			if (Settings.debug === true) {
				Report.getStructure();
			}
			if (Report.check() === true) {
				Report.show();
				Report.url = Settings.sampleFile;
				Components.file.val(Report.url);
				Report.fetch(Report.url, '#report-container');
			}
			else {
				Report.createDialog("Sample file can't be loaded from local for security reasons.");
			}
		},
		loadSampleString: function() {
			// Display App state
			if (Settings.debug === true) {
				Report.getStructure();
			}
			Report.show();
			Components.string.val(Settings.sampleString);
			Report.parseXml(Settings.sampleString, '#report-container');
		},
		getStructure: function () {
			console.info('App structure:', Report);
		}
	};

	// Display state of the main oject
	if (Settings.debug === true) {
		Report.getStructure();
	}

	// Exporting Report object to global context for better debugging
	if (Settings.debug === true) {
		console.log('Exporting Report object to global context...');
		window.Report = Report;
	}

	if (Settings.debug === true) {
		console.groupEnd();
	}
});
