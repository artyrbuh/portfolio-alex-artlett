<?php

if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'      => __('Theme General Settings', 'sage'),
        'menu_title'      => __('Theme Settings', 'sage'),
        'menu_slug'       => 'theme-general-settings',
        'capability'      => 'edit_posts',
        'redirect'        => false,
        'show_in_graphql' => true
    ));
}

add_filter( 'acf/settings/save_json', function ( $path ) {
	return WP_CONTENT_DIR . '/acf-fields';
});

add_filter( 'acf/settings/load_json', function ( $path ) {
	$paths[] = WP_CONTENT_DIR . '/acf-fields';
	return $paths;
});
