Polymer({
	is: 'action-hero',

	properties: {
		/**
		 * The position of the content. Permitted values are `top`, `right`, `bottom`, and `left`
		 */
		contentPosition: {
			type: String,
			value: 'center-middle'
		},
	},

	ready: function ready() {},

	/**
	* Life cycle function that gets called when the element is
	* first attached to the DOM
	*/
	attached: function attached() {
		var heroContent = this.shadowRoot ? this.shadowRoot.querySelector('.content') :	this.querySelector('.content');
		var re = /\s|\-|,\s*|;\s*/;
		var positions = this.contentPosition.split(re)
		for ( i = 0; i < positions.length; i++ ) {
			heroContent.classList.add(positions[i]);
		}
	}

});
