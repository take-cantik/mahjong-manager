# mahjong-manager

麻雀レート管理

## 初期設定

1. .firebaserc ファイルを設定
2. functions/.env.expample をもとに.env ファイルを作成&設定

## デプロイ

実行環境

```bash
node 16
```

コマンド

```bash
cd functions

firebase deploy
or
firebase deploy --only functions:lineBot
```
