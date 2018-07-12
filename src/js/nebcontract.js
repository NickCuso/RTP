const neb = require("./hardlyNeb");

export default 
{
  getMessage(topic)
  {
    return new Promise((resolve, reject) =>
    {
      neb.nebReadAnon("getMessage", [topic], resolve, reject);
    });
  },
  setMessage(topic, comment, onTxPosted)
  {
    return new Promise((resolve, reject) =>
    {
      neb.nebWrite("setMessage", [topic, comment], onTxPosted, 0, resolve, reject);
    })
  },
}