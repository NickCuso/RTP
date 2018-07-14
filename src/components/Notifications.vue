<template>
    <div class="notifications-container">
        <div v-for="(notification, index) in $root.notifications" class="notification glow-1" v-bind:key="index" @click="removeNotification(index)">
            <p v-if="notification.title" class="title">{{notification.title}}</p>
            <p v-if="notification.message" class="message">{{notification.message.toString()}}</p>
            <a onclick="event.stopPropagation();" target="_blank" v-if="notification.href" :href="notification.href">
                <button class="btn btn-sm btn-primary">
                    {{notification.href_text}}
                </button>
            </a>
        </div>
    </div>
</template>

<script>
// TODO show the view in block explorer link
  export default {
    data()
    {
      return {
        removed: false,
        interval : 100,
        default_time : 10000 //10 seconds
      }
    },
    methods: 
    {
      removeNotification(index)
      {
        this.$root.notifications.splice(index, 1);
      },
      tick()
      {
        if(this.removed)
        {
            return;
        }

        while(this.$root.notifications.length > 1)
        {
          this.$root.notifications.splice(0,1);
        }

        for(let i = this.$root.notifications.length -1; i>=0; i--)
        {
          if(!this.$root.notifications[i].count)
            this.$root.notifications[i].count = 0;
          this.$root.notifications[i].count++;

          if(!this.$root.notifications[i].no_auto_remove &&  this.$root.notifications[i].count * this.interval > this.default_time)
            this.$root.notifications.splice(i,1);
        }

        setTimeout(this.tick, this.interval);
      }
    },
    mounted()
    {
      this.tick();
    },
    destroyed()
    {
      this.removed = true;
    }

  }
</script>

<style scoped>
    @keyframes notification-slide{
        0%   {
            top:-155px;
        }
        100% {
            top:0;
        }
    }

    .title{
        font-size: 1.2em;
    }
    .message{
        font-size:0.9em;
    }

    .notifications-container{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index:125;
        pointer-events:none;
    }
    .notification{
        display:flex;
        flex-direction: column;
        justify-content: space-around;

        animation-name:notification-slide;
        animation-duration:1s;

        position:relative;
        left:5px;
        width:300px;
        height:150px;
        margin-top:5px;
        pointer-events:all;
    }
    .notification > *{
        margin:0;
        padding:0;
    }
</style>