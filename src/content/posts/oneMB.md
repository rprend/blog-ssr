---
title: "One Million Bids"
date: "12-31-2024"
author: "Ryan Prendergast"
slug: "one-million-bids"
---

Back in June, I had an idea for a simple 2 person auction: each person bids for an object, and whoever bids LESS buys it from the other. It's stupidly simple, but it stuck in my mind to make it happen, and I'm happy to say it's FINALLY done. You can try it out here: [1mb.app](http://1mb.app).

Building a two way marketplace that accepts real payments is remarkably harder than I expected. I think by writing, so every day I worked on it I wrote out what I was doing. Here's the headline of each of the 37 days:

![Project timeline part 1](/onembwork1.png)
![Project timeline part 2](/onembwork2.png)

I was surprised by what the bottleneck was. I thought the challenge would be managing persistent websocket connection pairs and scaling it to allow concurrent auctions (10,000). But as you can see above, that only took ~1/3 of the days. I used Cloudflare Durable Objects to create a LobbyManager and spin up LobbyRooms on demand, and websockets once created are relatively self sufficient.

What took the majority of the time was **payments.** At first, I assumed that customers would fund an account, they'd mess around for a bit, then they'd withdraw. Turns out that's just not workable. Fees are 2.9% + $.30 each way. I tried to come up with a solution where someone would Zelle me with an activation code as the description, and I had a lambda trigger every time I got an email notification from Chase which would note the amount and the description and update the user's account balance. But when it came time to sending money out… I couldn't find a single API that would let me programmatically send money. I was confused. But after consideration, I realized that a site where a user can fund an account and then send it out arbitrarily without attaching their identity is the _world's greatest money laundering_ system*.* I was having difficulty finding a provider because what I was trying to do was extremely illegal.

Payments suck. Everything is either crazy expensive (changing huge amounts of BPs in fees) or illegal. I spent a lot of time researching payments and card networks and bank transfers and wire transfers and FedNow and RTP and ACH.

I finally found a working solution, though not ideal, in Stripe Marketplace. In this setup, two participants register as Merchants, and get KYB'd by Stripe. With our two-way auction site, each participant is a digital artwork seller to the other. When Person A and Person B go into an auction, they receive 50% ownership in the digital artwork. Each places a double-blind bid, and the person who bids less PURCHASES the digital artwork from the other for the amount they bid. In order for this to work, BOTH parties must authorize a credit card payment directly to the other for the amount they bid. 1mb the platform waits for both to bid, compares the bid sizes, and then only CAPTURES the bid of one. The other will be left, uncaptured, until it expires a few days later. So, as a hypothetical auction:

- Person A Bids $10. They type in a credit card number and authorizes a payment to Person B for $10.
- Person B Bids $5. They type in a card number and authorize a payment to Person A for $5.
- The server waits until the auction end. Seeing $5<$10, the server FULFILLS the payment from Person B to Person A for $5, and leaves the other payment unfulfilled

Such a setup through API has only become possible in the past few years with something like Stripe Marketplace. The setup still leaves a lot to be desired.

- KYC requires a manual form submission through Stripe (~10-20minutes). The friction prevents this site from growing organically, as a 20 minute onboarding is unworkable. This could be fixed by a payment rail which is KYC compliant ON THE RAIL itself. Payment senders / receivers both have IDs attached, and any 3rd party simply has to embed a "Pay with XYZ" and know all senders will
- Long settlement times for card payments open abuse vectors for cancelled payments. This could be fixed by using bank transfers instead of card networks.
- Card fees are diabolical. 3%+ $.30 is insanity.
- Conditional flows and custom logic. The whole setup of "both parties click pay and then the server only captures one" is not ideal. It's confusing— you're not really "paying" but "authorizing payment". Customers will see a "pending" transaction on their bank statement for the next week before the authorized payment expires.

This experience taught me that payments suck. The ideal payment rail does:

- Instant bank transfers as payments (no card networks, settlement time)
- 1% fee or lower.
- KYC / KYB on the payment rail. Merchants and marketplaces don't need to verify / collect user identification.
- Conditional logic on the payment rail. Automatic loyalty rewards set by a retailer? Happens automatically. Auctions with only one payment captured? Happens automatically.

Hopefully coming soon.
