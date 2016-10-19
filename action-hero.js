Polymer({
	is: 'action-hero',

	properties: {

		width: {
			type: String,
			observer: '_widthChanged'
		},
		height: {
			type: String,
			observer: '_heightChanged'
		},
		contentPosition: {
			type: String,
			value: 'bottom'
		},
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