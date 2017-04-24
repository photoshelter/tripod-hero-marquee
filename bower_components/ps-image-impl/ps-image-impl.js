Polymer({
	is: 'ps-image-impl',

	behaviors: [Polymer.IronResizableBehavior],

	/**
	* List the events that you component emits and associated documentation to
	* undestand the most beneficial way to leverage those events here.
	*
	* @event ps-image-impl-event
	*/

	properties: {
		/**
		* SRC of the created `iron-image` after the available data has been
		* processed.
		*/
		_processedSrc: {
			type: String,
			value: ''
		},
		/**
		* Image detents for higher likelihood of hitting the CDN
		*/
		_requestWidths: {
			type: Array,
			value: [240, 440, 640, 840, 1040, 1240, 1440, 1640, 1840, 2040]
		},
		/**
		* Explicit SRC at which to find the desired image.
		*/
		src: {
			type: String,
			value: '',
			observer: '_srcChanged'
		},
		/**
		* A short text alternative for the image.
		*/
		alt: {
			type: String,
			value: null
		},
		/**
		* The entirety of a PhotoShelter API image object.  The ImageLink extend
		* will need to be present in order to properly support the display of
		* ps-image.
		*/
		image: {
			type: Object,
			value: function() {
				return {};
			},
			observer: '_imageChanged'
		},
		/**
		* When true, the image is prevented from loading and any placeholder is
		* shown.  This may be useful when a binding to the src property is known to
		* be invalid, to prevent 404 requests.
		*/
		preventLoad: {
			type: Boolean,
			value: false
		},
		/**
		* Sets a sizing option for the image.  Valid values are `contain` (full
		* aspect ratio of the image is contained within the element and
		* letterboxed) or `cover` (image is cropped in order to fully cover the
		* bounds of the element), or `null` (default: image takes natural size).
		*/
		sizing: {
			type: String,
			value: null
		},
		/**
		* When a sizing option is uzed (`cover` or `contain`), this determines
		* how the image is aligned within the element bounds.
		*/
		position: {
			type: String,
			value: 'center'
		},
		/**
		* When `preload` is true, setting `fade` to true will cause the image to
		* fade into place.
		*/
		fade: {
			type: Boolean,
			value: false
		},
		/**
		* When `true`, any change to the `src` property will cause the `placeholder`
		* image to be shown until the new image has loaded.
		*/
		preload: {
			type: Boolean,
			value: false
		},
		preloadByDefault: {
			type: Boolean,
			value: false,
			observer: '_preloadByDefaultChanged'
		},
		/**
		* This image will be used as a background/placeholder until the src image has
		* loaded.  Use of a data-URI for placeholder is encouraged for instant rendering.
		*/
		placeholder: {
			type: String,
			value: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xOTQuOCA0MzcuOSAxNTAuNiAzMiI+PHBhdGggZmlsbD0iIzZFQkU0NiIgZD0iTS0xNzQuNSA0NDUuMXYxMC44bDE1LjcgNC4ydi0xOCIvPjxwYXRoIGZpbGw9IiNDNUMyQzIiIGQ9Ik0tMTU4LjggNDQyLjFsLTIwLjMgMy45LTE1LjctNC4yIDIwLjMtMy45Ii8+PHBhdGggZmlsbD0iIzkzQ0I3MSIgZD0iTS0xNzQuNSA0NTUuOWwtNC42Ljl2Ny4ybDIwLjMtMy45Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTS0xOTQuOCA0NDEuOGwxNS43IDQuMnYyMy45bC0xNS43LTEwLjEiLz48ZyBmaWxsPSIjRkZGIj48cGF0aCBkPSJNLTk0LjcgNDUwLjRjLS42LS44LTEuNi0xLjItMi42LTEuNS0uMy0uMS0uNi0uMS0uOC0uMi0uNS0uMS0xLS4yLTEuMy0uNy0uMi0uNC0uMS0xIC4yLTEuMi40LS4zIDEuMS0uMyAxLjYgMCAuMi4yLjQuNC41LjcuMS4yIDAgLjMuMS4zaDIuN2MwLTEuMi0uNi0yLjItMS42LTIuOC0xLjEtLjctMi40LS44LTMuNi0uNS0xIC4zLTEuOSAxLjEtMi4zIDIuMS0uMi41LS4yIDEtLjIgMS41IDAgLjQuMS45LjMgMS4zLjQuOCAxLjMgMS4yIDIuMSAxLjUuNi4yIDEuMi4zIDEuNy41czEgLjUgMSAxLjFjMCAuNi0uNSAxLTEuMSAxLjEtLjYuMS0xLjItLjItMS40LS44IDAtLjEgMC0uMS0uMS0uMnYtLjNoLTIuOXYuNWMuMiAxLjEgMSAyIDIgMi41IDEuMS42IDIuNS43IDMuNy4zIDEtLjQgMS45LTEuMSAyLjMtMi4yLjQtMSAuMy0yLjItLjMtM3pNLTEyMS44IDQ0NC41djIuNWgyLjR2OC42aDIuOFY0NDdoMi40di0yLjVNLTE0NS4xIDQ1MS4yYy0xIC44LTIgMS0zLjMgMWgtMS4ydjMuNWgtMi43di0xMS4yaDMuN2MxLjEgMCAyLjUgMCAzLjQuOC45LjcgMS4zIDEuOCAxLjMgMyAwIDEtLjQgMi4yLTEuMiAyLjl6bS0zLjQtNC4yaC0xLjF2Mi43aDEuMmMuOSAwIDEuOC0uMiAxLjgtMS4zIDAtMS4zLTEtMS40LTEuOS0xLjR6TS0xMzYuNyA0NTUuNnYtNC41aC0zLjd2NC41aC0yLjl2LTExLjJoMi45djQuMmgzLjd2LTQuMmgyLjl2MTEuMmgtMi45ek0tMTI3LjQgNDU1LjhjLTMuMiAwLTUuOS0yLjQtNS45LTUuNyAwLS44LjEtMS42LjQtMi40LjItLjQuNC0uOS43LTEuMyAxLjEtMS41IDIuOC0yLjMgNC43LTIuMyAzLjMgMCA1LjkgMi41IDUuOSA1LjguMSAzLjQtMi41IDUuOS01LjggNS45em0wLTljLTEuOCAwLTMgMS41LTMgMy4zIDAgMS44IDEuMiAzLjMgMy4xIDMuMyAxLjggMCAzLTEuNiAzLTMuMyAwLTEuOC0xLjItMy4zLTMuMS0zLjN6TS0xMDguNyA0NTUuOGMtMy4yIDAtNS45LTIuNC01LjktNS43IDAtLjguMS0xLjYuNC0yLjQuMi0uNC40LS45LjctMS4zIDEuMS0xLjUgMi44LTIuMyA0LjctMi4zIDMuMyAwIDUuOSAyLjUgNS45IDUuOC4xIDMuNC0yLjUgNS45LTUuOCA1Ljl6bS4xLTljLTEuOCAwLTMgMS41LTMgMy4zIDAgMS44IDEuMiAzLjMgMy4xIDMuMyAxLjggMCAzLTEuNiAzLTMuMy0uMS0xLjgtMS4zLTMuMy0zLjEtMy4zek0tODYuOSA0NTUuNnYtNC41aC0zLjd2NC41aC0yLjl2LTExLjJoMi45djQuMmgzLjd2LTQuMmgyLjl2MTEuMmgtMi45ek0tODIuOSA0NTUuNnYtMTEuMmg3LjF2Mi41aC00LjR2MS43aDMuOHYyLjVoLTMuOHYxLjloNC40djIuNWMwIC4xLTcuMS4xLTcuMS4xek0tNjEuMSA0NTUuNnYtMTEuMmg3LjF2Mi41aC00LjR2MS43aDMuOHYyLjVoLTMuOHYxLjloNC40djIuNWMwIC4xLTcuMS4xLTcuMS4xek0tNzQuNiA0NTUuNnYtMTEuMmgyLjl2OC43aDMuM3YyLjVoLTYuMnpNLTY5LjYgNDQ0LjV2Mi41aDIuNHY4LjZoMi45VjQ0N2gyLjR2LTIuNU0tNDcuNSA0NTUuNmwtMi42LTMuNnYzLjZoLTIuN3YtMTEuMmgzLjVjMS4yIDAgMi41IDAgMy40LjguOS43IDEuNCAxLjkgMS40IDMgMCAxLjctMSAzLjItMi44IDMuNWwzIDMuOC0zLjIuMXptLTEuNi04LjZoLTF2My4xaDFjMS4xIDAgMS45LS41IDEuOS0xLjZzLS45LTEuNS0xLjktMS41eiIvPjwvZz48L3N2Zz4='
		},
		/**
		* Read-only value that is true when the image is loaded.
		*/
		loaded: {
			notify: true,
			type: Boolean,
			value: false,
			reflectToAttribute: true
		},
		/**
		* Read-only value that tracks the loading state of the image when the `preload`
		* option is used.
		*/
		loading: {
			notify: true,
			type: Boolean,
			value: false
		},
		/**
		* Can be used to set the width of image (e.g. via binding); size may also be
		* set via CSS.
		*/
		width: {
			observer: '_widthChanged',
			type: Number,
			value: null
		},
		/**
		* Can be used to set the height of image (e.g. via binding); size may also be
		* set via CSS.
		*
		* @attribute height
		* @type number
		* @default null
		*/
		height: {
			observer: '_heightChanged',
			type: Number,
			value: null
		},
		displayWidth: {
			type: Number
		},
		displayHeight: {
			type: Number
		},
		noOversampling: {
			type: Boolean,
			value: false
		},

		/**
		* Can the <img/> be dragged when sizing is set.
		*/

		contextMenu: {
			type: Boolean,
			value: false
		},
		debounceTime: {
			type: Number,
			value: 0
		}
	},

	observers: [
		'_checkImageRequestSize(displayWidth, displayHeight)',
		'_loadedChanged(loaded)'
	],

	listeners: {
		'iron-resize': '_onIronResize'
	},

	/**
	* Measure the element when attached to the DOM
	*/
	attached: function() {
		this.async(this._measure);
	},

	/**
	* When `src` is made available, apply it to `_processedSrc`
	*/
	_srcChanged: function(src) {
		this.preload = this.preloadByDefault;
		this._processedSrc = '';
		this.debounce('srcFromSrc', function(src) {
			this._processedSrc = src;
		}.bind(this, src), this.debounceTime);
	},
	/**
	* When all of the correct contexts are met, process the src with `image`
	*/
	_imageChanged: function(image) {
		this.preload = this.preloadByDefault;
		if (Object.keys(image).length) this.iid = this.gid = this.cid = null;
		this.async(function() {
			this._measure();
			if (!this._canProcessSource(image)) return;
			this._processedSrcFromImage(image);
			this._processSchema(image);
		}.bind(this));
	},
	_widthChanged: function() {

	},
	_heightChanged: function() {

	},
	_preloadByDefaultChanged: function(preloadByDefault) {
		this.preload = preloadByDefault;
	},
	/**
	* When `image.ImageLink.base` is available and `sizing` is unset or the
	* component has it's own width and height, allow the src to be processed.
	*/
	_canProcessSource: function(image) {
		return !!image.hasOwnProperty('ImageLink') &&
		!!image.ImageLink.hasOwnProperty('base') &&
		(this.sizing === null ||
			(!!this.displayWidth &&
				!!this.displayHeight));
	},
	/**
	* When `image` is made available use it to process the src.
	*/
	_processedSrcFromImage: function(image, resize) {
		var processedSrc = image.ImageLink.base + '/sec=' +
		image.ImageLink.token + '/' + this._sizeToRequest();
		if (!resize) {
			this.debounce('srcFromImage', function(processedSrc) {
				this._processedSrc = processedSrc;
			}.bind(this, processedSrc), this.debounceTime);
			return;
		}
		if (processedSrc === this._processedSrc) return;
		var img = new Image(this.displayWidth, this.displayHeight);
		img.addEventListener('load', function () {
			this.async(function() {
				this.debounce('srcFromImageOnResize', function(processedSrc) {
					this._processedSrc = processedSrc;
				}.bind(this, processedSrc), this.debounceTime);
			}.bind(this));
		}.bind(this));
		img.src = processedSrc;
	},
	/**
	* Measure element when resized
	*/
	_onIronResize: function() {
		this._measure();
	},
	/**
	* Decide the correct preprocessed image size to request has changed.
	*/
	_checkImageRequestSize: function() {
		//TODO: better `preload` tracking.
		var image = this.image;
		if (!this._canProcessSource(image)) return;
		this._processedSrcFromImage(image, true);
	},
	/**
	* Calculate the display ration of the image from data.
	*/
	_ratio: function() {
		if (!this.image || !this.image.screen_width_max || !this.image.screen_height_max) return false;
		if (!!this.width && !!this.height) {
			return this.height / this.width;
		}
		return this.image.screen_height_max / this.image.screen_width_max;
	},
	/**
	 * Decide the correct preprocessed image size to request.
	*/
	_sizeToRequest: function() {
		if (this.sizing === null) return '';
		var dpr = ((typeof window.devicePixelRatio !== 'undefined') ? window.devicePixelRatio : 1),
		sizing = ((this.sizing === 'cover') ? 'fill' : 'fit') + '=',
		width = this.image.screen_width_max || this.image.width,
		height = this.image.screen_height_max || this.image.height,
		displayWidth = width / height * (this.displayHeight * dpr),
		requestWidth,
		requestHeight,
		size,
		i = 0;
		if (displayWidth > this.displayWidth) displayWidth = this.displayWidth;
		displayWidth = displayWidth * dpr;
		if (this.displayWidth > this.image.screen_width_max) requestWidth = this.image.screen_width_max;
		while (i < this._requestWidths.length && !requestWidth) {
		requestWidth = this._requestWidths[i] > this.displayWidth ? this._requestWidths[i] : null;
		i++;
		}
		requestHeight = Math.round(requestWidth / (this.image.width / this.image.height));
		if (requestHeight < this.displayHeight) requestHeight = this.displayHeight;
		size = (this.sizing === 'cover' ? requestWidth + 'x' + requestHeight : requestWidth);
		return sizing + size;
	},
	/**
	* Measure the components display size.
	*/
	_measure: function() {
		if (this.sizing !== null || this._sizing !== null) {
			this.displayWidth = this.offsetWidth;
			this.displayHeight = this.offsetHeight;
			this._checkOversampling();
		}
	},
	/**
	* Determine whether the image should be over sampled
	*/
	_checkOversampling: function() {
		if (!this.noOversampling) return;
		if (!Object.keys(this.image).length) return;
		if (typeof this.image.width === 'undefined') return;
		if (typeof this.image.height === 'undefined') return;
		if (this.image.width < this.displayWidth &&
			this.image.height < this.displayHeight) {
				this._sizing = this._sizing || this.sizing;
				this.sizing = null;
			} else {
				this.sizing = this._sizing || this.sizing;
			}
	},
	/**
	* Prepare ALT tagging data from cascade
	*/
	_alt: function(alt, image) {
		if (Object.keys(image).length === 0) return '';
		var iptc = image.Iptc || [];
		return alt || iptc.display_caption || iptc.caption || iptc.headline || image.title || image.file_name;
	},
	/**
	* Manage load state and preload truthiness
	*/
	_loadedChanged: function(loaded) {
		if (!!loaded) {
			this.addEventListener('transitionend', function preloadChange() {
				this.removeEventListener('transitionend', preloadChange);
				this.preload = false;
			}.bind(this));
		}
	},
	/**
	* Prepare JSON+LD content
	*/
	_processSchema: function(image) {
		var schema = {
			"@context": "http://schema.org",
			"@type": "ImageObject",
			"name": this.image.file_name,
			"contentUrl": this.image.ImageLink.link,
			"width": this.image.width,
			"height": this.image.height
		};
		if (this.image.Iptc) {
			if (this.image.Iptc.copyright)
				schema.copyrightHolder = this.image.Iptc.copyright;
			if (this.image.Iptc.author)
				schema.author = this.image.Iptc.author;
			if (this.image.Iptc.headline)
				schema.headline = this.image.Iptc.headline;
			if (this.image.Iptc.display_caption)
				schema.description = this.image.Iptc.display_caption;
			if (this.image.Iptc.caption)
				schema.caption = this.image.Iptc.caption;
			if (this.image.Iptc.keyword)
				schema.keywords = this.image.Iptc.keyword;
		}
		this.$.schema.innerHTML = JSON.stringify(schema);
	}

});
