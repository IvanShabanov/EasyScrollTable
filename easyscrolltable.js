(function ($) {

    $.fn.EasyScrollableTable = function (options) {
        var settings = $.extend({
            'top': 1,
            'left': 0,
            'class': '',
            'width': '100%',
            'height': 'auto',
            'footer': false,
            'hover': true
        }, options);

        return this.each(function () {
            if (this.tagName == 'TABLE') {
                var table = [];
                var row = 0;
                var col = 0;
                var total_row = 0;
                var total_col = 0;
                var result = '';
                var body = '';
                var header = '';
                var right = '';
                var left = '';
                var totalwidth = 0;
                var leftwidth = 0;
                var rightwidth = 0;
                var totalheight = 0;
                var headerheight = 0;
                var bodyheight = 0;
                var $class = '';
                var $id, $body, $header, $sidebar;
                if (settings['class'] != '') {
                    $class = '.' + settings['class'];
                }
                $id = 'id' + (new Date() / 1) + parseInt(Math.random() * 1000);

                $(this).find('tr').each(function () {
                    row++;
                    table[row] = [];
                    col = 0
                    $(this).find('td, th').each(function () {
                        col++;
                        table[row][col] = [];
                        table[row][col]['h'] = $(this).outerHeight();
                        table[row][col]['w'] = $(this).outerWidth();
                        if (typeof $(this).attr('colspan') !== 'undefined') {
                            table[row][col]['colspan'] = parseInt($(this).attr('colspan'));
                        } else {
                            table[row][col]['colspan'] = 1;
                        }
                        if (typeof $(this).attr('rowspan') !== 'undefined') {
                            table[row][col]['rowspan'] = parseInt($(this).attr('rowspan'));
                        } else {
                            table[row][col]['rowspan'] = 1;
                        }
                        table[row][col]['t'] = $(this).html();
                        if ((row == 1) && (settings['left'] >= col)) {
                            leftwidth = leftwidth + table[row][col]['w'];
                        }
                        if ((col == 1) && (settings['top'] >= row)) {
                            headerheight = headerheight + table[row][col]['h'];
                        }

                    });
                    if (total_col < col) {
                        total_col = col;
                    }
                });
                total_row = row;

                header += '<div class="' + settings['class'] + ' EasyScrollableTable_header">';
                body += '<div class="' + settings['class'] + ' EasyScrollableTable_body">';
                if (settings['left'] > 0) {
                    left = '<div class="' + settings['class'] + ' EasyScrollableTable_left"><table>';
                }
                right = '<div class="' + settings['class'] + ' EasyScrollableTable_right"><table>';

                row = 1;

                while (row <= total_row) {
                    temp_row = '';
                    col = 1;
                    while (col <= total_col) {
                        if (typeof table[row][col] !== 'undefined') {
                            temp_col = '<td ';
                            if (table[row][col]['colspan'] > 1) {
                                temp_col = '' + temp_col + ' colspan = "' + table[row][col]['colspan'] + '"';
                            }
                            if (table[row][col]['rowspan'] > 1) {
                                temp_col = '' + temp_col + ' rowspan = "' + table[row][col]['rowspan'] + '"';
                            }

                            temp_col = '' + temp_col + 'width = "' + table[row][col]['w'] + 'px" height = "' + table[row][col]['h'] + 'px"  style="width: ' + table[row][col]['w'] + 'px; max-width: ' + table[row][col]['w'] + 'px; min-width: ' + table[row][col]['w'] + 'px; height: ' + table[row][col]['h'] + 'px; max-height: ' + table[row][col]['h'] + 'px; min-height: ' + table[row][col]['h'] + 'px;">' + table[row][col]['t'] + '</td>';

                            temp_row += temp_col;
                            if (settings['left'] == col) {
                                left += '<tr>' + temp_row + '</tr>';
                                temp_row = '';
                            }
                            col = col + table[row][col]['colspan']
                        } else {
                            col = total_row + 1;
                        }
                    }
                    right += '<tr>' + temp_row + '</tr>';
                    if (settings['top'] == row) {
                        if (settings['left'] > 0) {
                            header += left + '</table></div>';
                            left = '<div class="' + settings['class'] + ' EasyScrollableTable_left"><table>';
                        }
                        header += right + '</table></div>';

                        right = '<div class="' + settings['class'] + ' EasyScrollableTable_right"><table>';
                    }
                    row++;
                }
                header += '</div>';
                if (settings['left'] > 0) {
                    body += left + '</table></div>';
                }

                body += right + '</table></div>';
                body += '</div>';
                if (settings['top'] == 0) {
                    header = '';
                };

                result = '<div id= "' + $id + '" class="' + settings['class'] + ' EasyScrollableTable" style="width: ' + settings['width'] + '; height: ' + settings['height'] + '; position: relative;">';
                result += header;
                result += body;
                if (settings['footer'] == true) {
                    result += header;
                    headerheight = headerheight * 2;
                }
                result += '</div>';
                $(this).after(result);
                $(this).hide();
                if (settings['height'].indexOf('%') !== -1) {
                    totalheight = parseInt($('#' + $id + $class + '.EasyScrollableTable').height()) - 1;
                    bodyheight = totalwidth - headerheight;
                    $('#' + $id + ' ' + $class + '.EasyScrollableTable_body').height(bodyheight);
                } else if (parseInt(settings['height']) > 0) {
                    bodyheight = parseInt(settings['height']) - headerheight;
                    $('#' + $id + ' ' + $class + '.EasyScrollableTable_body').height(bodyheight);
                }
                totalwidth = parseInt($('#' + $id + $class + '.EasyScrollableTable').width()) - 1;
                rightwidth = totalwidth - leftwidth;

                $('#' + $id + ' ' + $class + '.EasyScrollableTable_left').width(leftwidth);
                $('#' + $id + ' ' + $class + '.EasyScrollableTable_right').width(rightwidth);



                $body = '#' + $id + ' ' + $class + '.EasyScrollableTable_body ' + $class + '.EasyScrollableTable_right';
                $sidebar = '#' + $id + ' ' + $class + '.EasyScrollableTable_body ' + $class + '.EasyScrollableTable_left table';
                $header = '#' + $id + ' ' + $class + '.EasyScrollableTable_header ' + $class + '.EasyScrollableTable_right table';

                $($body).scroll(function () {
                    $($sidebar).css('margin-top', -$($body).scrollTop());
                    $($header).css('margin-left', -$($body).scrollLeft());
                });
                if (settings['hover']) {
                    $($body + ' tr td').hover(function () {
                        var row_num = 0;
                        var col_num = 0;
                        var irow, icol;
                        var tr, table, tables, tableheader;

                        tr = $(this).closest('tr');
                        table = $(this).closest('table');
                        col_num = $(tr).find('td').index(this);
                        row_num = $(table).find('tr').index(tr)
                        irow = 0;

                        $(table).find('tr').each(function () {
                            icol = 0;
                            $(this).find('td').each(function () {
                                if (icol == col_num) {
                                    $(this).addClass('hovered_col');
                                }
                                icol++;
                            });
                            if (irow == row_num) {
                                $(this).addClass('hovered_row');
                            }
                            irow++;
                        })
                        $($header).each(function () {
                            $(this).find('tr').each(function () {
                                icol = 0;
                                $(this).find('td').each(function () {
                                    if (icol == col_num) {
                                        $(this).addClass('hovered_col');
                                    }
                                    icol++;
                                })
                            });
                        });
                        irow = 0;
                        $($sidebar).find('tr').each(function () {
                            if (irow == row_num) {
                                $(this).addClass('hovered_row');
                            }
                            irow++;
                        });

                    }, function () {
                        $($body + ' .hovered_row').removeClass('hovered_row');
                        $($body + ' .hovered_col').removeClass('hovered_col');
                        $($sidebar + ' .hovered_row').removeClass('hovered_row');
                        $($header + ' .hovered_col').removeClass('hovered_col');
                    });
                }

                if ((settings['width'].indexOf('%') !== -1) || (settings['height'].indexOf('%') !== -1)) {
                    /* Если высота или ширина задана в процентах */
                    $(window).resize(function () {
                        $($sidebar).css('margin-top', 0);
                        $($header).css('margin-left', 0);

                        totalheight = parseInt($('#' + $id + $class + '.EasyScrollableTable').height()) - 1;
                        totalwidth = parseInt($('#' + $id + $class + '.EasyScrollableTable').width()) - 1;
                        bodyheight = totalwidth - headerheight;
                        rightwidth = totalwidth - leftwidth;

                        $('#' + $id + ' ' + $class + '.EasyScrollableTable_body').height(bodyheight);
                        $('#' + $id + ' ' + $class + '.EasyScrollableTable_right').width(rightwidth);
                    })
                }
            };
        });

    };
})(jQuery);
