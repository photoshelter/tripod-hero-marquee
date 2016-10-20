suite('<action-hero>', function() {
  var actionHero;

  setup(function() {
    actionHero = fixture('baseActionHero')
  });

  test('has a content position of bottom', function() {
    assert.equal(actionHero.contentPosition, 'bottom');
  });
  test('has a text color of white', function() {
    assert.equal(actionHero.textColor, 'white');
  });
  test('has a width of 100%', function() {
    var body = document.body
    assert.equal(actionHero.offsetWidth, body.offsetWidth);
  });
  test('has a height of 500px', function() {
    assert.equal(actionHero.offsetHeight, 500)
  });
  test('has a headline of "This is the default headline text"', function() {
    assert.equal(actionHero.headline, 'This is the default headline text.');
  });
});

  suite('<action-hero text-color>', function() {
    var actionHero

    setup(function() {
        actionHero = fixture('baseActionHero');
    });

    test('Accepts valid CSS values for headline color', function() {
        actionHero.textColor = 'rebeccapurple'
        assert.equal(actionHero.textColor, 'rebeccapurple');
    });

    test('Rejects invalid CSS values for headline color and defaults to white', function() {
        actionHero.textColor = 'lol not a color';
        assert.equal(actionHero.textColor, 'white');
    });

});

suite('<action-hero content-position>', function() {
    var actionHero;

    suite('if the user passes an accepted value', function() {
        setup(function() {
            actionHero = fixture('baseActionHero');
            actionHero.set('contentPosition', 'top');
        });

        test('The element property reflects the passed value', function() {
            assert.equal(actionHero.contentPosition, 'top');
        });
        test('The element has a class of content-`${contentPosition}`', function() {
            var content = Polymer.dom(actionHero.root).querySelector('.content');
            assert.ok(content.classList.contains('content-top'));
        });
    });
    suite('if the user passes a bad value', function(){
        setup(function() {
            actionHero = fixture('baseActionHero');
            actionHero.set('contentPosition', 'not a real position');
        });
        
        test('If given a bad value it defaults to bottom', function() {
            assert.equal(actionHero.contentPosition, 'bottom');
        });
        
        test('If given a bad position, the element has a class of content-bottom', function() {
            var content = Polymer.dom(actionHero.root).querySelector('.content');
            assert.ok(content.classList.contains('content-bottom'));
        });
    });
});

suite('<action-hero cta-text cta-link>', function() {
    var actionHero;

    setup(function() {
        actionHero = fixture('ctaActionHero')
    });

    test('the button is paitned in the DOM', function() {
      flush(function() {
        assert.equal(actionHero.querySelectorAll('.button').length, 1);
      })
    });
    test('the ctaText property matches the provided cta-text', function() {
        flush(function() {
            assert.equal(actionHero.ctaText, 'Click here');
        })
    });
    test('The button text in the DOM matches the provided cta-text', function() {
      flush(function() {
        assert.equal(actionHero.querySelector('.button a').innerHTML, 'Click here')
      })
    })
    test('the ctaLink property matches the provided cta-link', function() {
        flush(function() {
            assert.equal(actionHero.ctaLink, 'http://www.photoshelter.com');
        })
    });
    test('The button link in the DOM matches the cta-link', function() {
        flush(function() {
            var button = actionHero.querySelector('.button a')
            assert.equal(button.href, 'http://www.photoshelter.com/')
        })
    })
});

suite('<action-hero headline>', function() {
    var actionHero

    setup(function() {
        actionHero = fixture('baseActionHero');
        actionHero.set('headline', 'Your images work here.');
    });

    test('has a headline property', function() {
        assert.equal(actionHero.headline, 'Your images work here.');
    });
    test('The headline in the DOM matches the headline property', function() {
        var headline = Polymer.dom(actionHero.root).querySelector('.headline h2')
        assert.equal(headline.innerHTML, 'Your images work here.');
    });
});

