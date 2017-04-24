Polymer({
  is: 'ps-credit',

  properties: {
    /**
     * The PhotoShelter Image Object passed in by the ps-image used to generate the credit.
     */
    image: {
      type: Object,
      value: function() {
        return {};
      },
      observer: '_imageChanged'
    },
    /** 
     * The URL of the PhotoShelter Customization of the creator.
     */
    creatorUrl: {
      type: String,
      value: ''
    },
    /**
     * The full name of the image Creator.
     */
    creatorName: {
      type: String,
      value: ''
    }
  },
  /**
   * Observe image change 
   */
  _imageChanged: function() {
    if (typeof(this.image.Creator) === 'undefined') return;
    this._generateCreatorUrl(this.image);
    this._generateCreatorName(this.image);
  },
  /** 
   * Generate the link to the creator's PhotoShelter Customization
   */
  _generateCreatorUrl: function(image) {
    this.creatorUrl = 'http://' + image.Creator.label + '.photoshelter.com';
  },
  /**
   * Generate the creator's full name for the link label
   */
  _generateCreatorName(image) {
    this.creatorName = image.Creator.first_name + ' ' + image.Creator.last_name;
  }
});
