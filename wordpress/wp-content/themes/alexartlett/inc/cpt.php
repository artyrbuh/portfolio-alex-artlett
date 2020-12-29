<?php 

//register fields to send to rest api
$work_cats = ['profession', 'technology'];

foreach($work_cats as $cat) {
    register_rest_field(
        'work',
        $cat,
        array(
            'get_callback' => function( $data ) use ($cat) {
                $category_terms = wp_get_post_terms(
                    $data['id'],
                    $cat
                );
                $categories = array();
                foreach( $category_terms as $term ) {
                    $category_obj       = new StdClass();
                    $category_obj->ID   = $term->ID;
                    $category_obj->name = $term->name;
                    array_push(
                        $categories,
                        $category_obj
                    );
                }
                return $categories;
            },
        )
    );
}
