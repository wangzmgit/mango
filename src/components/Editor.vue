<template>
  <div id="container"></div>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";

export default {
  props:{
    keywords: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      editor: null, //文本编辑器
    };
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      monaco.languages.register({ id: "mongodb" });

      //设置语法token
      monaco.languages.setMonarchTokensProvider("mongodb", {
        tokenizer: {
          root: [
            [/\b(db|use|show)\b/, "custom-field"], //一些关键字
            [/\b(dropDatabase)\b/, "custom-func"], //数据库相关
            [
              /\b(createCollection|getCollectionNames|renameCollection|drop)\b/,
              "custom-func",
            ], //集合相关
            [/\b(insert|insertOne|insertMany)\b/, "custom-func"], //插入文档
            [/\b(update|save)\b/, "custom-func"], //修改文档
            [/\b(remove|deleteOne|deleteMany)\b/, "custom-func"], //删除文档
            [/\b(find|findOne)\b/, "custom-func"], //查询文档
            [/\b(limit|pretty|skip|sort)\b/, "custom-field"], //查询条件
            [/\$[a-z]+/, "custom-field"],
            [/\"([^\"]*)\"/,"custom-string"],//双引号内容
            [/'([^\"]*)'/,"custom-string"]//单引号内容
          ],
        },
      });

      //设置主题
      monaco.editor.defineTheme("mango", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "custom-func", foreground: "#f5b549", fontStyle: "bold" },
          { token: "custom-field", foreground: "#55b4d4", fontStyle: "bold" },
          { token: "custom-string", foreground: "#86b351" },
        ],
      });
      monaco.editor.defineTheme("mango-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "custom-func", foreground: "#ffd173", fontStyle: "bold" },
          { token: "custom-field", foreground: "#5ccfe6", fontStyle: "bold" },
          { token: "custom-string", foreground: "#d5f15e" },
        ],
      });
      // 初始化编辑器，确保dom已经渲染
      this.editor = monaco.editor.create(document.getElementById("container"), {
        value: "", //编辑器初始显示文字
        language: "mongodb", //语言支持自行查阅demo
        automaticLayout: true, //自动布局
        theme: "mango", //官方自带三种主题vs, hc-black, or vs-dark
      });
      monaco.languages.setLanguageConfiguration("mongodb", {
        brackets: [
          ["{", "}"],
          ["[", "]"],
          ["(", ")"],
        ],
        autoClosingPairs: [
          { open: "{", close: "}" },
          { open: "[", close: "]" },
          { open: "(", close: ")" },
          { open: "'", close: "'", notIn: ["string", "comment"] },
          { open: '"', close: '"', notIn: ["string", "comment"] },
        ],
      });
      //代码补全
      const commonKeyword = ["db", "dbs","show"];
      const dollarKeyword = ["all", "or", "in", "gt", "gte", "lt", "lte", "ne"];
      const dotKeyword = [
        "insert",
        "update",
        "remove",
        "find",
        "pretty",
        "limit",
        "skip",
        "sort",
        "drop",
        "createCollection",
        "getCollectionNames",
        "renameCollection",
        "insertOne",
        "insertMany",
        "save",
        "deleteOne",
        "deleteMany",
        "findOne",
        "dropDatabase",
      ];
      
      monaco.languages.registerCompletionItemProvider("mongodb", {
        provideCompletionItems: (model, position) => {
          const line = position.lineNumber; // 当前行数
          const column = position.column; // 当前列数
          const content = model.getLineContent(line); // 当前行全部内容
          const sym = content[column - 2]; // 通过下标来获取当前光标后一个内容，即为刚输入的内容

          let suggestions = [];
          if (sym === "$") {
            suggestions = dollarKeyword.map((item) => {
              return {
                label: `\$${item}`,
                kind: monaco.languages.CompletionItemKind.Enum,
                insertText: item,
              };
            });
          } else if (sym === ".") {
            suggestions = dotKeyword.map((item) => {
              return {
                label: item,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: item,
              };
            });
          } else {
            // let keywords = this.keywords.concat(commonKeyword)
            suggestions = commonKeyword.map((item) => {
              return {
                label: item,
                kind: monaco.languages.CompletionItemKind.Enum,
                insertText: item, 
              };
            });
          }
          return { suggestions };
        },
        triggerCharacters: ["$", "."], // 触发语法推荐的提示符
      });
    },
    changeTheme(name) {
      monaco.editor.setTheme(name);
    },
    getValue() {
      return this.editor.getValue(); //获取编辑器中的文本
    },
    destroyEditor() {
      this.editor.dispose();
    }
  },
};
</script>

<style>
#container {
  height: 100%;
}
</style>