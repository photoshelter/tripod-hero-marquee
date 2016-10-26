Polymer({
	is: 'action-hero',

	properties: {
		/**
		 * The position of the content, separated by a space. Permitted values are "top", "middle", "bottom" for vertical position, "left", "center" and "right" for the horizontal.
		 */
		contentPosition: {
			type: String,
			value: 'center middle'
		},
	},

	ready: function ready() {},

	/**
	* Life cycle function that gets called when the element is
	* first attached to the DOM
	*/
	attached: function attached() {
		var heroContent = this.shadowRoot ? this.shadowRoot.querySelector('.hero-content') :	this.querySelector('.hero-content');
		var positions = this.contentPosition.split(' ')
		for ( i = 0; i < positions.length; i++ ) {
			heroContent.classList.add(positions[i]);
		}
	}

});
