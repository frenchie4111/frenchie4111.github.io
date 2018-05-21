---
# Frontmatter
---

hljs.configure( { tabReplace: '    ' } );

function runHighlight() {
    $( 'pre code' ).each( function( i, e ) { hljs.highlightBlock( e ) } );
}

function setupGallery() {
    $(".galleryimage").click(function( e ) {
        $(".overlay").show();
        $("#overlay_image").attr("src", $(e.target).attr("src") );
    })

    $(".overlay").click(function() {
        $(".overlay").hide();
    })
}

function changeColor() {
    // $("body").addClass("color1");
}

function setupExpand() {
    $( ".expand_facet" )
        .each( function () {
            $( this )
                .click( function() {
                    let id = '#' + $( this ).attr( 'id' ).replace( 'expand_', '' );
                    $( id ).toggleClass( 'expand' );
                } );
        } )
}

Turbolinks.enableProgressBar();

var ready = function() {
    setupGallery();
    changeColor();
}

$( document ).ready( ready );
$( document ).on( 'page:load', ready );

$( document ).on( 'page:change',  function() {
    setupExpand();
    runHighlight();
} );
$( document ).on( 'page:restore', function() {
    setupExpand();
    runHighlight();
} );
