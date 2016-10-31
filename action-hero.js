Polymer({
	is: 'action-hero',

	properties: {
		/**
		 * The position of the content, separated by a dash. Permitted values are "top", "middle", "bottom" for vertical position, "left", "center" and "right" for the horizontal.
		 */
		contentPosition: {
			type: String,
			value: 'center-center'
		},
		contentStyle: {
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
