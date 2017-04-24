'use strict';

(function () {

    Polymer({

        is: 'ps-image',

        properties: {
            /**
             * Explicit SRC at which to find the desired image.
             */
            src: {
                type: String,
                value: ''
            },
            /**
             * PhotoShelter Image ID for direct retreival.
             */
            iid: {
                type: String
            },
            /**
             * PhotoShelter Gallery ID for Key Image retreival.
             */
            gid: {
                type: String
            },
            /**
             * PhotoShelter Collection ID for Key Image retreival.
             */
            cid: {
                type: String
            },
            /**
             * Additional information required from the Image API to fully populate
             * the included components.
             */
            // TODO: Gallery and Collection KeyImages should extend Creator like Image does.
            apiExtends: {
                type: Object,
                value: function value() {
					var ImageLink = [
						'ImageLink',
						{
							'fields': '*',
							'params': {
								'f_https_link': 't'
							}
						}
					];
					return {
						'Image': [ImageLink,'Creator'],
						'Gallery': [ImageLink, 'KeyImage','Creator'],
						'Collection': [ImageLink, 'KeyImage','Creator']
					};
                }
            },
            /**
             * `apiKey` registers your requests against the API in the name of your
             * account.
             */
            apiKey: {
                type: String
            },
            /**
             * The entirety of a PhotoShelter API image object.  The ImageLink extend
             * will need to be present in order to properly support the display of
             * ps-image.
             */
            image: {
                type: Object,
                value: function value() {
                    return {};
                }
            },
            /**
             * If true displays a link to the PhotoShelter customization of the image creator.
             */
            credited: {
                type: Boolean,
                value: false
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
            }
        }
    });
})();