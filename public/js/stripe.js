/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JDOoKJzV7PMmkXoj0I3QofSOYoFN5BHtsybMgRABflVUdYwQFk463Up0CPg1rZg67BJpcqVBl0gPATUmabGcAPz000zYgEDJS'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.err(err);
    showAlert('error', err);
  }
};
