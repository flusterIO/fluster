
export default [
  {
    "title": "Developer Documentation",
    "content": "Fluster was built extensibility being one of the primary concerns. Fluster provides a set of API's in typescript, Rust, Go and Python for you to build all of the tools necessary to make Fluster fit your workflow. This is made possible by the FFI/Rust ecosystem, meaning that your tools will execute Rust no matter the language you choose.\n\nWhile providing these API's to the developer community is a priority, I'm choosing to focus my attention to internal tools first. The architecture is in place to quickly generate these API's, but for now I will return to this when the core functionality of the application is out of $\\beta$.\n\n\nPlease be patient with my while I do my best to catch up on the documentation, and if you really want to speed up the process, consider becoming a sponsor! Nothing slows down progress more than being homeless in the middle of summer.",
    "_meta": {
      "filePath": "developer/index.mdx",
      "fileName": "index.mdx",
      "directory": "developer",
      "extension": "mdx",
      "path": "developer"
    },
    "toc": [],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "Fluster was built extensibility being one of the primary concerns. Fluster provides a set of API's in typescript, Rust, Go and Python for you to build all of the tools necessary to make Fluster fit your workflow. This is made possible by the FFI/Rust ecosystem, meaning that your tools will execute Rust no matter the language you choose."
        },
        {
          "heading": "",
          "content": "While providing these API's to the developer community is a priority, I'm choosing to focus my attention to internal tools first. The architecture is in place to quickly generate these API's, but for now I will return to this when the core functionality of the application is out of \\beta."
        },
        {
          "heading": "",
          "content": "Please be patient with my while I do my best to catch up on the documentation, and if you really want to speed up the process, consider becoming a sponsor! Nothing slows down progress more than being homeless in the middle of summer."
        }
      ],
      "headings": []
    },
    "body": "var Component=(()=>{var x=Object.create;var i=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var J=(t,n)=>()=>(n||t((n={exports:{}}).exports,n),n.exports),E=(t,n)=>{for(var o in n)i(t,o,{get:n[o],enumerable:!0})},r=(t,n,o,e)=>{if(n&&typeof n==\"object\"||typeof n==\"function\")for(let f of M(n))!y.call(t,f)&&f!==o&&i(t,f,{get:()=>n[f],enumerable:!(e=h(n,f))||e.enumerable});return t};var T=(t,n,o)=>(o=t!=null?x(j(t)):{},r(n||!t||!t.__esModule?i(o,\"default\",{value:t,enumerable:!0}):o,t)),u=t=>r(i({},\"__esModule\",{value:!0}),t);var l=J((d,m)=>{m.exports=_jsx_runtime});var p={};E(p,{default:()=>s});var a=T(l());function c(t){let n={\"mjx-c\":\"mjx-c\",\"mjx-container\":\"mjx-container\",\"mjx-math\":\"mjx-math\",\"mjx-mi\":\"mjx-mi\",p:\"p\",style:\"style\",...t.components},o=n[\"mjx-c\"],e=n[\"mjx-container\"],f=n[\"mjx-math\"],X=n[\"mjx-mi\"];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:\"Fluster was built extensibility being one of the primary concerns. Fluster provides a set of API's in typescript, Rust, Go and Python for you to build all of the tools necessary to make Fluster fit your workflow. This is made possible by the FFI/Rust ecosystem, meaning that your tools will execute Rust no matter the language you choose.\"}),`\n`,(0,a.jsxs)(n.p,{children:[\"While providing these API's to the developer community is a priority, I'm choosing to focus my attention to internal tools first. The architecture is in place to quickly generate these API's, but for now I will return to this when the core functionality of the application is out of \",(0,a.jsx)(e,{className:\"MathJax\",jax:\"CHTML\",children:(0,a.jsx)(f,{className:\"MJX-TEX\",children:(0,a.jsx)(X,{className:\"mjx-i\",children:(0,a.jsx)(o,{className:\"mjx-c1D6FD TEX-I\"})})})}),\".\"]}),`\n`,(0,a.jsx)(n.p,{children:\"Please be patient with my while I do my best to catch up on the documentation, and if you really want to speed up the process, consider becoming a sponsor! Nothing slows down progress more than being homeless in the middle of summer.\"}),(0,a.jsx)(n.style,{children:`\nmjx-container[jax=\"CHTML\"] {\n  line-height: 0;\n}\n\nmjx-container [space=\"1\"] {\n  margin-left: .111em;\n}\n\nmjx-container [space=\"2\"] {\n  margin-left: .167em;\n}\n\nmjx-container [space=\"3\"] {\n  margin-left: .222em;\n}\n\nmjx-container [space=\"4\"] {\n  margin-left: .278em;\n}\n\nmjx-container [space=\"5\"] {\n  margin-left: .333em;\n}\n\nmjx-container [rspace=\"1\"] {\n  margin-right: .111em;\n}\n\nmjx-container [rspace=\"2\"] {\n  margin-right: .167em;\n}\n\nmjx-container [rspace=\"3\"] {\n  margin-right: .222em;\n}\n\nmjx-container [rspace=\"4\"] {\n  margin-right: .278em;\n}\n\nmjx-container [rspace=\"5\"] {\n  margin-right: .333em;\n}\n\nmjx-container [size=\"s\"] {\n  font-size: 70.7%;\n}\n\nmjx-container [size=\"ss\"] {\n  font-size: 50%;\n}\n\nmjx-container [size=\"Tn\"] {\n  font-size: 60%;\n}\n\nmjx-container [size=\"sm\"] {\n  font-size: 85%;\n}\n\nmjx-container [size=\"lg\"] {\n  font-size: 120%;\n}\n\nmjx-container [size=\"Lg\"] {\n  font-size: 144%;\n}\n\nmjx-container [size=\"LG\"] {\n  font-size: 173%;\n}\n\nmjx-container [size=\"hg\"] {\n  font-size: 207%;\n}\n\nmjx-container [size=\"HG\"] {\n  font-size: 249%;\n}\n\nmjx-container [width=\"full\"] {\n  width: 100%;\n}\n\nmjx-box {\n  display: inline-block;\n}\n\nmjx-block {\n  display: block;\n}\n\nmjx-itable {\n  display: inline-table;\n}\n\nmjx-row {\n  display: table-row;\n}\n\nmjx-row > * {\n  display: table-cell;\n}\n\nmjx-mtext {\n  display: inline-block;\n}\n\nmjx-mstyle {\n  display: inline-block;\n}\n\nmjx-merror {\n  display: inline-block;\n  color: red;\n  background-color: yellow;\n}\n\nmjx-mphantom {\n  visibility: hidden;\n}\n\n_::-webkit-full-page-media, _:future, :root mjx-container {\n  will-change: opacity;\n}\n\nmjx-math {\n  display: inline-block;\n  text-align: left;\n  line-height: 0;\n  text-indent: 0;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 100%;\n  font-size-adjust: none;\n  letter-spacing: normal;\n  border-collapse: collapse;\n  word-wrap: normal;\n  word-spacing: normal;\n  white-space: nowrap;\n  direction: ltr;\n  padding: 1px 0;\n}\n\nmjx-container[jax=\"CHTML\"][display=\"true\"] {\n  display: block;\n  text-align: center;\n  margin: 1em 0;\n}\n\nmjx-container[jax=\"CHTML\"][display=\"true\"][width=\"full\"] {\n  display: flex;\n}\n\nmjx-container[jax=\"CHTML\"][display=\"true\"] mjx-math {\n  padding: 0;\n}\n\nmjx-container[jax=\"CHTML\"][justify=\"left\"] {\n  text-align: left;\n}\n\nmjx-container[jax=\"CHTML\"][justify=\"right\"] {\n  text-align: right;\n}\n\nmjx-mi {\n  display: inline-block;\n  text-align: left;\n}\n\nmjx-c {\n  display: inline-block;\n}\n\nmjx-utext {\n  display: inline-block;\n  padding: .75em 0 .2em 0;\n}\n\nmjx-c::before {\n  display: block;\n  width: 0;\n}\n\n.MJX-TEX {\n  font-family: MJXZERO, MJXTEX;\n}\n\n.TEX-B {\n  font-family: MJXZERO, MJXTEX-B;\n}\n\n.TEX-I {\n  font-family: MJXZERO, MJXTEX-I;\n}\n\n.TEX-MI {\n  font-family: MJXZERO, MJXTEX-MI;\n}\n\n.TEX-BI {\n  font-family: MJXZERO, MJXTEX-BI;\n}\n\n.TEX-S1 {\n  font-family: MJXZERO, MJXTEX-S1;\n}\n\n.TEX-S2 {\n  font-family: MJXZERO, MJXTEX-S2;\n}\n\n.TEX-S3 {\n  font-family: MJXZERO, MJXTEX-S3;\n}\n\n.TEX-S4 {\n  font-family: MJXZERO, MJXTEX-S4;\n}\n\n.TEX-A {\n  font-family: MJXZERO, MJXTEX-A;\n}\n\n.TEX-C {\n  font-family: MJXZERO, MJXTEX-C;\n}\n\n.TEX-CB {\n  font-family: MJXZERO, MJXTEX-CB;\n}\n\n.TEX-FR {\n  font-family: MJXZERO, MJXTEX-FR;\n}\n\n.TEX-FRB {\n  font-family: MJXZERO, MJXTEX-FRB;\n}\n\n.TEX-SS {\n  font-family: MJXZERO, MJXTEX-SS;\n}\n\n.TEX-SSB {\n  font-family: MJXZERO, MJXTEX-SSB;\n}\n\n.TEX-SSI {\n  font-family: MJXZERO, MJXTEX-SSI;\n}\n\n.TEX-SC {\n  font-family: MJXZERO, MJXTEX-SC;\n}\n\n.TEX-T {\n  font-family: MJXZERO, MJXTEX-T;\n}\n\n.TEX-V {\n  font-family: MJXZERO, MJXTEX-V;\n}\n\n.TEX-VB {\n  font-family: MJXZERO, MJXTEX-VB;\n}\n\nmjx-stretchy-v mjx-c, mjx-stretchy-h mjx-c {\n  font-family: MJXZERO, MJXTEX-S1, MJXTEX-S4, MJXTEX, MJXTEX-A ! important;\n}\n\n@font-face /* 0 */ {\n  font-family: MJXZERO;\n  src: url(\"/font/mathjax/MathJax_Zero.woff\") format(\"woff\");\n}\n\n@font-face /* 1 */ {\n  font-family: MJXTEX;\n  src: url(\"/font/mathjax/MathJax_Main-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 2 */ {\n  font-family: MJXTEX-B;\n  src: url(\"/font/mathjax/MathJax_Main-Bold.woff\") format(\"woff\");\n}\n\n@font-face /* 3 */ {\n  font-family: MJXTEX-I;\n  src: url(\"/font/mathjax/MathJax_Math-Italic.woff\") format(\"woff\");\n}\n\n@font-face /* 4 */ {\n  font-family: MJXTEX-MI;\n  src: url(\"/font/mathjax/MathJax_Main-Italic.woff\") format(\"woff\");\n}\n\n@font-face /* 5 */ {\n  font-family: MJXTEX-BI;\n  src: url(\"/font/mathjax/MathJax_Math-BoldItalic.woff\") format(\"woff\");\n}\n\n@font-face /* 6 */ {\n  font-family: MJXTEX-S1;\n  src: url(\"/font/mathjax/MathJax_Size1-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 7 */ {\n  font-family: MJXTEX-S2;\n  src: url(\"/font/mathjax/MathJax_Size2-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 8 */ {\n  font-family: MJXTEX-S3;\n  src: url(\"/font/mathjax/MathJax_Size3-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 9 */ {\n  font-family: MJXTEX-S4;\n  src: url(\"/font/mathjax/MathJax_Size4-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 10 */ {\n  font-family: MJXTEX-A;\n  src: url(\"/font/mathjax/MathJax_AMS-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 11 */ {\n  font-family: MJXTEX-C;\n  src: url(\"/font/mathjax/MathJax_Calligraphic-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 12 */ {\n  font-family: MJXTEX-CB;\n  src: url(\"/font/mathjax/MathJax_Calligraphic-Bold.woff\") format(\"woff\");\n}\n\n@font-face /* 13 */ {\n  font-family: MJXTEX-FR;\n  src: url(\"/font/mathjax/MathJax_Fraktur-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 14 */ {\n  font-family: MJXTEX-FRB;\n  src: url(\"/font/mathjax/MathJax_Fraktur-Bold.woff\") format(\"woff\");\n}\n\n@font-face /* 15 */ {\n  font-family: MJXTEX-SS;\n  src: url(\"/font/mathjax/MathJax_SansSerif-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 16 */ {\n  font-family: MJXTEX-SSB;\n  src: url(\"/font/mathjax/MathJax_SansSerif-Bold.woff\") format(\"woff\");\n}\n\n@font-face /* 17 */ {\n  font-family: MJXTEX-SSI;\n  src: url(\"/font/mathjax/MathJax_SansSerif-Italic.woff\") format(\"woff\");\n}\n\n@font-face /* 18 */ {\n  font-family: MJXTEX-SC;\n  src: url(\"/font/mathjax/MathJax_Script-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 19 */ {\n  font-family: MJXTEX-T;\n  src: url(\"/font/mathjax/MathJax_Typewriter-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 20 */ {\n  font-family: MJXTEX-V;\n  src: url(\"/font/mathjax/MathJax_Vector-Regular.woff\") format(\"woff\");\n}\n\n@font-face /* 21 */ {\n  font-family: MJXTEX-VB;\n  src: url(\"/font/mathjax/MathJax_Vector-Bold.woff\") format(\"woff\");\n}\n\nmjx-c.mjx-c1D6FD.TEX-I::before {\n  padding: 0.705em 0.566em 0.194em 0;\n  content: \"\\\\3B2\";\n}\n`})]})}function s(t={}){let{wrapper:n}=t.components||{};return n?(0,a.jsx)(n,{...t,children:(0,a.jsx)(c,{...t})}):c(t)}return u(p);})();\n;return Component;"
  },
  {
    "title": "Front Matter",
    "content": "# Front Matter\n\nMdx incorporates the notion of _front matter_, a section of _usually_ arbitrary [yaml](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html). Fluster defines a specific set of front matter fields that you can use to customize the way Fluster handles your notes.\n\n\n| Field | Description | Type |\n| ----- | ----------- | ---- |\n| title | This is used inside of search results. If none is found, Fluster will attempt to derive one from your file's content. | `String?` |\n| summary | A brief summary of the note that is displayed among search results and utilized by Fluster's AI. | `String?` |\n| id | Any unique string, so long as it doesn't have any white space that identifies this note. This can be used to link to this note using the `[](noteId:xyz` syntax. | `String?` | \n| tags | Add tags to your front matter as well as inside of your note. How you apply them is up to you. You can use the `FrontMatterTags` component to show these tags inside of your note, but the navigation will work regardless of whether or not they are visible. | `[]String?` |\n| subject | Set subjects in your front matter as well as through smart filters. |  `String?` |\n| topic | Set topics in your front matter as well as through smart filters. | `String?` |",
    "_meta": {
      "filePath": "user/front_matter.mdx",
      "fileName": "front_matter.mdx",
      "directory": "user",
      "extension": "mdx",
      "path": "user/front_matter"
    },
    "toc": [
      {
        "title": "Front Matter",
        "url": "#front-matter",
        "depth": 1
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "front-matter",
          "content": "Mdx incorporates the notion of front matter, a section of usually arbitrary yaml. Fluster defines a specific set of front matter fields that you can use to customize the way Fluster handles your notes."
        },
        {
          "heading": "front-matter",
          "content": "Field"
        },
        {
          "heading": "front-matter",
          "content": "Description"
        },
        {
          "heading": "front-matter",
          "content": "Type"
        },
        {
          "heading": "front-matter",
          "content": "title"
        },
        {
          "heading": "front-matter",
          "content": "This is used inside of search results. If none is found, Fluster will attempt to derive one from your file's content."
        },
        {
          "heading": "front-matter",
          "content": "String?"
        },
        {
          "heading": "front-matter",
          "content": "summary"
        },
        {
          "heading": "front-matter",
          "content": "A brief summary of the note that is displayed among search results and utilized by Fluster's AI."
        },
        {
          "heading": "front-matter",
          "content": "String?"
        },
        {
          "heading": "front-matter",
          "content": "id"
        },
        {
          "heading": "front-matter",
          "content": "Any unique string, so long as it doesn't have any white space that identifies this note. This can be used to link to this note using the [](noteId:xyz syntax."
        },
        {
          "heading": "front-matter",
          "content": "String?"
        },
        {
          "heading": "front-matter",
          "content": "tags"
        },
        {
          "heading": "front-matter",
          "content": "Add tags to your front matter as well as inside of your note. How you apply them is up to you. You can use the FrontMatterTags component to show these tags inside of your note, but the navigation will work regardless of whether or not they are visible."
        },
        {
          "heading": "front-matter",
          "content": "[]String?"
        },
        {
          "heading": "front-matter",
          "content": "subject"
        },
        {
          "heading": "front-matter",
          "content": "Set subjects in your front matter as well as through smart filters."
        },
        {
          "heading": "front-matter",
          "content": "String?"
        },
        {
          "heading": "front-matter",
          "content": "topic"
        },
        {
          "heading": "front-matter",
          "content": "Set topics in your front matter as well as through smart filters."
        },
        {
          "heading": "front-matter",
          "content": "String?"
        }
      ],
      "headings": [
        {
          "id": "front-matter",
          "content": "Front Matter"
        }
      ]
    },
    "body": "var Component=(()=>{var u=Object.create;var d=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty;var g=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),b=(n,e)=>{for(var r in e)d(n,r,{get:e[r],enumerable:!0})},s=(n,e,r,o)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let i of f(e))!p.call(n,i)&&i!==r&&d(n,i,{get:()=>e[i],enumerable:!(o=m(e,i))||o.enumerable});return n};var w=(n,e,r)=>(r=n!=null?u(y(n)):{},s(e||!n||!n.__esModule?d(r,\"default\",{value:n,enumerable:!0}):r,n)),x=n=>s(d({},\"__esModule\",{value:!0}),n);var l=g((_,h)=>{h.exports=_jsx_runtime});var F={};b(F,{default:()=>a});var t=w(l());function c(n){let e={a:\"a\",code:\"code\",em:\"em\",h1:\"h1\",p:\"p\",table:\"table\",tbody:\"tbody\",td:\"td\",th:\"th\",thead:\"thead\",tr:\"tr\",...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:\"front-matter\",children:\"Front Matter\"}),`\n`,(0,t.jsxs)(e.p,{children:[\"Mdx incorporates the notion of \",(0,t.jsx)(e.em,{children:\"front matter\"}),\", a section of \",(0,t.jsx)(e.em,{children:\"usually\"}),\" arbitrary \",(0,t.jsx)(e.a,{href:\"https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html\",children:\"yaml\"}),\". Fluster defines a specific set of front matter fields that you can use to customize the way Fluster handles your notes.\"]}),`\n`,(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:\"Field\"}),(0,t.jsx)(e.th,{children:\"Description\"}),(0,t.jsx)(e.th,{children:\"Type\"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:\"title\"}),(0,t.jsx)(e.td,{children:\"This is used inside of search results. If none is found, Fluster will attempt to derive one from your file's content.\"}),(0,t.jsx)(e.td,{children:(0,t.jsx)(e.code,{children:\"String?\"})})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:\"summary\"}),(0,t.jsx)(e.td,{children:\"A brief summary of the note that is displayed among search results and utilized by Fluster's AI.\"}),(0,t.jsx)(e.td,{children:(0,t.jsx)(e.code,{children:\"String?\"})})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:\"id\"}),(0,t.jsxs)(e.td,{children:[\"Any unique string, so long as it doesn't have any white space that identifies this note. This can be used to link to this note using the \",(0,t.jsx)(e.code,{children:\"[](noteId:xyz\"}),\" syntax.\"]}),(0,t.jsx)(e.td,{children:(0,t.jsx)(e.code,{children:\"String?\"})})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:\"tags\"}),(0,t.jsxs)(e.td,{children:[\"Add tags to your front matter as well as inside of your note. How you apply them is up to you. You can use the \",(0,t.jsx)(e.code,{children:\"FrontMatterTags\"}),\" component to show these tags inside of your note, but the navigation will work regardless of whether or not they are visible.\"]}),(0,t.jsx)(e.td,{children:(0,t.jsx)(e.code,{children:\"[]String?\"})})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:\"subject\"}),(0,t.jsx)(e.td,{children:\"Set subjects in your front matter as well as through smart filters.\"}),(0,t.jsx)(e.td,{children:(0,t.jsx)(e.code,{children:\"String?\"})})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:\"topic\"}),(0,t.jsx)(e.td,{children:\"Set topics in your front matter as well as through smart filters.\"}),(0,t.jsx)(e.td,{children:(0,t.jsx)(e.code,{children:\"String?\"})})]})]})]})]})}function a(n={}){let{wrapper:e}=n.components||{};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(c,{...n})}):c(n)}return x(F);})();\n;return Component;"
  },
  {
    "title": "User Documentation",
    "content": "Fluster aims to be an accessible presentation layer for whatever you need to jot down, organize and reference later. To accomplish this, Fluster relies on `.mdx` as the most commonly used input. [Mdx](https://mdxjs.com) works as a superset of markdown, allowing all of the familiar markdown features with the added support for React components.\n\nFluster then embeds this React app in a Rust powered tauri application, stores your notes in a local vector database and uses (for now, local only) AI to provide you with insights into your data that no other app offers.\n\n\n## First Steps\n\nFirst, continue to our [downloads page](/downloads). This will install the core Fluster application, but Fluster will in turn install the models that it requires locally when you run Fluster for the first time.\n\nDuring this onboarding process, a screen should be presented asking among other things where you plan to keep your notes. For portability, Fluster insists that you keep all of your notes within a single parent directory, but notes can be organized within this directory however you like, including within deeply nested folders.\n\n### Create your first note\n\n<Hint>\nFluster does provide a built in code editor with some additional features specific to the functionality of Fluster, but at the time of release _new_ notes must be created manually.\n</Hint>\n\nTo create a note, you can use any code or text editor you like. Just create a file with the `.mdx` extension anywhere within the directory you provided to Fluster.\n\n### Front Matter\n\nMdx uses a `yaml` like syntax to define what is known as _front matter_. You can read more about the specific front matter fields [here](/docs/user/front_matter).\n\nTo define your own front matter, the title of your note in this case, start your note with:\n\n```mdx\n---\ntitle: \"My title\"\n---\n```",
    "_meta": {
      "filePath": "user/index.mdx",
      "fileName": "index.mdx",
      "directory": "user",
      "extension": "mdx",
      "path": "user"
    },
    "toc": [
      {
        "title": "First Steps",
        "url": "#first-steps",
        "depth": 2
      },
      {
        "title": "Create your first note",
        "url": "#create-your-first-note",
        "depth": 3
      },
      {
        "title": "Front Matter",
        "url": "#front-matter",
        "depth": 3
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "Fluster aims to be an accessible presentation layer for whatever you need to jot down, organize and reference later. To accomplish this, Fluster relies on .mdx as the most commonly used input. Mdx works as a superset of markdown, allowing all of the familiar markdown features with the added support for React components."
        },
        {
          "heading": "",
          "content": "Fluster then embeds this React app in a Rust powered tauri application, stores your notes in a local vector database and uses (for now, local only) AI to provide you with insights into your data that no other app offers."
        },
        {
          "heading": "first-steps",
          "content": "First, continue to our downloads page. This will install the core Fluster application, but Fluster will in turn install the models that it requires locally when you run Fluster for the first time."
        },
        {
          "heading": "first-steps",
          "content": "During this onboarding process, a screen should be presented asking among other things where you plan to keep your notes. For portability, Fluster insists that you keep all of your notes within a single parent directory, but notes can be organized within this directory however you like, including within deeply nested folders."
        },
        {
          "heading": "create-your-first-note",
          "content": "Fluster does provide a built in code editor with some additional features specific to the functionality of Fluster, but at the time of release new notes must be created manually."
        },
        {
          "heading": "create-your-first-note",
          "content": "To create a note, you can use any code or text editor you like. Just create a file with the .mdx extension anywhere within the directory you provided to Fluster."
        },
        {
          "heading": "front-matter",
          "content": "Mdx uses a yaml like syntax to define what is known as front matter. You can read more about the specific front matter fields here."
        },
        {
          "heading": "front-matter",
          "content": "To define your own front matter, the title of your note in this case, start your note with:"
        }
      ],
      "headings": [
        {
          "id": "first-steps",
          "content": "First Steps"
        },
        {
          "id": "create-your-first-note",
          "content": "Create your first note"
        },
        {
          "id": "front-matter",
          "content": "Front Matter"
        }
      ]
    },
    "body": "var Component=(()=>{var u=Object.create;var o=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var m=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var w=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports),k=(i,e)=>{for(var n in e)o(i,n,{get:e[n],enumerable:!0})},a=(i,e,n,s)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let r of f(e))!y.call(i,r)&&r!==n&&o(i,r,{get:()=>e[r],enumerable:!(s=p(e,r))||s.enumerable});return i};var g=(i,e,n)=>(n=i!=null?u(m(i)):{},a(e||!i||!i.__esModule?o(n,\"default\",{value:i,enumerable:!0}):n,i)),b=i=>a(o({},\"__esModule\",{value:!0}),i);var h=w((C,l)=>{l.exports=_jsx_runtime});var F={};k(F,{default:()=>c});var t=g(h());function d(i){let e={a:\"a\",code:\"code\",em:\"em\",h2:\"h2\",h3:\"h3\",p:\"p\",pre:\"pre\",span:\"span\",...i.components},{Hint:n}=e;return n||x(\"Hint\",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(e.p,{children:[\"Fluster aims to be an accessible presentation layer for whatever you need to jot down, organize and reference later. To accomplish this, Fluster relies on \",(0,t.jsx)(e.code,{children:\".mdx\"}),\" as the most commonly used input. \",(0,t.jsx)(e.a,{href:\"https://mdxjs.com\",children:\"Mdx\"}),\" works as a superset of markdown, allowing all of the familiar markdown features with the added support for React components.\"]}),`\n`,(0,t.jsx)(e.p,{children:\"Fluster then embeds this React app in a Rust powered tauri application, stores your notes in a local vector database and uses (for now, local only) AI to provide you with insights into your data that no other app offers.\"}),`\n`,(0,t.jsx)(e.h2,{id:\"first-steps\",children:\"First Steps\"}),`\n`,(0,t.jsxs)(e.p,{children:[\"First, continue to our \",(0,t.jsx)(e.a,{href:\"/downloads\",children:\"downloads page\"}),\". This will install the core Fluster application, but Fluster will in turn install the models that it requires locally when you run Fluster for the first time.\"]}),`\n`,(0,t.jsx)(e.p,{children:\"During this onboarding process, a screen should be presented asking among other things where you plan to keep your notes. For portability, Fluster insists that you keep all of your notes within a single parent directory, but notes can be organized within this directory however you like, including within deeply nested folders.\"}),`\n`,(0,t.jsx)(e.h3,{id:\"create-your-first-note\",children:\"Create your first note\"}),`\n`,(0,t.jsx)(n,{children:(0,t.jsxs)(e.p,{children:[\"Fluster does provide a built in code editor with some additional features specific to the functionality of Fluster, but at the time of release \",(0,t.jsx)(e.em,{children:\"new\"}),\" notes must be created manually.\"]})}),`\n`,(0,t.jsxs)(e.p,{children:[\"To create a note, you can use any code or text editor you like. Just create a file with the \",(0,t.jsx)(e.code,{children:\".mdx\"}),\" extension anywhere within the directory you provided to Fluster.\"]}),`\n`,(0,t.jsx)(e.h3,{id:\"front-matter\",children:\"Front Matter\"}),`\n`,(0,t.jsxs)(e.p,{children:[\"Mdx uses a \",(0,t.jsx)(e.code,{children:\"yaml\"}),\" like syntax to define what is known as \",(0,t.jsx)(e.em,{children:\"front matter\"}),\". You can read more about the specific front matter fields \",(0,t.jsx)(e.a,{href:\"/docs/user/front_matter\",children:\"here\"}),\".\"]}),`\n`,(0,t.jsx)(e.p,{children:\"To define your own front matter, the title of your note in this case, start your note with:\"}),`\n`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(e.pre,{className:\"shiki shiki-themes github-light aurora-x\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#bbbbbb\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#07090F\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,t.jsxs)(e.code,{children:[(0,t.jsx)(e.span,{className:\"line\",children:(0,t.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-light-font-weight\":\"bold\",\"--shiki-dark\":\"#65737E\",\"--shiki-dark-font-weight\":\"bold\"},children:\"---\"})}),`\n`,(0,t.jsx)(e.span,{className:\"line\",children:(0,t.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:'title: \"My title\"'})}),`\n`,(0,t.jsx)(e.span,{className:\"line\",children:(0,t.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-light-font-weight\":\"bold\",\"--shiki-dark\":\"#65737E\",\"--shiki-dark-font-weight\":\"bold\"},children:\"---\"})})]})})})]})}function c(i={}){let{wrapper:e}=i.components||{};return e?(0,t.jsx)(e,{...i,children:(0,t.jsx)(d,{...i})}):d(i)}function x(i,e){throw new Error(\"Expected \"+(e?\"component\":\"object\")+\" `\"+i+\"` to be defined: you likely forgot to import, pass, or provide it.\")}return b(F);})();\n;return Component;"
  },
  {
    "title": "Special Files",
    "content": "# Special Files\n\n## The Main Folder\n\nIn the settings page and during the onboarding process, you can set the primary folder that your notes are contained in. This is used by several internal functions as a sort of container that Fluster should treat as it's data source.\n\nWhile not strictly required in all cases, these following files _should_ be nested within your _main folder_ for portability.\n\n### Ignoring Things\n\n```sh \n<My Notes Directory>/.flusterIgnore\n```\n\nYou can create a `.flusterIgnore` file in the root of your notes directory to specify file paths that fluster should, you know... ignore. The syntax is identical to that of a `.gitignore` file, with the docs available [here](https://git-scm.com/docs/gitignore);\n\n### Bibliography\n\n#### Bibtex file\n\n```sh \n<My Notes Directory>/citations.bib\n```\n\nBy default Fluster includes support for an embedded bibliography database. This database can work in sync with a local file, reading from this file to populate your database. You can still use this database without a local file, but if you have an existing bibliography file place it in your notes directory, and point Fluster to this file in your settings.\n\n#### Citation Format\n\nAn optional file path to any valid `.csl` file. There is a great repo available [here](https://github.com/citation-style-language/styles) with the file to satisfy just about every popular format.\n\n```sh \n<My Notes Directory>/aip.csl\n```",
    "_meta": {
      "filePath": "user/special_files.mdx",
      "fileName": "special_files.mdx",
      "directory": "user",
      "extension": "mdx",
      "path": "user/special_files"
    },
    "toc": [
      {
        "title": "Special Files",
        "url": "#special-files",
        "depth": 1
      },
      {
        "title": "The Main Folder",
        "url": "#the-main-folder",
        "depth": 2
      },
      {
        "title": "Ignoring Things",
        "url": "#ignoring-things",
        "depth": 3
      },
      {
        "title": "Bibliography",
        "url": "#bibliography",
        "depth": 3
      },
      {
        "title": "Bibtex file",
        "url": "#bibtex-file",
        "depth": 4
      },
      {
        "title": "Citation Format",
        "url": "#citation-format",
        "depth": 4
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "the-main-folder",
          "content": "In the settings page and during the onboarding process, you can set the primary folder that your notes are contained in. This is used by several internal functions as a sort of container that Fluster should treat as it's data source."
        },
        {
          "heading": "the-main-folder",
          "content": "While not strictly required in all cases, these following files should be nested within your main folder for portability."
        },
        {
          "heading": "ignoring-things",
          "content": "You can create a .flusterIgnore file in the root of your notes directory to specify file paths that fluster should, you know... ignore. The syntax is identical to that of a .gitignore file, with the docs available here;"
        },
        {
          "heading": "bibtex-file",
          "content": "By default Fluster includes support for an embedded bibliography database. This database can work in sync with a local file, reading from this file to populate your database. You can still use this database without a local file, but if you have an existing bibliography file place it in your notes directory, and point Fluster to this file in your settings."
        },
        {
          "heading": "citation-format",
          "content": "An optional file path to any valid .csl file. There is a great repo available here with the file to satisfy just about every popular format."
        }
      ],
      "headings": [
        {
          "id": "special-files",
          "content": "Special Files"
        },
        {
          "id": "the-main-folder",
          "content": "The Main Folder"
        },
        {
          "id": "ignoring-things",
          "content": "Ignoring Things"
        },
        {
          "id": "bibliography",
          "content": "Bibliography"
        },
        {
          "id": "bibtex-file",
          "content": "Bibtex file"
        },
        {
          "id": "citation-format",
          "content": "Citation Format"
        }
      ]
    },
    "body": "var Component=(()=>{var g=Object.create;var a=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,f=Object.prototype.hasOwnProperty;var u=(t,i)=>()=>(i||t((i={exports:{}}).exports,i),i.exports),y=(t,i)=>{for(var s in i)a(t,s,{get:i[s],enumerable:!0})},l=(t,i,s,n)=>{if(i&&typeof i==\"object\"||typeof i==\"function\")for(let h of p(i))!f.call(t,h)&&h!==s&&a(t,h,{get:()=>i[h],enumerable:!(n=k(i,h))||n.enumerable});return t};var B=(t,i,s)=>(s=t!=null?g(b(t)):{},l(i||!t||!t.__esModule?a(s,\"default\",{value:t,enumerable:!0}):s,t)),m=t=>l(a({},\"__esModule\",{value:!0}),t);var o=u((v,r)=>{r.exports=_jsx_runtime});var x={};y(x,{default:()=>c});var e=B(o());function d(t){let i={a:\"a\",code:\"code\",em:\"em\",h1:\"h1\",h2:\"h2\",h3:\"h3\",h4:\"h4\",p:\"p\",pre:\"pre\",span:\"span\",...t.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(i.h1,{id:\"special-files\",children:\"Special Files\"}),`\n`,(0,e.jsx)(i.h2,{id:\"the-main-folder\",children:\"The Main Folder\"}),`\n`,(0,e.jsx)(i.p,{children:\"In the settings page and during the onboarding process, you can set the primary folder that your notes are contained in. This is used by several internal functions as a sort of container that Fluster should treat as it's data source.\"}),`\n`,(0,e.jsxs)(i.p,{children:[\"While not strictly required in all cases, these following files \",(0,e.jsx)(i.em,{children:\"should\"}),\" be nested within your \",(0,e.jsx)(i.em,{children:\"main folder\"}),\" for portability.\"]}),`\n`,(0,e.jsx)(i.h3,{id:\"ignoring-things\",children:\"Ignoring Things\"}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(i.pre,{className:\"shiki shiki-themes github-light aurora-x\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#bbbbbb\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#07090F\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,e.jsx)(i.code,{children:(0,e.jsxs)(i.span,{className:\"line\",children:[(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#C792EA\"},children:\"<\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"My Notes Directory\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#C792EA\"},children:\">\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"/.flusterIgnore\"})]})})})}),`\n`,(0,e.jsxs)(i.p,{children:[\"You can create a \",(0,e.jsx)(i.code,{children:\".flusterIgnore\"}),\" file in the root of your notes directory to specify file paths that fluster should, you know... ignore. The syntax is identical to that of a \",(0,e.jsx)(i.code,{children:\".gitignore\"}),\" file, with the docs available \",(0,e.jsx)(i.a,{href:\"https://git-scm.com/docs/gitignore\",children:\"here\"}),\";\"]}),`\n`,(0,e.jsx)(i.h3,{id:\"bibliography\",children:\"Bibliography\"}),`\n`,(0,e.jsx)(i.h4,{id:\"bibtex-file\",children:\"Bibtex file\"}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(i.pre,{className:\"shiki shiki-themes github-light aurora-x\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#bbbbbb\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#07090F\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,e.jsx)(i.code,{children:(0,e.jsxs)(i.span,{className:\"line\",children:[(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#C792EA\"},children:\"<\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"My Notes Directory\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#C792EA\"},children:\">\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"/citations.bib\"})]})})})}),`\n`,(0,e.jsx)(i.p,{children:\"By default Fluster includes support for an embedded bibliography database. This database can work in sync with a local file, reading from this file to populate your database. You can still use this database without a local file, but if you have an existing bibliography file place it in your notes directory, and point Fluster to this file in your settings.\"}),`\n`,(0,e.jsx)(i.h4,{id:\"citation-format\",children:\"Citation Format\"}),`\n`,(0,e.jsxs)(i.p,{children:[\"An optional file path to any valid \",(0,e.jsx)(i.code,{children:\".csl\"}),\" file. There is a great repo available \",(0,e.jsx)(i.a,{href:\"https://github.com/citation-style-language/styles\",children:\"here\"}),\" with the file to satisfy just about every popular format.\"]}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(i.pre,{className:\"shiki shiki-themes github-light aurora-x\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#bbbbbb\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#07090F\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,e.jsx)(i.code,{children:(0,e.jsxs)(i.span,{className:\"line\",children:[(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#C792EA\"},children:\"<\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"My Notes Directory\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#C792EA\"},children:\">\"}),(0,e.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"/aip.csl\"})]})})})})]})}function c(t={}){let{wrapper:i}=t.components||{};return i?(0,e.jsx)(i,{...t,children:(0,e.jsx)(d,{...t})}):d(t)}return m(x);})();\n;return Component;"
  },
  {
    "title": "Special Fluster Syntax",
    "content": "Fluster supports all Github-flavored markdown syntax, React-like mdx syntax and a few additional features listed here, that work to bring the other parts of your Fluster data into your notes.\n\n\n## Embed an equation tag\n\nYou can write math as you would in normal markdown or mdx as \n\n```mdx\n$$\n\\begin{gather}\nv = \\pm \\frac{c \\sqrt{ds^{2} - dr^{2}}}{ds} \\quad \\Rightarrow \\quad \\pm c \\sqrt{1 - \\frac{dr^{2}}{ds^{2}} }\n\\end{gather}\n$$\n```\n\nbut for equations that are frequently referenced in your notes, you can use the following syntax to embed a note tag with the given id. This note tag will display a simple button, that when clicked will display more details about the equation in question, given that you have properly added an equation with that id to your database. Obviously replace `myEquationId` with the id you provided to the equations page for that given equation. \n\nUser's should prefer embedding equations in this manner so they can be used to group your notes and find related content. This is handled at the parsing level, adding each equation your note includes in this manner to the database to be used for lookup and AI related tasks.\n\n```mdx\n[[eq:myEquationId]]\n```\n\n## Linking other notes\n\n> This is still in beta. \n\nAs with other markdown environments, you can create a link using the `[my text](https://google.com)` syntax, but you can also reference a note by the `id` field in that note's front matter. This should be the preferred way to reference other notes as to not rely on internally generated urls that might change.\n\nYou can reference your other note, with the id `myNoteId`. Note that you can still use the additional `[My text](noteId:myNoteId#someElementId)` syntax to link to a specfic position within that note.\n\n```mdx\n[My text](noteId:myNoteId)\n```\n\nLinking notes this way is also used internally to generate a network graph of your notes, which is in turn used by various AI and search related features. Some of these features might lose some effictiveness if internal notes are not linked with this syntax.\n\n\n## Adding tags\n\nYou can add an inline tag anywhere using the `[[#myTag]]` syntax.",
    "_meta": {
      "filePath": "user/special_syntax.mdx",
      "fileName": "special_syntax.mdx",
      "directory": "user",
      "extension": "mdx",
      "path": "user/special_syntax"
    },
    "toc": [
      {
        "title": "Embed an equation tag",
        "url": "#embed-an-equation-tag",
        "depth": 2
      },
      {
        "title": "Linking other notes",
        "url": "#linking-other-notes",
        "depth": 2
      },
      {
        "title": "Adding tags",
        "url": "#adding-tags",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "Fluster supports all Github-flavored markdown syntax, React-like mdx syntax and a few additional features listed here, that work to bring the other parts of your Fluster data into your notes."
        },
        {
          "heading": "embed-an-equation-tag",
          "content": "You can write math as you would in normal markdown or mdx as"
        },
        {
          "heading": "embed-an-equation-tag",
          "content": "but for equations that are frequently referenced in your notes, you can use the following syntax to embed a note tag with the given id. This note tag will display a simple button, that when clicked will display more details about the equation in question, given that you have properly added an equation with that id to your database. Obviously replace myEquationId with the id you provided to the equations page for that given equation."
        },
        {
          "heading": "embed-an-equation-tag",
          "content": "User's should prefer embedding equations in this manner so they can be used to group your notes and find related content. This is handled at the parsing level, adding each equation your note includes in this manner to the database to be used for lookup and AI related tasks."
        },
        {
          "heading": "linking-other-notes",
          "content": "This is still in beta."
        },
        {
          "heading": "linking-other-notes",
          "content": "As with other markdown environments, you can create a link using the [my text](https://google.com) syntax, but you can also reference a note by the id field in that note's front matter. This should be the preferred way to reference other notes as to not rely on internally generated urls that might change."
        },
        {
          "heading": "linking-other-notes",
          "content": "You can reference your other note, with the id myNoteId. Note that you can still use the additional [My text](noteId:myNoteId#someElementId) syntax to link to a specfic position within that note."
        },
        {
          "heading": "linking-other-notes",
          "content": "Linking notes this way is also used internally to generate a network graph of your notes, which is in turn used by various AI and search related features. Some of these features might lose some effictiveness if internal notes are not linked with this syntax."
        },
        {
          "heading": "adding-tags",
          "content": "You can add an inline tag anywhere using the [[#myTag]] syntax."
        }
      ],
      "headings": [
        {
          "id": "embed-an-equation-tag",
          "content": "Embed an equation tag"
        },
        {
          "id": "linking-other-notes",
          "content": "Linking other notes"
        },
        {
          "id": "adding-tags",
          "content": "Adding tags"
        }
      ]
    },
    "body": "var Component=(()=>{var k=Object.create;var a=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var p=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var m=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),b=(n,e)=>{for(var t in e)a(n,t,{get:e[t],enumerable:!0})},r=(n,e,t,h)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let s of g(e))!y.call(n,s)&&s!==t&&a(n,s,{get:()=>e[s],enumerable:!(h=u(e,s))||h.enumerable});return n};var f=(n,e,t)=>(t=n!=null?k(p(n)):{},r(e||!n||!n.__esModule?a(t,\"default\",{value:n,enumerable:!0}):t,n)),B=n=>r(a({},\"__esModule\",{value:!0}),n);var d=m((w,l)=>{l.exports=_jsx_runtime});var x={};b(x,{default:()=>c});var i=f(d());function o(n){let e={blockquote:\"blockquote\",code:\"code\",h2:\"h2\",p:\"p\",pre:\"pre\",span:\"span\",...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.p,{children:\"Fluster supports all Github-flavored markdown syntax, React-like mdx syntax and a few additional features listed here, that work to bring the other parts of your Fluster data into your notes.\"}),`\n`,(0,i.jsx)(e.h2,{id:\"embed-an-equation-tag\",children:\"Embed an equation tag\"}),`\n`,(0,i.jsx)(e.p,{children:\"You can write math as you would in normal markdown or mdx as\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light aurora-x\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#bbbbbb\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#07090F\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#C3E88D\"},children:\"$$\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"\\\\begin{gather}\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"v = \\\\pm \\\\frac{c \\\\sqrt{ds^{2} - dr^{2}}}{ds} \\\\quad \\\\Rightarrow \\\\quad \\\\pm c \\\\sqrt{1 - \\\\frac{dr^{2}}{ds^{2}} }\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"\\\\end{gather}\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#C3E88D\"},children:\"$$\"})})]})})}),`\n`,(0,i.jsxs)(e.p,{children:[\"but for equations that are frequently referenced in your notes, you can use the following syntax to embed a note tag with the given id. This note tag will display a simple button, that when clicked will display more details about the equation in question, given that you have properly added an equation with that id to your database. Obviously replace \",(0,i.jsx)(e.code,{children:\"myEquationId\"}),\" with the id you provided to the equations page for that given equation.\"]}),`\n`,(0,i.jsx)(e.p,{children:\"User's should prefer embedding equations in this manner so they can be used to group your notes and find related content. This is handled at the parsing level, adding each equation your note includes in this manner to the database to be used for lookup and AI related tasks.\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light aurora-x\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#bbbbbb\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#07090F\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsx)(e.code,{children:(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#C3E88D\"},children:\"[[\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"eq:myEquationId\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#C3E88D\"},children:\"]]\"})]})})})}),`\n`,(0,i.jsx)(e.h2,{id:\"linking-other-notes\",children:\"Linking other notes\"}),`\n`,(0,i.jsxs)(e.blockquote,{children:[`\n`,(0,i.jsx)(e.p,{children:\"This is still in beta.\"}),`\n`]}),`\n`,(0,i.jsxs)(e.p,{children:[\"As with other markdown environments, you can create a link using the \",(0,i.jsx)(e.code,{children:\"[my text](https://google.com)\"}),\" syntax, but you can also reference a note by the \",(0,i.jsx)(e.code,{children:\"id\"}),\" field in that note's front matter. This should be the preferred way to reference other notes as to not rely on internally generated urls that might change.\"]}),`\n`,(0,i.jsxs)(e.p,{children:[\"You can reference your other note, with the id \",(0,i.jsx)(e.code,{children:\"myNoteId\"}),\". Note that you can still use the additional \",(0,i.jsx)(e.code,{children:\"[My text](noteId:myNoteId#someElementId)\"}),\" syntax to link to a specfic position within that note.\"]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light aurora-x\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#bbbbbb\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#07090F\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsx)(e.code,{children:(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#C3E88D\"},children:\"[\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#BBBBBB\"},children:\"My text\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#C3E88D\"},children:\"](\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-light-text-decoration\":\"underline\",\"--shiki-dark\":\"#F07178\",\"--shiki-dark-text-decoration\":\"inherit\"},children:\"noteId:myNoteId\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#C3E88D\"},children:\")\"})]})})})}),`\n`,(0,i.jsx)(e.p,{children:\"Linking notes this way is also used internally to generate a network graph of your notes, which is in turn used by various AI and search related features. Some of these features might lose some effictiveness if internal notes are not linked with this syntax.\"}),`\n`,(0,i.jsx)(e.h2,{id:\"adding-tags\",children:\"Adding tags\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"You can add an inline tag anywhere using the \",(0,i.jsx)(e.code,{children:\"[[#myTag]]\"}),\" syntax.\"]})]})}function c(n={}){let{wrapper:e}=n.components||{};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(o,{...n})}):o(n)}return B(x);})();\n;return Component;"
  }
]