Polymer({
	is: 'tripod-hero-marquee',

	properties: {
		/**
		 * The position of the content, separated by a dash. Available values are :
		 * "top-left", "top-center", "top-right",
		 * "center-left", "center-center", "center-right",
		 * "bottom-left", "bottom-center" and "bottom-right".
		**/
		contentPosition: {
			type: String,
			value: 'center-center',
			observer: '_validateContentPosition'
		},

		/**
		 * The CSS Layout for the hero content. Defaults to Flexbox, and can be set to "grid" for CSS Grid Layout.
		**/
		contentLayout: {
			type: String,
			value: 'flexbox',
			observer: '_validateContentLayout'
		},

		/**
		 * An attrribute to help with responsive sizing. 
		 * Gets reflected to the component....
		 * TODO @will
		**/
		desktopLayout: {
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		
		/**
		 * A loaded check...
		 * TODO @will
		**/
		loaded: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * Life cycle function that gets called when the element is
	 * first attached to the DOM
	**/
	attached: function attached() {
		this.loaded = true;
	},

	/**
	 * Makes sure that the content position being set is valid
	 * if not it defaults to `center-center`
	**/
	_validateContentPosition: function() {
		if (!this._validate(this._allowedPositions, this.contentPosition, 'content-position')){
			this.contentPosition = this._allowedPositions[4]; /*'center-center'*/
		};
	},

	/**
	 * Makes sure that the content layout being set is valid
	 * if not it defaults to `flexbox`
	**/
	_validateContentLayout: function() {
		if (!this._validate(this._allowedLayouts, this.contentLayout, 'content-layout')) {
			this.contentLayout = this._allowedLayouts[0]; /*'flexbox'*/
		};
	},

	/**
	 * Generalized validation function for validation observers.
	**/
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
	},

	/**
	 * Getters 
	**/
	get _allowedPositions() {
		return['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'];
	},

	get _allowedLayouts() {
		return ['flexbox', 'grid'];
	}

});
