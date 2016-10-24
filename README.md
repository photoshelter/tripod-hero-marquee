## action-hero


Displays a flexible, generic hero banner with text and a button overlaying an image or video

---

### DEVELOPMENT

If you would like to create a git hub pages demo for project make sure you are on master and have pulled latest on master and then run `npm run pages` in your terminal.

**Demo**

https://gh.corp.bitshelter.com/pages/Components/action-hero

#### TESTING

Basic testing is supported using [Web Component Tester](https://github.com/Polymer/web-component-tester)

Running `npm test` will run all your tests from the `test` folder locally on your machine

Automated testing is also supported with [TravisCI](https://travis-ci.org/getting_started). Tests are set to every commit.
This can be adjusted in the `.travis.yml`

We also support greater cross browser support with testing from SauceLabs. These are currently built to run on
every pull request.

To add more VMs to `wtc.conf.json` if you would like to increase your cross browser coverage.

###### SauceLabs Setup.
If you already have an account then all you need to do to get SauceLabs working is:
- Install the travis command line module (if you haven't already)
    - gem install travis
- `travis encrypt SAUCE_USERNAME=[your username] --add`
- `travis encrypt SAUCE_ACCESS_KEY=[your access key] --add`
- Commit and push .travis.yml
- You're done!

### USAGE

- **Installation**
  - `bower install foo-project`
