# EasyScrollTable

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

top - rows to fixed from top

left - columns to fixed from left

class - name of your class

width - width of result table (px, %, vw, auto)

height - height of result table (px, %, vh, auto)

footer - if true then top rows add to buttom 

hover - if true then hoveres cell, column and row will be highlighted

