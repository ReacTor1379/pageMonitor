$(document).ready(function(){
    //themes, change CSS with JS
    //default theme(CSS) is classic, change it if needed
    var current_theme = 'classic';//$.cookie('current_theme')==null ? 'classic' :$.cookie('current_theme');
    switch_theme(current_theme);
    
    $('#themes a[data-value="'+current_theme+'"]').find('i').addClass('icon-ok');
                 
    $('#themes a').click(function(e){
        e.preventDefault();
        current_theme=$(this).attr('data-value');
        $.cookie('current_theme',current_theme,{expires:365});
        switch_theme(current_theme);
        $('#themes i').removeClass('icon-ok');
        $(this).find('i').addClass('icon-ok');
    });
    
    
    function switch_theme(theme_name)
    {
        $('#bs-css').attr('href','./css/bootstrap-'+theme_name+'.css');
    }
    
    //disbaling some functions for Internet Explorer
    if($.browser.msie)
    {
        $('#is-ajax').prop('checked',false);
        $('#for-is-ajax').hide();
        $('#toggle-fullscreen').hide();
        $('.login-box').find('.input-large').removeClass('span10');
        
    }
    
    
    //highlight current / active link
    $('ul.main-menu li a').each(function(){
        if($($(this))[0].href==String(window.location))
            $(this).parent().addClass('active');
    });
    
    //ajaxify menus
    $('a.ajax-link').click(function(e){
        if($.browser.msie) e.which=1;
        if(e.which!=1 || !$('#is-ajax').prop('checked') || $(this).parent().hasClass('active')) return;
        e.preventDefault();
        if($('.btn-navbar').is(':visible'))
        {
            $('.btn-navbar').click();
        }
        $('#loading').remove();
        $('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
        var $clink=$(this);
        History.pushState(null, null, $clink.attr('href'));
        $('ul.main-menu li.active').removeClass('active');
        $clink.parent('li').addClass('active');    
    });
    
    //animating menus on hover
    $('ul.main-menu li:not(.nav-header)').hover(function(){
        $(this).animate({'margin-left':'+=5'},300);
    },
    function(){
        $(this).animate({'margin-left':'-=5'},300);
    });
});
