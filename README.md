# 今日のひと言アプリ (One Message App)

クリックするたびに、前向きになれる「ひと言」を表示するメンタルケアアプリです。
「自己肯定」「励まし」「行動」「安心」の 4 つのカテゴリで、ユーザーの心をサポートします。

## 📱 デモ (Demo)

実際のアプリはこちらから動作確認できます。
[ここにあなたの Vercel の URL を貼ってください]

## 🛠 使用技術 (Tech Stack)

- **Frontend:** React, Vite
- **Language:** JavaScript (ES6+)
- **Style:** CSS (Responsive Design)
- **Deploy:** Vercel (CI/CD)

## ✨ 機能 (Features)

- **ランダム表示機能:** ボタン一つでメッセージをランダムに提案
- **カテゴリフィルター:** 気分に合わせて「励まし」や「安心」などのタグで絞り込み
- **レスポンシブ対応:** スマホ・PC どちらでも見やすい UI 設計
- **ダークモード対応:** OS の設定に関わらず視認性を保つカラー設計
- **ローカルストレージ保存:** ブラウザを閉じても、前回の表示状態を記憶

## 💡 工夫した点

- **パフォーマンス最適化:** `useCallback` と `useEffect` を適切に使用し、無駄な再レンダリングを防止しました。
- **ユーザー体験:** ボタンの配置をスマホ操作時に押しやすい位置（下部）に集約しました。
- **カスタムタグ:** 自分専用の「#安心」タグと独自のカラーリングを追加し、メンタルケアの効果を高めました。

## 🚀 開発環境のセットアップ (Setup)

```bash
# リポジトリのクローン
git clone [https://github.com/cat3brave/one-message-app.git](https://github.com/cat3brave/one-message-app.git)

# ディレクトリ移動
cd one-message-app

# 依存関係のインストール
npm install

# ローカルサーバー起動
npm run dev
```
