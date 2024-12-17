# 簡易式Pokemon Bartle
簡易式Pokemon Bartleは、昔あったPokemon Bartleというゲームを真似て作ったものです。

といっても独自仕様がかなり入っています。
また、一部の機能は技術的な都合上実装していません。

- わざの効果は○や×ではなく数字で表示
- オンラインでの協力プレイ？: 実装不可能
- Xでの共有機能など: 未実装
- etc...

## 本家について

本家のPokemon Bartleのドメイン（https://pokemon-bartle.com）はすでに売りに出されており、2024/12現在遊べません。
ですが、どうしてもPokemon Bartleで遊んだみたかったので、1から自作することにしました。

> [!CAUTION]
> 簡易式Pokemon Bartleは、本家Pokemon Bartleの制作者の許可を取らずに公開しています。
もし本家の製作者から要望があれば削除します。

> [!NOTE]
> 私はつい先日ポケモンを始めたばかりであり、本家Pokemon Bartleで遊んだことがありません。
しかし、[こちらの動画](https://www.youtube.com/watch?v=DzlT5uxKxLA)を見て遊んでみたいと思ったので、動画を参考に自作することにしたというのが経緯です。

## 開発
技術スタック:
- React + Vite
- TypeScript
- Bun

開発サーバー:
```sh
bun install
bun run dev
```

ビルド:

```sh
bun run build
```
