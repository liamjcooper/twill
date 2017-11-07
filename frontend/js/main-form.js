// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store'

// Plugins
import A17Config from '@/plugins/A17Config'

// Page Components
import a17StickyNav from '@/components/StickyNav.vue'
import a17Fieldset from '@/components/Fieldset.vue'
import a17Publisher from '@/components/Publisher.vue'
import a17Content from '@/components/Content.vue'
import a17Repeater from '@/components/Repeater.vue'
import a17LocationField from '@/components/LocationField.vue'
import a17Slideshow from '@/components/Slideshow.vue'

// Specific children components for page
// Blocks Components
import a17Quote from '@/components/blocks/Quote.vue'
import a17Video from '@/components/blocks/Video.vue'
import a17Bodytext from '@/components/blocks/Bodytext.vue'

// Media Library
import a17MediaLibrary from '@/components/media-library/MediaLibrary.vue'

// Browser
import a17Browser from '@/components/Browser.vue'

// Previewer
import a17Previewer from '@/components/Previewer.vue'

// configuration
Vue.use(A17Config)

// Blocks
Vue.component('a17-quote', a17Quote)
Vue.component('a17-video', a17Video)
Vue.component('a17-bodytext', a17Bodytext)

// Media Library
Vue.component('a17-medialibrary', a17MediaLibrary)

// Browser
Vue.component('a17-browser', a17Browser)

// Preview
Vue.component('a17-previewer', a17Previewer)

/* eslint-disable no-new */
/* eslint no-unused-vars: "off" */
Window.vm = new Vue({
  store, // inject store to all children
  el: '#app',
  components: {
    'a17-sticky-nav': a17StickyNav,
    'a17-fieldset': a17Fieldset,
    'a17-content': a17Content,
    'a17-repeater': a17Repeater,
    'a17-publisher': a17Publisher,
    'a17-locationfield': a17LocationField,
    'a17-slideshow': a17Slideshow
  },
  data: function () {
    return {
      unSubscribe: function () {
        return null
      },
      isFormUpdate: false
    }
  },
  methods: {
    confirmExit: function (event) {
      if (!this.isFormUpdate) {
        if (window.event !== undefined) window.event.cancelBubble = true
        else event.cancelBubble = true
      } else { return 'message' }
    }
  },
  mounted: function () {
    // Form : confirm exit or lock panel if form is changed
    window.onbeforeunload = this.confirmExit

    // Subscribe to store mutation
    this.unSubscribe = this.$store.subscribe((mutation, state) => {
      this.isFormUpdate = true
    })
  },
  watch: {
    'isFormUpdate': function (newVal) {
      if (newVal) this.unSubscribe()
    }
  },
  beforeDestroy: function () {
    this.unSubscribe()
  }
})
