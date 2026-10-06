# NetHack Pocket

NetHack 5.0.0, собранный из официальных исходников DevTeam в WebAssembly, с сенсорным управлением под iPhone. Работает без интернета.

**Играть:** https://xfandertd.github.io/nethack-pocket/

## Установка на iPhone

1. Откройте ссылку выше в Safari и дождитесь стартового экрана.
2. Нажмите «Поделиться» (квадрат со стрелкой вверх; если его не видно — «•••» → «Поделиться»).
3. Выберите «На экран „Домой“» → «Добавить».

Дальше запускайте с иконки: на весь экран, без интернета. Сохранения хранятся на телефоне; при сворачивании игра сохраняется сама и продолжается, когда вы вернётесь.

## Состав

| Файл | Что это |
| --- | --- |
| `index.html` | игра и интерфейс |
| `nethack.wasm` | NetHack 5.0.0 (тег `NetHack-5.0.0_Released`) |
| `sw.js` | service worker: держит всё на устройстве |
| `manifest.webmanifest`, `icon-*.png` | описание приложения и иконки |
| `fonts/` | шрифты, чтобы работали офлайн |
| `source/nethack-5.0.0-wasm.patch` | изменения в исходниках NetHack для веб-сборки |

Сборка: Emscripten 3.1.50, clang 18, `make CROSS_TO_WASM=1` поверх `sys/unix/hints/linux.500` с патчем из `source/`.

## Лицензии

- NetHack, Copyright 1985–2026 Stichting Mathematisch Centrum, Amsterdam, и NetHack DevTeam. [NetHack General Public License](https://nethack.org/common/license.html). Исходники: https://github.com/NetHack/NetHack
- Lua 5.4.8 — MIT License.
- Шрифты JetBrains Mono, Alegreya Sans, IM Fell English SC — SIL Open Font License 1.1 (тексты в `fonts/`).
