import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | voucher-display-card', function(hooks) {
  setupRenderingTest(hooks);

  test('Voucher Card renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{voucher-card
      voucher=voucher
      }}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
    {{voucher-card
      voucher=voucher
      }}
    `);

    assert.equal(this.element.querySelector('#testVoucherCardRendered').textContent.trim(), 'Voucher Sent');
  });
});
