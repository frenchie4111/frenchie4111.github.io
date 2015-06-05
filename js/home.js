---
# Frontmatter
---

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

Turbolinks.enableProgressBar();

var ready = function() {
    setupGallery();
    changeColor();
    $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
}

$( document ).ready( ready );
$( document ).on( 'page:load', ready );

$( document ).on( 'page:change',  function() {
  $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
} );
$( document ).on( 'page:restore', function() {
  $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
} );
