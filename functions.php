<?php
// REGISTRO DOS MENUS
function register_my_menus() {
    register_nav_menus( 
        array('principal' => __( 'Menu Principal' ))
    );
}

add_action( 'init', 'register_my_menus' );


// REGISTRO DE WIDGETS
function theme_widgets_init() {
 
    // Área 1
 register_sidebar( array (
 'name' => '',
 'id' => '',
 'before_widget' => '',
 'after_widget' => '',
 'before_title' => '',
 'after_title' => '',
  ) );

}
 
add_action( 'init', 'theme_widgets_init' );

//SCRIPTS E STYLES
function theme_styles() {
    wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/css/bootstrap.min.css');
    wp_enqueue_style( 'main', get_template_directory_uri() . '/style.css');
}
//Load the theme JS
function theme_js() {
    wp_enqueue_script( 'bootstrapjs', get_template_directory_uri() . '/js/bootstrap.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'theme_js', get_template_directory_uri() . 'js/script.js', '', true );
}

add_action( 'wp_enqueue_scripts', 'theme_styles' );
add_action( 'wp_enqueue_scripts', 'theme_js' );
?>