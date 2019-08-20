$(function() {
  var publicToken = "d14b07e8ba00172dc3da99554833254e1ddb03565b13149b9fc3e7ce6a19f254";

  var client = Tremendous(publicToken, {
    domain: Tremendous.domains.SANDBOX
  });

  function redeem(campaignId, denomination) {
    function _redeem(e) {
      e.preventDefault();

      var order = {
        payment: {
          funding_source_id: "TXVVL0RW62CO",
        },
        reward: {
          value: {
            denomination: denomination,
            currency_code: "USD"
          },
          campaign_id: campaignId,
          recipient: {}
        }
      }

      client.reward.create(
        order,
        {
          onLoad: function() {
            console.log("It Loaded");
          },
          onExit: function() {
            console.log("It Closed");
          },
          onError: function(err) {
            console.log(err);
          },
          onRedeem: function(encodedReward) {
            // Send this JWT encoded token to backend
            // decode it and approve the reward via the APPROVE REST endpoint.
            console.log(encodedReward);
          }
        }
      );
    }

    return _redeem;
  }

  $("#engineer-reward").on("click", redeem("A48BKQV3A2NV", 50));
  $("#sales-reward").on("click", redeem("A48BKQV3A2NV", 500));
  $("#app-reward").on("click", redeem("A48BKQV3A2NV", 50));

});
