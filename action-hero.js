Polymer({
	is: 'action-hero',

	properties: {
		/**
		 * The position of the content, separated by a dash. Available values are "top-left", "top-center", "top-right", "center-left", "center-center", "center-right", "bottom-left", "bottom-center" and "bottom-right".
		 */
		contentPosition: {
			type: String,
			value: 'center-center'
		},
		/**
		 * The CSS Layout for the hero content. Defaults to Flexbox, and can be set to "grid" for CSS Grid Layout.
		 */
		contentLayout: {
			type: String,
			value: 'flex'
		}
	},

	ready: function ready() {},

	/**
	* Life cycle function that gets called when the element is
	* first attached to the DOM
	*/
	attached: function attached() {},

});
