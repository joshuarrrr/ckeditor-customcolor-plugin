CKEDITOR.plugins.add( 'customcolor', {
    icons: 'customcolor',
    init: function( editor ) {
        editor.addCommand( 'customcolor', new CKEDITOR.dialogCommand( 'customcolorDialog' ) );

        editor.ui.addButton( 'CustomColor', {
            label: 'Set a custom color',
            command: 'customcolor',
            toolbar: 'colors'
        });

        CKEDITOR.dialog.add( 'customcolorDialog', this.path + 'dialogs/customcolor.js' );
    }
});

/*
editor.widgets.add( 'customcolor', {

                //initialize primary widget button. Uses icon defined in plugin
                button: 'Set article color',

                //specify which dialog box should pop-up when the widget command is executed
                dialog: 'customcolor',

                template: templates.customcolor,

                allowedContent:
                    'style[type];',

                upcast: function( element ) {
                    //pullquote have the same basic structure and classes as sidebars, so we need to filter them out.
                    return element.name == 'style' && element.hasClass( 'customcolor' );
                },

                //init: initAlignAndWidth(),

                //data: updateAlignAndWidth()

            } );

            */