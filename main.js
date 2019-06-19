"use strict";

// Boot stuff when DOM is loaded
$(function (event) {
	console.group('App');
    console.info('DOM Loaded.', event);
    
    $(".button-collapse").sideNav();
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.parallax').parallax();
    $('.tooltipped').tooltip({delay: 50});
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });
    $('.collapsible').collapsible({
        accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        onOpen: function(el) { console.log('Collapsible -- Open', el); }, // Callback for Collapsible open
        onClose: function(el) { console.log('Collapsible -- Closed', el); } // Callback for Collapsible close
    });

    // Disable click on empty links
    $('a[href="#!"]').on('click', function (event) {
        event.preventDefault();
    });

    // Toggle container
    $('#toggle-container').on('click', function (event) {
        event.preventDefault();
        $('#dyn-container').toggleClass('container');
    });

    // Display progress bar
    $('.progress').eq(0).show('slow');

    // Loading XML content
    // Using jquery to be quick as it's already needed by Materializecss
    var Report = {
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
            $('.progress').eq(0).hide('slow');
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
                console.error('Container not defined.');
                return false;
            }
            else {
                var report = obj.OWASPZAPReport;

                // Main Container
                html  = '<ul class="collapsible" data-collapsible="accordion">';
                html += '<li>';
                html += '<div class="collapsible-header">';
                html += '<i class="material-icons">filter_drama</i>';
                html += 'Generated:&nbsp;' + report._generated + '&nbsp;&ndash;&nbsp;Version:&nbsp;' + report._version;
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
                html += '<td>' + report.site._host + '</td>';
                html += '<td>' + report.site._name + '</td>';
                html += '<td>' + report.site._port + '</td>';
                html += '<td>' + report.site._ssl + '</td>';
                html += '<td>' + report.site.alerts.alertitem.length + '</td>';
                html += '</tr>';
                html += '</tbody>';
                html += '</table>';

                // Alerts - Container
                html += '<ul class="collapsible" data-collapsible="accordion">';
                html += '<li>';
                html += '<div class="collapsible-header">';
                html += '<i class="material-icons">view_module</i>Alert Items';
                html += '</div>';
                html += '<div class="collapsible-body">';

                // Alerts - Items
                html += '<ul class="collapsible" data-collapsible="accordion">';

                report.site.alerts.alertitem.forEach(function (value, index) {
                    console.log(index, value);

                    html += '<li>';
                    html += '<div class="collapsible-header">';
                    html += '<i class="material-icons">info</i>';
                    html += 'Alert&nbsp;' + index + '&nbsp;&ndash;&nbsp;' + value.alert + '&nbsp;&ndash;&nbsp;';
                    html += 'Risk&nbsp;' + value.riskcode + '&nbsp;&ndash;&nbsp;' + value.riskdesc + '&nbsp;&ndash;&nbsp;';
                    html += '<a href="' + value.uri + '" target="_blank">Open in browser</a>';
                    if (typeof value.cweid !== 'undefined') {
                        html += '<span class="new badge" data-badge-caption="' + value.cweid + '"></span>';
                    }
                    if (typeof value.wascid !== 'undefined') {
                        html += '<span class="new badge" data-badge-caption="' + value.wascid + '"' + (typeof value.cweid !== 'undefined' ? ' style="margin-left: 1em;' : '') + '"></span>';
                    }
                    html += '</div>';
                    html += '<div class="collapsible-body">';
                    if (typeof value.attack !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Attack Type:</span><br>';
                        html += '<p>' + Report.escapeHtml(value.attack) + '</p>';
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
                    if (typeof value.solution !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Solution:</span><br>';
                        html += value.solution;
                    }
                    if (typeof value.evidence !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Evidence(s):</span><br>';
                        html += '<p>' + Report.escapeHtml(value.evidence) + '</p>';
                    }
                    if (typeof value.reference !== 'undefined') {
                        var search = ['<p>', '</p>'];
                        var link = value.reference.replace(search, '');
                        var replace = ['<p><a href="' + link + '" target="_blank">' + link, '</a></p>'];
                        html += '<span style="text-decoration: underline;">Reference(s):</span><br>';
                        html += value.reference.replace(search, replace);
                    }
                    if (typeof value.pluginid !== 'undefined') {
                        html += '<span style="text-decoration: underline;">Plugin:</span>&nbsp;' + value.pluginid + '<br>';
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

                container.html(html);
                $('.collapsible').collapsible({
                    accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    onOpen: function(el) { console.log('Collapsible -- Open', el); }, // Callback for Collapsible open
                    onClose: function(el) { console.log('Collapsible -- Closed', el); } // Callback for Collapsible close
                });
            }
        }
    };

    // Fetch data
    Report.fetch(Report.url, '#report-container');

	console.groupEnd();
});