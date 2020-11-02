/****************************************
 -------------- orangeStrap --------------
 @author: David Jomain
 @fileversion: v0.0.1
 ****************************************/

$(document).ready(function() {


});

/* STICKY */
function stickyHp(){
    $("aside ul").sticky({
        topSpacing:0
    });
}

/* SCROLL */
function scrollToTarget(){
    $('a[href*=#]:not([href=#])').click(function(){
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop:target.offset().top
                },800);
                return false;
            }
        }
    });
}

/* WAYPOINTS */
function waypoints(){
    var waypointsElements = document.getElementsByClassName('waypoint');
    for (var i = 0; i < waypointsElements.length; i++) {
        var waypoint = new Waypoint({
            element:waypointsElements[i],
            handler:function(){
                var eltToActivate = $('.' + this.element.id);
                bulletsActivation(eltToActivate);
            }
        });
    }
}

/* SLIDERS */
var slidersFunction = function(){
    var self = this;

    //sliders initialisation
    self.init = function(){
        $('.slider').each(function(){
            //define current slider
            var slider = $(this);

            //determine type of slider
            var type = $(this).attr('data-slider');

            //define options
            var options = {};

            //defaults settings
            var defaults = {
                autoplay:false
                ,adaptiveHeight:true
                ,draggable:false
                ,speed:800
                ,mobileFirst:true
            };

            //settings for mainSlider (articles pages)
            var others = {
                infinite:false
                ,slidesToScroll:1
                ,appendArrows:'.othersArrows'
                ,prevArrow:'<span class="yellowRoundLeft">Previous</span>'
                ,nextArrow:'<span class="yellowRoundRight">Next</span>'
                ,responsive:[
                    {
                        breakpoint:0
                        ,settings:{
                            slidesToShow:2
                            ,slidesToScroll:1
                        }
                    }
                    ,{
                        breakpoint:481
                        ,settings:{
                            slidesToShow:3
                            ,slidesToScroll:1
                        }
                    }
                    ,{
                        breakpoint:767
                        ,settings:{
                            slidesToShow:4
                            ,slidesToScroll:2
                        }
                    }
                    ,{
                        breakpoint:1024
                        ,settings:{
                            slidesToShow:6
                            ,slidesToScroll:3
                        }
                    }
                ]
            };

            //settings for diapoSliders (diapos pages)
            var diapos = {
                infinite:true
                ,autoplay:true
                ,autoplaySpeed:5000
                ,adaptiveHeight:false
                ,fade:true
                ,slidesToScroll:1
                ,appendArrows:'.mainDiapo'
                ,prevArrow:'<span class="yellowBigLeft">Previous</span>'
                ,nextArrow:'<span class="yellowBigRight">Next</span>'
                ,lazyLoad: 'ondemand'
            };

            //settings for diapoSliders (Webphone only)
            var diaposWebphone = {
                infinite:true
                ,autoplay:true
                ,autoplaySpeed:5000
                ,adaptiveHeight:false
                ,fade:true
                ,slidesToScroll:1
                ,arrows:false
            };

            switch (type) {
                case 'others':
                    options = others;
                    break;
                case 'diapos':
                    options = diapos;
                    break;
                case 'diaposWebphone':
                    options = diaposWebphone;
                    break;
            }

            //merge options
            var merged = $.extend({}, defaults, options);

            //init sliders
            slider.slick(merged);

        });
    };

};

//activate bullets
function bulletsActivation(elt){
    elt.parent().siblings().find('.active').removeClass('active');
    elt.addClass('active');
}





