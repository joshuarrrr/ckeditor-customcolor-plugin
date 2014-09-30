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