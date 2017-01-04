Polymer({
	is: 'tripod-hero-marquee',

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
			value: 'flexbox',
			observer: '_validateContentLayout'
		},
		desktopLayout: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		loaded: {
			type: Boolean,
			value: false
		}
	},

	ready: function ready() {},

	/**
	* Life cycle function that gets called when the element is
	* first attached to the DOM
	*/
	attached: function attached() {
		this.loaded = true;
	},

	/**
	 * TODO: When we're ready to move to Polymer 2.0 these would make sense in a setter() function
	 */
	_validateContentPosition: function() {
		const allowedPositions = ['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'];
		if (!this._validate(allowedPositions, this.contentPosition, 'content-position')){
			this.contentPosition = 'center-center'
		};
	},
	_validateContentLayout: function() {
		const allowedLayouts = ['flexbox', 'grid']
		if (!this._validate(allowedLayouts, this.contentLayout, 'content-layout')) {
			this.contentLayout = 'flexbox'
		};
	},
	_validate: function(allowedValues, inputValue, validateWhat) {
		let valid = false;
		for (let i = 0; i < allowedValues.length; i++) {
			if (inputValue === allowedValues[i]) {
				valid = true;
			}
		};
		if (valid = false) {
			console.warn(inputValue + ' is not a valid input for ' + validateWhat);
			return false;
		} else { 
			return true 
		};
	}

});
