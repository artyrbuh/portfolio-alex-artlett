<?php

add_theme_support( 'custom-logo' );
add_theme_support( 'menus' );
add_theme_support('post-thumbnails');


add_filter( 'acf/rest_api/recursive/types', function( $types ) {
	if ( isset( $types['work'] ) ) {
		unset( $types['work'] );
	}

	return $types;
} );



add_action( 'after_setup_theme',  'my_adjust_image_sizes' );
function my_adjust_image_sizes() {
    //add an cropped image-size with 800 x 250 Pixels
    add_image_size( 'two-images-side-by-side--landscape', 993, 663, true );
    add_image_size( 'two-images-side-by-side--portrait', 987, 1316, true );
}