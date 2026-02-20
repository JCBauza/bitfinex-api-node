# @jcbit/bitfinex-api-node

> **Modernized fork** of the official Bitfinex API Node.js library with updated dependencies, Node.js 22+ support, and enhanced development experience.

[![npm version](https://img.shields.io/github/v/release/jcbauza/bitfinex-api-node)](https://github.com/jcbauza/bitfinex-api-node/releases)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

## 🚀 What's New in v7.1.0

### ✨ **Modernization Features**

- **Node.js 22+** minimum requirement
- **All 47 dependencies updated** to latest versions
- **Enhanced npm scripts** for better development experience
- **Comprehensive .env configuration** system
- **Complete technical documentation** and improvement roadmap

### 🔧 **Key Improvements**

- Fixed critical **ws v8+ compatibility** issue
- Improved **WebSocket message handling**
- Better **error handling** and debugging
- **Zero linting errors** with updated standards
- **228 tests passing** with enhanced validation

### 📚 **Enhanced Documentation**

- `TECHNICAL-REVIEW.md` - Complete code analysis
- `IMPROVEMENT-PROPOSALS.md` - Future enhancement roadmap
- `ENV-SETUP.md` - Configuration guide
- `MODERNIZATION.md` - Detailed changelog

## 📦 Installation

### GitHub Package Registry

```bash
# Configure npm to use GitHub Package Registry for @jcbit scope
echo "@jcbit:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Install the package
npm install @jcbit/bitfinex-api-node
```

### Requirements

- **Node.js**: ≥22.0.0
- **npm**: ≥10.0.0

## 🔧 Quick Start

```javascript
import BFX from '@jcbit/bitfinex-api-node'

// REST API
const bfx = new BFX({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  transform: true,
});

const rest = bfx.rest(2);

// Get ticker
rest.ticker("tBTCUSD").then((ticker) => {
  console.log("BTC/USD:", ticker);
});

// WebSocket API
const ws = bfx.ws(2);

ws.on("open", () => {
  console.log("Connected to Bitfinex WebSocket");
  ws.subscribeTicker("tBTCUSD");
});

ws.onTicker({ symbol: "tBTCUSD" }, (ticker) => {
  console.log("Ticker update:", ticker);
});

ws.open();
```

## 🔐 Configuration

Create a `.env` file in your project root:

```bash
# Copy the example configuration
cp node_modules/@jcbit/bitfinex-api-node/.env.example .env

# Edit with your credentials
API_KEY=your_api_key_here
API_SECRET=your_api_secret_here
```

See `ENV-SETUP.md` for complete configuration options.

## 🆚 Differences from Original

This is a **modernized fork** of the official `bitfinex-api-node` with:

| Feature           | Original    | This Fork             |
| ----------------- | ----------- | --------------------- |
| **Node.js**       | ≥16.0.0     | ≥22.0.0               |
| **Dependencies**  | Outdated    | All updated (47 deps) |
| **ws Library**    | v7 (broken) | v8+ (fixed)           |
| **Configuration** | Manual      | .env + guide          |
| **Documentation** | Basic       | Comprehensive         |
| **Development**   | Limited     | Enhanced scripts      |
| **Testing**       | Basic       | Validated + examples  |

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start with nodemon
npm run test:watch   # Run tests in watch mode

# Testing
npm test            # Run linter + tests
npm run unit        # Run unit tests only
npm run lint        # Run linter
npm run lint:fix    # Fix linting issues

# Documentation
npm run docs        # Generate JSDoc documentation
npm run docs:serve  # Serve docs on localhost:8080

# Maintenance
npm run clean       # Clean node_modules
npm run fresh-install # Clean install
```

## 🔗 API Reference

This package maintains **100% compatibility** with the original Bitfinex API. All methods, events, and functionality work exactly the same.

### REST API

- Account management (wallets, positions, orders)
- Market data (tickers, trades, order books)
- Trading operations (submit, cancel, modify orders)
- Funding (loans, credits, offers)

### WebSocket API

- Real-time market data
- Account updates
- Order management
- Custom calculations

For detailed API documentation, see the [official Bitfinex docs](https://docs.bitfinex.com/docs).

## 🧪 Validation

All functionality has been thoroughly tested:

- ✅ **228 unit tests** passing
- ✅ **All REST endpoints** verified
- ✅ **WebSocket connections** validated
- ✅ **Public examples** tested
- ✅ **Authenticated examples** verified with real API keys
- ✅ **Zero linting errors**

## 🚧 Future Roadmap

See `IMPROVEMENT-PROPOSALS.md` for detailed enhancement plans:

- **TypeScript migration** for better DX
- **Smart reconnection** with exponential backoff
- **Enhanced error handling** with typed errors
- **Connection pooling** for REST optimization
- **Debug dashboard** for real-time monitoring
- **CLI tools** for development and testing

## 🤝 Contributing

This is a **personal fork** focused on modernization. For issues with the core API functionality, please refer to the [official repository](https://github.com/bitfinexcom/bitfinex-api-node).

For modernization-specific issues or suggestions:

1. Check existing [issues](https://github.com/jcbauza/bitfinex-api-node/issues)
2. Create a new issue with detailed description
3. PRs welcome for bug fixes and improvements

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md)

## 🙏 Credits

- **Original Library**: [Bitfinex Team](https://github.com/bitfinexcom/bitfinex-api-node)
- **Modernization**: [JC](https://github.com/jcbauza)
- **All Contributors**: See package.json contributors list

---

**⚠️ Disclaimer**: This is an **unofficial modernized fork**. For production use, consider the maintenance implications and evaluate whether the original library meets your needs.

**🔗 Links**:

- [Original Repository](https://github.com/bitfinexcom/bitfinex-api-node)
- [This Fork](https://github.com/jcbauza/bitfinex-api-node)
- [Release Notes](https://github.com/jcbauza/bitfinex-api-node/releases)
- [Technical Review](TECHNICAL-REVIEW.md)
