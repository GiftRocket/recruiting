$(function() {
  var publicToken = "eb1c6870dd97aea71ad7765bb53ac90c9253fba802932d545054fef506c08cc1";

  var client = Tremendous(publicToken, {
    domain: Tremendous.domains.PRODUCTION
  });

  function redeem(campaignId, denomination) {
    function _redeem(e) {
      e.preventDefault();

      var order = {
        payment: {
          funding_source_id: "BCV4GLLT3ZIN",
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

  $("#engineer-reward").on("click", redeem("UZKCHMGFEPUL", 50));
  $("#sales-reward").on("click", redeem("N0VCOI536FH5", 500));
  $("#app-reward").on("click", redeem("A48BKQV3A2NV", 50));

});
