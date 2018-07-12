var Contract = function() 
{
  LocalContractStorage.defineMapProperty(this, "topic_to_message"); 
  LocalContractStorage.defineProperty(this, "owner_addr");
}
Contract.prototype = 
{
  init: function() 
  {
    this.owner_addr = Blockchain.transaction.from;
  },

  isOwner: function()
  {
    return this.owner_addr == Blockchain.transaction.from;
  },
  
  changeOwner: function(new_owner_addr)
  {
    assert(this.isOwner(), "This is an owner only call.");
    assert(new_owner_addr != null, "Missing new address");

    this.owner_addr = new_owner_addr;
  },

  setMessage: function(topic, message)
  {
    assert(this.isOwner(), "This is an owner only call.");
    this.topic_to_message.put(topic, message);
  },

  getMessage: function(topic)
  {
    return this.topic_to_message.get(topic);
  }
}

module.exports = Contract

//#region Helpers
function assert(value, message)
{
  if(!value)
  {
    throw new Error("Failed assert: " + message);
  }
}
//#endregion
