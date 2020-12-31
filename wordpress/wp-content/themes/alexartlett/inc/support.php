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
