<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt" lang="pt_BR">

<head profile="http://gmpg.org/xfn/11">

    <title> Estrutura padrão - sites wordpress </title>

    <link rel="shortcut icon" href="<?php bloginfo('template_url');?>/img/favicon.ico" type="image/x-icon" />
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>" charset="<?php bloginfo('charset'); ?>" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="author" content="" />
</head>

<body>
    <div id="page" class="hfeed site">
        <header>
            <?php wp_nav_menu(array( 'theme_location'=> 'principal', 'fallback_cb' => ' ', 'container_id' => 'menu-principal')); ?>
        </header>
        <!-- .site-header -->

        <div id="content" class="site-content">
        <div id="loading">
                <img src="<?php echo get_template_directory_uri() ?>/images/gears.gif" style="margin: 0 0 0 -28px" />
                <p> Carregando... </p>
            </div>
            <script>
                   var loading = byId("loading");
                    
                    loading.children[2].style.left = (
                        (window.innerWidth - parseInt(window.getComputedStyle(loading.children[2], null).width))/2
                    ) + "px";
            </script>