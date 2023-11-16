function authorization(id) {
  const body = {
    id: 'evt_1JfPIn2eZvKYlo2CjKlGyZh9',
    object: 'event',
    data: {
      object: {
        id: 'eee',
        object: 'payment_intent',
        amount: 1500000,
        livemode: false,
        metadata: {
          orderId: id,
          userId: 'a49ab890-0553-4c26-84b5-c4e31d157899',
        },
        next_action: {
          redirect_to_url: {
            return_url:
              'https://team-sostene-e-commerce-bn-production.up.railway.app/',
            url: 'https://hooks.stripe.com/redirect/authenticate/ee?client_secret=eee',
          },
          type: 'redirect_to_url',
        },
        status: 'requires_action',
      },
    },
    livemode: false,
    type: 'payment_intent.requires_action',
  };

  return body;
}

function failed(id) {
  const body = {
    id: 'eee',
    object: 'event',
    data: {
      object: {
        id: 'pi_3N08PuLoeSuOuPCC0j0hIgV8',
        object: 'payment_intent',
        amount: 1500000,
        currency: 'usd',
        last_payment_error: {
          code: 'card_declined',
          decline_code: 'expired_card',
          doc_url: 'https://stripe.com/docs/error-codes/expired-card',
          message: 'Your card has expired.',
          type: 'card_error',
        },
        livemode: false,
        metadata: {
          orderId: id,
          userId: 'a49ab890-0553-4c26-84b5-c4e31d157899',
        },
        status: 'requires_payment_method',
      },
    },
    livemode: false,
    type: 'payment_intent.payment_failed',
  };

  return body;
}

function succeeded(id) {
  const body = {
    id: 'evt_3rjdf6msn54gdo35',
    object: 'event',
    data: {
      object: {
        id: 'pi_3N08PuLoeSuOuPCC0j0hIgV8',
        object: 'payment_intent',
        amount: 1500000,
        amount_received: 1500000,
        charges: {
          data: [
            {
              id: 'ch_3N08PuLoeSuOuPCCjJtNlN5L',
              object: 'charge',
              amount: 1500000,
              status: 'succeeded',
            },
          ],
        },
        livemode: false,
        metadata: {
          orderId: id,
          userId: 'a49ab890-0553-4c26-84b5-c4e31d157899',
        },
        payment_method: 'pm_1N08PtLoeSuOuPCCgayvnxh6',
        status: 'succeeded',
      },
    },
    type: 'payment_intent.succeeded',
  };
  return body;
}
function unexpected(id) {
  const body = {
    id: 'evt_1JfPIn2eZvKYlo2CjKlGyZh9',
    object: 'event',
    data: {
      object: {
        id: 'eee',
        object: 'payment_intent',
        amount: 1500000,
        livemode: false,
        metadata: {
          orderId: id,
          userId: 'a49ab890-0553-4c26-84b5-c4e31d157899',
        },
        next_action: {
          redirect_to_url: {
            return_url:
              'https://team-sostene-e-commerce-bn-production.up.railway.app/',
            url: 'https://hooks.stripe.com/redirect/authenticate/ee?client_secret=eee',
          },
          type: 'redirect_to_url',
        },
        status: 'requires_action',
      },
    },
    livemode: false,
    type: 'payment_intent.requires',
  };
  return body;
}

export default { authorization, failed, succeeded, unexpected };
