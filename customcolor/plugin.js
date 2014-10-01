CKEDITOR.plugins.add( 'customcolor', {
    icons: 'customcolor',
    init: function( editor ) {
        editor.addCommand( 'customcolor', new CKEDITOR.dialogCommand( 'customcolorDialog', {
                allowedContent: 'style(customcolor)[type]'
            } )
        );

        editor.ui.addButton( 'CustomColor', {
            label: 'Set a custom color',
            command: 'customcolor',
            toolbar: 'colors'
        });

        CKEDITOR.dialog.add( 'customcolorDialog', this.path + 'dialogs/customcolor.js' );
    }
});

/* Can define the ruleset to be affected */
CKEDITOR.config.customcolor_ruleSet = [
    {
        selector: '.article-detail aside.inlay .sb-hed, .article-detail aside.inlay h3, .article-detail aside.inlay .sb-list-subhead, .article-detail .listicle li h3, .article-detail .listicle li .listicle-item-hed',
        property: 'color'
    },
    {
        selector: '.article-detail aside.inlay',
        property: 'border-color'
    }
];