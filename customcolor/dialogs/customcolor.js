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
                var colorRule = ' .article-detail aside.inlay .sb-hed, .article-detail aside.inlay h3, .article-detail aside.inlay .sb-list-subhead { ' +
                                'color: ' +
                                newColor +'; ' +
                            '} ' +
                            '.article-detail aside.inlay { ' +
                                'border-color: ' +
                                newColor +'; ' +
                            '} ';

                if ( oldStyleBlock ) {
                    console.log('color already set; resetting now!');
                    oldStyleBlock.setHtml( colorRule );
                }
                else {
                    var newStyleBlock = new CKEDITOR.dom.element( 'style' );
                    var currentFirstNode;
                    var range = editor.createRange();
                    
                    range.moveToPosition( range.root, CKEDITOR.POSITION_BEFORE_START );

                    if ( editor.plugins.divarea ) {
                        currentFirstNode = range.startContainer.getChildren().getItem( 0 ).getChildren().getItem( 0 );
                    }

                    else {
                        /* When using iframe editor, you need to insert in the second (body) node, not the head node of the iframe */
                        currentFirstNode = range.startContainer.getChildren().getItem( 1 ).getChildren().getItem( 0 );
                    }
                    
                    
                    //editor.getSelection().selectRanges( [ range ] );
                    
                    //console.log( CKEDITOR.dom.children() );
                    //console.log(CKEDITOR.dom.node);
                    //console.log(CKEDITOR.dom.nodeList);

                    newStyleBlock.setHtml( colorRule );
                    newStyleBlock.setAttribute( 'type', 'text/css' );
                    newStyleBlock.addClass( 'customcolor' );

                    //editor.insertElement( newStyleBlock );
                    if ( currentFirstNode ) {
                        newStyleBlock.insertBefore( currentFirstNode );
                    }
                    else {
                        editor.insertElement(newStyleBlock);
                    }

                }

            }
            
        }
    };
} );