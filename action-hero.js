Polymer({
	is: 'action-hero',

	properties: {
		/**
		 * The headline to be displayed over the slotted-in background
		 */
		headline: {
			type: String,
			value: 'This is the default headline text.',
		},
		/**
		 * The text of the CTA button displayed below the headline
		 */
		ctaText: {
			type: String
		},
		/**
		 * The link for the CTA button
		 */
		ctaLink: {
			type: String,
			value: '/'
		},
		/**
		 * The width of the element
		 */
		width: {
			type: String,
			observer: '_widthChanged'
		},
		/**
		 * The height of the element
		 */
		height: {
			type: String,
			observer: '_heightChanged'
		},
		/**
		 * The position of the content. Permitted values are `top`, `right`, `bottom`, and `left`
		 */
		contentPosition: {
			type: String,
			value: 'bottom',
			observer: '_contentPositionCheck'
		},
		/**
		 * The text color for the headline
		 */
		textColor: {
			type: String,
			value: 'white',
			observer: '_textColorChanged'
		}
	},

	ready: function ready() {},

	/**
	* Life cycle function that gets called when the element is
	* first attached to the DOM
	*/
	attached: function attached() {},
	/**
	 * Observer for width change
	 */
	_widthChanged: function() {
		this.customStyle['--action-hero-width'] = this.width
	},
	/**
	 * Observer for height change
	 */
	_heightChanged: function() {
		this.customStyle['--action-hero-height'] = this.height
	},

	/**
	 * Check to see if contentPosition is valid
	 */
	_contentPositionCheck: function() {
		const allowedPositions = ['top', 'bottom', 'left', 'right'];
		if (!allowedPositions.includes(this.contentPosition)) {
			this.contentPosition = 'bottom';
		} else {
			return;
		}
	},
	/**
	 * Observer for textColor changes
	 */
	_textColorChanged: function() {
		let div = document.createElement('div');
		div.style.backgroundColor = this.textColor;
		if (div.style.backgroundColor === '') {
			return
		} else {
			this._setTextColor();
		}
	},
	_setTextColor: function() {
		this.customStyle['--action-hero-text-color'] = this.textColor;
	}
	/**
 * ### Events
 */

	/**
 * Fired when action-hero does something
 *
 * @event action-hero-action
 */

});