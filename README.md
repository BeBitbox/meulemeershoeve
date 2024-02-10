# Meulemeershoeve Nuxt 3 Project

Welcome aboard the Meulemeershoeve digital tractor! 🚜💨

We're plowing through the fields of Nuxt 3, cultivating the finest digital experiences for our farm's friends and family.

## Setup

To get your development tractor started:

```bash
npm install
```

If npm fails, try to disable ipv6
```bash
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
```

## Development Server

Fire up your engine with:

```bash
npm run dev
```
Visit `http://localhost:3000` to view your changes.

## Production

Harvest time:

```bash
npm run build
```

To preview your bountiful harvest:

```bash
npm run preview
```

To build and run the static version:

```bash
npm run static
```

For more on deployment, refer to Nuxt's [deployment guide](https://nuxt.com/docs/getting-started/deployment).

Happy farming with Nuxt 3!