grocery-list-app
======

This is a sample React project that generates a grocery list of ingredients based on a menu or a list of dishes. It is powered by the OpenAI Chat Completion API and built using Next.js 13.

----

これは、メニューや料理のリストに基づいて食材の買い物リストを生成するサンプルのReactプロジェクトです。OpenAI Chat Completion APIを利用しており、Next.js 13を使用して構築されています。


# Application

Make a list of dishes you want to prepare and click the "Generate" button.

---

準備したい料理のリストを作成し、「生成」ボタンをクリックしてください。

![Search Menu](./docs/screenshot1.png "Search Menu")

The ingredients will be listed, indicating which dish they are used for. You can also specify if you already have them in your pantry.

---

食材がリストに表示され、どの料理に使用されるかが示されます。また、パントリーに既にあるかどうかを指定することもできます。

![Grocery List](./docs/screenshot2.png "Grocery List")

This is just a basic demo application, and there is much more that can be done to extend its functionality.

---

これは基本的なデモアプリケーションであり、その機能を拡張するためにはさらに多くのことができます。



# Setup

Clone the repository and install the dependencies

```sh
git clone https://github.com/supershaneski/grocery-list-app.git myproject

cd myproject

npm install
```

Copy `.env.example` and rename it to `.env` then edit the `OPENAI_API_KEY` use your own API key. 

```javascript
OPENAI_API_KEY=YOUR-OPENAI-API-KEY
```

Then run the app

```sh
npm run dev
```

Open your browser to `http://localhost:3002/` to load the application page.