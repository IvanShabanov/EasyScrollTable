# EasySrollTable

This is jQuery plugin. 
Makes tables with scrolling content and fixed columns and rows.

Usage:
1) in head add
    
    \<link rel="stylesheet" type="text/css" href="/path/to/easyscrolltable.css"\>
    
    <script src="/path/to/easyscrolltable.js"></script>
    
2) Javascript
 
        $('table.ytable').EasyScrollableTable({
         'top'  : 1,  
         'left' : 0,  
         'class': '',
         'width': '100%',
         'height': 'auto',
         'footer': false,
         'hover': true
        });

Settings:

top - rows to fised from top

left - columns to fixed from left

class - name of your class

width - width of result table (px, %, auto)

height - height of result table (px, %, auto)

footer - if true then top rows add to buttom 

hover - if true then hoveres cell, column adn row will be highlighted

