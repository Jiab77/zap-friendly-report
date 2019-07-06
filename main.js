"use strict";

// Boot stuff when DOM is loaded
$(function (event) {
	console.group('App');
    console.info('DOM Loaded.', event);
    
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
        'links': {
            'disabled': $('a[href="#!"]')
        },
        'progressBar': $('.progress'),
        'forms': $('form'),
        'toggle': {
			'space': $('#toggle-container'),
			'theme': $('#theme-selector')
        },
        'container': $('#dyn-container'),
		'footer': $('footer'),
		'modals': $('.modal')
    };

    console.info('Framework loaded.', Framework);

	// Assign methods to components
    Framework.nav.side.sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) { console.log('sideNav -- Open', el); }, // A function to be called when sideNav is opened
        onClose: function(el) { console.log('sideNav -- Close', el); }, // A function to be called when sideNav is closed
    });
    Framework.images.materialbox();
    Framework.nav.scrollspy.scrollSpy();
    Framework.parallax.parallax();
    Framework.tooltips.tooltip({delay: 50});
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
    Framework.collapsibles.collapsible({
        accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        onOpen: function(el) { console.log('Collapsible -- Open', el); }, // Callback for Collapsible open
        onClose: function(el) { console.log('Collapsible -- Close', el); } // Callback for Collapsible close
	});
	Framework.modals.modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '10%', // Ending top style attribute
		ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
			console.log('Modal -- Trigger', trigger);
			console.log('Modal -- Open', modal);
		},
		complete: function(modal, trigger) { // Callback for Modal close
			console.log('Modal -- Trigger', trigger);
			console.log('Modal -- Close', modal);
		}
	});
    Framework.tabs.tabs();

    // Disable click on empty links
    Framework.links.disabled.on('click', function (event) {
        event.preventDefault();
    });

    // Toggle container
    Framework.toggle.space.on('click', function (event) {
        event.preventDefault();
        Framework.container.toggleClass('container');
        if (!Framework.container.hasClass('container')) {
            Framework.container.css('padding', '5px');
            Framework.toggle.space.text('Reduce');
        }
        else {
            Framework.container.css('padding', '');
            Framework.toggle.space.text('Enlarge');
        }
	});
	
    // Toggle theme
    Framework.toggle.theme.on('change', function (event) {
        event.preventDefault();
		console.log('Theme changed.', event);

		// Save defined report charts for later use
		if (Report) {
			var charts = [];
			charts.push(Report.charts.alerts, Report.charts.risks);
		}

		// User want it dark!
		if (event.target.checked === true) {
			console.log('Switch to dark theme.');

			// Change body classes
			Framework.body.removeClass('grey lighten-5 grey-text text-darken-3');
			Framework.body.addClass('grey darken-1 grey-text text-darken-4');

			// Available 'dark' chart themes:
			// - dark
			// - chalk
			// - purple-passion

			// Change charts theme
			Report.charts.theme = 'chalk';

			// Do we have some saved data?
			if (Report.saved) {
				Report.initCharts(Report.saved);
			}
		}

		// Well now he want's it light...
		else {
			console.log('Switch to light theme.');

			// Change body classes
			Framework.body.removeClass('grey darken-1 grey-text text-darken-4');
			Framework.body.addClass('grey lighten-5 grey-text text-darken-3');

			// Available 'light' chart themes:
			// - light
			// - vintage
			// - westeros
			// - wonderland
			// - macarons
			// - walden

			// Change charts theme
			Report.charts.theme = 'walden';

			// Do we have some saved data?
			if (Report.saved) {
				Report.initCharts(Report.saved);
			}
		}

		// Do we have some initilized charts?
		if (charts) {
			// No idea... so we have to search for...
			charts.forEach(function (value, index) {
				var chartInstance = echarts.getInstanceByDom(document.getElementById(value));
				if (typeof chartInstance !== 'undefined') {
					// Found some instances...
					console.log('Chart instance:', chartInstance);
					console.log('Instance options:', chartInstance.getOption());

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
							// Nothing to do
							break;
					}
				}
			});
		}

		// Always good to check existence before use...
		if (Report) {
			console.log('Chart theme.', Report.charts.theme);
		}
    });

    // Display progress bar
    Framework.progressBar.eq(0).show('slow');

    // Forms related code
    Framework.forms.on('submit', function (event) {
        event.preventDefault();

        console.group('Form');
        console.info('Id:', event.target.id);

        switch (event.target.id) {
            case 'report-url-form':
                console.info('Will change "Report.url" value.');
                break;

            case 'report-upload-form':
                console.info('Will parse given file.');
                break;

            case 'report-string-form':
                console.info('Will parse given string.');
				break;
				
            case 'theme-selector-form':
                console.info('Nothing to do.');
                break;
        
            default:
                console.error('Unsupported form Id.');
                break;
        }

        console.groupEnd();
    });

    // Loading XML content
    // Using jquery to be quick as it's already needed by Materializecss
    var Report = {
		alerts: {
			'low': 0,
			'medium': 0,
			'high': 0
		},
        charts: {
            alerts: 'chart-alerts',
			risks: 'chart-risks',

			// Available 'dark' chart themes:
			// - dark
			// - chalk
			// - purple-passion

			// Available 'light' chart themes:
			// - light
			// - vintage
			// - westeros
			// - wonderland
			// - macarons
			// - walden

			theme: 'walden'
        },
        url: "https://raw.githubusercontent.com/zaproxy/zaproxy/develop/examples/ZAP_2.4.3_report-unmerged.xml",
        fetch: function (url, container) {
            $.ajax({
                type: "GET",
                url: url,
                dataType: "xml"
            }).done(function(response) {
                Report.hidePreloader();
                console.info('Got XML Document:', response);

                var x2js = new X2JS();
                var jsonObj = x2js.xml2json(response);

                if (typeof jsonObj === 'object') {
                    console.info('Got JSON Object:', jsonObj);
                    console.info('Building HTML...');
                    Report.build(jsonObj, container);
                }
            }).fail(function(jqXHR) {
                Report.hidePreloader();
                console.error(jqXHR);
            });
        },
        // Escape special characters by encoding them into HTML entities
        // https://stackoverflow.com/a/46685127
        escapeHtml: function(str) {
            var div = document.createElement('div');
            div.innerText = str;
            return div.innerHTML;
        },
        hidePreloader: function () {
            console.info('Hidding preloader...');
            Framework.progressBar.eq(0).hide('slow');
        },
        summarizeAlerts: function (alerts) {
            if (alerts) {
				console.info('Summarize alerts...');
				alerts.forEach(function (value, index) {
                    switch (value.riskcode) {
                        case '1': Report.alerts.low++; break;
                        case '2': Report.alerts.medium++; break;
                        case '3': Report.alerts.high++; break;
                    }
                });
            }
            else {
                return false;
            }
        },
        summarizeRisks: function (risks) {
            if (risks) {
				console.info('Summarize risks...');
				// Took the idea from: https://stackoverflow.com/a/29957627
				// I'm not a genius... Just a good researcher...
                return risks.reduce(function(sums,entry){
                    sums[entry.alert] = (sums[entry.alert] || 0) + 1;
                    return sums;
				},{});
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
					console.info('Building chart data...');
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
				console.log('Delete existing instance.');
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
						min: 1,
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
                console.info('Found no chart container.');
            }
        },
        buildPieChart: function (data, container, date) {
			var chart, option;
			
            if (container) {
				// delete any existing instance (theme refresh workaround...)
				console.log('Delete existing instance.');
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
						data: ['Low','Medium','High'],
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
                console.info('Found no chart container.');
            }
		},
		initCharts: function (report) {
			// Save given report for later use
			if (!Report.saved) {
				Report.saved = report;
			}

			// Create charts
			Report.buildPieChart(
				Report.alerts,
				'chart-alerts',
				report._generated
			);
			Report.buildBarChart(
				Report.buildChartData(
					report.site.alerts.alertitem,
					Report.summarizeRisks(report.site.alerts.alertitem)
				),
				'chart-risks',
				report._generated
			);
		},
        build: function (obj, container) {
            var html;

            if (!container) {
                console.error('Container not defined.');
                return false;
            }
            else {
                container = $(container);
                console.info('Got container:', container);
            }

            if (!obj) {
                console.error('Object not defined.');
                return false;
            }
            else {
				// Save converted report for later use
                var convertedReport = obj.OWASPZAPReport;

                // Main Container
                html  = '<ul class="collapsible" data-collapsible="accordion">';
                html += '<li>';
                html += '<div class="collapsible-header">';
                html += '<i class="material-icons">filter_drama</i>';
                html += 'Generated:&nbsp;' + convertedReport._generated + '&nbsp;&ndash;&nbsp;Version:&nbsp;' + convertedReport._version;
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
                html += '<td>' + convertedReport.site._host + '</td>';
                html += '<td><a href="' + convertedReport.site._name + '" target="_blank">' + convertedReport.site._name + '</a></td>';
                html += '<td>' + convertedReport.site._port + '</td>';
                html += '<td>' + convertedReport.site._ssl + '</td>';
                html += '<td>' + convertedReport.site.alerts.alertitem.length + '</td>';
                html += '</tr>';
                html += '</tbody>';
                html += '</table>';

                // Main - Container
                html += '<ul class="collapsible" data-collapsible="accordion">';

                // Graphs - Container
                html += '<li id="graphs">';
                html += '<div class="collapsible-header">';
                html += '<i class="material-icons">assessment</i>Alert Graphs';
                html += '<span style="float: right; margin-left: auto;">';
                html += '<i id="collapsible-state" class="material-icons">arrow_drop_down</i>';
                html += '</span>';
                html += '</div>';
                html += '<div class="collapsible-body">';
                html += '<div class="row">';
                html += '<div id="chart-alerts" class="col s12" style="width: 98%; height: 400px;"></div>';
                html += '<div id="chart-risks" class="col s12" style="width: 98%; height: 400px;"></div>';
                html += '</div>';
                html += '</div>';
				html += '</li>';

                // Alerts - Container
                html += '<li>';
                html += '<div class="collapsible-header">';
				html += '<i class="material-icons">view_module</i>Alert Items';
				
				// Init internal alerts counters
				Report.summarizeAlerts(convertedReport.site.alerts.alertitem);

                html += '<span style="float: right; margin-left: auto;">';
                html += '<span class="new badge deep-orange accent-3" style="margin-left: 5px;" data-badge-caption="High ' + Report.alerts.high + '"></span>';
                html += '<span class="new badge amber lighten-1" style="margin-left: 5px;" data-badge-caption="Medium ' + Report.alerts.medium + '"></span>';
                html += '<span class="new badge light-blue" data-badge-caption="Low ' + Report.alerts.low + '"></span>';
                html += '</span>';

                html += '</div>';
                html += '<div class="collapsible-body">';

                // Alerts - Items
                html += '<ul class="collapsible" data-collapsible="accordion">';

                convertedReport.site.alerts.alertitem.forEach(function (value, index) {
                    console.log(index, value);

                    html += '<li>';
                    html += '<div class="collapsible-header">';
                    html += '<i class="material-icons">info</i>';
                    html += 'Alert&nbsp;' + (index+1) + '&nbsp;&ndash;&nbsp;' + value.alert + '&nbsp;&ndash;&nbsp;';
                    // html += 'Risk&nbsp;' + value.riskcode + '&nbsp;&ndash;&nbsp;' + value.riskdesc + '&nbsp;&ndash;&nbsp;';
                    html += '<a href="' + value.uri + '" target="_blank">Open in browser</a>';
                    switch (value.riskcode) {
                        case '1':
                            // html += '<span class="new badge light-blue" data-badge-caption="Risk&nbsp;' + value.riskcode + '&nbsp;&ndash;&nbsp;' + value.riskdesc + '"></span>';
                            html += '<span class="new badge light-blue" data-badge-caption="Risk&nbsp;' + value.riskcode + '&nbsp;&ndash;&nbsp;Low"></span>';
                            break;
                        case '2':
                            // html += '<span class="new badge amber lighten-1" data-badge-caption="Risk&nbsp;' + value.riskcode + '&nbsp;&ndash;&nbsp;' + value.riskdesc + '"></span>';
                            html += '<span class="new badge amber lighten-1" data-badge-caption="Risk&nbsp;' + value.riskcode + '&nbsp;&ndash;&nbsp;Medium"></span>';
                            break;
                        case '3':
                            // html += '<span class="new badge deep-orange accent-3" data-badge-caption="Risk&nbsp;' + value.riskcode + '&nbsp;&ndash;&nbsp;' + value.riskdesc + '"></span>';
                            html += '<span class="new badge deep-orange accent-3" data-badge-caption="Risk&nbsp;' + value.riskcode + '&nbsp;&ndash;&nbsp;High"></span>';
                            break;
                    }
                    html += '</div>';
                    html += '<div class="collapsible-body">';
                    if (typeof value.attack !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Attack Type:</span><br>';
                        html += '<p><code><pre>' + Report.escapeHtml(value.attack) + '</pre></code></p>';
                    }
                    if (typeof value.desc !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Description:</span><br>';
                        html += value.desc;
                    }
                    if (typeof value.otherinfo !== 'undefined') {
                        html += '<blockquote>';
                        html += '<p>' + value.otherinfo + '</p>';
                        html += '</blockquote>';
                    }
                    if (typeof value.param !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Parameter:</span><br>';
                        html += '<p><code><pre>' + value.param + '</pre></code></p>';
                    }
                    if (typeof value.solution !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Solution:</span><br>';
                        html += value.solution;
                    }
                    if (typeof value.evidence !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Evidence(s):</span><br>';
                        html += '<p><code><pre>' + Report.escapeHtml(value.evidence) + '</pre></code></p>';
                    }
                    if (typeof value.reference !== 'undefined') {
                        // Took from: https://stackoverflow.com/a/29288898
                        // Tested on: https://regex101.com/
                        var regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
                        var matches = 0;
                        var m;

                        html += '<span style="text-decoration: underline;">Reference(s):</span><br>';
                        while ((m = regex.exec(value.reference)) !== null) {
                            // Increment matches counter
                            matches++;

                            // This is necessary to avoid infinite loops with zero-width matches
                            if (m.index === regex.lastIndex) {
                                regex.lastIndex++;
                            }
                            
                            // The result can be accessed through the `m`-variable.
                            m.forEach(function (match, groupIndex) {
                                console.log(`Found match, group ${groupIndex}: ${match}`);
                                html += '<p><a href="' + match + '" target="_blank">' + match + '</a></p>';
                            });
                        }
                        if (matches === 0) {
                            html += value.reference;
                        }
                    }
                    if (typeof value.pluginid !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Plugin:</span>&nbsp;' + value.pluginid + '<br>';
                    }
                    if (typeof value.cweid !== 'undefined') {
                        html += '<span style="text-decoration: underline;">CWE ID:</span>&nbsp;' + value.cweid + '<br>';
                    }
                    if (typeof value.wascid !== 'undefined') {
                        html += '<span style="text-decoration: underline;">WASC ID:</span>&nbsp;' + value.wascid + '<br>';
                    }
                    html += '</div>';
                    html += '</li>';
                });
                
                html += '</ul>';

                // End - Alerts - Items
                html += '</div>';
                html += '</li>';
                html += '</ul>';

                // End - Alerts - Container
                html += '</div>';
                html += '</li>';

                // End - Main Container
                html += '</ul>';

                // Assign HTML code to container
                container.html(html);

                // Assign method on newly created collapsibles
                $('.collapsible').collapsible({
                    accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    onOpen: function(el) { // Callback for Collapsible open
                        console.log('Collapsible -- Open', el);
                        if (el[0] && typeof el[0].id !== 'undefined' && el[0].id === 'graphs') {
							$('#collapsible-state').text('arrow_drop_up');
							// Create charts
							Report.initCharts(convertedReport);
                        }
                    },
                    onClose: function(el) { // Callback for Collapsible close
                        console.log('Collapsible -- Close', el);
                        if (el[0] && typeof el[0].id !== 'undefined' && el[0].id === 'graphs') {
							$('#collapsible-state').text('arrow_drop_down');
                        }
                    }
				});

                // Count similar alerts
                // console.log('Alerts:', Report.summarizeRisks(convertedReport.site.alerts.alertitem));
                // console.log('Chart data:', Report.buildChartData(convertedReport.site.alerts.alertitem, Report.summarizeRisks(convertedReport.site.alerts.alertitem)));
            }
        }
    };

    // Fetch data
    Report.fetch(Report.url, '#report-container');

	console.groupEnd();
});