<template>
    <h1>
        Loading
              <span class="ellipse">{{ellipse}}</span>
    </h1>
</template>

<script>
let interval = null;
export default 
{
    data() 
    {
      return {
        ellipse: "",
      }
    },
   mounted()
   {
       let tick_count = 0;
       interval = setInterval(() =>
       {
            tick_count++;
            this.ellipse = "";
            let dot_count = tick_count % 4;
            for(let i = 0; i < dot_count; i++)
            {
                this.ellipse += ".";
            }
            if(tick_count == 25)
            {
                location.reload();
            }
       }, 500);        
   },
   destroyed()
   {
       clearInterval(interval);
   }
}
</script>
<style scoped>

</style>