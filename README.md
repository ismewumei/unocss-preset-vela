# @mi/unocss-preset-vela

The vela preset for [UnoCSS](https://github.com/unocss/unocss).

## Installation

```bash
npm i -D @mi/unocss-preset-vela
```

```ts
import presetVela from '@mi/unocss-preset-vela'

Unocss({
  presets: [
    presetVela(),
  ],
})
```

## 参考
基于UnoCss presetMini进行的修改，相关配置参考 https://unocss.dev/presets/mini

## 功能
  1. 去掉颜色相关生成默认带opacity变量
  2. 内置将rem转换成ps，且1单位为1px
## 记不住类名？
🔍 ：https://unocss.dev/interactive/


## License

MIT License &copy; 2021-PRESENT [wuhui](https://git.n.xiaomi.com/wuhui9)
