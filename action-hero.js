Polymer({
	is: 'action-hero',

	properties: {
		/**
		 * The position of the content. Permitted values are `top`, `right`, `bottom`, and `left`
		 */
		contentPosition: {
			type: String,
			value: 'center'
		},
	},

	ready: function ready() {},

	/**
	* Life cycle function that gets called when the element is
	* first attached to the DOM
	*/
	attached: function attached() {
		const allowedPositions = ['top', 'bottom', 'left', 'right', 'center'];
		if (!allowedPositions.includes(this.contentPosition)) {
			this.contentPosition = 'center';
		} else {
			return;
		}
	},
	/**
 * ### Events
 */

	/**
 * Fired when action-hero does something
 *
 * @event action-hero-action
 */

});
