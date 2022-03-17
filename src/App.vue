<template>
  <div id="app">
    <header-bar></header-bar>
    <editor :keywords="keywords" ref="editor" />
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import Editor from "./components/Editor.vue";

export default {
  name: "Mango",
  data() {
    return {
      keywords: [],
    };
  },
  components: {
    editor: Editor,
    "header-bar": HeaderBar,
  },
  methods: {
    setTheme(name) {
      this.$refs.editor.changeTheme(name);
    },
    setKeywords(keywords) {
      this.keywords = keywords;
    },
    copy() {
      let content = this.$refs.editor.getValue();
      this.$copyText(content).then(() => {
        this.$notification.open({
          message: "复制成功",
          description: "已将内容添加到粘贴板",
        });
      });
    },
  },
  beforeDestroy() {
    this.$refs.editor.destroyEditor();
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  min-width: 600px;
}

#app {
  width: 100%;
  top: 0;
  bottom: 0;
  position: fixed;
}
</style>
