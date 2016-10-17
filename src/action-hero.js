'use strict';

(function () {

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
			aspect: {
				type: String,
				observer: '_aspectRatioChanged'
			},
			contentPosition: {
				type: String,
        value: 'bottom',
				observer: '_contentPositionChanged'
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

		_extractImgSrc: function() {
			return 'hi';
		},
		/**
		 * Observers for width and height changes
		 */
		_widthChanged: function() {
			this.customStyle['--action-hero-width'] = this.width
		},
		_heightChanged: function() {
			this.customStyle['--action-hero-height'] = this.height
		},

		/**
		 * Observer for text-position changes
		 */
		_contentPositionChanged: function() {
      if(this.contentPosition === 'bottom') {
        return
      } else {
				const allowedPositions = ['top', 'left']
				if (allowedPositions.includes(this.textPosition)) {
					const mktContent = (this.shadowRoot.querySelector('.content'))
					mktContent.addClass('content-top')
				}
      }
		},

		/**
		 * Observer for textColor changes
		 */
    _textColorChanged: function() {
			if(this.textColor === 'black') {
				this._setTextColor();
			} else {
				return;
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
})();
