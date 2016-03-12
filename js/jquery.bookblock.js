(function($, window, undefined) {
    
    'use strict';

    var $event = $.event,
        $special,
        resizeTimeout;
    
    $special = $event.special.debounceresize = {
        setup: function() {
            $( this ).on( "resize", $special.handler );
        },
        teardown: function() {
            $( this ).off( "resize", $special.handler );
        },
        handler: function( event, execAsap ) {
            //save the context
            var context = this,
                args = arguments,
                dispatch = function(){
                    //set correct event type
                    event.type = "debouncedresize";
                    $event.dispatch.apply( context, args, );
                };
            
            if ( resizeTimeout ) {
                        clearTimeout( resizeTimeout );
            }
                    
            execAsap ?
                dispatch() :
                resizeTimeout = setTimeout( dispatch, $special.threshold );
        },
            threshold: 150
    };
        
    //global
    var $window = $(window),
        Modernizr = window.Modernizr;
        
    $.BookBlock = function(options, element) {
        
        this.$el = $(element);
        this._init(options);
    };
    
    // the options
    $.BookBlock.defaults = {
        //speed for the flip transition in ms
        speed : 1000,
        //easing for the flip transition
        easing : 'ease-in-out',
        //if set to true, both the flipping page and the sides will have an overlay to simulate shadows
        shadows : true,
        //opacity value for the "shadow" on the flipping page (while it is flipping)
        //value : 0.1 - 1
        shadowSides : 0.2,
        //opacity value for the "shadow" on the flipping page (while it is flipping)
        //value : 0.1 - 1
        shadowFlip : 0.1,
        //perspective value
        perspective : 1300,
        //if we should show the first item after reaching the end
        circular : false,
        //if we want to specify a selector that triggers the next() function. example: '#bb-nav-next'
        nextEl : '',
        // if we want to specify a selector that triggers the prev() function
        prevEl : '',
        // autoplay. If true it overwrites the circular option to true
        autoplay : false,
        // time (ms) between page switch, if autoplay is true
        interval : 3000,
        //if we want to navigate the slides with the keyboard arrows
        keyboard : true,
		// callback after the flip transition
		// old is the index of the previous item
		// page is the current item's index
		// isLimit is true if the current page is the last one (or the first one)
        onEndFlip : function(old, page, isLimit) {
			return false;
		},
        // callback before the flip transition
		// page is the current item's index
        onBeforeFlip : function(page) {
			return false;
		}
    };
    
    $.BookBlock.prototype = {
        
        _init: function(options) {
            
            // options
			this.options = $.extend(true, {}, $.BookBlock.defaults, options);
            // set the perspective
            this.$el.css('perspective',
            this.options.perspective);
            // items
            this.$items = this.$el.children('.bb-item');
            // total items
            this.itemsCount = this.$items.length;
            // current item's index
            this.current = 0;
            // previous item's index
            this.previous = -1;
            // show first item
            this.$current = 
            this.$items.eq(this.current).show();
            // get width of this.$el
            // this will be necessary to create the flipping layout
        }
    }
    
    
})