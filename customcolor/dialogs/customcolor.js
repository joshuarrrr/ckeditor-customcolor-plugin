CKEDITOR.dialog.add( 'customcolorDialog', function( editor ) {
    return {
        title: 'Set Custom Color',
        minWidth: 200,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'color',
                        type: 'text',
                        label: 'Color (Hex "#ff0000", or RGB "rgb(255,0,0)")',
                        onShow: function() {
                            //console.log( CKEDITOR.config.customcolor );
                            if ( CKEDITOR.config.customcolor ) {
                                this.setValue( CKEDITOR.config.customcolor );
                                //console.log(this.getElement());
                                this.getInputElement().setAttribute( 'style', 'color: ' + CKEDITOR.config.customcolor + ';' );
                            }
                        }
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;
            var oldStyleBlock = editor.document.findOne( 'style.customcolor' );
            var newColor = dialog.getValueOf( 'info', 'color' );

            if ( !newColor ) {
                CKEDITOR.config.customcolor = null;
                if ( oldStyleBlock ) {
                    oldStyleBlock.remove();
                    return;
                }
                else {
                    return;
                }
            }
            else {
                CKEDITOR.config.customcolor = newColor;
                var colorRule = ' .article-detail aside.inlay .sb-hed, .article-detail aside.inlay h3, .article-detail aside.inlay .sb-list-subhead, .article-detail .listicle li h3, .article-detail .listicle li .listicle-item-hed { ' +
                                'color: ' +
                                newColor +'; ' +
                            '} ' +
                            '.article-detail aside.inlay { ' +
                                'border-color: ' +
                                newColor +'; ' +
                            '} ';

                if ( oldStyleBlock ) {
                    //console.log('color already set; resetting now!');
                    oldStyleBlock.setHtml( colorRule );
                }
                else {
                    var newStyleBlock = new CKEDITOR.dom.element( 'style' );
                    var range = editor.createRange();

                    newStyleBlock.setHtml( colorRule );
                    newStyleBlock.setAttribute( 'type', 'text/css' );
                    newStyleBlock.addClass( 'customcolor' );

                    // No need to do range manipulations if there's nothing in the editor
                    if ( range.root.$.children.length > 0) {
                        // the style block will be inserted before any existing elements
                        range.moveToPosition( range.root, CKEDITOR.POSITION_AFTER_START );
                        
                        editor.getSelection().selectRanges( [ range ] );

                        editor.insertElement( newStyleBlock );

                        // after adding the style block, reset cursor to start of editable content
                        range.moveToPosition( range.getNextEditableNode(), CKEDITOR.POSITION_AFTER_START );

                        editor.getSelection().selectRanges( [ range ] );
                    }
                    else {
                        editor.insertElement( newStyleBlock );
                    }
                }

            }
            
        }
    };
} );