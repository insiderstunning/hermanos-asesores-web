<?php
function hermanos_asesores_scripts() {
    wp_enqueue_style('hermanos-asesores-style', get_stylesheet_uri());
    wp_enqueue_style('hermanos-asesores-custom', get_template_directory_uri() . '/custom-styles.css');
    wp_enqueue_script('hermanos-asesores-script', get_template_directory_uri() . '/script.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'hermanos_asesores_scripts');
?>
