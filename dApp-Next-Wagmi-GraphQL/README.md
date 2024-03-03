## Getting Started

```bash
# Install Dependencies
yarn

# Run the development server
yarn dev
```

### ENV

```bash
# Copy ENV File
cp .env.example .env.local
```

### Configs

- `src/appConfig.ts`: app name, title, SEO etc.
- `src/pages/_app.tsx`: chains, providers, wallet connectors

### Scripts

**Next.js**

```bash
# Build
yarn build

# Start server with build files
yarn start
```

**Prettier**

```bash
# Use Prettier to do Format Check for files under ./src
yarn fc

# Use Prettier to do Format Fix for files under ./src
yarn ff
```

**Contract Types**

```bash
# Generate contract types from src/contracts/*.json
yarn compile-contract-types
```

## More

Learn about components of this kit is using:

- [Next.js](https://nextjs.org/) - React Framework by Vercel
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [Ethers.js](https://github.com/ethers-io/ethers.js/) - Compact library for interacting with Ethereum.
- [wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [RainbowKit](https://rainbowkit.com/) - React library for wallet connections with dApp.
- [Headless UI](https://headlessui.dev/) - Unstyled, fully accessible UI components

## License

This app is open-source and licensed under the MIT license. For more details, check the [License file](LICENSE).