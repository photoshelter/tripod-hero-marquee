Polymer({
	is: 'action-hero',

	properties: {
		/**
		 * The position of the content, separated by a dash. Available values are "top-left", "top-center", "top-right", "center-left", "center-center", "center-right", "bottom-left", "bottom-center" and "bottom-right".
		 */
		contentPosition: {
			type: String,
			value: 'center-center',
			observer: '_validateContentPosition'
		},
		/**
		 * The CSS Layout for the hero content. Defaults to Flexbox, and can be set to "grid" for CSS Grid Layout.
		 */
		contentLayout: {
			type: String,
			value: 'flex',
			observer: '_validateContentLayout'
		}
	},

	ready: function ready() {},

	/**
	* Life cycle function that gets called when the element is
	* first attached to the DOM
	*/
	attached: function attached() {},

	_validateContentPosition: function() {
		const allowedPositions = ['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'];
		this._validate(allowedPositions, this.contentPosition, 'content-position');
	},
	_validateContentLayout: function() {
		const allowedLayouts = ['flex', 'grid']
		this._validate(allowedLayouts, this.contentLayout, 'content-layout');
		
	},
	_validate: function(allowedValues, inputValue, validateWhat) {
		if(!allowedValues.includes(inputValue)) {
			console.warn(`${inputValue} is not a valid input for ${validateWhat}`);
		}
	}

});
