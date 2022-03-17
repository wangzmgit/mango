<template>
  <div class="header">
    <div class="header-box">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo" />
        <div class="logo-title">
          <p>MongoDB</p>
          <p>在线编辑器</p>
        </div>
      </div>
      <div class="header-options">
        <button class="theme-btn" @click="setTheme()">{{ themeText }}</button>
        <!-- <button class="word-btn" @click="customizeWord()">自定义提示词</button> -->
        <button class="copy-btn" @click="copy()">一键复制</button>
      </div>
    </div>
    <a-modal v-model="visible" title="添加关键词">
      <a-input v-model="keywords" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"  placeholder="请输入自定义提示词，回车分割" />
      <template slot="footer">
        <a-button @click="visible = false"> 取消 </a-button>
        <a-button type="primary" @click="setKeywords()"> 确定 </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "mango",
      themeText: "深色",
      visible: false,
      keywords: "",
    };
  },
  methods: {
    setTheme() {
      if (this.theme === "mango") {
        this.theme = "mango-dark";
        this.themeText = "浅色";
      } else {
        this.theme = "mango";
        this.themeText = "深色";
      }
      localStorage.setItem("theme",this.theme);
      this.$parent.setTheme(this.theme);
    },
    customizeWord() {
      this.visible = true;
    },
    // setKeywords() {
    //   let keywords = this.keywords.split("\n");
    //   this.$parent.setKeywords(keywords);
    // },
    copy() {
      this.$parent.copy();
    }
  },
  created() {
    let theme = localStorage.getItem("theme");
    if (theme === "mango-dark"){
      this.theme = theme;
      this.themeText = "浅色"
      this.$nextTick(() =>{
        this.$parent.setTheme(theme);
      })
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  min-width: 600px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 3px #c8c8c8;
  -moz-box-shadow: 0px 0px 3px #c8c8c8;
  box-shadow: 0px 0px 3px #c8c8c8;
}

.header-box {
  margin: 0 50px;
  padding-top: 5px;
  /* width: 1200px; */
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 160px;
}

.logo-title > p {
  margin: 0;
}

.logo img {
  width: 50px;
}

.header-options {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
}

.theme-btn {
  width: 60px;
  height: 26px;
  background-color: #fff;
  color: #faac28;
  border-radius: 6px;
  border: 1px solid #faac28;
}

.copy-btn {
  width: 80px;
  height: 26px;
  margin: 0 20px;
  background-color: #fff;
  color: #229857;
  border-radius: 6px;
  border: 1px solid #229857;
}
</style>