ckeditor-customcolor-plugin
===========================

This is a tiny plugin for CKEditor that allows the user to specify one custom color, which is applied to pre-determined elements.

The ruleset can be defined in the editor config.js, in the following format:
```
config.customcolor_ruleSet = [
	{
		selector: 'p',
		property: 'color'
	},
	{
		selector: 'h1, h2, h3, h4',
		property: 'background-color'
	}
];
```

If the user then typed "blue" in the dialog box, this element would be added to the top of the content:

```
<style class="customcolor" type="text/css">
	p { color: blue; }
	h1, h2, h3, h4 { background-color: blue; }
</style>
```

Clearing the color from dialog box will remove the entire style block, and changing the color value will update all the styles.

That's really all there is to it :)