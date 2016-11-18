## &lt;tripod-hero-marquee&gt;

*[Demo and API Docs](https://gh.corp.bitshelter.com/pages/Components/tripod-hero-marquee)*

`tripod-hero-marquee` is an element for displaying a hero image/video/graphic/color overlaid with text.

It leaves the styling of the element and any contents to external
styles, and provides a collection of classes to position the content you
pass in using flexbox (with support also included for CSS Grid Positioning as
it gains more browser support!).

The component uses Shadow DOM v1 `slot` elements as a sort of placeholder for you
to add your own markup to be rendered within the element.

A background is specified by assigning it `slot="background"`.

All other content is distributed in a `.hero-content` container in the Shadow DOM.

With this approach, `tripod-hero-marquee` does the work of placing your content in the element,
while external or custom styles can be used to match style with the rest of your site.

Example: Use the `tripod-hero-marquee`
```html
<tripod-hero-marquee>
  <div slot="background" style="background-image:url(/image.jpg);background-size:cover;"></div>
  <h2>Headers, button, and backbround all slotted in from light DOM.</h2>
</tripod-hero-marquee>
```

### Styling

Custom property                  | Description                            | Default
---------------------------------|----------------------------------------|--------------------
`--hero-content-padding`     | Padding around the slotted in content                   | 20px
`--hero-content-width`    | The width of the content container when content-position is `left` or `right`                  | 40%
`--hero-content-grid-rows`    | Defines the CSS Grid rows for use with grid layout                  | 1fr 1fr 1fr
`--hero-content-grid-columns`    | Defines the CSS Grid columns for use with grid layout                  | 1fr 1fr 1fr

---

#### TESTING

Basic testing is supported using [Web Component Tester](https://github.com/Polymer/web-component-tester)

Running `npm test` will run all your tests from the `test` folder locally on your machine

Automated testing is also supported with [TravisCI](https://travis-ci.org/getting_started). Tests are set to every commit.
This can be adjusted in the `.travis.yml`

We also support greater cross browser support with testing from SauceLabs. These are currently built to run on
every pull request.

To add more VMs to `wtc.conf.json` if you would like to increase your cross browser coverage.

#### SauceLabs Setup.
If you already have an account then all you need to do to get SauceLabs working is:
- Install the travis command line module (if you haven't already)
    - gem install travis
- `travis encrypt SAUCE_USERNAME=[your username] --add`
- `travis encrypt SAUCE_ACCESS_KEY=[your access key] --add`
- Commit and push .travis.yml
- You're done!

#### USAGE

**Installation**

  - Clone this repo
  - cd into the cloned directory
  - `$ bower install && npm install`
  - `$ npm start` to host on the local server

**Contributing**
  - Update the issue and pull request templates by running the [template update script](https://github.com/photoshelter/github-templates/blob/master/template_refresh.sh) in the root directory of `tripod-hero-marquee`.
