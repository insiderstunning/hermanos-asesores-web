<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header class="header">
        <nav class="container nav">
            <div class="logo">
                <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="Hermanos Asesores Logo">
                <span><?php bloginfo('name'); ?></span>
            </div>
            <ul class="nav-links">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#testomonios">Testimonios</a></li>
                <li><a href="#sobre-nosotros">Sobre nosotros</a></li>
            </ul>
            <a href="#contacto" class="btn btn-primary">Contáctanos</a>
            <div class="menu-toggle" id="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </header>
