<template>
  <div class="home">
    <video id="my-video1" class="video-js vjs-default-skin" controls preload="auto" height="300px">
      <source src="/api/index.m3u8" type="application/x-mpegURL" />
    </video>
    <video id="my-video2" class="video-js vjs-default-skin" controls preload="auto" height="300px">
      <source src="/api/index.m3u8" type="application/x-mpegURL" />
    </video>
    <video id="my-video3" class="video-js vjs-default-skin" controls preload="auto" height="300px">
      <source src="/api/index.m3u8" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script>
import videojs from "video.js";
import "videojs-contrib-hls";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      videoPlayer1: null,
      videoPlayer2: null,
      videoPlayer3: null,
    };
  },
  methods: {
    getVideo() {
      this.videoPlayer1 = videojs("my-video1", {
        muted: true,
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
      });
      this.videoPlayer2 = videojs("my-video2", {
        muted: true,
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
      });
      this.videoPlayer3 = videojs("my-video3", {
        muted: true,
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
      });
    },
    dispose() {
      this.videoPlayer.dispose();
    },
    toogleMuted() {
      this.videoPlayer.muted(!this.videoPlayer.muted());
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getVideo();
      this.videoPlayer1.play();
      this.videoPlayer2.play();
      this.videoPlayer3.play();
    });
  },
  beforeDestroy() {
    this.dispose();
  },
};
</script>
<style lang="scss">
.home {
  display: flex;
}
.video-js {
  margin: 0 10px 0 0;
}
</style>
