# Proyek Pradewata
This repository contains the source code for Proyek Pradewata, a project that aims to retranslate a portion of Genshin Impact into Indonesian, and then put them up on display in a website powered by [Remix](https://remix.run) and [Eno](https://eno-lang.org). The site is work-in-progress and not currently live.

This a personal passion project by me, [@PseudoMonious](https://twitter.com/PseudoMonious), who for some silly reasons decide to use up hours of her time to mash his translation skills and web developing skills together. And also her love for the video game Genshin Impact and all the characters in that world.

I've put the source code for public display here in hope that it can be helpful for other web developers, whether they want to make their own Genshin fansites or otherwise, but it is still a solo project. Please do not take anything here without my permission.

## Development

```sh
pnpm run dev
```

This starts your app in development mode, rebuilding assets on file changes. 

Stylesheet utilize postcss and will require another process to generate. Run this concurrently with the above:

```sh
pnpm run dev:css
```

## Deployment
I'm deploying this on Netlify ()I haven't decided where to deploy it yet. Probably Vercel or Fly.io. Maybe even get a DIY host if I feel like suffering.

## TODO
- OpenGraph/Social Media cards